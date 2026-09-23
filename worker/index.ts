/* ------------------------------------------------------------------
   Contact form handler.

   Runs in the same Worker that serves the site, so the form posts to
   /api/contact on its own origin. No third-party form service, no extra
   vendor in the privacy policy, and the enquiry data never leaves the
   providers already listed there.

   Requires one secret: BREVO_API_KEY.
   Set it in the Cloudflare dashboard under the Worker's Settings, or
   with: npx wrangler secret put BREVO_API_KEY
   ------------------------------------------------------------------ */

interface Env {
  ASSETS: Fetcher;
  BREVO_API_KEY: string;
  /* Optional. Without them Brevo drops the deal into the default pipeline
     and its first stage, which is what we want for a single pipeline.
     Find the ids with:
       curl -H "api-key: <KEY>" https://api.brevo.com/v3/crm/pipeline/details/all */
  BREVO_PIPELINE_ID?: string;
  BREVO_STAGE_ID?: string;
}

const TO = 'hola@magicorden.com';
const FROM = 'hola@magicorden.com';
const SITE_ORIGINS = ['https://magicorden.com', 'https://www.magicorden.com'];

/* Field caps. A genuine enquiry is nowhere near these; anything longer is
   either a mistake or an attempt to stuff the mailbox. */
const LIMITS = { name: 120, email: 200, phone: 40, service: 120, message: 4000 };

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (ch) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[ch]!,
  );

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8' },
  });

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== 'POST') return json({ error: 'method_not_allowed' }, 405);

  /* Same-origin only. The form is on this site; a POST from anywhere else
     is not a customer. */
  const origin = request.headers.get('origin');
  if (origin && !SITE_ORIGINS.includes(origin)) {
    return json({ error: 'forbidden' }, 403);
  }

  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return json({ error: 'invalid_json' }, 400);
  }

  const str = (k: string, max: number) =>
    typeof data[k] === 'string' ? (data[k] as string).trim().slice(0, max) : '';

  /* Honeypot. Real people leave it empty. Return success so bots do not
     learn anything and do not retry. */
  if (str('company', 50)) return json({ ok: true });

  const name = str('name', LIMITS.name);
  const email = str('email', LIMITS.email);
  const phone = str('phone', LIMITS.phone);
  const service = str('service', LIMITS.service);
  const message = str('message', LIMITS.message);
  const consent = data.consent === true || data.consent === 'on';

  const errors: string[] = [];
  if (!name) errors.push('name');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('email');
  if (!message) errors.push('message');
  if (!consent) errors.push('consent');
  if (errors.length) return json({ error: 'validation', fields: errors }, 400);

  if (!env.BREVO_API_KEY) {
    console.error('BREVO_API_KEY is not set on this Worker');
    return json({ error: 'not_configured' }, 500);
  }

  const rows: [string, string][] = [
    ['Nombre', name],
    ['Email', email],
    ['Teléfono', phone || 'no facilitado'],
    ['Servicio', service || 'no indicado'],
  ];

  const html =
    `<h2>Nueva consulta desde magicorden.com</h2>` +
    `<table cellpadding="6" style="border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="color:#66655a">${k}</td><td><strong>${escapeHtml(v)}</strong></td></tr>`,
      )
      .join('') +
    `</table><h3>Mensaje</h3><p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>`;

  const text =
    rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMensaje:\n${message}`;

  const res = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'api-key': env.BREVO_API_KEY,
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      sender: { email: FROM, name: 'Magic Orden' },
      to: [{ email: TO }],
      /* So she can simply hit reply and it goes to the customer. */
      replyTo: { email, name },
      subject: `Nueva consulta de ${name}`,
      htmlContent: html,
      textContent: text,
    }),
  });

  if (!res.ok) {
    console.error('Brevo rejected the send', res.status, await res.text());
    return json({ error: 'send_failed' }, 502);
  }

  /* The notification email is the critical path and has now succeeded.
     Everything below is bookkeeping: if the CRM is down or misconfigured
     we log it and still report success, because a CRM failure must never
     lose an enquiry that already reached the inbox. */
  try {
    await recordInCrm(env, { name, email, phone, service, message });
  } catch (err) {
    console.error('CRM step failed, enquiry was still emailed', err);
  }

  return json({ ok: true });
}

/* ------------------------------------------------------------------
   CRM: contact plus deal.

   The contact is created with NO listIds, so nobody is subscribed to any
   marketing list. The privacy policy says no commercial communications are
   sent, and this keeps that true. A newsletter would need its own tickbox
   and a policy change.
   ------------------------------------------------------------------ */
async function recordInCrm(
  env: Env,
  lead: { name: string; email: string; phone: string; service: string; message: string },
) {
  const api = (path: string, body: unknown) =>
    fetch(`https://api.brevo.com/v3${path}`, {
      method: 'POST',
      headers: {
        'api-key': env.BREVO_API_KEY,
        'content-type': 'application/json',
        accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

  /* Only FIRSTNAME is set. Brevo rejects attributes that have not been
     created in the account, and SMS must be in international format, which
     people rarely type. Phone, service and message all travel in the email.
     To put them on the contact record, create the custom attributes in
     Brevo first, then add them here. */
  const contactRes = await api('/contacts', {
    email: lead.email,
    attributes: { FIRSTNAME: lead.name },
    updateEnabled: true,
  });

  let contactId: number | undefined;
  if (contactRes.ok) {
    contactId = ((await contactRes.json()) as { id?: number }).id;
  } else if (contactRes.status === 400) {
    /* Already exists. updateEnabled handles the common case, but a
       duplicate still returns 400 in some situations, so look the id up. */
    const lookup = await fetch(
      `https://api.brevo.com/v3/contacts/${encodeURIComponent(lead.email)}`,
      { headers: { 'api-key': env.BREVO_API_KEY, accept: 'application/json' } },
    );
    if (lookup.ok) contactId = ((await lookup.json()) as { id?: number }).id;
  }

  if (!contactId) {
    console.error('Could not resolve a Brevo contact id', contactRes.status, await contactRes.text());
    return;
  }

  /* Deal name carries the service so the pipeline is readable at a glance. */
  const dealName = lead.service ? `${lead.service} - ${lead.name}` : `Consulta - ${lead.name}`;

  const attributes: Record<string, string> = {};
  if (env.BREVO_PIPELINE_ID) attributes.pipeline = env.BREVO_PIPELINE_ID;
  if (env.BREVO_STAGE_ID) attributes.deal_stage = env.BREVO_STAGE_ID;

  const dealRes = await api('/crm/deals', {
    name: dealName,
    ...(Object.keys(attributes).length ? { attributes } : {}),
    linkedContactsIds: [contactId],
  });

  if (!dealRes.ok) {
    console.error('Brevo rejected the deal', dealRes.status, await dealRes.text());
  }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const { pathname } = new URL(request.url);
    if (pathname === '/api/contact') return handleContact(request, env);
    /* Everything else is the static site. */
    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;

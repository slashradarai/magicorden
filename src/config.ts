/* ------------------------------------------------------------------
   Everything Kenia is likely to want changed lives in this one file.
   Change it here and it updates across both languages.
   ------------------------------------------------------------------ */

export const SITE = {
  name: 'Magic Orden',
  domain: 'https://magicorden.com',
  city: 'Valencia',
  country: 'ES',
} as const;

/* Google Calendar appointment schedule. If this is ever blanked out, every
   booking button falls back to an honest "opening soon" line rather than
   silently going nowhere. */
export const BOOKING_URL = 'https://calendar.app.google/HpjT7Tscqh7r9zQY6';

/* The same schedule in Google's embeddable form. The short link above sends
   X-Frame-Options: SAMEORIGIN and cannot be framed; this one can, and it is
   what Google's own scheduling button uses.

   To regenerate if the schedule ever changes: open the short link, copy the
   ID from the URL it redirects to, and drop it in below.

   The iframe is only given a src the first time someone opens the modal, so
   nothing is requested from Google for visitors who never click Book. */
export const BOOKING_EMBED_URL =
  'https://calendar.google.com/calendar/appointments/schedules/AcZssZ1j0FWfV8tj8f9KcC3xcvdudHVQ19TFiPY0s3uHj1es6cGOUDunEisdcMCW4cE2qrOuNRQAsbEo?gv=true';

/* Blog byline. The bio is condensed from the philosophy paragraph on the
   home page, so it is wording Kenia has already approved rather than
   anything invented about her.

   Avatar: drop a photo at src/assets/author-<anything>.jpg (or .png/.webp)
   and it appears automatically, no config change needed. Until then the
   byline renders a monogram. */
export const AUTHOR = {
  name: 'Kenia',
  role: 'Organizadora de hogares',
  bio: 'Diseño sistemas de organización que se adaptan a tu ritmo de vida, para que cada objeto tenga un lugar con sentido en tu hogar en Valencia.',
} as const;

/* The form posts to an API route in this site's own Worker, which relays
   the enquiry through Brevo. Same origin, no third-party form service.
   See worker/index.ts. Requires the BREVO_API_KEY secret on the Worker.

   Blank this to switch the form off: it then renders visibly disabled with
   an honest note rather than failing silently. */
export const CONTACT_FORM_ENDPOINT = '/api/contact';

/* Privacy notice. While empty, the consent line shows as plain text with no
   link, because a tickbox pointing at a 404 is worse than no link at all. */
export const PRIVACY_URL = '/privacidad/';

export const CONTACT = {
  /* Cloudflare Email Routing forwards this to Kenia's Gmail. Receive only:
     replies go out from her Gmail, not from this address. Empty hides it. */
  email: 'hola@magicorden.com',
  /* Full international format, digits only, no plus and no spaces.
     Empty hides both the floating button and the footer link. */
  whatsapp: '34673394120',
} as const;

/* Colour of the floating WhatsApp button.
   'green' is WhatsApp's own #25D366, instantly recognisable.
   'brand' uses the site's terracotta, which sits better in the palette.
   Change this one word and the button restyles. */
export const WHATSAPP_STYLE: 'green' | 'brand' = 'green';

export const SOCIAL = {
  instagram: 'https://www.instagram.com/magicorden/',
  /* Empty values are hidden rather than linking to nowhere. */
  pinterest: '',
} as const;

/* Real testimonials only. Leave this array empty until Kenia supplies
   quotes from actual clients, with their permission to publish.
   The section hides itself entirely while this is empty. */
export const TESTIMONIALS: {
  quote: { es: string; en: string };
  author: string;
  location: string;
}[] = [];

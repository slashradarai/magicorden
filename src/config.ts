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

/* Where the enquiry form POSTs its JSON. Empty means the form renders in a
   clearly disabled state with an honest note, rather than pretending to send.
   Fill this in once the backend is chosen (Cloudflare Worker, Web3Forms, etc). */
export const CONTACT_FORM_ENDPOINT = '';

/* Privacy notice. While empty, the consent line shows as plain text with no
   link, because a tickbox pointing at a 404 is worse than no link at all. */
export const PRIVACY_URL = '';

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

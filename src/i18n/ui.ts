export const LOCALES = ['es', 'en'] as const;
export type Locale = (typeof LOCALES)[number];

export const content = {
  es: {
    htmlLang: 'es-ES',
    meta: {
      title: 'Magic Orden | Organización de hogares en Valencia',
      description:
        'Servicios de organización de hogares en Valencia. Sistemas de orden hechos a medida para armarios, despensas y casas enteras.',
    },
    nav: {
      servicios: 'Servicios',
      metodo: 'Método',
      testimonios: 'Testimonios',
      cta: 'Reserva tu consulta',
      menuOpen: 'Abrir menú',
      menuClose: 'Cerrar menú',
      langLabel: 'Cambiar idioma',
    },
    hero: {
      titleA: 'El arte del orden',
      titleB: 'en tu hogar',
      body: 'Servicios de organización para una vida con estilo. Transformamos tu caos en un santuario de paz diseñado para ti.',
      ctaPrimary: 'Descubre mis servicios',
      ctaSecondary: 'Mi filosofía',
      imageAlt: 'Salón mediterráneo luminoso y ordenado',
    },
    filosofia: {
      eyebrow: 'El método',
      title: 'Mi filosofía',
      body: 'Creo firmemente que el orden exterior es la base de tu calma mental. Mi método va mucho más allá de recoger: diseño sistemas que se adaptan a tu ritmo de vida, asegurando que cada objeto tenga un lugar con sentido en tu hogar en Valencia.',
      imageAlt: 'Estantería de cocina con recipientes ordenados',
    },
    servicios: {
      eyebrow: 'Soluciones a medida',
      title: 'Servicios exclusivos',
      note: 'Cada servicio se personaliza según el alma y la arquitectura de tu vivienda.',
      cta: 'Infórmate para tu casa',
      items: [
        {
          n: '01',
          title: 'El vestidor de tus sueños',
          body: 'Un enfoque de alta costura para tu armario. Clasifico, ordeno y cuido tus prendas favoritas para que vestirte sea un placer diario.',
          imageAlt: 'Vestidor amplio con prendas ordenadas por color',
        },
        {
          n: '02',
          title: 'Despensa gourmet',
          body: 'Optimizamos tu espacio culinario para que cocinar sea eficiente y visualmente delicioso.',
          imageAlt: 'Despensa con botes de cristal etiquetados',
        },
        {
          n: '03',
          title: 'Transformación integral',
          body: 'La experiencia definitiva de calma. Armonizamos cada estancia de tu casa para crear un flujo perfecto de orden y estética.',
          imageAlt: 'Cocina luminosa con almacenaje ordenado',
        },
      ],
    },
    testimonios: {
      title: 'Testimonios',
    },
    booking: {
      title: 'Hablemos',
      close: 'Cerrar',
      newTab: 'Abrir en una pestaña nueva',
      loading: 'Cargando el calendario...',
      tabCalendar: 'Reservar llamada',
      tabForm: 'Escríbeme',
    },
    form: {
      intro: '¿Prefieres escribir? Cuéntame qué necesitas y te respondo en menos de 24 horas.',
      name: 'Nombre',
      email: 'Email',
      phone: 'Teléfono (opcional)',
      service: '¿Qué te interesa?',
      servicePick: 'Elige una opción',
      serviceOther: 'Otra cosa',
      message: 'Cuéntame un poco sobre tu espacio',
      consent: 'Acepto que Magic Orden guarde mis datos para responder a mi consulta.',
      privacyLink: 'Política de privacidad',
      submit: 'Enviar',
      sending: 'Enviando...',
      success: 'Gracias. Te responderé en menos de 24 horas.',
      error: 'Algo ha fallado. Inténtalo de nuevo o escríbeme por Instagram.',
      notLive: 'El formulario todavía no está activo. Reserva una llamada o escríbeme por Instagram.',
      required: 'Este campo es obligatorio',
      invalidEmail: 'Introduce un email válido',
    },
    cta: {
      title: 'Empieza hoy tu cambio',
      body: 'Contacta conmigo para una consulta privada en Valencia y descubre cómo podemos elevar tu día a día.',
      button: 'Quiero mi consulta',
      pending: 'Reservas disponibles próximamente.',
    },
    footer: {
      tagline: 'Organización de hogares en Valencia, con calma y criterio.',
      follow: 'Sígueme',
      contact: 'Contacto',
      email: 'Escríbeme',
      whatsapp: 'WhatsApp',
      rights: 'Todos los derechos reservados.',
    },
  },

  en: {
    htmlLang: 'en-GB',
    meta: {
      title: 'Magic Orden | Home organisation in Valencia',
      description:
        'Home organisation services in Valencia. Tailored systems for wardrobes, pantries and whole homes.',
    },
    nav: {
      servicios: 'Services',
      metodo: 'Method',
      testimonios: 'Testimonials',
      cta: 'Book a consultation',
      menuOpen: 'Open menu',
      menuClose: 'Close menu',
      langLabel: 'Change language',
    },
    hero: {
      titleA: 'The art of order',
      titleB: 'in your home',
      body: 'Home organisation for a life with style. We turn your clutter into a calm space designed around you.',
      ctaPrimary: 'See my services',
      ctaSecondary: 'My philosophy',
      imageAlt: 'Bright, tidy Mediterranean living room',
    },
    filosofia: {
      eyebrow: 'The method',
      title: 'My philosophy',
      body: 'Order around you is the foundation of calm within you. My method goes well beyond tidying: I design systems that fit the rhythm of your life, so every object has a place that makes sense in your home in Valencia.',
      imageAlt: 'Kitchen shelving with neatly arranged containers',
    },
    servicios: {
      eyebrow: 'Made to measure',
      title: 'Signature services',
      note: 'Every service is shaped around the character and the architecture of your home.',
      cta: 'Ask about your home',
      items: [
        {
          n: '01',
          title: 'The wardrobe of your dreams',
          body: 'A couture approach to your wardrobe. I sort, arrange and care for the pieces you love, so getting dressed becomes a daily pleasure.',
          imageAlt: 'Spacious dressing room with clothes arranged by colour',
        },
        {
          n: '02',
          title: 'The gourmet pantry',
          body: 'We optimise your kitchen space so cooking is efficient and a pleasure to look at.',
          imageAlt: 'Pantry with labelled glass jars',
        },
        {
          n: '03',
          title: 'Whole home transformation',
          body: 'The full experience of calm. We bring every room into balance to create a seamless flow of order and beauty.',
          imageAlt: 'Bright kitchen with organised storage',
        },
      ],
    },
    testimonios: {
      title: 'Testimonials',
    },
    booking: {
      title: 'Get in touch',
      close: 'Close',
      newTab: 'Open in a new tab',
      loading: 'Loading the calendar...',
      tabCalendar: 'Book a call',
      tabForm: 'Send a message',
    },
    form: {
      intro: 'Prefer to write? Tell me what you need and I will reply within 24 hours.',
      name: 'Name',
      email: 'Email',
      phone: 'Phone (optional)',
      service: 'What are you interested in?',
      servicePick: 'Choose one',
      serviceOther: 'Something else',
      message: 'Tell me a little about your space',
      consent: 'I agree to Magic Orden storing my details in order to reply to my enquiry.',
      privacyLink: 'Privacy policy',
      submit: 'Send',
      sending: 'Sending...',
      success: 'Thank you. I will reply within 24 hours.',
      error: 'Something went wrong. Try again, or message me on Instagram.',
      notLive: 'The form is not live yet. Book a call, or message me on Instagram.',
      required: 'This field is required',
      invalidEmail: 'Enter a valid email address',
    },
    cta: {
      title: 'Start your change today',
      body: 'Get in touch for a private consultation in Valencia and see how we can lift your everyday.',
      button: 'Book my consultation',
      pending: 'Bookings opening soon.',
    },
    footer: {
      tagline: 'Home organisation in Valencia, with calm and good judgement.',
      follow: 'Follow',
      contact: 'Contact',
      email: 'Email me',
      whatsapp: 'WhatsApp',
      rights: 'All rights reserved.',
    },
  },
} as const;

export function t(locale: Locale) {
  return content[locale];
}

/** Path to the same page in the other language. */
export function altPath(locale: Locale): string {
  return locale === 'es' ? '/en/' : '/';
}

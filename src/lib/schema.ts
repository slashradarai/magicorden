import { SITE, AUTHOR } from '../config';

interface PostSchemaInput {
  title: string;
  description: string;
  pubDate: Date;
  updatedDate?: Date;
  url: string;
  image?: string;
  faqs?: { question: string; answer: string }[];
}

/* Returns JSON-LD for a blog post: the article itself, a breadcrumb trail,
   and an FAQ block when the post has questions. Emitted from the post page
   as a single @graph. */
export function articleSchema(p: PostSchemaInput) {
  const graph: Record<string, unknown>[] = [
    {
      '@type': 'BlogPosting',
      headline: p.title,
      description: p.description,
      datePublished: p.pubDate.toISOString(),
      ...(p.updatedDate && { dateModified: p.updatedDate.toISOString() }),
      ...(p.image && { image: new URL(p.image, SITE.domain).href }),
      mainEntityOfPage: { '@type': 'WebPage', '@id': p.url },
      author: {
        '@type': 'Person',
        name: AUTHOR.name,
        jobTitle: AUTHOR.role,
        description: AUTHOR.bio,
        worksFor: { '@type': 'Organization', name: SITE.name, url: SITE.domain },
      },
      publisher: { '@type': 'Organization', name: SITE.name, url: SITE.domain },
      inLanguage: 'es-ES',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: SITE.domain },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.domain}/blog/` },
        { '@type': 'ListItem', position: 3, name: p.title, item: p.url },
      ],
    },
  ];

  if (p.faqs?.length) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: p.faqs.map((f) => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    });
  }

  return { '@context': 'https://schema.org', '@graph': graph };
}

/* LocalBusiness for the home page. She serves Valencia, so area served
   matters more than a street address she may not want published. */
export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.name,
    url: SITE.domain,
    areaServed: { '@type': 'City', name: 'Valencia' },
    address: { '@type': 'PostalAddress', addressLocality: 'Valencia', addressCountry: 'ES' },
    inLanguage: 'es-ES',
  };
}

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/* Blog posts are Spanish only. Kenia's customers are in Valencia and search
   in Spanish, so translating every post doubles the work for an audience that
   is almost entirely local. The site chrome stays bilingual either way.
   If English posts are ever wanted, add a `lang` field here and filter on it
   in the index and the sitemap. */
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string().max(70, 'Keep under 70 characters so it is not truncated in search results'),
      /* Used as the meta description and the card excerpt. Not optional:
         a missing description means Google invents one from the page. */
      description: z.string().min(50).max(160),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),

      category: z.enum([
        'Armarios y vestidores',
        'Cocina y despensa',
        'Organización del hogar',
        'Mudanzas',
        'Método y hábitos',
      ]),

      /* Optional on purpose. There is no real photography yet, and a post
         without an image is better than a post with stock that pretends to
         be her work. Posts without one get a tonal panel instead. */
      heroImage: image().optional(),
      heroImageAlt: z.string().optional(),

      /* Rendered on the page and emitted as FAQPage JSON-LD, which is what
         gets picked up for rich results and by answer engines. Leave empty
         if the post does not suit questions. */
      faqs: z
        .array(z.object({ question: z.string(), answer: z.string() }))
        .max(6)
        .optional(),

      /* draft: true keeps a post out of the build entirely. */
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };

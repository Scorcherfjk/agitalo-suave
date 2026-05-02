import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blogCollection = defineCollection({
  loader: glob({ 
    pattern: "**/*.{md,mdx}", 
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: () =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date(),
      type: z.enum(["receta", "bitacora", "tecnica", "tip"]),
      tags: z.array(z.string()),
      excerpt: z.string(),
      imageUrl: z.string(),
      draft: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),
    }),
});

const legalCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
  legal: legalCollection,
};
import { defineCollection, z, type SchemaContext } from "astro:content";

const blogCollection = defineCollection({
  type: "content",
  schema: ({ image }: SchemaContext) =>
    z.object({
      title: z.string(),
      date: z.date(),
      updated: z.date(),
      type: z.enum(["receta", "bitacora", "tecnica", "tip"]),
      tags: z.array(z.string()),
      excerpt: z.string(),
      image: image(),
      draft: z.boolean().optional().default(false),
      featured: z.boolean().optional().default(false),
    }),
});

const legalCollection = defineCollection({
  type: "content",
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.date(),
      draft: z.boolean().optional().default(false),
    }),
});

export const collections = {
  blog: blogCollection,
  legal: legalCollection,
};

import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { blogSchema, legalSchema } from "./schemas";

const blogCollection = defineCollection({
  loader: glob({ 
    pattern: "**/*.{md,mdx}", 
    base: "./src/content/blog",
    generateId: ({ entry }) => entry.replace(/\.mdx?$/, ''),
  }),
  schema: blogSchema,
});

const legalCollection = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/legal" }),
  schema: legalSchema,
});

export const collections = {
  blog: blogCollection,
  legal: legalCollection,
};
import { defineCollection } from "astro:content";
import { blogSchema, legalSchema } from "./schemas";
import { strapiBlogLoader, strapiLegalLoader } from "./lib/cms";

const blogCollection = defineCollection({
  loader: strapiBlogLoader(),
  schema: blogSchema,
});

const legalCollection = defineCollection({
  loader: strapiLegalLoader(),
  schema: legalSchema,
});

export const collections = {
  blog: blogCollection,
  legal: legalCollection,
};
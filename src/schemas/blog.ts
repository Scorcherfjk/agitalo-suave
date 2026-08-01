import { z } from "zod";

export const blogSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  updated: z.coerce.date(),
  type: z.enum(["receta", "bitacora", "tecnica", "tip"]),
  tags: z.array(z.string()),
  excerpt: z.string(),
  imageUrl: z.string(),
  headerImage: z.string().optional(),
  ingredients: z.array(z.string()).optional(),
  steps: z.array(z.string()).optional(),
  draft: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
});
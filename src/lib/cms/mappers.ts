import { CATEGORY_BY_TYPE, PLACEHOLDER_IMAGE } from "./constants";
import { mediaUrl } from "./client";
import type { MappedEntry } from "./types";

export function mapBlogEntry(row: any): MappedEntry {
  const type: string = row.type;
  const category = CATEGORY_BY_TYPE[type] ?? type;
  const id = `${category}/${row.slug}`;
  const imageUrl = mediaUrl(row.image);
  const headerImage = mediaUrl(row.headerImage);
  return {
    id,
    body: typeof row.content === "string" ? row.content : "",
    data: {
      title: row.title,
      date: row.date,
      updated: row.updated ?? row.date,
      type,
      tags: Array.isArray(row.tags) ? row.tags : [],
      excerpt: row.excerpt ?? "",
      imageUrl: imageUrl ?? PLACEHOLDER_IMAGE,
      ...(headerImage ? { headerImage } : {}),
      ...(Array.isArray(row.ingredients) && row.ingredients.length > 0
        ? { ingredients: row.ingredients }
        : {}),
      ...(Array.isArray(row.steps) && row.steps.length > 0
        ? { steps: row.steps }
        : {}),
      draft: Boolean(row.draft),
      featured: Boolean(row.featured),
    },
  };
}

export function mapLegalEntry(row: any): MappedEntry {
  return {
    id: row.slug,
    body: typeof row.content === "string" ? row.content : "",
    data: {
      title: row.title,
      description: row.description ?? "",
      date: row.date ?? new Date().toISOString().slice(0, 10),
      draft: Boolean(row.draft),
    },
  };
}

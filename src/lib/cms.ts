import type { Loader } from "astro/loaders";

const DEFAULT_CMS_URL = "http://localhost:1337";
const cmsEnv = import.meta.env as Record<string, string | undefined>;
const CMS_URL = (cmsEnv.CMS_URL ?? process.env.CMS_URL ?? DEFAULT_CMS_URL).replace(
  /\/$/,
  "",
);

const PAGE_SIZE = 100;
const REQUEST_TIMEOUT_MS = 30_000;

const PLACEHOLDER_IMAGE = "/placeholder.jpg";

const CATEGORY_BY_TYPE: Record<string, string> = {
  receta: "recetas",
  bitacora: "bitacora",
  tecnica: "tecnicas",
  tip: "tips",
};

interface StrapiResponse {
  data?: unknown[];
  meta?: { pagination?: { pageCount?: number } };
}

interface MappedEntry {
  id: string;
  data: Record<string, unknown>;
  body: string;
}

async function fetchJson(url: string): Promise<StrapiResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`GET ${url} -> ${response.status} ${response.statusText}`);
    }
    return (await response.json()) as StrapiResponse;
  } finally {
    clearTimeout(timeout);
  }
}

function apiUrl(path: string, page: number, populate?: string[]): string {
  const query = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(PAGE_SIZE),
  });
  for (const field of populate ?? []) {
    query.append(`populate[${field}]`, "true");
  }
  return `${CMS_URL}${path}?${query.toString()}`;
}

async function fetchAll(path: string, populate?: string[]): Promise<any[]> {
  const first = await fetchJson(apiUrl(path, 1, populate));
  const rows: any[] = Array.isArray(first.data) ? first.data : [];
  const pageCount = first.meta?.pagination?.pageCount ?? 1;
  for (let page = 2; page <= pageCount; page++) {
    const json = await fetchJson(apiUrl(path, page, populate));
    if (Array.isArray(json.data)) rows.push(...json.data);
  }
  return rows;
}

function mediaUrl(media: unknown): string | undefined {
  if (!media || typeof media !== "object" || !("url" in media)) return undefined;
  const url = (media as { url?: unknown }).url;
  if (typeof url !== "string" || url.length === 0) return undefined;
  return url.startsWith("http") ? url : `${CMS_URL}${url}`;
}

function mapBlogEntry(row: any): MappedEntry {
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

function mapLegalEntry(row: any): MappedEntry {
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

interface StrapiLoaderOptions {
  path: string;
  populate?: string[];
  mapEntry: (row: any) => MappedEntry;
}

function strapiLoader({
  path,
  populate,
  mapEntry,
}: StrapiLoaderOptions): Loader {
  return {
    name: `strapi-${path.replace(/^\/api\//, "").replace(/[^a-z0-9-]/gi, "-")}`,
    async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
      const rows = await fetchAll(path, populate);
      for (const row of rows) {
        const { id, data, body } = mapEntry(row);
        const parsedData = await parseData({ id, data });
        const rendered = await renderMarkdown(body);
        store.set({
          id,
          data: parsedData,
          body,
          rendered: { html: rendered.html, metadata: rendered.metadata },
          digest: generateDigest(row),
        });
      }
      logger.info(
        `strapi: ${store.keys().length} entradas de ${path} desde ${CMS_URL}`,
      );
    },
  };
}

export function strapiBlogLoader(): Loader {
  return strapiLoader({
    path: "/api/blogs",
    populate: ["image", "headerImage"],
    mapEntry: mapBlogEntry,
  });
}

export function strapiLegalLoader(): Loader {
  return strapiLoader({ path: "/api/legals", mapEntry: mapLegalEntry });
}

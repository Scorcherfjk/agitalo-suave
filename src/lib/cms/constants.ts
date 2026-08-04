export const DEFAULT_CMS_URL = "http://localhost:1337";

const cmsEnv = import.meta.env as Record<string, string | undefined>;

export const CMS_URL = (
  cmsEnv.CMS_URL ??
  process.env.CMS_URL ??
  DEFAULT_CMS_URL
).replace(/\/$/, "");

export const PAGE_SIZE = 100;
export const REQUEST_TIMEOUT_MS = 30_000;
export const PLACEHOLDER_IMAGE = "/placeholder.jpg";

export const CATEGORY_BY_TYPE: Record<string, string> = {
  receta: "recetas",
  bitacora: "bitacora",
  tecnica: "tecnicas",
  tip: "tips",
};

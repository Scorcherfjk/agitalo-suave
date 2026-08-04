import { CMS_URL, PAGE_SIZE, REQUEST_TIMEOUT_MS } from "./constants";
import type { StrapiResponse } from "./types";

export async function fetchJson(url: string): Promise<StrapiResponse> {
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

export function apiUrl(path: string, page: number, populate?: string[]): string {
  const query = new URLSearchParams({
    "pagination[page]": String(page),
    "pagination[pageSize]": String(PAGE_SIZE),
  });
  for (const field of populate ?? []) {
    query.append(`populate[${field}]`, "true");
  }
  return `${CMS_URL}${path}?${query.toString()}`;
}

export async function fetchAll(path: string, populate?: string[]): Promise<any[]> {
  const first = await fetchJson(apiUrl(path, 1, populate));
  const rows: any[] = Array.isArray(first.data) ? first.data : [];
  const pageCount = first.meta?.pagination?.pageCount ?? 1;
  for (let page = 2; page <= pageCount; page++) {
    const json = await fetchJson(apiUrl(path, page, populate));
    if (Array.isArray(json.data)) rows.push(...json.data);
  }
  return rows;
}

export function mediaUrl(media: unknown): string | undefined {
  if (!media || typeof media !== "object" || !("url" in media)) return undefined;
  const url = (media as { url?: unknown }).url;
  if (typeof url !== "string" || url.length === 0) return undefined;
  return url.startsWith("http") ? url : `${CMS_URL}${url}`;
}

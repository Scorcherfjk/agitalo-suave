export interface StrapiResponse {
  data?: unknown[];
  meta?: { pagination?: { pageCount?: number } };
}

export interface MappedEntry {
  id: string;
  data: Record<string, unknown>;
  body: string;
}

export interface StrapiLoaderOptions {
  path: string;
  populate?: string[];
  mapEntry: (row: any) => MappedEntry;
}

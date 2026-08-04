import type { Loader } from "astro/loaders";
import { CMS_URL } from "./constants";
import { fetchAll } from "./client";
import { mapBlogEntry, mapLegalEntry } from "./mappers";
import type { StrapiLoaderOptions } from "./types";

function strapiLoader({
  path,
  populate,
  mapEntry,
}: StrapiLoaderOptions): Loader {
  return {
    name: `strapi-${path.replace(/^\/api\//, "").replace(/[^a-z0-9-]/gi, "-")}`,
    async load({ store, parseData, renderMarkdown, generateDigest, logger }) {
      // El store del Content Layer persiste entre builds (data-store.json en .astro/).
      // Sin clear(), las entradas eliminadas en el CMS quedan "zombis" en el build.
      store.clear();
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

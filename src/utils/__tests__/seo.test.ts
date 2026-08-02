import { describe, it, expect } from "vitest";
import type { CollectionEntry } from "astro:content";
import {
  getCategoryLink,
  getPersonJsonLd,
  getPostJsonLd,
  getSiteJsonLd,
} from "../seo";

const siteUrl = new URL("https://agitalosuave.com");

function makePost(overrides: Partial<CollectionEntry<"blog">["data"]> = {}) {
  return {
    id: "recetas/mojito-clasico",
    data: {
      title: "Mojito Clásico",
      date: new Date("2025-06-23"),
      updated: new Date("2025-06-23"),
      type: "receta",
      tags: ["mojito", "ron"],
      excerpt: "El clásico de siempre",
      imageUrl: "https://res.cloudinary.com/mojito.jpg",
      ingredients: ["6 hojas de menta", "50 ml de ron"],
      steps: ["Macerar la menta", "Agregar ron y hielo"],
      ...overrides,
    },
  } as unknown as CollectionEntry<"blog">;
}

describe("seo", () => {
  it("genera Recipe con ingredientes y pasos para una receta", () => {
    const { jsonLd } = getPostJsonLd(makePost(), siteUrl);
    const parsed = JSON.parse(jsonLd);

    expect(parsed["@type"]).toBe("Recipe");
    expect(parsed.name).toBe("Mojito Clásico");
    expect(parsed.recipeIngredient).toHaveLength(2);
    expect(parsed.recipeInstructions[0]["@type"]).toBe("HowToStep");
    expect(parsed.datePublished).toBe("2025-06-23T00:00:00.000Z");
    expect(parsed.url).toBe("https://agitalosuave.com/blog/recetas/mojito-clasico/");
  });

  it("usa Organization con url como autor", () => {
    const { jsonLd } = getPostJsonLd(makePost(), siteUrl);
    const parsed = JSON.parse(jsonLd);

    expect(parsed.author["@type"]).toBe("Organization");
    expect(parsed.author.name).toBe("Agítalo Suave");
    expect(parsed.author.url).toBe("https://agitalosuave.com/");
  });

  it("genera BlogPosting sin campos de receta para bitácora", () => {
    const { jsonLd } = getPostJsonLd(
      makePost({ id: "bitacora/primer-curso", type: "bitacora" }),
      siteUrl,
    );
    const parsed = JSON.parse(jsonLd);

    expect(parsed["@type"]).toBe("BlogPosting");
    expect(parsed.headline).toBe("Mojito Clásico");
    expect(parsed.recipeIngredient).toBeUndefined();
    expect(parsed.recipeInstructions).toBeUndefined();
  });

  it("genera breadcrumbs con Inicio, categoría y post", () => {
    const { breadcrumbJsonLd } = getPostJsonLd(makePost(), siteUrl);
    const parsed = JSON.parse(breadcrumbJsonLd);

    expect(parsed["@type"]).toBe("BreadcrumbList");
    expect(parsed.itemListElement).toHaveLength(3);
    expect(parsed.itemListElement[0].item).toBe("https://agitalosuave.com/");
    expect(parsed.itemListElement[1].name).toBe("Recetas");
    expect(parsed.itemListElement[1].item).toBe("https://agitalosuave.com/recetas/");
    expect(parsed.itemListElement[2].item).toBe(
      "https://agitalosuave.com/blog/recetas/mojito-clasico/",
    );
  });

  it("getCategoryLink resuelve las rutas de categoría", () => {
    expect(getCategoryLink("recetas")).toEqual({
      label: "Recetas",
      url: "/recetas",
    });
    expect(getCategoryLink("desconocido")).toBeUndefined();
  });

  it("genera el grafo Organization + WebSite", () => {
    const parsed = JSON.parse(getSiteJsonLd(siteUrl));

    expect(parsed["@graph"]).toHaveLength(2);
    expect(parsed["@graph"][0]["@type"]).toBe("Organization");
    expect(parsed["@graph"][0].sameAs).toContain(
      "https://www.instagram.com/agitalosuave",
    );
    expect(parsed["@graph"][1]["@type"]).toBe("WebSite");
  });

  it("genera Person para la página de acerca", () => {
    const parsed = JSON.parse(getPersonJsonLd(siteUrl));

    expect(parsed["@type"]).toBe("Person");
    expect(parsed.url).toBe("https://agitalosuave.com/acerca/");
    expect(parsed.sameAs).toHaveLength(3);
  });
});

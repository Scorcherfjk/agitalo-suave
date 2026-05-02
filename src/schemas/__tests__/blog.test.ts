import { describe, it, expect } from "vitest";
import { blogSchema } from "../blog";

describe("blogSchema", () => {
  it("parsea fecha correcta", () => {
    const result = blogSchema.parse({
      title: "Test",
      date: "2026-01-01",
      updated: "2026-01-02",
      type: "receta",
      tags: ["test"],
      excerpt: "Test excerpt",
      imageUrl: "/test.jpg",
    });
    expect(result.date).toBeInstanceOf(Date);
  });

  it("rechaza tipo invalido", () => {
    const parse = () =>
      blogSchema.parse({
        title: "Test",
        date: "2026-01-01",
        updated: "2026-01-02",
        type: "invalid",
        tags: ["test"],
        excerpt: "Test",
        imageUrl: "/test.jpg",
      });
    expect(parse).toThrow();
  });

  it("aplica defaults", () => {
    const result = blogSchema.parse({
      title: "Test",
      date: "2026-01-01",
      updated: "2026-01-01",
      type: "receta",
      tags: ["test"],
      excerpt: "Test",
      imageUrl: "/test.jpg",
    });
    expect(result.draft).toBe(false);
    expect(result.featured).toBe(false);
  });

  it("acepta array de tags vacio", () => {
    const result = blogSchema.parse({
      title: "Test",
      date: "2026-01-01",
      updated: "2026-01-01",
      type: "receta",
      tags: [],
      excerpt: "Test",
      imageUrl: "/test.jpg",
    });
    expect(Array.isArray(result.tags)).toBe(true);
  });
});
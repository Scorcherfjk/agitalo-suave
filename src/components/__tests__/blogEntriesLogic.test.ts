import { describe, it, expect } from "vitest";

describe("BlogEntries logic", () => {
  const max = 3;

  it("filtra posts que son draft", () => {
    const posts = [
      { data: { draft: true, date: new Date("2026-01-01") } },
      { data: { draft: false, date: new Date("2026-01-02") } },
    ];
    const filtered = posts.filter((post) => !post.data.draft);
    expect(filtered.length).toBe(1);
  });

  it("ordena por fecha descendente", () => {
    const posts = [
      { data: { draft: false, date: new Date("2026-01-01") } },
      { data: { draft: false, date: new Date("2026-03-01") } },
    ];
    const sorted = [...posts].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
    expect(sorted[0].data.date > sorted[1].data.date).toBe(true);
  });

  it("limita resultados con slice", () => {
    const posts = [
      { data: { draft: false, date: new Date("2026-01-01") } },
      { data: { draft: false, date: new Date("2026-01-02") } },
      { data: { draft: false, date: new Date("2026-01-03") } },
      { data: { draft: false, date: new Date("2026-01-04") } },
    ];
    const limited = posts.slice(0, max);
    expect(limited.length).toBe(max);
  });

  it("excluye post actual por id", () => {
    const currentSlug = "01-mojito-clasico";
    const posts = [
      { id: "01-mojito-clasico", data: { draft: false } },
      { id: "02-saketini", data: { draft: false } },
    ];
    const filtered = posts.filter((p) => p.id !== currentSlug);
    expect(filtered.length).toBe(1);
  });
});
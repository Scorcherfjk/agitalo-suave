import { describe, it, expect } from "vitest";
import { getReadingTime } from "../readingTime";

describe("getReadingTime", () => {
  it("devuelve al menos 1 minuto para texto corto", () => {
    expect(getReadingTime("hola mundo")).toBe(1);
  });

  it("redondea hacia arriba", () => {
    const body = Array.from({ length: 201 }, () => "palabra").join(" ");
    expect(getReadingTime(body)).toBe(2);
  });
});

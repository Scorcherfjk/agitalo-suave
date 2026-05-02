import { describe, it, expect } from "vitest";
import { formatDate } from "../formatDate";
describe("formatDate", () => {
  it("formatea fecha completa en español", () => {
    const date = new Date(2026, 4, 2);
    expect(formatDate(date)).toBe("2 de mayo de 2026");
  });
  it("maneja diferentes meses", () => {
    expect(formatDate(new Date(2026, 0, 1))).toBe("1 de enero de 2026");
    expect(formatDate(new Date(2026, 11, 31))).toBe("31 de diciembre de 2026");
  });
});

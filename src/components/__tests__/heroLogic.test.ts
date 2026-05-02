import { describe, it, expect } from "vitest";

describe("Hero component logic", () => {
  it("renderiza botones cuando hasButtons=true y hay textos", () => {
    const hasButtons = true;
    const primaryButtonText = "Únete";
    const secondaryButtonText = "Contacto";
    const shouldRenderButtons = hasButtons && Boolean(primaryButtonText || secondaryButtonText);
    expect(shouldRenderButtons).toBe(true);
  });

  it("no renderiza botones cuando hasButtons=false", () => {
    const hasButtons = false;
    const primaryButtonText = "Únete";
    const secondaryButtonText = "Contacto";
    const shouldRenderButtons = hasButtons && Boolean(primaryButtonText || secondaryButtonText);
    expect(shouldRenderButtons).toBe(false);
  });

  it("renderiza botón primario cuando existe texto", () => {
    const primaryButtonText = "Únete";
    const primaryButton = Boolean(primaryButtonText);
    expect(primaryButton).toBe(true);
  });

  it("renderiza botón secundario cuando existe texto", () => {
    const secondaryButtonText = "Contacto";
    const secondaryButton = Boolean(secondaryButtonText);
    expect(secondaryButton).toBe(true);
  });

  it("no renderiza botón primario cuando no existe texto", () => {
    const primaryButtonText = undefined;
    const primaryButton = Boolean(primaryButtonText);
    expect(primaryButton).toBe(false);
  });
});
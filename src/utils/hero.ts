export interface HeroButton {
  text: string;
  href: string;
  variant: "primary" | "secondary";
}

export function getHeroButtons(
  hasButtons: boolean,
  primaryButtonText: string | undefined,
  secondaryButtonText: string | undefined,
  primaryButtonHref = "/recetas",
  secondaryButtonHref = "/contacto",
): HeroButton[] {
  if (!hasButtons) return [];

  const buttons: HeroButton[] = [];
  if (primaryButtonText) {
    buttons.push({ text: primaryButtonText, href: primaryButtonHref, variant: "primary" });
  }
  if (secondaryButtonText) {
    buttons.push({ text: secondaryButtonText, href: secondaryButtonHref, variant: "secondary" });
  }
  return buttons;
}

import type { DesignTokens } from "./types";

export interface FontLoadResult {
  fontFamilies: string[];
  cssVariables: Record<string, string>;
  googleFontsUrl: string;
}

export function loadFonts(tokens: DesignTokens): FontLoadResult {
  const families = new Set<string>();
  families.add(tokens.typography.display.fontFamily);
  families.add(tokens.typography.h1.fontFamily);
  families.add(tokens.typography.body.fontFamily);
  families.add(tokens.typography.label.fontFamily);

  const uniqueFamilies = Array.from(families);

  const weights = new Set<number>();
  if (tokens.typography.display.fontWeight) weights.add(tokens.typography.display.fontWeight);
  if (tokens.typography.h1.fontWeight) weights.add(tokens.typography.h1.fontWeight);
  if (tokens.typography.label.fontWeight) weights.add(tokens.typography.label.fontWeight);
  weights.add(400);

  const weightString = Array.from(weights).sort().join(";");

  const params = uniqueFamilies
    .map((f) => `family=${f.replace(/ /g, "+")}:wght@${weightString}`)
    .join("&");

  const googleFontsUrl = `https://fonts.googleapis.com/css2?${params}&display=swap`;

  const cssVariables: Record<string, string> = {};
  for (const family of uniqueFamilies) {
    const key = `--font-${family.toLowerCase().replace(/ /g, "-")}`;
    cssVariables[key] = `'${family}', sans-serif`;
  }

  return {
    fontFamilies: uniqueFamilies,
    cssVariables,
    googleFontsUrl,
  };
}

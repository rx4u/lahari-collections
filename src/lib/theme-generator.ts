import type { DesignTokens } from "./types";

export function generateCSSVariables(
  tokens: DesignTokens,
  accentColor?: string
): Record<string, string> {
  const tertiary = accentColor || tokens.colors.tertiary;
  const btnBg = accentColor || tokens.components.buttonPrimary.backgroundColor;

  return {
    "--color-primary": tokens.colors.primary,
    "--color-secondary": tokens.colors.secondary,
    "--color-tertiary": tertiary,
    "--color-neutral": tokens.colors.neutral,
    "--color-surface": tokens.colors.surface,
    "--color-on-primary": tokens.colors.onPrimary,

    "--font-display": tokens.typography.display.fontFamily,
    "--font-display-size": tokens.typography.display.fontSize,
    "--font-display-weight": String(tokens.typography.display.fontWeight),
    "--font-display-tracking": tokens.typography.display.letterSpacing || "0",

    "--font-h1": tokens.typography.h1.fontFamily,
    "--font-h1-size": tokens.typography.h1.fontSize,
    "--font-h1-weight": String(tokens.typography.h1.fontWeight),

    "--font-body": tokens.typography.body.fontFamily,
    "--font-body-size": tokens.typography.body.fontSize,
    "--font-body-leading": String(tokens.typography.body.lineHeight),

    "--font-label": tokens.typography.label.fontFamily,
    "--font-label-size": tokens.typography.label.fontSize,
    "--font-label-weight": String(tokens.typography.label.fontWeight),
    "--font-label-tracking": tokens.typography.label.letterSpacing || "0",

    "--radius-sm": tokens.rounded.sm,
    "--radius-md": tokens.rounded.md,
    "--radius-lg": tokens.rounded.lg,

    "--spacing-sm": tokens.spacing.sm,
    "--spacing-md": tokens.spacing.md,
    "--spacing-lg": tokens.spacing.lg,

    "--btn-bg": btnBg,
    "--btn-text": tokens.components.buttonPrimary.textColor,
    "--btn-radius": tokens.components.buttonPrimary.rounded,
    "--btn-padding": tokens.components.buttonPrimary.padding,

    "--card-bg": tokens.components.card.backgroundColor,
    "--card-text": tokens.components.card.textColor,
    "--card-radius": tokens.components.card.rounded,
    "--card-padding": tokens.components.card.padding,
  };
}

export function cssVariablesToString(
  vars: Record<string, string>
): string {
  return Object.entries(vars)
    .map(([key, value]) => `${key}: ${value};`)
    .join("\n");
}

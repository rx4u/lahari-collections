import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { DesignTokens } from "./types";

export function parseDesignMd(filePath?: string): DesignTokens {
  const resolvedPath = filePath || path.join(process.cwd(), "design.md");
  const raw = fs.readFileSync(resolvedPath, "utf-8");
  const { data } = matter(raw);

  return {
    colors: {
      primary: data.colors.primary,
      secondary: data.colors.secondary,
      tertiary: data.colors.tertiary,
      neutral: data.colors.neutral,
      surface: data.colors.surface,
      onPrimary: data.colors["on-primary"],
    },
    typography: {
      display: {
        fontFamily: data.typography.display.fontFamily,
        fontSize: data.typography.display.fontSize,
        fontWeight: data.typography.display.fontWeight ?? 700,
        letterSpacing: data.typography.display.letterSpacing,
      },
      h1: {
        fontFamily: data.typography.h1.fontFamily,
        fontSize: data.typography.h1.fontSize,
        fontWeight: data.typography.h1.fontWeight ?? 700,
      },
      body: {
        fontFamily: data.typography.body.fontFamily,
        fontSize: data.typography.body.fontSize,
        lineHeight: data.typography.body.lineHeight,
      },
      label: {
        fontFamily: data.typography.label.fontFamily,
        fontSize: data.typography.label.fontSize,
        fontWeight: data.typography.label.fontWeight ?? 400,
        letterSpacing: data.typography.label.letterSpacing,
      },
    },
    rounded: {
      sm: data.rounded.sm,
      md: data.rounded.md,
      lg: data.rounded.lg,
    },
    spacing: {
      sm: data.spacing.sm,
      md: data.spacing.md,
      lg: data.spacing.lg,
    },
    components: {
      buttonPrimary: resolveComponent(data, data.components["button-primary"]),
      card: resolveComponent(data, data.components.card),
    },
  };
}

function resolveComponent(
  data: Record<string, unknown>,
  comp: Record<string, string>
) {
  return {
    backgroundColor: resolveRef(data, comp.backgroundColor),
    textColor: resolveRef(data, comp.textColor),
    rounded: resolveRef(data, comp.rounded),
    padding: String(comp.padding),
  };
}

function resolveRef(data: Record<string, unknown>, value: string): string {
  const match = value.match(/^\{(.+)\}$/);
  if (!match) return value;

  const keys = match[1].split(".");
  let result: unknown = data;
  for (const key of keys) {
    result = (result as Record<string, unknown>)[key];
  }
  return String(result);
}

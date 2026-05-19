import { execSync } from "child_process";
import fs from "fs";
import path from "path";
import type { RemixMeta } from "./types";

export type RemixMode = "theme" | "hero" | "sections" | "all";

export interface RemixResult {
  mode: RemixMode;
  changes: Record<string, { from: string; to: string }>;
}

function readCurrentConfig(configPath: string): {
  businessType: string;
  currentTheme: string;
  currentHero: string;
  currentSectionVariants: Record<string, string>;
  raw: string;
} {
  const raw = fs.readFileSync(configPath, "utf-8");

  const businessType = raw.match(/type:\s*"(\w+)"/)?.[1] ?? "local";
  const currentTheme = raw.match(/designMd:\s*"([^"]+)"/)?.[1] ?? "";
  const currentHero = raw.match(/style:\s*"([^"]+)"/)?.[1] ?? "centered";

  const sectionVariants: Record<string, string> = {};
  const sectionRegex = /type:\s*"(\w+)",\s*\n\s*variant:\s*"([^"]+)"/g;
  let match;
  while ((match = sectionRegex.exec(raw)) !== null) {
    sectionVariants[match[1]] = match[2];
  }

  return { businessType, currentTheme, currentHero, currentSectionVariants: sectionVariants, raw };
}

function pickNext(options: string[], current: string): string {
  const idx = options.indexOf(current);
  if (idx === -1) return options[0];
  return options[(idx + 1) % options.length];
}

export function remix(
  mode: RemixMode,
  configPath: string,
  meta: RemixMeta
): RemixResult {
  const config = readCurrentConfig(configPath);
  const changes: Record<string, { from: string; to: string }> = {};
  let updated = config.raw;

  if (mode === "theme" || mode === "all") {
    const next = pickNext(meta.compatibleThemes, config.currentTheme);
    if (next !== config.currentTheme) {
      const projectDir = path.dirname(configPath);
      execSync(`npx designdotmd add ${next} --force`, {
        cwd: projectDir,
        stdio: "pipe",
      });
      updated = updated.replace(
        /designMd:\s*"[^"]+"/,
        `designMd: "${next}"`
      );
      changes.theme = { from: config.currentTheme, to: next };
    }
  }

  if (mode === "hero" || mode === "all") {
    const next = pickNext(meta.compatibleHeros, config.currentHero);
    if (next !== config.currentHero) {
      updated = updated.replace(
        /(hero:\s*\{[^}]*?style:\s*)"[^"]+"/,
        `$1"${next}"`
      );
      changes.hero = { from: config.currentHero, to: next };
    }
  }

  if (mode === "sections" || mode === "all") {
    for (const [sectionType, variants] of Object.entries(meta.sectionVariants)) {
      const current = config.currentSectionVariants[sectionType];
      if (!current) continue;
      const next = pickNext(variants, current);
      if (next !== current) {
        const sectionPattern = new RegExp(
          `(type:\\s*"${sectionType}",\\s*\\n\\s*variant:\\s*)"[^"]+"`
        );
        updated = updated.replace(sectionPattern, `$1"${next}"`);
        changes[`section:${sectionType}`] = { from: current, to: next };
      }
    }
  }

  fs.writeFileSync(configPath, updated, "utf-8");

  return { mode, changes };
}

import type { DesignBrief, SiteConfig } from "./types";

function loadBrief(): DesignBrief | null {
  if (typeof window !== "undefined") return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs") as typeof import("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path") as typeof import("path");
    const briefPath = path.resolve(process.cwd(), "design-brief.json");
    if (!fs.existsSync(briefPath)) return null;
    return JSON.parse(fs.readFileSync(briefPath, "utf8")) as DesignBrief;
  } catch {
    return null;
  }
}

export function getLayoutCssVars(): Record<string, string> {
  const brief = loadBrief();
  const layout = brief?.layout;
  if (!layout) return {};

  const vars: Record<string, string> = {};
  if (layout.contentMaxWidth) vars["--container-max-w"] = layout.contentMaxWidth;
  if (layout.sectionPaddingMobile) vars["--section-y-mobile"] = layout.sectionPaddingMobile;
  if (layout.sectionPaddingTablet) vars["--section-y-tablet"] = layout.sectionPaddingTablet;
  if (layout.sectionPaddingDesktop) vars["--section-y-desktop"] = layout.sectionPaddingDesktop;
  return vars;
}

export function getMotionCssVars(): Record<string, string> {
  const brief = loadBrief();
  const motion = brief?.motion;
  if (!motion) return {};

  const vars: Record<string, string> = {};
  if (motion.durationFast) vars["--duration-fast"] = motion.durationFast;
  if (motion.durationNormal) vars["--duration-normal"] = motion.durationNormal;
  if (motion.durationSlow) vars["--duration-slow"] = motion.durationSlow;
  if (motion.easing) vars["--easing-default"] = motion.easing;
  return vars;
}

export function applyDesignBrief(config: SiteConfig): SiteConfig {
  const brief = loadBrief();
  if (!brief) return config;

  const merged = { ...config };

  if (brief.nav) {
    merged.nav = { ...config.nav, ...brief.nav };
  }

  if (brief.footer) {
    merged.footer = { ...config.footer, ...brief.footer } as SiteConfig["footer"];
  }

  if (brief.animation?.tier) {
    merged.animationTier = brief.animation.tier;
  }

  return merged;
}

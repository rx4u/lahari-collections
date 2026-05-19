import type { SiteConfig } from "./types";
import siteConfig from "../../site.config";
import { applyDesignBrief } from "./design-brief-loader";

export function getConfig(): SiteConfig {
  return applyDesignBrief(siteConfig);
}

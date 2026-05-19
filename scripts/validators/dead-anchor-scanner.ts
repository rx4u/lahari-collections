import { walk } from "./load-config";

export interface DeadAnchorFinding {
  path: string;
  anchor: string;
}

// Anchor target convention: lowercase, letter-prefixed, kebab. This excludes hex
// colors like #0d9488 (digit-prefixed) and other non-anchor strings that start with #.
const ANCHOR_RE = /^[a-z][a-z0-9-]*$/;

export function scanForDeadAnchors(config: Record<string, unknown>, knownAnchors: Set<string>): DeadAnchorFinding[] {
  const findings: DeadAnchorFinding[] = [];
  for (const { path, value } of walk(config)) {
    if (typeof value !== "string") continue;
    if (!value.startsWith("#")) continue;
    const anchor = value.slice(1).toLowerCase();
    if (!ANCHOR_RE.test(anchor)) continue;
    if (!knownAnchors.has(anchor)) findings.push({ path, anchor });
  }
  return findings;
}

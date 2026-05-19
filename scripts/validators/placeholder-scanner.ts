import { walk } from "./load-config";

export interface PlaceholderFinding {
  path: string;
  value: string;
  reason: string;
}

const BANNED_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\blorem ipsum\b/i, reason: "lorem ipsum placeholder copy" },
  { pattern: /\+1\s*\(?\s*(800|555)\s*\)?\s*555[\s-]?0\d{3}/, reason: "555 placeholder phone (reserved range)" },
  { pattern: /\b[a-z0-9._-]+@(example|test)\.(com|org|net)\b/i, reason: "example/test reserved email domain" },
  { pattern: /__PLACEHOLDER__/i, reason: "explicit __PLACEHOLDER__ sentinel from pipeline" },
];

export function scanForPlaceholders(config: Record<string, unknown>): PlaceholderFinding[] {
  const findings: PlaceholderFinding[] = [];
  for (const { path, value } of walk(config)) {
    if (typeof value !== "string") continue;
    for (const { pattern, reason } of BANNED_PATTERNS) {
      if (pattern.test(value)) findings.push({ path, value, reason });
    }
  }
  return findings;
}

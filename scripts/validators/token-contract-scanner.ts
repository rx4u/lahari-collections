/**
 * token-contract-scanner — enforces docs/design-token-contract.md
 *
 * Walks src/components/**, src/app/**, src/lib/** and matches each file's content
 * against a set of banned-pattern regexes. Each rule is a small, isolated grep.
 *
 * Findings can be grandfathered via scripts/validators/token-contract-allowlist.json
 * keyed by "<file>:<line>:<rule>". The repo-relative file path is used so the
 * allowlist is stable across checkouts.
 */
import fs from "fs";
import path from "path";

export interface TokenContractFinding {
  file: string; // repo-relative
  line: number;
  rule: string;
  match: string;
  fix: string;
}

export interface TokenContractRule {
  id: string;
  pattern: RegExp;
  fix: string;
  appliesTo: RegExp; // file extension test
  scope?: "dark-block"; // restrict pattern to inside `.dark { ... }` blocks
}

// All rules are global, multiline-safe. Patterns are conservative to keep
// false-positive rate low while still catching the documented bug shapes.
export const RULES: TokenContractRule[] = [
  // ── Family 1: design.md tokens used in wrong CSS property role ────────────
  {
    id: "no-primary-as-bg",
    // Matches CSS (`background:`, `background-color:`, `background-image:`) AND
    // React inline style camelCase (`backgroundColor:`, `backgroundImage:`).
    pattern: /(?:background(?:[Cc]olor|-color|[Ii]mage|-image)?)\s*:\s*[^,;{}\n]*var\(\s*--color-primary\s*\)/g,
    fix: "Use --color-neutral or --color-surface for backgrounds; --color-tertiary for branded fills.",
    appliesTo: /\.(tsx?|css)$/,
  },
  {
    id: "no-primary-as-bg",
    pattern: /\bbg-\[var\(\s*--color-primary\s*\)\]/g,
    fix: "Use bg-[var(--color-neutral)] / bg-[var(--color-surface)] / bg-[var(--color-tertiary)].",
    appliesTo: /\.(tsx?)$/,
  },
  {
    id: "no-secondary-as-bg",
    pattern: /(?:background(?:[Cc]olor|-color|[Ii]mage|-image)?)\s*:\s*[^,;{}\n]*var\(\s*--color-secondary\s*\)/g,
    fix: "--color-secondary is muted-text foreground; use --color-surface or --color-neutral for backgrounds.",
    appliesTo: /\.(tsx?|css)$/,
  },
  {
    id: "no-secondary-as-bg",
    pattern: /\bbg-\[var\(\s*--color-secondary\s*\)\]/g,
    fix: "Use bg-[var(--color-surface)] or bg-[var(--color-neutral)].",
    appliesTo: /\.(tsx?)$/,
  },
  {
    id: "no-neutral-as-color",
    // color: ... var(--color-neutral) ...  but NOT background-color
    // Negative lookbehind excludes `backgroundColor:`, `background-color:`, and `background:`.
    // Gap excludes `,` and `;` so the match cannot leak across declarations.
    pattern: /(?<![\w-])(?<!background)color\s*:\s*[^,;{}\n]*var\(\s*--color-neutral\s*\)/g,
    fix: "--color-neutral is a BACKGROUND token (page bg). For text use --color-primary, --color-secondary, or --color-on-primary.",
    appliesTo: /\.(tsx?|css)$/,
  },
  {
    id: "no-neutral-as-color",
    pattern: /\btext-\[var\(\s*--color-neutral\s*\)\]/g,
    fix: "Use text-[var(--color-primary)] or text-[var(--color-on-primary)] (text on accent fills).",
    appliesTo: /\.(tsx?)$/,
  },
  {
    id: "no-surface-as-color",
    pattern: /(?<![\w-])(?<!background)color\s*:\s*[^,;{}\n]*var\(\s*--color-surface\s*\)/g,
    fix: "--color-surface is a BACKGROUND token (cards/popovers). For text use --color-primary or --color-on-primary.",
    appliesTo: /\.(tsx?|css)$/,
  },
  {
    id: "no-surface-as-color",
    pattern: /\btext-\[var\(\s*--color-surface\s*\)\]/g,
    fix: "Use text-[var(--color-primary)] or text-[var(--color-on-primary)].",
    appliesTo: /\.(tsx?)$/,
  },

  // ── Family 2/4: rules that apply only inside `.dark { ... }` blocks ───────
  {
    // Broadened from the original muted-foreground-only rule: any use of
    // --color-on-primary inside .dark catches the same class of bug. The
    // token means "text ON the tertiary accent fill" — for any theme with
    // a bright accent + dark on-fill text (indigo button with dark text,
    // emerald with dark text, etc.) this inverts to broken contrast when
    // used in color-mix recipes that expect "light text on dark surface".
    id: "no-on-primary-in-dark-block",
    pattern: /var\(\s*--color-on-primary\s*\)/g,
    fix: "--color-on-primary is text-on-tertiary-fill — often dark on bright-accent themes. In .dark formulas use --color-primary (it inverts via design.md to the correct light value).",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-color-primary-override-in-dark",
    pattern: /--color-primary\s*:/g,
    fix: "Dark themes invert --color-primary via design.md, not via a .dark override block.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-color-neutral-override-in-dark",
    pattern: /--color-neutral\s*:/g,
    fix: "Dark themes invert --color-neutral via design.md, not via a .dark override block.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-color-surface-override-in-dark",
    pattern: /--color-surface\s*:/g,
    fix: "Dark themes invert --color-surface via design.md, not via a .dark override block.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-color-secondary-override-in-dark",
    pattern: /--color-secondary\s*:/g,
    fix: "Dark themes invert --color-secondary via design.md, not via a .dark override block.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-color-tertiary-override-in-dark",
    pattern: /--color-tertiary\s*:/g,
    fix: "Dark themes invert --color-tertiary via design.md, not via a .dark override block.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
  {
    id: "no-on-image-override-in-dark",
    pattern: /--color-on-image(?:-muted|-subtle)?\s*:/g,
    fix: "--color-on-image* is fixed-contrast for text over photo scrims — overriding in .dark defeats the purpose.",
    appliesTo: /\.css$/,
    scope: "dark-block",
  },
];

const SCAN_DIRS = ["src/components", "src/app", "src/lib"];

function walkFiles(root: string, dir: string, out: string[]): void {
  const full = path.join(root, dir);
  if (!fs.existsSync(full)) return;
  for (const entry of fs.readdirSync(full, { withFileTypes: true })) {
    const sub = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walkFiles(root, sub, out);
    } else if (entry.isFile()) {
      out.push(sub);
    }
  }
}

/**
 * Return [start, end) char offsets of every `.dark { ... }` block in text.
 * Counts brace depth so nested braces don't terminate early.
 *
 * CSS comments are stripped (replaced with same-length spaces) before
 * walking. Without this, a comment containing `.dark {` or an unbalanced
 * brace inside a comment would either produce a phantom range or extend
 * a real range past its closing `}`. Length-preserving replacement keeps
 * offset→line mapping correct.
 */
export function findDarkBlockRanges(text: string): Array<[number, number]> {
  // Strip /* ... */ comments to space-of-equal-length so offsets are preserved.
  const stripped = text.replace(/\/\*[\s\S]*?\*\//g, (m) => " ".repeat(m.length));
  const ranges: Array<[number, number]> = [];
  const re = /\.dark\s*\{/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(stripped)) !== null) {
    const openIdx = m.index + m[0].length - 1; // index of `{`
    let depth = 1;
    let i = openIdx + 1;
    while (i < stripped.length && depth > 0) {
      const ch = stripped[i];
      if (ch === "{") depth++;
      else if (ch === "}") depth--;
      i++;
    }
    ranges.push([openIdx, i]); // i points just past matching `}`
  }
  return ranges;
}

function offsetToLine(text: string, offset: number): number {
  let line = 1;
  for (let i = 0; i < offset && i < text.length; i++) {
    if (text.charCodeAt(i) === 10) line++;
  }
  return line;
}

function lineAt(text: string, offset: number): string {
  let start = offset;
  while (start > 0 && text.charCodeAt(start - 1) !== 10) start--;
  let end = offset;
  while (end < text.length && text.charCodeAt(end) !== 10) end++;
  return text.slice(start, end).trim();
}

function isInsideAnyRange(offset: number, ranges: Array<[number, number]>): boolean {
  for (const [s, e] of ranges) {
    if (offset >= s && offset < e) return true;
  }
  return false;
}

export interface AllowlistEntry {
  file: string;
  line: number;
  rule: string;
  reason?: string;
}

export function loadAllowlist(repoRoot: string): Set<string> {
  const p = path.join(repoRoot, "scripts/validators/token-contract-allowlist.json");
  if (!fs.existsSync(p)) return new Set();
  try {
    const raw = JSON.parse(fs.readFileSync(p, "utf8")) as { entries?: AllowlistEntry[] };
    const set = new Set<string>();
    for (const e of raw.entries ?? []) {
      set.add(`${e.file}:${e.line}:${e.rule}`);
    }
    return set;
  } catch {
    return new Set();
  }
}

export function scanContentForRules(
  fileRelPath: string,
  content: string,
  rules: TokenContractRule[] = RULES,
): TokenContractFinding[] {
  const findings: TokenContractFinding[] = [];
  const darkRanges = /\.css$/.test(fileRelPath) ? findDarkBlockRanges(content) : [];

  for (const rule of rules) {
    if (!rule.appliesTo.test(fileRelPath)) continue;
    // Reset lastIndex since regex is /g
    rule.pattern.lastIndex = 0;
    let m: RegExpExecArray | null;
    while ((m = rule.pattern.exec(content)) !== null) {
      const offset = m.index;
      if (rule.scope === "dark-block") {
        if (!isInsideAnyRange(offset, darkRanges)) continue;
      }
      const line = offsetToLine(content, offset);
      const lineText = lineAt(content, offset);
      findings.push({
        file: fileRelPath,
        line,
        rule: rule.id,
        match: lineText,
        fix: rule.fix,
      });
      // Guard against zero-width matches
      if (m.index === rule.pattern.lastIndex) rule.pattern.lastIndex++;
    }
  }
  return findings;
}

export function scanForTokenContractViolations(repoRoot: string): TokenContractFinding[] {
  const allowlist = loadAllowlist(repoRoot);
  const files: string[] = [];
  for (const d of SCAN_DIRS) walkFiles(repoRoot, d, files);

  const findings: TokenContractFinding[] = [];
  for (const rel of files) {
    if (!/\.(tsx?|css)$/.test(rel)) continue;
    const abs = path.join(repoRoot, rel);
    const content = fs.readFileSync(abs, "utf8");
    for (const f of scanContentForRules(rel, content)) {
      const key = `${f.file}:${f.line}:${f.rule}`;
      if (allowlist.has(key)) continue;
      findings.push(f);
    }
  }
  return findings;
}

export function groupByRule(findings: TokenContractFinding[]): Record<string, TokenContractFinding[]> {
  const out: Record<string, TokenContractFinding[]> = {};
  for (const f of findings) {
    (out[f.rule] ??= []).push(f);
  }
  return out;
}

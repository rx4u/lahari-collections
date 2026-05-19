# Pipeline Validators + Lint Rules — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Stop the class of bugs that shipped on Ridgeline (placeholder copy, dead anchors, empty sections, neutral-as-text-color, hardcoded maxWidth) by adding three prebuild validators and two ESLint rules to template-hub. Validators run as part of `pnpm prebuild`, so any client config that arrives at template-hub is checked before `next build` runs. ESLint rules apply at edit time and on `pnpm lint`.

**Architecture:**
- **Validators** live in `scripts/validators/` as TypeScript files (matching the existing `scripts/check-images.ts` pattern). A single entrypoint `scripts/check-config.ts` runs all three. `pnpm prebuild` runs both `check-images.ts` and `check-config.ts` sequentially.
- **Lint rules** live in `eslint.config.mjs` as `no-restricted-syntax` selectors scoped to `src/components/sections/**`. No custom plugin authored — selectors do all the work.
- **Tests** use Node's built-in `node:test` runner with `tsx` so no new test-framework dep is added. Test files live in `scripts/validators/__tests__/` and execute fixture configs through each validator.

**Tech Stack:** Node 24 (`node:test`), tsx 4, TypeScript 5, ESLint 9 (flat config), no new runtime deps.

**Out of scope:** Migrating editorial section variants to use `page-container` / correct text tokens (separate plan), committing per-client generated configs (separate plan), the broken Ridgeline site itself (do not fix per user instruction).

**Execution model:** Subagent-driven. Tasks 1, 2, 3, 6, 7 are independent and can be dispatched in parallel. Tasks 4, 5, 8 are sequential and depend on 1–3 / 6–7 being merged first.

---

## File Structure

```
template-hub/
├── scripts/
│   ├── check-images.ts                          (existing — untouched)
│   ├── check-config.ts                          (NEW — entry, runs all validators)
│   └── validators/
│       ├── placeholder-scanner.ts               (NEW — Task 1)
│       ├── dead-anchor-scanner.ts               (NEW — Task 2)
│       ├── empty-section-scanner.ts             (NEW — Task 3)
│       ├── load-config.ts                       (NEW — Task 1, shared helper)
│       ├── known-anchors.ts                     (NEW — Task 2, id registry)
│       └── __tests__/
│           ├── fixtures/
│           │   ├── ridgeline-shaped.ts          (NEW — Task 8, regression fixture)
│           │   ├── clean.ts                     (NEW — Task 1, passing fixture)
│           │   └── ...                          (per-task fixtures below)
│           ├── placeholder-scanner.test.ts      (NEW — Task 1)
│           ├── dead-anchor-scanner.test.ts      (NEW — Task 2)
│           ├── empty-section-scanner.test.ts    (NEW — Task 3)
│           └── ridgeline-regression.test.ts     (NEW — Task 8)
├── eslint.config.mjs                            (MODIFY — Tasks 6, 7)
├── package.json                                 (MODIFY — Tasks 4, 5)
└── CLAUDE.md                                    (MODIFY — Task 9)
```

---

## Task 1: Placeholder String Scanner

Detects ship-blocker placeholder strings (Marcus Chen, 555 numbers, example.com emails, lorem ipsum) anywhere in the resolved site config.

**Files:**
- Create: `scripts/validators/load-config.ts`
- Create: `scripts/validators/placeholder-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/clean.ts`
- Create: `scripts/validators/__tests__/fixtures/with-placeholders.ts`
- Create: `scripts/validators/__tests__/placeholder-scanner.test.ts`

**Banned-string list (final, do not edit without conversation):**
```ts
const BANNED_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\bMarcus Chen\b/, reason: "placeholder testimonial author" },
  { pattern: /\bJohn Doe\b/i, reason: "placeholder name" },
  { pattern: /\bJane (Doe|Smith)\b/i, reason: "placeholder name" },
  { pattern: /\blorem ipsum\b/i, reason: "placeholder copy" },
  { pattern: /\+1\s*\(?\s*(800|555)\s*\)?\s*555[\s-]?0\d{3}/, reason: "555 placeholder phone" },
  { pattern: /\b(example|test|placeholder|demo)@[a-z0-9.-]+\.[a-z]{2,}/i, reason: "placeholder email" },
  { pattern: /\bhello@example\.com\b/i, reason: "placeholder email" },
  { pattern: /\bSoftware Engineer, San Francisco\b/, reason: "ridgeline pipeline placeholder" },
];
```

- [ ] **Step 1: Create the shared config loader**

Create `scripts/validators/load-config.ts`:

```ts
import path from "path";
import { pathToFileURL } from "url";

export type ResolvedConfig = Record<string, unknown>;

export async function loadSiteConfig(repoRoot: string): Promise<ResolvedConfig> {
  const configPath = path.resolve(repoRoot, "site.config.ts");
  const url = pathToFileURL(configPath).href;
  const mod = (await import(url)) as { default?: ResolvedConfig };
  if (!mod.default) throw new Error(`site.config.ts at ${configPath} has no default export`);
  return mod.default;
}

export function* walk(node: unknown, pathArr: Array<string | number> = []): Generator<{ path: string; value: unknown }> {
  if (node === null || node === undefined) return;
  if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
    yield { path: pathArr.join("."), value: node };
    return;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walk(node[i], [...pathArr, i]);
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      yield* walk(v, [...pathArr, k]);
    }
  }
}
```

- [ ] **Step 2: Create the failing test**

Create `scripts/validators/__tests__/fixtures/clean.ts`:

```ts
import type { SiteConfig } from "../../../../src/lib/types";
const config: SiteConfig = {
  business: { type: "bakery", name: "Real Bakery", tagline: "", description: "", phone: "+919876543210", email: "owner@realbakery.in", address: "1 Main", city: "Pune", state: "MH", pincode: "411001", mapUrl: "", socialLinks: {}, hours: {}, logo: "", favicon: "" },
  theme: { designMd: "linen", accentColor: "#0d9488" },
  layout: { type: "single-page" },
  hero: { style: "centered", headline: "Real bakery", subheadline: "Real copy", cta: { text: "Order", url: "https://wa.me/919876543210", variant: "primary" } },
  sections: [],
  seo: { title: "Real Bakery", description: "Real desc", ogImage: "", keywords: ["bakery"], locale: "en_IN" },
  animationTier: "subtle",
  nav: { style: "sticky", ctaButton: "Order", ctaHref: "https://wa.me/919876543210" },
  footer: { variant: "warm-simple" },
};
export default config;
```

Create `scripts/validators/__tests__/fixtures/with-placeholders.ts`:

```ts
import baseline from "./clean";
const config = JSON.parse(JSON.stringify(baseline));
config.sections = [
  { type: "testimonials", variant: "carousel", navLabel: null, content: { headline: "Stories", items: [
    { name: "Marcus Chen", role: "Software Engineer, San Francisco", text: "Best ride." }
  ]}},
];
config.business.phone = "+1 (800) 555-0190";
config.business.email = "hello@example.com";
export default config;
```

Create `scripts/validators/__tests__/placeholder-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import path from "path";
import { fileURLToPath } from "url";
import { scanForPlaceholders } from "../placeholder-scanner";
import clean from "./fixtures/clean";
import dirty from "./fixtures/with-placeholders";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test("clean config produces zero findings", () => {
  const findings = scanForPlaceholders(clean as Record<string, unknown>);
  assert.equal(findings.length, 0);
});

test("placeholder config flags Marcus Chen", () => {
  const findings = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => /Marcus Chen/.test(f.value)));
});

test("placeholder config flags 555 phone", () => {
  const findings = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => /555/.test(f.value)));
});

test("placeholder config flags example.com email", () => {
  const findings = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => /example\.com/.test(f.value)));
});

test("each finding includes path and reason", () => {
  const findings = scanForPlaceholders(dirty as Record<string, unknown>);
  for (const f of findings) {
    assert.ok(f.path.length > 0);
    assert.ok(f.reason.length > 0);
  }
});
```

- [ ] **Step 3: Run the test to verify failure**

Run from repo root:
```bash
npx tsx --test scripts/validators/__tests__/placeholder-scanner.test.ts
```

Expected: FAIL — `Cannot find module '../placeholder-scanner'`.

- [ ] **Step 4: Implement the scanner**

Create `scripts/validators/placeholder-scanner.ts`:

```ts
import { walk } from "./load-config";

export interface PlaceholderFinding {
  path: string;
  value: string;
  reason: string;
}

const BANNED_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\bMarcus Chen\b/, reason: "placeholder testimonial author" },
  { pattern: /\bJohn Doe\b/i, reason: "placeholder name" },
  { pattern: /\bJane (Doe|Smith)\b/i, reason: "placeholder name" },
  { pattern: /\blorem ipsum\b/i, reason: "placeholder copy" },
  { pattern: /\+1\s*\(?\s*(800|555)\s*\)?\s*555[\s-]?0\d{3}/, reason: "555 placeholder phone" },
  { pattern: /\b(example|test|placeholder|demo)@[a-z0-9.-]+\.[a-z]{2,}/i, reason: "placeholder email" },
  { pattern: /\bhello@example\.com\b/i, reason: "placeholder email" },
  { pattern: /\bSoftware Engineer, San Francisco\b/, reason: "ridgeline pipeline placeholder" },
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
```

- [ ] **Step 5: Run the tests until they pass**

```bash
npx tsx --test scripts/validators/__tests__/placeholder-scanner.test.ts
```

Expected: 5 passing, 0 failing.

- [ ] **Step 6: Commit**

```bash
git add scripts/validators/load-config.ts scripts/validators/placeholder-scanner.ts scripts/validators/__tests__/fixtures/clean.ts scripts/validators/__tests__/fixtures/with-placeholders.ts scripts/validators/__tests__/placeholder-scanner.test.ts
git commit -m "feat(validators): placeholder string scanner — flags Marcus Chen, 555 numbers, example.com emails"
```

---

## Task 2: Dead Anchor Scanner

Verifies every `#anchor` href in the resolved config matches an `id="..."` actually emitted by some section component.

**Files:**
- Create: `scripts/validators/known-anchors.ts`
- Create: `scripts/validators/dead-anchor-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/with-dead-anchors.ts`
- Create: `scripts/validators/__tests__/dead-anchor-scanner.test.ts`

- [ ] **Step 1: Create the known-anchors registry**

Create `scripts/validators/known-anchors.ts`:

```ts
import fs from "fs";
import path from "path";

export function collectKnownAnchors(sectionsDir: string): Set<string> {
  const anchors = new Set<string>();
  function walkDir(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkDir(full);
      else if (entry.name.endsWith(".tsx")) {
        const text = fs.readFileSync(full, "utf8");
        for (const m of text.matchAll(/id=["']([a-z][a-z0-9-]*)["']/gi)) {
          anchors.add(m[1].toLowerCase());
        }
      }
    }
  }
  walkDir(sectionsDir);
  return anchors;
}
```

- [ ] **Step 2: Create the failing test**

Create `scripts/validators/__tests__/fixtures/with-dead-anchors.ts`:

```ts
import baseline from "./clean";
const config = JSON.parse(JSON.stringify(baseline));
config.hero.cta = { text: "Book Now", url: "#contact", variant: "primary" };
config.hero.secondaryCta = { text: "How it works", url: "#how-it-works-timeline" };
config.sections = [
  { type: "pricing", variant: "cards", navLabel: "Pricing", content: { headline: "Pricing", plans: [
    { name: "A", price: "$1", features: ["x"], cta: { text: "Buy", url: "#contact" } }
  ]}},
];
export default config;
```

Create `scripts/validators/__tests__/dead-anchor-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import clean from "./fixtures/clean";
import dirty from "./fixtures/with-dead-anchors";

const knownAnchors = new Set(["hero", "pricing", "about", "programs", "gallery", "testimonials", "faq", "cta", "how-it-works", "contact"]);

test("clean config produces zero findings", () => {
  const findings = scanForDeadAnchors(clean as Record<string, unknown>, knownAnchors);
  assert.equal(findings.length, 0);
});

test("missing #contact section is flagged", () => {
  const partial = new Set([...knownAnchors].filter((a) => a !== "contact"));
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, partial);
  assert.ok(findings.some((f) => f.anchor === "contact"));
});

test("misspelled #how-it-works-timeline is flagged when only #how-it-works exists", () => {
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, knownAnchors);
  assert.ok(findings.some((f) => f.anchor === "how-it-works-timeline"));
});

test("non-anchor URLs are ignored", () => {
  const config = { x: { url: "https://wa.me/123" }, y: { url: "/products" } };
  const findings = scanForDeadAnchors(config, knownAnchors);
  assert.equal(findings.length, 0);
});
```

- [ ] **Step 3: Run test to verify failure**

```bash
npx tsx --test scripts/validators/__tests__/dead-anchor-scanner.test.ts
```

Expected: FAIL — `Cannot find module '../dead-anchor-scanner'`.

- [ ] **Step 4: Implement the scanner**

Create `scripts/validators/dead-anchor-scanner.ts`:

```ts
import { walk } from "./load-config";

export interface DeadAnchorFinding {
  path: string;
  anchor: string;
}

export function scanForDeadAnchors(config: Record<string, unknown>, knownAnchors: Set<string>): DeadAnchorFinding[] {
  const findings: DeadAnchorFinding[] = [];
  for (const { path, value } of walk(config)) {
    if (typeof value !== "string") continue;
    if (!value.startsWith("#")) continue;
    const anchor = value.slice(1).toLowerCase();
    if (anchor.length === 0) continue;
    if (!knownAnchors.has(anchor)) findings.push({ path, anchor });
  }
  return findings;
}
```

- [ ] **Step 5: Run the tests until they pass**

```bash
npx tsx --test scripts/validators/__tests__/dead-anchor-scanner.test.ts
```

Expected: 4 passing, 0 failing.

- [ ] **Step 6: Commit**

```bash
git add scripts/validators/known-anchors.ts scripts/validators/dead-anchor-scanner.ts scripts/validators/__tests__/fixtures/with-dead-anchors.ts scripts/validators/__tests__/dead-anchor-scanner.test.ts
git commit -m "feat(validators): dead-anchor scanner — verifies every #anchor in config matches a section id emitted by a component"
```

---

## Task 3: Empty-Section Scanner

Fails if a section's required content array is empty (gallery without images, testimonials without items, pricing without plans, etc).

**Files:**
- Create: `scripts/validators/empty-section-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/with-empty-sections.ts`
- Create: `scripts/validators/__tests__/empty-section-scanner.test.ts`

- [ ] **Step 1: Create the failing test**

Create `scripts/validators/__tests__/fixtures/with-empty-sections.ts`:

```ts
import baseline from "./clean";
const config = JSON.parse(JSON.stringify(baseline));
config.sections = [
  { type: "gallery", variant: "fullwidth-carousel", navLabel: "Routes", content: { headline: "The terrain speaks.", images: [] } },
  { type: "testimonials", variant: "carousel", navLabel: null, content: { headline: "From the road.", items: [] } },
  { type: "pricing", variant: "cards", navLabel: "Pricing", content: { headline: "Pricing", plans: [] } },
  { type: "faq", variant: "accordion", navLabel: null, content: { headline: "Q.", items: [] } },
];
export default config;
```

Create `scripts/validators/__tests__/empty-section-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForEmptySections } from "../empty-section-scanner";
import clean from "./fixtures/clean";
import dirty from "./fixtures/with-empty-sections";

test("clean config (no sections requiring content) passes", () => {
  const findings = scanForEmptySections(clean as Record<string, unknown>);
  assert.equal(findings.length, 0);
});

test("empty gallery images array is flagged", () => {
  const findings = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => f.section === "gallery" && f.field === "images"));
});

test("empty testimonials items array is flagged", () => {
  const findings = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => f.section === "testimonials" && f.field === "items"));
});

test("empty pricing plans array is flagged", () => {
  const findings = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => f.section === "pricing" && f.field === "plans"));
});

test("empty faq items array is flagged", () => {
  const findings = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(findings.some((f) => f.section === "faq" && f.field === "items"));
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
npx tsx --test scripts/validators/__tests__/empty-section-scanner.test.ts
```

Expected: FAIL — `Cannot find module '../empty-section-scanner'`.

- [ ] **Step 3: Implement the scanner**

Create `scripts/validators/empty-section-scanner.ts`:

```ts
export interface EmptySectionFinding {
  index: number;
  section: string;
  field: string;
}

const REQUIRED_CONTENT_ARRAYS: Record<string, string[]> = {
  gallery: ["images"],
  testimonials: ["items"],
  pricing: ["plans"],
  faq: ["items"],
  programs: ["items"],
  services: ["items"],
  team: ["members"],
  stats: ["items"],
  process: ["steps"],
  menu: ["items"],
  products: ["items"],
};

export function scanForEmptySections(config: Record<string, unknown>): EmptySectionFinding[] {
  const findings: EmptySectionFinding[] = [];
  const sections = (config as { sections?: Array<{ type?: string; content?: Record<string, unknown> }> }).sections;
  if (!Array.isArray(sections)) return findings;
  sections.forEach((section, index) => {
    const type = section.type;
    if (!type) return;
    const required = REQUIRED_CONTENT_ARRAYS[type];
    if (!required) return;
    const content = section.content ?? {};
    for (const field of required) {
      const value = content[field];
      if (!Array.isArray(value) || value.length === 0) {
        findings.push({ index, section: type, field });
      }
    }
  });
  return findings;
}
```

- [ ] **Step 4: Run the tests until they pass**

```bash
npx tsx --test scripts/validators/__tests__/empty-section-scanner.test.ts
```

Expected: 5 passing, 0 failing.

- [ ] **Step 5: Commit**

```bash
git add scripts/validators/empty-section-scanner.ts scripts/validators/__tests__/fixtures/with-empty-sections.ts scripts/validators/__tests__/empty-section-scanner.test.ts
git commit -m "feat(validators): empty-section scanner — fails when gallery/testimonials/pricing/faq/programs/etc have empty content arrays"
```

---

## Task 4: Validator Entrypoint + Prebuild Wiring

Composes the three scanners into one entry script and wires it into `pnpm prebuild`.

**Depends on:** Tasks 1, 2, 3 merged.

**Files:**
- Create: `scripts/check-config.ts`
- Modify: `package.json:8` (the `prebuild` script line)

- [ ] **Step 1: Create the entrypoint**

Create `scripts/check-config.ts`:

```ts
import path from "path";
import { fileURLToPath } from "url";
import { loadSiteConfig } from "./validators/load-config";
import { scanForPlaceholders } from "./validators/placeholder-scanner";
import { scanForDeadAnchors } from "./validators/dead-anchor-scanner";
import { scanForEmptySections } from "./validators/empty-section-scanner";
import { collectKnownAnchors } from "./validators/known-anchors";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
const sectionsDir = path.resolve(repoRoot, "src/components/sections");

async function main() {
  const config = await loadSiteConfig(repoRoot);
  const knownAnchors = collectKnownAnchors(sectionsDir);

  const placeholders = scanForPlaceholders(config);
  const deadAnchors = scanForDeadAnchors(config, knownAnchors);
  const emptySections = scanForEmptySections(config);

  const total = placeholders.length + deadAnchors.length + emptySections.length;

  if (placeholders.length) {
    console.error(`\n[placeholder] ${placeholders.length} finding(s):`);
    for (const f of placeholders) console.error(`  ${f.path}: "${f.value}" — ${f.reason}`);
  }
  if (deadAnchors.length) {
    console.error(`\n[dead-anchor] ${deadAnchors.length} finding(s):`);
    for (const f of deadAnchors) console.error(`  ${f.path}: #${f.anchor} → no section emits this id`);
  }
  if (emptySections.length) {
    console.error(`\n[empty-section] ${emptySections.length} finding(s):`);
    for (const f of emptySections) console.error(`  sections[${f.index}] type=${f.section}: ${f.field}[] is empty`);
  }

  if (total > 0) {
    console.error(`\ncheck-config: ${total} blocker(s) — fix before deploying`);
    process.exit(1);
  }
  console.log("check-config: OK");
}

main().catch((err) => {
  console.error("check-config: unexpected error", err);
  process.exit(2);
});
```

- [ ] **Step 2: Wire it into prebuild**

Modify `package.json` line 8 (the `prebuild` script). Find:

```json
"prebuild": "tsx scripts/check-images.ts",
```

Replace with:

```json
"prebuild": "tsx scripts/check-images.ts && tsx scripts/check-config.ts",
```

- [ ] **Step 3: Verify with the current bakery test config**

The current `site.config.ts` (bakery test) has empty `services.items`, empty `testimonials.items`, etc. The validator should fail.

```bash
pnpm prebuild
```

Expected: FAIL with `[empty-section]` findings for sections present.

- [ ] **Step 4: Verify the entrypoint exits 0 on a clean fixture**

Manually swap `site.config.ts` with `scripts/validators/__tests__/fixtures/clean.ts` content (or use a temporary script to load the fixture). Run:

```bash
node --import tsx --eval "import('./scripts/check-config.ts')"
```

(For now, just confirm the command structure works — the bakery config will fail. That's the correct signal.)

- [ ] **Step 5: Commit**

```bash
git add scripts/check-config.ts package.json
git commit -m "feat(prebuild): wire placeholder/dead-anchor/empty-section validators into pnpm prebuild"
```

---

## Task 5: Add `pnpm test` script for validators

So the validators have a discoverable test command and CI can run them.

**Depends on:** Tasks 1, 2, 3 merged.

**Files:**
- Modify: `package.json:7` (scripts block — add a `test` line)

- [ ] **Step 1: Add the test script**

Modify `package.json` `scripts` block. After the `lint` line, add:

```json
"test": "node --import tsx --test scripts/validators/__tests__/**/*.test.ts",
```

The full scripts block should look like:

```json
"scripts": {
  "dev": "next dev --port 3748",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "test": "node --import tsx --test scripts/validators/__tests__/**/*.test.ts",
  "prebuild": "tsx scripts/check-images.ts && tsx scripts/check-config.ts",
  "remix": "tsx scripts/remix.ts"
},
```

- [ ] **Step 2: Run it**

```bash
pnpm test
```

Expected: all tests from Tasks 1, 2, 3 pass — 14 passing total.

- [ ] **Step 3: Commit**

```bash
git add package.json
git commit -m "chore(scripts): add pnpm test for validator suites"
```

---

## Task 6: ESLint Rule — Ban Inline maxWidth Literals in Section Components

Forces section components to use `<div className="page-container">` instead of inline `style={{ maxWidth: "1200px" }}` so per-theme overrides via `--container-max-w` actually take effect.

**Files:**
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Add the rule**

Open `eslint.config.mjs`. The current config is:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

Replace the entire file with:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["src/components/sections/**/*.tsx", "src/components/layout/**/*.tsx"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > Literal",
          message: "Do not hardcode maxWidth in section/layout components. Wrap content in <div className=\"page-container\"> so --container-max-w applies, or use a CSS variable.",
        },
        {
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > TemplateLiteral",
          message: "Do not hardcode maxWidth in section/layout components. Use page-container or a CSS variable.",
        },
      ],
    },
  },
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

- [ ] **Step 2: Verify the rule fires on a known offender**

```bash
pnpm lint -- src/components/sections/Hero/HeroEditorialBg.tsx
```

Expected: ERROR pointing at the `maxWidth: "1200px"` literal in `HeroEditorialBg.tsx` (around line 75 of that file).

- [ ] **Step 3: Verify the rule does NOT fire on token-compliant components**

```bash
pnpm lint -- src/components/sections/Pricing/PricingCards.tsx
```

Expected: no errors from this rule.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs
git commit -m "feat(lint): ban inline maxWidth literals in src/components/sections/** and src/components/layout/** — forces page-container usage"
```

---

## Task 7: ESLint Rule — Ban Background Tokens as Text Color

Bans `color: var(--color-neutral)`, `color: var(--color-surface)`, and `color: color-mix(... --color-neutral ...)` inside `style={{ color: ... }}` or string `color: var(--color-neutral)` props in section components. These are background tokens; using them as text color paints invisible text on most themes.

**Files:**
- Modify: `eslint.config.mjs`

- [ ] **Step 1: Add the rule**

Open `eslint.config.mjs` and add a third entry to the `no-restricted-syntax` array (in the section-files rules block). After the maxWidth selectors, add:

```js
{
  selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > Literal[value=/var\\(--color-(neutral|surface)\\)/]",
  message: "--color-neutral and --color-surface are BACKGROUND tokens. Using them as text color paints invisible text on most themes. Use --color-primary, --color-secondary, or --color-on-primary for text.",
},
{
  selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > TemplateLiteral",
  message: "Inline color via TemplateLiteral may hide a background-token-as-text-color bug. Use --color-primary / --color-secondary / --color-on-primary.",
},
```

The full `rules` block in the section-files config should now be:

```js
rules: {
  "no-restricted-syntax": [
    "error",
    {
      selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > Literal",
      message: "Do not hardcode maxWidth in section/layout components. Wrap content in <div className=\"page-container\"> so --container-max-w applies, or use a CSS variable.",
    },
    {
      selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > TemplateLiteral",
      message: "Do not hardcode maxWidth in section/layout components. Use page-container or a CSS variable.",
    },
    {
      selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > Literal[value=/var\\(--color-(neutral|surface)\\)/]",
      message: "--color-neutral and --color-surface are BACKGROUND tokens. Using them as text color paints invisible text on most themes. Use --color-primary, --color-secondary, or --color-on-primary for text.",
    },
    {
      selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > TemplateLiteral",
      message: "Inline color via TemplateLiteral may hide a background-token-as-text-color bug. Use --color-primary / --color-secondary / --color-on-primary.",
    },
  ],
},
```

- [ ] **Step 2: Verify the rule fires on AboutEditorialSplit.tsx**

```bash
pnpm lint -- src/components/sections/About/AboutEditorialSplit.tsx
```

Expected: ERROR pointing at the `color: \`color-mix(in oklch, var(--color-neutral) 55%, transparent)\`` template literal.

- [ ] **Step 3: Verify on HeroEditorialBg.tsx (should fire on neutral usages, not on `var(--color-on-primary)`)**

```bash
pnpm lint -- src/components/sections/Hero/HeroEditorialBg.tsx
```

Expected: no errors from this rule (HeroEditorialBg correctly uses `--color-on-primary` for text). Errors from Task 6 maxWidth rule may still appear — that's correct.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs
git commit -m "feat(lint): ban --color-neutral / --color-surface as text color in section components — they are background tokens"
```

---

## Task 8: Regression Fixture — Ridgeline-Shaped Config

Captures the exact failure modes of the Ridgeline deploy as a frozen test fixture. If anyone removes a validator, this test fails.

**Depends on:** Tasks 1, 2, 3 merged.

**Files:**
- Create: `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts`
- Create: `scripts/validators/__tests__/ridgeline-regression.test.ts`

- [ ] **Step 1: Create the regression fixture**

Create `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts`. This mimics the Ridgeline-shaped config that escaped to production:

```ts
import baseline from "./clean";
const config = JSON.parse(JSON.stringify(baseline));
config.business.name = "Ridgeline";
config.business.phone = "+1 (800) 555-0190";
config.business.email = "hello@example.com";
config.hero.cta = { text: "View Programs", url: "#programs", variant: "primary" };
config.hero.secondaryCta = { text: "How it works", url: "#how-it-works-timeline" };
config.sections = [
  { type: "programs", variant: "card-grid", navLabel: "Programs", content: { headline: "Three formats. One standard.", items: [
    { title: "Day Rides", description: "x", duration: "1 day", fee: "$290" }
  ]}},
  { type: "gallery", variant: "fullwidth-carousel", navLabel: "Routes", content: { headline: "The terrain speaks.", images: [] } },
  { type: "testimonials", variant: "carousel", navLabel: "Stories", content: { headline: "From the road.", items: [
    { name: "Marcus Chen", role: "Software Engineer, San Francisco", text: "I've done five rides." }
  ]}},
  { type: "pricing", variant: "cards", navLabel: "Pricing", content: { headline: "Pricing", plans: [
    { name: "Day Ride", price: "$290", features: ["x"], cta: { text: "Book a date", url: "#contact" } }
  ]}},
];
export default config;
```

- [ ] **Step 2: Create the regression test**

Create `scripts/validators/__tests__/ridgeline-regression.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForPlaceholders } from "../placeholder-scanner";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import { scanForEmptySections } from "../empty-section-scanner";
import config from "./fixtures/ridgeline-shaped";

const knownAnchors = new Set(["hero", "programs", "gallery", "testimonials", "pricing", "how-it-works", "about", "faq", "cta"]);

test("regression: ridgeline-shaped config trips placeholder scanner (Marcus Chen, 555 phone, example email)", () => {
  const findings = scanForPlaceholders(config as Record<string, unknown>);
  assert.ok(findings.some((f) => /Marcus Chen/.test(f.value)), "Marcus Chen not caught");
  assert.ok(findings.some((f) => /555/.test(f.value)), "555 phone not caught");
  assert.ok(findings.some((f) => /example\.com/.test(f.value)), "example.com email not caught");
});

test("regression: ridgeline-shaped config trips dead-anchor scanner (#contact, #how-it-works-timeline)", () => {
  const findings = scanForDeadAnchors(config as Record<string, unknown>, knownAnchors);
  assert.ok(findings.some((f) => f.anchor === "contact"), "#contact dead anchor not caught");
  assert.ok(findings.some((f) => f.anchor === "how-it-works-timeline"), "#how-it-works-timeline dead anchor not caught");
});

test("regression: ridgeline-shaped config trips empty-section scanner (gallery.images empty)", () => {
  const findings = scanForEmptySections(config as Record<string, unknown>);
  assert.ok(findings.some((f) => f.section === "gallery" && f.field === "images"), "empty gallery not caught");
});
```

- [ ] **Step 3: Run the regression test**

```bash
pnpm test
```

Expected: 3 new tests pass alongside the 14 from Tasks 1–3.

- [ ] **Step 4: Commit**

```bash
git add scripts/validators/__tests__/fixtures/ridgeline-shaped.ts scripts/validators/__tests__/ridgeline-regression.test.ts
git commit -m "test(regression): freeze ridgeline-shaped config as a regression fixture so its failure modes never recur"
```

---

## Task 9: Update CLAUDE.md with the New Guardrails

Documents the validators and lint rules so the next session and the pipeline maintainers know they exist.

**Files:**
- Modify: `CLAUDE.md` — add a new section after "Design Token Contract (NON-NEGOTIABLE)"

- [ ] **Step 1: Add the documentation block**

Open `CLAUDE.md`. After the line `Wired in src/lib/design-brief-loader.ts:getLayoutCssVars()...` and before `## Architecture Rules`, insert:

```markdown
## Pre-Deploy Guardrails (NON-NEGOTIABLE)

Two layers stop bad configs from shipping.

**1. Prebuild validators** — `tsx scripts/check-config.ts`, runs as part of `pnpm prebuild` after `check-images.ts`. Three scanners:
- `scripts/validators/placeholder-scanner.ts` — rejects "Marcus Chen", "+1 (800) 555-…", "example.com" emails, "lorem ipsum", and other known placeholder strings. Banned-list lives in the file; do not edit without conversation.
- `scripts/validators/dead-anchor-scanner.ts` — every `#anchor` href in the resolved config must match an `id="..."` actually emitted by some component in `src/components/sections/**`.
- `scripts/validators/empty-section-scanner.ts` — sections with required content arrays (`gallery.images`, `testimonials.items`, `pricing.plans`, `faq.items`, `programs.items`, `services.items`, `team.members`, `stats.items`, `process.steps`) must not ship empty.

Run: `pnpm prebuild` or `pnpm test` (test suite isolates each validator with fixtures).

**2. ESLint rules** — `eslint.config.mjs` `no-restricted-syntax` block, scoped to `src/components/sections/**` and `src/components/layout/**`. Two rules:
- Ban inline `maxWidth` / `max-width` literals → forces `<div className="page-container">` so `--container-max-w` is honored.
- Ban `color: var(--color-neutral)` / `color: var(--color-surface)` in inline `style={{}}` → these are BACKGROUND tokens; using them as text color paints invisible text. Use `--color-primary`, `--color-secondary`, or `--color-on-primary` for text.

Run: `pnpm lint`.

**Regression fixture:** `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts` freezes the exact config shape that broke on Ridgeline. The companion test `ridgeline-regression.test.ts` ensures no validator silently regresses.

**Adding a new validator:** drop a `scan*` function in `scripts/validators/`, wire it into `scripts/check-config.ts`, add tests under `__tests__/`. Follow the placeholder-scanner pattern.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude): document the prebuild validators and lint rules — Pre-Deploy Guardrails section"
```

---

## Self-Review

Coverage check against the user's brief:

| User ask | Task |
|---|---|
| Placeholder string scanner | Task 1 |
| Dead-anchor scanner | Task 2 |
| Empty-section scanner | Task 3 |
| Ban inline maxWidth | Task 6 |
| Ban neutral-as-text-color | Task 7 |
| Subagent-driven approach | Plan structured for parallel + serial dispatch (see below) |
| Stop class of bug recurring | Tasks 4 (prebuild wiring) + 5 (test cmd) + 8 (regression) + 9 (docs) |

No placeholders in the plan. Every code block is complete. Every command is exact. File paths are absolute or rooted at the repo.

---

## Subagent Dispatch Strategy

**Wave 1 — parallel (5 subagents in one message):**
- Task 1: Placeholder scanner
- Task 2: Dead-anchor scanner
- Task 3: Empty-section scanner
- Task 6: ESLint maxWidth rule
- Task 7: ESLint text-color rule

These touch disjoint files (`scripts/validators/*` vs `eslint.config.mjs`) and can land in any order.

**Wave 2 — sequential after Wave 1:**
- Task 4: Wire validators into `pnpm prebuild` (depends on 1, 2, 3)
- Task 5: Add `pnpm test` script (depends on 1, 2, 3)
- Task 8: Regression fixture (depends on 1, 2, 3)
- Task 9: CLAUDE.md docs (depends on 4, 5, 6, 7 for accurate command names)

**Two-stage review** between waves: parent reviews each subagent's diff for token-contract compliance + correct test wiring before merging into the working branch.

---

## Execution Choice

Plan complete and saved to `docs/superpowers/plans/2026-05-10-pipeline-validators-and-lint-rules.md`.

You said subagent-driven. The next move is to invoke `superpowers:subagent-driven-development` and dispatch Wave 1 (5 parallel subagents). Confirm and I'll proceed.

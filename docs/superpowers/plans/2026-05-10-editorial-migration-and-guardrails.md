# Editorial Migration + Guardrails — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix the rendering bugs that shipped on Ridgeline (page width ignored, neutral-as-text-color invisible text) by migrating the three editorial section components to honor the design-token contract. Then add lint rules so the same mistakes can't recur. Then add pipeline validators for the orthogonal class of config-shaped bugs.

**Why phase ordering matters:**
- **Phase 1 fixes the actual bug.** Hero and About on every Ridgeline-style site render correctly only after the components are migrated. Validators don't fix this.
- **Phase 2 locks the fix.** Once components conform, the lint rules go green; future regressions fail at edit time. If we added rules first, they'd fail on the existing offenders and block any work until migrated.
- **Phase 3 is independent.** Validators catch config-shaped bugs (placeholders, dead anchors, empty sections). They run in parallel to Phase 1 — no dependency.

**Tech Stack:** TypeScript, Framer Motion (existing), Node 24 `node:test`, ESLint 9 flat config, tsx 4. No new deps.

**Verification scheme (used in every Phase 1 task):**
1. Set a known override in `design-brief.json`: `{ "layout": { "contentMaxWidth": "1920px" } }`.
2. Run `pnpm build`.
3. Grep the produced static HTML in `.next/server/app/index.html` (or build output) for `1920px` — it must appear inside the migrated component's section.
4. Grep for `color:var(--color-neutral)` and `color:var(--color-surface)` — must NOT appear inside `<section id="about">`, `<section id="hero">`, `<section id="testimonials">`.

---

## File Structure

```
template-hub/
├── src/components/sections/
│   ├── Hero/HeroEditorialBg.tsx                      (MODIFY — Task 1)
│   ├── About/AboutEditorialSplit.tsx                 (MODIFY — Task 2)
│   └── Testimonials/TestimonialsEditorialCarousel.tsx (MODIFY — Task 3)
├── eslint.config.mjs                                  (MODIFY — Tasks 4, 5)
├── scripts/
│   ├── check-config.ts                                (NEW — Task 9)
│   └── validators/
│       ├── load-config.ts                             (NEW — Task 6)
│       ├── placeholder-scanner.ts                     (NEW — Task 6)
│       ├── dead-anchor-scanner.ts                     (NEW — Task 7)
│       ├── known-anchors.ts                           (NEW — Task 7)
│       ├── empty-section-scanner.ts                   (NEW — Task 8)
│       └── __tests__/                                 (NEW — Tasks 6/7/8/9)
├── package.json                                       (MODIFY — Task 9)
└── CLAUDE.md                                          (MODIFY — Task 10)
```

---

## Subagent Dispatch Strategy

| Wave | Tasks | Mode |
|---|---|---|
| 1 | Task 1, Task 2, Task 3 | **Parallel** — disjoint files (3 different components) |
| 2 | Task 4, Task 5 | **Parallel** — both edit `eslint.config.mjs` but additive (do them sequentially in one shot to avoid merge) → make this serial |
| 3 | Task 6, Task 7, Task 8 | **Parallel** — disjoint files |
| 4 | Task 9 | **Serial** — depends on Tasks 6-8 |
| 5 | Task 10 | **Serial** — depends on everything (CLAUDE.md doc) |

Wave 1 and Wave 3 can run **in parallel with each other** (different file sets entirely) — 6 subagents in flight simultaneously.

---

# Phase 1 — Editorial Component Migration (THE FIX)

## Task 1: Migrate HeroEditorialBg

**Files:** Modify `src/components/sections/Hero/HeroEditorialBg.tsx`.

**The bug:** Inner content wrapper hardcodes `maxWidth: "1200px"` — ignores `--container-max-w` override from `design-brief.json`. Hero text colors are correct (white on dark image). Only the maxWidth fix is needed here.

- [ ] **Step 1: Read the file**

```bash
cat src/components/sections/Hero/HeroEditorialBg.tsx | sed -n '60,80p'
```

Confirm the inner wrapper at approximately line 75 reads:
```tsx
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
```

- [ ] **Step 2: Apply the edit**

In `src/components/sections/Hero/HeroEditorialBg.tsx`, find the inner content wrapper (it sits inside the `<div className="relative z-10 flex flex-col justify-end h-full">` block):

**Old:**
```tsx
<div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
```

**New:**
```tsx
<div style={{ maxWidth: "var(--container-max-w)", margin: "0 auto", width: "100%" }}>
```

That is the only change in this file.

- [ ] **Step 3: Add a verification fixture**

Create `design-brief.json` at the repo root if it does not exist (or add the layout block to the existing one):

```json
{
  "layout": {
    "contentMaxWidth": "1920px"
  }
}
```

Note: this is a temporary override. The verification step uses it; do not commit it (added to `.gitignore` already? — check, and if not, do not stage).

- [ ] **Step 4: Build and grep**

```bash
pnpm build
grep -c "max-width:1920px\|maxWidth:1920px\|max-width: 1920px" .next/server/app/page.html 2>/dev/null || \
grep -rE "1920px" .next/server/app/ | head -5
```

Expected: at least one occurrence of `1920px` rendering inside the hero (`<section id="hero">`).

If the build artifact path differs (Next 16 may use `.next/server/app/index.html` or chunked), grep `.next/server/app/` recursively.

- [ ] **Step 5: Revert design-brief.json to baseline**

If you created a temporary `design-brief.json`, restore the previous state (delete the file or remove the `layout.contentMaxWidth` field). Do not commit the verification override.

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Hero/HeroEditorialBg.tsx
git commit -m "fix(hero): HeroEditorialBg honors --container-max-w token instead of hardcoded 1200px"
```

---

## Task 2: Migrate AboutEditorialSplit

**Files:** Modify `src/components/sections/About/AboutEditorialSplit.tsx`.

**The bugs (six occurrences):**
1. Line 66: hairline rule `background: "var(--color-neutral)"` — neutral is the page background. The rule is invisible.
2. Line 79: eyebrow `color: \`color-mix(in oklch, var(--color-neutral) 55%, transparent)\`` — invisible body text on neutral background.
3. Line 95: pull quote `color: "var(--color-neutral)"` — the headline is invisible.
4. Lines 139, 152: body paragraph `color-mix(... --color-neutral 60% ...)` — invisible body text.
5. Lines 170, 171: CTA `color: "var(--color-neutral)"` and `borderBottom: "1px solid var(--color-neutral)"` — invisible.
6. No max-width respect: each body paragraph has `maxWidth: "480px"` (intentional for readability — keep), but the outer column should honor `--container-max-w` so the editorial layout doesn't sprawl on widescreens.

**Token mapping (use exactly these substitutions):**

| Was | Become | Rationale |
|---|---|---|
| `background: "var(--color-neutral)"` (hairline at line 66) | `background: "var(--color-secondary)"` | Hairline needs to be visible against neutral page |
| `color: \`color-mix(in oklch, var(--color-neutral) 55%, transparent)\`` (eyebrow line 79) | `color: \`color-mix(in oklch, var(--color-primary) 55%, transparent)\`` | Body-token-tinted, visible |
| `color: "var(--color-neutral)"` (pull quote line 95) | `color: "var(--color-primary)"` | Headline color |
| `color: \`color-mix(in oklch, var(--color-neutral) 60%, transparent)\`` (body lines 139, 152) | `color: "var(--color-secondary)"` | Body text token |
| `color: "var(--color-neutral)"` (CTA line 170) | `color: "var(--color-primary)"` | Visible CTA |
| `borderBottom: "1px solid var(--color-neutral)"` (CTA line 171) | `borderBottom: "1px solid var(--color-primary)"` | Visible underline |

**Body paragraphs already constrain themselves to `maxWidth: "480px"`** — that's an intentional editorial readability cap, not a container width. Keep those. The outer text column does not need a separate maxWidth — its width is controlled by the parent grid (`gridTemplateColumns: "1fr 1fr"`).

- [ ] **Step 1: Read the file**

```bash
cat src/components/sections/About/AboutEditorialSplit.tsx
```

Note line numbers of every `var(--color-neutral)` and `color-mix(... --color-neutral` occurrence. You should find six edit sites matching the table above.

- [ ] **Step 2: Apply edits — one per occurrence**

Edit `src/components/sections/About/AboutEditorialSplit.tsx`. Apply each substitution from the token mapping table above. After all edits the file must contain **zero occurrences** of `var(--color-neutral)` and **zero occurrences** of `color-mix(in oklch, var(--color-neutral)`.

Verification grep (run after edits, must return 0):
```bash
grep -c "var(--color-neutral)" src/components/sections/About/AboutEditorialSplit.tsx
```

Expected output: `0`.

- [ ] **Step 3: Build and visually verify text shows up**

```bash
pnpm build
```

Grep the build output for the about section's body text. With the current `design.md` Heritage theme, body text token `--color-secondary` resolves to `#7A7370` (a warm grey). Confirm the rendered HTML applies that to the about section paragraphs (search build output for `color:var(--color-secondary)` inside `<section id="about">`).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/About/AboutEditorialSplit.tsx
git commit -m "fix(about): AboutEditorialSplit text colors — primary/secondary instead of neutral (background token)"
```

---

## Task 3: Migrate TestimonialsEditorialCarousel

**Files:** Modify `src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx`.

**The bugs:**
1. Line 73: oversized decorative quotemark `color: "var(--color-neutral)"` with `opacity: 0.04` — neutral on neutral. Should be `var(--color-primary)` for token correctness (the 0.04 opacity already makes it subtle).
2. Line 84: inner wrapper `maxWidth: "900px"` hardcoded — does not honor `--container-max-w`. (Note: 900px is narrower than 1440px on purpose — testimonials read better narrow. Keep narrow but make it token-aware: use `min(900px, var(--container-max-w))`.)
3. Line 108: blockquote `color: "var(--color-neutral)"` — quote text is invisible.
4. Line 120: hairline `background: "var(--color-neutral)"` — invisible.
5. Line 132: cite `color: \`color-mix(... --color-neutral 55% ...)\`` — author attribution invisible.
6. Lines 161, 198, 216: nav buttons + dash-dot indicators `color: "var(--color-neutral)"` and `background: "var(--color-neutral)"` — controls invisible.

**Token mapping:**

| Was | Become |
|---|---|
| `color: "var(--color-neutral)"` (decorative quote line 73) | `color: "var(--color-primary)"` |
| `maxWidth: "900px"` (inner wrapper line 84) | `maxWidth: "min(900px, var(--container-max-w))"` |
| `color: "var(--color-neutral)"` (blockquote line 108) | `color: "var(--color-primary)"` |
| `background: "var(--color-neutral)"` (hairline line 120) | `background: "var(--color-secondary)"` |
| `color: \`color-mix(in oklch, var(--color-neutral) 55%, transparent)\`` (cite line 132) | `color: "var(--color-secondary)"` |
| `color: "var(--color-neutral)"` (prev button line 161) | `color: "var(--color-primary)"` |
| `background: "var(--color-neutral)"` (dash-dot line 198) | `background: "var(--color-primary)"` |
| `color: "var(--color-neutral)"` (next button line 216) | `color: "var(--color-primary)"` |

- [ ] **Step 1: Read the file**

```bash
cat src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
```

Locate the eight occurrences. Each maps 1:1 with the table above.

- [ ] **Step 2: Apply edits**

After all edits the file must satisfy:
```bash
grep -c "var(--color-neutral)" src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
```
Expected: `0`.

```bash
grep -c "min(900px, var(--container-max-w))" src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
```
Expected: `1` (the inner wrapper).

- [ ] **Step 3: Build and verify**

```bash
pnpm build
```

In the build output, the testimonial section must render without any `color:var(--color-neutral)` declarations.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
git commit -m "fix(testimonials): editorial carousel text colors and width — primary/secondary instead of neutral, max-width respects --container-max-w"
```

---

# Phase 2 — Lock the Fix with Lint Rules

These tasks add `eslint.config.mjs` rules that fail on the bug shapes Phase 1 just fixed. After Phase 1 lands, the existing code passes; new code attempting the same mistakes fails at edit time.

## Task 4: ESLint Rule — Ban Inline maxWidth Literals in Section Components

**Files:** Modify `eslint.config.mjs`.

- [ ] **Step 1: Read current config**

```bash
cat eslint.config.mjs
```

Current content:
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

- [ ] **Step 2: Replace with the rule-extended version**

Replace the entire file contents with:

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
          selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > Literal[value=/[0-9]+(px|rem|em)/]",
          message: "Hardcoded maxWidth in a section/layout component ignores --container-max-w. Use page-container, or 'var(--container-max-w)', or 'min(<cap>, var(--container-max-w))'.",
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

The selector matches inline `style={{ maxWidth: "1200px" }}` literals but allows `style={{ maxWidth: "var(--container-max-w)" }}` and `style={{ maxWidth: "min(900px, var(--container-max-w))" }}` (those are not Literal `[0-9]+(px|rem|em)` matches — they contain `var(`).

- [ ] **Step 3: Verify it does NOT fire on the migrated components**

```bash
pnpm lint -- src/components/sections/Hero/HeroEditorialBg.tsx \
            src/components/sections/About/AboutEditorialSplit.tsx \
            src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
```

Expected: zero errors. (If errors fire, Phase 1 migration is incomplete — go back.)

- [ ] **Step 4: Verify it WOULD fire on the bug shape (regression test)**

Create a temporary file `/tmp/lint-regression.tsx`:
```tsx
export default function Bad() {
  return <div style={{ maxWidth: "1200px" }}>x</div>;
}
```

Move it temporarily to `src/components/sections/__lint-test/Bad.tsx`, run `pnpm lint`, verify the rule fires. Delete the file.

- [ ] **Step 5: Commit**

```bash
git add eslint.config.mjs
git commit -m "feat(lint): ban hardcoded maxWidth literals in section/layout components — must reference --container-max-w"
```

---

## Task 5: ESLint Rule — Ban Background Tokens as Text Color

**Files:** Modify `eslint.config.mjs` (additive — extends the rule from Task 4).

**Depends on:** Task 4 merged.

- [ ] **Step 1: Add the second rule**

In `eslint.config.mjs`, in the `no-restricted-syntax` array (added by Task 4), append two more selector entries. The full block now reads:

```js
{
  files: ["src/components/sections/**/*.tsx", "src/components/layout/**/*.tsx"],
  rules: {
    "no-restricted-syntax": [
      "error",
      {
        selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name=/^(maxWidth|max-width)$/] > Literal[value=/[0-9]+(px|rem|em)/]",
        message: "Hardcoded maxWidth in a section/layout component ignores --container-max-w. Use page-container, or 'var(--container-max-w)', or 'min(<cap>, var(--container-max-w))'.",
      },
      {
        selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > Literal[value=/var\\(--color-(neutral|surface)\\)/]",
        message: "--color-neutral and --color-surface are BACKGROUND tokens. Used as text color they paint invisible text. Use --color-primary, --color-secondary, or --color-on-primary for text.",
      },
      {
        selector: "JSXAttribute[name.name='style'] ObjectExpression > Property[key.name='color'] > TemplateLiteral[quasis.0.value.raw=/var\\(--color-(neutral|surface)\\)|color-mix\\([^)]*--color-(neutral|surface)/]",
        message: "--color-neutral / --color-surface are background tokens — even via color-mix(), do not use them as text color. Use --color-primary or --color-secondary.",
      },
    ],
  },
},
```

- [ ] **Step 2: Verify migrated components pass**

```bash
pnpm lint -- src/components/sections/About/AboutEditorialSplit.tsx \
            src/components/sections/Testimonials/TestimonialsEditorialCarousel.tsx
```

Expected: zero errors.

- [ ] **Step 3: Verify rule fires on the bug shape**

Create `src/components/sections/__lint-test/BadColor.tsx`:
```tsx
export default function BadColor() {
  return <div style={{ color: "var(--color-neutral)" }}>x</div>;
}
```

Run `pnpm lint`, confirm the second selector fires with the descriptive message. Delete the file.

- [ ] **Step 4: Commit**

```bash
git add eslint.config.mjs
git commit -m "feat(lint): ban --color-neutral and --color-surface as text color in section/layout components"
```

---

# Phase 3 — Pipeline Validators (Defense-in-Depth)

These three scanners catch a different class of bug from Phase 1/2: **config-shaped** problems that the lint rules cannot see. Run as part of `pnpm prebuild`.

## Task 6: Placeholder Sentinel Scanner (revised)

**Revised scope from prior plan:** drop the brittle "Marcus Chen" banned-list. Use only structural patterns that produce zero false positives.

**Files:**
- Create: `scripts/validators/load-config.ts`
- Create: `scripts/validators/placeholder-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/clean.ts`
- Create: `scripts/validators/__tests__/fixtures/with-placeholders.ts`
- Create: `scripts/validators/__tests__/placeholder-scanner.test.ts`

**Banned patterns (final, structural only):**
```ts
const BANNED_PATTERNS: Array<{ pattern: RegExp; reason: string }> = [
  { pattern: /\blorem ipsum\b/i, reason: "lorem ipsum placeholder copy" },
  { pattern: /\+1\s*\(?\s*(800|555)\s*\)?\s*555[\s-]?0\d{3}/, reason: "555 placeholder phone (RFC 3492 reserved range)" },
  { pattern: /\b[a-z0-9._-]+@(example|test)\.(com|org|net)\b/i, reason: "example/test email domain (RFC 2606 reserved)" },
  { pattern: /__PLACEHOLDER__/i, reason: "explicit __PLACEHOLDER__ sentinel — pipeline contract requires real content" },
];
```

These are domain-agnostic and won't false-positive on real client data. The pipeline (web-agency-pipeline, separate repo) gets a corresponding contract update: when it cannot generate real content for a field, it emits `__PLACEHOLDER__` so this scanner catches it at template-hub prebuild. That contract change is a separate plan against web-agency-pipeline; this plan only adds the scanner here.

- [ ] **Step 1: Create shared loader**

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

- [ ] **Step 2: Create fixtures and failing test**

Create `scripts/validators/__tests__/fixtures/clean.ts`:

```ts
const config = {
  business: { phone: "+919876543210", email: "owner@realbakery.in", address: "1 Main, Pune" },
  hero: { headline: "Real bakery", subheadline: "Real copy" },
  sections: [
    { type: "testimonials", content: { items: [
      { name: "Anita Sharma", role: "Customer", text: "Real review." }
    ]}},
  ],
};
export default config;
```

Create `scripts/validators/__tests__/fixtures/with-placeholders.ts`:

```ts
const config = {
  business: { phone: "+1 (800) 555-0190", email: "hello@example.com" },
  hero: { headline: "Lorem Ipsum dolor", subheadline: "__PLACEHOLDER__ subheadline" },
  sections: [],
};
export default config;
```

Create `scripts/validators/__tests__/placeholder-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForPlaceholders } from "../placeholder-scanner";
import clean from "./fixtures/clean";
import dirty from "./fixtures/with-placeholders";

test("clean config: zero findings", () => {
  assert.equal(scanForPlaceholders(clean as Record<string, unknown>).length, 0);
});

test("555 phone is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /555/.test(x.value)), "555 not caught");
});

test("@example.com email is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /example\.com/.test(x.value)), "example.com not caught");
});

test("lorem ipsum is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /lorem ipsum/i.test(x.value)), "lorem ipsum not caught");
});

test("__PLACEHOLDER__ sentinel is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.value.includes("__PLACEHOLDER__")), "sentinel not caught");
});

test("real names like Anita Sharma are NOT flagged", () => {
  const f = scanForPlaceholders(clean as Record<string, unknown>);
  assert.equal(f.filter((x) => /Anita/.test(x.value)).length, 0);
});
```

- [ ] **Step 3: Run test to verify failure**

```bash
node --import tsx --test scripts/validators/__tests__/placeholder-scanner.test.ts
```

Expected: FAIL — scanner not implemented.

- [ ] **Step 4: Implement scanner**

Create `scripts/validators/placeholder-scanner.ts`:

```ts
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
```

- [ ] **Step 5: Run tests until they pass**

```bash
node --import tsx --test scripts/validators/__tests__/placeholder-scanner.test.ts
```

Expected: 6 passing, 0 failing.

- [ ] **Step 6: Commit**

```bash
git add scripts/validators/load-config.ts scripts/validators/placeholder-scanner.ts scripts/validators/__tests__/fixtures/clean.ts scripts/validators/__tests__/fixtures/with-placeholders.ts scripts/validators/__tests__/placeholder-scanner.test.ts
git commit -m "feat(validators): placeholder scanner — structural patterns only (lorem ipsum, 555 phones, example.com, __PLACEHOLDER__ sentinel)"
```

---

## Task 7: Dead Anchor Scanner

**Files:**
- Create: `scripts/validators/known-anchors.ts`
- Create: `scripts/validators/dead-anchor-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/with-dead-anchors.ts`
- Create: `scripts/validators/__tests__/dead-anchor-scanner.test.ts`

**Depends on:** Task 6 merged (uses `walk` from `load-config.ts`).

- [ ] **Step 1: Create the known-anchors collector**

Create `scripts/validators/known-anchors.ts`:

```ts
import fs from "fs";
import path from "path";

export function collectKnownAnchors(sectionsDir: string): Set<string> {
  const anchors = new Set<string>();
  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return;
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

- [ ] **Step 2: Create fixture and failing test**

Create `scripts/validators/__tests__/fixtures/with-dead-anchors.ts`:

```ts
const config = {
  hero: {
    cta: { url: "#contact" },
    secondaryCta: { url: "#how-it-works-timeline" },
  },
  sections: [
    { type: "pricing", content: { plans: [
      { cta: { url: "#contact" } },
    ]}},
    { type: "external", content: { link: { url: "https://wa.me/123" } } },
    { type: "internal", content: { link: { url: "/products" } } },
  ],
};
export default config;
```

Create `scripts/validators/__tests__/dead-anchor-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import dirty from "./fixtures/with-dead-anchors";

test("dead #contact is flagged when no section emits id=contact", () => {
  const known = new Set(["hero", "pricing", "how-it-works"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.ok(findings.some((f) => f.anchor === "contact"));
});

test("misspelled #how-it-works-timeline is flagged", () => {
  const known = new Set(["hero", "pricing", "how-it-works", "contact"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.ok(findings.some((f) => f.anchor === "how-it-works-timeline"));
});

test("external https URLs are not flagged", () => {
  const known = new Set(["hero", "pricing", "how-it-works", "contact"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.equal(findings.filter((f) => f.anchor === "wa.me/123" || f.anchor.startsWith("http")).length, 0);
});

test("internal route paths (/products) are not flagged", () => {
  const known = new Set(["hero", "pricing"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.equal(findings.filter((f) => f.anchor === "products").length, 0);
});
```

- [ ] **Step 3: Run test to verify failure**

```bash
node --import tsx --test scripts/validators/__tests__/dead-anchor-scanner.test.ts
```

Expected: FAIL.

- [ ] **Step 4: Implement scanner**

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

- [ ] **Step 5: Run tests until they pass**

```bash
node --import tsx --test scripts/validators/__tests__/dead-anchor-scanner.test.ts
```

Expected: 4 passing.

- [ ] **Step 6: Commit**

```bash
git add scripts/validators/known-anchors.ts scripts/validators/dead-anchor-scanner.ts scripts/validators/__tests__/fixtures/with-dead-anchors.ts scripts/validators/__tests__/dead-anchor-scanner.test.ts
git commit -m "feat(validators): dead-anchor scanner — every #anchor href in config must match an id emitted by some section component"
```

---

## Task 8: Empty-Section Scanner

**Files:**
- Create: `scripts/validators/empty-section-scanner.ts`
- Create: `scripts/validators/__tests__/fixtures/with-empty-sections.ts`
- Create: `scripts/validators/__tests__/empty-section-scanner.test.ts`

- [ ] **Step 1: Create fixture and failing test**

Create `scripts/validators/__tests__/fixtures/with-empty-sections.ts`:

```ts
const config = {
  sections: [
    { type: "gallery", content: { headline: "x", images: [] } },
    { type: "testimonials", content: { headline: "x", items: [] } },
    { type: "pricing", content: { headline: "x", plans: [] } },
    { type: "faq", content: { headline: "x", items: [] } },
    { type: "programs", content: { headline: "x", items: [] } },
  ],
};
export default config;
```

Create `scripts/validators/__tests__/empty-section-scanner.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForEmptySections } from "../empty-section-scanner";
import dirty from "./fixtures/with-empty-sections";

test("empty gallery.images is flagged", () => {
  const f = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "gallery" && x.field === "images"));
});

test("empty testimonials.items is flagged", () => {
  const f = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "testimonials" && x.field === "items"));
});

test("empty pricing.plans is flagged", () => {
  const f = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "pricing" && x.field === "plans"));
});

test("empty faq.items is flagged", () => {
  const f = scanForEmptySections(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "faq" && x.field === "items"));
});

test("populated config produces no findings", () => {
  const populated = { sections: [{ type: "gallery", content: { images: [{ src: "/x.jpg" }] }}]};
  const f = scanForEmptySections(populated as Record<string, unknown>);
  assert.equal(f.length, 0);
});
```

- [ ] **Step 2: Run test to verify failure**

```bash
node --import tsx --test scripts/validators/__tests__/empty-section-scanner.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement scanner**

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

- [ ] **Step 4: Run tests until pass**

```bash
node --import tsx --test scripts/validators/__tests__/empty-section-scanner.test.ts
```

Expected: 5 passing.

- [ ] **Step 5: Commit**

```bash
git add scripts/validators/empty-section-scanner.ts scripts/validators/__tests__/fixtures/with-empty-sections.ts scripts/validators/__tests__/empty-section-scanner.test.ts
git commit -m "feat(validators): empty-section scanner — fails when required content arrays are empty"
```

---

## Task 9: Wire Validators into Prebuild + Add Test Script

**Files:**
- Create: `scripts/check-config.ts`
- Modify: `package.json` scripts block

**Depends on:** Tasks 6, 7, 8 merged.

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

- [ ] **Step 2: Update package.json scripts**

Modify the `scripts` block in `package.json`. After:
```json
"prebuild": "tsx scripts/check-images.ts",
```
Replace with:
```json
"prebuild": "tsx scripts/check-images.ts && tsx scripts/check-config.ts",
"test": "node --import tsx --test scripts/validators/__tests__/**/*.test.ts",
```

The full scripts block becomes:
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

- [ ] **Step 3: Run the full test suite**

```bash
pnpm test
```

Expected: all 15 tests across the three scanners pass.

- [ ] **Step 4: Run prebuild against the current local config**

```bash
pnpm prebuild
```

Expected: the bakery test config (current `site.config.ts`) has empty `services.items` and `testimonials.items` and other empty arrays — `check-config` should fail with `[empty-section]` findings, which is the **correct** signal. Document the failure as expected, do not fix the bakery config (it's a test fixture).

- [ ] **Step 5: Add a regression fixture for the Ridgeline shape**

Create `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts`:

```ts
const config = {
  business: { phone: "+1 (800) 555-0190", email: "hello@example.com" },
  hero: {
    cta: { url: "#programs" },
    secondaryCta: { url: "#how-it-works-timeline" },
  },
  sections: [
    { type: "gallery", content: { headline: "x", images: [] } },
    { type: "pricing", content: { plans: [
      { cta: { url: "#contact" } },
    ]}},
  ],
};
export default config;
```

Create `scripts/validators/__tests__/ridgeline-regression.test.ts`:

```ts
import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForPlaceholders } from "../placeholder-scanner";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import { scanForEmptySections } from "../empty-section-scanner";
import config from "./fixtures/ridgeline-shaped";

const known = new Set(["hero", "programs", "pricing", "how-it-works"]);

test("regression: placeholder scanner catches 555 phone and example.com", () => {
  const f = scanForPlaceholders(config as Record<string, unknown>);
  assert.ok(f.some((x) => /555/.test(x.value)));
  assert.ok(f.some((x) => /example\.com/.test(x.value)));
});

test("regression: dead-anchor scanner catches #contact and #how-it-works-timeline", () => {
  const f = scanForDeadAnchors(config as Record<string, unknown>, known);
  assert.ok(f.some((x) => x.anchor === "contact"));
  assert.ok(f.some((x) => x.anchor === "how-it-works-timeline"));
});

test("regression: empty-section scanner catches empty gallery.images", () => {
  const f = scanForEmptySections(config as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "gallery" && x.field === "images"));
});
```

- [ ] **Step 6: Run regression suite**

```bash
pnpm test
```

Expected: all 18 tests pass (15 + 3 regression).

- [ ] **Step 7: Commit**

```bash
git add scripts/check-config.ts package.json scripts/validators/__tests__/fixtures/ridgeline-shaped.ts scripts/validators/__tests__/ridgeline-regression.test.ts
git commit -m "feat(prebuild): wire validators into pnpm prebuild + add ridgeline regression fixture"
```

---

## Task 10: Document the Guardrails in CLAUDE.md

**Files:** Modify `CLAUDE.md`.

**Depends on:** Tasks 1-9 merged.

- [ ] **Step 1: Add a new section**

In `CLAUDE.md`, after the `## Design Token Contract (NON-NEGOTIABLE)` section ends (just before `## Architecture Rules`), insert:

```markdown
## Pre-Deploy Guardrails (NON-NEGOTIABLE)

Two layers prevent regressions of the Ridgeline-class bugs (page width ignored, neutral-as-text-color invisible text, placeholder content shipping live, dead anchors, empty content sections).

**Layer 1 — ESLint rules (`eslint.config.mjs`)**, scoped to `src/components/sections/**` and `src/components/layout/**`:
- Hardcoded `maxWidth` literals in inline `style={...}` — banned. Use `var(--container-max-w)` or `<div className="page-container">` so per-theme width overrides take effect.
- `color: var(--color-neutral)` and `color: var(--color-surface)` in inline `style={...}` — banned. These are BACKGROUND tokens; using them as text color paints invisible text. Use `--color-primary` (text), `--color-secondary` (muted text), or `--color-on-primary` (text on primary fill).

Run: `pnpm lint`.

**Layer 2 — Prebuild config validators (`scripts/check-config.ts`)**, run by `pnpm prebuild`:
- `placeholder-scanner` — flags `lorem ipsum`, 555-prefix phones, `*@example.com` / `*@test.com` emails, and the explicit `__PLACEHOLDER__` sentinel. Pipeline contract: when web-agency-pipeline cannot generate real content for a field, it emits `__PLACEHOLDER__:fieldname:__` so this scanner catches it.
- `dead-anchor-scanner` — every `#anchor` href in `site.config.ts` must match an `id="..."` actually emitted by some component in `src/components/sections/**`.
- `empty-section-scanner` — sections with required content arrays must not ship empty: `gallery.images`, `testimonials.items`, `pricing.plans`, `faq.items`, `programs.items`, `services.items`, `team.members`, `stats.items`, `process.steps`, `menu.items`, `products.items`.

Run: `pnpm prebuild` (full chain: `check-images.ts` → `check-config.ts`) or `pnpm test` (validator suite alone).

**Regression fixture:** `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts` freezes the exact failure shape that shipped to ridgeline-iota.vercel.app. The `ridgeline-regression.test.ts` companion test fails if any validator silently regresses.

**Adding a new validator:** drop a `scan*` function in `scripts/validators/`, wire it into `scripts/check-config.ts`, add a fixture and test under `__tests__/`. Pattern reference: `placeholder-scanner.ts`.

**Adding a new editorial section variant:** the lint rules will reject inline hardcoded `maxWidth` and inline `color: var(--color-neutral|surface)`. Use `var(--container-max-w)` and the appropriate text token from the start.
```

- [ ] **Step 2: Commit**

```bash
git add CLAUDE.md
git commit -m "docs(claude): document Pre-Deploy Guardrails — lint rules + prebuild validators + regression fixture"
```

---

## Self-Review

**Coverage check against user's brief:**

| User ask (verbatim) | Where addressed |
|---|---|
| "page width content not followed especially in the hero" | Task 1 (HeroEditorialBg `1200px` → `var(--container-max-w)`) |
| "color not working" | Task 2 (AboutEditorialSplit 6 sites), Task 3 (TestimonialsEditorialCarousel 8 sites) |
| "fix our hub" | Tasks 1-3 (the actual fix) |
| "build pipeline validators" | Tasks 6, 7, 8, 9 |
| "lint rules ban inline maxWidth" | Task 4 |
| "lint rules ban neutral-as-text-color" | Task 5 |
| "subagent driven approach" | Wave structure documented at top; each task is self-contained |
| "this class of bug stops recurring" | Task 8 regression fixture + Task 10 CLAUDE.md doc |

**Placeholder scan:** Every code block contains complete code. Every grep / shell command is exact. No "TBD" or "similar to above". Token-mapping tables in Tasks 2 and 3 list every site to edit.

**Type/path consistency:**
- `loadSiteConfig` and `walk` are defined in Task 6 and consumed in Task 9 — same signatures.
- `scanForPlaceholders` / `scanForDeadAnchors` / `scanForEmptySections` defined in 6/7/8, consumed in 9. Names match.
- `collectKnownAnchors` defined in Task 7, consumed in Task 9.

**Risks acknowledged (from prior conversation):**
- Validators are reactive; they catch known structural patterns. Novel placeholder shapes still slip through unless paired with the pipeline-side `__PLACEHOLDER__` contract change. That contract change lives in web-agency-pipeline (separate plan, not this one).
- Lint rules cover `src/components/sections/**` and `src/components/layout/**`. Code outside these paths isn't checked.
- Verification of Phase 1 uses `pnpm build` + grep on output. If Next 16 changes the build artifact path, the grep targets need updating in the task instructions.

---

## Execution

Plan saved to `docs/superpowers/plans/2026-05-10-editorial-migration-and-guardrails.md`.

Subagent-driven dispatch order:

1. **Wave 1 (3 parallel):** Tasks 1, 2, 3 — component migrations
2. **Wave 3 (3 parallel, can start at the same time as Wave 1):** Tasks 6, 7, 8 — validator scanners
3. **Wave 2 (serial after Wave 1):** Tasks 4, 5 — lint rules
4. **Wave 4 (serial after Wave 3):** Task 9 — wiring
5. **Wave 5 (serial after everything):** Task 10 — docs

Total: 6 subagents in flight at peak (Wave 1 + Wave 3 simultaneously). Confirm and I will dispatch.

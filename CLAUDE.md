# TEMPLATE HUB

## Project Overview
Template Hub is a config-driven Next.js site generation engine for any business website. A single reusable template renders any business type (doctor, restaurant, salon, gym, hospital, hotel, etc.) from a `site.config.ts` file. Themes come from designdotmd (156 presets). Sections are composable React components with multiple variants. Integrates with multiple tools: web-agency-pipeline (prospecting + deploy), Dribbble shots generator, UI8 templates, and more. Target user: solo web agency operator (Raja) using Claude Code.

## Tech Stack
- Framework: Next.js 16 (App Router) + TypeScript
- Styling: Tailwind CSS v4 with @theme tokens driven by design.md
- UI: shadcn/ui (vendored primitives)
- Animation: Framer Motion (base) + GSAP ScrollTrigger (standard/premium tiers) + hero-canvas skill (premium heroes)
- Icons: Lucide (via lucide-react)
- Fonts: Dynamic via next/font/google, parsed from design.md
- Theme source: designdotmd (npx designdotmd add [id])
- Deploy: Vercel CLI
- Package manager: pnpm
- No database. No auth. No API routes. Static site output.

## Design System
- Theme is NOT hardcoded. It's parsed from design.md (YAML frontmatter) at build time.
- design.md provides: colors (primary, secondary, tertiary, neutral, surface, on-primary), typography (display, h1, body, label with fontFamily, fontSize, fontWeight, letterSpacing, lineHeight), rounded (sm, md, lg), spacing (sm, md, lg), components (button-primary, card).
- All section components use CSS custom properties: var(--color-primary), var(--color-tertiary), var(--font-display), var(--radius-md), var(--spacing-md), etc.
- NEVER hardcode colors, fonts, or spacing in components. Always use CSS variables.
- Dark mode: auto-detected from colors.neutral lightness. If neutral is dark (OKLCH lightness < 0.3), `src/app/layout.tsx` adds `class="dark"` on `<html>` and sets `color-scheme: dark`. The `.dark` block in `globals.css` only adjusts border/input/muted-foreground via `color-mix` — it does NOT hardcode oklch overrides, because the design.md palette already encodes the dark theme's colors.
- Shadcn ↔ design.md bridge: shadcn tokens (`--background`, `--foreground`, `--card`, `--border`, `--muted-foreground`, etc.) are mapped to design.md tokens in `globals.css :root`. To change a theme, edit design.md — shadcn-bound components reflow automatically. Never hardcode `--background: oklch(...)` in `.dark`; reference `--color-*` tokens or `color-mix` recipes against them.
- Icons: Lucide only. Import from lucide-react. No mixing.
- Animation: Tiered system. Base = Framer Motion (fade-up, stagger, layout). Standard = add GSAP ScrollTrigger (parallax, pinning, text reveals). Premium = add hero-canvas animations (particles, 3D, shaders). Each business preset specifies its tier. NEVER flat/static sections.
- Animation tier mapping: subtle (doctor, lawyer, hospital), standard (salon, restaurant, school, hotel), premium (gym, events, photographer, jewellery).
- Skills for animation: hero-canvas for premium hero sections, cinematic-scroll for premium scroll experiences.

## Design Token Contract (NON-NEGOTIABLE)

All structural and semantic values in section components must reference design tokens, not raw Tailwind utilities. Defined in `src/app/globals.css`. To change a value system-wide, edit one place.

**Section structure:**
- `<section className="section-y">` — vertical rhythm. Owns mobile (4rem) → tablet (5rem) → desktop (6rem) padding scale. Never hardcode `py-12/16/20/24` on `<section>`.
- `<div className="page-container">` — horizontal container. `max-width: 1440px + mx-auto + px-4 / sm:px-6 / lg:px-8`. Never hardcode `max-w-[1440px]` or the gutter chain. React wrapper: `src/components/layout/SiteContainer.tsx`.
- Canonical pattern:
  ```tsx
  <section className="section-y">
    <div className="page-container">
      ...
    </div>
  </section>
  ```

**Theme tokens (driven by design.md, change per theme):**
- Colors: `var(--color-primary | secondary | tertiary | neutral | surface | on-primary)`
- Typography: `var(--font-display | h1 | body | label)` and matching `-size`, `-weight`, `-tracking`
- Radius: `rounded-[var(--radius-sm | md | lg)]` for cards, inputs, buttons. `rounded-full` for avatars/pills is fine. `rounded-2xl/3xl` for intentional non-theme uses.
- Spacing (internal element gaps only, NOT section padding): `var(--spacing-sm | md | lg)`

**Semantic tokens (state colors, theme-independent):**
- `var(--color-success | -soft)` — open, available, veg, joined
- `var(--color-danger | -soft)` — closed, sold, emergency, nonveg
- `var(--color-warning | -soft)` — alerts, pending
- `var(--color-info | -soft)` — rented, info badges
- `var(--color-rating)` — stars
- `var(--color-whatsapp)` — brand-locked WhatsApp green

Never use raw Tailwind palette colors (`bg-red-500`, `text-emerald-600` etc.) for state. Reach for the semantic tokens.

**Z-index scale:** `var(--z-overlay | sticky | dropdown | header | modal)` — use these instead of raw `z-10/20/50`.

**Animation timing:** `var(--duration-fast | normal | slow)` and `var(--easing-default)` for hover/transition timing.

**Per-theme overrides (via `design-brief.json`):**
Both structural (container width, section padding) and motion (timing, easing) are CSS-var-driven and overridable per theme without touching components.

```json
{
  "layout": {
    "contentMaxWidth": "1920px",
    "sectionPaddingMobile": "3rem",
    "sectionPaddingTablet": "4.5rem",
    "sectionPaddingDesktop": "8rem"
  },
  "motion": {
    "durationFast": "120ms",
    "durationNormal": "200ms",
    "durationSlow": "400ms",
    "easing": "cubic-bezier(0.4, 0, 0.2, 1)"
  }
}
```

Wired in `src/lib/design-brief-loader.ts:getLayoutCssVars()` and `getMotionCssVars()` → injected into `<html style>` by `src/app/layout.tsx`. Defaults in `globals.css :root` apply when fields are omitted (1440px / 4-5-6 rem / 150-200-300-500 ms / cubic-bezier(0.16, 1, 0.3, 1)).

**Exceptions allowed:**
- Internal Tailwind composition (`gap-4`, `mt-2`, `text-sm`, `font-semibold`) — these are component-internal layout/typography roles, not theme tokens.
- Intentionally narrow content widths (`max-w-3xl` for quote blocks, forms) — different intent from page container.
- Overlay UI on black backdrops (lightbox controls) — `text-white` is correct, not a theme color.

## Pre-Deploy Guardrails (NON-NEGOTIABLE)

Two layers prevent regressions of the Ridgeline-class bugs (page width ignored, neutral-as-text-color invisible text, placeholder content shipping live, dead anchors, empty content sections).

**Layer 1 — ESLint rules (`eslint.config.mjs`)**, scoped to `src/components/sections/**` and `src/components/layout/**`:
- Hardcoded `maxWidth` literals (`maxWidth: "1200px"`) in inline `style={...}` — banned. Use `var(--container-max-w)`, `<div className="page-container">`, or `min(<cap>, var(--container-max-w))` so per-theme width overrides take effect.
- `color: "var(--color-neutral)"` and `color: "var(--color-surface)"` in inline `style={...}` — banned (also banned via `color-mix(in oklch, var(--color-neutral) ...)`). These are BACKGROUND tokens; using them as text color paints invisible text. Use `--color-primary` (text), `--color-secondary` (muted text), or `--color-on-primary` (text on primary fill).

Run: `pnpm lint`.

**Layer 2 — Prebuild config validators (`scripts/check-config.ts`)**, run by `pnpm prebuild` after `check-images.ts`:
- `placeholder-scanner` — flags `lorem ipsum`, 555-prefix phones, `*@example.com` / `*@test.com` emails, and the explicit `__PLACEHOLDER__` sentinel. **Pipeline contract:** when web-agency-pipeline cannot generate real content for a field, it should emit `__PLACEHOLDER__:fieldname:__` so this scanner catches it at template-hub prebuild.
- `dead-anchor-scanner` — every `#anchor` href in `site.config.ts` must match the active anchor set: `hero` (always present) plus each `section.type` from `config.sections[]`. Anchors must be letter-prefixed (`^[a-z][a-z0-9-]*$`) — hex colors and digit-prefix strings are correctly ignored.
- `empty-section-scanner` — sections with required content arrays must not ship empty: `gallery.images`, `testimonials.items`, `pricing.plans`, `faq.items`, `programs.items`, `services.items`, `team.members`, `stats.items`, `process.steps`, `menu.items`, `products.items`.
- `section-shape-scanner` — validates each `section.content` against a **Zod schema co-located with the section component** (`src/components/sections/<Section>/schema.ts`). All 49 section types from `SECTION_MAP` are covered via the central registry at `src/components/sections/schemas-registry.ts`. Schemas use `.strict()` so unknown top-level keys are caught as typos (e.g. `discription` vs `description`). Variant-required fields live in per-variant Zod overrides (e.g. `cta:countdown` requires `deadline`; `gallery:before-after` requires `pairs`). Nested required fields are also flagged with dotted paths (e.g. `plans.0.monthlyPrice` for `pricing:toggle-monthly-annual`, `items.0.name` for `trust:certifications`). Empty required arrays surface as `kind: "empty"` (via `z.array(...).min(1)`), replacing the prior empty-section-scanner. Unknown keys are only reported at the top level to avoid noise when a nested structural mismatch is already surfaced as `missing` / `type`. When you add a section type or rename a content key, update the section's `schema.ts` in the same commit — the validator imports the schema directly, so drift between component and validator is structurally impossible. The coverage test (`section-shape-coverage.test.ts`) fails CI if any `SECTION_MAP` key lacks a schema entry.

**Generated reference doc:** `docs/section-schemas.md` is auto-generated from the Zod schemas by `pnpm gen:schemas`. It's the single human-readable source for what content keys each section + variant accepts. Pipeline emitters and builders authoring `site.config.ts` should read this instead of opening every `src/components/sections/*/index.tsx` by hand. Regenerate and commit the doc in any commit that changes a section's `schema.ts`.

**Doc limitation (known):** The generator describes top-level content keys per variant but does NOT introspect array element shapes one level deep. For example, `trust:certifications` shows `items` as a required key but does not enumerate that each `item` requires `name`. Item-shape contracts live in the section's `schema.ts` and are still enforced at prebuild by the unified section-shape scanner (which now reports nested findings like `items.0.name` with kind `missing`). When authoring config that needs item-level detail, read the section's `schema.ts`. Future work: extend `gen-section-schemas.ts` to unwrap `z.array(z.object({...}))` one level.

Run: `pnpm prebuild` (full chain: `check-images.ts` → `check-config.ts`) or `pnpm test` (validator suite alone — 20 tests across the three scanners + Ridgeline regression fixture).

**Regression fixture:** `scripts/validators/__tests__/fixtures/ridgeline-shaped.ts` freezes the exact failure shape that shipped to ridgeline-iota.vercel.app. The `ridgeline-regression.test.ts` companion test fails if any validator silently regresses.

**Adding a new validator:** drop a `scan*` function in `scripts/validators/`, wire it into `scripts/check-config.ts`, add a fixture and test under `__tests__/`. Pattern reference: `placeholder-scanner.ts`.

## Scenario Smoke Set + Pre-Push Hook

The live `site.config.ts` only exercises one (preset, theme, variant) combination at a time. To catch regressions across the matrix without spinning up `next build` six times, a smoke runner validates six representative scenarios as pure data:

- `doctor:light-serif` — subtle tier, light theme, conservative sections
- `restaurant:dark-sans` — dark-mode auto-detect, `menu-food`, `gallery:before-after`, `hours:inline-banner`
- `gym:premium` — `announcement:modal`, `cta:countdown` (variant-required `deadline`), `class-schedule`, `membership`
- `salon:rtl` — Arabic content, `booking:whatsapp-cta` (variant-required `whatsappNumber`)
- `local:minimal` — bare-essential sections, asserts no false positives on stripped configs
- `hospital:dark-serif` — dark theme, `emergency` (required `phone`), `departments`, `procedures`

Each fixture lives in `scripts/scenarios/fixtures/` and is expected to produce **zero findings** across all four scanners, the correct dark-mode detection, and full anchor coverage. Run with `pnpm scenarios:smoke` (~1s).

**Pre-push hook** lives at `.githooks/pre-push` and runs `pnpm test && pnpm scenarios:smoke` before every push. To activate locally (once per clone):

```bash
git config core.hooksPath .githooks
```

To bypass intentionally (rarely, with a reason): `git push --no-verify`.

**Adding a new scenario:** drop a fixture in `scripts/scenarios/fixtures/`, add it to the `SCENARIOS` array in `scripts/scenarios/runner.ts`. Keep fixtures minimal — only the keys scanners read (`hero`, `nav.items[].href`, `sections[]`). No need to populate `business`, `seo`, etc.

**Adding a new editorial section variant:** the lint rules will reject inline hardcoded `maxWidth` and inline `color: var(--color-neutral|surface)`. Use `var(--container-max-w)` and the appropriate text token (`--color-primary` / `--color-secondary` / `--color-on-primary`) from the start.

## Architecture Rules
- site.config.ts is the ONLY file that changes per client site. Template code is universal.
- design.md at project root is the theme source. Parsed by src/lib/design-md-parser.ts.
- Section components live in src/components/sections/[SectionType]/[Variant].tsx
- Each section type has an index.tsx that routes to the correct variant based on config.
- Business type presets live in presets/[type].ts. They provide default config values.
- The section renderer (src/lib/section-renderer.tsx) maps sections[] array to React components.
- Theme generation (src/lib/theme-generator.ts) converts design.md tokens to CSS variables.
- Font loading (src/lib/font-loader.ts) dynamically imports Google Fonts based on design.md.
- All images go in public/images/. Stock defaults in public/images/defaults/[business-type]/.
- Static export: next build produces static HTML. No server needed.

## File Structure
```
template-hub/
├── site.config.ts                 # THE config (one per client)
├── design.md                      # Theme from designdotmd
├── presets/                        # Business type defaults
│   ├── doctor.ts
│   ├── restaurant.ts
│   ├── salon.ts
│   └── local.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Reads config, applies theme, loads fonts
│   │   ├── page.tsx               # Renders sections from config
│   │   └── [page]/page.tsx        # Multi-page routing (V2)
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── HeroCentered.tsx
│   │   │   │   ├── HeroSplitImage.tsx
│   │   │   │   ├── HeroImageBg.tsx
│   │   │   │   ├── HeroVideoBg.tsx
│   │   │   │   ├── HeroGradient.tsx
│   │   │   │   ├── HeroMinimal.tsx
│   │   │   │   └── index.tsx      # Variant router
│   │   │   ├── Services/
│   │   │   ├── About/
│   │   │   ├── Testimonials/
│   │   │   ├── Gallery/
│   │   │   ├── FAQ/
│   │   │   ├── Contact/
│   │   │   ├── CTA/
│   │   │   ├── Stats/
│   │   │   ├── Pricing/
│   │   │   ├── Hours/
│   │   │   ├── Location/
│   │   │   ├── Trust/
│   │   │   ├── Team/
│   │   │   └── Announcement/
│   │   ├── layout/
│   │   │   ├── Navbar/            # 4 variants
│   │   │   └── Footer/            # 4 variants
│   │   └── ui/                    # shadcn vendored components
│   ├── lib/
│   │   ├── config.ts              # Config reader, validator, types
│   │   ├── design-md-parser.ts    # YAML frontmatter parser
│   │   ├── theme-generator.ts     # Tokens to CSS variables
│   │   ├── font-loader.ts         # Dynamic Google Font imports
│   │   ├── section-renderer.tsx   # Section type+variant to component
│   │   └── types.ts               # All TypeScript interfaces
│   └── styles/
│       └── globals.css            # Tailwind v4 @import + @theme
├── public/
│   ├── images/defaults/           # Stock photos per business type
│   └── fonts/                     # Fallback fonts (optional)
└── package.json
```

## Code Style
- TypeScript strict mode for all files
- Functional components only
- Each section variant is a single file, max 150 lines
- Props interface defined at top of each component file
- Section components receive content via props, never import config directly
- Use async/await, never raw promises
- File naming: kebab-case (hero-centered.tsx)
- Component naming: PascalCase (HeroCentered)
- No barrel exports except section index.tsx files

## Build & Test Commands
- Dev: pnpm dev (port 3748)
- Build: pnpm build
- Lint: pnpm lint
- Deploy: vercel --prod
- Add theme: npx designdotmd add [id]
- Preview: pnpm dev then open http://localhost:3748

## Skills Workflow (NON-NEGOTIABLE)

### taste-skill — invoke before writing or reviewing any section component
- Bans: Inter, Roboto, Arial, Open Sans, Helvetica (fonts); purple/blue gradients; centered-everything heroes; card containers as default layout
- Dials: Variance 8 / Motion 6 / Density 4
- Anti-slop copy bans apply (no "Elevate", "Seamless", "Unleash", "Empower", "Streamline", "Robust", "Holistic", "Synergy", "Leverage", "Bespoke", "Curated")
- Section layout principle: structure first, cards only when cards are semantically correct (pricing, products, team members). Stats, trust signals, and credentials must NOT use card containers.

### landing-page-engine — invoke when creating or updating any business preset
- Page type for local business: navbar → hero → services → stats → testimonials → gallery → location → cta → footer
- Industry vibe: Warm Appetite, Amber-700 accent, Plus Jakarta Sans (override for each business type)
- Hero must be bottom-anchored text, not centered. Use image-bg or split-image.
- credentialBar is mandatory on all auto/service/health presets. Items: year established, location, review score, certification.
- All presets must specify LPE-compatible compatibleHeros + section variant names.

## Important Constraints
- NEVER hardcode colors, fonts, radius, or spacing. Always CSS variables from design.md.
- NEVER import site.config.ts inside section components. Pass data as props from the renderer.
- NEVER modify the section renderer when adding new section types. Just add to the SECTION_MAP.
- Every section component must work with ANY designdotmd theme (light or dark, serif or sans, tight or generous spacing).
- Section components must be responsive. Test at 375px, 768px, 1280px.
- No external API calls at build time except Google Fonts.
- Stock images must be royalty-free. Use Unsplash or Pexels sourced images.
- The config schema is the contract. If the schema changes, update types.ts first.
- accent color override: when theme.accentColor is set, it replaces colors.tertiary only.

## Memory Block
- What was tried and failed: Nothing yet, new project.
- Key decisions made:
  - designdotmd is the sole theme source (not awesome-design-md, not custom extraction)
  - Static export, no SSR needed
  - V1 scoped to 4 business types: doctor, restaurant, salon, generic-local
  - V1 scoped to 6 hero variants, 15 section types
  - Remix commands are config mutations, not code changes
  - Visual configurator UI is V2, not V1

## Current Status
- Phase: A (complete)
- Completed: Planning, Phase A (project setup)
- In Progress: Phase B (config system)
- Blocked: None
- Last updated: 2026-04-30

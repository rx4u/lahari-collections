# Template Hub - Implementation Plan

**App:** Template Hub
**Complexity:** Complex (9 phases)
**Stack:** Next.js 16 + Tailwind v4 + shadcn/ui + designdotmd + GSAP + Framer Motion + Vercel
**Estimated time:** 14 hours across 9 sessions

---

## Phase A: Project setup and foundation
**Effort:** 30 min | **Session:** Fresh

### Tasks
1. Initialize Next.js 16 with TypeScript, Tailwind CSS v4, pnpm
2. Initialize shadcn/ui, install: Button, Card, Badge, Accordion, Tabs, Input, Textarea, Select, ScrollArea, Dialog
3. Create folder structure: src/components/sections/, src/components/layout/, src/lib/, presets/, public/images/defaults/
4. Create CLAUDE.md at project root
5. Install: framer-motion, gsap, gray-matter, lucide-react. Add designdotmd as devDependency.

### Test
pnpm dev runs without errors. localhost:3000 renders a blank page. CLAUDE.md exists. Folder structure matches spec. All shadcn components installed.

---

## Phase B: Config schema, types, and design.md parser
**Effort:** 45 min | **Session:** Fresh

### Tasks
1. Define all TypeScript interfaces in `src/lib/types.ts`: SiteConfig, BusinessType (31 types as union), HeroStyle (12 variants as union), SectionConfig, DesignTokens, ThemeConfig, BusinessConfig, SEOConfig, AnimationTier
2. Build `src/lib/design-md-parser.ts`: reads design.md from project root, parses YAML frontmatter via gray-matter, returns typed DesignTokens (colors, typography, rounded, spacing, components)
3. Build `src/lib/theme-generator.ts`: takes DesignTokens + optional accentColor override, outputs CSS custom properties string. When accentColor is set, replaces colors.tertiary only.
4. Build `src/lib/font-loader.ts`: reads fontFamily values from DesignTokens, dynamically creates next/font/google imports, returns className and CSS variable declarations
5. Build `src/lib/config.ts`: reads and exports site.config.ts, validates against types, merges with preset defaults. Create a sample site.config.ts for doctor type.
6. Run `npx designdotmd add clinic-sage` to create a real design.md for testing.

### Test
Sample site.config.ts for doctor type passes TypeScript validation. design-md-parser.ts parses clinic-sage and returns typed DesignTokens. theme-generator.ts outputs CSS with --color-primary, --color-tertiary, --font-display, --radius-md, --spacing-md. Console log shows all parsed tokens.

---

## Phase C: Layout shell, section renderer, navbar, footer
**Effort:** 45 min | **Session:** Fresh

### Tasks
1. Build `src/app/layout.tsx`: reads config, applies theme CSS variables to html element via style attribute, loads fonts, wraps children in font className
2. Build `src/styles/globals.css`: Tailwind v4 @import, @theme block that reads CSS custom properties, base resets, smooth scroll
3. Build `src/lib/section-renderer.tsx`: maps section type + variant to component via SECTION_MAP. For unbuilt sections, renders a styled placeholder div showing section type name.
4. Build `src/app/page.tsx`: reads sections[] from config, renders each via section-renderer
5. Build Navbar with 4 variants (static, floating, transparent, hamburger-only): reads business.name, generates anchor links from sections, mobile hamburger menu, CTA button
6. Build Footer with 4 variants (multi-column, simple, minimal, mega-footer): reads business info, social links, hours

### Test
localhost:3000 renders with clinic-sage theme (sage green colors, DM Sans font visible in headings). Navbar shows "Dr. Ramesh Pediatric Clinic" and section links. Footer shows address, phone, social. Page body shows placeholder divs for each section. Responsive at 375px (hamburger menu) and 1280px (full navbar).

---

## Phase D: Hero section (6 variants)
**Effort:** 90 min | **Session:** Fresh

### Tasks
1. Build `HeroCentered`: large display headline centered, subtitle below, 1-2 CTA buttons. Uses --font-display for headline at design.md's display fontSize.
2. Build `HeroSplitImage`: text column (headline, subtitle, CTAs) + image column. 50/50 split on desktop, stacks on mobile.
3. Build `HeroImageBg`: full-viewport background image, dark gradient overlay, white text, CTA buttons centered or left-aligned.
4. Build `HeroVideoBg`: HTML5 video autoplay muted loop as background, overlay, text + CTA.
5. Build `HeroGradient`: gradient background using primary + tertiary colors, oversized display typography, CTA.
6. Build `HeroMinimal`: maximum whitespace, headline + subtitle + single CTA, nothing else.
7. Build `Hero/index.tsx` variant router: reads variant from config, renders correct component.

### Test
Change hero.variant in site.config.ts to each of the 6 values. Each renders correctly with clinic-sage theme. CTA buttons use --color-tertiary. All variants responsive at 375px, 768px, 1280px. Hero images/video display without layout shift.

---

## Phase E: Core sections batch 1 (Services, About, Testimonials, Gallery, FAQ) + animation system
**Effort:** 120 min | **Session:** Fresh

### Tasks
1. Build animation tier system:
   - `src/lib/animation.ts`: defines AnimationTier type (subtle, standard, premium), exports motion presets per tier
   - `src/components/sections/SectionWrapper.tsx`: wraps each section, checks preset's animationTier, applies:
     - Subtle: Framer Motion fade-up on scroll (IntersectionObserver + motion.div)
     - Standard: Framer Motion stagger + GSAP ScrollTrigger parallax on backgrounds
     - Premium: All of standard + GSAP text reveals (SplitText-style), magnetic hover effects
2. Build Services: `grid-3` variant (3-column card grid with icon, title, description), `icon-list` variant (vertical list with icon left, text right)
3. Build About: `story` variant (full-width text with image below), `split-image` variant (text left, image right, highlights badges)
4. Build Testimonials: `carousel` variant (horizontal scroll with navigation dots), `simple-grid` variant (2-3 column card grid with quote, name, rating stars)
5. Build Gallery: `grid-3` variant (3-column responsive image grid), `masonry` variant (Pinterest-style staggered grid with CSS columns)
6. Build FAQ: `accordion` variant (shadcn Accordion with question/answer pairs), `two-column` variant (questions left, answers right)

### Test
All 5 section types render with both variants. Swap variant in config, section changes. Content comes from sections[].content in config, zero hardcoded text. Animation wrapper triggers fade-up on scroll for subtle tier. GSAP parallax works on standard tier. No hardcoded colors in any component.

---

## Phase F: Core sections batch 2 (Contact, CTA, Stats, Hours, Location, Team, Pricing, Trust, Announcement)
**Effort:** 120 min | **Session:** Fresh

### Tasks
1. Build Contact: `form-map` variant (2-column: contact form left, Google Maps iframe right), `form-only` variant (centered form)
2. Build CTA: `banner` variant (full-width colored band with headline + button), `centered` variant (card-style centered block)
3. Build Stats: `counter-animated` variant (numbers animate from 0 to target value when scrolled into view using Framer Motion or GSAP depending on tier)
4. Build Hours: `card` variant (card showing weekday rows with open/close times, highlights "Open Now" based on current time)
5. Build Location: `map-embed` variant (Google Maps iframe from config.business.mapUrl + address card alongside)
6. Build Team: `grid` variant (responsive card grid: photo circle, name, role, optional short bio)
7. Build Pricing: `cards-3` variant (3 plan cards with name, price, features list, CTA button, highlighted "popular" card)
8. Build Trust: `logo-cloud` variant (row of partner/certification logos with subtle grayscale + hover color effect)
9. Build Announcement: `top-bar` variant (slim colored bar above navbar, dismissible with X button, reads from config)

### Test
All 9 section types render correctly. Contact form submits to mailto or configurable endpoint. Google Maps loads from config mapUrl. Stats numbers animate. Hours card highlights current day. All use CSS variables. Responsive at 375px.

---

## Phase G: Business type presets and sample configs
**Effort:** 60 min | **Session:** Fresh

### Tasks
1. Build `presets/doctor.ts`:
   - designMd: "clinic-sage"
   - animationTier: "subtle"
   - hero: split-image
   - sections: navbar(floating), hero, about, services, testimonials, hours, contact, faq, footer
   - compatibleThemes: ["clinic-sage", "pharma-clean", "wellness-coral", "therapy-room", "notion-beige", "swiss-grid"]
   - compatibleHeroes: ["split-image", "centered", "minimal", "gradient"]
   - Sample content: Dr. Ramesh Pediatric Clinic, Banjara Hills, Hyderabad
2. Build `presets/restaurant.ts`:
   - designMd: "coffee-roast"
   - animationTier: "standard"
   - hero: image-bg
   - sections: navbar(transparent), hero, about, gallery, testimonials, hours, location, cta, footer
   - compatibleThemes: ["coffee-roast", "natural-wine", "street-food", "bakery-flour", "wine-country", "farmers-market"]
   - compatibleHeroes: ["image-bg", "carousel", "parallax", "video-bg"]
   - Sample content: Spice Garden, Jubilee Hills, Hyderabad
3. Build `presets/salon.ts`:
   - designMd: "skincare-matte"
   - animationTier: "standard"
   - hero: split-image
   - sections: navbar(static), hero, services, gallery, team, testimonials, contact, footer
   - compatibleThemes: ["skincare-matte", "botanical-apothecary", "desert-rose", "linen", "pastel-candy", "atelier-noir"]
   - compatibleHeroes: ["split-image", "collage", "image-bg", "gradient"]
   - Sample content: Glow Studio, Kondapur, Hyderabad
4. Build `presets/local.ts`:
   - designMd: "notion-beige"
   - animationTier: "subtle"
   - hero: centered
   - sections: navbar(static), hero, services, about, testimonials, contact, footer
   - compatibleThemes: ["notion-beige", "tailwind-base", "cobalt-product", "arctic", "aqua-mint", "kraft-paper"]
   - compatibleHeroes: ["centered", "split-image", "minimal", "gradient"]
   - Sample content: Generic local business template
5. Add compatibleThemes and compatibleHeroes arrays validated: each theme ID must exist in designdotmd registry, each hero must match a built variant.
6. Download stock images for each preset: 3-5 royalty-free images per business type to public/images/defaults/[type]/

### Test
Each preset produces a valid site.config.ts that TypeScript accepts. Each preset renders a complete site with all sections populated. `npx designdotmd add clinic-sage` + rebuild works for doctor. Switching designMd to "pharma-clean" in doctor config produces visually different but structurally identical site. All 4 presets look like real business websites, not placeholder garbage.

---

## Phase H: Theme cross-testing, animation polish, responsive audit
**Effort:** 60 min | **Session:** Fresh

### Tasks
1. Cross-test doctor preset with all 6 compatible themes. Fix any color contrast issues, font rendering problems, or layout breaks caused by different radius/spacing values.
2. Cross-test restaurant and salon presets with their compatible themes.
3. Test animation tiers: verify doctor (subtle) has clean fade-ups only, restaurant (standard) has staggered reveals + parallax backgrounds, verify premium tier code path works even if no V1 preset uses it.
4. Mobile responsive audit: test all 4 presets at 375px. Fix: stacking order, font sizes (display fonts too large on mobile?), padding, touch targets (buttons min 44px), hamburger menu, horizontal overflow.
5. Run grep for hardcoded colors (hex, rgb, hsl) in all section and layout components. Replace every instance with CSS variables. Zero tolerance.
6. Test accent color override: set theme.accentColor in doctor config to a red (#DC2626). Verify only CTA buttons and interactive elements change, not backgrounds or text.

### Test
Doctor preset renders correctly with ALL 6 compatible themes. Each theme swap is only `npx designdotmd add [id]` + rebuild. No visual breakage. All sections responsive at 375px. grep for `#[0-9a-fA-F]` in src/components/ returns zero results. Accent override changes only tertiary-derived elements.

---

## Phase I: SEO, static export, deploy, documentation
**Effort:** 45 min | **Session:** Fresh

### Tasks
1. Add SEO metadata in layout.tsx: read seo config, generate `<title>`, `<meta name="description">`, og:title, og:description, og:image, canonical URL. Add structured data (LocalBusiness schema.org JSON-LD from business config).
2. Configure next.config.ts for static export: `output: 'export'`. Test build produces `out/` directory.
3. Deploy doctor preset to Vercel via CLI. Verify live URL.
4. Write README.md: project overview, quick start, section reference table, theme reference, remix command documentation, how to add a new business type preset.
5. Write QUICKSTART.md: the 5-step workflow (clone, designdotmd add, edit config, pnpm install, vercel deploy).

### Test
`pnpm build` produces static HTML in out/ directory without errors. `vercel --prod` deploys. Live URL renders doctor preset with clinic-sage theme. View page source: meta title, description, og tags present. Lighthouse SEO score > 90. README covers all workflows.

---

## Execution Prompts

### Prompt 1: Setup (Phase A)

```
I'm building Template Hub, a config-driven Next.js site generation engine for local business websites.

Read the CLAUDE.md file I'll provide. It has the full project context.

[Paste CLAUDE.md content]

For Phase A, do these exact steps:
1. Create a new Next.js 16 project with TypeScript and Tailwind v4 using pnpm
2. Initialize shadcn/ui and install: Button, Card, Badge, Accordion, Tabs, Input, Textarea, Select, ScrollArea, Dialog
3. Install: framer-motion, gsap, gray-matter, lucide-react
4. Add designdotmd as devDependency: pnpm add -D designdotmd
5. Create the folder structure from CLAUDE.md (empty placeholder files are fine)
6. Save CLAUDE.md to project root
7. Verify pnpm dev runs clean

Do NOT build any components or features yet. Only project setup.
```

### Prompt 2: Config Engine (Phase B)

```
I'm continuing Template Hub. Phase A (setup) is complete. Starting Phase B.

What's working: pnpm dev runs, shadcn installed, folder structure exists.

Phase B tasks:
1. Create src/lib/types.ts with all TypeScript interfaces (SiteConfig, BusinessType union of 31 types, HeroStyle union of 12 variants, SectionConfig, DesignTokens matching designdotmd YAML schema, ThemeConfig, AnimationTier)
2. Create src/lib/design-md-parser.ts: parse design.md YAML frontmatter via gray-matter, return typed DesignTokens
3. Create src/lib/theme-generator.ts: DesignTokens + optional accentColor → CSS custom properties string
4. Create src/lib/font-loader.ts: read fontFamily from tokens → next/font/google dynamic import
5. Create src/lib/config.ts: read and export site.config.ts with validation
6. Run: npx designdotmd add clinic-sage (creates design.md for testing)
7. Create a sample site.config.ts for business type "doctor"

The designdotmd YAML schema is:
---
colors: { primary, secondary, tertiary, neutral, surface, on-primary }
typography: { display: { fontFamily, fontSize, fontWeight, letterSpacing }, h1, body, label }
rounded: { sm, md, lg }
spacing: { sm, md, lg }
components: { button-primary: { backgroundColor, textColor, rounded, padding }, card: {...} }
---

Test: console.log the parsed tokens from clinic-sage. All types pass strict TypeScript.

Do NOT modify any Phase A files. Do NOT build UI components.
```

### Prompt 3: Layout Shell (Phase C)

```
Continuing Template Hub. Phase B (config engine) complete. Starting Phase C.

What's working: types.ts, design-md-parser, theme-generator, font-loader, config reader, sample site.config.ts for doctor. clinic-sage design.md parsed successfully.

Phase C tasks:
1. Build layout.tsx: read config, call theme-generator to get CSS vars, apply to <html> via style attribute, load fonts via font-loader, wrap children
2. Build globals.css: Tailwind v4 @import "tailwindcss", @theme block reading from CSS custom properties
3. Build section-renderer.tsx: SECTION_MAP object mapping {type: {variant: Component}}. For unbuilt sections, render a styled placeholder showing the section type name.
4. Build page.tsx: read sections[] from config, map through section-renderer
5. Build Navbar with 4 variants (static, floating, transparent, hamburger-only). Reads business.name, generates anchor links from sections, mobile hamburger, CTA button.
6. Build Footer with 4 variants (multi-column, simple, minimal, mega-footer). Business info, social links.

All components MUST use CSS variables (var(--color-primary), var(--font-display), etc). NEVER hardcode colors or fonts.

Test: localhost:3000 shows clinic-sage theme, DM Sans font, sage green accents, navbar with doctor name, footer with address.
```

### Prompt 4: Hero Section (Phase D)

```
Continuing Template Hub. Phase C (layout shell) complete. Starting Phase D.

What's working: Theme renders (clinic-sage colors + DM Sans), navbar shows business name, footer shows contact, section placeholders visible.

Phase D: Build all 6 hero variants. Each is a separate file in src/components/sections/Hero/.

1. HeroCentered.tsx: centered display headline, subtitle, 1-2 CTA buttons
2. HeroSplitImage.tsx: text left + image right, stacks on mobile
3. HeroImageBg.tsx: full-viewport bg image, dark gradient overlay, white text
4. HeroVideoBg.tsx: HTML5 video autoplay muted loop background
5. HeroGradient.tsx: gradient from primary to tertiary, oversized display type
6. HeroMinimal.tsx: max whitespace, headline + subtitle + single CTA

Then build Hero/index.tsx as the variant router.

Rules:
- Headlines use var(--font-display) at the design.md display fontSize
- CTA buttons use var(--color-tertiary) background
- All responsive at 375px, 768px, 1280px
- Props come from hero config, NEVER import site.config directly

Do NOT touch layout.tsx, navbar, footer, or any Phase B/C files.
```

### Prompt 5: Sections Batch 1 + Animations (Phase E)

```
Continuing Template Hub. Phase D (hero) complete. Starting Phase E.

What's working: All 6 hero variants render, theme applied, navbar + footer working.

Phase E: Build 5 section types + the animation tier system.

FIRST build the animation system:
- src/lib/animation.ts: AnimationTier type, motion presets per tier
- src/components/sections/SectionWrapper.tsx: wraps sections, applies animations based on preset animationTier:
  - subtle: Framer Motion fade-up on IntersectionObserver
  - standard: Framer stagger + GSAP ScrollTrigger parallax
  - premium: standard + GSAP text reveals, magnetic hovers

THEN build sections (each in src/components/sections/[Type]/):
1. Services: grid-3 + icon-list variants
2. About: story + split-image variants
3. Testimonials: carousel + simple-grid variants
4. Gallery: grid-3 + masonry variants
5. FAQ: accordion (shadcn) + two-column variants

Register each in section-renderer.tsx SECTION_MAP.

Rules: CSS variables only. Content from props. Responsive. Wrapped in SectionWrapper.
```

### Prompt 6: Sections Batch 2 (Phase F)

```
Continuing Template Hub. Phase E (sections batch 1 + animations) complete. Starting Phase F.

What's working: Hero (6), Services (2), About (2), Testimonials (2), Gallery (2), FAQ (2) all render. Animation tiers working.

Phase F: Build remaining 9 section types (1 variant each for now):

1. Contact: form-map (form + Google Maps iframe)
2. CTA: banner (full-width colored band)
3. Stats: counter-animated (numbers animate on scroll)
4. Hours: card (weekday table, "Open Now" indicator)
5. Location: map-embed (Maps iframe + address card)
6. Team: grid (photo, name, role cards)
7. Pricing: cards-3 (3 plan cards, highlighted popular)
8. Trust: logo-cloud (partner logos, grayscale hover color)
9. Announcement: top-bar (dismissible banner above navbar)

Register all in SECTION_MAP. Wrap in SectionWrapper.

Test: all render, contact form works, maps load, stats animate, hours highlights today.
```

### Prompt 7: Business Presets (Phase G)

```
Continuing Template Hub. Phase F complete. All 15 section types built. Starting Phase G.

Build 4 business type presets in presets/:

1. presets/doctor.ts: clinic-sage theme, subtle animations, split-image hero
   Content: Dr. Ramesh Pediatric Clinic, Banjara Hills, Hyderabad
   compatibleThemes: clinic-sage, pharma-clean, wellness-coral, therapy-room, notion-beige, swiss-grid
   compatibleHeroes: split-image, centered, minimal, gradient

2. presets/restaurant.ts: coffee-roast theme, standard animations, image-bg hero
   Content: Spice Garden restaurant, Jubilee Hills, Hyderabad
   compatibleThemes: coffee-roast, natural-wine, street-food, bakery-flour, wine-country, farmers-market
   compatibleHeroes: image-bg, carousel, parallax, video-bg

3. presets/salon.ts: skincare-matte theme, standard animations, split-image hero
   Content: Glow Studio salon, Kondapur, Hyderabad
   compatibleThemes: skincare-matte, botanical-apothecary, desert-rose, linen, pastel-candy, atelier-noir
   compatibleHeroes: split-image, collage, image-bg, gradient

4. presets/local.ts: notion-beige theme, subtle animations, centered hero
   Content: Generic local business
   compatibleThemes: notion-beige, tailwind-base, cobalt-product, arctic, aqua-mint, kraft-paper
   compatibleHeroes: centered, split-image, minimal, gradient

Each preset must produce REALISTIC sample content. Not "Lorem ipsum" or "Your tagline here." Write copy as if these are real businesses.

Also download 3-5 stock images per type to public/images/defaults/.
```

### Prompt 8: Cross-Testing and Polish (Phase H)

```
Continuing Template Hub. Phase G (presets) complete. Starting Phase H.

All 4 presets render complete sites. Now validate theme flexibility and polish.

Tasks:
1. Test doctor preset with ALL 6 compatible themes. For each: npx designdotmd add [id], rebuild, check for visual breaks.
2. Test restaurant and salon presets similarly.
3. Verify animation tiers: doctor (subtle) = fade-ups only. Restaurant (standard) = stagger + parallax.
4. Mobile audit at 375px: all 4 presets. Fix font sizes, stacking, padding, touch targets.
5. Run: grep -rn '#[0-9a-fA-F]\{3,8\}' src/components/ -- zero results allowed. Replace all hardcoded colors with CSS variables.
6. Test accent override: add theme.accentColor: "#DC2626" to doctor config. Only CTAs and interactive elements should turn red.

This is a QA phase. Fix bugs. Do not add features.
```

### Prompt 9: Deploy (Phase I)

```
Continuing Template Hub. Phase H (polish) complete. Starting Phase I.

Tasks:
1. Add SEO: in layout.tsx, read seo config, generate meta tags (title, description, og:*, canonical). Add LocalBusiness schema.org JSON-LD.
2. Configure static export: next.config.ts output: 'export'. Run pnpm build, verify out/ directory.
3. Deploy doctor preset: vercel --prod. Verify live URL.
4. Write README.md: overview, quick start, section reference, theme reference, remix commands, how to add presets.
5. Write QUICKSTART.md: 5 steps (clone, designdotmd add, edit config, pnpm install, vercel deploy).

After deploy, update CLAUDE.md status to Phase I complete.
```

### Recovery Prompt

```
Something broke in Template Hub. Here's the error:

[Paste error]

What I was doing: [describe task]

Last working state: [what was rendering correctly before]

Recently changed files: [list]

Fix this specific error. Do NOT rewrite section components or theme engine. Isolate the break.
```

### Remix Prompt (post-build, for web-agency-pipeline)

```
I'm inside a Template Hub client project at ~/projects/clients/[slug]/.

"remix [theme|hero|sections|all]"

For remix theme: read business type from site.config.ts → load preset → pick next compatibleTheme that isn't the current one → run npx designdotmd add [new-id] → pnpm build → vercel --prod → report what changed.

For remix hero: pick next compatibleHero → update hero.variant in site.config.ts → rebuild → deploy.

For remix all: new theme + new hero + shuffle section variants → single rebuild.

NEVER change content. Content is sacred. Only visual presentation changes.
```

---

## Phase 2: Visual Configurator (future, after V1 ships)

**Not part of the V1 build. Planned separately. Documented here for continuity.**

### What it is
A web-based UI where you (or a client sitting with you) can visually configure a template-hub site: pick business type, swap themes, swap hero styles, toggle sections, edit copy, and deploy. No terminal needed.

### Architecture
Separate Next.js app. Does NOT modify template-hub code. Writes `site.config.ts` + `design.md` into a template-hub clone, then deploys.

```
configurator-app/              ← separate repo
├── src/app/page.tsx           ← split-panel: controls left, preview right
├── src/components/
│   ├── ThemePicker.tsx        ← swatch grid of designdotmd themes
│   ├── HeroStylePicker.tsx    ← thumbnail cards per hero variant
│   ├── SectionManager.tsx     ← drag-to-reorder, toggle on/off
│   ├── CopyEditor.tsx         ← inline text editing per section
│   ├── ColorPicker.tsx        ← accent color override
│   ├── PreviewFrame.tsx       ← sandboxed iframe showing live site
│   └── DeployButton.tsx       ← triggers Vercel deploy
├── src/lib/
│   ├── config-store.ts        ← zustand store holding live config state
│   ├── designdotmd.ts         ← fetches design.md content by ID
│   ├── css-injector.ts        ← injects CSS variables into preview iframe
│   └── deploy.ts              ← Vercel API integration
└── src/api/
    ├── generate-copy/route.ts ← Claude API for business copy generation
    └── deploy/route.ts        ← server action for Vercel deploy
```

### Reference repo to study
**nexu-io/open-design** (github.com/nexu-io/open-design) — Apache-2.0, local-first open replica of Claude Design.

Steal from it:
1. **Sandboxed iframe preview** — `srcdoc` injection pattern, vendored React 18 + Babel, iframe stays alive across edits without white flash. Study their preview component for how to re-render without full page reload when CSS variables change.
2. **Design system swatch grid** — 71 DESIGN.md files rendered as clickable 4-color swatch cards. This IS our theme picker, already built as a UI pattern.
3. **AI-emitted tweaks panel** — model surfaces parameters (color, spacing, font) as sliders the user can drag. Maps to our remix concept as a GUI.

Do NOT use from it:
- Agent spawning architecture (we don't need LLM in the preview loop)
- Skill/artifact model (too narrow, we render full Next.js apps not single-file HTML)
- Daemon + Express + SQLite layer (overkill for our use case)

### Key UX patterns

**Theme switching (instant, no rebuild):**
User clicks a theme swatch → configurator parses the design.md YAML → injects CSS custom properties into the preview iframe via `postMessage` or direct style manipulation → preview updates in real-time. No `pnpm build`. No page reload. Just CSS variable swap.

**Hero switching:**
User clicks a hero thumbnail → configurator updates `hero.variant` in the zustand store → preview iframe re-renders the hero section component. May require iframe reload for component swap (not just CSS).

**Section management:**
Drag-to-reorder sections. Toggle checkboxes to add/remove. Each change updates the `sections[]` array in the config store. Preview re-renders.

**Copy generation:**
"Generate copy" button → sends business info to Claude API → returns structured content for all sections → populates config store → preview updates.

**Deploy:**
"Deploy" button → writes config store to `site.config.ts` → writes current theme to `design.md` → clones template-hub → drops files in → runs `vercel --prod` via API → returns live URL.

### Estimated effort
4-6 sessions. Depends heavily on how much of open-design's preview pattern can be adapted vs rebuilt.

### Prerequisites
- Template-hub V1 must be shipped and stable (Phases A-I complete)
- All section components must work with pure CSS variable injection (no build-time-only theming)
- The config schema must be frozen (no breaking changes after V1 ships)


# Template Hub V3 - Completionist Pass

**Prerequisite:** V2 Tracks 1 and 3 complete.
**Complexity:** Moderate (4 phases)
**Estimated time:** 7 hours across 4 sessions
**What this is:** Every remaining variant from the research doc. 83 variants across universal and domain sections, plus 14 Tier 3 presets. After V3, template-hub has zero gaps against the spec.

### Phase U: Remaining universal section variants
**Effort:** 120 min | **Session:** Fresh

#### Tasks
1. Services: `grid-4`
2. Team: `carousel`, `featured-single`, `minimal-list`
3. Testimonials: `masonry`
4. Gallery: `lightbox` (click → fullscreen overlay with prev/next)
5. FAQ: `categorized` (grouped by category headers)
6. Stats: `comparison` (before/after or vs competitor numbers)
7. Pricing: `cards-2`, `table`, `toggle-monthly-annual`, `simple-list`
8. Hours: `table`, `inline-banner`
9. Location: `multi-location` (multiple branches on one map), `directions-card`
10. Blog-preview: `featured-sidebar`, `minimal-list`
11. Trust: `certifications`, `awards`, `media-mentions`
12. Announcement: `inline-banner`, `modal`

#### Test
Every universal section has ALL planned variants. 23 new variants total. Remix produces significantly more variety.

---

### Phase V: Remaining domain section variants batch 1
**Effort:** 120 min | **Session:** Fresh

#### Tasks
1. menu-food: `card-grid`, `minimal-list`
2. menu-services: `card-grid`, `categorized`
3. booking: `cta-redirect`
4. procedures: `card-grid`, `tabbed`
5. class-schedule: `card-grid`, `calendar-view`
6. membership: `comparison-table`
7. property-listings: `grid`, `map-view`
8. area-guide: `detailed-page`
9. practice-areas: `accordion`, `detailed-cards`
10. case-results: `testimonial-style`
11. products: `carousel`
12. programs: `tabbed`, `accordion`
13. rooms: `comparison`, `gallery-cards`
14. amenities: `photo-grid`

#### Test
All existing domain sections now at full variant coverage. 19 new variants.

---

### Phase W: New domain sections + remaining variants
**Effort:** 120 min | **Session:** Fresh

#### Tasks
New sections (9 not started in V2):
1. `departments`: `grid`, `accordion`, `tabbed` (hospital)
2. `doctor-directory`: `filterable-grid`, `list`, `card-carousel` (hospital)
3. `collections`: `banner-grid`, `lookbook` (jewellery, retail)
4. `admissions`: `timeline`, `form`, `info-card` (school)
5. `achievements`: `stats`, `timeline`, `badge-grid` (school, individual)
6. `events-calendar`: `list`, `card-grid`, `calendar` (worship, school, nonprofit)
7. `bulk-pricing`: `table`, `tier-cards` (bakery, printing, catering)
8. `tests-offered`: `categorized-list`, `searchable`, `card-grid` (diagnostics)
9. `project-showcase`: `before-after`, `case-study`, `gallery-grid` (construction, interiors)

Remaining variants for existing sections (11):
10. portfolio: `categorized`, `lightbox`
11. packages: `detailed-accordion`
12. process: `steps-horizontal`, `icon-flow`
13. emergency: `floating-card`
14. donations: `simple-form`
15. impact: `timeline`, `stories`
16. order-form: `product-selector`
17. conditions-treated: `accordion`, `searchable-list`
18. service-areas: `list-with-badges`

#### Test
Every single section and variant from template-hub-plan.md is built. grep SECTION_MAP against the research doc: zero gaps. 41 new variants + 9 new section types.

---

### Phase X: Tier 3 business presets (all 14 remaining)
**Effort:** 60 min | **Session:** Fresh

#### Tasks
1. `presets/homeservice.ts` — graphite theme, subtle, centered hero. service-areas, services, testimonials, contact.
2. `presets/auto.ts` — graphite theme, standard, image-bg hero. services, gallery, testimonials, hours, location.
3. `presets/interiors.ts` — gallery-white theme, premium, parallax hero. portfolio, process, gallery, testimonials.
4. `presets/individual.ts` — portfolio-studio theme, standard, minimal hero. portfolio, services, achievements, testimonials.
5. `presets/nonprofit.ts` — mutual-aid theme, subtle, centered hero. about, impact, donations, events-calendar, team.
6. `presets/worship.ts` — linen theme, subtle, image-bg hero. about, events-calendar, donations, gallery, hours.
7. `presets/petshop.ts` — pet-pawprint theme, standard, split-image hero. products, services, gallery, testimonials.
8. `presets/jewellery.ts` — old-money theme, premium, product hero. collections, products, gallery, testimonials, trust.
9. `presets/printing.ts` — cobalt-product theme, subtle, centered hero. products, bulk-pricing, order-form, contact.
10. `presets/catering.ts` — natural-wine theme, standard, image-bg hero. menu-food, packages, gallery, testimonials, order-form.
11. `presets/wellness.ts` — wellness-coral theme, standard, split-image hero. procedures, conditions-treated, booking, team, testimonials.
12. `presets/diagnostics.ts` — pharma-clean theme, subtle, centered hero. tests-offered, booking, hours, location, trust.
13. `presets/construction.ts` — architect-blueprint theme, standard, stats-hero. project-showcase, services, process, team, stats.
14. `presets/wedding.ts` — desert-rose theme, premium, collage hero. portfolio, packages, process, gallery, testimonials.

Each with: compatibleThemes[], compatibleHeroes[], animation tier, realistic Hyderabad sample content.

#### Test
All 31 presets exist (4 V1 + 13 V2 + 14 V3). Every preset renders a complete, unique site. Theme remix works across all. Zero business types missing from the registry.

---

### V3 Summary

| Phase | Hours | What it completes |
|---|---|---|
| U: Remaining universal variants | ~2h | 23 variants |
| V: Remaining domain variants batch 1 | ~2h | 19 variants |
| W: New domain sections + remaining variants | ~2h | 9 new sections + 41 variants |
| X: Tier 3 presets | ~1h | 14 presets |
| **Total** | **~7h** | **83 variants + 9 sections + 14 presets** |

---

## Full roadmap summary

| Version | Phases | Hours | What ships |
|---|---|---|---|
| V1 (A-I) | 9 | ~14h | Core engine, 15 sections (~25 variants), 6 heroes, 4 presets, deploy, remix |
| V2 (J-T) | 12 | ~16.5h | Domain sections, multi-page, blog, 6 more heroes, ~55 more variants, 13 more presets, visual configurator |
| V3 (U-X) | 4 | ~7h | 83 remaining variants, 9 new sections, 14 final presets, 100% spec coverage |
| **Total** | **25 phases** | **~37.5h** | **31 business types, 12 heroes, ~180 section variants, visual configurator** |

---

## V2 Summary

| Track | Phases | Sessions | Hours | What it unlocks |
|---|---|---|---|---|
| 1: Domain sections + presets | J, K, L | 3 | ~5.5h | 17 total business types fully functional |
| 2: Layout + content | M, N | 2 | ~3h | Multi-page sites, blog, multi-language |
| 3: Additional variants | O, P | 2 | ~2.5h | 12 hero variants, 40+ section variants, portfolio/products |
| 4: Visual configurator | Q, R, S, T | 4 | ~5.5h | Browser-based site builder UI |
| **Total** | **12** | **11** | **~16.5h** | |

**Recommended build order based on client demand:**

If you're actively selling to local businesses: Track 1 first (more business types = more prospects).

If you want the "wow" demo for pitching: Track 4 first (visual configurator impresses clients).

If you're getting requests for more complex sites: Track 2 first (multi-page, blog).

If remix feels limited: Track 3 first (more variants = more remix variety).

---

## V2 Execution Prompts

### Prompt: Phase J (Domain sections batch 1)

```
I'm continuing Template Hub. V1 (Phases A-I) is complete and deployed.

Starting V2 Phase J: domain-specific sections for healthcare, food, and beauty.

What's working: 15 universal section types, 4 business presets (doctor, restaurant, salon, local), 6 hero variants, designdotmd theming, remix commands, Vercel deploy.

Build these domain sections in src/components/sections/:

1. MenuFood/: categorized (category headers + item rows with name, price, description, veg badge, image) and photo-menu (card grid)
2. MenuServices/: price-list (service name, duration, price rows grouped by category)
3. Booking/: whatsapp-cta (pre-filled WhatsApp link), inline-form (name, phone, date, time, service), calendly-embed (iframe)
4. ConditionsTreated/: icon-grid (condition + icon responsive grid)
5. Procedures/: accordion (name expands to description, duration, cost)
6. Emergency/: top-banner (urgent colored bar with phone + "Call Now", fixed top)

Register all in section-renderer SECTION_MAP.

Rules: CSS variables only. Content from props. Responsive. Wrapped in SectionWrapper with animation tier.
Do NOT modify any V1 components.
```

### Prompt: Phase Q (Configurator preview engine)

```
I'm building the Template Hub Visual Configurator. This is a SEPARATE Next.js app, not inside template-hub.

Create a new project: configurator/

Reference repo to study first: github.com/nexu-io/open-design
Study their sandboxed iframe preview pattern specifically. Don't copy their agent/daemon architecture.

Build:
1. Initialize Next.js 16 + Tailwind v4 + shadcn/ui + zustand
2. Config store (zustand): holds SiteConfig state, actions for setBusinessType, setTheme, setHeroVariant, setSections, updateSectionContent, setAccentColor
3. PreviewFrame component: renders template-hub in an iframe, supports CSS variable injection via postMessage, responsive toggle (desktop/tablet/mobile)
4. CSS injector: parses designdotmd YAML → CSS custom properties → posts to iframe
5. Design.md content loader: bundles 156 designdotmd themes as JSON index at build time
6. Split-panel layout: controls left (scrollable), preview right (iframe)

Template-hub's layout.tsx needs a small addition: a window.addEventListener('message') handler that receives CSS variables from the configurator and applies them to the html element.

Test: changing a CSS variable in the zustand store instantly updates the preview iframe without page reload.
```

# Template Hub V2 - Implementation Plan

**Prerequisite:** V1 (Phases A-I) must be shipped and stable.
**Complexity:** Complex (12 phases across 4 tracks)
**Estimated time:** 20-24 hours across 12 sessions

---

## V2 Tracks Overview

V2 is not one linear sequence. It's 4 parallel tracks that can be built in any order based on client demand.

```
Track 1: Domain sections + business presets (Phases J, K, L)
  → The sections that make each business type unique
  → Unlocks Tier 1 and Tier 2 business types fully

Track 2: Layout + content expansion (Phases M, N)
  → Multi-page support, blog/MDX, multi-language
  → Unlocks complex businesses (hospital, school, hotel)

Track 3: Additional hero + section variants (Phase O, P)
  → Remaining 6 hero variants, additional section variants
  → More visual variety for remix

Track 4: Visual configurator (Phases Q, R, S, T)
  → The browser-based UI for theme/hero/section switching
  → Reference: nexu-io/open-design
  → Unlocks client-facing demos and self-serve editing
```

---

## Track 1: Domain Sections + Business Presets

### Phase J: Domain sections batch 1 (healthcare + food + beauty)
**Effort:** 120 min | **Session:** Fresh

#### Tasks
1. Build `menu-food` section: `categorized` variant (category headers + item rows with name, price, description, veg/non-veg badge, optional image) and `photo-menu` variant (card grid with food images)
2. Build `menu-services` section: `price-list` variant (service name, duration, price in clean rows grouped by category)
3. Build `booking` section: `whatsapp-cta` variant (pre-filled WhatsApp message link with business name), `inline-form` variant (name, phone, date, time, service dropdown), `calendly-embed` variant (iframe embed)
4. Build `conditions-treated` section: `icon-grid` variant (condition name + icon in a responsive grid)
5. Build `procedures` section: `accordion` variant (procedure name expands to show description, duration, cost)
6. Build `emergency` section: `top-banner` variant (red/urgent colored bar with phone number and "Call Now" button, fixed at top)

#### Test
Restaurant preset now includes menu-food (categorized). Doctor preset includes conditions-treated and booking (whatsapp-cta). Each section uses CSS variables. Content from config. Responsive at 375px.

---

### Phase K: Domain sections batch 2 (fitness + real estate + legal + education + hospitality)
**Effort:** 120 min | **Session:** Fresh

#### Tasks
1. Build `class-schedule` section: `weekly-table` variant (Mon-Sun columns, time slot rows, class names color-coded by type)
2. Build `membership` section: `tier-cards` variant (3 plan cards like pricing but with gym-specific language: monthly/quarterly/annual, facilities included)
3. Build `property-listings` section: `featured-carousel` variant (property cards with image, price, bedrooms/bathrooms/sqft, location, status badge)
4. Build `area-guide` section: `card-grid` variant (neighborhood cards with image, name, description, property count)
5. Build `practice-areas` section: `icon-grid` variant (legal specialization with icon and short description)
6. Build `case-results` section: `stats` variant (big numbers: cases won, years experience, settlements value)
7. Build `programs` section: `card-grid` variant (course/program cards with name, duration, fee, description)
8. Build `rooms` section: `card-grid` variant (room type cards with image carousel, amenities icons, price per night, book CTA)
9. Build `amenities` section: `icon-grid` variant (facility icons with labels: pool, wifi, parking, gym, spa, restaurant)

#### Test
Gym preset now includes class-schedule and membership. Real estate preset includes property-listings and area-guide. Lawyer preset includes practice-areas and case-results. All render correctly with their preset themes.

---

### Phase L: Remaining business type presets (Tier 1 remaining + Tier 2)
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Build presets for remaining Tier 1 types:
   - `presets/dentist.ts`: pharma-clean theme, premium animations, split-image hero. Includes procedures, booking, gallery.
   - `presets/gym.ts`: gym-kettlebell theme, premium animations, video-bg hero. Includes class-schedule, membership, team.
   - `presets/realestate.ts`: realty-open-house theme, standard animations, centered hero. Includes property-listings, area-guide, stats.
   - `presets/lawyer.ts`: swiss-grid theme, subtle animations, minimal hero. Includes practice-areas, case-results, testimonials.
   - `presets/retail.ts`: luxe-commerce theme, standard animations, carousel hero. Includes products, gallery, trust.

2. Build presets for Tier 2 types:
   - `presets/hospital.ts`: clinic-sage theme, subtle, stats-hero. Includes departments, doctor-directory, emergency, amenities.
   - `presets/vet.ts`: pet-pawprint theme, standard, split-image. Includes services, booking, emergency, gallery.
   - `presets/bakery.ts`: bakery-flour theme, standard, carousel hero. Includes menu-food, products, order-form, gallery.
   - `presets/school.ts`: classroom-paper theme, subtle, centered. Includes programs, admissions, achievements, team, events-calendar.
   - `presets/hotel.ts`: hotel-riviera theme, premium, image-bg. Includes rooms, amenities, gallery, booking, location.
   - `presets/events.ts`: florist-bouquet theme, premium, collage hero. Includes portfolio, packages, process, testimonials.
   - `presets/photographer.ts`: film-photography theme, premium, parallax hero. Includes portfolio, packages, testimonials.
   - `presets/pharmacy.ts`: pharma-clean theme, subtle, centered. Includes services, hours, location, trust.

3. Add compatibleThemes and compatibleHeroes arrays to each new preset.
4. Write realistic sample content for each (Hyderabad-based businesses).

#### Test
All 17 presets (4 from V1 + 13 new) render complete sites. Each has unique section combinations. Theme remix works across all presets. No two presets produce visually identical sites.

---

## Track 2: Layout + Content Expansion

### Phase M: Multi-page layout support
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Update config schema: add `page` field to SectionConfig type. When `layout.type` is "multi-page", sections are filtered by page.
2. Build `src/app/[page]/page.tsx`: dynamic route that reads `layout.pages[]` from config, renders only sections where `section.page` matches the route parameter.
3. Build page-level navigation: navbar generates links to each page (not just anchor links). Active page highlighted.
4. Build a page transition wrapper: Framer Motion page enter/exit animations (fade or slide).
5. Update section-renderer to support both modes: single-page (anchor links) and multi-page (route links).
6. Test with lawyer preset (natural multi-page candidate: home, practice-areas, about, contact).
7. Test with hospital preset (departments, doctors, about need their own pages).

#### Test
Lawyer preset renders as multi-page: /home, /practice-areas, /about, /contact. Each page shows only its sections. Navbar links navigate between pages. Browser back/forward works. Single-page presets (doctor, salon) still work unchanged.

---

### Phase N: Blog system + multi-language foundation
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Build MDX blog system:
   - `src/app/blog/page.tsx`: blog listing page (grid of post cards with title, excerpt, date, image)
   - `src/app/blog/[slug]/page.tsx`: individual blog post rendered from MDX
   - Blog posts stored as `.mdx` files in `content/blog/`
   - Blog listing section (`blog-preview` type) for homepage: shows latest 3 posts
   - Config flag: `features.blog: true | false` to enable/disable

2. Build multi-language foundation:
   - `locale` field in site.config.ts (default: "en")
   - Content schema supports `content.en` and `content.hi` (or any language code)
   - Language switcher component in navbar (dropdown with flag icons)
   - Right-to-left (RTL) support via `dir="rtl"` on html element when locale requires it
   - V2 scope: just the infrastructure. Actual Hindi/regional translations are content work, not code work.

#### Test
Blog listing renders 3 sample posts on homepage. Individual blog post renders MDX with images, headings, code blocks. Blog can be toggled off via config. Language switcher shows in navbar when multiple locales exist. Content renders in selected language.

---

## Track 3: Additional Variants

### Phase O: Remaining hero variants
**Effort:** 60 min | **Session:** Fresh

#### Tasks
1. Build `HeroCarousel`: multiple slides with different images and messages, auto-play with dots navigation, pause on hover
2. Build `HeroParallax`: background image moves at different speed than content, depth effect, works with scroll
3. Build `HeroCollage`: 3-4 overlapping images in creative asymmetric layout, text overlay, playful feel
4. Build `HeroMapHero`: Google Maps as background with business location pin, service info overlay card
5. Build `HeroProduct`: featured product image(s) with subtle float/rotate animation, product details alongside
6. Build `HeroStatsHero`: key numbers prominent (patients served, years, locations), animated counters, authoritative feel

#### Test
All 12 hero variants now available (6 from V1 + 6 new). Each works with all designdotmd themes. Each responsive at 375px. Carousel auto-plays and pauses. Parallax smooth on scroll. Collage doesn't overlap text on mobile.

---

### Phase P: Additional section variants + domain sections batch 3
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Additional variants for existing sections:
   - Services: `card-carousel`, `detailed-accordion`, `tabbed` variants
   - About: `timeline`, `stats-inline` variants
   - Testimonials: `featured-quote`, `video-testimonial` variants
   - Gallery: `before-after`, `fullwidth-carousel` variants
   - Contact: `split-info`, `minimal` variants
   - CTA: `split`, `floating-bar`, `countdown` variants
   - Stats: `icon-stat`, `progress-bar` variants
   - Footer: already has 4 variants, skip

2. Remaining domain-specific sections:
   - `portfolio`: `masonry` and `case-study` variants (for photographer, interiors, events, construction)
   - `packages`: `tier-cards` variant (for photographer, events, wedding, catering)
   - `process`: `timeline-vertical` variant (for interiors, events, construction)
   - `products`: `grid` and `categorized` variants (for retail, bakery, jewellery, petshop)
   - `donations`: `qr-upi` variant (UPI QR code for Indian nonprofits) and `cta-with-tiers` variant
   - `impact`: `stats` variant (for nonprofit: lives touched, funds raised, projects completed)
   - `order-form`: `simple-form` variant (for bakery, catering, printing)
   - `service-areas`: `map-overlay` variant (for homeservice, plumber, electrician)

#### Test
Remix now has significantly more variety. `remix sections` on any preset produces visually different results each time. Portfolio section works for photographer preset. Donations QR-UPI renders a scannable QR code from a UPI ID in config.

---

## Track 4: Visual Configurator

### Phase Q: Preview engine and config store
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Initialize separate Next.js app: `configurator/`
2. Build zustand config store (`config-store.ts`):
   - Holds full SiteConfig state
   - Actions: setBusinessType, setTheme, setHeroVariant, setSections, updateSectionContent, setAccentColor
   - Subscribes to changes and re-renders preview
3. Build preview iframe (`PreviewFrame.tsx`):
   - Study nexu-io/open-design's sandboxed iframe pattern
   - Renders template-hub at localhost:3000 (or embedded build) inside an iframe
   - CSS variable injection via `postMessage` API: when theme changes, send new CSS vars to iframe, iframe applies them without reload
   - Responsive preview toggle: desktop (1280px), tablet (768px), mobile (375px) using iframe width scaling
4. Build CSS injector (`css-injector.ts`):
   - Parses designdotmd YAML → generates CSS custom properties
   - Posts them to iframe via `window.postMessage`
   - Template-hub's layout.tsx listens for messages and applies received CSS vars
5. Build design.md content loader (`designdotmd.ts`):
   - Bundles all 156 designdotmd themes as a JSON index (id, name, tags, colors preview, full YAML content)
   - Generated at build time from `npx designdotmd list` + individual fetches

#### Test
Configurator app runs at localhost:3001. Preview iframe shows template-hub at localhost:3000. Changing a CSS variable in the store updates the preview iframe in real-time without page reload. Responsive toggle resizes the iframe. No white flash between updates.

---

### Phase R: Theme picker and hero switcher UI
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Build `ThemePicker.tsx`:
   - Grid of swatch cards (like open-design's design system picker)
   - Each card shows: 4-color dots (primary, secondary, tertiary, neutral), theme name, category tags, font name
   - Filterable by category (Healthcare, Food, Hospitality, etc.) and by tags (Warm, Dark, Minimal, Bold, etc.)
   - Click a swatch → config store updates → CSS injector sends new vars to iframe → instant visual update
   - Current theme highlighted with border
   - Business-type-aware: shows compatible themes first, then "all themes" expandable

2. Build `HeroStylePicker.tsx`:
   - Thumbnail cards for each hero variant (small wireframe-style previews)
   - Click → config store updates hero.variant → iframe reloads hero section
   - Business-type-aware: shows compatible heroes first

3. Build `ColorPicker.tsx`:
   - Single color input for accent color override
   - Live preview: as you drag the color picker, iframe updates tertiary/CTA colors in real-time
   - Reset button to remove override and use theme default

4. Build split-panel layout (`configurator/src/app/page.tsx`):
   - Left panel: scrollable controls (business type dropdown, theme picker, hero picker, color picker)
   - Right panel: preview iframe
   - Left panel collapsible on mobile

#### Test
Clicking a theme swatch instantly changes the preview. Clicking a hero thumbnail changes the hero. Color picker live-updates CTA buttons. Filter by "Healthcare" shows only healthcare themes. Responsive: on mobile, left panel collapses to a bottom sheet.

---

### Phase S: Section manager, copy editor, business setup
**Effort:** 90 min | **Session:** Fresh

#### Tasks
1. Build `SectionManager.tsx`:
   - Vertical list of all sections currently in config
   - Drag handles for reorder (use @dnd-kit/core)
   - Toggle checkbox to enable/disable each section
   - Variant selector dropdown per section (shows available variants for that section type)
   - "Add section" button at bottom: shows available section types not yet in config
   - Each change updates config store → preview re-renders

2. Build `CopyEditor.tsx`:
   - Click any section in the left panel to expand it
   - Shows editable fields for that section's content (headline, description, items)
   - Text inputs bound to config store
   - "Generate with AI" button per section → calls Claude API → populates fields
   - Debounced: preview updates 500ms after typing stops

3. Build `BusinessSetup.tsx`:
   - Business type dropdown (31 types)
   - Business name, tagline, phone, email, address, city input fields
   - Hours of operation table (Mon-Sun, open/close times)
   - Social links (Instagram, Facebook, WhatsApp, Google Maps URL)
   - Logo upload (stores in public/images/)
   - Selecting a business type loads its preset into config store

4. Build copy generation API route (`src/api/generate-copy/route.ts`):
   - Receives: business type, name, location, services (if provided)
   - Calls Claude API with structured prompt
   - Returns: JSON with content for all sections in the preset
   - Populates config store with generated content

#### Test
Drag a section to reorder → preview updates. Toggle a section off → disappears from preview. Change variant dropdown → section renders differently. Type in a headline field → preview updates after debounce. "Generate with AI" produces realistic, non-generic copy. Business type change loads new preset with all defaults.

---

### Phase T: Deploy flow, project management, polish
**Effort:** 60 min | **Session:** Fresh

#### Tasks
1. Build `DeployButton.tsx`:
   - "Deploy to Vercel" button
   - On click: serializes config store to site.config.ts, serializes current theme to design.md
   - Calls deploy API route
   - Deploy API route: clones template-hub repo (or uses cached clone), drops in config + design.md + images, runs `vercel --prod`
   - Shows deploy progress (building... deploying... live!)
   - Returns and displays the live URL

2. Build deploy API route (`src/api/deploy/route.ts`):
   - Uses Vercel API or CLI for deployment
   - Handles project creation, environment setup
   - Returns deployment URL

3. Build project save/load:
   - Save current config state to localStorage as a named project
   - Load a saved project back into the config store
   - Project list in a sidebar or dropdown
   - Export config as downloadable site.config.ts file

4. Polish pass:
   - Loading states on all async operations (theme loading, AI copy generation, deploy)
   - Error handling (deploy fails, API timeout, invalid config)
   - Keyboard shortcuts (Cmd+S to save, Cmd+Z to undo last change)
   - Undo/redo stack on config store (zustand middleware)

#### Test
Full flow: select business type → pick theme → pick hero → reorder sections → generate copy → edit copy → deploy → live URL works. Save project, close browser, reopen, load project, all state restored. Deploy error shows helpful message.

---



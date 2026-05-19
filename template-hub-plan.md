# Template Hub Plan: Web Agency Pipeline

## Purpose

A single Next.js template that can be configured for any local business type through a `site.config.ts` file. Claude Code reads the config, populates content, applies theming, and deploys to Vercel. One template, infinite businesses.

---

## 1. Business Type Registry

### Tier 1: High-demand, proven market (build first)

These are the businesses that most commonly need websites, have high Google Maps search volume, and are the primary targets for the web-agency-pipeline in India and globally.

| # | Business Type | Config Key | Why Tier 1 |
|---|---|---|---|
| 1 | Doctor / Clinic | `doctor` | Every city, trust-critical, appointment-driven |
| 2 | Dentist | `dentist` | Separate from doctor: different sections (smile gallery, procedures) |
| 3 | Restaurant / Cafe | `restaurant` | Menu is king, reservations, food photography |
| 4 | Salon / Spa | `salon` | Appointment booking, gallery-heavy, pricing lists |
| 5 | Gym / Fitness Center | `gym` | Membership plans, class schedule, trainer profiles |
| 6 | Real Estate Agent | `realestate` | Property listings, area pages, lead capture |
| 7 | Lawyer / Legal Practice | `lawyer` | Practice areas, credentials, consultation CTA |
| 8 | Retail Shop / Boutique | `retail` | Product showcase, location, promotions |

### Tier 2: Strong demand, clear differentiation

| # | Business Type | Config Key | Differentiator |
|---|---|---|---|
| 9 | Hospital / Multi-specialty | `hospital` | Departments, doctor directory, emergency info |
| 10 | Veterinary Clinic | `vet` | Pet-focused copy, emergency hours |
| 11 | Sweet Shop / Bakery | `bakery` | Product catalog with images, festival specials, bulk orders |
| 12 | Pharmacy / Medical Store | `pharmacy` | Services list, delivery info, health tips |
| 13 | School / Coaching Center | `school` | Admissions, faculty, programs, results/achievements |
| 14 | Hotel / Guest House | `hotel` | Room types, amenities, booking CTA, gallery |
| 15 | Event Planner / Decorator | `events` | Portfolio-heavy, service packages, past events gallery |
| 16 | Wedding Services | `wedding` | Portfolio, packages, vendor coordination |

### Tier 3: Viable, less differentiation needed

| # | Business Type | Config Key | Notes |
|---|---|---|---|
| 17 | Plumber / Electrician / AC Repair | `homeservice` | Service area, emergency contact, price estimates |
| 18 | Car Workshop / Auto Service | `auto` | Services, brands serviced, before/after |
| 19 | Photography Studio | `photographer` | Portfolio-dominant, packages, booking |
| 20 | Interior Designer | `interiors` | Portfolio, process, testimonials |
| 21 | Tutor / Freelance Professional | `individual` | Personal branding, services, testimonials, blog |
| 22 | NGO / Trust / Non-profit | `nonprofit` | Mission, impact stats, donate CTA, events |
| 23 | Place of Worship | `worship` | Events, timings, community, donations |
| 24 | Pet Shop / Grooming | `petshop` | Products, grooming services, adoption |
| 25 | Jewellery Store | `jewellery` | Collections, custom orders, trust signals |
| 26 | Printing / Sign Shop | `printing` | Products, bulk pricing, order form |
| 27 | Catering Service | `catering` | Menu packages, event types, gallery |
| 28 | Physiotherapy / Wellness Center | `wellness` | Treatments, conditions treated, team |
| 29 | Diagnostic Lab / Imaging Center | `diagnostics` | Tests offered, reports, home collection |
| 30 | Construction / Contractor | `construction` | Projects, services, certifications, gallery |

### The "catch-all"

| # | Business Type | Config Key | Notes |
|---|---|---|---|
| 31 | Generic Local Business | `local` | Default fallback: services, about, contact, testimonials |

---

## 2. Section Library

Every section is a standalone React component with multiple variants. The business type preset selects which sections to include by default, but any section can be added or removed via config.

### Universal Sections (available to all business types)

| Section | Variants | Description |
|---|---|---|
| `navbar` | `static`, `floating`, `transparent`, `hamburger-only` | Top navigation with logo, links, CTA button |
| `hero` | See Hero Styles table below | Above-the-fold first impression |
| `about` | `story`, `split-image`, `timeline`, `stats-inline` | Who we are, mission, history |
| `services` | `grid-3`, `grid-4`, `icon-list`, `card-carousel`, `detailed-accordion`, `tabbed` | What we offer |
| `team` | `grid`, `carousel`, `featured-single`, `minimal-list` | People behind the business |
| `testimonials` | `carousel`, `masonry`, `simple-grid`, `featured-quote`, `video-testimonial` | Social proof |
| `gallery` | `grid-3`, `masonry`, `lightbox`, `before-after`, `fullwidth-carousel` | Visual showcase |
| `faq` | `accordion`, `two-column`, `categorized` | Common questions |
| `contact` | `form-map`, `form-only`, `split-info`, `minimal` | Get in touch |
| `cta` | `banner`, `centered`, `split`, `floating-bar`, `countdown` | Call to action |
| `stats` | `counter-animated`, `icon-stat`, `progress-bar`, `comparison` | Numbers that matter |
| `pricing` | `cards-3`, `cards-2`, `table`, `toggle-monthly-annual`, `simple-list` | Plans and pricing |
| `footer` | `multi-column`, `simple`, `minimal`, `mega-footer` | Bottom navigation and info |
| `hours` | `table`, `card`, `inline-banner` | Business operating hours |
| `location` | `map-embed`, `multi-location`, `directions-card` | Where to find us |
| `blog-preview` | `grid-3`, `featured-sidebar`, `minimal-list` | Recent posts preview |
| `trust` | `logo-cloud`, `certifications`, `awards`, `media-mentions` | Trust signals |
| `announcement` | `top-bar`, `modal`, `inline-banner` | Promotions, alerts, notices |

### Domain-Specific Sections (only available for matching business types)

| Section | Available For | Variants | Description |
|---|---|---|---|
| `menu-food` | restaurant, bakery, catering, cafe | `categorized`, `card-grid`, `minimal-list`, `photo-menu` | Food/drink menu with prices |
| `menu-services` | salon, spa, wellness | `price-list`, `categorized`, `card-grid` | Service menu with durations and prices |
| `booking` | doctor, dentist, salon, spa, vet, hotel | `inline-form`, `cta-redirect`, `calendly-embed`, `whatsapp-cta` | Appointment/reservation |
| `departments` | hospital | `grid`, `accordion`, `tabbed` | Hospital departments |
| `doctor-directory` | hospital | `filterable-grid`, `list`, `card-carousel` | Doctor profiles with speciality filter |
| `procedures` | doctor, dentist, hospital, wellness | `accordion`, `card-grid`, `tabbed` | Treatments and procedures offered |
| `class-schedule` | gym, school, coaching | `weekly-table`, `card-grid`, `calendar-view` | Recurring schedule |
| `membership` | gym | `tier-cards`, `comparison-table` | Membership plans |
| `property-listings` | realestate | `grid`, `map-view`, `featured-carousel` | Property showcase |
| `area-guide` | realestate | `card-grid`, `detailed-page` | Neighborhood/area information |
| `practice-areas` | lawyer | `icon-grid`, `accordion`, `detailed-cards` | Legal practice specializations |
| `case-results` | lawyer | `stats`, `testimonial-style` | Case outcomes and wins |
| `products` | retail, bakery, jewellery, petshop, pharmacy | `grid`, `carousel`, `categorized` | Product showcase |
| `collections` | jewellery, retail | `banner-grid`, `lookbook` | Curated product collections |
| `programs` | school, coaching | `card-grid`, `tabbed`, `accordion` | Courses and programs offered |
| `admissions` | school | `timeline`, `form`, `info-card` | Admission process |
| `achievements` | school, individual | `stats`, `timeline`, `badge-grid` | Results, awards, milestones |
| `rooms` | hotel | `card-grid`, `comparison`, `gallery-cards` | Room types and amenities |
| `amenities` | hotel, gym, hospital | `icon-grid`, `photo-grid` | Facilities available |
| `portfolio` | photographer, interiors, events, wedding, individual, construction | `masonry`, `categorized`, `lightbox`, `case-study` | Work showcase |
| `packages` | photographer, events, wedding, catering | `tier-cards`, `detailed-accordion` | Service packages with pricing |
| `process` | interiors, events, construction, individual | `timeline-vertical`, `steps-horizontal`, `icon-flow` | How we work |
| `emergency` | hospital, vet, doctor, homeservice | `top-banner`, `floating-card` | Emergency contact/info |
| `donations` | nonprofit, worship | `cta-with-tiers`, `simple-form`, `qr-upi` | Donation/contribution |
| `impact` | nonprofit | `stats`, `timeline`, `stories` | Impact and reach |
| `events-calendar` | worship, school, nonprofit | `list`, `card-grid`, `calendar` | Upcoming events |
| `order-form` | bakery, catering, printing | `simple-form`, `product-selector` | Place orders |
| `bulk-pricing` | bakery, printing, catering | `table`, `tier-cards` | Volume/bulk pricing |
| `conditions-treated` | doctor, dentist, wellness, physiotherapy | `icon-grid`, `accordion`, `searchable-list` | Medical conditions |
| `tests-offered` | diagnostics | `categorized-list`, `searchable`, `card-grid` | Available tests/packages |
| `project-showcase` | construction, interiors | `before-after`, `case-study`, `gallery-grid` | Completed projects |
| `service-areas` | homeservice, plumber, electrician | `map-overlay`, `list-with-badges` | Areas served |

---

## 3. Hero Styles

The hero section is the most visually impactful section. Multiple variants serve different business personalities.

| Hero Style | Config Key | Best For | Description |
|---|---|---|---|
| Centered Text | `centered` | Lawyer, consultant, nonprofit | Large headline centered, subtitle, CTA buttons below. Clean, authoritative |
| Split Image | `split-image` | Doctor, salon, retail | Text on left, image on right (or reverse). Balanced, informational |
| Full Image Background | `image-bg` | Restaurant, hotel, photographer | Full-bleed background image with text overlay. Atmospheric |
| Video Background | `video-bg` | Gym, events, hotel | Auto-playing muted background video. High energy, immersive |
| Gradient + Text | `gradient` | Individual, coaching, school | Bold gradient background with large typography. Modern, SaaS-inspired |
| Carousel / Slider | `carousel` | Retail, jewellery, bakery | Multiple slides with different images/messages. Shows range |
| Parallax | `parallax` | Interiors, construction, photographer | Background moves at different speed than content. Depth effect |
| Image Collage | `collage` | Salon, events, wedding | Multiple overlapping images in a creative layout. Portfolio feel |
| Minimal / Text Only | `minimal` | Lawyer, consultant, individual | Just headline, subtitle, and CTA. Maximum sophistication |
| Map + Info | `map-hero` | Homeservice, auto, plumber | Location map as background with service info overlay. Trust + location |
| Product Showcase | `product` | Bakery, retail, jewellery | Featured product image(s) with subtle animation. Commerce feel |
| Stats Hero | `stats-hero` | Hospital, school, nonprofit | Key numbers (patients served, years, locations) prominent in hero. Authority |

---

## 4. Business Type Presets

Each business type maps to a default configuration. This is what gets generated when Claude creates a site.config.ts for a new client.

### Example: Doctor / Clinic

```
Type: doctor
Default layout: single-page
Hero style: split-image
Default sections (in order):
  1. navbar (floating)
  2. hero (split-image) - Doctor photo, name, specialization, "Book Appointment" CTA
  3. about (split-image) - Credentials, experience, philosophy
  4. services (grid-3) - Consultations, procedures, specializations
  5. conditions-treated (icon-grid) - Common conditions handled
  6. testimonials (carousel) - Patient reviews
  7. hours (card) - Clinic timings
  8. booking (whatsapp-cta) - Book appointment via WhatsApp or form
  9. location (map-embed) - Clinic address with Google Maps
  10. faq (accordion) - Insurance, first visit, etc.
  11. footer (simple)

Special content fields:
  - doctor.name, doctor.qualifications, doctor.specialization
  - doctor.registrationNumber
  - clinic.name, clinic.address, clinic.phone
  - clinic.consultationFee
  - clinic.insuranceAccepted[]

Color tendency: Blue, teal, or green (trust, health, calm)
Photography style: Professional headshot, clean clinic interior
```

### Example: Restaurant / Cafe

```
Type: restaurant
Default layout: single-page
Hero style: image-bg
Default sections (in order):
  1. navbar (transparent)
  2. hero (image-bg) - Food photography, restaurant name, tagline, "Reserve a Table" CTA
  3. about (story) - Chef's story, origin, philosophy
  4. menu-food (categorized) - Full menu with categories and prices
  5. gallery (masonry) - Food and ambiance photos
  6. testimonials (simple-grid) - Customer reviews
  7. hours (inline-banner) - Opening hours
  8. location (map-embed) - Address, parking info
  9. cta (banner) - "Order Online" or "Reserve" CTA
  10. footer (simple)

Special content fields:
  - restaurant.cuisine, restaurant.priceRange
  - restaurant.deliveryPartners[] (Swiggy, Zomato links)
  - restaurant.reservationLink
  - menu.categories[].items[].name, .price, .description, .image, .veg
  - restaurant.specialties[]

Color tendency: Warm tones (burgundy, amber, cream, dark greens)
Photography style: Overhead food shots, warm ambient lighting
```

### Example: Salon / Spa

```
Type: salon
Default layout: single-page
Hero style: collage
Default sections (in order):
  1. navbar (static)
  2. hero (collage) - Beauty imagery, salon name, "Book Now" CTA
  3. menu-services (price-list) - Full service menu with prices and durations
  4. gallery (before-after) - Transformation photos
  5. team (grid) - Stylists with specialties
  6. testimonials (carousel) - Client reviews
  7. products (carousel) - Products used/sold (optional)
  8. booking (whatsapp-cta) - Appointment booking
  9. hours (card) - Working hours
  10. location (map-embed)
  11. footer (simple)

Special content fields:
  - salon.services[].category, .name, .price, .duration
  - salon.stylists[].name, .specialty, .photo
  - salon.brands[] (product brands used)

Color tendency: Pink, rose gold, soft purples, black-and-gold for premium
Photography style: Close-up beauty, before/after, salon interior
```

### Example: Gym / Fitness Center

```
Type: gym
Default layout: single-page
Hero style: video-bg
Default sections (in order):
  1. navbar (floating)
  2. hero (video-bg) - Training footage, gym name, "Join Now" CTA
  3. about (stats-inline) - Years, members, trainers, equipment count
  4. services (card-carousel) - Gym, CrossFit, yoga, personal training
  5. class-schedule (weekly-table) - Weekly class timetable
  6. membership (tier-cards) - Monthly, quarterly, annual plans
  7. team (carousel) - Trainers with certifications
  8. gallery (fullwidth-carousel) - Facility photos
  9. testimonials (featured-quote) - Transformation stories
  10. cta (banner) - Free trial / first class free
  11. location (map-embed)
  12. footer (multi-column)

Special content fields:
  - gym.facilities[] (cardio, weights, pool, sauna, etc.)
  - gym.classes[].name, .trainer, .time, .day
  - gym.plans[].name, .price, .duration, .features[]
  - gym.trialOffer

Color tendency: Black, red, orange, high-energy colors
Photography style: Action shots, equipment, transformations
```

### Example: Lawyer / Legal Practice

```
Type: lawyer
Default layout: multi-page (home, practice-areas, about, contact)
Hero style: minimal
Default sections (in order):
  - Home page:
    1. navbar (static)
    2. hero (minimal) - Name, firm name, "Free Consultation" CTA
    3. practice-areas (icon-grid) - Areas of practice
    4. about (split-image) - Experience, bar registrations
    5. case-results (stats) - Cases won, experience years
    6. testimonials (featured-quote) - Client reviews
    7. cta (centered) - "Schedule Consultation"
    8. footer (multi-column)

Special content fields:
  - lawyer.name, lawyer.barNumber, lawyer.experience
  - lawyer.practiceAreas[].name, .description, .icon
  - lawyer.education[], lawyer.certifications[]
  - firm.name, firm.established

Color tendency: Navy, dark green, burgundy, gold accents (authority, trust)
Photography style: Professional portrait, office interior
```

### Example: Real Estate Agent

```
Type: realestate
Default layout: multi-page (home, listings, about, contact)
Hero style: centered
Default sections (in order):
  - Home page:
    1. navbar (floating)
    2. hero (centered) - "Find Your Dream Home in [City]", search/filter CTA
    3. property-listings (featured-carousel) - Featured properties
    4. services (grid-3) - Buy, sell, rent
    5. area-guide (card-grid) - Neighborhoods served
    6. stats (counter-animated) - Properties sold, years, happy clients
    7. testimonials (carousel)
    8. cta (split) - "List Your Property" + "Search Properties"
    9. footer (mega-footer)

Special content fields:
  - agent.name, agent.license, agent.areas[]
  - properties[].title, .price, .location, .bedrooms, .bathrooms, .sqft, .images[], .status
  - areas[].name, .description, .image, .propertyCount

Color tendency: Blue, white, clean neutrals (trust, professionalism)
Photography style: Property exteriors, interiors, aerial shots
```

---

## 5. Theme System (powered by designdotmd)

### Source: designdotmd.directory

The theme system is built on top of `designdotmd` (npm package, 156 designs, CLI-driven).
Every design.md file follows a consistent YAML frontmatter schema:

```yaml
# Every design.md has this exact structure:
colors:
  primary: "#hex"      # Headlines, core text
  secondary: "#hex"    # Borders, captions, metadata
  tertiary: "#hex"     # Interaction accent (CTAs, links, buttons)
  neutral: "#hex"      # Page background
  surface: "#hex"      # Card/component background
  on-primary: "#hex"   # Text on primary-colored surfaces
typography:
  display: { fontFamily, fontSize, fontWeight, letterSpacing }
  h1: { fontFamily, fontSize, fontWeight }
  body: { fontFamily, fontSize, lineHeight }
  label: { fontFamily, fontSize, fontWeight, letterSpacing }
rounded:
  sm: Xpx
  md: Xpx
  lg: Xpx
spacing:
  sm: Xpx
  md: Xpx
  lg: Xpx
components:
  button-primary: { backgroundColor, textColor, rounded, padding }
  card: { backgroundColor, textColor, rounded, padding }
```

### How theming works

```
Step 1: Pick a designdotmd design for the business
  npx designdotmd add clinic-sage         # → writes design.md

Step 2: Template parser reads the YAML frontmatter
  → Extracts colors, typography, rounded, spacing, components

Step 3: Maps tokens to Tailwind v4 @theme block + CSS custom properties
  colors.primary    → --color-primary
  colors.tertiary   → --color-accent (interaction color)
  typography.display.fontFamily → --font-display
  rounded.md        → --radius-md
  etc.

Step 4 (optional): Business accent color override
  If theme.accentColor is set in site.config.ts,
  it REPLACES colors.tertiary (the interaction color)
  while keeping the rest of the designdotmd palette intact.
  This gives you: the design's overall aesthetic + the business's brand color for CTAs.
```

### Business type → designdotmd mapping (defaults)

| Business Type | designdotmd ID | Tags | Why |
|---|---|---|---|
| Doctor / Clinic | `clinic-sage` | Healthcare, Calm, Minimal | Sage greens, calming, clinical trust |
| Dentist | `pharma-clean` | Healthcare, Minimal, Cool | Clean, precise, professional |
| Restaurant | `coffee-roast` | Food, Warm, Sans | Warm tones, serif display, inviting |
| Cafe | `coffee-roast` | Food, Warm, Sans | Same warmth, coffee-native |
| Bakery / Sweet Shop | `bakery-flour` | Food, Warm, Soft | Soft, flour-toned, approachable |
| Salon / Spa | `skincare-matte` | Beauty, Minimal, Soft | Matte, premium, beauty-native |
| Gym / Fitness | `gym-kettlebell` | Fitness, Bold, Mono | Dark, high-energy, bold type |
| Lawyer | `swiss-grid` | Minimal, Sans, Corporate | Corporate precision, grid-based |
| Real Estate | `realty-open-house` | Architecture, Warm, Serif | Property-warm, trustworthy |
| Hotel | `hotel-riviera` | Hospitality, Warm, Serif | Warm, inviting, premium serif |
| Hospital | `clinic-sage` | Healthcare, Calm, Minimal | Same calming clinical base |
| Wellness / Physio | `wellness-coral` | Healthcare, Warm, Soft | Warm coral, therapeutic |
| Vet / Pet Shop | `pet-pawprint` | Pet, Warm, Playful | Warm, playful, approachable |
| School / Coaching | `classroom-paper` | Education, Warm, Serif | Warm, structured, scholarly |
| Photographer | `film-photography` | Photography, Warm, Mono | Mono, film-grain, visual-first |
| Interior Designer | `gallery-white` | Minimal, Serif, Warm | Gallery-like, white-space-heavy |
| Events / Wedding | `florist-bouquet` | Retail, Warm, Serif | Warm, celebration-oriented |
| Jewellery | `old-money` | Serif, Warm, Editorial | Premium serif, editorial weight |
| Construction | `architect-blueprint` | Architecture, Minimal, Technical | Blueprint precision |
| Auto Workshop | `graphite` | Dark, Sans, Technical | Technical, dark, industrial |
| NGO / Nonprofit | `mutual-aid` | Nonprofit, Warm, Sans | Warm, community-oriented |
| Individual / Freelancer | `portfolio-studio` | Portfolio, Minimal, Serif | Clean portfolio aesthetic |
| Generic Local Business | `notion-beige` | Minimal, Warm, Sans | Neutral, universally approachable |

### Theme in site.config.ts

```typescript
theme: {
  // Primary: pick from designdotmd directory (156 options)
  designMd: "clinic-sage",
  // OR: provide a custom design.md path
  // designMdPath: "./custom-design.md",

  // Optional: override the interaction/accent color with business brand
  accentColor: "#2563EB",  // from business logo

  // These are auto-derived from design.md but can be overridden:
  mode: "light" | "dark" | "auto",  // derived from neutral color lightness
}
```

### What the template parser does

```typescript
// src/lib/design-md-parser.ts

// 1. Read design.md from project root or bundled designs
// 2. Parse YAML frontmatter (gray-matter or similar)
// 3. Extract typed tokens:

interface DesignTokens {
  colors: {
    primary: string
    secondary: string
    tertiary: string   // interaction/accent
    neutral: string    // page background
    surface: string    // card background
    onPrimary: string  // text on primary surfaces
  }
  typography: {
    display: { fontFamily: string, fontSize: string, fontWeight: number, letterSpacing?: string }
    h1: { fontFamily: string, fontSize: string, fontWeight: number }
    body: { fontFamily: string, fontSize: string, lineHeight: number }
    label: { fontFamily: string, fontSize: string, fontWeight: number, letterSpacing?: string }
  }
  rounded: { sm: string, md: string, lg: string }
  spacing: { sm: string, md: string, lg: string }
  components: {
    buttonPrimary: { backgroundColor: string, textColor: string, rounded: string, padding: string }
    card: { backgroundColor: string, textColor: string, rounded: string, padding: string }
  }
}

// 4. If accentColor is set, replace tertiary + button backgroundColor
// 5. Generate CSS custom properties + Tailwind @theme
// 6. Resolve font families → next/font/google imports
```

### CLI workflow in the pipeline

```bash
# During site generation, Claude Code runs:
cd ~/projects/clients/smile-care-dental/

# Download the design system
npx designdotmd add clinic-sage
# → writes design.md at project root

# Template reads it automatically at build time
pnpm build  # → parser extracts tokens → generates theme → renders site
```

### Available designdotmd categories (for reference)

| Category | Count | Example Designs |
|---|---|---|
| Healthcare | 4 | clinic-sage, wellness-coral, pharma-clean, therapy-room |
| Food | 7 | coffee-roast, bakery-flour, street-food, natural-wine, tea-house, farmers-market, whisky-peat |
| Hospitality | 3 | hotel-riviera, yacht-club, speakeasy |
| Beauty | 2 | skincare-matte, botanical-apothecary |
| Fitness | 2 | gym-kettlebell, running-kilometer |
| Education | 2 | classroom-paper, campus-collegiate |
| Architecture | 3 | architect-blueprint, realty-open-house, coworking-loft |
| Retail | 3 | florist-bouquet, luxe-commerce, scandi-pine |
| Fashion | 5 | atelier-noir, streetwear-block, gallery-avant, denim-workwear, horology-chronograph |
| Photography | 1 | film-photography |
| Pet | 1 | pet-pawprint |
| Nonprofit | 1 | mutual-aid |
| Sports | 3 | surf-daybreak, ski-alpine, skate-deck |
| Portfolio | 1 | portfolio-studio |
| **Total** | **156** | Across all categories including Technical, Finance, Music, etc. |

---

## 6. Layout Modes

### Single-Page (default for most)

One scrollable page with all sections stacked. Best for simple businesses that need a digital presence fast. Anchor links in navbar scroll to sections.

Good for: Doctor, salon, bakery, homeservice, plumber, petshop, worship, catering

### Multi-Page

Separate pages for different content areas. Better for content-heavy businesses.

Good for: Hospital (departments need their own pages), lawyer (practice area detail pages), real estate (listing pages), school (programs, admissions, faculty), hotel (rooms, amenities)

### Page Structure for Multi-Page

```
/                    → Home (hero + highlights + CTAs)
/about               → About page
/services            → Services listing (or /menu, /treatments, /practice-areas)
/services/[slug]     → Individual service detail
/team                → Team/doctors/faculty
/team/[slug]         → Individual profile
/gallery             → Photo gallery
/contact             → Contact form + map
/blog                → Blog listing (optional)
/blog/[slug]         → Blog post
```

---

## 7. Content Schema

Every business type has a typed content schema in `site.config.ts`. This is what Claude populates during the pipeline.

### Core Schema (all types)

```typescript
interface SiteConfig {
  // Business identity
  business: {
    type: BusinessType
    name: string
    tagline: string
    description: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    pincode: string
    mapUrl: string
    socialLinks: {
      instagram?: string
      facebook?: string
      twitter?: string
      youtube?: string
      linkedin?: string
      whatsapp?: string
    }
    hours: {
      [day: string]: { open: string, close: string } | "closed"
    }
    logo?: string // path or URL
    favicon?: string
  }

  // Theme
  theme: {
    source: "design-md" | "accent" | "preset"
    accentColor?: string // hex
    designMdPath?: string
    mode: "light" | "dark" | "auto"
    fontMood?: FontMood
    headingFont?: string
    bodyFont?: string
    radius?: "sharp" | "rounded" | "soft" | "pill"
    spacing?: "tight" | "balanced" | "generous" | "airy"
  }

  // Layout
  layout: {
    type: "single-page" | "multi-page"
    pages?: string[]
  }

  // Hero
  hero: {
    style: HeroStyle
    headline: string
    subheadline: string
    cta: { text: string, url: string, variant: "primary" | "secondary" }
    secondaryCta?: { text: string, url: string }
    image?: string
    video?: string
    images?: string[] // for carousel/collage
  }

  // Sections (ordered)
  sections: SectionConfig[]

  // SEO
  seo: {
    title: string
    description: string
    ogImage?: string
    keywords?: string[]
    locale?: string
  }
}
```

### Extended schemas per business type

Each business type adds its own typed fields. Examples:

```typescript
// Doctor-specific
interface DoctorConfig {
  doctor: {
    name: string
    qualifications: string[]
    specialization: string
    registrationNumber: string
    experience: number // years
    photo: string
  }
  clinic: {
    consultationFee: string
    insuranceAccepted: string[]
  }
  conditions: { name: string, icon?: string }[]
  procedures: { name: string, description: string }[]
}

// Restaurant-specific
interface RestaurantConfig {
  cuisine: string[]
  priceRange: "$" | "$$" | "$$$" | "$$$$"
  deliveryPartners: { name: string, url: string }[]
  reservationLink?: string
  menu: {
    categories: {
      name: string
      items: {
        name: string
        price: number
        description?: string
        image?: string
        tags: ("veg" | "nonveg" | "vegan" | "bestseller" | "spicy")[]
      }[]
    }[]
  }
}
```

---

## 8. Claude Workflow Integration

### How it fits the web-agency-pipeline

```
Step 1: Prospect (existing pipeline)
  └── Google Maps prospecting → find business without website

Step 2: Gather Info
  └── Claude extracts: business name, type, address, phone, hours
  └── Extract accent color from logo/photos (or use default for type)
  └── Optional: client provides additional info

Step 3: Generate Config
  └── Claude generates site.config.ts using business type preset
  └── Populates content fields from gathered info
  └── Selects hero style and section order
  └── Applies theme (accent color + font mood + radius)

Step 4: Build
  └── Clone template hub repo
  └── Drop in site.config.ts
  └── Template reads config and renders sections
  └── Claude can customize individual section content

Step 5: Deploy
  └── vercel deploy (one command)
  └── Share preview URL with prospect

Step 6: Client Approval
  └── Client reviews preview
  └── Adjustments via config changes (not code changes)
  └── Final deploy with custom domain
```

### Config-first, not code-first

The entire point is that going from "new business" to "live website" requires only:
1. Generating a JSON/TS config file
2. Dropping it into the template
3. Deploying

No custom code per client. No per-site design work. Config changes only.

### Remix commands (post-generation)

After a site is generated and deployed, these commands let you visually refresh it without touching content. All commands run inside the client project folder in Claude Code.

| Command | What it does | What changes | What stays |
|---|---|---|---|
| `remix theme` | Swaps to next compatible designdotmd | design.md (colors, fonts, radius, spacing) | All content, sections, hero style, layout |
| `remix hero` | Swaps to next compatible hero variant | hero.variant in site.config.ts | Theme, content, all other sections |
| `remix sections` | Reshuffles section order + swaps variants | sections[].variant and order in site.config.ts | Theme, content, hero |
| `remix layout` | Toggles single-page vs multi-page | layout.type in site.config.ts | Theme, content, sections |
| `remix all` | New theme + hero + section variants | design.md + hero + sections | Content only (copy, business info, images) |
| `remix theme [id]` | Swap to a specific designdotmd by ID | design.md | Everything else |
| `remix hero [style]` | Swap to a specific hero variant | hero.variant | Everything else |

Each business type preset defines its compatible options:

```typescript
// presets/gym.ts
export const gymPreset = {
  compatibleThemes: [
    "gym-kettlebell",       // Fitness, Bold, Mono
    "tokyo-midnight",       // Dark, Bold, Cool
    "graphite",             // Dark, Sans, Technical
    "cobalt-product",       // Sans, Cool, Corporate
    "neon-arcade",          // Dark, Playful, Mono
    "streetwear-block",     // Fashion, Bold, Sans
  ],
  compatibleHeroes: [
    "video-bg",             // Training footage background
    "image-bg",             // Full-bleed gym photo
    "parallax",             // Depth effect with equipment
    "gradient",             // Bold text-forward
  ],
  // "minimal", "map-hero", "collage" excluded: don't fit gym energy
}
```

`remix theme` cycles through the compatible list, skipping the current one. `remix all` picks randomly from each compatible list to create a fresh combination.

These commands get added to the web-agency-pipeline SKILL.md as a post-build phase:

```markdown
## Remix Phase

When inside a client project folder (~/projects/clients/[slug]/):

- "remix theme" → read current business type from site.config.ts
  → load preset → pick next compatible designdotmd
  → run: npx designdotmd add [new-id]
  → rebuild: pnpm build && vercel --prod
  → report: "Swapped from clinic-sage to pharma-clean. Preview: [url]"

- "remix hero" → same flow, swap hero.variant in site.config.ts

- "remix all" → combine theme + hero + section variant swaps
  → single rebuild at the end

Always confirm the remix result with the preview URL.
Never touch content during remix. Content is sacred.
```

---

## 9. Technical Architecture

### Stack

- Next.js 16 (App Router, static export capable)
- Tailwind CSS v4 with @theme tokens
- shadcn/ui components (vendored)
- next/font for Google Fonts
- Framer Motion for section animations
- Google Maps embed for location
- Vercel for deployment

### File Structure

```
template-hub/
├── site.config.ts              ← THE CONFIG FILE (one per client)
├── presets/                    ← Business type default configs
│   ├── doctor.ts
│   ├── restaurant.ts
│   ├── salon.ts
│   └── ...
├── src/
│   ├── app/
│   │   ├── layout.tsx          ← Reads config, applies theme
│   │   ├── page.tsx            ← Renders sections from config
│   │   └── [page]/page.tsx     ← Multi-page routing
│   ├── components/
│   │   ├── sections/           ← All section components
│   │   │   ├── Hero/
│   │   │   │   ├── HeroCentered.tsx
│   │   │   │   ├── HeroSplitImage.tsx
│   │   │   │   ├── HeroImageBg.tsx
│   │   │   │   ├── HeroVideoBg.tsx
│   │   │   │   └── index.tsx   ← Variant router
│   │   │   ├── Services/
│   │   │   ├── Testimonials/
│   │   │   ├── Gallery/
│   │   │   ├── MenuFood/
│   │   │   ├── MenuServices/
│   │   │   ├── Booking/
│   │   │   └── ...
│   │   ├── ui/                 ← shadcn components
│   │   └── layout/             ← Navbar, Footer variants
│   ├── lib/
│   │   ├── config.ts           ← Config reader and validator
│   │   ├── theme.ts            ← OKLCH color generation
│   │   └── fonts.ts            ← Font loader by mood
│   └── styles/
│       └── globals.css         ← Tailwind v4 @theme + CSS vars
├── public/
│   ├── images/                 ← Client images
│   └── fonts/                  ← Local font fallbacks
└── DESIGN.md                   ← Optional aesthetic reference
```

### Section Rendering Engine

```tsx
// src/app/page.tsx
import { siteConfig } from '@/site.config'
import { SectionRenderer } from '@/components/sections'

export default function Home() {
  return (
    <main>
      {siteConfig.sections.map((section, i) => (
        <SectionRenderer
          key={`${section.type}-${i}`}
          type={section.type}
          variant={section.variant}
          content={section.content}
        />
      ))}
    </main>
  )
}
```

---

## 10. Build Phases

### Phase 1: Foundation (Week 1-2)

- Config schema + validator + type system
- Theme engine (accent → OKLCH → CSS vars → Tailwind)
- Font loader by mood
- Section rendering engine
- Navbar (4 variants) + Footer (4 variants)

### Phase 2: Core Sections (Week 2-3)

- Hero (all 12 variants)
- Services (6 variants)
- About (4 variants)
- Testimonials (5 variants)
- Gallery (5 variants)
- Contact (4 variants)
- CTA (5 variants)
- FAQ (3 variants)
- Stats (4 variants)
- Hours + Location

### Phase 3: Domain Sections (Week 3-4)

- Menu (food) - for restaurant, bakery, catering
- Menu (services) - for salon, spa
- Booking - appointment/reservation
- Pricing/Membership - for gym, SaaS-style plans
- Team with profiles
- Portfolio - for photographer, events, interiors

### Phase 4: Business Presets + Pipeline Integration (Week 4-5)

- All 8 Tier 1 business type presets
- Tier 2 presets (8 more)
- web-agency-pipeline integration
- One-command Vercel deploy script
- Demo sites for each Tier 1 type

### Phase 5: Polish + Remaining (Week 5-6)

- Tier 3 presets
- Remaining domain-specific sections
- Multi-page layout support
- SEO metadata generation
- Performance optimization (static export, image optimization)
- Documentation

---

## 11. Decisions to Confirm

Before building, we should align on:

1. **Single repo or template-per-client repos?** I recommend single repo with config files per client (like a monorepo with configs in a `/clients/` folder during development, then each gets its own deploy).

2. **Static export vs server-side?** Static export (`next build && next export`) is cheaper and faster to deploy, but limits dynamic features. For local businesses, static is almost always sufficient.

3. **Image handling**: Stock images as defaults per business type? Or always require client images? I'd suggest having high-quality defaults that get replaced.

4. **WhatsApp vs form for contact/booking**: In India, WhatsApp CTA is often more effective than a form. Should the default booking CTA be WhatsApp-first?

5. **Multi-language**: Should the template support Hindi/regional language variants? This adds complexity but covers a huge market gap.

6. **Blog**: Include a simple MDX blog system, or keep it pure marketing site? Blog helps SEO but adds scope.

7. **Domain-specific sections**: Build all 30+ sections in Phase 3-5, or start with just the Tier 1 business types and expand on demand?

---

## 12. Revenue Angle

This template system has multiple monetization paths:

- **Web agency pipeline** (existing): Build and sell sites to local businesses at 5k-25k INR per site
- **Template marketplace**: Package and sell on UI8/LemonSqueezy as a "multi-business Next.js template kit"
- **SaaS potential**: Build a config UI where non-technical users pick their business type, customize, and deploy (future, significant scope increase)
- **Freelance pitches**: Use as a speed multiplier for Upwork/Dribbble proposals. "I can deliver your site in 48 hours" becomes real

---

## 13. Visual Configurator (Phase 2 reference)

After V1 ships, a visual configurator UI will be built as a separate app on top of template-hub. Reference repo for the preview layer:

**nexu-io/open-design** (github.com/nexu-io/open-design)
- Apache-2.0 licensed, local-first open replica of Claude Design
- 71 design systems (from awesome-design-md), 19 skills
- Vite + React SPA + local Express daemon + sandboxed iframe preview
- Key patterns to adopt: srcdoc iframe rendering, design system swatch grid, AI-emitted tweaks panel
- Key patterns to skip: agent spawning, skill/artifact model, daemon architecture

The configurator will be a split-panel UI (controls left, live preview right) that writes site.config.ts and design.md, then deploys to Vercel. Theme switching will be instant via CSS variable injection into the preview iframe, no rebuild needed.

---

*Planning complete. Deliverables: CLAUDE.md, plan-tree.json, plan.md with execution prompts.*

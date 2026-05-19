# Template Hub: Repo Upgrade Plan

Repo: github.com/rx4u/template-hub
Purpose: Align the codebase with web-agency-pipeline v4.0.0 requirements.
Execute in Claude Code, in order. Each batch is independent and deployable.

---

## Batch 1: Layout and Border Fixes (Day 1)

Non-breaking CSS/component changes. Immediate visual impact on every generated site.

### Task 1.1: Enforce page content width at 1440px

**What:** Every section component must wrap its inner content in a max-w-[1440px] container.

**Where:** All section components (hero, about, services, gallery, testimonials, stats, FAQ, contact, CTA, pricing, hours, team, trust).

**Pattern:**
```tsx
// WRONG: content touches viewport edge
<section className="bg-white py-20">
  <div className="px-4">
    {/* content */}
  </div>
</section>

// RIGHT: full-bleed bg, contained content
<section className="bg-white py-20">
  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    {/* content */}
  </div>
</section>
```

**Rules:**
- Section backgrounds (bg-white, bg-zinc-50, etc.) are full-bleed (no max-width constraint on the outer element)
- Inner content is capped at max-w-[1440px] with mx-auto and horizontal padding px-4 sm:px-6 lg:px-8
- Nav, hero, and footer follow the same pattern: full-bleed wrapper, contained inner content
- Text blocks inside sections can use narrower widths like max-w-3xl for readability, but they sit INSIDE the 1440px container, not as a replacement for it

**Check:** Open any generated site at 1920px viewport width. No content should touch the left/right viewport edges. Content should be centered with whitespace on both sides.

### Task 1.2: Remove harsh borders

**What:** Remove all visible 1px solid borders that separate nav from content, sections from each other, and content from footer.

**Where:** Nav component, all section components, footer component.

**Search for and fix:**
```
border-b        on nav/header elements -> replace with shadow-[0_1px_0_0_rgba(0,0,0,0.05)] or remove
border-t        on footer elements -> remove, use bg color change as separator
border-b        between sections -> remove, use py-16+ spacing and alternating bg colors
divide-y        on section wrappers -> remove
border-gray-*   on structural elements (not on cards/inputs, those are fine)
```

**What to keep:** Borders on cards, form inputs, table cells, and intentional design elements are fine. Only remove structural/layout borders that act as section dividers.

**Check:** Scroll through a generated site. No horizontal lines should appear between the nav and hero, between any two sections, or between the last section and footer.

### Task 1.3: Section spacing consistency

**What:** All sections must use a consistent vertical padding scale.

**Pattern:**
```tsx
// Standard section padding
<section className="py-16 sm:py-20 lg:py-24">

// Tighter for CTA sections (intentional)
<section className="py-12 sm:py-16 lg:py-20">

// Hero gets more room
<section className="min-h-[100dvh] py-20 sm:py-24 lg:py-32">
```

**Search for and fix:**
- Any section with py-4, py-6, py-8 (too tight, looks cheap)
- Any section with py-32, py-40 (too loose unless hero)
- Inconsistent mixes: one section at py-8 and the next at py-24

### Task 1.4: Tablet breakpoint audit

**What:** Every component must have styles at three breakpoints: base (mobile), md (768px), lg (1024px).

**Common failures to find and fix:**

| Component | Failure | Fix |
|---|---|---|
| Card grids | grid-cols-1 lg:grid-cols-3 (skips md) | Add md:grid-cols-2 |
| Nav | Hamburger at base, full at lg (skips md) | Add md breakpoint: condensed horizontal or keep hamburger |
| Footer | Single col at base, 4-col at lg (skips md) | Add md:grid-cols-2 |
| Hero split-screen | Stacked at base, 50/50 at lg (skips md) | Add md breakpoint: stacked or 60/40 |
| Gallery | 1 col at base, 3-4 col at lg (skips md) | Add md:grid-cols-2 |
| Stats row | Stacked at base, horizontal at lg (skips md) | Add md:grid-cols-2 |
| Team grid | 1 col at base, 3-4 col at lg (skips md) | Add md:grid-cols-2 |

**Check:** Resize browser to 768px (iPad portrait). Every component should have a sensible layout, not just the mobile or desktop version.

---

## Batch 2: Nav Component Upgrade (Day 1-2)

### Task 2.1: Add navLabel support to nav component

**What:** The nav component currently auto-generates nav items from all entries in sections[]. Change it to only render nav items for sections that have a non-null navLabel field.

**Config change:**
```ts
// site.config.ts sections array
sections: [
  { type: "hero", variant: "split-screen", navLabel: null },        // not in nav
  { type: "about", variant: "editorial-split", navLabel: "About" },  // in nav
  { type: "services", variant: "bento-grid", navLabel: "Menu" },     // in nav as "Menu"
  { type: "stats", variant: "counter-row", navLabel: null },          // not in nav
  { type: "gallery", variant: "masonry", navLabel: "Gallery" },       // in nav
  { type: "testimonials", variant: "marquee", navLabel: null },       // not in nav
  { type: "contact", variant: "split-map", navLabel: "Contact" },     // in nav
]
```

**Nav component logic:**
```tsx
const navItems = config.sections
  .filter(s => s.navLabel !== null && s.navLabel !== undefined)
  .map(s => ({ label: s.navLabel, href: `#${s.type}` }));
```

**Backward compatibility:** If a section has no navLabel field at all (old configs), fall back to current behavior (use section type as label). Only sections with explicit `navLabel: null` are hidden.

### Task 2.2: Add nav CTA button

**What:** Add a CTA button as the rightmost nav item on desktop, bottom of hamburger menu on mobile.

**Config:**
```ts
// site.config.ts nav section
nav: {
  style: "sticky",
  ctaButton: "Reserve a Table",
  ctaHref: "#contact"  // or a WhatsApp link
}
```

**Rendering:**
- Desktop: CTA is a filled button (accent color bg, white text) at the right end of the nav
- Mobile: CTA is the last item in the hamburger menu, styled as a full-width button

### Task 2.3: Active section highlighting

**What:** Highlight the current section's nav item as the user scrolls.

**Implementation:** IntersectionObserver watching each section's viewport entry. When a section is >50% visible, its corresponding nav item gets the active style (accent color text or underline).

```tsx
// Simplified logic
useEffect(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    },
    { threshold: 0.5 }
  );

  config.sections.forEach(s => {
    const el = document.getElementById(s.type);
    if (el) observer.observe(el);
  });

  return () => observer.disconnect();
}, []);
```

---

## Batch 3: Footer Variants (Day 2-3)

### Task 3.1: Build 5 footer variants

Replace the single generic footer with 5 variants selectable via config.

**Config:**
```ts
footer: {
  variant: "4-column-info",  // or 3-column-minimal, editorial-dark, warm-simple, split-cta
  bgColor: "zinc-50",
  includeHours: true,
  includeNewsletter: false
}
```

**Variant specs:**

**4-column-info** (default for most business types):
```
| Logo + tagline    | Nav links      | Business hours    | Contact info     |
| + social icons    | (from nav items)| Mon-Sat 9am-6pm  | Phone (tel: link)|
|                   |                | Sun Closed        | Address          |
|                   |                |                   | Email            |
---------------------------------------------------------------------------
|                        Copyright 2026 Business Name                      |
```

**3-column-minimal** (calm mood businesses):
```
| Logo + tagline    | Nav links       | Contact info      |
| + social icons    |                 | Phone, Address    |
---------------------------------------------------------------------------
|                        Copyright 2026 Business Name                      |
```

**editorial-dark** (bold/cinematic mood, dark bg zinc-900):
```
| Logo (white)                                                             |
| Nav links (inline, horizontal)                                           |
| Social icons (inline)                                                    |
| Optional: newsletter signup (email input + button)                       |
---------------------------------------------------------------------------
| Copyright + Legal links (Privacy, Terms)                    zinc-400 text|
```

**warm-simple** (food, community businesses):
```
|                    Logo + Business Name (centered)                        |
|                    Phone (tel: link, centered)                            |
|                    Address (centered)                                     |
|                    Hours (centered)                                       |
|                    Social icons (centered row)                            |
---------------------------------------------------------------------------
|                        Copyright 2026 Business Name                      |
```

**split-cta** (appointment-based businesses):
```
| CTA heading + button              | Contact info + hours               |
| "Ready to book your appointment?" | Phone, Address                     |
| [Book Now] button                 | Mon-Sat 9am-6pm                    |
---------------------------------------------------------------------------
| Nav links (inline)                              Copyright 2026           |
```

### Task 3.2: Footer rules (apply to all variants)

- Footer bg must not be white if the last section above it is white. Use zinc-50, zinc-100, or zinc-900 (editorial-dark)
- No border-t above footer. Separation comes from bg color change
- Footer content respects max-w-[1440px] mx-auto same as all sections
- Mobile (base): single column, everything stacked
- Tablet (md): 2 columns where applicable
- Desktop (lg): full variant layout
- Phone numbers must be click-to-call (tel: links)
- Social icons: use simple SVG icons, not Lucide/FontAwesome thick-stroke icons

---

## Batch 4: Image Safety Check (Day 3)

### Task 4.1: Create scripts/check-images.js

**What:** A Node script that reads site.config.ts, extracts every image path, and verifies each one exists.

**Logic:**
1. Parse site.config.ts (or import it)
2. Walk the config object and find every string value that looks like an image path:
   - Starts with `/images/` or `/` and ends with .jpg, .jpeg, .png, .webp, .svg, .gif
   - Starts with `http` and ends with an image extension or is a known image service (picsum.photos, ui-avatars.com)
3. For local paths: check if file exists in `public/` directory
4. For remote URLs: send a HEAD request, check for 200 response
5. Report results

**Output:**
```
Image Check: spice-garden

Found 8 image references in site.config.ts

LOCAL:
  /images/hero.jpg ................ OK (412KB)
  /images/gallery-1.jpg ........... OK (198KB)
  /images/gallery-2.jpg ........... OK (201KB)
  /images/gallery-3.jpg ........... MISSING
  /images/team-1.jpg .............. OK (89KB)

REMOTE:
  https://picsum.photos/seed/... ... OK
  https://ui-avatars.com/api/... ... OK

RESULT: FAIL (1 missing image)
  /images/gallery-3.jpg does not exist in public/images/
```

**Exit codes:** 0 = all clear, 1 = failures found.

### Task 4.2: Add pnpm check command

**What:** Add a check script to package.json that runs before build.

```json
{
  "scripts": {
    "check": "node scripts/check-images.js",
    "prebuild": "npm run check",
    "build": "next build",
    "dev": "next dev"
  }
}
```

This means `pnpm build` automatically runs the image check first. If it fails, the build never starts.

---

## Batch 5: Hero Integration Point (Day 3-4)

### Task 5.1: Add external hero support

**What:** Allow the hero section to render an externally provided component instead of only its built-in variants.

**Config:**
```ts
hero: {
  style: "external",           // new option alongside existing variants
  externalComponent: "HeroCanvas",  // component name
  // OR for HTML output:
  externalHtml: true,          // signals that hero HTML is in components/hero-external.tsx
  
  // Existing fields still work for non-external heroes
  content: {
    headline: "...",
    subtitle: "...",
    cta: "..."
  }
}
```

**Hero component logic:**
```tsx
function HeroSection({ config }) {
  if (config.hero.style === "external") {
    // Render the external component from components/hero-external.tsx
    const ExternalHero = dynamic(() => import("@/components/hero-external"));
    return <ExternalHero config={config} />;
  }
  
  // Existing variant rendering logic
  return <BuiltInHero variant={config.hero.style} content={config.hero.content} />;
}
```

**How it works with hero-canvas:** Claude Code runs hero-canvas skill, which outputs a React component file. That file is saved as `components/hero-external.tsx` in the client project. Template Hub renders it in the hero slot.

### Task 5.2: Add hero text animation support

**What:** The hero component should support text entry animations based on the animation tier from the design brief.

**Animations by tier:**
```tsx
// subtle: blur-reveal (CSS only)
.hero-headline {
  animation: blur-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
@keyframes blur-reveal {
  from { opacity: 0; filter: blur(8px); transform: translateY(12px); }
  to { opacity: 1; filter: blur(0); transform: translateY(0); }
}

// standard: staggered fade-up (CSS with delays)
.hero-headline { animation-delay: 0ms; }
.hero-subtitle { animation-delay: 150ms; }
.hero-cta { animation-delay: 300ms; }

// premium: handled by hero-canvas external component (GSAP/Aceternity)
```

Add these as CSS classes that the hero component applies based on `config.animationTier`.

---

## Batch 6: Section Animation Wrapper (Day 4)

### Task 6.1: Create section animation wrapper component

**What:** A wrapper component that applies entry animations to any section based on the animation tier.

```tsx
// components/AnimatedSection.tsx
"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  tier: "subtle" | "standard" | "premium";
  staggerIndex?: number;
}

export function AnimatedSection({ children, tier, staggerIndex = 0 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const baseClasses = "transition-all duration-700";
  const tierClasses = {
    subtle: "ease-out",
    standard: "ease-[cubic-bezier(0.16,1,0.3,1)]",
    premium: "ease-[cubic-bezier(0.16,1,0.3,1)]",
  };
  
  const hiddenClasses = {
    subtle: "opacity-0 translate-y-5",
    standard: "opacity-0 translate-y-6 blur-[4px]",
    premium: "opacity-0 translate-y-6 blur-[4px] scale-[0.98]",
  };

  const delay = tier === "subtle" ? 0 : staggerIndex * 80;

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${tierClasses[tier]} ${visible ? "opacity-100 translate-y-0 blur-0 scale-100" : hiddenClasses[tier]}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
```

### Task 6.2: Wrap all section content with AnimatedSection

**What:** Each section component wraps its inner content blocks (headings, card grids, text blocks) with AnimatedSection, passing the animation tier from config.

```tsx
// Example: Services section
<section id="services" className="py-16 sm:py-20 lg:py-24 bg-zinc-50">
  <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
    <AnimatedSection tier={config.animationTier}>
      <h2>Our Services</h2>
      <p>...</p>
    </AnimatedSection>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
      {services.map((service, i) => (
        <AnimatedSection key={i} tier={config.animationTier} staggerIndex={i}>
          <ServiceCard {...service} />
        </AnimatedSection>
      ))}
    </div>
  </div>
</section>
```

### Task 6.3: Add GSAP ScrollTrigger for premium tier (optional)

**What:** For premium tier, add GSAP as an optional dependency and use ScrollTrigger for scroll-driven animations instead of IntersectionObserver.

**Only if animation tier is premium.** Subtle and standard tiers use the CSS-only AnimatedSection wrapper above.

Add to package.json:
```json
"optionalDependencies": {
  "gsap": "^3.12.0"
}
```

Premium animations are composed by the cinematic-scroll skill and written as component code in the client project. Template Hub just needs to not block GSAP from running.

### Task 6.4: Add prefers-reduced-motion support

**What:** Disable all animations when the user has reduced-motion enabled.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

Add this to the global CSS file. Also check the AnimatedSection wrapper to skip animations when reduced-motion is active:

```tsx
const prefersReducedMotion = 
  typeof window !== "undefined" && 
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (prefersReducedMotion) return <div>{children}</div>;
```

---

## Batch 7: Design Brief Integration (Day 4-5)

### Task 7.1: Add design-brief.json reader

**What:** Template Hub reads design-brief.json (if present) at build time and uses it to override preset defaults.

**Where:** The config loading logic that reads site.config.ts and presets/[type].ts.

**Logic:**
1. Check if `design-brief.json` exists in the project root
2. If yes, read it and merge its values into the config resolution:
   - `brief.typography` overrides theme fonts
   - `brief.color` overrides theme accent/neutral
   - `brief.nav` overrides auto-generated nav
   - `brief.footer` sets footer variant
   - `brief.animation.tier` sets animation tier
   - `brief.layout.contentMaxWidth` sets content wrapper width (should always be 1440px)
3. If no brief exists, use preset defaults (backward compatible)

### Task 7.2: Add footer.variant and nav.ctaButton to site.config.ts schema

**What:** Extend the config TypeScript types to include the new fields.

```ts
interface SiteConfig {
  // existing fields...
  
  nav: {
    style: "sticky" | "floating-pill" | "transparent";
    ctaButton?: string;
    ctaHref?: string;
  };
  
  footer: {
    variant: "4-column-info" | "3-column-minimal" | "editorial-dark" | "warm-simple" | "split-cta";
    bgColor?: string;
    includeHours?: boolean;
    includeNewsletter?: boolean;
    ctaHeading?: string;
  };
  
  sections: Array<{
    type: string;
    variant: string;
    navLabel?: string | null;
    // existing fields...
  }>;
  
  animationTier: "subtle" | "standard" | "premium";
  
  layout?: {
    contentMaxWidth?: string;     // default "max-w-[1440px]"
    sectionPadding?: string;      // default "py-16 sm:py-20 lg:py-24"
    borderPolicy?: "no-borders";  // default "no-borders"
  };
}
```

---

## Execution Summary

| Batch | Tasks | Effort | Dependencies |
|---|---|---|---|
| Batch 1: Layout and border fixes | 1.1, 1.2, 1.3, 1.4 | 4-6 hours | None |
| Batch 2: Nav component upgrade | 2.1, 2.2, 2.3 | 3-4 hours | None |
| Batch 3: Footer variants | 3.1, 3.2 | 4-6 hours | Batch 1 (for content width) |
| Batch 4: Image safety check | 4.1, 4.2 | 2-3 hours | None |
| Batch 5: Hero integration point | 5.1, 5.2 | 3-4 hours | None |
| Batch 6: Section animation wrapper | 6.1, 6.2, 6.3, 6.4 | 4-6 hours | Batch 1 (for section structure) |
| Batch 7: Design brief integration | 7.1, 7.2 | 2-3 hours | Batches 2, 3 (for nav/footer config fields) |

**Total: 22-32 hours across 5 days.**

Batches 1, 2, 4 can run in parallel (no dependencies between them).
Batch 3 depends on Batch 1.
Batch 6 depends on Batch 1.
Batch 7 depends on Batches 2 and 3.

**Start with Batch 1 + 2 + 4 in parallel on Day 1. These fix the most visible issues immediately.**

---

## Verification

After all batches, generate 5 test sites to validate:

| Business | Type | Mood | Key checks |
|---|---|---|---|
| Test Doctor | doctor | Calm | 1440px width, no borders, 4 nav items, 3-column-minimal footer, subtle animations |
| Test Restaurant | restaurant | Balanced | Image check passes, warm-simple footer, standard blur-fade animations, tablet layout |
| Test Gym | gym | Bold | editorial-dark footer, premium animation wrapper, video hero integration, nav CTA "Join Now" |
| Test Photographer | photographer | Cinematic | Full-bleed hero external component, editorial-dark footer, premium GSAP animations |
| Test Lawyer | lawyer | Calm | 4-column-info footer, subtle animations, no borders, professional copy |

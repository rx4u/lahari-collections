# Design Review — Ridgeline Cycling Expeditions
**URL:** https://ridgeline-iota.vercel.app/  
**Date:** 2026-05-10  
**Reviewer:** Design Review Skill  
**Scope:** Visual presentation, interaction states, accessibility, component anatomy, content/copy  

---

## Summary
**11 findings total — 3 P1, 4 P2, 4 P3**

The hero, copy, and design-token compliance are genuinely strong. The site reads as premium. The critical failures are structural: multiple CTAs link to a section that doesn't exist (`#contact`), and both gallery and a secondary hero anchor are broken. These need fixing before any client handoff.

---

## Scores

| Dimension | Score | Note |
|---|---|---|
| Visual consistency | 9/10 | Token compliance is high throughout |
| Interaction patterns | 6/10 | CTAs dead, carousel no swipe |
| Design system health | 8/10 | One token contract violation |
| Accessibility (WCAG 2.2) | 6/10 | Stat value missing from a11y tree |
| Responsiveness | 8/10 | Clamp() used correctly in hero |
| Content / copy | 8/10 | Strong — zero slop, ₹ icon wrong currency |
| Performance perception | 7/10 | Gallery empty state missing |
| UI pattern conformance | 8/10 | Pricing + testimonials well-structured |
| Information architecture | 7/10 | "Our story" anchor wrong, missing contact |
| User flow integrity | 4/10 | Booking funnel is completely broken |

**Overall: 7.1/10** — Great design execution, broken conversion funnel.

---

## Findings

---

### DR-001
**Title:** All booking CTAs link to `#contact` — section does not exist  
**Severity:** P1 Critical  
**Layer:** Surface  
**Pages Affected:** Home (all)  
**Component:** `src/components/layout/Navbar/index.tsx`, `src/components/sections/CTA/CTABanner.tsx`, `src/components/sections/Pricing/PricingCards.tsx`  

**Problem:**  
Nav "Book Now", pricing "Book a date" / "Reserve a spot" / "Request info", and the bottom CTA "Reserve your spot" all anchor to `#contact`. No section in the DOM has `id="contact"`. Clicking any of these is a no-op — the page does not scroll anywhere.

**Root Cause:**  
The config lists `#contact` as CTA target but the sections array for Ridgeline has no contact section. The config generator in the pipeline did not add one.

**Fix:**  
Either add a Contact section to the site config (variant: `split-map` or `minimal-form`) with `id="contact"`, or change all CTA hrefs to point to the footer tel/email block via `#footer`.

**Effort Estimate:** 1–2 hours (add contact section to config + resync CTA hrefs)

---

### DR-002
**Title:** Hero secondary CTA links to `#how-it-works-timeline` — anchor does not exist  
**Severity:** P1 Critical  
**Layer:** Surface  
**Pages Affected:** Home (hero)  
**Component:** `src/components/sections/Process/ProcessStepsHorizontal.tsx`  

**Problem:**  
The hero "How it works" button (`href="#how-it-works-timeline"`) is a dead link. The Process section renders as `<section className="section-y">` with no `id` attribute — it has no anchor target.

**Root Cause:**  
`ProcessStepsHorizontal` does not set an `id` on the `<section>`. The config generator wired the hero secondary CTA to `#how-it-works-timeline` but the component doesn't emit that id.

**Fix:**  
Add `id="how-it-works-timeline"` to the `<section>` in `ProcessStepsHorizontal.tsx:17`.

```tsx
// ProcessStepsHorizontal.tsx:17
<section id="how-it-works-timeline" className="section-y">
```

**Effort Estimate:** 5 minutes

---

### DR-003
**Title:** `IndianRupee` (₹) icon shown in Programs section for a USD-denominated US company  
**Severity:** P1 Critical  
**Layer:** Surface  
**Pages Affected:** Home (programs section)  
**Component:** `src/components/sections/Programs/ProgramsCardGrid.tsx:8,53`  

**Problem:**  
`ProgramsCardGrid` hardcodes `IndianRupee` as the fee icon. Ridgeline is a Boulder, Colorado company priced in USD ($290, $1,200, $3,400). Showing ₹ next to dollar amounts is an outright error visible to every visitor.

**Root Cause:**  
The component imports `IndianRupee` unconditionally — it was built for an Indian business type and was never generalized.

**Fix:**  
Replace `IndianRupee` with `DollarSign` (or better: derive from locale/currency in config), or simply remove the icon and show fee as plain text since it already starts with `$`.

```tsx
// ProgramsCardGrid.tsx:8 — change import
import { Clock, DollarSign } from "lucide-react";
// ProgramsCardGrid.tsx:53
<DollarSign size={12} /> {item.fee}
```

Or drop the icon entirely — the fee string already contains the `$` prefix.

**Effort Estimate:** 10 minutes

---

### DR-004
**Title:** Gallery section renders empty — no images, no empty state  
**Severity:** P2 High  
**Layer:** Surface  
**Pages Affected:** Home (gallery / routes section)  
**Component:** `src/components/sections/Gallery/GalleryFullwidthCarousel.tsx:42-46`  

**Problem:**  
The "The terrain speaks." heading renders but no images are shown. `GalleryFullwidthCarousel` renders `content.images[current]?.src` directly — when the images array is empty or all paths are broken, the `<img>` renders with `src={undefined}` silently. There is no empty state.

**Root Cause:**  
No guard on `content.images.length` and no fallback UI for an empty/failing image set.

**Fix:**  
Add an early return and empty state, and guard the image render:

```tsx
if (!content.images || content.images.length === 0) return (
  <section id="gallery" className="section-y">
    <div className="page-container">
      <h2 ...>{content.headline}</h2>
      <div className="mt-12 aspect-[16/9] rounded-[var(--radius-lg)] bg-muted flex items-center justify-center text-muted-foreground text-sm">
        No route images configured
      </div>
    </div>
  </section>
);
```

**Effort Estimate:** 30 minutes

---

### DR-005
**Title:** Stat value "8" (max riders) missing from accessibility tree  
**Severity:** P2 High  
**Layer:** Surface  
**Pages Affected:** Home (stats section)  
**Component:** `src/components/sections/Stats/StatsDarkBand.tsx`  

**Problem:**  
Screen readers encounter "Maximum riders per group" with no preceding value — the "8" numeral does not appear in the accessibility tree. The stat pair is not linked semantically: value and label are sibling `<p>` tags without a grouping role.

**Root Cause:**  
The stat items render as two unrelated `<p>` elements inside a `<div>`. The value `<p>` may be missing a role or aria pairing. The accessibility tree shows the label without the value for the third stat.

**Fix:**  
Wrap each stat in a `role="group"` or `<dl>/<dt>/<dd>` pair:

```tsx
<dl key={i} className="text-center">
  <dt className="sr-only">{item.label}</dt>
  <dd className="font-[...] text-3xl sm:text-4xl font-bold" style={{ color: "var(--color-surface)" }}>
    {item.value}
  </dd>
  <p aria-hidden="true" className="mt-1 text-xs uppercase tracking-widest" ...>
    {item.label}
  </p>
</dl>
```

**Effort Estimate:** 30 minutes

---

### DR-006
**Title:** "Our story" link points to `#programs` — semantically incorrect anchor  
**Severity:** P2 High  
**Layer:** Surface  
**Pages Affected:** Home (about section)  
**Component:** About section config (site config CTA href)  

**Problem:**  
The "Our story" CTA in the about section links to `#programs`. Clicking it scrolls to the programs list, not any about/story content. This is disorienting — users expect "Our story" to deepen context about Ridgeline, not jump to pricing tiers.

**Root Cause:**  
Config generator wired the about CTA to `#programs` as a fallback when no dedicated story page exists.

**Fix:**  
Either remove the CTA entirely (the about copy is strong enough standalone), or change the href to `#about` (self-anchor for sharing) or `#testimonials` (social proof complements the story).

**Effort Estimate:** 5 minutes (config change)

---

### DR-007
**Title:** CTABanner uses `linear-gradient(primary → tertiary)` — renders poorly on dark-neutral themes  
**Severity:** P2 High  
**Layer:** Surface  
**Pages Affected:** Home (bottom CTA)  
**Component:** `src/components/sections/CTA/CTABanner.tsx:10`  

**Problem:**  
`background: linear-gradient(135deg, var(--color-primary), var(--color-tertiary))`. If Ridgeline uses a dark-neutral theme where both primary and tertiary are dark/desaturated, the gradient becomes a near-invisible dark blob. The white button text against this background also loses contrast.

**Root Cause:**  
The CTABanner gradient assumes primary and tertiary are visually distinct. This holds for bright/colorful themes but breaks on monochromatic or dark-on-dark themes.

**Fix:**  
Use the same pattern as `StatsDarkBand` — a solid `var(--color-neutral)` band is theme-safe and has proven contrast for this exact use case:

```tsx
style={{ background: "var(--color-neutral)" }}
```

And change the CTA button to use `var(--color-primary)` / `var(--color-on-primary)` instead of hardcoded `white/90`.

**Effort Estimate:** 20 minutes

---

### DR-008
**Title:** `StatsDarkBand` uses hardcoded `py-14 md:py-16` — violates section token contract  
**Severity:** P3 Medium  
**Layer:** Surface  
**Pages Affected:** Home (stats)  
**Component:** `src/components/sections/Stats/StatsDarkBand.tsx:8`  

**Problem:**  
`StatsDarkBand` uses `py-14 md:py-16` instead of `section-y`. The token contract (CLAUDE.md) requires all `<section>` elements to use `section-y` for consistent vertical rhythm. The stats band has less padding than adjacent sections.

**Root Cause:**  
Stats dark bands are typically more compact than content sections — but the intent should be expressed via a `section-y-compact` token or an inline override, not a hardcoded Tailwind class.

**Fix:**  
Either use `section-y` class, or define a `section-y-compact` utility in `globals.css` and apply it here.

**Effort Estimate:** 15 minutes

---

### DR-009
**Title:** Testimonials carousel has no keyboard arrow-key navigation  
**Severity:** P3 Medium  
**Layer:** Surface  
**Pages Affected:** Home (testimonials)  
**Component:** `src/components/sections/Testimonials/TestimonialsCarousel.tsx`  

**Problem:**  
The testimonials carousel has prev/next buttons with ARIA labels (good), but no `onKeyDown` handler on the carousel container for left/right arrow keys. Keyboard-only users must tab to the buttons rather than use natural carousel navigation.

**Root Cause:**  
Not implemented in the component.

**Fix:**  
Add a `onKeyDown` handler to the wrapping `<div>`:

```tsx
<div
  className="relative flex items-center justify-center"
  onKeyDown={(e) => { if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); }}
  tabIndex={0}
  role="region"
  aria-label="Testimonials"
>
```

**Effort Estimate:** 20 minutes

---

### DR-010
**Title:** CTA urgency copy is hardcoded and will become stale/misleading  
**Severity:** P3 Medium  
**Layer:** Surface  
**Pages Affected:** Home (bottom CTA)  
**Component:** Site config / `src/components/sections/CTA/CTACountdown.tsx`  

**Problem:**  
"The next departure leaves in 14 days." and "Groups fill in 72 hours." are static strings. After deployment, day 15 arrives and the copy is false. For a booking-driven premium service, deceptive urgency erodes trust.

**Root Cause:**  
Static config strings. No dynamic date calculation.

**Fix:**  
Either remove the urgency subtext ("Reserve your spot. Eight riders per expedition."), or switch to the `CTACountdown` variant which can take a real departure date. Alternatively make the subtext benefit-led: "Maximum 8 riders per departure."

**Effort Estimate:** 10 minutes (copy change)

---

### DR-011
**Title:** Hero scroll indicator renders at `z-10` — may be obscured by directional overlay  
**Severity:** P3 Medium  
**Layer:** Surface  
**Pages Affected:** Home (hero)  
**Component:** `src/components/sections/Hero/HeroEditorialBg.tsx:92`  

**Problem:**  
The scroll indicator (`Scroll` text + vertical line) is positioned `absolute` with no explicit `z-index`. The directional overlay div (`absolute inset-0`) sits above it in paint order. On some browsers the scroll indicator may render beneath the overlay and become faint or invisible.

**Root Cause:**  
Missing `z-index: var(--z-overlay)` on the scroll indicator container.

**Fix:**  
Add `style={{ zIndex: "var(--z-overlay)" }}` to the scroll indicator wrapper div at `HeroEditorialBg.tsx:92`.

**Effort Estimate:** 5 minutes

---

## What's Working Well

**Hero execution** — `HeroEditorialBg` is the strongest component. Bottom-left anchored text, staged Framer Motion reveals, `clamp()` responsive typography, directional overlay, gold accent rule, scroll indicator. Matches the cinematic-scroll / editorial-bg spec.

**Copy quality** — Zero slop words. "The road earns your attention.", "We don't organize tours. We design expeditions.", "From sign-up to summit." — all strong, specific, non-generic.

**Design token compliance** — High across the board. `section-y`, `page-container`, `var(--radius-lg)`, `var(--color-primary)`, `var(--font-display)`, `var(--duration-normal)` used correctly in every component reviewed.

**Pricing section** — Highlighted plan with ring + "Most Popular" pill, hover lift on non-featured plans, `Check` icons, feature list — textbook implementation.

**Testimonials** — ARIA labels on prev/next/dot buttons are correct. Quote marks, author attribution, dot navigation all present.

**Nav** — IntersectionObserver active-section highlight, CTA button, mobile hamburger toggle — all wired correctly.

---

## Priority Action Plan

| # | Fix | Effort | Impact |
|---|---|---|---|
| 1 | Add contact section to config (DR-001) | 1-2h | Fixes entire booking funnel |
| 2 | Add `id` to ProcessStepsHorizontal (DR-002) | 5min | Fixes hero secondary CTA |
| 3 | Replace `IndianRupee` with `DollarSign` (DR-003) | 10min | Fixes currency symbol |
| 4 | Add gallery empty state guard (DR-004) | 30min | Prevents silent render fail |
| 5 | Fix stat a11y grouping (DR-005) | 30min | Screen reader parity |
| 6 | Fix "Our story" anchor (DR-006) | 5min | UX coherence |
| 7 | Fix CTA gradient for dark themes (DR-007) | 20min | Theme safety |

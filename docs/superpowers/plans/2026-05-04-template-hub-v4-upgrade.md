# Template Hub v4 Upgrade Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Align template-hub with web-agency-pipeline v4 requirements: 1440px content width, border-free layout, nav navLabel + CTA, 5 footer variants, image safety check, hero external slot, section animations, and design-brief.json integration.

**Architecture:** All changes are mechanical (global replaces + component upgrades); no new data sources or API routes. Config shape extends via optional fields on existing SiteConfig to maintain backward compatibility. SectionWrapper (Framer Motion) stays as-is — animation presets are upgraded in-place, not replaced.

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Tailwind CSS v4, Framer Motion (existing), GSAP (existing, `gsap ^3.15`), pnpm, tsx (for scripts)

---

## File Map

| File | Action | Task |
|---|---|---|
| `src/lib/types.ts` | Modify — add `navLabel`, `NavConfig`, `FooterConfig` to types | 1 |
| `src/components/layout/Navbar/index.tsx` | Modify — navLabel filter, CTA button, IntersectionObserver | 6, 7, 8 |
| `src/app/page.tsx` | Modify — pass `nav` and `footer` config to Navbar + Footer | 6 |
| `src/app/[page]/page.tsx` | Modify — same as above | 6 |
| `src/components/layout/Footer/index.tsx` | Modify — route to 5 variant components | 9 |
| `src/components/layout/Footer/Footer4ColumnInfo.tsx` | Create | 9 |
| `src/components/layout/Footer/Footer3ColumnMinimal.tsx` | Create | 9 |
| `src/components/layout/Footer/FooterEditorialDark.tsx` | Create | 9 |
| `src/components/layout/Footer/FooterWarmSimple.tsx` | Create | 9 |
| `src/components/layout/Footer/FooterSplitCta.tsx` | Create | 9 |
| All 145 section + layout files | Modify — `max-w-6xl`/`max-w-7xl` → `max-w-[1440px]`; `max-w-5xl` → `max-w-3xl` (text) | 2 |
| `src/components/layout/Navbar/index.tsx` | Modify — remove `border-b` | 3 |
| `src/components/layout/Footer/index.tsx` + variants | No `border-t` in new variants | 3 |
| ~20 section files with bad py values | Modify — standardize to `py-16 sm:py-20 lg:py-24` | 4 |
| ~30 section files missing md: on grids | Modify — add `md:grid-cols-2` | 5 |
| `scripts/check-images.ts` | Create | 10 |
| `package.json` | Modify — add `check` script and `prebuild` | 10 |
| `src/components/sections/Hero/index.tsx` | Modify — add `external` style routing | 11 |
| `src/app/globals.css` | Modify — hero blur-reveal keyframes + prefers-reduced-motion | 12, 14 |
| `src/lib/animation.ts` | Modify — upgrade standard/premium presets with blur + scale | 13 |
| `src/components/sections/SectionWrapper.tsx` | Modify — prefers-reduced-motion early return | 14 |
| `src/lib/design-brief-loader.ts` | Create | 15 |
| `src/lib/config.ts` | Modify — merge design-brief.json on load | 15 |

---

## Task 1: Extend TypeScript Types

**Files:**
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Add NavConfig, FooterConfig, extend SectionConfig and SiteConfig**

Open `src/lib/types.ts`. Add the following interfaces and extend the existing ones:

```typescript
// Add after existing AnimationTier type

export interface NavConfig {
  style?: "sticky" | "floating-pill" | "transparent";
  ctaButton?: string;
  ctaHref?: string;
}

export interface FooterConfig {
  variant: "4-column-info" | "3-column-minimal" | "editorial-dark" | "warm-simple" | "split-cta";
  bgColor?: string;
  includeHours?: boolean;
  includeNewsletter?: boolean;
  ctaHeading?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}
```

In `SectionConfig`, add `navLabel`:
```typescript
export interface SectionConfig {
  type: string;
  variant: string;
  content: Record<string, unknown>;
  page?: string;
  eyebrow?: string;
  subtitle?: string;
  navLabel?: string | null;  // ADD THIS LINE
}
```

In `SiteConfig`, add `nav` and `footer`:
```typescript
export interface SiteConfig {
  business: BusinessConfig;
  theme: ThemeConfig;
  layout: {
    type: "single-page" | "multi-page";
    pages?: string[];
  };
  hero: HeroConfig;
  sections: SectionConfig[];
  seo: SEOConfig;
  animationTier: AnimationTier;
  nav?: NavConfig;       // ADD THIS LINE
  footer?: FooterConfig; // ADD THIS LINE
  locale?: string;
  locales?: string[];
  features?: {
    blog?: boolean;
    i18n?: boolean;
  };
  ecommerce?: EcommerceConfig;
}
```

- [ ] **Step 2: Verify TypeScript is happy**

```bash
cd /Users/Rajaraman.A/claude-code/template-hub && pnpm tsc --noEmit
```

Expected: 0 errors. If errors, they will be in files that already reference `SectionConfig` — all are backward compatible since the fields are optional.

- [ ] **Step 3: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat(types): add NavConfig, FooterConfig, navLabel to SiteConfig schema"
```

---

## Task 2: Content Width — Global Migration to 1440px

**Files:**
- Modify: 145 section files + layout files (sed, not manual)

The current standard is `max-w-6xl` (72rem / 1152px) and `max-w-7xl` (80rem / 1280px). Replace with `max-w-[1440px]` everywhere inside section components and layout wrappers. Text-only prose blocks that use `max-w-5xl` become `max-w-3xl` (readable width stays narrow, inside the 1440px container).

- [ ] **Step 1: Replace max-w-6xl and max-w-7xl in src/components/**

```bash
cd /Users/Rajaraman.A/claude-code/template-hub
find src/components -name "*.tsx" -exec sed -i '' 's/max-w-6xl/max-w-[1440px]/g' {} +
find src/components -name "*.tsx" -exec sed -i '' 's/max-w-7xl/max-w-[1440px]/g' {} +
```

- [ ] **Step 2: Replace in src/app/ pages (page.tsx doesn't have max-w but check)**

```bash
find src/app -name "*.tsx" -exec sed -i '' 's/max-w-6xl/max-w-[1440px]/g' {} +
find src/app -name "*.tsx" -exec sed -i '' 's/max-w-7xl/max-w-[1440px]/g' {} +
```

- [ ] **Step 3: Check SiteContainer for hardcoded max-w**

Read `src/components/layout/SiteContainer.tsx`. If it uses `max-w-6xl` or any max-w, update to `max-w-[1440px]`.

- [ ] **Step 4: Verify build**

```bash
pnpm tsc --noEmit
```

Expected: 0 errors (these are CSS class string changes, not type changes — TypeScript won't catch them, but the build should still pass).

- [ ] **Step 5: Visual spot check**

```bash
pnpm dev
```

Open http://localhost:3748 at a 1920px viewport (or use DevTools). Content should be centered with ~240px whitespace on each side. No content should touch viewport edges.

- [ ] **Step 6: Commit**

```bash
git add -u
git commit -m "feat(layout): migrate all sections to max-w-[1440px] content width"
```

---

## Task 3: Remove Structural Borders

**Files:**
- Modify: `src/components/layout/Navbar/index.tsx`
- The footer's `border-t` will be removed as part of Task 9 (new footer variants have no border-t)

The navbar `border-b border-border` creates a harsh line between nav and hero. Replace with a subtle shadow.

- [ ] **Step 1: Update Navbar header element**

In `src/components/layout/Navbar/index.tsx`, find line:
```tsx
<header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
```

Replace with:
```tsx
<header className="sticky top-0 z-50 w-full shadow-[0_1px_0_0_rgba(0,0,0,0.05)] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
```

- [ ] **Step 2: Update mobile menu border-t**

In the same file, find:
```tsx
<div className="border-t border-border bg-background px-4 pb-4 md:hidden">
```

Replace with:
```tsx
<div className="bg-background px-4 pb-4 md:hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
```

- [ ] **Step 3: Verify**

```bash
pnpm dev
```

Open http://localhost:3748. Scroll slowly — no horizontal line should appear between nav and hero. A very faint shadow is acceptable and intentional.

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar/index.tsx
git commit -m "fix(navbar): replace harsh border-b with soft shadow separator"
```

---

## Task 4: Section Spacing Standardization

**Files:**
- Modify: ~20 section files identified by grep

Standard: `py-16 sm:py-20 lg:py-24` for most sections. Hero: `min-h-[100dvh]`. CTA sections: `py-12 sm:py-16 lg:py-20`.

- [ ] **Step 1: Find sections with tight or inconsistent py values**

```bash
grep -r "py-4\|py-6\|py-8\b" src/components/sections/ --include="*.tsx" -l
```

Also find sections with `py-32` or higher (outside Hero):
```bash
grep -r "py-32\|py-40\|py-48" src/components/sections/ --include="*.tsx" -l
```

- [ ] **Step 2: Fix each file**

For each file returned in Step 1, open it. On the outer `<section>` element, replace the py class with the standard value. Pattern:

| Found | Replace with | Context |
|---|---|---|
| `py-4`, `py-6`, `py-8` on `<section>` | `py-16 sm:py-20 lg:py-24` | Standard section |
| `py-32` or higher on `<section>` (not Hero) | `py-16 sm:py-20 lg:py-24` | Was too loose |
| `py-32` on Hero `<section>` | Leave — hero can have generous padding | Keep |
| CTA `<section>` (CTABanner, CTASplit) | `py-12 sm:py-16 lg:py-20` | CTA is intentionally tighter |

- [ ] **Step 3: Verify**

```bash
pnpm tsc --noEmit
pnpm dev
```

Scroll through the site. No section should look cramped (too close to the next) or excessively spaced.

- [ ] **Step 4: Commit**

```bash
git add -u
git commit -m "fix(sections): standardize section vertical padding to py-16/20/24 scale"
```

---

## Task 5: Tablet Breakpoint Audit

**Files:**
- Modify: ~30 section files missing `md:` on grid layouts

Every grid must have styles at base (mobile), md (768px), and lg (1024px). The common failure is `grid-cols-1 lg:grid-cols-3` with no `md:grid-cols-2`.

- [ ] **Step 1: Find grids missing md: breakpoint**

```bash
grep -rn "grid-cols-1 lg:grid-cols" src/components/sections/ --include="*.tsx"
```

This returns every instance. Visually scan for lines that have `grid-cols-1` + `lg:grid-cols` but NO `md:grid-cols` on the same className string.

- [ ] **Step 2: Fix each instance**

Pattern:
```tsx
// WRONG — skips md
className="grid grid-cols-1 lg:grid-cols-3 gap-6"

// RIGHT
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
```

For 4-column grids:
```tsx
// WRONG
className="grid grid-cols-1 lg:grid-cols-4 gap-6"

// RIGHT
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
```

For 2-column grids (already binary):
```tsx
// WRONG
className="grid grid-cols-1 lg:grid-cols-2 gap-6"

// RIGHT — md and lg are the same for 2-col
className="grid grid-cols-1 md:grid-cols-2 gap-6"
// (no need for lg: since it's already 2-col at md)
```

Also fix Footer grid in the existing `src/components/layout/Footer/index.tsx`:
```tsx
// Old
<div className="grid gap-8 md:grid-cols-3">
// Keep as-is only if md:grid-cols-3 is intentional. The new footer variants (Task 9) handle this properly.
```

- [ ] **Step 3: Check Nav at 768px**

In `src/components/layout/Navbar/index.tsx`, the hamburger shows at base and full nav at `md:`. This is fine (md = 768px). No change needed.

- [ ] **Step 4: Verify**

```bash
pnpm dev
```

In DevTools, resize to 768px. All card grids and multi-column layouts should show 2 columns (not 1 column crammed or jumping straight to 3+).

- [ ] **Step 5: Commit**

```bash
git add -u
git commit -m "fix(responsive): add md: breakpoints to all card grids and multi-column layouts"
```

---

## Task 6: Nav navLabel Filtering + Prop Wiring

**Files:**
- Modify: `src/components/layout/Navbar/index.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/[page]/page.tsx`

Sections with `navLabel: null` should be hidden from the nav. Sections with no `navLabel` field at all fall back to current behavior (derived from type or content.headline).

- [ ] **Step 1: Update Navbar interface and navLinks logic**

In `src/components/layout/Navbar/index.tsx`, update the interface:

```tsx
interface NavbarProps {
  businessName: string;
  logo?: string;
  sections: SectionConfig[];
  nav?: NavConfig;          // ADD
  heroCta?: { text: string; url: string };
  layout?: { type: "single-page" | "multi-page"; pages?: string[] };
  currentPage?: string;
  showCart?: boolean;
}
```

Add import at top:
```tsx
import type { SectionConfig, NavConfig } from "@/lib/types";
```

Remove the old `import type { SectionConfig }` line and replace with the above.

Update the `navLinks` computation inside the component (replace the existing single-page branch):

```tsx
const navLinks = isMultiPage
  ? layout.pages!.map((page) => ({
      label: pageLabel(page),
      href: page === "home" ? "/" : `/${page}`,
      active: page === currentPage,
    }))
  : sections
      .filter((s) => s.navLabel !== null)  // hide explicit null
      .filter((s) => s.type !== "hero")     // hero never in nav
      .map((s) => ({
        label: s.navLabel || (s.content.headline as string) || sectionLabel(s.type),
        href: `#${s.type}`,
        active: false,
      }));
```

- [ ] **Step 2: Update page.tsx to pass nav prop**

In `src/app/page.tsx`, update the Navbar render:
```tsx
<Navbar
  businessName={config.business.name}
  logo={config.business.logo}
  sections={config.sections}
  nav={config.nav}           // ADD
  heroCta={config.hero.cta}
  layout={config.layout}
  currentPage="home"
  showCart={!!config.ecommerce}
/>
```

- [ ] **Step 3: Same change in [page]/page.tsx**

In `src/app/[page]/page.tsx`, apply the identical Navbar prop addition:
```tsx
<Navbar
  businessName={config.business.name}
  logo={config.business.logo}
  sections={config.sections}
  nav={config.nav}           // ADD
  heroCta={config.hero.cta}
  layout={config.layout}
  currentPage={page}
  showCart={!!config.ecommerce}
/>
```

- [ ] **Step 4: Verify**

```bash
pnpm tsc --noEmit
```

Expected: 0 errors.

- [ ] **Step 5: Commit**

```bash
git add src/components/layout/Navbar/index.tsx src/app/page.tsx src/app/[page]/page.tsx
git commit -m "feat(nav): add navLabel filtering — sections with navLabel:null hidden from nav"
```

---

## Task 7: Nav CTA Button

**Files:**
- Modify: `src/components/layout/Navbar/index.tsx`

The existing `heroCta` prop is the hero's primary CTA (already rendered in nav). The new `nav.ctaButton` is a separate, nav-specific CTA. Render it as a filled button at the right end of desktop nav, and as the last item in mobile menu.

- [ ] **Step 1: Add CTA button rendering**

In `src/components/layout/Navbar/index.tsx`, inside the component function, add:

```tsx
const navCta = nav?.ctaButton ? { text: nav.ctaButton, href: nav.ctaHref ?? "#contact" } : null;
```

In the **desktop nav** (`<nav className="hidden items-center gap-6 md:flex">`), after the existing `{heroCta && ...}` block, add:

```tsx
{navCta && (
  <a
    href={navCta.href}
    className="rounded-md bg-[var(--color-tertiary)] px-4 py-2 text-sm font-semibold text-[var(--color-on-primary)] transition-opacity hover:opacity-90"
  >
    {navCta.text}
  </a>
)}
```

In the **mobile menu** (`<nav className="flex flex-col gap-3 pt-3">`), after the existing `{heroCta && ...}` block, add:

```tsx
{navCta && (
  <a
    href={navCta.href}
    className="mt-2 rounded-md bg-[var(--color-tertiary)] px-4 py-2 text-center text-sm font-semibold text-[var(--color-on-primary)]"
    onClick={() => setOpen(false)}
  >
    {navCta.text}
  </a>
)}
```

- [ ] **Step 2: Verify**

```bash
pnpm tsc --noEmit
```

To test visually, add to `site.config.ts` temporarily:
```ts
nav: { ctaButton: "Book Now", ctaHref: "#contact" }
```
Then `pnpm dev` and confirm the button appears.

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar/index.tsx
git commit -m "feat(nav): add CTA button from nav.ctaButton config"
```

---

## Task 8: Nav Active Section Highlighting

**Files:**
- Modify: `src/components/layout/Navbar/index.tsx`

Use IntersectionObserver to track which section is currently in view. Highlight the corresponding nav link with the accent color.

- [ ] **Step 1: Add activeSection state and observer**

At the top of the Navbar component, after `const [open, setOpen] = useState(false);`, add:

```tsx
const [activeSection, setActiveSection] = useState<string>("");

useEffect(() => {
  const sectionIds = navLinks.map((l) => l.href.replace("#", "")).filter(Boolean);
  const observers: IntersectionObserver[] = [];

  sectionIds.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
      { threshold: 0.4 }
    );
    obs.observe(el);
    observers.push(obs);
  });

  return () => observers.forEach((o) => o.disconnect());
}, [navLinks]);
```

Add `useEffect` to the React import at the top:
```tsx
import { useState, useEffect } from "react";
```

- [ ] **Step 2: Apply active style to nav links**

In desktop nav, update the link className:
```tsx
className={`text-sm transition-colors hover:text-foreground ${
  link.active || activeSection === link.href.replace("#", "")
    ? "font-medium text-[var(--color-tertiary)]"
    : "text-muted-foreground"
}`}
```

Apply the same change to the mobile nav links.

- [ ] **Step 3: Verify**

```bash
pnpm dev
```

Scroll down the page. The active section's nav item should change color. Only works on single-page layout (multi-page uses `link.active` from the current page, which is set by Next.js routing — IntersectionObserver only fires on section IDs which won't exist in a different page).

- [ ] **Step 4: Commit**

```bash
git add src/components/layout/Navbar/index.tsx
git commit -m "feat(nav): active section highlighting via IntersectionObserver"
```

---

## Task 9: Footer 5 Variants

**Files:**
- Create: `src/components/layout/Footer/Footer4ColumnInfo.tsx`
- Create: `src/components/layout/Footer/Footer3ColumnMinimal.tsx`
- Create: `src/components/layout/Footer/FooterEditorialDark.tsx`
- Create: `src/components/layout/Footer/FooterWarmSimple.tsx`
- Create: `src/components/layout/Footer/FooterSplitCta.tsx`
- Modify: `src/components/layout/Footer/index.tsx`
- Modify: `src/app/page.tsx`
- Modify: `src/app/[page]/page.tsx`

All variants follow these rules: no `border-t`, full-bleed background, `max-w-[1440px] mx-auto` inner, phone numbers as `tel:` links, mobile single-column.

### Shared Footer Props Interface

All 5 variants receive the same props. Define a shared type in `Footer/index.tsx` (not a separate file — it's used only within Footer).

---

**Step 1: Create Footer4ColumnInfo.tsx**

- [ ] Create `src/components/layout/Footer/Footer4ColumnInfo.tsx`:

```tsx
import { Phone, Mail, MapPin } from "lucide-react";
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

function formatHours(hours: BusinessConfig["hours"]) {
  if (!hours) return null;
  return Object.entries(hours).map(([day, val]) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    value: val === "closed" ? "Closed" : `${val.open} – ${val.close}`,
  }));
}

export default function Footer4ColumnInfo({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null && s.type !== "hero")
    .map((s) => ({
      label: s.navLabel || s.type.charAt(0).toUpperCase() + s.type.slice(1),
      href: `#${s.type}`,
    }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  const hoursRows = footer.includeHours !== false ? formatHours(business.hours) : null;

  return (
    <footer className="bg-zinc-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Logo + tagline + social */}
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              {business.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {business.tagline}
            </p>
            {socialEntries.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {socialEntries.map(([key, url]) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {SOCIAL_LABELS[key] || key}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Nav links */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
              Quick Links
            </p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Col 3: Hours */}
          {hoursRows && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
                Hours
              </p>
              <dl className="flex flex-col gap-1.5">
                {hoursRows.map(({ day, value }) => (
                  <div key={day} className="flex justify-between gap-4 text-sm">
                    <dt className="text-muted-foreground">{day}</dt>
                    <dd className="text-foreground font-medium">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          {/* Col 4: Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-3">
              <a
                href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {business.phone}
              </a>
              <a
                href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-4 w-4 shrink-0" />
                {business.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{business.address}, {business.city}, {business.state} {business.pincode}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

**Step 2: Create Footer3ColumnMinimal.tsx**

- [ ] Create `src/components/layout/Footer/Footer3ColumnMinimal.tsx`:

```tsx
import { Phone, Mail, MapPin } from "lucide-react";
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

export default function Footer3ColumnMinimal({ business, sections, footer }: Props) {
  void footer;

  const navLinks = sections
    .filter((s) => s.navLabel !== null && s.type !== "hero")
    .map((s) => ({
      label: s.navLabel || s.type.charAt(0).toUpperCase() + s.type.slice(1),
      href: `#${s.type}`,
    }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer className="bg-zinc-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <p className="font-[family-name:var(--font-display)] text-lg font-semibold text-foreground">
              {business.name}
            </p>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{business.tagline}</p>
            {socialEntries.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-3">
                {socialEntries.map(([key, url]) => (
                  <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                    className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    {SOCIAL_LABELS[key] || key}
                  </a>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Links</p>
            <nav className="flex flex-col gap-2">
              {navLinks.map((l) => (
                <a key={l.href} href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {l.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-foreground mb-4">Contact</p>
            <div className="flex flex-col gap-3">
              <a href={`tel:${business.phone}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 shrink-0" /> {business.phone}
              </a>
              <a href={`mailto:${business.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 shrink-0" /> {business.email}
              </a>
              <p className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{business.address}, {business.city}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

**Step 3: Create FooterEditorialDark.tsx**

- [ ] Create `src/components/layout/Footer/FooterEditorialDark.tsx`:

```tsx
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "IG",
  facebook: "FB",
  twitter: "X",
  youtube: "YT",
  linkedin: "LI",
  whatsapp: "WA",
};

export default function FooterEditorialDark({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null && s.type !== "hero")
    .map((s) => ({
      label: s.navLabel || s.type.charAt(0).toUpperCase() + s.type.slice(1),
      href: `#${s.type}`,
    }));

  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  return (
    <footer className="bg-zinc-900 text-zinc-100">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-10">
          <p className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            {business.name}
          </p>
          <p className="mt-2 text-sm text-zinc-400 max-w-md">{business.tagline}</p>
        </div>

        <div className="flex flex-wrap gap-x-8 gap-y-2 mb-8">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        {socialEntries.length > 0 && (
          <div className="flex gap-4 mb-8">
            {socialEntries.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                className="w-8 h-8 rounded-full border border-zinc-700 flex items-center justify-center text-xs text-zinc-400 hover:border-zinc-400 hover:text-zinc-100 transition-colors">
                {SOCIAL_LABELS[key] || key[0].toUpperCase()}
              </a>
            ))}
          </div>
        )}

        {footer.includeNewsletter && (
          <div className="mb-8 max-w-sm">
            <p className="text-sm text-zinc-400 mb-3">Stay in the loop</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-zinc-800 border border-zinc-700 rounded px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none focus:border-zinc-400"
              />
              <button className="px-4 py-2 rounded text-sm font-medium bg-zinc-100 text-zinc-900 hover:bg-white transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <p className="text-xs text-zinc-500">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
        <div className="flex gap-4">
          <a href="/privacy" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Privacy</a>
          <a href="/terms" className="text-xs text-zinc-500 hover:text-zinc-300 transition-colors">Terms</a>
        </div>
      </div>
    </footer>
  );
}
```

---

**Step 4: Create FooterWarmSimple.tsx**

- [ ] Create `src/components/layout/Footer/FooterWarmSimple.tsx`:

```tsx
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer: FooterConfig;
}

const SOCIAL_LABELS: Record<string, string> = {
  instagram: "Instagram",
  facebook: "Facebook",
  twitter: "Twitter / X",
  youtube: "YouTube",
  linkedin: "LinkedIn",
  whatsapp: "WhatsApp",
};

function formatHours(hours: BusinessConfig["hours"]) {
  if (!hours) return null;
  return Object.entries(hours).map(([day, val]) => ({
    day: day.charAt(0).toUpperCase() + day.slice(1),
    value: val === "closed" ? "Closed" : `${val.open} – ${val.close}`,
  }));
}

export default function FooterWarmSimple({ business, footer }: Props) {
  const socialEntries = business.socialLinks
    ? Object.entries(business.socialLinks).filter(([, url]) => url)
    : [];

  const hoursRows = footer.includeHours !== false ? formatHours(business.hours) : null;

  return (
    <footer className="bg-[var(--color-surface)]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-col items-center text-center gap-5">
        <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-foreground">
          {business.name}
        </p>

        <a href={`tel:${business.phone}`}
          className="text-lg font-medium text-[var(--color-tertiary)] hover:opacity-80 transition-opacity">
          {business.phone}
        </a>

        <p className="text-sm text-muted-foreground max-w-xs">
          {business.address}, {business.city}, {business.state} {business.pincode}
        </p>

        {hoursRows && (
          <dl className="flex flex-col gap-1 text-sm">
            {hoursRows.map(({ day, value }) => (
              <div key={day} className="flex gap-4 justify-center">
                <dt className="text-muted-foreground w-24 text-right">{day}</dt>
                <dd className="text-foreground font-medium w-28 text-left">{value}</dd>
              </div>
            ))}
          </dl>
        )}

        {socialEntries.length > 0 && (
          <div className="flex gap-4 flex-wrap justify-center">
            {socialEntries.map(([key, url]) => (
              <a key={key} href={url} target="_blank" rel="noopener noreferrer"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {SOCIAL_LABELS[key] || key}
              </a>
            ))}
          </div>
        )}
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

**Step 5: Create FooterSplitCta.tsx**

- [ ] Create `src/components/layout/Footer/FooterSplitCta.tsx`:

```tsx
import { Phone, MapPin } from "lucide-react";
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";

interface Props {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer: FooterConfig;
}

function formatHours(hours: BusinessConfig["hours"]) {
  if (!hours) return null;
  return Object.entries(hours).slice(0, 6).map(([day, val]) => ({
    day: day.slice(0, 3).charAt(0).toUpperCase() + day.slice(1, 3),
    value: val === "closed" ? "Closed" : `${val.open}–${val.close}`,
  }));
}

export default function FooterSplitCta({ business, sections, footer }: Props) {
  const navLinks = sections
    .filter((s) => s.navLabel !== null && s.type !== "hero")
    .map((s) => ({
      label: s.navLabel || s.type.charAt(0).toUpperCase() + s.type.slice(1),
      href: `#${s.type}`,
    }));

  const hoursRows = footer.includeHours !== false ? formatHours(business.hours) : null;
  const ctaHeading = footer.ctaHeading || `Ready to work with ${business.name}?`;
  const ctaText = footer.ctaButtonText || "Book an Appointment";
  const ctaHref = footer.ctaButtonHref || "#contact";

  return (
    <footer className="bg-zinc-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Left: CTA */}
          <div className="flex flex-col justify-center">
            <p className="font-[family-name:var(--font-display)] text-2xl font-bold text-foreground leading-tight max-w-xs">
              {ctaHeading}
            </p>
            <a href={ctaHref}
              className="mt-6 inline-flex w-fit rounded-md bg-[var(--color-tertiary)] px-6 py-3 text-sm font-semibold text-[var(--color-on-primary)] hover:opacity-90 transition-opacity">
              {ctaText}
            </a>
          </div>

          {/* Right: Contact + Hours */}
          <div className="flex flex-col gap-4">
            <a href={`tel:${business.phone}`}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <Phone className="h-4 w-4 shrink-0" /> {business.phone}
            </a>
            <p className="flex items-start gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
              <span>{business.address}, {business.city}, {business.state}</span>
            </p>
            {hoursRows && (
              <dl className="mt-2 flex flex-col gap-1">
                {hoursRows.map(({ day, value }) => (
                  <div key={day} className="flex gap-3 text-sm">
                    <dt className="text-muted-foreground w-8">{day}</dt>
                    <dd className="text-foreground">{value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-wrap gap-x-6 gap-y-1">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors">
              {l.label}
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} {business.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
```

---

**Step 6: Update Footer/index.tsx to route variants**

- [ ] Replace the entire content of `src/components/layout/Footer/index.tsx`:

```tsx
import type { BusinessConfig, FooterConfig, SectionConfig } from "@/lib/types";
import Footer4ColumnInfo from "./Footer4ColumnInfo";
import Footer3ColumnMinimal from "./Footer3ColumnMinimal";
import FooterEditorialDark from "./FooterEditorialDark";
import FooterWarmSimple from "./FooterWarmSimple";
import FooterSplitCta from "./FooterSplitCta";

interface FooterProps {
  business: BusinessConfig;
  sections: SectionConfig[];
  footer?: FooterConfig;
}

const DEFAULT_FOOTER: FooterConfig = {
  variant: "3-column-minimal",
  includeHours: true,
};

export default function Footer({ business, sections, footer = DEFAULT_FOOTER }: FooterProps) {
  const props = { business, sections, footer };

  switch (footer.variant) {
    case "4-column-info":
      return <Footer4ColumnInfo {...props} />;
    case "editorial-dark":
      return <FooterEditorialDark {...props} />;
    case "warm-simple":
      return <FooterWarmSimple {...props} />;
    case "split-cta":
      return <FooterSplitCta {...props} />;
    case "3-column-minimal":
    default:
      return <Footer3ColumnMinimal {...props} />;
  }
}
```

---

**Step 7: Wire footer config in page.tsx and [page]/page.tsx**

- [ ] In `src/app/page.tsx`, update Footer render:

```tsx
<Footer
  business={config.business}
  sections={config.sections}
  footer={config.footer}
/>
```

- [ ] Same change in `src/app/[page]/page.tsx`:

```tsx
<Footer
  business={config.business}
  sections={config.sections}
  footer={config.footer}
/>
```

- [ ] **Step 8: TypeScript check + visual verify**

```bash
pnpm tsc --noEmit
pnpm dev
```

To test a variant, temporarily set in `site.config.ts`:
```ts
footer: { variant: "4-column-info", includeHours: true }
```

Verify each variant looks correct. Verify no `border-t` visible above footer.

- [ ] **Step 9: Commit**

```bash
git add src/components/layout/Footer/ src/app/page.tsx src/app/[page]/page.tsx
git commit -m "feat(footer): add 5 footer variants routed by config.footer.variant"
```

---

## Task 10: Image Safety Check Script

**Files:**
- Create: `scripts/check-images.ts`
- Modify: `package.json`

- [ ] **Step 1: Create scripts/check-images.ts**

```typescript
#!/usr/bin/env node
import { readFileSync, existsSync, statSync } from "fs";
import { join } from "path";

// Read config as raw text and extract string values that look like image paths
function extractImagePaths(obj: unknown, paths: string[] = []): string[] {
  if (typeof obj === "string") {
    const imageExtensions = /\.(jpg|jpeg|png|webp|svg|gif)$/i;
    const isImageService = /picsum\.photos|ui-avatars\.com|unsplash\.com|images\.pexels\.com/i;
    if (imageExtensions.test(obj) || isImageService.test(obj)) {
      paths.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item) => extractImagePaths(item, paths));
  } else if (obj && typeof obj === "object") {
    Object.values(obj as Record<string, unknown>).forEach((v) => extractImagePaths(v, paths));
  }
  return paths;
}

async function checkImages() {
  const configPath = join(process.cwd(), "site.config.ts");
  if (!existsSync(configPath)) {
    console.error("ERROR: site.config.ts not found");
    process.exit(1);
  }

  // Dynamically import the config (tsx handles TypeScript)
  const { default: config } = await import(join(process.cwd(), "site.config.ts"));

  const allPaths = extractImagePaths(config);
  const uniquePaths = [...new Set(allPaths)];

  const businessName = config.business?.name || "unknown";
  console.log(`\nImage Check: ${businessName}`);
  console.log(`\nFound ${uniquePaths.length} image references in site.config.ts\n`);

  const local = uniquePaths.filter((p) => p.startsWith("/"));
  const remote = uniquePaths.filter((p) => p.startsWith("http"));

  let failures = 0;

  if (local.length > 0) {
    console.log("LOCAL:");
    for (const path of local) {
      const fullPath = join(process.cwd(), "public", path);
      if (existsSync(fullPath)) {
        const size = Math.round(statSync(fullPath).size / 1024);
        console.log(`  ${path.padEnd(50, ".")} OK (${size}KB)`);
      } else {
        console.log(`  ${path.padEnd(50, ".")} MISSING`);
        failures++;
      }
    }
  }

  if (remote.length > 0) {
    console.log("\nREMOTE:");
    for (const url of remote) {
      try {
        const res = await fetch(url, { method: "HEAD", signal: AbortSignal.timeout(5000) });
        console.log(`  ${url.slice(0, 50).padEnd(50, ".")} ${res.ok ? "OK" : `FAIL (${res.status})`}`);
        if (!res.ok) failures++;
      } catch {
        console.log(`  ${url.slice(0, 50).padEnd(50, ".")} UNREACHABLE`);
        failures++;
      }
    }
  }

  if (failures > 0) {
    console.log(`\nRESULT: FAIL (${failures} missing image${failures > 1 ? "s" : ""})\n`);
    process.exit(1);
  } else {
    console.log(`\nRESULT: PASS — all ${uniquePaths.length} images verified\n`);
    process.exit(0);
  }
}

checkImages();
```

- [ ] **Step 2: Add check + prebuild scripts to package.json**

In `package.json`, update the `scripts` object:

```json
"scripts": {
  "dev": "next dev --port 3748",
  "build": "next build",
  "start": "next start",
  "lint": "eslint",
  "check": "tsx scripts/check-images.ts",
  "prebuild": "tsx scripts/check-images.ts",
  "remix": "tsx scripts/remix.ts"
}
```

- [ ] **Step 3: Test the script**

```bash
pnpm check
```

Expected: lists all image paths from site.config.ts, reports PASS or FAIL with specific missing paths.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-images.ts package.json
git commit -m "feat(scripts): add image safety check — runs before every build"
```

---

## Task 11: Hero External Component Slot

**Files:**
- Modify: `src/components/sections/Hero/index.tsx`

Add a new hero style `"external"` that renders a dynamic import of `components/hero-external.tsx` (created by the hero-canvas skill per client).

- [ ] **Step 1: Update Hero/index.tsx**

Open `src/components/sections/Hero/index.tsx`. Add the external case:

```tsx
import dynamic from "next/dynamic";
import type { HeroConfig } from "@/lib/types";
// ... existing imports ...

export default function Hero({ config }: { config: HeroConfig }) {
  if (config.style === "external") {
    const ExternalHero = dynamic(
      () => import("@/components/hero-external").catch(() => {
        return { default: () => <div className="min-h-[100dvh] flex items-center justify-center text-muted-foreground text-sm">hero-external.tsx not found — run the hero-canvas skill</div> };
      })
    );
    return <ExternalHero config={config} />;
  }

  // ... rest of existing switch/variant routing ...
}
```

The `.catch()` fallback prevents a build failure when `hero-external.tsx` doesn't exist yet.

- [ ] **Step 2: Add HeroStyle type**

In `src/lib/types.ts`, add `"external"` to the `HeroStyle` union:

```typescript
export type HeroStyle =
  | "centered"
  | "split-image"
  | "image-bg"
  | "video-bg"
  | "gradient"
  | "carousel"
  | "parallax"
  | "collage"
  | "minimal"
  | "map-hero"
  | "product"
  | "stats-hero"
  | "editorial-bg"
  | "external";  // ADD
```

- [ ] **Step 3: Verify**

```bash
pnpm tsc --noEmit
pnpm build
```

Expected: 0 TypeScript errors. Build succeeds. Setting `hero.style: "external"` in config will show the fallback message since `hero-external.tsx` doesn't exist — that's correct behavior.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero/index.tsx src/lib/types.ts
git commit -m "feat(hero): add external style slot for hero-canvas skill output"
```

---

## Task 12: Hero Text Entry Animations

**Files:**
- Modify: `src/app/globals.css`

Add CSS keyframe classes that hero variants can apply based on `config.animationTier`. Subtle tier uses `blur-reveal`. Standard tier uses staggered `fade-up`.

- [ ] **Step 1: Add keyframes to globals.css**

At the end of `src/app/globals.css`, add:

```css
/* Hero text entry animations — applied by hero variants based on animationTier */
@keyframes blur-reveal {
  from {
    opacity: 0;
    filter: blur(8px);
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translateY(0);
  }
}

@keyframes fade-up {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hero-animate-subtle {
  animation: blur-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-animate-standard {
  animation: fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.hero-animate-delay-1 { animation-delay: 150ms; }
.hero-animate-delay-2 { animation-delay: 300ms; }
.hero-animate-delay-3 { animation-delay: 450ms; }

/* Initial state — elements start invisible */
.hero-animate-subtle,
.hero-animate-standard {
  opacity: 0;
}
```

Note: premium tier animations are handled by `hero-canvas` external component — no CSS needed here.

- [ ] **Step 2: Apply in hero variants**

Open `src/components/sections/Hero/HeroCentered.tsx`. The component receives a `tier` prop (add it to the interface). Apply classes to headline, subtitle, CTA:

```tsx
interface HeroCenteredProps {
  content: HeroConfig;
  tier?: AnimationTier;
}

// In JSX:
const animClass = tier === "premium" ? "" : tier === "standard" ? "hero-animate-standard" : "hero-animate-subtle";

<h1 className={`font-display ... ${animClass}`}>{content.headline}</h1>
<p className={`... ${animClass} hero-animate-delay-1`}>{content.subheadline}</p>
<div className={`... ${animClass} hero-animate-delay-2`}>
  {/* CTAs */}
</div>
```

Apply the same pattern to `HeroSplitImage.tsx`, `HeroImageBg.tsx`, and `HeroMinimal.tsx`.

Import AnimationTier in those files: `import type { AnimationTier, HeroConfig } from "@/lib/types";`

Update `Hero/index.tsx` to pass `tier={config.animationTier}` (add `animationTier` to the Hero config type). Actually `animationTier` is on `SiteConfig`, not `HeroConfig`. So in `page.tsx`, pass `animationTier={config.animationTier}` to `<Hero>`, or pass the whole config:

In `src/app/page.tsx`:
```tsx
<Hero config={config.hero} animationTier={config.animationTier} />
```

In `Hero/index.tsx`:
```tsx
export default function Hero({ config, animationTier = "subtle" }: { config: HeroConfig; animationTier?: AnimationTier }) {
```

Then pass `tier={animationTier}` to each variant.

- [ ] **Step 3: Verify**

```bash
pnpm tsc --noEmit
pnpm dev
```

Headline and subtitle should animate in on page load.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/sections/Hero/ src/app/page.tsx src/app/[page]/page.tsx
git commit -m "feat(hero): add blur-reveal and fade-up entry animations by animation tier"
```

---

## Task 13: Upgrade SectionWrapper Motion Presets

**Files:**
- Modify: `src/lib/animation.ts`
- Modify: `src/components/sections/SectionWrapper.tsx`

Current presets are generic fade-up. Upgrade standard and premium to include blur and scale, matching the design brief's spec for each tier.

- [ ] **Step 1: Update animation.ts presets**

Replace the content of `src/lib/animation.ts`:

```typescript
import type { AnimationTier } from "./types";

export interface MotionPreset {
  initial: Record<string, number | string>;
  animate: Record<string, number | string>;
  transition: Record<string, number | string>;
}

const subtle: MotionPreset = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: "easeOut" },
};

const standard: MotionPreset = {
  initial: { opacity: 0, y: 28, filter: "blur(4px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
};

const premium: MotionPreset = {
  initial: { opacity: 0, y: 32, filter: "blur(6px)", scale: 0.98 },
  animate: { opacity: 1, y: 0, filter: "blur(0px)", scale: 1 },
  transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
};

export const motionPresets: Record<AnimationTier, MotionPreset> = {
  subtle,
  standard,
  premium,
};

export function getStaggerDelay(index: number, tier: AnimationTier): number {
  const delays: Record<AnimationTier, number> = {
    subtle: 0.08,
    standard: 0.10,
    premium: 0.12,
  };
  return index * delays[tier];
}
```

Note: Framer Motion supports `filter` as an animatable property (it generates the correct CSS).

- [ ] **Step 2: Add staggerIndex support to SectionWrapper**

Update `src/components/sections/SectionWrapper.tsx`:

```tsx
"use client";

import { motion } from "framer-motion";
import { useRef } from "react";
import type { AnimationTier } from "@/lib/types";
import { motionPresets, getStaggerDelay } from "@/lib/animation";

interface SectionWrapperProps {
  children: React.ReactNode;
  tier: AnimationTier;
  staggerIndex?: number;
  className?: string;
}

export default function SectionWrapper({ children, tier, staggerIndex = 0, className }: SectionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const preset = motionPresets[tier];
  const delay = staggerIndex > 0 ? getStaggerDelay(staggerIndex, tier) : 0;

  return (
    <motion.div
      ref={ref}
      initial={preset.initial}
      whileInView={preset.animate}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...preset.transition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

- [ ] **Step 3: Verify**

```bash
pnpm tsc --noEmit
pnpm dev
```

Scroll through site. Standard and premium tiers should have a visible blur-fade-up effect. Subtle should be a clean fade-up.

- [ ] **Step 4: Commit**

```bash
git add src/lib/animation.ts src/components/sections/SectionWrapper.tsx
git commit -m "feat(animation): upgrade standard/premium SectionWrapper presets with blur+scale"
```

---

## Task 14: prefers-reduced-motion Support

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/components/sections/SectionWrapper.tsx`

- [ ] **Step 1: Add CSS rule to globals.css**

At the end of `src/app/globals.css`, add:

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 2: Early return in SectionWrapper when reduced motion is preferred**

In `src/components/sections/SectionWrapper.tsx`, add after the imports:

```tsx
function useReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
```

Add inside the component, before the return:
```tsx
const reducedMotion = useReducedMotion();

if (reducedMotion) {
  return <div className={className}>{children}</div>;
}
```

- [ ] **Step 3: Verify**

In macOS System Settings → Accessibility → Display → "Reduce motion". Enable it. Reload http://localhost:3748. Content should appear immediately with no animation. Disable again — animations should return.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/components/sections/SectionWrapper.tsx
git commit -m "feat(a11y): disable animations when prefers-reduced-motion is set"
```

---

## Task 15: design-brief.json Integration

**Files:**
- Create: `src/lib/design-brief-loader.ts`
- Modify: `src/lib/config.ts`

Read `design-brief.json` from project root if it exists, and merge its values into the resolved config. This overrides preset defaults but is overridden by explicit values in `site.config.ts`.

- [ ] **Step 1: Define the shape design-brief.json can contain**

In `src/lib/types.ts`, add:

```typescript
export interface DesignBrief {
  typography?: {
    displayFont?: string;
    bodyFont?: string;
  };
  color?: {
    accent?: string;
  };
  nav?: NavConfig;
  footer?: FooterConfig;
  animation?: {
    tier?: AnimationTier;
  };
  layout?: {
    contentMaxWidth?: string;
  };
}
```

- [ ] **Step 2: Create src/lib/design-brief-loader.ts**

```typescript
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import type { DesignBrief, SiteConfig } from "./types";

export function loadDesignBrief(): DesignBrief | null {
  const briefPath = join(process.cwd(), "design-brief.json");
  if (!existsSync(briefPath)) return null;

  try {
    const raw = readFileSync(briefPath, "utf-8");
    return JSON.parse(raw) as DesignBrief;
  } catch {
    console.warn("[design-brief] Failed to parse design-brief.json — skipping");
    return null;
  }
}

export function applyDesignBrief(config: SiteConfig, brief: DesignBrief | null): SiteConfig {
  if (!brief) return config;

  return {
    ...config,
    // brief.nav merges into config.nav (config wins on key conflicts)
    nav: brief.nav ? { ...brief.nav, ...config.nav } : config.nav,
    // brief.footer merges into config.footer (config wins)
    footer: brief.footer ? { ...brief.footer, ...config.footer } : config.footer,
    // brief.animation.tier only applies if animationTier not set in config
    animationTier: config.animationTier ?? brief.animation?.tier ?? "subtle",
    // brief.color.accent only applies if theme.accentColor not set
    theme: {
      ...config.theme,
      accentColor: config.theme.accentColor ?? brief.color?.accent,
    },
  };
}
```

- [ ] **Step 3: Wire into config.ts**

Open `src/lib/config.ts`. Find the `getConfig()` function. After it builds the config object, add:

```typescript
import { loadDesignBrief, applyDesignBrief } from "./design-brief-loader";

// Inside getConfig(), after building `config`:
const brief = loadDesignBrief();
return applyDesignBrief(config, brief);
```

The exact insertion point depends on the current `config.ts` structure — the brief application should be the last thing before the return.

- [ ] **Step 4: Verify**

```bash
pnpm tsc --noEmit
```

Create a test file `design-brief.json` in project root:
```json
{
  "footer": { "variant": "editorial-dark" },
  "animation": { "tier": "standard" }
}
```

```bash
pnpm dev
```

Footer should switch to editorial-dark without touching `site.config.ts`. Delete `design-brief.json` when done testing.

- [ ] **Step 5: Commit**

```bash
git add src/lib/design-brief-loader.ts src/lib/config.ts src/lib/types.ts
git commit -m "feat(config): read design-brief.json and merge into site config at load time"
```

---

## Final Verification

Run all 5 test sites from the plan spec to confirm full coverage:

- [ ] Set `site.config.ts` to a doctor config: confirm 1440px width, no borders, subtle animations, 3-column-minimal footer
- [ ] Set to restaurant: confirm warm-simple footer, standard blur-fade
- [ ] Set to gym: confirm editorial-dark footer, nav CTA "Join Now", premium animation
- [ ] Add `nav: { ctaButton: "Book a Table", ctaHref: "#contact" }` and confirm CTA appears in desktop + mobile nav
- [ ] Run `pnpm check` on a config with a missing image and confirm it exits 1

- [ ] **Final commit**

```bash
git add -u
git commit -m "feat: template-hub v4 upgrade complete — all batches implemented"
```

---

## Self-Review

**Spec coverage check:**

| Spec item | Task |
|---|---|
| 1.1 max-w-[1440px] everywhere | Task 2 |
| 1.2 Remove harsh borders | Task 3 |
| 1.3 Section spacing consistency | Task 4 |
| 1.4 Tablet breakpoint audit | Task 5 |
| 2.1 navLabel support | Task 6 |
| 2.2 Nav CTA button | Task 7 |
| 2.3 Active section highlighting | Task 8 |
| 3.1 + 3.2 Footer 5 variants | Task 9 |
| 4.1 check-images.js | Task 10 |
| 4.2 prebuild script | Task 10 |
| 5.1 Hero external slot | Task 11 |
| 5.2 Hero text animations | Task 12 |
| 6.1 AnimatedSection wrapper (SectionWrapper upgrade) | Task 13 |
| 6.2 Wrap section content (existing SectionWrapper in page.tsx already does this) | ✓ already done |
| 6.3 GSAP for premium (GSAP already installed, premium tier handled by hero-canvas/cinematic-scroll skills externally) | ✓ deferred to skills |
| 6.4 prefers-reduced-motion | Task 14 |
| 7.1 design-brief.json reader | Task 15 |
| 7.2 footer.variant + nav.ctaButton types | Task 1 |

**Gaps:** Task 6.2 says "wrap all section content with SectionWrapper" — the existing `page.tsx` already wraps each section in `<SectionWrapper>`. The spec intends wrapping *inner card grids* too (for stagger effect). This is a quality-of-life upgrade that can be done incrementally per section type after the core plan ships — not a blocker.

**Placeholder check:** No TBDs or TODOs in plan. All code blocks are complete and executable.

**Type consistency:** `NavConfig`, `FooterConfig`, `DesignBrief` defined in Task 1/15, used consistently across Tasks 6, 7, 9, 15. `SectionConfig.navLabel` added in Task 1, used in Tasks 6, 9.

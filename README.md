# Template Hub

Config-driven Next.js site generation engine for local business websites. One reusable template renders any business type from a single `site.config.ts` file.

## Quick Start

```bash
pnpm install
pnpm dev          # http://localhost:3748
pnpm build        # Static export to ./out
```

## How It Works

1. Edit `site.config.ts` with your business details, sections, and SEO
2. Drop a `design.md` theme file (from designdotmd) at project root
3. Run `pnpm build` — static HTML output ready to deploy

## Config Structure

```ts
// site.config.ts
export default {
  business: { type, name, phone, email, address, ... },
  theme: { designMd: "theme-id", mode: "light" | "dark" },
  layout: { type: "single-page" },
  hero: { style, headline, subheadline, cta, image },
  sections: [
    { type: "services", variant: "icon-grid", content: { ... } },
    { type: "about", variant: "split-content", content: { ... } },
    // ...
  ],
  seo: { title, description, keywords },
  animationTier: "subtle" | "standard" | "premium",
}
```

## Presets

Start from a preset instead of blank config:

```ts
import { getPreset, AVAILABLE_PRESETS } from "./presets";

const base = getPreset("doctor");  // doctor, restaurant, salon, local
```

## Section Types

| Section | Variants |
|---------|----------|
| Hero | centered, split-image, image-bg, video-bg, gradient, minimal |
| Services | icon-grid, icon-list |
| About | split-content, story |
| Testimonials | carousel, simple-grid |
| Gallery | masonry, grid-3 |
| FAQ | accordion, two-column |
| Contact | split-map, simple |
| CTA | banner, centered |
| Stats | counters, grid |
| Pricing | cards-3 |
| Hours | card, table |
| Location | map-embed |
| Team | grid |
| Trust | logos |
| Announcement | banner |

## Themes

Themes come from designdotmd (156 presets). Place the downloaded `design.md` at project root. The build system parses it and generates CSS variables automatically.

```bash
npx designdotmd add clinic-sage
```

## Animation Tiers

- **subtle** — Framer Motion fade-up, stagger (doctor, lawyer, hospital)
- **standard** — + GSAP ScrollTrigger parallax (salon, restaurant, hotel)
- **premium** — + hero-canvas particles/3D (gym, events, photographer)

## Deploy

```bash
vercel --prod
```

Static export (`output: "export"`) means no server required. Works on any static host.

## Stack

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 with @theme tokens from design.md
- Framer Motion + GSAP ScrollTrigger
- Lucide React icons
- pnpm

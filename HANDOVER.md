# Lahari Collections — Handover

## What it is
A boutique fashion landing page for Lahari Collections, with the tagline "Where heritage meets haute couture." The first commit is titled "Lahari Collections — boutique fashion landing page." It was built on the template-hub engine. Client: Lahari Collections.

## Stack
- Next.js App Router, static export, TypeScript
- Tailwind CSS v4 with tokens from design.md, shadcn/ui, @base-ui/react, lucide-react
- Animation: Framer Motion and GSAP (@gsap/react)
- Content and validation: MDX (@next/mdx, gray-matter), zod
- designdotmd for theme presets
- A .hallmark/ folder is in the repo (appears to be Hallmark design-audit output; not reviewed)

## How to run
```
pnpm install        # lockfile: pnpm-lock.yaml
pnpm dev            # http://localhost:3748
pnpm build          # static export to ./out (prebuild runs check-images and check-config)
pnpm test           # node test runner: validators
pnpm scenarios:smoke
```

## Environment variables
None found. There are no .env files.

## Deploy
Vercel project `lahari-collections` (ID prj_61aMYA8yEjKQLl9QgFmyUIGlfDVa, from .vercel/project.json). No vercel.json.

## Where it was left
- Archived: 2026-10-30, repo rx4u/lahari-collections
- Branch: main
- Last commit: 15e8978 (2026-05-19) Lahari Collections — boutique fashion landing page
- Uncommitted changes at archive time: 11 entries. design-brief.json is deleted. Modified: site.config.ts, four images in public/images (collection-bridal, collection-heritage, collection-modern, hero-bg), src/components/layout/Footer/FooterEditorialDark.tsx and Navbar/index.tsx. Untracked: .hallmark/. These were committed as a snapshot commit when archived.
- Git remote: https://github.com/rx4u/lahari-collections.git (matches the TSV target)

## Notes / next steps
- The reason for deleting design-brief.json is not recorded. Check it before the snapshot is committed.
- No other unfinished-work notes were found.
- CLAUDE.md is the template-hub engine file, not a Lahari-specific one.

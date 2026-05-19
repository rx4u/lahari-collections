import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Gallery section.
 *
 * Keys observed in variants (2026-05):
 *   - GalleryGrid, GalleryMasonry, GalleryFullwidthCarousel:
 *       headline, description, images
 *   - GalleryBeforeAfter: headline, description, pairs (pairs required)
 *   - GalleryLocationGrid: eyebrow, headline, items, cta
 *
 * Each image item: src, alt, caption.
 * Each pair item: title, before, after.
 * Each location item: city, image, imagePosition, label, url.
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const image = z
  .object({
    src: z.string().optional(),
    alt: z.string().optional(),
    caption: z.string().optional(),
  })
  .strict();

const pair = z
  .object({
    title: z.string().optional(),
    before: z.string().optional(),
    after: z.string().optional(),
  })
  .strict();

const locationItem = z
  .object({
    city: z.string().optional(),
    image: z.string().optional(),
    imagePosition: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
  })
  .strict();

// Base targets the dominant variants (grid, masonry, fullwidth-carousel,
// grid-3) — they all need a populated images[]. Variants that consume a
// different array (before-after → pairs; location-grid → items) replace
// the schema rather than extending it, so the base images requirement
// doesn't leak into the wrong variant.
const base = z
  .object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    images: z.array(image).min(1),
    cta: cta.optional(),
  })
  .strict();

const beforeAfter = z
  .object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    pairs: z.array(pair).min(1),
    cta: cta.optional(),
  })
  .strict();

const locationGrid = z
  .object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    items: z.array(locationItem).min(1),
    cta: cta.optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "before-after": beforeAfter,
    "location-grid": locationGrid,
  },
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Testimonials section.
 *
 * Variant ↔ shape map (2026-05):
 *   - carousel:           items[] required (item: text, name, role?, image?, rating?)
 *   - simple-grid / grid: items[] required (same item shape as carousel)
 *   - editorial-carousel: items[] required (item: quote, name, title), autoAdvance?
 *   - featured-quote:     featured{quote,name,role?,rating?} required;
 *                         items[] OPTIONAL (mini-quote grid below the hero)
 *   - video-testimonial:  items[] required (item: videoThumbnail, name, role?, quote)
 *
 * Gap #7 nuance: `featured-quote` and `video-testimonial` are hero-first
 * variants. `featured` is the load-bearing structure; supporting `items`
 * may or may not be authored. Schema reflects that — never force authors
 * to invent a second tier when one quote is the whole point.
 */

// Item shapes per variant. Kept narrow on purpose: each variant override
// references exactly the item shape its component reads.

const carouselItem = z
  .object({
    text: z.string().optional(),
    name: z.string().optional(),
    role: z.string().optional(),
    image: z.string().optional(),
    rating: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const editorialItem = z
  .object({
    quote: z.string().optional(),
    name: z.string().optional(),
    title: z.string().optional(),
  })
  .strict();

const featuredMiniItem = z
  .object({
    quote: z.string().optional(),
    name: z.string().optional(),
    role: z.string().optional(),
    rating: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const videoItem = z
  .object({
    videoThumbnail: z.string().optional(),
    name: z.string().optional(),
    role: z.string().optional(),
    quote: z.string().optional(),
  })
  .strict();

const featuredQuoteShape = z
  .object({
    quote: z.string(),
    name: z.string().optional(),
    role: z.string().optional(),
    rating: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

// Base: only the header/intro keys every variant accepts. Item arrays
// live in variant overrides so each variant declares its own shape.
const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(carouselItem).min(1),
  })
  .strict();

const carousel = base
  .extend({
    items: z.array(carouselItem).min(1),
  })
  .strict();

const grid = carousel; // simple-grid + grid share the carousel item shape

const editorialCarousel = base
  .extend({
    items: z.array(editorialItem).min(1),
    autoAdvance: z.number().optional(),
  })
  .strict();

const featuredQuote = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    featured: featuredQuoteShape,
    items: z.array(featuredMiniItem).optional(),
  })
  .strict();

const videoTestimonial = base
  .extend({
    items: z.array(videoItem).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    carousel,
    grid,
    "simple-grid": grid,
    "editorial-carousel": editorialCarousel,
    "featured-quote": featuredQuote,
    "video-testimonial": videoTestimonial,
  },
};

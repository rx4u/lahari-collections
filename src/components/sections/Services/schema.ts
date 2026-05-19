import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Services section.
 *
 * Variant ↔ shape map (2026-05):
 *   - card-carousel:     items[] required (item: title, description, icon?, price?, duration?)
 *   - detailed-accordion: items[] required (item: title, description, icon?, price?, duration?, cta?)
 *   - featured-grid:     items[] required (item: title, description, icon?, price?, duration?, image?)
 *   - grid-4:            items[] required (item: title, description, icon?), eyebrow?, subtitle?
 *   - icon-grid:         items[] required (item: title, description, icon)
 *   - icon-list:         items[] required (item: title, description, icon)
 *   - tabbed:            categories[] required (cat: name, items[] with service-item shape)
 *
 * Six of seven variants use `items`; `tabbed` is the structural outlier
 * with `categories[]`. Items required on base so a Services section with
 * no variant (defaults to icon-grid in the renderer) still fails fast
 * when items is missing.
 */

const itemCta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const serviceItem = z
  .object({
    title: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    image: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    duration: z.string().optional(),
    cta: itemCta.optional(),
  })
  .strict();

const serviceCategory = z
  .object({
    name: z.string().optional(),
    items: z.array(serviceItem).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(serviceItem).min(1),
  })
  .strict();

const cardCarousel = base.extend({ items: z.array(serviceItem).min(1) }).strict();
const detailedAccordion = base.extend({ items: z.array(serviceItem).min(1) }).strict();
const featuredGrid = base.extend({ items: z.array(serviceItem).min(1) }).strict();
const grid4 = base.extend({ items: z.array(serviceItem).min(1) }).strict();
const iconGrid = base.extend({ items: z.array(serviceItem).min(1) }).strict();
const iconList = base.extend({ items: z.array(serviceItem).min(1) }).strict();

// tabbed is the structural outlier: uses `categories[]`, not `items[]`.
const tabbed = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    categories: z.array(serviceCategory).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "card-carousel": cardCarousel,
    "detailed-accordion": detailedAccordion,
    "featured-grid": featuredGrid,
    "grid-4": grid4,
    "icon-grid": iconGrid,
    "icon-list": iconList,
    tabbed,
  },
};

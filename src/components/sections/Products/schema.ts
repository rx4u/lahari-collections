import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Products section.
 *
 * Keys observed in variants (2026-05):
 *   - ProductsCarousel: headline, description, items
 *   - ProductsGrid:     headline, description, items
 *   - ProductsCategorized: headline, description, categories
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const productItem = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    cta: cta.optional(),
  })
  .strict();

const productCategory = z
  .object({
    name: z.string().optional(),
    items: z.array(productItem).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(productItem).min(1),
  })
  .strict();

const categorized = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    categories: z.array(productCategory).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    categorized,
  },
};

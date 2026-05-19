import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the ProductGrid section.
 *
 * Keys observed in variants (2026-05):
 *   - Carousel: headline, description, filterTag, limit
 *   - Grid3: headline, description, filterTag, limit, variant
 *   - Grid4: headline, description, filterTag, limit, variant
 *
 * Products themselves come from the product registry; the section content
 * just configures filtering, limit, and card variant.
 */

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    filterTag: z.string().optional(),
    limit: z.number().optional(),
    variant: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

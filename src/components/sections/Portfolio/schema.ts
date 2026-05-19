import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Portfolio section.
 *
 * Keys observed in variants (2026-05):
 *   - PortfolioCaseStudy: headline, description, items (with client/challenge/solution/result)
 *   - PortfolioCategorized: headline, description, items
 *   - PortfolioLightbox: headline, description, items
 *   - PortfolioMasonry: headline, description, items
 */

const item = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    category: z.string().optional(),
    client: z.string().optional(),
    challenge: z.string().optional(),
    solution: z.string().optional(),
    result: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    items: z.array(item).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

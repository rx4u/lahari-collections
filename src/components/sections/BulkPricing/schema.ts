import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the BulkPricing section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/BulkPricing/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - BulkPricingTable: headline, description, note, tiers[{name,quantity,pricePerUnit,totalPrice,savings,highlighted}]
 *   - BulkPricingTierCards: same
 */

const tier = z
  .object({
    name: z.string().optional(),
    quantity: z.union([z.string(), z.number()]).optional(),
    pricePerUnit: z.union([z.string(), z.number()]).optional(),
    totalPrice: z.union([z.string(), z.number()]).optional(),
    savings: z.union([z.string(), z.number()]).optional(),
    highlighted: z.boolean().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    note: z.string().optional(),
    tiers: z.array(tier).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

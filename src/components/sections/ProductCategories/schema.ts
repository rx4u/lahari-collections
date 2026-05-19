import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the ProductCategories section.
 *
 * Keys observed in variants (2026-05):
 *   - ImageCards: headline, description
 *   - ImageCardsEditorial: headline, description
 *   - MinimalList: headline, description
 *
 * Note: categories themselves come from the product registry, not from
 * section content — so only headline/description live in the schema.
 */

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

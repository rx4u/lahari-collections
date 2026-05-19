import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the MenuServices section.
 *
 * Keys observed in variants (2026-05):
 *   - MenuServicesCardGrid: headline, description, categories
 *   - MenuServicesCategorized: headline, description, categories
 *   - MenuServicesPriceList: headline, description, categories
 */

const serviceItem = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    duration: z.string().optional(),
  })
  .strict();

const category = z
  .object({
    name: z.string().optional(),
    items: z.array(serviceItem).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(category).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

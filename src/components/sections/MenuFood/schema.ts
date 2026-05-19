import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the MenuFood section.
 *
 * Keys observed in variants (2026-05):
 *   - MenuFoodCardGrid: headline, description, categories
 *   - MenuFoodCategorized: headline, description, categories
 *   - MenuFoodMinimalList: headline, description, categories
 *   - MenuFoodPhotoMenu: headline, description, categories
 */

const menuItem = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    image: z.string().optional(),
    isVeg: z.boolean().optional(),
  })
  .strict();

const category = z
  .object({
    name: z.string().optional(),
    items: z.array(menuItem).optional(),
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

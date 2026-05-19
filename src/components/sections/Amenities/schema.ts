import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Amenities section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/Amenities/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AmenitiesIconGrid: headline, description, items[{icon,name,description}]
 *   - AmenitiesPhotoGrid: + items[].image
 */

const item = z
  .object({
    icon: z.string().optional(),
    name: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
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

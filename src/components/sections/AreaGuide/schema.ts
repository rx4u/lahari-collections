import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the AreaGuide section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/AreaGuide/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AreaGuideCardGrid: headline, description, areas[{name,image,description,propertyCount}]
 *   - AreaGuideDetailedPage: headline, description, areas[{name,image,description,propertyCount}]
 */

const area = z
  .object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    propertyCount: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    areas: z.array(area).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

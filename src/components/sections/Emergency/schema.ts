import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Emergency section.
 *
 * Keys observed in variants (2026-05):
 *   - EmergencyFloatingCard: headline, phone, description
 *   - EmergencyTopBanner: headline, description, phone (phone is required:
 *       unconditionally string-replaced for tel: href)
 *
 * `phone` is required at the base — both variants unconditionally render it.
 */

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    phone: z.string(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

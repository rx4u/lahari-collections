import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Location section.
 *
 * Keys observed in variants (2026-05):
 *   - LocationDirectionsCard: headline, address, city, mapUrl, landmarks,
 *       parking, transit, phone
 *   - LocationMapEmbed: headline, address, mapUrl
 *   - LocationMulti: headline, locations (locations required — variant
 *       indexes locations[active] unconditionally)
 *   - Each location branch: name, address, phone, email, hours, mapUrl
 */

const branch = z
  .object({
    name: z.string().optional(),
    address: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    hours: z.string().optional(),
    mapUrl: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    mapUrl: z.string().optional(),
    landmarks: z.string().optional(),
    parking: z.string().optional(),
    transit: z.string().optional(),
    phone: z.string().optional(),
    locations: z.array(branch).optional(),
  })
  .strict();

const multiLocation = base
  .extend({
    locations: z.array(branch),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "multi-location": multiLocation,
  },
};

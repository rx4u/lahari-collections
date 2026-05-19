import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the PropertyListings section.
 *
 * Keys observed in variants (2026-05):
 *   - PropertyListingsFeaturedCarousel: headline, description, properties
 *   - PropertyListingsGrid:             headline, description, properties
 *   - PropertyListingsMapView:          headline, description, properties
 *
 * Property fields: title, price, location, image, status, bedrooms,
 * bathrooms, area, type.
 */

const property = z
  .object({
    title: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    location: z.string().optional(),
    image: z.string().optional(),
    status: z.string().optional(),
    type: z.string().optional(),
    bedrooms: z.union([z.string(), z.number()]).optional(),
    bathrooms: z.union([z.string(), z.number()]).optional(),
    area: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    properties: z.array(property).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

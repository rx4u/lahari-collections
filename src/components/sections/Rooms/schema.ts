import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Rooms section.
 *
 * Keys observed in variants (2026-05):
 *   - RoomsCardGrid:     headline, description, rooms
 *   - RoomsComparison:   headline, description, rooms
 *   - RoomsGalleryCards: headline, description, rooms
 *
 * Room fields: name, description, price, period, image, amenities[], cta{text,url}.
 */

const roomCta = z
  .object({
    text: z.string().optional(),
    url: z.string().optional(),
    label: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const room = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    period: z.string().optional(),
    image: z.string().optional(),
    amenities: z.array(z.string()).optional(),
    cta: roomCta.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    rooms: z.array(room).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

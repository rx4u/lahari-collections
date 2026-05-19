import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the ServiceAreas section.
 *
 * Keys observed in variants (2026-05):
 *   - ServiceAreasListWithBadges: headline, description, areas, cta
 *                                 (area.name, distance, available, note)
 *   - ServiceAreasMapOverlay:     headline, description, areas
 *                                 (area.name, description, icon)
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const area = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    distance: z.string().optional(),
    available: z.boolean().optional(),
    note: z.string().optional(),
    icon: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    areas: z.array(area).optional(),
    cta: cta.optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

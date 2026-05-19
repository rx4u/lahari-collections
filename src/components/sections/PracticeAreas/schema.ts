import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the PracticeAreas section.
 *
 * Keys observed in variants (2026-05):
 *   - PracticeAreasAccordion: headline, description, items (icon/title/description)
 *   - PracticeAreasDetailedCards: headline, description, items (+ subItems, cta)
 *   - PracticeAreasIconGrid: headline, description, items (icon/title/description)
 */

const cta = z
  .object({
    text: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const item = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    subItems: z.array(z.string()).optional(),
    cta: cta.optional(),
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

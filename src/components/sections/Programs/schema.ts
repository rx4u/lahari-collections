import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Programs section.
 *
 * Keys observed in variants (2026-05):
 *   - ProgramsAccordion: headline, description, items
 *   - ProgramsCardGrid:  headline, description, items
 *   - ProgramsTabbed:    headline, description, items
 */

const programItem = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
    duration: z.string().optional(),
    fee: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    items: z.array(programItem).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Procedures section.
 *
 * Keys observed in variants (2026-05):
 *   - ProceduresAccordion: headline, description, items
 *   - ProceduresCardGrid: headline, description, items
 *   - ProceduresTabbed: headline, description, items
 */

const item = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    duration: z.string().optional(),
    cost: z.union([z.string(), z.number()]).optional(),
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

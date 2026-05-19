import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Process section.
 *
 * Keys observed in variants (2026-05):
 *   - ProcessIconFlow: headline, description, steps (icon/step/title/description)
 *   - ProcessStepsHorizontal: headline, description, steps (step/title/description)
 *   - ProcessTimelineVertical: headline, description, steps (title/description)
 */

const step = z
  .object({
    step: z.union([z.string(), z.number()]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    steps: z.array(step).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

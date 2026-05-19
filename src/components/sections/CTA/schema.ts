import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the CTA section.
 *
 * Keys observed in variants (2026-05):
 *   - CTABanner: headline, description, cta
 *   - CTACountdown: headline, description, cta, deadline (required for countdown logic)
 *   - CTAFloatingBar: headline, cta
 *   - CTASplit: headline, description, cta
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    image: z.string().optional(),
    cta: cta.optional(),
    deadline: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const countdown = base
  .extend({
    deadline: z.union([z.string(), z.number()]),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    countdown,
  },
};

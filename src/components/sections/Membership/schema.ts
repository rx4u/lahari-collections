import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Membership section.
 *
 * Keys observed in variants (2026-05):
 *   - MembershipComparisonTable: headline, description, plans
 *   - MembershipTierCards: headline, description, plans
 */

const cta = z
  .object({
    text: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const plan = z
  .object({
    name: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    period: z.string().optional(),
    features: z.array(z.string()).optional(),
    highlighted: z.boolean().optional(),
    cta: cta.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    plans: z.array(plan).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the CaseResults section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/CaseResults/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - CaseResultsStats: headline, description, stats[{value,label,description}]
 *   - CaseResultsTestimonialStyle: + cases[{title,clientType,outcome,quote}]
 */

const stat = z
  .object({
    value: z.union([z.string(), z.number()]).optional(),
    label: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

const caseItem = z
  .object({
    title: z.string().optional(),
    clientType: z.string().optional(),
    outcome: z.string().optional(),
    quote: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    stats: z.array(stat).optional(),
    cases: z.array(caseItem).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

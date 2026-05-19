import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the TestsOffered section.
 *
 * Keys observed in variants (2026-05):
 *   - TestsOfferedCardGrid:        headline, description, categories, tests
 *   - TestsOfferedCategorizedList: headline, description, categories, tests
 *   - TestsOfferedSearchable:      headline, description, categories, tests
 *
 * Either a flat `tests[]` (which the component groups by `t.category`) or an
 * explicit `categories[]` with nested `tests[]` may be supplied.
 */

const test = z
  .object({
    name: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    duration: z.string().optional(),
    category: z.string().optional(),
    preparation: z.string().optional(),
    homeCollection: z.boolean().optional(),
  })
  .strict();

const testCategory = z
  .object({
    name: z.string().optional(),
    tests: z.array(test).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    tests: z.array(test).optional(),
    categories: z.array(testCategory).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

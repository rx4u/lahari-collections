import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Admissions section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/Admissions/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AdmissionsForm: headline, description, requirements, importantDates,
 *                     contactEmail, contactPhone
 *   - AdmissionsInfoCard: + cta
 *   - AdmissionsTimeline: headline, description, steps, requirements, cta
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const importantDate = z
  .object({
    label: z.string().optional(),
    date: z.string().optional(),
  })
  .strict();

const step = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    requirements: z.array(z.string()).optional(),
    importantDates: z.array(importantDate).optional(),
    contactEmail: z.string().optional(),
    contactPhone: z.string().optional(),
    steps: z.array(step).optional(),
    cta: cta.optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

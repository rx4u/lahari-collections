import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Hours section.
 *
 * Keys observed in variants (2026-05):
 *   - HoursCard: headline, hours
 *   - HoursInlineBanner: hours
 *   - HoursTable: headline, hours
 *
 * `hours` is a record keyed by day (mon/tue/...) where the value is either
 * the literal "closed" or { open, close } string times.
 */

const hoursEntry = z.union([
  z.literal("closed"),
  z
    .object({
      open: z.string().optional(),
      close: z.string().optional(),
    })
    .strict(),
]);

const base = z
  .object({
    headline: z.string().optional(),
    hours: z.record(z.string(), hoursEntry).optional(),
    note: z.string().optional(),
    schedule: z.record(z.string(), hoursEntry).optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Packages section.
 *
 * Keys observed in variants (2026-05):
 *   - PackagesDetailedAccordion: headline, description, packages
 *   - PackagesTierCards: headline, description, packages
 */

const cta = z
  .object({
    text: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const pkg = z
  .object({
    name: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    period: z.string().optional(),
    description: z.string().optional(),
    features: z.array(z.string()).optional(),
    duration: z.string().optional(),
    deliveryTime: z.string().optional(),
    highlighted: z.boolean().optional(),
    cta: cta.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    packages: z.array(pkg).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

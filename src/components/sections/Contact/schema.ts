import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Contact section.
 *
 * Keys observed in variants (2026-05):
 *   - ContactMinimal: headline, description, email, phone, address
 *   - ContactSplitInfo: headline, description, phone, email, address, hours, submitText
 *   - ContactSplitMap: headline, description
 */

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    hours: z.string().optional(),
    submitText: z.string().optional(),
    city: z.string().optional(),
    whatsapp: z.string().optional(),
    mapUrl: z.string().optional(),
    details: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

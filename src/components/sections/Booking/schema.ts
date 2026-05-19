import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Booking section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/Booking/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - BookingCalendlyEmbed: headline, description, calendlyUrl
 *   - BookingCtaRedirect: headline, description, services, cta-related fields via props
 *   - BookingInlineForm: headline, description, services
 *   - BookingWhatsappCta: headline, description, whatsappNumber, whatsappMessage
 */

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    calendlyUrl: z.string().optional(),
    services: z.array(z.string()).optional(),
    whatsappNumber: z.string().optional(),
    whatsappMessage: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Donations section.
 *
 * Keys observed in variants (2026-05):
 *   - DonationsCtaTiers: headline, description, tiers
 *   - DonationsQrUpi: headline, description, qrImage, upiId (upiId required)
 *   - DonationsSimpleForm: (no direct content reads; container only)
 *   - Each tier item: name, amount, description, impact
 */

const tier = z
  .object({
    name: z.string().optional(),
    amount: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    impact: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    qrImage: z.string().optional(),
    upiId: z.string().optional(),
    tiers: z.array(tier).optional(),
  })
  .strict();

const qrUpi = base
  .extend({
    upiId: z.string(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "qr-upi": qrUpi,
  },
};

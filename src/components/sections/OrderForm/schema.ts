import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the OrderForm section.
 *
 * Keys observed in variants (2026-05):
 *   - OrderFormSimple: headline, description, items, submitText
 *   - OrderFormProductSelector: headline, products, currency, submitLabel
 */

const orderItem = z
  .object({
    name: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
  })
  .strict();

const product = z
  .object({
    id: z.string().optional(),
    name: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    items: z.array(orderItem).optional(),
    submitText: z.string().optional(),
    products: z.array(product).optional(),
    currency: z.string().optional(),
    submitLabel: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

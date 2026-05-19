import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Pricing section.
 *
 * Variant ↔ shape map (2026-05):
 *   - cards / cards-2:        plans[] required, currency? — plan: name, price,
 *                              period?, description?, features?, highlighted?, cta?
 *   - table:                  plans[] required, features[] required (table rows)
 *                              feature row: name, values[]
 *   - toggle-monthly-annual:  plans[] required — plan: name, monthlyPrice,
 *                              annualPrice, period?, annualSavings?, description?,
 *                              features?, highlighted?, cta?  (no single `price`)
 *   - simple-list:            items[] required, currency? — item: name, description?,
 *                              price, category?
 *
 * `toggle-monthly-annual` has a genuinely different plan shape (monthly /
 * annual price pair vs a single `price`), so its plan schema is its own
 * type — not a superset of the cards plan.
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

// Standard plan shape (cards-2, cards, table)
const plan = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    period: z.string().optional(),
    features: z.array(z.string()).optional(),
    highlighted: z.boolean().optional(),
    cta: cta.optional(),
  })
  .strict();

// Toggle plan shape — distinct: no single `price`, requires monthly/annual.
const togglePlan = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    monthlyPrice: z.union([z.string(), z.number()]),
    annualPrice: z.union([z.string(), z.number()]),
    annualSavings: z.string().optional(),
    period: z.string().optional(),
    features: z.array(z.string()).optional(),
    highlighted: z.boolean().optional(),
    cta: cta.optional(),
  })
  .strict();

const pricingItem = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.union([z.string(), z.number()]).optional(),
    category: z.string().optional(),
  })
  .strict();

const featureRow = z
  .object({
    name: z.string().optional(),
    values: z.array(z.union([z.string(), z.number(), z.boolean()])).optional(),
  })
  .strict();

// Base: every Pricing variant has headers; `plans` required so a Pricing
// section with no variant (defaults to cards in the renderer) still fails
// fast on missing plans. `simple-list` overrides to use `items`.
const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    currency: z.string().optional(),
    plans: z.array(plan).min(1),
  })
  .strict();

const cards = base.extend({ plans: z.array(plan).min(1) }).strict();
const cards2 = cards;

const table = base
  .extend({
    plans: z.array(plan).min(1),
    features: z.array(featureRow).min(1),
  })
  .strict();

const toggleMonthlyAnnual = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    currency: z.string().optional(),
    plans: z.array(togglePlan).min(1),
  })
  .strict();

const simpleList = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    currency: z.string().optional(),
    items: z.array(pricingItem).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    cards,
    "cards-2": cards2,
    table,
    "toggle-monthly-annual": toggleMonthlyAnnual,
    "simple-list": simpleList,
  },
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the FAQ section.
 *
 * Keys observed in variants (2026-05):
 *   - FAQAccordion, FAQTwoColumn: headline, description, items
 *   - FAQCategorized: headline, description, categories
 *       (each category: name, items[]; each item: question, answer)
 */

const faqItem = z
  .object({
    question: z.string().optional(),
    answer: z.string().optional(),
  })
  .strict();

const faqCategory = z
  .object({
    name: z.string().optional(),
    items: z.array(faqItem).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    items: z.array(faqItem).min(1),
    cta: z.unknown().optional(),
  })
  .strict();

const categorized = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    categories: z.array(faqCategory).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    categorized,
  },
};

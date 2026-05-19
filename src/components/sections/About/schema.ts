import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the About section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/About/. When adding a new About variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AboutSplitImage: headline, description, image, stats
 *   - AboutStory: headline, description, stats
 *   - AboutEditorialSplit: headline, description, description2, eyebrow,
 *                          cta, image, imagePosition
 *   - AboutSplitContent, AboutStatsInline, AboutTimeline: header keys + stats
 */

const cta = z
  .object({
    label: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    url: z.string().optional(),
    variant: z.string().optional(),
  })
  .strict();

const statItem = z
  .object({
    label: z.string().optional(),
    value: z.union([z.string(), z.number()]).optional(),
    description: z.string().optional(),
  })
  .strict();

const milestone = z
  .object({
    year: z.union([z.string(), z.number()]).optional(),
    title: z.string().optional(),
    description: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    image: z.string().optional(),
    stats: z.array(statItem).optional(),
    milestones: z.array(milestone).optional(),
    cta: cta.optional(),
    body: z.string().optional(),
  })
  .strict();

const editorialSplit = base
  .extend({
    description2: z.string().optional(),
    imagePosition: z.string().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "editorial-split": editorialSplit,
  },
};

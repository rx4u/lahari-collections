import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Impact section.
 *
 * Keys observed in variants (2026-05):
 *   - ImpactStats: headline, description, stats
 *       (each stat: icon, value, label)
 *   - ImpactStories: headline, description, stories
 *       (each story: quote, outcome, image, name, location)
 *   - ImpactTimeline: headline, description, timeline
 *       (each item: title, description, milestone, year)
 *
 * `stats` is the only array spec called out by the brief, but stories and
 * timeline are read identically by their respective variants — schema covers
 * all three at base so the scanner doesn't false-positive when a config uses
 * the matching variant.
 */

const stat = z
  .object({
    icon: z.string().optional(),
    value: z.union([z.string(), z.number()]).optional(),
    label: z.string().optional(),
  })
  .strict();

const story = z
  .object({
    quote: z.string().optional(),
    outcome: z.string().optional(),
    image: z.string().optional(),
    name: z.string().optional(),
    location: z.string().optional(),
  })
  .strict();

const timelineItem = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    milestone: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    stats: z.array(stat).optional(),
    stories: z.array(story).optional(),
    timeline: z.array(timelineItem).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

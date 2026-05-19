import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Stats section.
 *
 * Per-variant item shapes — each variant declares the exact array key
 * (items/stats) and item shape. The previous shared `statItem` allowed
 * malformed configs through; we now reject unknown keys per variant.
 *
 * Required keys mirror unconditional renders in variant .tsx files.
 *
 * Keys observed in variants (2026-05):
 *   - StatsCounter:     items[{ value*, label* }]
 *   - StatsDarkBand:    items[{ value*, label* }]
 *   - StatsDarkSplit:   headline*, description*, stats[{ value*, label* }],
 *                       eyebrow?, cta{text*, url*}?, image?, imagePosition?
 *   - StatsIconStat:    stats[{ value*, label*, icon* }]
 *   - StatsProgressBar: stats[{ label*, value* (number), displayValue? }]
 *   - StatsComparison:  headline*, before{label*, stats[{label*,value*}]},
 *                       after{label*, stats[{label*,value*}]}
 */

const cta = z
  .object({
    text: z.string(),
    url: z.string(),
  })
  .strict();

// Counter + DarkBand: simple {value,label}
const counterItem = z
  .object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  })
  .strict();

// DarkSplit stats: same as counter
const darkSplitStat = z
  .object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
  })
  .strict();

// IconStat: requires icon
const iconStatItem = z
  .object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
    icon: z.string(),
  })
  .strict();

// ProgressBar: value is number, optional displayValue override
const progressBarStat = z
  .object({
    label: z.string(),
    value: z.number(),
    displayValue: z.string().optional(),
  })
  .strict();

// Comparison row inside before/after groups
const comparisonRow = z
  .object({
    label: z.string(),
    value: z.union([z.string(), z.number()]),
  })
  .strict();

const comparisonGroup = z
  .object({
    label: z.string(),
    stats: z.array(comparisonRow).min(1),
  })
  .strict();

/**
 * Shared header keys only. `items`, `stats`, `cta`, `image`, `before`,
 * `after` are variant-specific and move into the per-variant override.
 */
const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
  })
  .strict();

const counter = base
  .extend({
    items: z.array(counterItem).min(1),
  })
  .strict();

const darkBand = base
  .extend({
    items: z.array(counterItem).min(1),
  })
  .strict();

const darkSplit = base
  .extend({
    stats: z.array(darkSplitStat).min(1),
    cta: cta.optional(),
    image: z.string().optional(),
    imagePosition: z.string().optional(),
  })
  .strict();

const iconStat = base
  .extend({
    stats: z.array(iconStatItem).min(1),
  })
  .strict();

const progressBar = base
  .extend({
    stats: z.array(progressBarStat).min(1),
  })
  .strict();

const comparison = base
  .extend({
    before: comparisonGroup,
    after: comparisonGroup,
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    counter,
    "dark-band": darkBand,
    "dark-split": darkSplit,
    "icon-stat": iconStat,
    "progress-bar": progressBar,
    comparison,
  },
};

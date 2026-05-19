import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Trust section.
 *
 * Per-variant item shapes — each variant declares the exact array key
 * (items/logos/facts/stats) and item shape it consumes. The previous
 * permissive superset (one trustItem with every-possible-key optional)
 * allowed real bugs through, e.g. `items: [{ text, label }]` parsed OK
 * even though TrustCertifications renders `item.name` / `item.issuedBy`.
 *
 * Required keys here mirror unconditional renders in the variant .tsx
 * (no `if (item.x)` guard, no `??` fallback). Optional keys are guarded
 * or decorative.
 *
 * Keys observed in variants (2026-05):
 *   - TrustAwards:         items[{ name*, logo?, awardedBy?, year? }]
 *   - TrustCertifications: items[{ name*, logo?, issuedBy?, year? }]
 *   - TrustInlineList:     items[{ title*, description?, icon? }]
 *   - TrustLogoCloud:      logos[{ src*, alt*, url? }]
 *   - TrustMediaMentions:  items[{ publication*, logo?, quote?, url? }]
 *   - TrustFactsBar:       facts (string[])
 *   - TrustStatsInline:    stats[{ value*, label*, icon? }], bordered?
 */

const awardItem = z
  .object({
    name: z.string(),
    logo: z.string().optional(),
    awardedBy: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const certificationItem = z
  .object({
    name: z.string(),
    logo: z.string().optional(),
    issuedBy: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
  })
  .strict();

const inlineListItem = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })
  .strict();

const logoItem = z
  .object({
    src: z.string(),
    alt: z.string(),
    url: z.string().optional(),
  })
  .strict();

const mediaMentionItem = z
  .object({
    publication: z.string(),
    logo: z.string().optional(),
    quote: z.string().optional(),
    url: z.string().optional(),
  })
  .strict();

const statsInlineItem = z
  .object({
    value: z.union([z.string(), z.number()]),
    label: z.string(),
    icon: z.string().optional(),
  })
  .strict();

/**
 * Shared header/text keys. `items`, `logos`, `facts`, `stats` intentionally
 * NOT in base — they move into each variant so a `trust:awards` section
 * configured with `logos:[...]` is correctly flagged as malformed.
 */
const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
  })
  .strict();

const awards = base
  .extend({
    items: z.array(awardItem).min(1),
  })
  .strict();

const certifications = base
  .extend({
    items: z.array(certificationItem).min(1),
  })
  .strict();

const inlineList = base
  .extend({
    items: z.array(inlineListItem).min(1),
  })
  .strict();

const logoCloud = base
  .extend({
    logos: z.array(logoItem).min(1),
  })
  .strict();

const mediaMentions = base
  .extend({
    items: z.array(mediaMentionItem).min(1),
  })
  .strict();

const factsBar = base
  .extend({
    facts: z.array(z.string()).min(1),
  })
  .strict();

const statsInline = base
  .extend({
    stats: z.array(statsInlineItem).min(1),
    bordered: z.boolean().optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    awards,
    certifications,
    "inline-list": inlineList,
    "logo-cloud": logoCloud,
    "media-mentions": mediaMentions,
    "facts-bar": factsBar,
    "stats-inline": statsInline,
  },
};

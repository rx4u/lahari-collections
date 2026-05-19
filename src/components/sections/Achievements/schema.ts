import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Achievements section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/Achievements/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AchievementsBadgeGrid: headline, description, items[{icon,title,category,year}]
 *   - AchievementsStats: headline, description, items[{icon,title,year,description,badge}]
 *   - AchievementsTimeline: headline, description, items[{year,title,description}]
 */

const item = z
  .object({
    icon: z.string().optional(),
    title: z.string().optional(),
    description: z.string().optional(),
    year: z.union([z.string(), z.number()]).optional(),
    category: z.string().optional(),
    badge: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    items: z.array(item).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

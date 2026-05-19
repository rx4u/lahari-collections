import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the ClassSchedule section.
 *
 * Derived from the `content.*` keys read by each variant under
 * src/components/sections/ClassSchedule/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - ClassScheduleCalendarView: headline, description, schedule[{day,slots[{time,name,type,instructor}]}]
 *   - ClassScheduleCardGrid: same
 *   - ClassScheduleWeeklyTable: same
 */

const slot = z
  .object({
    time: z.string().optional(),
    name: z.string().optional(),
    type: z.string().optional(),
    instructor: z.string().optional(),
  })
  .strict();

const day = z
  .object({
    day: z.string().optional(),
    slots: z.array(slot).optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    schedule: z.array(day).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the EventsCalendar section.
 *
 * Keys observed in variants (2026-05):
 *   - EventsCalendarCalendar, EventsCalendarCardGrid, EventsCalendarList:
 *       headline, description, events
 *   - Each event item: title, date, time, location, category, description,
 *       featured, cta
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const event = z
  .object({
    title: z.string().optional(),
    date: z.union([z.string(), z.number()]).optional(),
    time: z.string().optional(),
    location: z.string().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    featured: z.boolean().optional(),
    cta: cta.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    events: z.array(event).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

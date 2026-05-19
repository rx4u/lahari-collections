import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Team section.
 *
 * Keys observed in variants (2026-05) — all destructured from content:
 *   - TeamCarousel:       headline, description, members
 *   - TeamFeaturedSingle: headline, description, members
 *   - TeamGrid:           headline, description, members, eyebrow, subtitle
 *   - TeamMinimalList:    headline, description, members
 *
 * Member fields: name, role, image, bio, social{linkedin,instagram,twitter}.
 */

const social = z
  .object({
    linkedin: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
  })
  .strict();

const member = z
  .object({
    name: z.string().optional(),
    role: z.string().optional(),
    image: z.string().optional(),
    bio: z.string().optional(),
    social: social.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    members: z.array(member).min(1),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

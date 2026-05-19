import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the ProjectShowcase section.
 *
 * Keys observed in variants (2026-05):
 *   - ProjectShowcaseBeforeAfter: headline, description, projects
 *                                 (project.beforeImage, afterImage, title, category, description)
 *   - ProjectShowcaseCaseStudy:   headline, description, projects
 *                                 (project.image, images[], afterImage, title, category,
 *                                  description, client, duration, outcome)
 *   - ProjectShowcaseGalleryGrid: headline, description, projects
 *                                 (project.image, images[], afterImage, title, category)
 */

const project = z
  .object({
    title: z.string().optional(),
    description: z.string().optional(),
    category: z.string().optional(),
    image: z.string().optional(),
    images: z.array(z.string()).optional(),
    beforeImage: z.string().optional(),
    afterImage: z.string().optional(),
    client: z.string().optional(),
    duration: z.string().optional(),
    outcome: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    eyebrow: z.string().optional(),
    subtitle: z.string().optional(),
    projects: z.array(project).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

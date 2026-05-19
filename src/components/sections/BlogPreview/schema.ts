import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the BlogPreview section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/BlogPreview/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - BlogPreviewFeaturedSidebar: headline, viewAllUrl, posts[{url,image,title,date,category}]
 *                                 first post used as featured
 *   - BlogPreviewMinimalList: headline, viewAllUrl, posts[{url,title,date,category}]
 */

const post = z
  .object({
    url: z.string().optional(),
    image: z.string().optional(),
    title: z.string().optional(),
    date: z.string().optional(),
    category: z.string().optional(),
    excerpt: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    viewAllUrl: z.string().optional(),
    posts: z.array(post).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

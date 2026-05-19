import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Collections section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/Collections/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - CollectionsBannerGrid: headline, description, collections[{name,image,description,cta{url,text}}]
 *   - CollectionsLookbook: same
 */

const cta = z
  .object({
    url: z.string().optional(),
    text: z.string().optional(),
    href: z.string().optional(),
    label: z.string().optional(),
  })
  .strict();

const collection = z
  .object({
    name: z.string().optional(),
    image: z.string().optional(),
    description: z.string().optional(),
    cta: cta.optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    collections: z.array(collection).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

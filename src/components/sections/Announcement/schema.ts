import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Announcement section.
 *
 * Derived from the destructured `content.*` keys read by each variant under
 * src/components/sections/Announcement/. When adding a new variant or a new
 * content key, update the matching schema entry below in the same commit.
 *
 * Keys observed in variants (2026-05):
 *   - AnnouncementTopBar (default): text, link{url,text}, dismissible
 *   - AnnouncementInlineBanner: message, subtitle, cta{url,text}, dismissible, type
 *   - AnnouncementModal: title, body, image, cta{url,text}, sessionKey
 */

const cta = z
  .object({
    url: z.string().optional(),
    href: z.string().optional(),
    text: z.string().optional(),
    label: z.string().optional(),
  })
  .strict();

const link = z
  .object({
    url: z.string().optional(),
    text: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    text: z.string().optional(),
    link: link.optional(),
    dismissible: z.boolean().optional(),
    message: z.string().optional(),
    subtitle: z.string().optional(),
    cta: cta.optional(),
    type: z.string().optional(),
    title: z.string().optional(),
    body: z.string().optional(),
    image: z.string().optional(),
    sessionKey: z.string().optional(),
  })
  .strict();

const inlineBanner = base
  .extend({
    message: z.string(),
  })
  .strict();

const modal = base
  .extend({
    title: z.string(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
  variants: {
    "inline-banner": inlineBanner,
    modal,
  },
};

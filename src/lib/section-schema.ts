import type { z } from "zod";

/**
 * Section-schema contract.
 *
 * Every section folder in src/components/sections/<Section>/ must export a
 * `schema` object that conforms to `SectionSchema`. The schema is the single
 * source of truth for what `content.*` keys the section's variants accept.
 *
 * The prebuild section-shape scanner imports schemas via the central
 * registry (src/components/sections/schemas-registry.ts) and validates each
 * `section.content` against the resolved schema for the section's variant.
 *
 * Why Zod instead of a hand-curated registry:
 *   - Schema lives next to the component it describes — no remote drift.
 *   - z.object().strict() rejects unknown keys at parse time → typos
 *     caught the same way a typed Props interface would catch them at
 *     compile time.
 *   - The renderer can opt into runtime validation later (z.infer for
 *     types) without a second migration.
 */
export interface SectionSchema {
  /** Base shape that applies to every variant of this section. */
  base: z.ZodTypeAny;
  /**
   * Optional per-variant overrides. The scanner resolves the effective
   * schema by `(base ∪ variant)`. If a variant key is absent from this
   * map, the base alone is used.
   */
  variants?: Record<string, z.ZodTypeAny>;
}

/**
 * Helper used inside section folders to build a strict Zod object schema
 * for content. Strict mode (.strict()) makes every key explicit — unknown
 * keys become a parse error, which is exactly what the validator wants.
 *
 * Convention:
 *   - Use `.optional()` for keys not every variant consumes.
 *   - Use `z.array(...).min(1)` for arrays that must not be empty at
 *     deploy time. The unified section-shape scanner catches the
 *     `too_small` issue and reports it as `kind: "empty"`. Per-variant
 *     enforcement: declare the `.min(1)` inside the variant schema
 *     where the array is the defining content (e.g. testimonials
 *     `carousel` needs items, `featured-quote` doesn't).
 *   - Avoid `.passthrough()` — defeats the purpose of strict typo catching.
 */
export const __SCHEMA_CONVENTION__ =
  "Each src/components/sections/<Section>/schema.ts exports { schema: SectionSchema }. " +
  "Base must be z.object({...}).strict(). Variants extend base via base.extend({...}).strict().";

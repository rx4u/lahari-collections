import { resolveSchema } from "../../src/components/sections/schemas-registry";

export interface SectionShapeFinding {
  index: number;
  section: string;
  variant?: string;
  field: string;
  kind: "missing" | "unknown" | "type" | "empty";
}

/**
 * Validates each `section.content` against the Zod schema co-located with
 * the section component (src/components/sections/<Section>/schema.ts),
 * resolved via the central registry. The variant-specific schema is used
 * when present; otherwise the section's base schema applies.
 *
 * Finding kinds:
 *   - `missing`: a required key is absent or undefined in the content
 *     (at any depth). Variant-required keys (e.g. `cta:countdown.deadline`,
 *     `gallery:before-after.pairs`, `pricing:toggle-monthly-annual.plans[].monthlyPrice`)
 *     are detected by parsing against the variant schema.
 *   - `unknown`: a top-level key is present in content but not declared
 *     in the schema. Catches typos like `discription` vs `description`
 *     before they silently no-op at render time. Nested unknown keys are
 *     intentionally NOT surfaced separately — per-variant item schemas
 *     are `.strict()` but unknown nested keys typically indicate a
 *     structural mismatch already caught by missing/type findings.
 *   - `type`: a present value has the wrong Zod type (e.g. a number
 *     where a string was expected). Applies at any depth.
 *   - `empty`: a required array (declared via `z.array(...).min(1)`)
 *     is empty. Replaces the prior empty-section-scanner — per-variant
 *     enforcement (e.g. `testimonials:featured-quote` does NOT require
 *     items[]; `testimonials:carousel` does).
 *
 * Sections without a registered schema are skipped silently. The coverage
 * test (section-shape-coverage.test.ts) prevents drift between
 * SECTION_MAP and the schema registry.
 */
function getAtPath(obj: unknown, path: ReadonlyArray<PropertyKey>): unknown {
  let cur: unknown = obj;
  for (const k of path) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<string, unknown>)[k as string];
  }
  return cur;
}

export function scanForSectionShape(config: Record<string, unknown>): SectionShapeFinding[] {
  const findings: SectionShapeFinding[] = [];
  const sections = (
    config as {
      sections?: Array<{ type?: string; variant?: string; content?: unknown }>;
    }
  ).sections;
  if (!Array.isArray(sections)) return findings;

  sections.forEach((section, index) => {
    const type = section.type;
    if (!type) return;
    const schema = resolveSchema(type, section.variant);
    if (!schema) return;

    const content = (section.content ?? {}) as Record<string, unknown>;
    const result = schema.safeParse(content);
    if (result.success) return;

    for (const issue of result.error.issues) {
      // unrecognized_keys: only flag at top level. Per-variant item
      // schemas are .strict() too, but a nested unknown key usually
      // travels with a structural mismatch that's already surfaced as
      // missing/type — duplicating it as "unknown" adds noise.
      if (issue.code === "unrecognized_keys") {
        if (issue.path.length !== 0) continue;
        const keys = (issue as unknown as { keys?: string[] }).keys ?? [];
        for (const k of keys) {
          findings.push({
            index,
            section: type,
            variant: section.variant,
            field: k,
            kind: "unknown",
          });
        }
        continue;
      }

      // too_small on an array with min(1) → empty array. Replaces
      // empty-section-scanner. The field path points at the array key.
      if (issue.code === "too_small") {
        const field = issue.path.length === 0 ? "(root)" : issue.path.join(".");
        findings.push({
          index,
          section: type,
          variant: section.variant,
          field,
          kind: "empty",
        });
        continue;
      }

      if (issue.code === "invalid_type" || issue.code === "invalid_union") {
        const field = issue.path.length === 0 ? "(root)" : issue.path.join(".");
        // Distinguish missing (value undefined at input path) from type
        // (value present but wrong shape).
        const value = getAtPath(content, issue.path);
        const present = value !== undefined && value !== null;
        findings.push({
          index,
          section: type,
          variant: section.variant,
          field,
          kind: present ? "type" : "missing",
        });
        continue;
      }

      const field = issue.path.length === 0 ? "(root)" : issue.path.join(".");
      findings.push({
        index,
        section: type,
        variant: section.variant,
        field,
        kind: "type",
      });
    }
  });

  return findings;
}

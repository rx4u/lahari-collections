import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the Departments section.
 *
 * Keys observed in variants (2026-05):
 *   - DepartmentsAccordion, DepartmentsGrid, DepartmentsTabbed:
 *       headline, description, departments
 *   - Each department item: name, description, icon
 */

const department = z
  .object({
    name: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })
  .strict();

const base = z
  .object({
    headline: z.string().optional(),
    description: z.string().optional(),
    departments: z.array(department).optional(),
    items: z.array(department).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

import { z } from "zod";
import type { SectionSchema } from "@/lib/section-schema";

/**
 * Schema for the DoctorDirectory section.
 *
 * Keys observed in variants (2026-05):
 *   - DoctorDirectoryCardCarousel: headline, description, doctors
 *   - DoctorDirectoryEditorial: eyebrow, headline, description, doctors
 *   - DoctorDirectoryFilterableGrid: headline, description, doctors
 *       (uses doctor.specialization + doctor.department for filtering)
 *   - DoctorDirectoryList: headline, description, doctors
 *       (uses doctor.experience + doctor.availability)
 *   - Each doctor item: name, image, qualification, specialization,
 *       department, experience, availability, bio, cta
 */

const cta = z
  .object({
    text: z.string().optional(),
    label: z.string().optional(),
    url: z.string().optional(),
    href: z.string().optional(),
  })
  .strict();

const doctor = z
  .object({
    name: z.string().optional(),
    image: z.string().optional(),
    qualification: z.string().optional(),
    specialization: z.string().optional(),
    department: z.string().optional(),
    experience: z.string().optional(),
    availability: z.string().optional(),
    bio: z.string().optional(),
    cta: cta.optional(),
  })
  .strict();

const base = z
  .object({
    eyebrow: z.string().optional(),
    headline: z.string().optional(),
    description: z.string().optional(),
    doctors: z.array(doctor).optional(),
  })
  .strict();

export const schema: SectionSchema = {
  base,
};

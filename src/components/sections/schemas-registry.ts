/**
 * Central section-schema registry.
 *
 * Imports each section's co-located Zod schema (src/components/sections/<Section>/schema.ts)
 * and exposes them under the same keys used by SECTION_MAP in
 * src/lib/section-renderer.tsx. The prebuild section-shape scanner imports
 * `resolveSchema` to validate `section.content` against the schema for the
 * effective variant.
 *
 * Adding a new section type:
 *   1. Add it to SECTION_MAP in src/lib/section-renderer.tsx.
 *   2. Create src/components/sections/<Section>/schema.ts exporting
 *      `{ schema: SectionSchema }`.
 *   3. Add an import + entry below using the SECTION_MAP key.
 *
 * The coverage test (scripts/validators/__tests__/section-shape-coverage.test.ts)
 * fails CI if any SECTION_MAP key lacks an entry here.
 */
import type { SectionSchema } from "@/lib/section-schema";

import { schema as about } from "./About/schema";
import { schema as achievements } from "./Achievements/schema";
import { schema as admissions } from "./Admissions/schema";
import { schema as amenities } from "./Amenities/schema";
import { schema as announcement } from "./Announcement/schema";
import { schema as areaGuide } from "./AreaGuide/schema";
import { schema as blogPreview } from "./BlogPreview/schema";
import { schema as booking } from "./Booking/schema";
import { schema as bulkPricing } from "./BulkPricing/schema";
import { schema as caseResults } from "./CaseResults/schema";
import { schema as classSchedule } from "./ClassSchedule/schema";
import { schema as collections } from "./Collections/schema";
import { schema as conditionsTreated } from "./ConditionsTreated/schema";
import { schema as contact } from "./Contact/schema";
import { schema as cta } from "./CTA/schema";
import { schema as departments } from "./Departments/schema";
import { schema as doctorDirectory } from "./DoctorDirectory/schema";
import { schema as donations } from "./Donations/schema";
import { schema as emergency } from "./Emergency/schema";
import { schema as eventsCalendar } from "./EventsCalendar/schema";
import { schema as faq } from "./FAQ/schema";
import { schema as gallery } from "./Gallery/schema";
import { schema as hours } from "./Hours/schema";
import { schema as impact } from "./Impact/schema";
import { schema as location } from "./Location/schema";
import { schema as membership } from "./Membership/schema";
import { schema as menuFood } from "./MenuFood/schema";
import { schema as menuServices } from "./MenuServices/schema";
import { schema as orderForm } from "./OrderForm/schema";
import { schema as packages } from "./Packages/schema";
import { schema as portfolio } from "./Portfolio/schema";
import { schema as practiceAreas } from "./PracticeAreas/schema";
import { schema as pricing } from "./Pricing/schema";
import { schema as procedures } from "./Procedures/schema";
import { schema as process } from "./Process/schema";
import { schema as productCategories } from "./ProductCategories/schema";
import { schema as productGrid } from "./ProductGrid/schema";
import { schema as products } from "./Products/schema";
import { schema as programs } from "./Programs/schema";
import { schema as projectShowcase } from "./ProjectShowcase/schema";
import { schema as propertyListings } from "./PropertyListings/schema";
import { schema as rooms } from "./Rooms/schema";
import { schema as serviceAreas } from "./ServiceAreas/schema";
import { schema as services } from "./Services/schema";
import { schema as stats } from "./Stats/schema";
import { schema as team } from "./Team/schema";
import { schema as testimonials } from "./Testimonials/schema";
import { schema as testsOffered } from "./TestsOffered/schema";
import { schema as trust } from "./Trust/schema";

export const SECTION_SCHEMAS: Record<string, SectionSchema> = {
  about,
  achievements,
  admissions,
  amenities,
  announcement,
  "area-guide": areaGuide,
  "blog-preview": blogPreview,
  booking,
  "bulk-pricing": bulkPricing,
  "case-results": caseResults,
  "class-schedule": classSchedule,
  collections,
  "conditions-treated": conditionsTreated,
  contact,
  cta,
  departments,
  "doctor-directory": doctorDirectory,
  donations,
  emergency,
  "events-calendar": eventsCalendar,
  faq,
  gallery,
  hours,
  impact,
  location,
  membership,
  "menu-food": menuFood,
  "menu-services": menuServices,
  "order-form": orderForm,
  packages,
  portfolio,
  "practice-areas": practiceAreas,
  pricing,
  procedures,
  process,
  "product-categories": productCategories,
  "product-grid": productGrid,
  products,
  programs,
  "project-showcase": projectShowcase,
  "property-listings": propertyListings,
  rooms,
  "service-areas": serviceAreas,
  services,
  stats,
  team,
  testimonials,
  "tests-offered": testsOffered,
  trust,
};

/**
 * Resolve the effective schema for a section, factoring in its variant.
 * Returns the variant's Zod schema if registered, otherwise the base.
 * Returns null when the section type isn't registered (validator skips it).
 */
export function resolveSchema(type: string, variant?: string) {
  const entry = SECTION_SCHEMAS[type];
  if (!entry) return null;
  if (variant && entry.variants?.[variant]) return entry.variants[variant];
  return entry.base;
}

import type { SectionConfig } from "./types";
import Services from "@/components/sections/Services";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import Gallery from "@/components/sections/Gallery";
import FAQ from "@/components/sections/FAQ";
import Contact from "@/components/sections/Contact";
import CTA from "@/components/sections/CTA";
import Stats from "@/components/sections/Stats";
import Hours from "@/components/sections/Hours";
import Location from "@/components/sections/Location";
import Team from "@/components/sections/Team";
import Pricing from "@/components/sections/Pricing";
import Trust from "@/components/sections/Trust";
import Announcement from "@/components/sections/Announcement";
import MenuFood from "@/components/sections/MenuFood";
import MenuServices from "@/components/sections/MenuServices";
import Booking from "@/components/sections/Booking";
import ConditionsTreated from "@/components/sections/ConditionsTreated";
import Procedures from "@/components/sections/Procedures";
import Emergency from "@/components/sections/Emergency";
import ClassSchedule from "@/components/sections/ClassSchedule";
import Membership from "@/components/sections/Membership";
import PropertyListings from "@/components/sections/PropertyListings";
import AreaGuide from "@/components/sections/AreaGuide";
import PracticeAreas from "@/components/sections/PracticeAreas";
import CaseResults from "@/components/sections/CaseResults";
import Programs from "@/components/sections/Programs";
import Rooms from "@/components/sections/Rooms";
import Amenities from "@/components/sections/Amenities";
import Portfolio from "@/components/sections/Portfolio";
import Packages from "@/components/sections/Packages";
import Process from "@/components/sections/Process";
import Products from "@/components/sections/Products";
import Donations from "@/components/sections/Donations";
import Impact from "@/components/sections/Impact";
import OrderForm from "@/components/sections/OrderForm";
import ServiceAreas from "@/components/sections/ServiceAreas";
import BlogPreview from "@/components/sections/BlogPreview";
import Departments from "@/components/sections/Departments";
import DoctorDirectory from "@/components/sections/DoctorDirectory";
import Collections from "@/components/sections/Collections";
import Admissions from "@/components/sections/Admissions";
import Achievements from "@/components/sections/Achievements";
import EventsCalendar from "@/components/sections/EventsCalendar";
import BulkPricing from "@/components/sections/BulkPricing";
import TestsOffered from "@/components/sections/TestsOffered";
import ProjectShowcase from "@/components/sections/ProjectShowcase";
import ProductGrid from "@/components/sections/ProductGrid";
import ProductCategories from "@/components/sections/ProductCategories";

type SectionComponent = React.ComponentType<{
  content: Record<string, unknown>;
  variant: string;
  eyebrow?: string;
  subtitle?: string;
}>;

const SECTION_MAP: Record<string, SectionComponent> = {
  services: Services,
  about: About,
  testimonials: Testimonials,
  gallery: Gallery,
  faq: FAQ,
  contact: Contact,
  cta: CTA,
  stats: Stats,
  hours: Hours,
  location: Location,
  team: Team,
  pricing: Pricing,
  trust: Trust,
  announcement: Announcement,
  "menu-food": MenuFood,
  "menu-services": MenuServices,
  booking: Booking,
  "conditions-treated": ConditionsTreated,
  procedures: Procedures,
  emergency: Emergency,
  "class-schedule": ClassSchedule,
  membership: Membership,
  "property-listings": PropertyListings,
  "area-guide": AreaGuide,
  "practice-areas": PracticeAreas,
  "case-results": CaseResults,
  programs: Programs,
  rooms: Rooms,
  amenities: Amenities,
  portfolio: Portfolio,
  packages: Packages,
  process: Process,
  products: Products,
  donations: Donations,
  impact: Impact,
  "order-form": OrderForm,
  "service-areas": ServiceAreas,
  "blog-preview": BlogPreview,
  departments: Departments,
  "doctor-directory": DoctorDirectory,
  collections: Collections,
  admissions: Admissions,
  achievements: Achievements,
  "events-calendar": EventsCalendar,
  "bulk-pricing": BulkPricing,
  "tests-offered": TestsOffered,
  "project-showcase": ProjectShowcase,
  "product-grid": ProductGrid,
  "product-categories": ProductCategories,
};

export function resolveSection(section: SectionConfig): SectionComponent | null {
  return SECTION_MAP[section.type] ?? null;
}

export function SectionPlaceholder({ type, variant }: { type: string; variant: string }) {
  return (
    <section id={type} className="py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-dashed border-muted-foreground/30 p-12 text-center">
          <p className="text-muted-foreground text-sm font-medium uppercase tracking-wider">
            {type}
          </p>
          <p className="text-muted-foreground/60 text-xs mt-1">variant: {variant}</p>
        </div>
      </div>
    </section>
  );
}

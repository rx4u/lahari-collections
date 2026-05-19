import type { SectionConfig } from "@/lib/types";
import ServicesIconGrid from "./ServicesIconGrid";
import ServicesIconList from "./ServicesIconList";
import ServicesCardCarousel from "./ServicesCardCarousel";
import ServicesDetailedAccordion from "./ServicesDetailedAccordion";
import ServicesTabbed from "./ServicesTabbed";
import ServicesGrid4 from "./ServicesGrid4";
import ServicesFeaturedGrid from "./ServicesFeaturedGrid";

export default function Services({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  switch (variant) {
    case "icon-grid":
      return <ServicesIconGrid content={content as any} />;
    case "icon-list":
      return <ServicesIconList content={content as any} />;
    case "card-carousel":
      return <ServicesCardCarousel content={content as any} />;
    case "detailed-accordion":
      return <ServicesDetailedAccordion content={content as any} />;
    case "tabbed":
      return <ServicesTabbed content={content as any} />;
    case "grid-4":
      return <ServicesGrid4 content={content as any} />;
    case "featured-grid":
      return <ServicesFeaturedGrid content={content as any} />;
    default:
      return <ServicesIconGrid content={content as any} />;
  }
}

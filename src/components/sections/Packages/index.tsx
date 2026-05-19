import PackagesTierCards from "./PackagesTierCards";
import PackagesDetailedAccordion from "./PackagesDetailedAccordion";

export default function Packages({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "tier-cards":
      return <PackagesTierCards content={content as any} />;
    case "detailed-accordion":
      return <PackagesDetailedAccordion content={content as any} />;
    default:
      return <PackagesTierCards content={content as any} />;
  }
}

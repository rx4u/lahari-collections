import BulkPricingTable from "./BulkPricingTable";
import BulkPricingTierCards from "./BulkPricingTierCards";

export default function BulkPricing({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "tier-cards": return <BulkPricingTierCards content={content as any} />;
    case "table":
    default: return <BulkPricingTable content={content as any} />;
  }
}

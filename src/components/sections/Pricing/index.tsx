import PricingCards from "./PricingCards";
import PricingCards2 from "./PricingCards2";
import PricingTable from "./PricingTable";
import PricingToggle from "./PricingToggle";
import PricingSimpleList from "./PricingSimpleList";

export default function Pricing({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "cards-2":
      return <PricingCards2 content={content as any} />;
    case "table":
      return <PricingTable content={content as any} />;
    case "toggle-monthly-annual":
      return <PricingToggle content={content as any} />;
    case "simple-list":
      return <PricingSimpleList content={content as any} />;
    default:
      return <PricingCards content={content as any} />;
  }
}

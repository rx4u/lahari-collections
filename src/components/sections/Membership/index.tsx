import MembershipTierCards from "./MembershipTierCards";
import MembershipComparisonTable from "./MembershipComparisonTable";

type MembershipContent = {
  headline: string;
  description?: string;
  plans: Array<{
    name: string;
    price: string;
    period: string;
    features: string[];
    cta: { text: string; url: string };
    highlighted?: boolean;
  }>;
};

export default function Membership({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as MembershipContent };

  switch (variant) {
    case "tier-cards":
      return <MembershipTierCards {...props} />;
    case "comparison-table":
      return <MembershipComparisonTable {...props} />;
    default:
      return <MembershipTierCards {...props} />;
  }
}

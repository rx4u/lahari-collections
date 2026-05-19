import EmergencyTopBanner from "./EmergencyTopBanner";
import EmergencyFloatingCard from "./EmergencyFloatingCard";

type EmergencyContent = {
  headline: string;
  phone: string;
  description?: string;
};

export default function Emergency({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as EmergencyContent };

  switch (variant) {
    case "top-banner":
      return <EmergencyTopBanner {...props} />;
    case "floating-card":
      return <EmergencyFloatingCard {...props} />;
    default:
      return <EmergencyTopBanner {...props} />;
  }
}

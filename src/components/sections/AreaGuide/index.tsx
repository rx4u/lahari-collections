import AreaGuideCardGrid from "./AreaGuideCardGrid";
import AreaGuideDetailedPage from "./AreaGuideDetailedPage";

type AreaGuideContent = {
  headline: string;
  description?: string;
  areas: Array<{
    name: string;
    description: string;
    propertyCount?: number;
    image?: string;
  }>;
};

export default function AreaGuide({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as AreaGuideContent };

  switch (variant) {
    case "card-grid":
      return <AreaGuideCardGrid {...props} />;
    case "detailed-page":
      return <AreaGuideDetailedPage {...props} />;
    default:
      return <AreaGuideCardGrid {...props} />;
  }
}

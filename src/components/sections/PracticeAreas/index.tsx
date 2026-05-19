import PracticeAreasIconGrid from "./PracticeAreasIconGrid";
import PracticeAreasAccordion from "./PracticeAreasAccordion";
import PracticeAreasDetailedCards from "./PracticeAreasDetailedCards";

type PracticeAreasContent = {
  headline: string;
  description?: string;
  items: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

export default function PracticeAreas({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as PracticeAreasContent };

  switch (variant) {
    case "icon-grid":
      return <PracticeAreasIconGrid {...props} />;
    case "accordion":
      return <PracticeAreasAccordion {...props} />;
    case "detailed-cards":
      return <PracticeAreasDetailedCards {...props} />;
    default:
      return <PracticeAreasIconGrid {...props} />;
  }
}

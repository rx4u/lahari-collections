import ProgramsCardGrid from "./ProgramsCardGrid";
import ProgramsTabbed from "./ProgramsTabbed";
import ProgramsAccordion from "./ProgramsAccordion";

type ProgramsContent = {
  headline: string;
  description?: string;
  items: Array<{
    title: string;
    duration?: string;
    fee?: string;
    description: string;
    icon?: string;
  }>;
};

export default function Programs({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as ProgramsContent };

  switch (variant) {
    case "card-grid":
      return <ProgramsCardGrid {...props} />;
    case "tabbed":
      return <ProgramsTabbed {...props} />;
    case "accordion":
      return <ProgramsAccordion {...props} />;
    default:
      return <ProgramsCardGrid {...props} />;
  }
}

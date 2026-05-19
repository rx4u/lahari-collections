import ProceduresAccordion from "./ProceduresAccordion";
import ProceduresCardGrid from "./ProceduresCardGrid";
import ProceduresTabbed from "./ProceduresTabbed";

type ProceduresContent = {
  headline: string;
  description?: string;
  items: Array<{
    name: string;
    description: string;
    duration?: string;
    cost?: string;
  }>;
};

export default function Procedures({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as ProceduresContent };

  switch (variant) {
    case "accordion":
      return <ProceduresAccordion {...props} />;
    case "card-grid":
      return <ProceduresCardGrid {...props} />;
    case "tabbed":
      return <ProceduresTabbed {...props} />;
    default:
      return <ProceduresAccordion {...props} />;
  }
}

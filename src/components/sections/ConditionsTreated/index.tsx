import ConditionsTreatedIconGrid from "./ConditionsTreatedIconGrid";
import ConditionsTreatedAccordion from "./ConditionsTreatedAccordion";
import ConditionsTreatedSearchableList from "./ConditionsTreatedSearchableList";

type ConditionsTreatedContent = {
  headline: string;
  description?: string;
  items: Array<{
    name: string;
    icon: string;
    description?: string;
    category?: string;
  }>;
};

export default function ConditionsTreated({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as ConditionsTreatedContent };

  switch (variant) {
    case "icon-grid":
      return <ConditionsTreatedIconGrid {...props} />;
    case "accordion":
      return <ConditionsTreatedAccordion {...props} />;
    case "searchable-list":
      return <ConditionsTreatedSearchableList {...props} />;
    default:
      return <ConditionsTreatedIconGrid {...props} />;
  }
}

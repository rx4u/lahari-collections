import DepartmentsGrid from "./DepartmentsGrid";
import DepartmentsAccordion from "./DepartmentsAccordion";
import DepartmentsTabbed from "./DepartmentsTabbed";

export default function Departments({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "accordion": return <DepartmentsAccordion content={content as any} />;
    case "tabbed": return <DepartmentsTabbed content={content as any} />;
    case "grid":
    default: return <DepartmentsGrid content={content as any} />;
  }
}

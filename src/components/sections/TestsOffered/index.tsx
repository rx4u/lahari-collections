import TestsOfferedCategorizedList from "./TestsOfferedCategorizedList";
import TestsOfferedSearchable from "./TestsOfferedSearchable";
import TestsOfferedCardGrid from "./TestsOfferedCardGrid";

export default function TestsOffered({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "searchable": return <TestsOfferedSearchable content={content as any} />;
    case "card-grid": return <TestsOfferedCardGrid content={content as any} />;
    case "categorized-list":
    default: return <TestsOfferedCategorizedList content={content as any} />;
  }
}

import FAQAccordion from "./FAQAccordion";
import FAQTwoColumn from "./FAQTwoColumn";
import FAQCategorized from "./FAQCategorized";

export default function FAQ({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "accordion":
      return <FAQAccordion content={content as any} />;
    case "two-column":
      return <FAQTwoColumn content={content as any} />;
    case "categorized":
      return <FAQCategorized content={content as any} />;
    default:
      return <FAQAccordion content={content as any} />;
  }
}

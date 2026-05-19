import ImageCards from "./ImageCards";
import ImageCardsEditorial from "./ImageCardsEditorial";
import MinimalList from "./MinimalList";

export default function ProductCategories({ content, variant, eyebrow, subtitle }: { content: Record<string, unknown>; variant: string; eyebrow?: string; subtitle?: string }) {
  switch (variant) {
    case "image-cards":
      return <ImageCards content={content as any} eyebrow={eyebrow} subtitle={subtitle} />;
    case "editorial":
      return <ImageCardsEditorial content={content as any} eyebrow={eyebrow} subtitle={subtitle} />;
    case "minimal-list":
      return <MinimalList content={content as any} />;
    default:
      return <ImageCards content={content as any} eyebrow={eyebrow} subtitle={subtitle} />;
  }
}

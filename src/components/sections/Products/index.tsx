import ProductsGrid from "./ProductsGrid";
import ProductsCategorized from "./ProductsCategorized";
import ProductsCarousel from "./ProductsCarousel";

export default function Products({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "grid":
      return <ProductsGrid content={content as any} />;
    case "categorized":
      return <ProductsCategorized content={content as any} />;
    case "carousel":
      return <ProductsCarousel content={content as any} />;
    default:
      return <ProductsGrid content={content as any} />;
  }
}

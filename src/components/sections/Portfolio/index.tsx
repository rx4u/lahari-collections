import PortfolioMasonry from "./PortfolioMasonry";
import PortfolioCaseStudy from "./PortfolioCaseStudy";
import PortfolioCategorized from "./PortfolioCategorized";
import PortfolioLightbox from "./PortfolioLightbox";

export default function Portfolio({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "masonry":
      return <PortfolioMasonry content={content as any} />;
    case "case-study":
      return <PortfolioCaseStudy content={content as any} />;
    case "categorized":
      return <PortfolioCategorized content={content as any} />;
    case "lightbox":
      return <PortfolioLightbox content={content as any} />;
    default:
      return <PortfolioMasonry content={content as any} />;
  }
}

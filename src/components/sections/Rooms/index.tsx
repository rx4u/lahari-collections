import RoomsCardGrid from "./RoomsCardGrid";
import RoomsComparison from "./RoomsComparison";
import RoomsGalleryCards from "./RoomsGalleryCards";

type RoomsContent = {
  headline: string;
  description?: string;
  rooms: Array<{
    name: string;
    description: string;
    price: string;
    period?: string;
    amenities?: string[];
    image?: string;
    cta?: { text: string; url: string };
  }>;
};

export default function Rooms({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as RoomsContent };

  switch (variant) {
    case "card-grid":
      return <RoomsCardGrid {...props} />;
    case "comparison":
      return <RoomsComparison {...props} />;
    case "gallery-cards":
      return <RoomsGalleryCards {...props} />;
    default:
      return <RoomsCardGrid {...props} />;
  }
}

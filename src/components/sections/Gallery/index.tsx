import GalleryGrid from "./GalleryGrid";
import GalleryMasonry from "./GalleryMasonry";
import GalleryBeforeAfter from "./GalleryBeforeAfter";
import GalleryFullwidthCarousel from "./GalleryFullwidthCarousel";
import GalleryLocationGrid from "./GalleryLocationGrid";

export default function Gallery({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "grid-3":
    case "grid":
      return <GalleryGrid content={content as any} />;
    case "masonry":
      return <GalleryMasonry content={content as any} />;
    case "before-after":
      return <GalleryBeforeAfter content={content as any} />;
    case "fullwidth-carousel":
      return <GalleryFullwidthCarousel content={content as any} />;
    case "location-grid":
      return <GalleryLocationGrid content={content as any} />;
    default:
      return <GalleryGrid content={content as any} />;
  }
}

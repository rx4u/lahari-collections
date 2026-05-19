import Grid3 from "./Grid3";
import Grid4 from "./Grid4";
import Carousel from "./Carousel";

export default function ProductGrid({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "grid-3":
      return <Grid3 content={content as any} />;
    case "grid-4":
      return <Grid4 content={content as any} />;
    case "carousel":
      return <Carousel content={content as any} />;
    default:
      return <Grid4 content={content as any} />;
  }
}

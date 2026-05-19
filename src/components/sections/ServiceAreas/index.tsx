import ServiceAreasMapOverlay from "./ServiceAreasMapOverlay";
import ServiceAreasListWithBadges from "./ServiceAreasListWithBadges";

export default function ServiceAreas({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "map-overlay":
      return <ServiceAreasMapOverlay content={content as any} />;
    case "list-with-badges":
      return <ServiceAreasListWithBadges content={content as any} />;
    default:
      return <ServiceAreasMapOverlay content={content as any} />;
  }
}

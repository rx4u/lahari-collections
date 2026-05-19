import LocationMapEmbed from "./LocationMapEmbed";
import LocationMulti from "./LocationMulti";
import LocationDirectionsCard from "./LocationDirectionsCard";

export default function Location({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  if (variant === "multi-location") return <LocationMulti content={content as any} />;
  if (variant === "directions-card") return <LocationDirectionsCard content={content as any} />;
  return <LocationMapEmbed content={content as any} />;
}

import ImpactStats from "./ImpactStats";
import ImpactTimeline from "./ImpactTimeline";
import ImpactStories from "./ImpactStories";

export default function Impact({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "stats":
      return <ImpactStats content={content as any} />;
    case "timeline":
      return <ImpactTimeline content={content as any} />;
    case "stories":
      return <ImpactStories content={content as any} />;
    default:
      return <ImpactStats content={content as any} />;
  }
}

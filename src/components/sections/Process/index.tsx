import ProcessTimelineVertical from "./ProcessTimelineVertical";
import ProcessStepsHorizontal from "./ProcessStepsHorizontal";
import ProcessIconFlow from "./ProcessIconFlow";

export default function Process({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "timeline-vertical":
      return <ProcessTimelineVertical content={content as any} />;
    case "steps-horizontal":
      return <ProcessStepsHorizontal content={content as any} />;
    case "icon-flow":
      return <ProcessIconFlow content={content as any} />;
    default:
      return <ProcessTimelineVertical content={content as any} />;
  }
}

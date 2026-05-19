import AboutStory from "./AboutStory";
import AboutSplitImage from "./AboutSplitImage";
import AboutTimeline from "./AboutTimeline";
import AboutStatsInline from "./AboutStatsInline";
import AboutEditorialSplit from "./AboutEditorialSplit";

export default function About({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "story":
      return <AboutStory content={content as any} />;
    case "split-content":
    case "split-image":
      return <AboutSplitImage content={content as any} />;
    case "timeline":
      return <AboutTimeline content={content as any} />;
    case "stats-inline":
      return <AboutStatsInline content={content as any} />;
    case "editorial-split":
      return <AboutEditorialSplit content={content as any} />;
    default:
      return <AboutStory content={content as any} />;
  }
}

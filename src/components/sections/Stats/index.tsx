import StatsCounter from "./StatsCounter";
import StatsIconStat from "./StatsIconStat";
import StatsProgressBar from "./StatsProgressBar";
import StatsComparison from "./StatsComparison";
import StatsDarkBand from "./StatsDarkBand";
import StatsDarkSplit from "./StatsDarkSplit";

export default function Stats({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "counter":
      return <StatsCounter content={content as any} />;
    case "icon-stat":
      return <StatsIconStat content={content as any} />;
    case "progress-bar":
      return <StatsProgressBar content={content as any} />;
    case "comparison":
      return <StatsComparison content={content as any} />;
    case "dark-band":
      return <StatsDarkBand content={content as any} />;
    case "dark-split":
      return <StatsDarkSplit content={content as any} />;
    default:
      return <StatsCounter content={content as any} />;
  }
}

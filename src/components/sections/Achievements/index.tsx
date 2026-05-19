import AchievementsStats from "./AchievementsStats";
import AchievementsTimeline from "./AchievementsTimeline";
import AchievementsBadgeGrid from "./AchievementsBadgeGrid";

export default function Achievements({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "timeline": return <AchievementsTimeline content={content as any} />;
    case "badge-grid": return <AchievementsBadgeGrid content={content as any} />;
    case "stats":
    default: return <AchievementsStats content={content as any} />;
  }
}

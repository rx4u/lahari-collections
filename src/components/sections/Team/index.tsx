import TeamGrid from "./TeamGrid";
import TeamCarousel from "./TeamCarousel";
import TeamFeaturedSingle from "./TeamFeaturedSingle";
import TeamMinimalList from "./TeamMinimalList";

export default function Team({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  switch (variant) {
    case "carousel":
      return <TeamCarousel content={content as any} />;
    case "featured-single":
      return <TeamFeaturedSingle content={content as any} />;
    case "minimal-list":
      return <TeamMinimalList content={content as any} />;
    case "grid":
    default:
      return <TeamGrid content={content as any} />;
  }
}

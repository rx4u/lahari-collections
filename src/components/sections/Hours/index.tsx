import HoursCard from "./HoursCard";
import HoursTable from "./HoursTable";
import HoursInlineBanner from "./HoursInlineBanner";

export default function Hours({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  if (variant === "table") return <HoursTable content={content as any} />;
  if (variant === "inline-banner") return <HoursInlineBanner content={content as any} />;
  return <HoursCard content={content as any} />;
}

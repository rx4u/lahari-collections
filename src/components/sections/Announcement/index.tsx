import AnnouncementTopBar from "./AnnouncementTopBar";
import AnnouncementInlineBanner from "./AnnouncementInlineBanner";
import AnnouncementModal from "./AnnouncementModal";

export default function Announcement({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  if (variant === "inline-banner") return <AnnouncementInlineBanner content={content as any} />;
  if (variant === "modal") return <AnnouncementModal content={content as any} />;
  return <AnnouncementTopBar content={content as any} />;
}

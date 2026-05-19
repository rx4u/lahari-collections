import ContactSplitMap from "./ContactSplitMap";
import ContactSplitInfo from "./ContactSplitInfo";
import ContactMinimal from "./ContactMinimal";

export default function Contact({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "split-map":
      return <ContactSplitMap content={content as any} />;
    case "split-info":
      return <ContactSplitInfo content={content as any} />;
    case "minimal":
      return <ContactMinimal content={content as any} />;
    default:
      return <ContactSplitMap content={content as any} />;
  }
}

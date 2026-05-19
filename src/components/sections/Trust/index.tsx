import TrustLogoCloud from "./TrustLogoCloud";
import TrustCertifications from "./TrustCertifications";
import TrustAwards from "./TrustAwards";
import TrustMediaMentions from "./TrustMediaMentions";
import TrustInlineList from "./TrustInlineList";
import TrustFactsBar from "./TrustFactsBar";
import TrustStatsInline from "./TrustStatsInline";

export default function Trust({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "certifications":
      return <TrustCertifications content={content as any} />;
    case "awards":
      return <TrustAwards content={content as any} />;
    case "media-mentions":
      return <TrustMediaMentions content={content as any} />;
    case "inline-list":
      return <TrustInlineList content={content as any} />;
    case "facts-bar":
      return <TrustFactsBar content={content as any} />;
    case "stats-inline":
      return <TrustStatsInline content={content as any} />;
    case "logo-cloud":
    default:
      return <TrustLogoCloud content={content as any} />;
  }
}

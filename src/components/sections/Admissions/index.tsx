import AdmissionsTimeline from "./AdmissionsTimeline";
import AdmissionsForm from "./AdmissionsForm";
import AdmissionsInfoCard from "./AdmissionsInfoCard";

export default function Admissions({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "form": return <AdmissionsForm content={content as any} />;
    case "info-card": return <AdmissionsInfoCard content={content as any} />;
    case "timeline":
    default: return <AdmissionsTimeline content={content as any} />;
  }
}

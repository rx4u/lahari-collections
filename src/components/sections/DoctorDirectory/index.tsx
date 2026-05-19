import DoctorDirectoryFilterableGrid from "./DoctorDirectoryFilterableGrid";
import DoctorDirectoryList from "./DoctorDirectoryList";
import DoctorDirectoryCardCarousel from "./DoctorDirectoryCardCarousel";
import DoctorDirectoryEditorial from "./DoctorDirectoryEditorial";

export default function DoctorDirectory({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "list": return <DoctorDirectoryList content={content as any} />;
    case "card-carousel": return <DoctorDirectoryCardCarousel content={content as any} />;
    case "editorial": return <DoctorDirectoryEditorial content={content as any} />;
    case "filterable-grid":
    default: return <DoctorDirectoryFilterableGrid content={content as any} />;
  }
}

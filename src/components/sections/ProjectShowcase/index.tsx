import ProjectShowcaseBeforeAfter from "./ProjectShowcaseBeforeAfter";
import ProjectShowcaseCaseStudy from "./ProjectShowcaseCaseStudy";
import ProjectShowcaseGalleryGrid from "./ProjectShowcaseGalleryGrid";

export default function ProjectShowcase({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "case-study": return <ProjectShowcaseCaseStudy content={content as any} />;
    case "gallery-grid": return <ProjectShowcaseGalleryGrid content={content as any} />;
    case "before-after":
    default: return <ProjectShowcaseBeforeAfter content={content as any} />;
  }
}

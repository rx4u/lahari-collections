import BlogPreviewFeaturedSidebar from "./BlogPreviewFeaturedSidebar";
import BlogPreviewMinimalList from "./BlogPreviewMinimalList";

export default function BlogPreview({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "minimal-list":
      return <BlogPreviewMinimalList content={content as any} />;
    case "featured-sidebar":
    default:
      return <BlogPreviewFeaturedSidebar content={content as any} />;
  }
}

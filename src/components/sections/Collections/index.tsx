import CollectionsBannerGrid from "./CollectionsBannerGrid";
import CollectionsLookbook from "./CollectionsLookbook";

export default function Collections({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "lookbook": return <CollectionsLookbook content={content as any} />;
    case "banner-grid":
    default: return <CollectionsBannerGrid content={content as any} />;
  }
}

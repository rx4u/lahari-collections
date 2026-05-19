import PropertyListingsFeaturedCarousel from "./PropertyListingsFeaturedCarousel";
import PropertyListingsGrid from "./PropertyListingsGrid";
import PropertyListingsMapView from "./PropertyListingsMapView";

type PropertyListingsContent = {
  headline: string;
  description?: string;
  properties: Array<{
    title: string;
    price: string;
    location: string;
    bedrooms: number;
    bathrooms: number;
    area: string;
    status: string;
    image?: string;
    type?: string;
  }>;
};

export default function PropertyListings({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as PropertyListingsContent };

  switch (variant) {
    case "featured-carousel":
      return <PropertyListingsFeaturedCarousel {...props} />;
    case "grid":
      return <PropertyListingsGrid {...props} />;
    case "map-view":
      return <PropertyListingsMapView {...props} />;
    default:
      return <PropertyListingsFeaturedCarousel {...props} />;
  }
}

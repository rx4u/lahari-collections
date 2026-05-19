import AmenitiesIconGrid from "./AmenitiesIconGrid";
import AmenitiesPhotoGrid from "./AmenitiesPhotoGrid";

type AmenitiesContent = {
  headline: string;
  description?: string;
  items: Array<{
    name: string;
    icon: string;
    description?: string;
  }>;
};

export default function Amenities({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as AmenitiesContent };

  switch (variant) {
    case "icon-grid":
      return <AmenitiesIconGrid {...props} />;
    case "photo-grid":
      return <AmenitiesPhotoGrid {...props} />;
    default:
      return <AmenitiesIconGrid {...props} />;
  }
}

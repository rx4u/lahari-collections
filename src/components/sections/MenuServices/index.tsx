import MenuServicesPriceList from "./MenuServicesPriceList";
import MenuServicesCardGrid from "./MenuServicesCardGrid";
import MenuServicesCategorized from "./MenuServicesCategorized";

type MenuServicesContent = {
  headline: string;
  description?: string;
  categories: Array<{
    name: string;
    items: Array<{
      name: string;
      duration?: string;
      price: string;
      description?: string;
    }>;
  }>;
};

export default function MenuServices({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as MenuServicesContent };

  switch (variant) {
    case "price-list":
      return <MenuServicesPriceList {...props} />;
    case "card-grid":
      return <MenuServicesCardGrid {...props} />;
    case "categorized":
      return <MenuServicesCategorized {...props} />;
    default:
      return <MenuServicesPriceList {...props} />;
  }
}

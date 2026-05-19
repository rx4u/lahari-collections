import MenuFoodCategorized from "./MenuFoodCategorized";
import MenuFoodPhotoMenu from "./MenuFoodPhotoMenu";
import MenuFoodCardGrid from "./MenuFoodCardGrid";
import MenuFoodMinimalList from "./MenuFoodMinimalList";

type MenuFoodContent = {
  headline: string;
  description?: string;
  categories: Array<{
    name: string;
    items: Array<{
      name: string;
      price: string;
      description?: string;
      image?: string;
      isVeg?: boolean;
    }>;
  }>;
};

export default function MenuFood({
  content,
  variant,
}: {
  content: Record<string, unknown>;
  variant: string;
}) {
  const props = { content: content as MenuFoodContent };

  switch (variant) {
    case "categorized":
      return <MenuFoodCategorized {...props} />;
    case "photo-menu":
      return <MenuFoodPhotoMenu {...props} />;
    case "card-grid":
      return <MenuFoodCardGrid {...props} />;
    case "minimal-list":
      return <MenuFoodMinimalList {...props} />;
    default:
      return <MenuFoodCategorized {...props} />;
  }
}

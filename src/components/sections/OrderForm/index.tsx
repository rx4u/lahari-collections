import OrderFormSimple from "./OrderFormSimple";
import OrderFormProductSelector from "./OrderFormProductSelector";

export default function OrderForm({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "simple-form":
      return <OrderFormSimple content={content as any} />;
    case "product-selector":
      return <OrderFormProductSelector content={content as any} />;
    default:
      return <OrderFormSimple content={content as any} />;
  }
}

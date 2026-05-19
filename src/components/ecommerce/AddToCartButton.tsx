"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  selectedVariants?: Record<string, string>;
  quantity?: number;
}

export default function AddToCartButton({ product, selectedVariants, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!product.inStock) return;

    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.jpg",
      quantity,
      selectedVariants,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-neutral)]/20 px-6 py-3 text-sm font-medium text-[var(--color-neutral)]/60"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-transform active:scale-95"
    >
      {added ? (
        <>
          <Check size={16} /> Added
        </>
      ) : (
        <>
          <ShoppingCart size={16} /> Add to Cart
        </>
      )}
    </button>
  );
}

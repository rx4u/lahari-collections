"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import PriceDisplay from "./PriceDisplay";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  showComparePrice?: boolean;
}

export default function ProductCard({ product, currencySymbol, showComparePrice = true }: ProductCardProps) {
  const { addItem } = useCart();

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.jpg",
      quantity: 1,
    });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-neutral)]/10 bg-[var(--color-surface)] transition-all duration-[var(--duration-normal)] hover:shadow-lg hover:-translate-y-1"
    >
      <div className="relative aspect-square overflow-hidden bg-[var(--color-neutral)]/10">
        <img
          src={product.images[0] ?? "/images/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium">Out of Stock</span>
          </div>
        )}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] shadow-md transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        )}
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--color-neutral)]/60 uppercase tracking-wide">{product.category}</p>
        <h3 className="mt-1 font-[family-name:var(--font-display)] text-foreground line-clamp-1">{product.name}</h3>
        {product.rating != null && product.rating > 0 && (
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: 5 }).map((_, j) => (
              <span key={j} className={j < Math.round(product.rating!) ? "text-yellow-400" : "text-[var(--color-neutral)]/20"} style={{ fontSize: "12px", lineHeight: 1 }}>★</span>
            ))}
          </div>
        )}
        <div className="mt-2">
          <PriceDisplay
            price={product.price}
            comparePrice={product.comparePrice}
            currencySymbol={currencySymbol}
            showCompare={showComparePrice}
          />
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

interface ProductCardPortraitProps {
  product: Product;
}

export default function ProductCardPortrait({ product }: ProductCardPortraitProps) {
  const { addItem } = useCart();
  const [hovered, setHovered] = useState(false);

  const primaryImage = product.images[0] ?? "/images/placeholder.jpg";
  const secondaryImage = product.images[1] ?? primaryImage;

  const discountPercent =
    product.comparePrice && product.comparePrice > product.price
      ? Math.round((1 - product.price / product.comparePrice) * 100)
      : null;

  function handleAdd(e: React.MouseEvent) {
    e.preventDefault();
    addItem({ slug: product.slug, name: product.name, price: product.price, image: primaryImage, quantity: 1 });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[var(--color-neutral)]/10">
        <img
          src={primaryImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--duration-slower)] ${hovered ? "opacity-0" : "opacity-100"}`}
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />
        <img
          src={secondaryImage}
          alt={product.name}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[var(--duration-slower)] ${hovered ? "opacity-100" : "opacity-0"}`}
          onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
        />

        {discountPercent && (
          <div className="absolute left-0 top-4 z-10 bg-[var(--color-primary)] px-2 py-0.5 rounded-r text-xs font-semibold text-white">
            -{discountPercent}%
          </div>
        )}

        <div
          className={`absolute inset-x-0 bottom-0 z-10 flex items-center justify-center bg-foreground py-3 text-xs font-semibold uppercase tracking-widest text-background transition-transform duration-[var(--duration-slow)] ${hovered ? "translate-y-0" : "translate-y-full"}`}
        >
          <button onClick={handleAdd} className="w-full text-center">
            Add to Cart
          </button>
        </div>
      </div>

      <div className="pt-3">
        <p className="text-[10px] uppercase tracking-[0.15em] text-[var(--color-neutral)]/50">
          {product.category}
        </p>
        <h3 className="mt-0.5 font-[family-name:var(--font-display)] text-sm text-foreground line-clamp-1">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-medium text-foreground">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.comparePrice && product.comparePrice > product.price && (
            <span className="text-xs text-[var(--color-neutral)]/40 line-through">
              ₹{product.comparePrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { getProductsByTag, getProductData } from "@/lib/products";
import { getConfig } from "@/lib/config";
import ProductCard from "@/components/ecommerce/ProductCard";
import type { Product } from "@/lib/types";

interface ProductGridContent {
  headline: string;
  description?: string;
  filterTag: string;
  limit?: number;
  showPrice: boolean;
}

export default function Carousel({ content, eyebrow, subtitle }: { content: ProductGridContent; eyebrow?: string; subtitle?: string }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const config = getConfig();
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const showCompare = ecommerce?.showComparePrice ?? true;

  let products: Product[];
  if (content.filterTag === "all") {
    products = getProductData().products;
  } else {
    products = getProductsByTag(content.filterTag);
  }

  if (content.limit) {
    products = products.slice(0, content.limit);
  }

  if (products.length === 0) return null;

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
            )}
          </div>
          <div className="hidden gap-2 sm:flex">
            <button
              onClick={() => scroll("left")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-neutral)]/20 text-foreground hover:bg-[var(--color-neutral)]/10"
              aria-label="Scroll left"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-neutral)]/20 text-foreground hover:bg-[var(--color-neutral)]/10"
              aria-label="Scroll right"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
        >
          {products.map((product) => (
            <div key={product.slug} className="w-64 flex-shrink-0 snap-start">
              <ProductCard
                product={product}
                currencySymbol={currencySymbol}
                showComparePrice={showCompare}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

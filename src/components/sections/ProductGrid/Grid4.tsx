"use client";

import { getProductsByTag, getProductData } from "@/lib/products";
import { getConfig } from "@/lib/config";
import ProductCard from "@/components/ecommerce/ProductCard";
import ProductCardPortrait from "@/components/ecommerce/ProductCardPortrait";
import type { Product, ProductGridContent } from "@/lib/types";

export default function Grid4({ content, eyebrow, subtitle }: { content: ProductGridContent; eyebrow?: string; subtitle?: string }) {
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

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) =>
            content.variant === "portrait" ? (
              <ProductCardPortrait key={product.slug} product={product} />
            ) : (
              <ProductCard
                key={product.slug}
                product={product}
                currencySymbol={currencySymbol}
                showComparePrice={showCompare}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
}

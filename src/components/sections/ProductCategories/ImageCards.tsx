"use client";

import Link from "next/link";
import { getProductData, getProductCount } from "@/lib/products";

interface ProductCategoriesContent {
  headline: string;
  description?: string;
}

export default function ImageCards({ content, eyebrow, subtitle }: { content: ProductCategoriesContent; eyebrow?: string; subtitle?: string }) {
  const { categories } = getProductData();

  if (categories.length === 0) return null;

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
          <Link href="/category" className="text-sm text-[var(--color-primary)] hover:underline shrink-0">
            View all →
          </Link>
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-[var(--radius-lg)] aspect-[4/5]"
            >
              <img
                src={category.image ?? "/images/placeholder.jpg"}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-[var(--duration-slow)] group-hover:scale-[1.03]"
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim on category image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: count on darkened category image */}
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">{getProductCount(category.slug)} items</p>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: name on darkened category image */}
                <h3 className="text-base font-semibold text-white">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

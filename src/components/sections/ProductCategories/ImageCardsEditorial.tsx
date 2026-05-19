"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getProductData, getProductCount } from "@/lib/products";

interface ProductCategoriesContent {
  headline: string;
  description?: string;
}

export default function ImageCardsEditorial({ content, eyebrow, subtitle }: { content: ProductCategoriesContent; eyebrow?: string; subtitle?: string }) {
  const { categories } = getProductData();

  if (categories.length === 0) return null;

  const [featured, ...rest] = categories;

  return (
    <section className="section-y">
      <div className="page-container">
        <div className="mb-10 flex items-end justify-between">
          <div>
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-primary)]">{eyebrow}</p>
            )}
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
              {content.headline}
            </h2>
            {content.description && (
              <p className="mt-2 text-[var(--color-neutral)]/70">{content.description}</p>
            )}
          </div>
          <Link href="/category" className="shrink-0 text-sm text-[var(--color-primary)] hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {featured && (
            <Link
              href={`/category/${featured.slug}`}
              className="group relative col-span-2 row-span-2 overflow-hidden md:col-span-1 md:row-span-2 aspect-[3/4]"
            >
              <img
                src={featured.image ?? "/images/placeholder.jpg"}
                alt={featured.name}
                className="h-full w-full object-cover transition-transform duration-[var(--duration-slower)] group-hover:scale-[1.03]"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim on featured category image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: hover affordance on featured category image */}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-[var(--duration-slow)] group-hover:bg-white/20 group-hover:text-white">
                <ArrowUpRight size={16} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5">
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: count on darkened category image */}
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-1">
                  {getProductCount(featured.slug)} items
                </p>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: name on darkened category image */}
                <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-white">
                  {featured.name}
                </h3>
              </div>
            </Link>
          )}

          {rest.slice(0, 4).map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden aspect-[4/5]"
            >
              <img
                src={category.image ?? "/images/placeholder.jpg"}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-[var(--duration-slower)] group-hover:scale-[1.03]"
                onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
              />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: gradient scrim on category image */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: hover affordance on category image */}
              <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/0 text-white/0 transition-all duration-[var(--duration-slow)] group-hover:bg-white/20 group-hover:text-white">
                <ArrowUpRight size={16} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: count on darkened category image */}
                <p className="text-[10px] uppercase tracking-widest text-white/50 mb-0.5">
                  {getProductCount(category.slug)} items
                </p>
                {/* eslint-disable-next-line no-restricted-syntax -- photo overlay: name on darkened category image */}
                <h3 className="font-[family-name:var(--font-display)] text-sm font-semibold text-white">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

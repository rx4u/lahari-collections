import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductData, getProductCount } from "@/lib/products";

interface ProductCategoriesContent {
  headline: string;
  description?: string;
}

export default function MinimalList({ content, eyebrow, subtitle }: { content: ProductCategoriesContent; eyebrow?: string; subtitle?: string }) {
  const { categories } = getProductData();

  if (categories.length === 0) return null;

  return (
    <section className="section-y">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
        </div>
        <div className="divide-y divide-[var(--color-neutral)]/10">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group flex items-center justify-between py-5 transition-colors hover:bg-[var(--color-neutral)]/5 -mx-4 px-4 rounded-[var(--radius-sm)]"
            >
              <div>
                <h3 className="font-medium text-foreground">{category.name}</h3>
                {category.description && (
                  <p className="mt-0.5 text-sm text-[var(--color-neutral)]/60">{category.description}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--color-neutral)]/50">
                  {getProductCount(category.slug)}
                </span>
                <ChevronRight size={16} className="text-[var(--color-neutral)]/40 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

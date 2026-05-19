"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteContainer from "@/components/layout/SiteContainer";
import PageHeader from "@/components/layout/PageHeader";
import ProductCard from "@/components/ecommerce/ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Product, Category, SiteConfig } from "@/lib/types";

type SortOption = "default" | "price-low" | "price-high" | "name";

interface CategoryClientProps {
  category: Category;
  products: Product[];
  config: SiteConfig;
}

export default function CategoryClient({ category, products, config }: CategoryClientProps) {
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const showCompare = ecommerce?.showComparePrice ?? true;

  const [sortBy, setSortBy] = useState<SortOption>("default");

  const sorted = useMemo(() => {
    switch (sortBy) {
      case "price-low":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high":
        return [...products].sort((a, b) => b.price - a.price);
      case "name":
        return [...products].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return products;
    }
  }, [products, sortBy]);

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="products"
        showCart={!!config.ecommerce}
      />
      <main className="min-h-screen pt-20">
        <PageHeader
          title={category.name}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: category.name },
          ]}
          subtitle={category.description}
          bannerImage={category.image}
        />
        <SiteContainer className="py-12">
          <p className="mb-6 text-sm text-[var(--color-neutral)]/50">
            {products.length} product{products.length !== 1 ? "s" : ""}
          </p>

          {products.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-lg font-medium">Coming Soon</p>
              <p className="mt-2 text-sm" style={{ color: "var(--color-on-surface)", opacity: 0.6 }}>
                Products in this category are being added.
              </p>
              <Link
                href="/products"
                className="mt-6 inline-block text-sm underline"
                style={{ color: "var(--color-primary)" }}
              >
                Browse all products
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6 flex justify-end">
                <Select value={sortBy} onValueChange={(v) => setSortBy(v as SortOption)}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Sort by</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {sorted.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    currencySymbol={currencySymbol}
                    showComparePrice={showCompare}
                  />
                ))}
              </div>
            </>
          )}
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}

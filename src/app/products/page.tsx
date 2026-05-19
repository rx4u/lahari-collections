"use client";

import { useState, useMemo } from "react";
import { getProductData } from "@/lib/products";
import { getConfig } from "@/lib/config";
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

type SortOption = "default" | "price-low" | "price-high" | "name";

export default function ProductsPage() {
  const config = getConfig();
  const { products, categories } = getProductData();
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const showCompare = ecommerce?.showComparePrice ?? true;

  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  const filtered = useMemo(() => {
    let result = activeCategory === "all" ? products : products.filter((p) => p.category === activeCategory);

    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "name":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, activeCategory, sortBy]);

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
          title="All Products"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Products" }]}
          subtitle={`${filtered.length} product${filtered.length !== 1 ? "s" : ""}`}
        />
        <SiteContainer className="py-12">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                  activeCategory === "all"
                    ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                    : "bg-[var(--color-neutral)]/10 text-foreground hover:bg-[var(--color-neutral)]/20"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    activeCategory === cat.slug
                      ? "bg-[var(--color-primary)] text-[var(--color-on-primary)]"
                      : "bg-[var(--color-neutral)]/10 text-foreground hover:bg-[var(--color-neutral)]/20"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

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

          {filtered.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-[var(--color-neutral)]/60">No products found.</p>
            </div>
          ) : (
            <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filtered.map((product) => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  currencySymbol={currencySymbol}
                  showComparePrice={showCompare}
                />
              ))}
            </div>
          )}
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}

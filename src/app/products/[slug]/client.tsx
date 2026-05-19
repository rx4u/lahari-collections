"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteContainer from "@/components/layout/SiteContainer";
import PageHeader from "@/components/layout/PageHeader";
import ProductImageGallery from "@/components/ecommerce/ProductImageGallery";
import PriceDisplay from "@/components/ecommerce/PriceDisplay";
import VariantSelector from "@/components/ecommerce/VariantSelector";
import AddToCartButton from "@/components/ecommerce/AddToCartButton";
import ProductCard from "@/components/ecommerce/ProductCard";
import type { Product, SiteConfig } from "@/lib/types";

interface ProductDetailClientProps {
  product: Product;
  related: Product[];
  config: SiteConfig;
}

export default function ProductDetailClient({ product, related, config }: ProductDetailClientProps) {
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const showCompare = ecommerce?.showComparePrice ?? true;
  const whatsappNumber = ecommerce?.whatsappNumber ?? "";

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    if (!product.variants) return {};
    const defaults: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) defaults[v.name] = v.options[0];
    });
    return defaults;
  });

  function handleVariantChange(name: string, value: string) {
    setSelectedVariants((prev) => ({ ...prev, [name]: value }));
  }

  function buildWhatsAppLink(): string {
    const variantStr = Object.entries(selectedVariants)
      .map(([k, v]) => `${k}: ${v}`)
      .join(", ");
    const msg = `Hi, I'm interested in:\n\n${product.name}${variantStr ? ` (${variantStr})` : ""} — ${currencySymbol} ${product.price.toLocaleString("en-IN")}`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
  }

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="products"
        showCart={!!ecommerce}
      />
      <main className="min-h-screen pt-20">
        <PageHeader
          title={product.name}
          breadcrumbs={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
            { label: product.name },
          ]}
        />
        <SiteContainer className="py-12">
          <div className="grid gap-12 lg:grid-cols-2">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-[var(--color-neutral)]/60">
                  {product.category}
                </p>
              </div>

              <PriceDisplay
                price={product.price}
                comparePrice={product.comparePrice}
                currencySymbol={currencySymbol}
                showCompare={showCompare}
              />

              <p className="text-[var(--color-neutral)]/80 leading-relaxed">{product.description}</p>

              {product.features && product.features.length > 0 && (
                <ul className="space-y-1.5">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-primary)]" />
                      {f}
                    </li>
                  ))}
                </ul>
              )}

              {product.variants && product.variants.length > 0 && (
                <VariantSelector
                  variants={product.variants}
                  selected={selectedVariants}
                  onChange={handleVariantChange}
                />
              )}

              <div className="flex flex-col gap-3 pt-2">
                <AddToCartButton product={product} selectedVariants={selectedVariants} />
                {whatsappNumber && (
                  <a
                    href={buildWhatsAppLink()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-[var(--radius-md)] border border-green-600 px-6 py-3 text-sm font-medium text-green-600 transition-colors hover:bg-green-50"
                  >
                    <MessageCircle size={16} /> Buy via WhatsApp
                  </a>
                )}
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="mb-8 font-[family-name:var(--font-display)] text-2xl font-bold text-foreground">
                You might also like
              </h2>
              <div className="grid gap-6 grid-cols-2 md:grid-cols-4">
                {related.map((p) => (
                  <ProductCard
                    key={p.slug}
                    product={p}
                    currencySymbol={currencySymbol}
                    showComparePrice={showCompare}
                  />
                ))}
              </div>
            </div>
          )}
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}

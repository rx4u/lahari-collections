"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getConfig } from "@/lib/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SiteContainer from "@/components/layout/SiteContainer";
import PageHeader from "@/components/layout/PageHeader";
import WhatsAppCheckout from "@/components/ecommerce/WhatsAppCheckout";

export default function CartPage() {
  const config = getConfig();
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const whatsappNumber = ecommerce?.whatsappNumber ?? "";

  const { items, removeItem, updateQuantity, totalPrice, clearCart } = useCart();

  return (
    <>
      <Navbar
        businessName={config.business.name}
        logo={config.business.logo}
        sections={config.sections}
        heroCta={config.hero.cta}
        layout={config.layout}
        currentPage="cart"
        showCart={!!config.ecommerce}
      />
      <main className="min-h-screen pt-20">
        <PageHeader
          title="Your Cart"
          breadcrumbs={[{ label: "Home", href: "/" }, { label: "Your Cart" }]}
        />
        <SiteContainer className="py-12 max-w-4xl">
          {items.length === 0 ? (
            <div className="mt-16 flex flex-col items-center text-center">
              <ShoppingBag size={48} className="text-[var(--color-neutral)]/30" />
              <p className="mt-4 text-lg text-[var(--color-neutral)]/60">Your cart is empty</p>
              <Link
                href="/products"
                className="mt-6 inline-flex rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)]"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="space-y-4">
                {items.map((item) => {
                  const variantKey = item.selectedVariants
                    ? Object.entries(item.selectedVariants).map(([k, v]) => `${k}=${v}`).join(",")
                    : "";
                  const key = `${item.slug}::${variantKey}`;

                  return (
                    <div
                      key={key}
                      className="flex gap-4 rounded-[var(--radius-md)] border border-[var(--color-neutral)]/10 p-4"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 flex-shrink-0 rounded-[var(--radius-sm)] object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).style.visibility = "hidden"; }}
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <Link
                            href={`/products/${item.slug}`}
                            className="font-medium text-foreground hover:underline"
                          >
                            {item.name}
                          </Link>
                          {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                            <p className="mt-0.5 text-xs text-[var(--color-neutral)]/60">
                              {Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(" / ")}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity - 1, item.selectedVariants)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-neutral)]/20 text-foreground hover:bg-[var(--color-neutral)]/10"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.slug, item.quantity + 1, item.selectedVariants)}
                              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-neutral)]/20 text-foreground hover:bg-[var(--color-neutral)]/10"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <div className="flex items-center gap-4">
                            <span className="text-sm font-semibold text-foreground">
                              {currencySymbol} {(item.price * item.quantity).toLocaleString("en-IN")}
                            </span>
                            <button
                              onClick={() => removeItem(item.slug, item.selectedVariants)}
                              className="text-[var(--color-neutral)]/40 hover:text-red-500"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                <button
                  onClick={clearCart}
                  className="text-sm text-[var(--color-neutral)]/50 hover:text-red-500"
                >
                  Clear cart
                </button>
              </div>

              <div className="h-fit rounded-[var(--radius-md)] border border-[var(--color-neutral)]/10 p-6">
                <h2 className="text-lg font-semibold text-foreground">Order Summary</h2>
                <div className="mt-4 flex justify-between border-t border-[var(--color-neutral)]/10 pt-4">
                  <span className="font-medium text-foreground">Total</span>
                  <span className="text-lg font-bold text-foreground">
                    {currencySymbol} {totalPrice.toLocaleString("en-IN")}
                  </span>
                </div>
                <div className="mt-6">
                  <WhatsAppCheckout
                    whatsappNumber={whatsappNumber}
                    currencySymbol={currencySymbol}
                  />
                </div>
              </div>
            </div>
          )}
        </SiteContainer>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}

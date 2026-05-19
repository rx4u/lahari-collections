# Ecommerce Support Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add multi-page ecommerce store support with file-based products, client-side cart, and WhatsApp checkout to template-hub.

**Architecture:** Products stored in `data/products.json`, read at build time by a data layer (`src/lib/products.ts`). Cart managed client-side via React context + localStorage. New page routes for `/products`, `/products/[slug]`, `/category/[slug]`, `/cart`. New section components (`ProductGrid`, `ProductCategories`) integrate with the existing section renderer. WhatsApp message builder on cart page.

**Tech Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, Framer Motion, Lucide icons.

**Spec:** `docs/superpowers/specs/2026-05-02-ecommerce-support-design.md`

---

## Parallel Workstreams

These tasks are grouped into independent workstreams that can run concurrently. Dependencies are noted where they exist.

| Workstream | Tasks | Dependencies |
|------------|-------|--------------|
| A: Foundation (types + data) | 1, 2, 3 | None — run first |
| B: Cart System | 4, 5 | Depends on Task 1 (types) |
| C: Section Components | 6, 7 | Depends on Tasks 1, 2 (types + products lib) |
| D: Page Routes | 8, 9, 10, 11 | Depends on Tasks 1, 2, 4 (types + products + cart) |
| E: Preset + Integration | 12, 13 | Depends on Tasks 1, 6, 7 (types + sections) |
| F: Navbar Update | 14 | Depends on Task 4 (cart context) |

**Execution order:** A first, then B + C in parallel, then D + E + F in parallel.

---

## Task 1: Type Definitions + Config Schema

**Files:**
- Modify: `src/lib/types.ts`

- [ ] **Step 1: Add EcommerceConfig interface and update SiteConfig**

Add after line 167 (before `RemixMeta`):

```ts
export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  currency: string;
  category: string;
  images: string[];
  description: string;
  features?: string[];
  tags?: string[];
  inStock: boolean;
  variants?: ProductVariant[];
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ProductData {
  categories: Category[];
  products: Product[];
}

export interface EcommerceConfig {
  currency: string;
  currencySymbol: string;
  whatsappNumber: string;
  cartEnabled: boolean;
  showComparePrice: boolean;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}
```

- [ ] **Step 2: Add "ecommerce" to BusinessType union**

In the `BusinessType` type (line 1), add `"ecommerce"` to the union:

```ts
export type BusinessType =
  | "doctor"
  | "dentist"
  | "restaurant"
  | "salon"
  | "gym"
  | "realestate"
  | "lawyer"
  | "retail"
  | "hospital"
  | "vet"
  | "bakery"
  | "pharmacy"
  | "school"
  | "hotel"
  | "events"
  | "wedding"
  | "homeservice"
  | "auto"
  | "photographer"
  | "interiors"
  | "individual"
  | "nonprofit"
  | "worship"
  | "petshop"
  | "jewellery"
  | "printing"
  | "catering"
  | "wellness"
  | "diagnostics"
  | "construction"
  | "ecommerce"
  | "local";
```

- [ ] **Step 3: Add ecommerce field to SiteConfig interface**

Update the `SiteConfig` interface (around line 150) to add the optional `ecommerce` field:

```ts
export interface SiteConfig {
  business: BusinessConfig;
  theme: ThemeConfig;
  layout: {
    type: "single-page" | "multi-page";
    pages?: string[];
  };
  hero: HeroConfig;
  sections: SectionConfig[];
  seo: SEOConfig;
  animationTier: AnimationTier;
  locale?: string;
  locales?: string[];
  features?: {
    blog?: boolean;
    i18n?: boolean;
  };
  ecommerce?: EcommerceConfig;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/lib/types.ts
git commit -m "feat(ecommerce): add product, cart, and ecommerce config types"
```

---

## Task 2: Product Data Layer

**Files:**
- Create: `data/products.json`
- Create: `src/lib/products.ts`

- [ ] **Step 1: Create sample products.json**

Create `data/products.json` with sample data for testing:

```json
{
  "categories": [
    {
      "slug": "shirts",
      "name": "Shirts",
      "description": "Casual and formal shirts",
      "image": "/images/categories/shirts.jpg"
    },
    {
      "slug": "trousers",
      "name": "Trousers",
      "description": "Chinos, jeans, and formal trousers",
      "image": "/images/categories/trousers.jpg"
    },
    {
      "slug": "accessories",
      "name": "Accessories",
      "description": "Belts, watches, and more",
      "image": "/images/categories/accessories.jpg"
    }
  ],
  "products": [
    {
      "slug": "blue-linen-shirt",
      "name": "Blue Linen Shirt",
      "price": 1499,
      "comparePrice": 1999,
      "currency": "INR",
      "category": "shirts",
      "images": ["/images/products/blue-linen-shirt.jpg"],
      "description": "Lightweight linen shirt perfect for summer. Breathable fabric with a relaxed fit.",
      "features": ["100% linen", "Regular fit", "Machine washable"],
      "tags": ["featured", "bestseller"],
      "inStock": true,
      "variants": [
        { "name": "Size", "options": ["S", "M", "L", "XL"] },
        { "name": "Color", "options": ["Blue", "White", "Beige"] }
      ]
    },
    {
      "slug": "cotton-chinos",
      "name": "Cotton Chinos",
      "price": 1799,
      "currency": "INR",
      "category": "trousers",
      "images": ["/images/products/cotton-chinos.jpg"],
      "description": "Comfortable stretch cotton chinos with a modern slim fit.",
      "features": ["98% cotton, 2% elastane", "Slim fit", "4 pockets"],
      "tags": ["bestseller"],
      "inStock": true,
      "variants": [
        { "name": "Size", "options": ["30", "32", "34", "36"] },
        { "name": "Color", "options": ["Khaki", "Navy", "Olive"] }
      ]
    },
    {
      "slug": "leather-belt",
      "name": "Genuine Leather Belt",
      "price": 899,
      "comparePrice": 1299,
      "currency": "INR",
      "category": "accessories",
      "images": ["/images/products/leather-belt.jpg"],
      "description": "Full-grain leather belt with brushed metal buckle.",
      "features": ["Full-grain leather", "Brushed nickel buckle", "35mm width"],
      "tags": ["featured", "new"],
      "inStock": true,
      "variants": [
        { "name": "Size", "options": ["S", "M", "L"] }
      ]
    },
    {
      "slug": "white-oxford-shirt",
      "name": "White Oxford Shirt",
      "price": 1699,
      "currency": "INR",
      "category": "shirts",
      "images": ["/images/products/white-oxford.jpg"],
      "description": "Classic button-down oxford in crisp white. A wardrobe essential.",
      "features": ["100% cotton oxford", "Button-down collar", "Chest pocket"],
      "tags": ["new"],
      "inStock": true,
      "variants": [
        { "name": "Size", "options": ["S", "M", "L", "XL", "XXL"] }
      ]
    },
    {
      "slug": "canvas-tote",
      "name": "Canvas Tote Bag",
      "price": 599,
      "currency": "INR",
      "category": "accessories",
      "images": ["/images/products/canvas-tote.jpg"],
      "description": "Sturdy canvas tote with reinforced handles. Perfect for everyday use.",
      "features": ["Heavy-duty canvas", "Inner pocket", "Reinforced straps"],
      "tags": ["featured"],
      "inStock": true
    }
  ]
}
```

- [ ] **Step 2: Create product data reader**

Create `src/lib/products.ts`:

```ts
import type { Product, Category, ProductData } from "./types";
import productDataJson from "../../data/products.json";

const productData: ProductData = productDataJson as ProductData;

export function getProductData(): ProductData {
  return productData;
}

export function getProductBySlug(slug: string): Product | null {
  return productData.products.find((p) => p.slug === slug) ?? null;
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return productData.products.filter((p) => p.category === categorySlug);
}

export function getProductsByTag(tag: string): Product[] {
  return productData.products.filter((p) => p.tags?.includes(tag));
}

export function getCategoryBySlug(slug: string): Category | null {
  return productData.categories.find((c) => c.slug === slug) ?? null;
}

export function getAllSlugs(): string[] {
  return productData.products.map((p) => p.slug);
}

export function getAllCategorySlugs(): string[] {
  return productData.categories.map((c) => c.slug);
}

export function getProductCount(categorySlug: string): number {
  return productData.products.filter((p) => p.category === categorySlug).length;
}

export function formatPrice(price: number, currencySymbol: string): string {
  return `${currencySymbol} ${price.toLocaleString("en-IN")}`;
}
```

- [ ] **Step 3: Add resolveJsonModule to tsconfig if needed**

Check `tsconfig.json` — ensure `resolveJsonModule: true` is set so the JSON import works. If not present, add it under `compilerOptions`.

- [ ] **Step 4: Commit**

```bash
git add data/products.json src/lib/products.ts
git commit -m "feat(ecommerce): add product data layer and sample products"
```

---

## Task 3: Ecommerce Preset

**Files:**
- Create: `presets/ecommerce.ts`
- Modify: `presets/index.ts`

- [ ] **Step 1: Create ecommerce preset**

Create `presets/ecommerce.ts`:

```ts
import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function ecommercePreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "ecommerce",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "multi-page",
      pages: ["home", "products", "cart"],
    },
    hero: {
      style: "carousel",
      headline: "New Arrivals",
      subheadline: "Discover our latest collection, handpicked for you.",
      cta: { text: "Shop Now", url: "/products", variant: "primary" },
      secondaryCta: { text: "Best Sellers", url: "/products#bestsellers" },
    },
    ecommerce: {
      currency: "INR",
      currencySymbol: "Rs",
      whatsappNumber: "",
      cartEnabled: true,
      showComparePrice: true,
    },
    sections: [
      {
        type: "product-grid",
        variant: "grid-4",
        page: "home",
        content: {
          headline: "Featured",
          description: "Our top picks this season",
          filterTag: "featured",
          limit: 4,
          showPrice: true,
        },
      },
      {
        type: "product-categories",
        variant: "image-cards",
        page: "home",
        content: {
          headline: "Shop by Category",
          description: "Browse our collections",
        },
      },
      {
        type: "product-grid",
        variant: "grid-4",
        page: "home",
        content: {
          headline: "Best Sellers",
          description: "Most loved by our customers",
          filterTag: "bestseller",
          limit: 8,
          showPrice: true,
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        page: "home",
        content: {
          headline: "Happy Customers",
          items: [
            { name: "Priya M.", text: "Amazing quality and fast delivery. My go-to store now!", rating: 5 },
            { name: "Rahul K.", text: "Love the collection. WhatsApp ordering is so convenient.", rating: 5 },
            { name: "Sneha R.", text: "Great products at honest prices. Highly recommend.", rating: 5 },
          ],
        },
      },
      {
        type: "contact",
        variant: "simple",
        page: "home",
        content: {
          headline: "Get in Touch",
          description: "Questions about an order? Reach out anytime.",
        },
      },
    ],
    seo: {
      title: "Online Store | Shop Our Collection",
      description: "Shop our curated collection of premium products online. Fast delivery, easy returns.",
    },
    animationTier: "standard",
  };
}

export const ecommerceRemixMeta: RemixMeta = {
  compatibleThemes: [
    "luxe-commerce",
    "cobalt-product",
    "minimal-concrete",
    "kraft-paper",
    "sand-dune",
    "pastel-pop",
    "tailwind-base",
  ],
  compatibleHeros: ["carousel", "image-bg", "split-image", "gradient"],
  sectionVariants: {
    "product-grid": ["grid-3", "grid-4", "carousel"],
    "product-categories": ["image-cards", "minimal-list"],
    testimonials: ["carousel", "simple-grid"],
    contact: ["simple", "split-map"],
  },
};
```

- [ ] **Step 2: Register in presets/index.ts**

Add import and register in the preset map. Follow the pattern of existing presets:

```ts
import { ecommercePreset, ecommerceRemixMeta } from "./ecommerce";
```

Add to the preset map object:
```ts
ecommerce: ecommercePreset,
```

Add to the remix meta map:
```ts
ecommerce: ecommerceRemixMeta,
```

- [ ] **Step 3: Commit**

```bash
git add presets/ecommerce.ts presets/index.ts
git commit -m "feat(ecommerce): add ecommerce preset with remix meta"
```

---

## Task 4: Cart Context + Provider

**Files:**
- Create: `src/lib/cart-context.tsx`
- Create: `src/components/ecommerce/CartProvider.tsx`

- [ ] **Step 1: Create cart context**

Create `src/lib/cart-context.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { CartItem } from "./types";

interface CartContextValue {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (slug: string, variants?: Record<string, string>) => void;
  updateQuantity: (slug: string, quantity: number, variants?: Record<string, string>) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "template-hub-cart";

function getItemKey(slug: string, variants?: Record<string, string>): string {
  if (!variants || Object.keys(variants).length === 0) return slug;
  const sorted = Object.entries(variants).sort(([a], [b]) => a.localeCompare(b));
  return `${slug}::${sorted.map(([k, v]) => `${k}=${v}`).join(",")}`;
}

function matchesItem(item: CartItem, slug: string, variants?: Record<string, string>): boolean {
  return getItemKey(item.slug, item.selectedVariants) === getItemKey(slug, variants);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const addItem = useCallback((item: CartItem) => {
    setItems((prev) => {
      const existing = prev.find((i) => matchesItem(i, item.slug, item.selectedVariants));
      if (existing) {
        return prev.map((i) =>
          matchesItem(i, item.slug, item.selectedVariants)
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((slug: string, variants?: Record<string, string>) => {
    setItems((prev) => prev.filter((i) => !matchesItem(i, slug, variants)));
  }, []);

  const updateQuantity = useCallback(
    (slug: string, quantity: number, variants?: Record<string, string>) => {
      if (quantity <= 0) {
        removeItem(slug, variants);
        return;
      }
      setItems((prev) =>
        prev.map((i) => (matchesItem(i, slug, variants) ? { ...i, quantity } : i))
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
```

- [ ] **Step 2: Create CartProvider wrapper component**

Create `src/components/ecommerce/CartProvider.tsx`:

```tsx
"use client";

import { CartProvider as CartContextProvider } from "@/lib/cart-context";

export default function CartProvider({ children }: { children: React.ReactNode }) {
  return <CartContextProvider>{children}</CartContextProvider>;
}
```

- [ ] **Step 3: Wrap layout with CartProvider**

Modify `src/app/layout.tsx`. Import the CartProvider and wrap `{children}` in body:

```tsx
import CartProvider from "@/components/ecommerce/CartProvider";
```

Update the body:
```tsx
<body>
  <CartProvider>{children}</CartProvider>
</body>
```

Note: CartProvider is a `"use client"` component, but wrapping children in a client component is fine — children remain server components.

- [ ] **Step 4: Commit**

```bash
git add src/lib/cart-context.tsx src/components/ecommerce/CartProvider.tsx src/app/layout.tsx
git commit -m "feat(ecommerce): add cart context with localStorage persistence"
```

---

## Task 5: Shared Ecommerce UI Components

**Files:**
- Create: `src/components/ecommerce/PriceDisplay.tsx`
- Create: `src/components/ecommerce/VariantSelector.tsx`
- Create: `src/components/ecommerce/AddToCartButton.tsx`
- Create: `src/components/ecommerce/ProductCard.tsx`
- Create: `src/components/ecommerce/ProductImageGallery.tsx`
- Create: `src/components/ecommerce/WhatsAppCheckout.tsx`
- Create: `src/components/ecommerce/CartIcon.tsx`

- [ ] **Step 1: Create PriceDisplay**

Create `src/components/ecommerce/PriceDisplay.tsx`:

```tsx
interface PriceDisplayProps {
  price: number;
  comparePrice?: number;
  currencySymbol: string;
  showCompare?: boolean;
}

export default function PriceDisplay({ price, comparePrice, currencySymbol, showCompare = true }: PriceDisplayProps) {
  const formatted = `${currencySymbol} ${price.toLocaleString("en-IN")}`;

  return (
    <div className="flex items-baseline gap-2">
      <span className="text-lg font-semibold text-[var(--color-primary)]">{formatted}</span>
      {showCompare && comparePrice && comparePrice > price && (
        <span className="text-sm text-[var(--color-neutral)]/60 line-through">
          {currencySymbol} {comparePrice.toLocaleString("en-IN")}
        </span>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Create VariantSelector**

Create `src/components/ecommerce/VariantSelector.tsx`:

```tsx
"use client";

import type { ProductVariant } from "@/lib/types";

interface VariantSelectorProps {
  variants: ProductVariant[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export default function VariantSelector({ variants, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      {variants.map((variant) => (
        <div key={variant.name}>
          <label className="mb-2 block text-sm font-medium text-foreground">
            {variant.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {variant.options.map((option) => {
              const isSelected = selected[variant.name] === option;
              return (
                <button
                  key={option}
                  onClick={() => onChange(variant.name, option)}
                  className={`rounded-[var(--radius-md)] border px-3 py-1.5 text-sm transition-colors ${
                    isSelected
                      ? "border-[var(--color-primary)] bg-[var(--color-primary)]/10 text-[var(--color-primary)]"
                      : "border-[var(--color-neutral)]/20 text-foreground hover:border-[var(--color-primary)]/50"
                  }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Create AddToCartButton**

Create `src/components/ecommerce/AddToCartButton.tsx`:

```tsx
"use client";

import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import type { Product } from "@/lib/types";

interface AddToCartButtonProps {
  product: Product;
  selectedVariants?: Record<string, string>;
  quantity?: number;
}

export default function AddToCartButton({ product, selectedVariants, quantity = 1 }: AddToCartButtonProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    if (!product.inStock) return;

    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.jpg",
      quantity,
      selectedVariants,
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  if (!product.inStock) {
    return (
      <button
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-neutral)]/20 px-6 py-3 text-sm font-medium text-[var(--color-neutral)]/60"
      >
        Out of Stock
      </button>
    );
  }

  return (
    <button
      onClick={handleAdd}
      className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-[var(--color-primary)] px-6 py-3 text-sm font-medium text-[var(--color-on-primary)] transition-transform active:scale-95"
    >
      {added ? (
        <>
          <Check size={16} /> Added
        </>
      ) : (
        <>
          <ShoppingCart size={16} /> Add to Cart
        </>
      )}
    </button>
  );
}
```

- [ ] **Step 4: Create ProductCard**

Create `src/components/ecommerce/ProductCard.tsx`:

```tsx
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import PriceDisplay from "./PriceDisplay";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  currencySymbol: string;
  showComparePrice?: boolean;
}

export default function ProductCard({ product, currencySymbol, showComparePrice = true }: ProductCardProps) {
  const { addItem } = useCart();

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!product.inStock) return;
    addItem({
      slug: product.slug,
      name: product.name,
      price: product.price,
      image: product.images[0] ?? "/images/placeholder.jpg",
      quantity: 1,
    });
  }

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group overflow-hidden rounded-[var(--radius-md)] border border-[var(--color-neutral)]/10 bg-[var(--color-surface)] transition-shadow hover:shadow-lg"
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.images[0] ?? "/images/placeholder.jpg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-white px-3 py-1 text-xs font-medium">Out of Stock</span>
          </div>
        )}
        {product.inStock && (
          <button
            onClick={handleQuickAdd}
            className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-on-primary)] opacity-0 shadow-md transition-opacity group-hover:opacity-100"
            aria-label="Add to cart"
          >
            <ShoppingCart size={16} />
          </button>
        )}
        {product.comparePrice && product.comparePrice > product.price && (
          <span className="absolute left-3 top-3 rounded-full bg-red-500 px-2 py-0.5 text-xs font-medium text-white">
            {Math.round(((product.comparePrice - product.price) / product.comparePrice) * 100)}% OFF
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-[var(--color-neutral)]/60 uppercase tracking-wide">{product.category}</p>
        <h3 className="mt-1 font-medium text-foreground line-clamp-1">{product.name}</h3>
        <div className="mt-2">
          <PriceDisplay
            price={product.price}
            comparePrice={product.comparePrice}
            currencySymbol={currencySymbol}
            showCompare={showComparePrice}
          />
        </div>
      </div>
    </Link>
  );
}
```

- [ ] **Step 5: Create ProductImageGallery**

Create `src/components/ecommerce/ProductImageGallery.tsx`:

```tsx
"use client";

import { useState } from "react";

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

export default function ProductImageGallery({ images, productName }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const displayImages = images.length > 0 ? images : ["/images/placeholder.jpg"];

  return (
    <div className="flex flex-col gap-4">
      <div className="aspect-square overflow-hidden rounded-[var(--radius-lg)] bg-[var(--color-neutral)]/5">
        <img
          src={displayImages[activeIndex]}
          alt={`${productName} - Image ${activeIndex + 1}`}
          className="h-full w-full object-cover"
        />
      </div>
      {displayImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto">
          {displayImages.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              className={`h-16 w-16 flex-shrink-0 overflow-hidden rounded-[var(--radius-sm)] border-2 transition-colors ${
                i === activeIndex
                  ? "border-[var(--color-primary)]"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 6: Create WhatsAppCheckout**

Create `src/components/ecommerce/WhatsAppCheckout.tsx`:

```tsx
"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useCart } from "@/lib/cart-context";

interface WhatsAppCheckoutProps {
  whatsappNumber: string;
  currencySymbol: string;
}

export default function WhatsAppCheckout({ whatsappNumber, currencySymbol }: WhatsAppCheckoutProps) {
  const { items, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");

  function buildMessage(): string {
    const lines = items.map((item, i) => {
      const variantStr = item.selectedVariants
        ? ` (${Object.entries(item.selectedVariants).map(([k, v]) => `${k}: ${v}`).join(", ")})`
        : "";
      const lineTotal = item.price * item.quantity;
      return `${i + 1}. ${item.name}${variantStr} x ${item.quantity} — ${currencySymbol} ${lineTotal.toLocaleString("en-IN")}`;
    });

    let msg = `Hi, I'd like to order:\n\n${lines.join("\n")}\n\nTotal: ${currencySymbol} ${totalPrice.toLocaleString("en-IN")}`;
    if (customerName.trim()) {
      msg += `\n\nName: ${customerName.trim()}`;
    }

    // Truncate if more than 20 items
    if (items.length > 20) {
      const shown = lines.slice(0, 20).join("\n");
      msg = `Hi, I'd like to order:\n\n${shown}\n...and ${items.length - 20} more items\n\nTotal: ${currencySymbol} ${totalPrice.toLocaleString("en-IN")}`;
      if (customerName.trim()) msg += `\n\nName: ${customerName.trim()}`;
    }

    return encodeURIComponent(msg);
  }

  function handleOrder() {
    const message = buildMessage();
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, "_blank");
  }

  const canOrder = items.length > 0 && whatsappNumber;

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="customer-name" className="mb-1 block text-sm font-medium text-foreground">
          Your Name
        </label>
        <input
          id="customer-name"
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          className="w-full rounded-[var(--radius-md)] border border-[var(--color-neutral)]/20 bg-[var(--color-surface)] px-4 py-2.5 text-sm text-foreground placeholder:text-[var(--color-neutral)]/40 focus:border-[var(--color-primary)] focus:outline-none"
        />
      </div>
      <button
        onClick={handleOrder}
        disabled={!canOrder}
        className="flex w-full items-center justify-center gap-2 rounded-[var(--radius-md)] bg-green-600 px-6 py-3 text-sm font-medium text-white transition-opacity hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <MessageCircle size={18} />
        Order via WhatsApp
      </button>
    </div>
  );
}
```

- [ ] **Step 7: Create CartIcon**

Create `src/components/ecommerce/CartIcon.tsx`:

```tsx
"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart-context";

export default function CartIcon() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative flex items-center justify-center rounded-full p-2 text-foreground transition-colors hover:bg-[var(--color-neutral)]/10"
      aria-label={`Cart (${totalItems} items)`}
    >
      <ShoppingCart size={20} />
      {totalItems > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-primary)] text-[10px] font-bold text-[var(--color-on-primary)]">
          {totalItems > 9 ? "9+" : totalItems}
        </span>
      )}
    </Link>
  );
}
```

- [ ] **Step 8: Commit**

```bash
git add src/components/ecommerce/
git commit -m "feat(ecommerce): add shared UI components (card, price, variants, cart icon, whatsapp)"
```

---

## Task 6: ProductGrid Section Component

**Files:**
- Create: `src/components/sections/ProductGrid/index.tsx`
- Create: `src/components/sections/ProductGrid/Grid3.tsx`
- Create: `src/components/sections/ProductGrid/Grid4.tsx`
- Create: `src/components/sections/ProductGrid/Carousel.tsx`
- Modify: `src/lib/section-renderer.tsx`

- [ ] **Step 1: Create Grid4 variant**

Create `src/components/sections/ProductGrid/Grid4.tsx`:

```tsx
"use client";

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

export default function Grid4({ content }: { content: ProductGridContent }) {
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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              currencySymbol={currencySymbol}
              showComparePrice={showCompare}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create Grid3 variant**

Create `src/components/sections/ProductGrid/Grid3.tsx`:

```tsx
"use client";

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

export default function Grid3({ content }: { content: ProductGridContent }) {
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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
        </div>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              currencySymbol={currencySymbol}
              showComparePrice={showCompare}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Create Carousel variant**

Create `src/components/sections/ProductGrid/Carousel.tsx`:

```tsx
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

export default function Carousel({ content }: { content: ProductGridContent }) {
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
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
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
```

- [ ] **Step 4: Create index router**

Create `src/components/sections/ProductGrid/index.tsx`:

```tsx
import Grid3 from "./Grid3";
import Grid4 from "./Grid4";
import Carousel from "./Carousel";

export default function ProductGrid({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "grid-3":
      return <Grid3 content={content as any} />;
    case "grid-4":
      return <Grid4 content={content as any} />;
    case "carousel":
      return <Carousel content={content as any} />;
    default:
      return <Grid4 content={content as any} />;
  }
}
```

- [ ] **Step 5: Register in section-renderer.tsx**

Add import at the top of `src/lib/section-renderer.tsx`:
```ts
import ProductGrid from "@/components/sections/ProductGrid";
```

Add to `SECTION_MAP`:
```ts
"product-grid": ProductGrid,
```

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/ProductGrid/ src/lib/section-renderer.tsx
git commit -m "feat(ecommerce): add ProductGrid section with grid-3, grid-4, carousel variants"
```

---

## Task 7: ProductCategories Section Component

**Files:**
- Create: `src/components/sections/ProductCategories/index.tsx`
- Create: `src/components/sections/ProductCategories/ImageCards.tsx`
- Create: `src/components/sections/ProductCategories/MinimalList.tsx`
- Modify: `src/lib/section-renderer.tsx`

- [ ] **Step 1: Create ImageCards variant**

Create `src/components/sections/ProductCategories/ImageCards.tsx`:

```tsx
import Link from "next/link";
import { getProductData, getProductCount } from "@/lib/products";

interface ProductCategoriesContent {
  headline: string;
  description?: string;
}

export default function ImageCards({ content }: { content: ProductCategoriesContent }) {
  const { categories } = getProductData();

  if (categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            {content.headline}
          </h2>
          {content.description && (
            <p className="mt-3 text-[var(--color-neutral)]/70">{content.description}</p>
          )}
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
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="text-sm text-white/70">{getProductCount(category.slug)} products</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Create MinimalList variant**

Create `src/components/sections/ProductCategories/MinimalList.tsx`:

```tsx
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getProductData, getProductCount } from "@/lib/products";

interface ProductCategoriesContent {
  headline: string;
  description?: string;
}

export default function MinimalList({ content }: { content: ProductCategoriesContent }) {
  const { categories } = getProductData();

  if (categories.length === 0) return null;

  return (
    <section className="py-16 md:py-24">
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
```

- [ ] **Step 3: Create index router**

Create `src/components/sections/ProductCategories/index.tsx`:

```tsx
import ImageCards from "./ImageCards";
import MinimalList from "./MinimalList";

export default function ProductCategories({ content, variant }: { content: Record<string, unknown>; variant: string }) {
  switch (variant) {
    case "image-cards":
      return <ImageCards content={content as any} />;
    case "minimal-list":
      return <MinimalList content={content as any} />;
    default:
      return <ImageCards content={content as any} />;
  }
}
```

- [ ] **Step 4: Register in section-renderer.tsx**

Add import:
```ts
import ProductCategories from "@/components/sections/ProductCategories";
```

Add to `SECTION_MAP`:
```ts
"product-categories": ProductCategories,
```

- [ ] **Step 5: Commit**

```bash
git add src/components/sections/ProductCategories/ src/lib/section-renderer.tsx
git commit -m "feat(ecommerce): add ProductCategories section with image-cards and minimal-list variants"
```

---

## Task 8: Products Listing Page (`/products`)

**Files:**
- Create: `src/app/products/page.tsx`

- [ ] **Step 1: Create products listing page**

Create `src/app/products/page.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import { getProductData } from "@/lib/products";
import { getConfig } from "@/lib/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ecommerce/ProductCard";

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
      />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-foreground">
              All Products
            </h1>
            <p className="mt-2 text-[var(--color-neutral)]/70">
              {filtered.length} product{filtered.length !== 1 ? "s" : ""}
            </p>
          </div>

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

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-[var(--radius-md)] border border-[var(--color-neutral)]/20 bg-[var(--color-surface)] px-3 py-2 text-sm text-foreground"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
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
        </div>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/products/page.tsx
git commit -m "feat(ecommerce): add products listing page with category filter and sort"
```

---

## Task 9: Product Detail Page (`/products/[slug]`)

**Files:**
- Create: `src/app/products/[slug]/page.tsx`

- [ ] **Step 1: Create product detail page**

Create `src/app/products/[slug]/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { getProductBySlug, getProductsByCategory } from "@/lib/products";
import { getConfig } from "@/lib/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductImageGallery from "@/components/ecommerce/ProductImageGallery";
import PriceDisplay from "@/components/ecommerce/PriceDisplay";
import VariantSelector from "@/components/ecommerce/VariantSelector";
import AddToCartButton from "@/components/ecommerce/AddToCartButton";
import ProductCard from "@/components/ecommerce/ProductCard";

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const config = getConfig();
  const ecommerce = config.ecommerce;
  const currencySymbol = ecommerce?.currencySymbol ?? "Rs";
  const showCompare = ecommerce?.showComparePrice ?? true;
  const whatsappNumber = ecommerce?.whatsappNumber ?? "";

  const product = getProductBySlug(slug);

  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    if (!product?.variants) return {};
    const defaults: Record<string, string> = {};
    product.variants.forEach((v) => {
      if (v.options.length > 0) defaults[v.name] = v.options[0];
    });
    return defaults;
  });

  if (!product) {
    return (
      <>
        <Navbar
          businessName={config.business.name}
          logo={config.business.logo}
          sections={config.sections}
          heroCta={config.hero.cta}
          layout={config.layout}
          currentPage="products"
        />
        <main className="flex min-h-screen items-center justify-center pt-20">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
            <Link href="/products" className="mt-4 inline-block text-[var(--color-primary)] hover:underline">
              Back to Products
            </Link>
          </div>
        </main>
        <Footer business={config.business} sections={config.sections} />
      </>
    );
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

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
      />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-1 text-sm text-[var(--color-neutral)]/60 hover:text-foreground"
          >
            <ArrowLeft size={14} /> Back to Products
          </Link>

          <div className="grid gap-12 lg:grid-cols-2">
            <ProductImageGallery images={product.images} productName={product.name} />

            <div className="flex flex-col gap-6">
              <div>
                <p className="text-sm uppercase tracking-wide text-[var(--color-neutral)]/60">
                  {product.category}
                </p>
                <h1 className="mt-1 font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
                  {product.name}
                </h1>
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
        </div>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
```

- [ ] **Step 2: Add generateStaticParams for static export**

Since this uses `"use client"` with `useParams`, for static export we need a separate approach. Create a wrapper with `generateStaticParams`:

Actually, for static export with dynamic routes, we need a server component with `generateStaticParams`. Refactor: make the page a server component that passes product data as props to a client component.

Create `src/app/products/[slug]/page.tsx` as:

```tsx
import { getAllSlugs, getProductBySlug, getProductsByCategory } from "@/lib/products";
import { getConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import ProductDetailClient from "./client";

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const config = getConfig();
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <ProductDetailClient
      product={product}
      related={related}
      config={config}
    />
  );
}
```

Then create `src/app/products/[slug]/client.tsx` with the full client component (the `"use client"` version above, but receiving `product`, `related`, and `config` as props instead of reading them internally).

- [ ] **Step 3: Commit**

```bash
git add src/app/products/
git commit -m "feat(ecommerce): add product detail page with gallery, variants, add-to-cart"
```

---

## Task 10: Category Page (`/category/[slug]`)

**Files:**
- Create: `src/app/category/[slug]/page.tsx`

- [ ] **Step 1: Create category page**

Create `src/app/category/[slug]/page.tsx`:

```tsx
import { getAllCategorySlugs, getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { getConfig } from "@/lib/config";
import { notFound } from "next/navigation";
import CategoryClient from "./client";

export async function generateStaticParams() {
  return getAllCategorySlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) notFound();

  const products = getProductsByCategory(slug);
  const config = getConfig();

  return <CategoryClient category={category} products={products} config={config} />;
}
```

Create `src/app/category/[slug]/client.tsx`:

```tsx
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard from "@/components/ecommerce/ProductCard";
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
      />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-1 text-sm text-[var(--color-neutral)]/60 hover:text-foreground"
          >
            <ArrowLeft size={14} /> All Products
          </Link>

          <div className="mb-8">
            {category.image && (
              <div className="mb-6 h-48 overflow-hidden rounded-[var(--radius-lg)]">
                <img src={category.image} alt={category.name} className="h-full w-full object-cover" />
              </div>
            )}
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold text-foreground">
              {category.name}
            </h1>
            {category.description && (
              <p className="mt-2 text-[var(--color-neutral)]/70">{category.description}</p>
            )}
            <p className="mt-1 text-sm text-[var(--color-neutral)]/50">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="mb-6 flex justify-end">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="rounded-[var(--radius-md)] border border-[var(--color-neutral)]/20 bg-[var(--color-surface)] px-3 py-2 text-sm text-foreground"
            >
              <option value="default">Sort by</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </div>

          {sorted.length === 0 ? (
            <div className="py-20 text-center">
              <p className="text-lg text-[var(--color-neutral)]/60">No products in this category yet.</p>
            </div>
          ) : (
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
          )}
        </div>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/category/
git commit -m "feat(ecommerce): add category page with sort"
```

---

## Task 11: Cart Page (`/cart`)

**Files:**
- Create: `src/app/cart/page.tsx`

- [ ] **Step 1: Create cart page**

Create `src/app/cart/page.tsx`:

```tsx
"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { getConfig } from "@/lib/config";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
      />
      <main className="min-h-screen pt-20">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="font-[family-name:var(--font-display)] text-3xl font-bold text-foreground">
            Your Cart
          </h1>

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
        </div>
      </main>
      <Footer business={config.business} sections={config.sections} />
    </>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/cart/page.tsx
git commit -m "feat(ecommerce): add cart page with WhatsApp checkout"
```

---

## Task 12: Static Export Configuration for Ecommerce Routes

**Files:**
- Modify: `src/app/products/page.tsx` (if needed for static export)

- [ ] **Step 1: Verify static export compatibility**

The `/products` page uses `"use client"` — this is fine for static export since it renders client-side.

The `/products/[slug]` and `/category/[slug]` pages use `generateStaticParams()` — this ensures all dynamic routes are pre-rendered at build time.

The `/cart` page is `"use client"` — fine for static export.

No changes to `next.config.ts` needed. Run build to verify:

```bash
pnpm build
```

Expected: successful build with all product and category pages generated.

- [ ] **Step 2: Fix any build errors**

If the build fails due to JSON import, ensure `tsconfig.json` has:
```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "esModuleInterop": true
  }
}
```

- [ ] **Step 3: Commit any fixes**

```bash
git add -A
git commit -m "fix(ecommerce): ensure static export compatibility for all ecommerce routes"
```

---

## Task 13: Sample Ecommerce Site Config

**Files:**
- Create: `examples/ecommerce-site.config.ts`

- [ ] **Step 1: Create example config**

Create `examples/ecommerce-site.config.ts`:

```ts
import type { SiteConfig } from "../src/lib/types";

const config: SiteConfig = {
  business: {
    type: "ecommerce",
    name: "Thread & Co",
    tagline: "Premium menswear, curated for you",
    description: "Thread & Co is a premium menswear store offering curated shirts, trousers, and accessories. Quality fabrics, modern fits, honest prices.",
    phone: "+91 98765 43210",
    email: "hello@threadandco.in",
    address: "42, MG Road, Indiranagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560038",
    socialLinks: {
      instagram: "https://instagram.com/threadandco",
      whatsapp: "https://wa.me/919876543210",
    },
    hours: {
      Monday: { open: "10:00", close: "21:00" },
      Tuesday: { open: "10:00", close: "21:00" },
      Wednesday: { open: "10:00", close: "21:00" },
      Thursday: { open: "10:00", close: "21:00" },
      Friday: { open: "10:00", close: "22:00" },
      Saturday: { open: "10:00", close: "22:00" },
      Sunday: { open: "11:00", close: "20:00" },
    },
  },

  theme: {
    designMd: "kraft-paper",
    mode: "light",
  },

  layout: {
    type: "multi-page",
    pages: ["home", "products", "cart"],
  },

  hero: {
    style: "carousel",
    headline: "New Arrivals",
    subheadline: "Discover our latest collection of premium menswear. Quality fabrics, modern fits.",
    cta: { text: "Shop Now", url: "/products", variant: "primary" },
    secondaryCta: { text: "Best Sellers", url: "/products" },
  },

  ecommerce: {
    currency: "INR",
    currencySymbol: "Rs",
    whatsappNumber: "919876543210",
    cartEnabled: true,
    showComparePrice: true,
  },

  sections: [
    {
      type: "product-grid",
      variant: "grid-4",
      page: "home",
      content: {
        headline: "Featured",
        description: "Our top picks this season",
        filterTag: "featured",
        limit: 4,
        showPrice: true,
      },
    },
    {
      type: "product-categories",
      variant: "image-cards",
      page: "home",
      content: {
        headline: "Shop by Category",
        description: "Browse our collections",
      },
    },
    {
      type: "product-grid",
      variant: "grid-4",
      page: "home",
      content: {
        headline: "Best Sellers",
        description: "Most loved by our customers",
        filterTag: "bestseller",
        limit: 8,
        showPrice: true,
      },
    },
    {
      type: "testimonials",
      variant: "carousel",
      page: "home",
      content: {
        headline: "Happy Customers",
        items: [
          { name: "Priya M.", text: "Amazing quality shirts. The linen collection is perfect for Bangalore weather.", rating: 5 },
          { name: "Rahul K.", text: "Best menswear store in the city. WhatsApp ordering is so convenient.", rating: 5 },
          { name: "Arjun S.", text: "Love the curated collection. Everything fits perfectly.", rating: 5 },
        ],
      },
    },
    {
      type: "contact",
      variant: "simple",
      page: "home",
      content: {
        headline: "Visit Us",
        description: "Drop by our store in Indiranagar or reach out on WhatsApp for any queries.",
      },
    },
  ],

  seo: {
    title: "Thread & Co | Premium Menswear in Bangalore",
    description: "Shop premium menswear — shirts, trousers, and accessories. Quality fabrics, modern fits, honest prices. Visit our Bangalore store or order via WhatsApp.",
    keywords: ["menswear", "shirts", "bangalore", "premium clothing", "online store"],
  },

  animationTier: "standard",
};

export default config;
```

- [ ] **Step 2: Commit**

```bash
git add examples/ecommerce-site.config.ts
git commit -m "feat(ecommerce): add example ecommerce site config"
```

---

## Task 14: Navbar Cart Icon Integration

**Files:**
- Modify: `src/components/layout/Navbar/index.tsx`

- [ ] **Step 1: Add CartIcon to Navbar**

Import CartIcon and add it to the navbar, conditionally rendered when ecommerce config exists:

Add import at top:
```tsx
import CartIcon from "@/components/ecommerce/CartIcon";
```

Add the `ecommerce` prop to `NavbarProps`:
```tsx
interface NavbarProps {
  businessName: string;
  logo?: string;
  sections: SectionConfig[];
  heroCta?: { text: string; url: string };
  layout?: { type: "single-page" | "multi-page"; pages?: string[] };
  currentPage?: string;
  showCart?: boolean;
}
```

In the JSX, add `CartIcon` next to the CTA button (or in the nav actions area):
```tsx
{showCart && <CartIcon />}
```

- [ ] **Step 2: Pass showCart from page components**

In each ecommerce page (products, product detail, category, cart, and the home page when ecommerce config is present), pass `showCart={!!config.ecommerce?.cartEnabled}` to the Navbar.

Also update `src/app/[page]/page.tsx` to pass `showCart`:
```tsx
<Navbar
  businessName={config.business.name}
  logo={config.business.logo}
  sections={config.sections}
  heroCta={config.hero.cta}
  layout={config.layout}
  currentPage={page}
  showCart={!!config.ecommerce?.cartEnabled}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/layout/Navbar/index.tsx src/app/
git commit -m "feat(ecommerce): add cart icon to navbar for ecommerce sites"
```

---

## Verification

After all tasks are complete:

- [ ] **Run build:** `pnpm build` — must succeed with static export generating all product/category pages
- [ ] **Run dev:** `pnpm dev` — navigate to `/products`, `/products/blue-linen-shirt`, `/category/shirts`, `/cart`
- [ ] **Test cart flow:** Add items, verify localStorage persistence, verify WhatsApp link generation
- [ ] **Test with ecommerce config:** Copy `examples/ecommerce-site.config.ts` to `site.config.ts` and rebuild
- [ ] **Test with non-ecommerce config:** Verify existing salon config still works (no regressions)

# Ecommerce Store Support — Design Spec

## Overview

Add ecommerce store capability to template-hub. Stores have 20–30 products managed via a JSON file, multi-page routing, client-side cart, and WhatsApp-based checkout. Fully static export preserved.

## Data Layer

### Product Data File: `data/products.json`

```jsonc
{
  "categories": [
    {
      "slug": "men",
      "name": "Men",
      "description": "Men's clothing and accessories",
      "image": "/images/categories/men.jpg"
    }
  ],
  "products": [
    {
      "slug": "blue-linen-shirt",
      "name": "Blue Linen Shirt",
      "price": 1499,
      "comparePrice": 1999,
      "currency": "INR",
      "category": "men",
      "images": ["/images/products/blue-linen-shirt-1.jpg"],
      "description": "Lightweight linen shirt for summer.",
      "features": ["100% linen", "Regular fit", "Machine washable"],
      "tags": ["bestseller", "featured"],
      "inStock": true,
      "variants": [
        { "name": "Size", "options": ["S", "M", "L", "XL"] },
        { "name": "Color", "options": ["Blue", "White"] }
      ]
    }
  ]
}
```

**Design decisions:**
- Tags (`bestseller`, `featured`, `new`) drive section filtering. No separate "featured products" list needed.
- `comparePrice` is optional — when present, UI shows strikethrough original + current price.
- `variants` is optional — when absent, product has no variant selector.
- `currency` per-product allows mixed-currency stores (edge case), but default comes from `ecommerce.currency` in config.
- Images array supports multiple product photos (gallery/carousel on detail page).

### Product Data Reader: `src/lib/products.ts`

```ts
interface Product {
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
  variants?: { name: string; options: string[] }[];
}

interface Category {
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

interface ProductData {
  categories: Category[];
  products: Product[];
}

// Functions:
getProductData(): ProductData
getProductBySlug(slug: string): Product | null
getProductsByCategory(categorySlug: string): Product[]
getProductsByTag(tag: string): Product[]
getCategoryBySlug(slug: string): Category | null
getAllSlugs(): string[]
getAllCategorySlugs(): string[]
```

Reads and parses `data/products.json` at build time. Memoized for the build process.

## Page Routes

### `/products/page.tsx` — All Products

- Grid of product cards
- Client-side category filter (tabs or sidebar)
- Sort dropdown (price low-high, high-low, newest)
- Uses `generateStaticParams` — not needed (it's a static index page)

### `/products/[slug]/page.tsx` — Product Detail

- Image gallery (main + thumbnails)
- Product name, price, compare price
- Description + features list
- Variant selectors (dropdowns or button groups)
- "Add to Cart" button
- "Buy via WhatsApp" direct link (skips cart)
- Related products (same category, max 4)
- `generateStaticParams()` reads all product slugs from JSON

### `/category/[slug]/page.tsx` — Category Page

- Category header (name + description + image)
- Product grid filtered to that category
- `generateStaticParams()` reads all category slugs from JSON

### `/cart/page.tsx` — Cart + WhatsApp Checkout

- Line items with image, name, variant, quantity, price
- Quantity increment/decrement + remove
- Order total
- Customer name input field
- "Order via WhatsApp" button → opens `wa.me/{number}?text={encoded_message}`
- Empty cart state with "Continue Shopping" link

**WhatsApp message format:**
```
Hi, I'd like to order:

1. Blue Linen Shirt (Size: M) x 2 — Rs 2,998
2. Cotton Chinos (Size: L) x 1 — Rs 1,799

Total: Rs 4,797

Name: {customer_name}
```

## Cart System

### `src/lib/cart-context.tsx`

React context + provider wrapping the app layout.

```ts
interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>; // { "Size": "M", "Color": "Blue" }
}

interface CartContext {
  items: CartItem[];
  addItem(item: CartItem): void;
  removeItem(slug: string, variants?: Record<string, string>): void;
  updateQuantity(slug: string, quantity: number, variants?: Record<string, string>): void;
  clearCart(): void;
  totalItems: number;
  totalPrice: number;
}
```

**Storage:** `localStorage` key `template-hub-cart`. Hydrated on mount (avoids SSR mismatch with `"use client"` boundary).

**Cart icon:** Floating badge on navbar showing `totalItems`. Links to `/cart`.

## New Section Types

### `product-grid`

Renders a grid of product cards. Configured via content:

```ts
content: {
  headline: "Best Sellers",
  description?: "Our most popular items",
  filterTag: "bestseller",  // or "featured", "new", "all"
  limit?: 8,
  showPrice: true,
  columns?: 3 | 4
}
```

Product card shows: image, name, price (with compare), category badge, "Add to Cart" button.

Variants: `grid-3`, `grid-4`, `carousel`.

### `product-categories`

Grid of category cards linking to `/category/[slug]`.

```ts
content: {
  headline: "Shop by Category",
  description?: "Browse our collections",
  layout?: "grid" | "scroll"
}
```

Card shows: category image, name, product count.

Variants: `image-cards`, `minimal-list`.

### `product-hero`

Hero variant showcasing a featured product or collection. Used as an alternative to standard hero styles for ecommerce homepages.

```ts
// HeroConfig with style: "product"
hero: {
  style: "product",
  headline: "Summer Collection 2026",
  subheadline: "Lightweight fabrics for the season",
  cta: { text: "Shop Now", url: "/products", variant: "primary" },
  image: "/images/hero-product.jpg",
  featuredProduct?: "blue-linen-shirt"  // optional: shows product card overlay
}
```

## Config Changes

### `SiteConfig` type additions

```ts
export interface EcommerceConfig {
  currency: string;           // "INR", "USD", etc.
  currencySymbol: string;     // "Rs", "$", etc.
  whatsappNumber: string;     // "919876543210" (no + prefix)
  cartEnabled: boolean;       // false = catalog-only mode
  showComparePrice: boolean;  // show strikethrough pricing
}

// Added to SiteConfig:
export interface SiteConfig {
  // ... existing fields ...
  ecommerce?: EcommerceConfig;
}
```

### `BusinessType` addition

Add `"ecommerce"` to the union type.

### Layout config

Ecommerce preset sets:
```ts
layout: {
  type: "multi-page",
  pages: ["home", "products", "cart"]
}
```

Category and product detail pages are generated from data, not listed in `pages[]`.

## Ecommerce Preset: `presets/ecommerce.ts`

```ts
export function ecommercePreset(): DeepPartial<SiteConfig> {
  return {
    business: { type: "ecommerce" },
    theme: { mode: "light" },
    layout: {
      type: "multi-page",
      pages: ["home", "products", "cart"],
    },
    hero: {
      style: "product",
      headline: "New Arrivals",
      subheadline: "Discover our latest collection",
      cta: { text: "Shop Now", url: "/products", variant: "primary" },
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
        },
      },
      {
        type: "product-grid",
        variant: "grid-4",
        page: "home",
        content: {
          headline: "Best Sellers",
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
          items: [],
        },
      },
      {
        type: "trust",
        variant: "logo-bar",
        page: "home",
        content: { headline: "As Seen In", logos: [] },
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
      title: "Online Store",
      description: "Shop our curated collection online.",
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
  compatibleHeros: ["product", "carousel", "image-bg", "split-image"],
  sectionVariants: {
    "product-grid": ["grid-3", "grid-4", "carousel"],
    "product-categories": ["image-cards", "minimal-list"],
    testimonials: ["carousel", "simple-grid"],
    trust: ["logo-bar"],
    contact: ["simple", "split-map"],
  },
};
```

## Configurator Extension

### Products Tab

New tab in the configurator sidebar:

- **Product list** — table/cards showing all products with name, price, category, stock status
- **Add product** — form: name, slug (auto-generated from name), price, compare price, category (dropdown), description, features (tag input), tags (checkbox: featured/bestseller/new), variants, images
- **Edit product** — same form, pre-filled
- **Delete product** — with confirmation
- **Category manager** — add/edit/delete categories (name, slug, image)
- **Image handling** — file picker saves to `public/images/products/`, path stored in JSON

### Export

"Export" generates both `site.config.ts` and `data/products.json`. Same flow as today's config export — download or copy.

## File Structure (New Files)

```
template-hub/
├── data/
│   └── products.json                          # Product catalog
├── presets/
│   └── ecommerce.ts                           # Ecommerce preset
├── src/
│   ├── app/
│   │   ├── products/
│   │   │   ├── page.tsx                       # All products listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx                   # Product detail
│   │   ├── category/
│   │   │   └── [slug]/
│   │   │       └── page.tsx                   # Category listing
│   │   └── cart/
│   │       └── page.tsx                       # Cart + WhatsApp checkout
│   ├── components/
│   │   ├── sections/
│   │   │   ├── ProductGrid/
│   │   │   │   ├── Grid3.tsx
│   │   │   │   ├── Grid4.tsx
│   │   │   │   ├── Carousel.tsx
│   │   │   │   └── index.tsx
│   │   │   └── ProductCategories/
│   │   │       ├── ImageCards.tsx
│   │   │       ├── MinimalList.tsx
│   │   │       └── index.tsx
│   │   ├── ecommerce/
│   │   │   ├── ProductCard.tsx                # Shared product card
│   │   │   ├── CartIcon.tsx                   # Navbar cart badge
│   │   │   ├── AddToCartButton.tsx            # Add to cart with variant selection
│   │   │   ├── ProductImageGallery.tsx        # Detail page image gallery
│   │   │   ├── VariantSelector.tsx            # Size/color picker
│   │   │   ├── PriceDisplay.tsx               # Price + compare price
│   │   │   ├── WhatsAppCheckout.tsx           # Message builder + send button
│   │   │   └── CartProvider.tsx               # Context provider (wraps layout)
│   │   └── layout/
│   │       └── Navbar/                        # Updated: cart icon added
│   └── lib/
│       ├── products.ts                        # Product data reader
│       └── cart-context.tsx                    # Cart state + localStorage
├── configurator/
│   └── src/
│       └── components/
│           ├── ProductsTab.tsx                 # Product management UI
│           └── CategoryManager.tsx            # Category CRUD
```

## What Does NOT Change

- `next.config.ts` — stays `output: "export"`
- `design.md` / theme system — ecommerce uses same CSS variables
- `section-renderer.tsx` — only adds new entries to SECTION_MAP
- Existing section components — untouched
- Existing presets — untouched
- Remix system — works with ecommerce preset via RemixMeta

## Edge Cases

- **Empty products.json** — Products page shows "No products yet" state. Section components render nothing gracefully.
- **Product with no images** — Placeholder image used.
- **Cart with out-of-stock item** — Show "Out of stock" badge, disable quantity increment, allow removal.
- **WhatsApp message too long** — Truncate at 20 items with "...and N more items" summary.
- **Variant combinations** — Cart treats each unique slug + variant combination as a separate line item.
- **Currency formatting** — `Intl.NumberFormat` with locale from config.

## Animation Tier

Ecommerce preset defaults to `standard`:
- Product cards: fade-up on scroll (Framer Motion)
- Product grid: staggered reveal
- Cart icon: scale bounce on add
- Image gallery: crossfade transitions
- No GSAP/ScrollTrigger unless explicitly upgraded to premium

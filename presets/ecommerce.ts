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

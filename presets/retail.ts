import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function retailPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "retail",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "carousel",
      headline: "Discover something special",
      subheadline: "Curated collections, exclusive brands, and a shopping experience you will love. Visit our store in Hyderabad.",
      cta: { text: "Shop Now", url: "#services", variant: "primary" },
      secondaryCta: { text: "Visit Store", url: "#contact" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Our Collections",
          description: "Handpicked categories for every taste",
          items: [
            { title: "Apparel", description: "Trendy clothing for men, women, and kids from top brands.", icon: "shirt" },
            { title: "Accessories", description: "Bags, watches, jewellery, and sunglasses to complete your look.", icon: "gem" },
            { title: "Home Decor", description: "Stylish furnishings, lighting, and art for modern homes.", icon: "lamp" },
            { title: "Gifting", description: "Curated gift boxes and hampers for every occasion.", icon: "gift" },
            { title: "Personal Care", description: "Premium skincare, fragrances, and grooming essentials.", icon: "sparkles" },
            { title: "Seasonal Picks", description: "Limited-edition collections updated every season.", icon: "calendar" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Inside Our Store",
          description: "A glimpse of the shopping experience",
          images: [],
        },
      },
      {
        type: "pricing",
        variant: "cards-3",
        content: {
          headline: "Loyalty Program",
          description: "Rewards for our valued customers",
          plans: [
            {
              name: "Silver",
              price: "Free",
              period: "join",
              features: ["Birthday discount (10%)", "Early sale access", "Points on every purchase"],
              cta: { text: "Join Free", url: "#contact" },
            },
            {
              name: "Gold",
              price: "999",
              period: "year",
              highlighted: true,
              features: ["All Silver benefits", "15% birthday discount", "Free alterations", "Exclusive previews", "Double points"],
              cta: { text: "Upgrade", url: "#contact" },
            },
            {
              name: "Platinum",
              price: "2,499",
              period: "year",
              features: ["All Gold benefits", "20% birthday discount", "Personal stylist", "Free home delivery", "VIP event invites"],
              cta: { text: "Go Platinum", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Customer Love",
          items: [
            { name: "Meghana S.", text: "The best boutique in Hyderabad. Unique finds every visit.", rating: 5 },
            { name: "Arjun P.", text: "Amazing collection and helpful staff. My go-to for gifting.", rating: 5 },
            { name: "Fatima N.", text: "The loyalty program is incredible. Love the exclusive previews.", rating: 5 },
          ],
        },
      },
      {
        type: "trust",
        variant: "logo-bar",
        content: {
          headline: "Brands We Carry",
          logos: [],
        },
      },
      {
        type: "hours",
        variant: "card",
        content: {
          headline: "Store Hours",
          hours: {
            Monday: { open: "10:00", close: "21:00" },
            Tuesday: { open: "10:00", close: "21:00" },
            Wednesday: { open: "10:00", close: "21:00" },
            Thursday: { open: "10:00", close: "21:00" },
            Friday: { open: "10:00", close: "22:00" },
            Saturday: { open: "10:00", close: "22:00" },
            Sunday: { open: "11:00", close: "21:00" },
          },
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Visit Us",
          description: "Located in Jubilee Hills, Hyderabad. Free parking available.",
        },
      },
    ],
    seo: {
      title: "Boutique Store | Premium Retail in Hyderabad",
      description: "Curated collections of apparel, accessories, and home decor in Hyderabad.",
    },
    animationTier: "standard",
  };
}

export const retailRemixMeta: RemixMeta = {
  compatibleThemes: [
    "luxe-commerce",
    "cobalt-product",
    "sand-dune",
    "kraft-paper",
    "neon-arcade",
    "minimal-concrete",
    "tailwind-base",
    "pastel-pop",
  ],
  compatibleHeros: ["carousel", "product", "image-bg", "split-image"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    gallery: ["grid-3", "masonry"],
    pricing: ["cards-3"],
    testimonials: ["carousel", "simple-grid"],
    trust: ["logo-bar"],
    hours: ["card"],
  },
};

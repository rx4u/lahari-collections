import type { SiteConfig } from "../src/lib/types";

const config: SiteConfig = {
  business: {
    type: "ecommerce",
    name: "Bloom & Brew",
    tagline: "Artisan teas and botanicals",
    description:
      "Bloom & Brew is a specialty tea house offering single-origin loose leaf teas, herbal blends, and curated gift sets. Every blend is hand-crafted in small batches from ethically sourced leaves.",
    phone: "+91 98765 43210",
    email: "hello@bloomandbrew.in",
    address: "42, Church Street, Ashok Nagar",
    city: "Bangalore",
    state: "Karnataka",
    pincode: "560001",
    mapUrl: "https://maps.google.com/?q=12.9716,77.5946",
    socialLinks: {
      instagram: "https://instagram.com/bloomandbrew",
      whatsapp: "https://wa.me/919876543210",
    },
    hours: {
      Monday: { open: "09:00", close: "20:00" },
      Tuesday: { open: "09:00", close: "20:00" },
      Wednesday: { open: "09:00", close: "20:00" },
      Thursday: { open: "09:00", close: "20:00" },
      Friday: { open: "09:00", close: "20:00" },
      Saturday: { open: "10:00", close: "21:00" },
      Sunday: { open: "10:00", close: "18:00" },
    },
  },

  theme: {
    designMd: "forest-green",
    mode: "light",
  },

  layout: {
    type: "multi-page",
    pages: ["home", "products"],
  },

  hero: {
    style: "split-image",
    headline: "Small-batch teas, big flavour",
    subheadline:
      "Hand-blended loose leaf teas sourced from Nilgiris, Darjeeling, and Assam. Delivered fresh to your doorstep.",
    cta: { text: "Shop Now", url: "/products", variant: "primary" },
    secondaryCta: { text: "Our Story", url: "#about" },
    image: "/images/defaults/store/hero.jpg",
  },

  sections: [
    {
      type: "product-grid",
      variant: "grid-4",
      page: "home",
      content: {
        headline: "Best Sellers",
        description: "Our most loved blends, tried and trusted",
        filterTag: "bestseller",
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
        description: "Find your perfect cup",
      },
    },
    {
      type: "product-grid",
      variant: "carousel",
      page: "home",
      content: {
        headline: "New Arrivals",
        description: "Fresh additions to our collection",
        filterTag: "new",
        limit: 8,
        showPrice: true,
      },
    },
    {
      type: "about",
      variant: "split-content",
      page: "home",
      content: {
        headline: "Our Story",
        description:
          "Bloom & Brew started in 2019 as a weekend project by two tea-obsessed friends. Today we work directly with small-scale tea estates across India to bring you single-origin teas with full traceability.",
        image: "/images/defaults/store/about.jpg",
      },
    },
    {
      type: "testimonials",
      variant: "carousel",
      page: "home",
      content: {
        headline: "What Our Customers Say",
        items: [
          {
            name: "Priya M.",
            text: "The Nilgiri First Flush is the best tea I've ever had. You can taste the difference quality sourcing makes.",
            rating: 5,
          },
          {
            name: "Arjun K.",
            text: "Ordered the gift set for Diwali. Beautiful packaging and the teas are incredible. Will order again.",
            rating: 5,
          },
          {
            name: "Sneha R.",
            text: "Their chamomile lavender blend is my nightly ritual now. So calming and the flavour is pure.",
            rating: 5,
          },
        ],
      },
    },
    {
      type: "contact",
      variant: "simple",
      page: "home",
      content: {
        headline: "Visit Us",
        description: "Come by for a tasting or order online for delivery across India.",
      },
    },
  ],

  seo: {
    title: "Bloom & Brew — Artisan Teas & Botanicals",
    description:
      "Small-batch loose leaf teas sourced from Nilgiris, Darjeeling, and Assam. Order online or visit our Bangalore store.",
    ogImage: "/images/defaults/store/og.jpg",
  },

  animationTier: "standard",

  ecommerce: {
    currency: "INR",
    currencySymbol: "Rs",
    whatsappNumber: "919876543210",
    cartEnabled: true,
    showComparePrice: true,
  },
};

export default config;

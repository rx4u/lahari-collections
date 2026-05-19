import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function bakeryPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "bakery",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "carousel",
      headline: "Freshly baked, made with love",
      subheadline: "Artisan breads, handcrafted pastries, and custom cakes baked fresh every morning in Hyderabad.",
      cta: { text: "Order Now", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Menu", url: "#menu-food" },
    },
    sections: [
      {
        type: "menu-food",
        variant: "photo-menu",
        content: {
          headline: "Our Menu",
          description: "Baked fresh daily with premium ingredients",
          categories: [
            {
              name: "Artisan Breads",
              items: [
                { name: "Sourdough Loaf", price: "250", description: "72-hour fermented with wild yeast" },
                { name: "Multigrain Bread", price: "180", description: "Flax, sunflower, and sesame seeds" },
                { name: "Focaccia", price: "220", description: "Rosemary, olive oil, and sea salt" },
                { name: "Baguette", price: "150", description: "Classic French style, crusty exterior" },
              ],
            },
            {
              name: "Pastries",
              items: [
                { name: "Croissant", price: "120", description: "Buttery, flaky, and golden" },
                { name: "Danish Pastry", price: "140", description: "Filled with custard and seasonal fruit" },
                { name: "Chocolate Eclair", price: "160", description: "Choux pastry with dark chocolate ganache" },
                { name: "Cinnamon Roll", price: "130", description: "Swirled with ceylon cinnamon and cream cheese glaze" },
              ],
            },
            {
              name: "Cakes",
              items: [
                { name: "Classic Chocolate Cake", price: "800", description: "Rich Belgian chocolate, serves 6-8" },
                { name: "Red Velvet", price: "900", description: "Cream cheese frosting, serves 6-8" },
                { name: "Fresh Fruit Gateau", price: "1,100", description: "Seasonal fruits with vanilla sponge" },
                { name: "Custom Cake", price: "1,500", description: "Designed to your specifications, 48hr notice" },
              ],
            },
            {
              name: "Cookies",
              items: [
                { name: "Chocolate Chip (6 pcs)", price: "200", description: "Gooey center, crispy edges" },
                { name: "Almond Biscotti (8 pcs)", price: "250", description: "Twice-baked, perfect with coffee" },
                { name: "Assorted Cookie Box", price: "450", description: "12 pieces, mixed flavors" },
              ],
            },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "From Our Kitchen",
          description: "A peek at what comes out of our ovens",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "What Our Customers Say",
          items: [
            { name: "Priyanka V.", text: "The sourdough is the best in Hyderabad. We order every weekend.", rating: 5 },
            { name: "Sameer K.", text: "Ordered a custom cake for my daughter's birthday. It was stunning and delicious.", rating: 5 },
            { name: "Aditi S.", text: "Their croissants rival anything I had in Paris. Not exaggerating.", rating: 5 },
          ],
        },
      },
      {
        type: "hours",
        variant: "card",
        content: {
          headline: "Bakery Hours",
          hours: {
            Monday: { open: "07:00", close: "21:00" },
            Tuesday: { open: "07:00", close: "21:00" },
            Wednesday: { open: "07:00", close: "21:00" },
            Thursday: { open: "07:00", close: "21:00" },
            Friday: { open: "07:00", close: "22:00" },
            Saturday: { open: "07:00", close: "22:00" },
            Sunday: { open: "08:00", close: "20:00" },
          },
        },
      },
      {
        type: "location",
        variant: "card",
        content: {
          headline: "Find Us",
          description: "Nestled in the lanes of Banjara Hills, Hyderabad",
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Get in Touch",
          description: "For bulk orders and custom cakes, contact us 48 hours in advance.",
        },
      },
    ],
    seo: {
      title: "Bakery | Artisan Breads & Pastries in Hyderabad",
      description: "Freshly baked artisan breads, pastries, cakes, and cookies in Hyderabad.",
    },
    animationTier: "standard",
  };
}

export const bakeryRemixMeta: RemixMeta = {
  compatibleThemes: [
    "bakery-flour",
    "farmers-market",
    "kraft-paper",
    "linen",
    "botanical",
    "desert-rose",
    "pastel-pop",
    "coffee-roast",
  ],
  compatibleHeros: ["carousel", "image-bg", "split-image", "collage"],
  sectionVariants: {
    "menu-food": ["categorized", "photo-menu"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
    hours: ["card"],
    location: ["card"],
  },
};

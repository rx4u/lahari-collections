import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function restaurantPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "restaurant",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "A culinary experience like no other",
      subheadline: "Fresh ingredients, bold flavors, and a warm atmosphere. Reserve your table tonight.",
      cta: { text: "Reserve a Table", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Menu", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Our Menu",
          description: "Crafted with passion, served with care",
          items: [
            { title: "Starters", description: "Handcrafted appetizers using locally sourced ingredients.", icon: "salad" },
            { title: "Main Course", description: "Signature dishes that celebrate regional and global flavors.", icon: "utensils" },
            { title: "Desserts", description: "Indulgent sweets and house-made pastries to end your meal.", icon: "cake" },
            { title: "Beverages", description: "Curated wines, craft cocktails, and refreshing non-alcoholic options.", icon: "wine" },
            { title: "Weekend Brunch", description: "A leisurely spread of breakfast favorites and chef specials.", icon: "coffee" },
            { title: "Private Dining", description: "Exclusive dining rooms for celebrations and corporate events.", icon: "door-open" },
          ],
        },
      },
      {
        type: "about",
        variant: "story",
        content: {
          headline: "Our Story",
          description: "Founded with a passion for great food and warm hospitality. Every dish tells a story of tradition, innovation, and the finest ingredients.",
          stats: [
            { value: "2015", label: "Established" },
            { value: "50+", label: "Menu Items" },
            { value: "4.7", label: "Avg Rating" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Gallery",
          description: "A glimpse into our kitchen and dining experience",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "What Our Guests Say",
          items: [
            { name: "Guest", text: "Incredible food and ambiance. A must-visit!", rating: 5 },
            { name: "Guest", text: "The best dining experience in the city.", rating: 5 },
            { name: "Guest", text: "Every dish was a masterpiece. Will be back.", rating: 5 },
          ],
        },
      },
      {
        type: "hours",
        variant: "card",
        content: {
          headline: "Opening Hours",
          hours: {
            Monday: { open: "11:00", close: "22:00" },
            Tuesday: { open: "11:00", close: "22:00" },
            Wednesday: { open: "11:00", close: "22:00" },
            Thursday: { open: "11:00", close: "22:00" },
            Friday: { open: "11:00", close: "23:00" },
            Saturday: { open: "10:00", close: "23:00" },
            Sunday: { open: "10:00", close: "21:00" },
          },
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Find Us",
          description: "We'd love to see you. Reserve a table or just walk in.",
        },
      },
    ],
    seo: {
      title: "Restaurant | Fine Dining",
      description: "A culinary experience celebrating fresh ingredients and bold flavors.",
    },
    animationTier: "standard",
  };
}

export const restaurantRemixMeta: RemixMeta = {
  compatibleThemes: [
    "natural-wine",
    "coffee-roast",
    "forest-floor",
    "speakeasy",
    "trattoria-red",
    "wine-country",
    "street-food",
    "whisky-peat",
  ],
  compatibleHeros: ["image-bg", "split-image", "centered", "gradient"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    about: ["story", "split-content"],
    testimonials: ["carousel", "simple-grid"],
    gallery: ["grid-3", "masonry"],
  },
};

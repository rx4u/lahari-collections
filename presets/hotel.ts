import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function hotelPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "hotel",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Experience luxury in the heart of Hyderabad",
      subheadline: "Elegant rooms, world-class dining, and warm hospitality in the city of pearls. Your perfect stay awaits.",
      cta: { text: "Book a Room", url: "#booking", variant: "primary" },
      secondaryCta: { text: "View Rooms", url: "#rooms" },
    },
    sections: [
      {
        type: "rooms",
        variant: "card-grid",
        content: {
          headline: "Our Rooms & Suites",
          description: "Thoughtfully designed spaces for every traveler",
          items: [
            { title: "Deluxe Room", description: "400 sq ft of comfort with city views, king bed, and a work desk.", price: "4,500/night" },
            { title: "Premium Suite", description: "650 sq ft suite with separate living area, minibar, and rain shower.", price: "7,500/night" },
            { title: "Presidential Suite", description: "1,200 sq ft of luxury with panoramic views, jacuzzi, and butler service.", price: "15,000/night" },
            { title: "Family Room", description: "550 sq ft room with twin beds, extra rollaway, and kid-friendly amenities.", price: "5,500/night" },
          ],
        },
      },
      {
        type: "amenities",
        variant: "icon-grid",
        content: {
          headline: "Hotel Amenities",
          description: "Everything you need for a memorable stay",
          items: [
            { title: "Swimming Pool", description: "Rooftop infinity pool with lounge chairs and pool bar.", icon: "waves" },
            { title: "Spa & Wellness", description: "Ayurvedic treatments, Swedish massage, and steam room.", icon: "flower-2" },
            { title: "Fine Dining", description: "Multi-cuisine restaurant with a terrace dining option.", icon: "utensils" },
            { title: "Fitness Center", description: "24/7 gym with Technogym equipment and personal trainers.", icon: "dumbbell" },
            { title: "Business Center", description: "Meeting rooms, conference hall, and high-speed internet.", icon: "briefcase" },
            { title: "Concierge", description: "24-hour concierge for tours, transfers, and local recommendations.", icon: "bell" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Gallery",
          description: "A glimpse of the experience",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Guest Reviews",
          items: [
            { name: "James W.", text: "Impeccable service and stunning rooms. One of the best hotels in Hyderabad.", rating: 5 },
            { name: "Lakshmi N.", text: "The rooftop pool was the highlight of our anniversary trip. Beautiful property.", rating: 5 },
            { name: "David C.", text: "Perfect for business travel. The conference facilities and WiFi are excellent.", rating: 5 },
          ],
        },
      },
      {
        type: "booking",
        variant: "inline-form",
        content: {
          headline: "Reserve Your Stay",
          description: "Book directly for the best rates and complimentary breakfast",
        },
      },
      {
        type: "location",
        variant: "card",
        content: {
          headline: "Location",
          description: "Located in Banjara Hills, 20 minutes from Rajiv Gandhi International Airport and walking distance to KBR Park.",
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Contact Us",
          description: "Our front desk is available 24/7 for reservations and inquiries.",
        },
      },
    ],
    seo: {
      title: "Hotel | Luxury Stay in Hyderabad",
      description: "Luxury hotel in Hyderabad with elegant rooms, rooftop pool, spa, and fine dining.",
    },
    animationTier: "standard",
  };
}

export const hotelRemixMeta: RemixMeta = {
  compatibleThemes: [
    "hotel-riviera",
    "sand-dune",
    "linen",
    "old-money",
    "desert-rose",
    "midnight-navy",
    "forest-floor",
    "spa-onsen",
  ],
  compatibleHeros: ["image-bg", "parallax", "carousel", "split-image"],
  sectionVariants: {
    rooms: ["card-grid"],
    amenities: ["icon-grid"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
    booking: ["inline-form", "whatsapp-cta", "calendly-embed"],
    location: ["card"],
  },
};

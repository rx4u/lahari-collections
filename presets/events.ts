import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function eventsPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "events",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "collage",
      headline: "Creating unforgettable moments",
      subheadline: "From grand weddings to corporate galas, we design and execute events that leave lasting impressions across Hyderabad.",
      cta: { text: "Get a Quote", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Work", url: "#gallery" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Event Types",
          description: "We bring every celebration to life",
          items: [
            { title: "Weddings", description: "End-to-end wedding planning from venue to vows. Traditional and destination weddings.", icon: "heart" },
            { title: "Corporate Events", description: "Product launches, annual meets, team outings, and award ceremonies.", icon: "building-2" },
            { title: "Birthday Celebrations", description: "Themed parties for kids and milestone celebrations for adults.", icon: "cake" },
            { title: "Conferences", description: "Professional event management for seminars, summits, and conferences.", icon: "presentation" },
            { title: "Social Gatherings", description: "Engagement parties, baby showers, housewarming, and festive celebrations.", icon: "party-popper" },
            { title: "Exhibition Setup", description: "Stall design, branding, and logistics for trade shows and exhibitions.", icon: "layout" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Our Portfolio",
          description: "Moments we have crafted",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Client Testimonials",
          items: [
            { name: "Priya & Karthik", text: "Our wedding was a dream come true. Every detail was perfect. Thank you!", rating: 5 },
            { name: "TechCorp India", text: "They managed our annual conference for 500 attendees flawlessly.", rating: 5 },
            { name: "Ritu M.", text: "My daughter's first birthday party was magical. The decor was stunning.", rating: 5 },
          ],
        },
      },
      {
        type: "pricing",
        variant: "cards-3",
        content: {
          headline: "Event Packages",
          description: "Flexible packages to suit every budget",
          plans: [
            {
              name: "Essential",
              price: "50,000",
              period: "starting",
              features: ["Venue coordination", "Basic decor", "Sound system", "Event timeline management"],
              cta: { text: "Get Quote", url: "#contact" },
            },
            {
              name: "Premium",
              price: "1,50,000",
              period: "starting",
              highlighted: true,
              features: ["Full event design", "Premium decor & florals", "Photography & videography", "Catering coordination", "Day-of coordination"],
              cta: { text: "Get Quote", url: "#contact" },
            },
            {
              name: "Luxury",
              price: "5,00,000",
              period: "starting",
              features: ["Complete planning & design", "Luxury decor & lighting", "Entertainment booking", "Multi-day coordination", "Dedicated event manager"],
              cta: { text: "Get Quote", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "about",
        variant: "story",
        content: {
          headline: "Our Story",
          description: "What started as a passion for creating beautiful celebrations has grown into one of Hyderabad's most trusted event management companies. With over 500 events executed, we bring creativity, precision, and heart to every occasion.",
          stats: [
            { value: "500+", label: "Events Managed" },
            { value: "8+", label: "Years Experience" },
            { value: "4.9", label: "Client Rating" },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Plan Your Event",
          description: "Visit our studio in Film Nagar, Hyderabad, or schedule a consultation call.",
        },
      },
    ],
    seo: {
      title: "Events | Event Management in Hyderabad",
      description: "Professional event management for weddings, corporate events, birthdays, and conferences in Hyderabad.",
    },
    animationTier: "standard",
  };
}

export const eventsRemixMeta: RemixMeta = {
  compatibleThemes: [
    "florist-bouquet",
    "desert-rose",
    "botanical",
    "linen",
    "pastel-pop",
    "spa-onsen",
    "skincare-matte",
    "forest-floor",
  ],
  compatibleHeros: ["collage", "carousel", "image-bg", "parallax"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
    pricing: ["cards-3"],
    about: ["story", "split-content"],
  },
};

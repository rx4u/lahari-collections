import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function photographerPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "photographer",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "parallax",
      headline: "Capturing moments that last forever",
      subheadline: "Wedding, portrait, commercial, and event photography in Hyderabad. Every frame tells a story.",
      cta: { text: "View Portfolio", url: "#gallery", variant: "primary" },
      secondaryCta: { text: "Book a Shoot", url: "#contact" },
    },
    sections: [
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Portfolio",
          description: "Selected works across genres",
          images: [],
        },
      },
      {
        type: "services",
        variant: "icon-list",
        content: {
          headline: "Photography Services",
          description: "Professional photography for every occasion",
          items: [
            { title: "Wedding Photography", description: "Candid and traditional coverage of your entire wedding celebration.", icon: "heart" },
            { title: "Portrait Sessions", description: "Individual, couple, and family portraits in studio or on location.", icon: "user" },
            { title: "Commercial Photography", description: "Product, food, and brand photography for businesses.", icon: "briefcase" },
            { title: "Event Coverage", description: "Corporate events, concerts, and private parties captured in detail.", icon: "camera" },
            { title: "Pre-Wedding Shoots", description: "Creative pre-wedding sessions at scenic Hyderabad locations.", icon: "image" },
            { title: "Photo Editing", description: "Professional retouching, color grading, and album design.", icon: "palette" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "Client Words",
          items: [
            { name: "Roshni & Aditya", text: "Our wedding photos are absolutely stunning. Every emotion was captured perfectly.", rating: 5 },
            { name: "Brand Studio Co.", text: "The product shots elevated our entire brand. Professional and creative.", rating: 5 },
            { name: "Meera S.", text: "The family portrait session was so much fun. The photos are beautiful.", rating: 5 },
          ],
        },
      },
      {
        type: "pricing",
        variant: "cards-3",
        content: {
          headline: "Packages",
          description: "Transparent pricing for every need",
          plans: [
            {
              name: "Portrait",
              price: "5,000",
              period: "session",
              features: ["1-hour shoot", "1 location", "20 edited photos", "Online gallery", "Print-ready files"],
              cta: { text: "Book Now", url: "#contact" },
            },
            {
              name: "Wedding",
              price: "75,000",
              period: "event",
              highlighted: true,
              features: ["Full day coverage", "2 photographers", "500+ edited photos", "Cinematic highlights", "Premium album"],
              cta: { text: "Book Now", url: "#contact" },
            },
            {
              name: "Commercial",
              price: "15,000",
              period: "half day",
              features: ["4-hour shoot", "Studio or on-location", "30 edited photos", "Commercial license", "Quick turnaround"],
              cta: { text: "Get Quote", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "about",
        variant: "story",
        content: {
          headline: "About Me",
          description: "I am a Hyderabad-based photographer who believes every moment has a story worth telling. With 8 years behind the lens, I specialize in turning fleeting moments into timeless images. My work blends photojournalistic instinct with cinematic aesthetics.",
          stats: [
            { value: "8+", label: "Years Experience" },
            { value: "300+", label: "Weddings Shot" },
            { value: "50+", label: "Brands Served" },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Let's Create Together",
          description: "Based in Hyderabad, available for destination shoots worldwide.",
        },
      },
    ],
    seo: {
      title: "Photographer | Professional Photography in Hyderabad",
      description: "Wedding, portrait, commercial, and event photography in Hyderabad. Every frame tells a story.",
    },
    animationTier: "premium",
  };
}

export const photographerRemixMeta: RemixMeta = {
  compatibleThemes: [
    "film-photography",
    "ink-wash",
    "midnight-navy",
    "carbon-fibre",
    "concrete-gym",
    "minimal-concrete",
    "desert-rose",
    "forest-floor",
  ],
  compatibleHeros: ["parallax", "image-bg", "collage", "carousel"],
  sectionVariants: {
    gallery: ["grid-3", "masonry"],
    services: ["icon-grid", "icon-list"],
    testimonials: ["carousel", "simple-grid"],
    pricing: ["cards-3"],
    about: ["story", "split-content"],
  },
};

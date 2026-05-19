import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function salonPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "salon",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      eyebrow: "Premium Beauty Studio",
      headline: "Where beauty meets expertise",
      subheadline: "Premium hair, skin, and nail services tailored to your unique style. Book your transformation today.",
      cta: { text: "Book Now", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-list",
        content: {
          headline: "Our Services",
          description: "From head to toe, we've got you covered",
          items: [
            { title: "Haircuts & Styling", description: "Precision cuts and blowouts by our expert stylists.", icon: "scissors" },
            { title: "Hair Coloring", description: "Balayage, highlights, and full color treatments using premium products.", icon: "palette" },
            { title: "Facials & Skincare", description: "Rejuvenating facials and skin treatments for a radiant glow.", icon: "sparkles" },
            { title: "Manicure & Pedicure", description: "Nail art, gel nails, and luxurious hand and foot treatments.", icon: "hand" },
            { title: "Bridal Packages", description: "Complete bridal beauty packages for your special day.", icon: "crown" },
            { title: "Spa Treatments", description: "Massages, body wraps, and relaxation therapies.", icon: "flower-2" },
          ],
        },
      },
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "A studio built on craft",
          description: "We are a team of passionate stylists who believe beauty is personal. Our studio blends technique with creativity to give you looks that feel uniquely yours.",
          image: "/images/defaults/salon/about.jpg",
          stats: [
            { value: "8+", label: "Years of Experience" },
            { value: "3,000+", label: "Happy Clients" },
            { value: "4.9", label: "Google Rating" },
          ],
        },
      },
      {
        type: "pricing",
        variant: "cards-3",
        content: {
          headline: "Pricing",
          description: "Transparent pricing for all our services",
          plans: [
            {
              name: "Essential",
              price: "999",
              period: "starting from",
              features: ["Basic haircut", "Shampoo & conditioning", "Basic styling"],
              cta: { text: "Book Now", url: "#contact" },
            },
            {
              name: "Premium",
              price: "2,499",
              period: "starting from",
              highlighted: true,
              features: ["Designer haircut", "Color treatment", "Deep conditioning", "Styling & finish"],
              cta: { text: "Book Now", url: "#contact" },
            },
            {
              name: "Bridal",
              price: "9,999",
              period: "package",
              features: ["Bridal makeup", "Hair styling", "Mehendi", "Pre-wedding facial", "Nail art"],
              cta: { text: "Enquire", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "gallery",
        variant: "grid-3",
        content: {
          headline: "Our Work",
          description: "See the transformations",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Happy Clients",
          items: [
            { name: "Client", text: "The best salon experience I've ever had!", rating: 5 },
            { name: "Client", text: "My hair has never looked this good. Absolutely love it.", rating: 5 },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Meet Our Stylists",
          members: [],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Book an Appointment",
          description: "Walk-ins welcome. For guaranteed availability, book ahead.",
        },
      },
    ],
    seo: {
      title: "Salon | Beauty & Styling",
      description: "Premium hair, skin, and nail services. Book your appointment today.",
    },
    animationTier: "standard",
  };
}

export const salonRemixMeta: RemixMeta = {
  compatibleThemes: [
    "skincare-matte",
    "botanical-apothecary",
    "spa-onsen",
    "forest-floor",
    "desert-rose",
    "linen",
    "botanical",
    "meditation-zen",
  ],
  compatibleHeros: ["split-image", "gradient", "centered", "image-bg", "minimal"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    about: ["story", "split-content"],
    testimonials: ["carousel", "simple-grid"],
    gallery: ["grid-3", "masonry"],
  },
};

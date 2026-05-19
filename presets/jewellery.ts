import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function jewelleryPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "jewellery",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Crafted for those who endure.",
      subheadline: "Aurum Jewellers creates heirloom-quality pieces using ethically sourced stones and old-world goldsmithing techniques.",
      cta: { text: "Explore Collections", url: "#collections", variant: "primary" },
      secondaryCta: { text: "Book a Consultation", url: "#contact" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "A Legacy of Craft",
          description: "Aurum Jewellers was founded in 1987 by master goldsmith Vikram Nair, who trained under artisans in Rajasthan before bringing his craft to Hyderabad. Three generations later, we continue to hand-craft every piece in our atelier using techniques passed down over centuries. We believe jewellery is not decoration — it is memory made tangible.",
          stats: [
            { value: "37 Years", label: "Of Craftsmanship" },
            { value: "12,000+", label: "Pieces Created" },
            { value: "3rd Gen", label: "Family Atelier" },
          ],
        },
      },
      {
        type: "collections",
        variant: "banner-grid",
        content: {
          headline: "Collections",
          description: "Each collection tells a different story",
          items: [
            { title: "Bridal", description: "Bridal sets, mangalsutras, and custom trousseau jewellery crafted to last lifetimes.", image: "" },
            { title: "Everyday Essentials", description: "Understated gold and diamond pieces for daily wear — delicate, durable, and timeless.", image: "" },
            { title: "Heritage Pieces", description: "Temple jewellery, antique-finish gold, and traditional regional forms reimagined for today.", image: "" },
            { title: "Custom Commissions", description: "Work directly with our goldsmiths to design a one-of-a-kind piece from a sketch or heirloom idea.", image: "" },
          ],
        },
      },
      {
        type: "products",
        variant: "grid",
        content: {
          headline: "Featured Pieces",
          description: "A selection from our current atelier",
          items: [],
        },
      },
      {
        type: "process",
        variant: "steps-horizontal",
        content: {
          headline: "How We Create",
          description: "From vision to vault — every piece is a collaboration",
          steps: [
            { step: 1, title: "Design Consultation", description: "We begin with a detailed conversation about your vision, occasion, and budget. Sketches are prepared within 48 hours." },
            { step: 2, title: "Stone Selection", description: "Choose from our curated inventory of certified diamonds, emeralds, rubies, and sapphires — or bring your own heirloom stones." },
            { step: 3, title: "Master Crafting", description: "Your piece is handcrafted in our in-house atelier by senior goldsmiths. Timeline ranges from 7–21 days depending on complexity." },
            { step: 4, title: "Quality Assurance", description: "Every piece undergoes hallmarking, stone setting verification, and finish inspection before leaving the atelier." },
            { step: 5, title: "Delivery", description: "Your piece arrives in a hand-finished box with full certification, a care guide, and a lifetime craftsmanship warranty." },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Clients Say",
          items: [
            { name: "Nandini R.", text: "My wedding set from Aurum is the most beautiful thing I own. The craftsmanship is beyond anything I've seen in the city.", rating: 5 },
            { name: "Suresh M.", text: "I commissioned a piece using my grandmother's gold. The team handled it with extraordinary care. It brought her back to life.", rating: 5 },
            { name: "Deepa K.", text: "Every year I buy something from Aurum. It's the only jeweller I trust for both quality and honesty about stones.", rating: 5 },
            { name: "Arun P.", text: "The custom engagement ring they designed exceeded my wildest expectations. She still talks about it years later.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "From the Atelier",
          description: "A glimpse into our craft and completed commissions",
          images: [],
        },
      },
      {
        type: "trust",
        variant: "badges",
        content: {
          headline: "Our Guarantees",
          items: [
            { title: "BIS Hallmarked", description: "All gold pieces carry official BIS hallmarking for guaranteed purity.", icon: "badge-check" },
            { title: "Certified Stones", description: "Diamonds and precious stones come with GIA or IGI certification.", icon: "gem" },
            { title: "Lifetime Warranty", description: "Free lifetime craftsmanship warranty on all Aurum pieces.", icon: "shield-check" },
            { title: "Ethical Sourcing", description: "We source only conflict-free stones and responsibly mined gold.", icon: "leaf" },
          ],
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Visit Our Showroom",
          description: "Our showroom is open by appointment and walk-in. Located in Jubilee Hills, Hyderabad.",
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Begin Your Commission",
          description: "Tell us about your vision and we'll reach out within 24 hours to schedule a design consultation.",
        },
      },
      {
        type: "cta",
        variant: "image-overlay",
        content: {
          headline: "Something extraordinary is waiting to be made.",
          description: "Book a private consultation with our master goldsmiths and begin your bespoke jewellery journey.",
          cta: { text: "Book a Consultation", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Aurum Jewellers | Heirloom Jewellery & Custom Commissions",
      description: "Three generations of master goldsmithing. Bridal, heritage, and bespoke jewellery crafted by hand in Hyderabad.",
    },
    animationTier: "premium",
  };
}

export const jewelleryRemixMeta: RemixMeta = {
  compatibleThemes: [
    "old-money",
    "midnight-navy",
    "speakeasy",
    "whisky-peat",
    "sand-dune",
    "hotel-riviera",
    "linen",
    "desert-rose",
  ],
  compatibleHeros: ["image-bg", "parallax", "split-image", "centered"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    collections: ["banner-grid", "card-grid"],
    products: ["grid"],
    process: ["steps-horizontal", "steps-numbered"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    trust: ["badges", "icon-grid"],
    location: ["map-embed"],
    contact: ["split-form", "split-map"],
    cta: ["image-overlay", "banner"],
  },
};

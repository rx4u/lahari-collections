import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function printingPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "printing",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Your brand, printed to perfection.",
      subheadline: "PrintCraft Studio delivers high-quality printing, signage, and branded products with fast turnaround and competitive bulk pricing.",
      cta: { text: "Get a Quote", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "What We Print",
          description: "Full-range print production for brands of every size",
          items: [
            { title: "Business Cards", description: "Premium business cards in matte, gloss, silk, or spot-UV finishes. Standard and custom sizes.", icon: "credit-card" },
            { title: "Banners & Signage", description: "Flex banners, roll-up standees, window graphics, and outdoor signage with weatherproof inks.", icon: "flag" },
            { title: "Brochures", description: "Tri-fold, bi-fold, and multi-page brochures with crisp full-colour offset or digital printing.", icon: "file-text" },
            { title: "Custom Apparel", description: "T-shirts, polos, caps, and tote bags printed via screen print, DTG, or embroidery.", icon: "shirt" },
            { title: "Packaging", description: "Custom boxes, bags, stickers, and labels for retail, food, gifting, and e-commerce brands.", icon: "package" },
            { title: "Large Format", description: "Exhibition boards, vehicle wraps, wall murals, and event backdrops up to 10 ft wide.", icon: "maximize" },
          ],
        },
      },
      {
        type: "products",
        variant: "grid",
        content: {
          headline: "Popular Products",
          description: "Our most ordered print products",
          items: [],
        },
      },
      {
        type: "bulk-pricing",
        variant: "tier-cards",
        content: {
          headline: "Bulk Pricing Tiers",
          description: "The more you print, the more you save",
          plans: [
            {
              name: "Starter",
              price: "50 Units",
              period: "minimum",
              features: ["Standard business cards, flyers, brochures", "Digital printing", "5–7 day turnaround", "PDF proof included", "Free delivery above ₹2,000"],
              cta: { text: "Get a Quote", url: "#contact" },
            },
            {
              name: "Business",
              price: "250 Units",
              period: "minimum",
              highlighted: true,
              features: ["All Starter products + apparel", "Offset or digital printing", "3–5 day turnaround", "Dedicated account contact", "10% discount on reorders", "Free delivery"],
              cta: { text: "Get a Quote", url: "#contact" },
            },
            {
              name: "Enterprise",
              price: "1,000+ Units",
              period: "minimum",
              features: ["Full product catalogue", "Offset printing for best unit cost", "Rush 48-hr option available", "Priority production slot", "Branded delivery packaging", "Monthly billing available"],
              cta: { text: "Contact Us", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "process",
        variant: "steps-numbered",
        content: {
          headline: "How It Works",
          description: "From file to finished product in five steps",
          steps: [
            { step: 1, title: "Upload Artwork", description: "Send your print-ready files via our upload form or email. We accept PDF, AI, PSD, and EPS formats." },
            { step: 2, title: "Choose Specs", description: "Select size, paper stock, finish, and quantity. Our team advises on the best spec for your budget and use case." },
            { step: 3, title: "Approve Proof", description: "We send a digital proof within 4 hours for your review. Production begins only after your approval." },
            { step: 4, title: "Print & Pack", description: "Your order is produced in our in-house facility with quality checks at every stage. Rush options available." },
            { step: 5, title: "Deliver", description: "We deliver pan-city within 24 hours of completion. Pan-India courier within 3–5 business days." },
          ],
        },
      },
      {
        type: "trust",
        variant: "badges",
        content: {
          headline: "Why PrintCraft",
          items: [
            { title: "In-House Production", description: "Everything is printed in our own facility — no outsourcing, full quality control.", icon: "factory" },
            { title: "Colour Accuracy", description: "Pantone-matched and ICC profile-calibrated printing for consistent brand colours.", icon: "palette" },
            { title: "Eco Inks", description: "We use water-based, low-VOC inks and responsibly sourced paper stocks.", icon: "leaf" },
            { title: "Fast Turnaround", description: "Standard 3–5 days, rush 24–48 hours for select products.", icon: "zap" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Clients Say",
          items: [
            { name: "Karan M., Marketing Manager", text: "We've used PrintCraft for all our event collateral for two years. Colour accuracy and turnaround are unmatched.", rating: 5 },
            { name: "Shalini D., Boutique Owner", text: "The custom packaging they made for our brand launch was stunning. Multiple customers asked who made them.", rating: 5 },
            { name: "Ravi P., Startup Founder", text: "Best bulk business card printing in the city. Quality rivals luxury printers at half the price.", rating: 5 },
            { name: "Anita W., Event Planner", text: "Rush order for 500 brochures delivered in 20 hours. Saved our entire product launch. Thank you!", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Recent Work",
          description: "A selection of projects from our production floor",
          images: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Working Hours",
          hours: {
            Monday: { open: "09:00", close: "18:30" },
            Tuesday: { open: "09:00", close: "18:30" },
            Wednesday: { open: "09:00", close: "18:30" },
            Thursday: { open: "09:00", close: "18:30" },
            Friday: { open: "09:00", close: "18:30" },
            Saturday: { open: "10:00", close: "16:00" },
            Sunday: "closed",
          },
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Request a Quote",
          description: "Tell us what you need and we'll respond with pricing and a timeline within 2 hours during business hours.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Ready to print? Let's get started.",
          description: "Upload your artwork or send us your brief. We'll handle the rest.",
          cta: { text: "Get a Quote", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "PrintCraft Studio | Business Printing & Signage",
      description: "High-quality printing for business cards, banners, brochures, apparel, and custom packaging. Fast turnaround and bulk pricing.",
    },
    animationTier: "subtle",
  };
}

export const printingRemixMeta: RemixMeta = {
  compatibleThemes: [
    "cobalt-product",
    "midnight-navy",
    "industrial-steel",
    "concrete-gym",
    "carbon-fibre",
    "paper-white",
    "arctic",
    "clinical",
  ],
  compatibleHeros: ["centered", "split-image", "image-bg", "gradient"],
  sectionVariants: {
    services: ["card-grid", "icon-grid"],
    products: ["grid"],
    "bulk-pricing": ["tier-cards"],
    process: ["steps-numbered", "steps-horizontal"],
    trust: ["badges", "icon-grid"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    hours: ["simple-card"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

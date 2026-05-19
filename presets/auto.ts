import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function autoPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "auto",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      eyebrow: "Auto Repair & Service",
      headline: "Expert care for every vehicle.",
      subheadline: "Trusted auto repair and maintenance for all makes and models. Same-day service available — book your slot online.",
      credentialBar: {
        items: [
          { icon: "calendar", text: "Est. 2005" },
          { icon: "map-pin", text: "Chennai, Tamil Nadu" },
          { icon: "star", text: "4.9 / 5 — 200+ Reviews" },
          { icon: "shield-check", text: "ASE Certified" },
        ],
      },
      cta: { text: "Book a Service", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "featured-grid",
        content: {
          headline: "Our Services",
          description: "Complete auto care under one roof",
          items: [
            { title: "Oil Change", description: "Conventional, synthetic, and high-mileage oil changes with a multi-point inspection.", icon: "droplets", price: "From ₹799", duration: "30 min", image: "/images/defaults/auto/service-oil.jpg" },
            { title: "Brake Service", description: "Pad replacement, rotor resurfacing, and full hydraulic brake system inspection.", icon: "circle-stop", price: "From ₹1,499", duration: "1–2 hrs" },
            { title: "Engine Repair", description: "Diagnostics, tune-ups, timing belt replacement, and complete engine rebuilds.", icon: "settings-2", price: "From ₹2,499", duration: "Varies" },
            { title: "Tire Service", description: "Rotation, balancing, patching, and new tire installation for all vehicle types.", icon: "circle-dot", price: "From ₹399", duration: "45 min" },
            { title: "Detailing", description: "Interior deep clean, exterior hand wash, paint correction, and ceramic coating.", icon: "sparkles", price: "From ₹1,999", duration: "2–4 hrs" },
            { title: "Inspections", description: "Safety inspections, pre-purchase checks, and emissions testing.", icon: "clipboard-check", price: "From ₹299", duration: "1 hr" },
          ],
        },
      },
      {
        type: "trust",
        variant: "inline-list",
        content: {
          headline: "Why Drivers Choose Us",
          items: [
            { title: "Certified Technicians", description: "ASE-certified mechanics with expertise across all major brands.", icon: "badge-check" },
            { title: "OEM Parts", description: "We use genuine or OEM-equivalent parts for every repair.", icon: "shield-check" },
            { title: "Transparent Pricing", description: "Written estimates before any work begins. No surprise charges.", icon: "receipt" },
            { title: "Warranty on Work", description: "12-month / 12,000-mile warranty on all parts and labour.", icon: "wrench" },
          ],
        },
      },
      {
        type: "stats",
        variant: "dark-band",
        content: {
          items: [
            { value: "15,000+", label: "Vehicles Serviced" },
            { value: "20 Years", label: "Experience" },
            { value: "200+", label: "5-Star Reviews" },
            { value: "Same Day", label: "Service Available" },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Meet Our Technicians",
          description: "ASE-certified professionals who care about your car as much as you do",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Customers Say",
          items: [
            { name: "Brian H.", text: "Brought my truck in for a strange knock. They diagnosed it fast, fixed it same day, and the price was fair. Won't go anywhere else.", rating: 5 },
            { name: "Kezia O.", text: "Best oil change experience I've had. In and out in 30 minutes with a full inspection report. Highly recommend.", rating: 5 },
            { name: "Tom W.", text: "They saved me from a major engine failure by catching the issue early. Honest team, solid work.", rating: 5 },
            { name: "Anita R.", text: "My car came back looking brand new after the detail package. The ceramic coat is holding up beautifully.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Our Shop",
          description: "A modern, fully equipped workshop built for precision",
          images: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Operating Hours",
          hours: {
            Monday: { open: "07:30", close: "18:00" },
            Tuesday: { open: "07:30", close: "18:00" },
            Wednesday: { open: "07:30", close: "18:00" },
            Thursday: { open: "07:30", close: "18:00" },
            Friday: { open: "07:30", close: "18:00" },
            Saturday: { open: "08:00", close: "16:00" },
            Sunday: { open: "Closed", close: "" },
          },
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Find Us",
          description: "Conveniently located on the main strip with easy drop-off and free parking.",
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do I need an appointment?", answer: "Walk-ins are welcome for oil changes and minor services. For repairs and diagnostics, we recommend booking ahead to guarantee same-day service." },
            { question: "How long does a standard service take?", answer: "Oil changes take about 30–45 minutes. Brake jobs are typically 1–2 hours. Diagnostics vary by issue. We'll give you an ETA when you check in." },
            { question: "Do you provide a courtesy vehicle?", answer: "We offer a free shuttle service within a 10-mile radius. Loaner vehicles are available for jobs that require an overnight stay." },
            { question: "Will you beat a competitor's written quote?", answer: "Yes. Show us a written estimate and we'll match or beat it on like-for-like parts and labour." },
            { question: "What payment methods do you accept?", answer: "We accept all major credit cards, debit, bank transfer, and cash. Finance options available on repairs over $500." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Book Your Service",
          description: "Drop us your details and we'll confirm your slot within 1 hour.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "First-time customer? Get 15% off your first service.",
          description: "Mention this offer when booking online or by phone.",
          cta: { text: "Book Now", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "FastLane Auto | Expert Auto Repair & Service",
      description: "Trusted auto repair for all makes and models. ASE-certified technicians, transparent pricing, same-day service available.",
    },
    animationTier: "standard",
  };
}

export const autoRemixMeta: RemixMeta = {
  compatibleThemes: [
    "graphite",
    "carbon-fibre",
    "industrial-steel",
    "midnight-navy",
    "concrete-gym",
    "high-voltage",
    "slate-blue",
    "charcoal-pro",
  ],
  compatibleHeros: ["image-bg", "centered", "split-image", "gradient"],
  sectionVariants: {
    services: ["featured-grid", "card-grid", "icon-grid", "icon-list"],
    trust: ["inline-list", "badges", "icon-grid"],
    stats: ["dark-band", "counter-row"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    hours: ["simple-card", "card"],
    location: ["map-embed", "card"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

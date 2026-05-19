import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function interiorsPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "interiors",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      headline: "Spaces that feel like you.",
      subheadline: "Studio Forma crafts interiors that balance beauty and function — from residential sanctuaries to bold commercial environments.",
      cta: { text: "Start a Project", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Portfolio", url: "#portfolio" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About Studio Forma",
          description: "Founded on the belief that great design should be deeply personal, Studio Forma is a full-service interior design studio working across residential and commercial spaces. We blend considered aesthetics with practical living — every room we touch is tailored to the people who inhabit it.",
          stats: [
            { value: "120+", label: "Projects Delivered" },
            { value: "8 Years", label: "In Practice" },
            { value: "4.9", label: "Client Rating" },
          ],
        },
      },
      {
        type: "portfolio",
        variant: "categorized",
        content: {
          headline: "Selected Work",
          description: "A curated look at spaces we've designed",
          categories: ["All", "Residential", "Commercial", "Hospitality"],
          items: [],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "What We Do",
          description: "End-to-end design services for spaces of all scales",
          items: [
            { title: "Residential Design", description: "Full-home interior design from concept through installation, tailored to your lifestyle.", icon: "home" },
            { title: "Commercial Spaces", description: "Offices, retail, and hospitality environments designed for brand and performance.", icon: "building-2" },
            { title: "Space Planning", description: "Functional layouts and circulation plans that make every square foot count.", icon: "layout-panel-left" },
            { title: "Furniture Curation", description: "Sourcing and specifying furniture, lighting, and accessories that suit your brief.", icon: "sofa" },
            { title: "Lighting Design", description: "Layered lighting schemes combining natural, ambient, task, and accent light.", icon: "lamp-desk" },
            { title: "3D Visualization", description: "Photorealistic renders and walkthroughs so you can see your space before we build it.", icon: "box" },
          ],
        },
      },
      {
        type: "process",
        variant: "steps-horizontal",
        content: {
          headline: "Our Design Process",
          description: "A collaborative journey from first conversation to finished space",
          steps: [
            { number: 1, title: "Consultation", description: "We listen. A deep-dive session to understand how you live, work, and what you love." },
            { number: 2, title: "Concept Development", description: "Mood boards, material palettes, and spatial concepts that capture your vision." },
            { number: 3, title: "Design Presentation", description: "Detailed drawings, 3D renders, and a full specification for your approval." },
            { number: 4, title: "Procurement", description: "We manage all sourcing, orders, and supplier coordination on your behalf." },
            { number: 5, title: "Installation", description: "On-site oversight and final styling to deliver a space that exceeds expectations." },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Client Stories",
          items: [
            { name: "Sophia L.", text: "Studio Forma transformed our apartment into something out of a magazine. Every detail was considered and the process was effortless.", rating: 5 },
            { name: "James & Nadia C.", text: "We gave them a blank canvas and they returned a home. The level of craft and care was beyond anything we expected.", rating: 5 },
            { name: "The Avery Hotel", text: "Our lobby redesign increased guest satisfaction scores by 22%. The team understood our brand deeply.", rating: 5 },
            { name: "Marcus P.", text: "The 3D renders made it so easy to sign off on decisions. The finished office looks exactly like the visuals — incredible.", rating: 5 },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "The Studio",
          description: "Designers, architects, and makers with one shared obsession — beautiful spaces",
          members: [],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Gallery",
          description: "Spaces conceived, designed, and delivered by Studio Forma",
          images: [],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "What is your typical project timeline?", answer: "Residential projects typically run 3–6 months from consultation to installation. Commercial work varies from 2 months to over a year depending on scope." },
            { question: "Do you work outside the city?", answer: "Yes. We take on projects nationally and have managed projects remotely with great success using virtual consultations and local trusted contractors." },
            { question: "What is your fee structure?", answer: "We charge a flat design fee for smaller projects and a percentage-of-build-cost model for full renovations. We'll outline this clearly in your proposal." },
            { question: "Can I keep my existing furniture?", answer: "Absolutely. We're skilled at integrating beloved pieces into new schemes. We'll advise on what works and what to replace." },
            { question: "Do you manage contractors and tradespeople?", answer: "Yes. We can act as project manager, coordinating all trades, deliveries, and installations so you don't have to." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Start a Conversation",
          description: "Tell us about your project and we'll schedule a complimentary 30-minute discovery call.",
        },
      },
      {
        type: "cta",
        variant: "image-overlay",
        content: {
          headline: "Ready to reimagine your space?",
          description: "We're currently taking on new residential and commercial projects. Initial consultations are complimentary.",
          cta: { text: "Book a Consultation", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Studio Forma | Interior Design Studio",
      description: "Full-service interior design for residential and commercial spaces. Concept through installation.",
    },
    animationTier: "premium",
  };
}

export const interiorsRemixMeta: RemixMeta = {
  compatibleThemes: [
    "gallery-white",
    "linen",
    "paper-white",
    "old-money",
    "sand-dune",
    "spa-onsen",
    "arctic",
    "travertine",
  ],
  compatibleHeros: ["split-image", "centered", "minimal", "image-bg"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    portfolio: ["categorized", "masonry-grid"],
    services: ["card-grid", "icon-grid"],
    process: ["steps-horizontal", "steps-numbered", "icon-flow"],
    testimonials: ["card-grid", "carousel"],
    team: ["grid"],
    gallery: ["masonry", "grid-3"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "minimal-form"],
    cta: ["image-overlay", "banner"],
  },
};

import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function constructionPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "construction",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Built to last. Delivered on time.",
      subheadline: "18 years of building homes, offices, and landmarks that stand for generations. Let's build yours.",
      cta: { text: "Get a Free Quote", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Projects", url: "#project-showcase" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About Cornerstone Build Co.",
          description: "Cornerstone Build Co. has been delivering residential and commercial construction projects since 2007. With a disciplined project management approach, licensed engineers on every site, and a zero-compromise stance on quality, we turn blueprints into built realities — on schedule and within budget.",
          stats: [
            { value: "350+", label: "Projects Completed" },
            { value: "18yr", label: "Experience" },
            { value: "98%", label: "On-Time Delivery" },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "What We Build",
          description: "End-to-end construction across all sectors",
          items: [
            { title: "Residential Construction", description: "Custom homes, villas, and apartment complexes built to your exact specifications.", icon: "home" },
            { title: "Commercial Build", description: "Office towers, retail parks, and mixed-use developments delivered at scale.", icon: "building-2" },
            { title: "Renovation & Remodeling", description: "Structural renovations and full interior remodels that revive existing properties.", icon: "hammer" },
            { title: "Interior Fit-Out", description: "Premium fit-outs for offices, hospitality spaces, and residential interiors.", icon: "paintbrush" },
            { title: "Project Management", description: "Turnkey project management from site acquisition to final handover.", icon: "clipboard-list" },
            { title: "Structural Assessment", description: "Expert structural audits, load calculations, and soil testing for new and existing builds.", icon: "scan-line" },
          ],
        },
      },
      {
        type: "project-showcase",
        variant: "case-study",
        content: {
          headline: "Featured Projects",
          description: "A selection of our completed work",
          projects: [
            {
              title: "Luxury Villa",
              location: "Bel Air",
              category: "Residential",
              description: "6-bedroom custom villa with infinity pool, home theatre, and smart home automation across 8,500 sq ft.",
              stats: [{ label: "Area", value: "8,500 sq ft" }, { label: "Duration", value: "18 months" }],
            },
            {
              title: "Office Complex",
              location: "Downtown",
              category: "Commercial",
              description: "Grade-A office complex with co-working zones, conference centres, and LEED Silver certification.",
              stats: [{ label: "Area", value: "45,000 sq ft" }, { label: "Duration", value: "24 months" }],
            },
            {
              title: "Retail Strip",
              location: "Marina",
              category: "Commercial",
              description: "Waterfront retail strip with 12 anchor tenants, open-air dining promenade, and underground parking.",
              stats: [{ label: "Area", value: "22,000 sq ft" }, { label: "Duration", value: "14 months" }],
            },
            {
              title: "School Campus",
              location: "East Side",
              category: "Institutional",
              description: "K-12 campus with smart classrooms, sports fields, an auditorium, and a dedicated STEM lab block.",
              stats: [{ label: "Area", value: "60,000 sq ft" }, { label: "Duration", value: "30 months" }],
            },
          ],
        },
      },
      {
        type: "process",
        variant: "steps-numbered",
        content: {
          headline: "How We Work",
          description: "A disciplined five-stage process from concept to completion",
          steps: [
            { number: "01", title: "Site Assessment", description: "Detailed soil testing, topographic survey, and feasibility study before a single plan is drawn." },
            { number: "02", title: "Design & Planning", description: "Architectural drawings, structural engineering, and interior layouts reviewed and signed off with you." },
            { number: "03", title: "Permits & Approvals", description: "We handle all municipal permits, regulatory approvals, and compliance clearances on your behalf." },
            { number: "04", title: "Construction", description: "Phased construction with weekly site reports, milestone photography, and live budget tracking." },
            { number: "05", title: "Inspection & Handover", description: "Third-party quality inspection, snagging list resolution, and formal handover with full documentation." },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter-row",
        content: {
          headline: "Our Track Record",
          items: [
            { value: "350", suffix: "+", label: "Projects Completed" },
            { value: "18", suffix: "yr", label: "Industry Experience" },
            { value: "500", prefix: "₹", suffix: "Cr+", label: "Total Build Value" },
            { value: "98", suffix: "%", label: "On-Time Delivery" },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Leadership Team",
          description: "Engineers and project managers who lead every build",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Client Testimonials",
          items: [
            { name: "Ashwin T., Bel Air Villa", text: "Cornerstone delivered my dream home three weeks ahead of schedule. The quality of finishes is exceptional.", rating: 5 },
            { name: "Meera Group, Downtown Office", text: "Professional team, transparent billing, and zero surprises. We've engaged them for two projects since.", rating: 5 },
            { name: "Principal, East Side School", text: "They built our campus with the same care they'd give their own children's school. Absolutely outstanding.", rating: 5 },
          ],
        },
      },
      {
        type: "trust",
        variant: "badges",
        content: {
          headline: "Certifications & Affiliations",
          badges: [
            { label: "ISO 9001 Certified", icon: "award" },
            { label: "Licensed General Contractor", icon: "shield-check" },
            { label: "IGBC Green Building Member", icon: "leaf" },
            { label: "CREDAI Registered", icon: "badge-check" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Project Gallery",
          description: "From groundbreaking to handover",
          images: [],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you handle both residential and commercial projects?", answer: "Yes. We have dedicated teams for residential, commercial, institutional, and hospitality construction. Our project managers specialise by sector." },
            { question: "How do you handle cost overruns?", answer: "We provide a fixed-price contract after detailed BOQ sign-off. Any client-initiated scope changes are documented and priced transparently before work begins." },
            { question: "What is your minimum project size?", answer: "We typically take on projects from ₹50 lakhs and above. For renovation and fit-out work, the minimum is ₹15 lakhs." },
            { question: "Who manages my project on-site?", answer: "Each project has a dedicated site engineer and a project manager as your single point of contact. You receive weekly progress reports." },
            { question: "Do you manage permits and approvals?", answer: "Yes. Our in-house liaison team handles all RERA registrations, municipal building permits, fire NOCs, and completion certificates." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Start Your Project",
          description: "Tell us about your build and we'll schedule a free site consultation within 48 hours.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Your next build deserves the best.",
          description: "350+ completed projects. 18 years. Let's make yours next.",
          cta: { text: "Get a Free Quote", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Cornerstone Build Co. | Construction & Project Management",
      description: "Built to last, delivered on time. Residential, commercial, and institutional construction with 350+ completed projects and 18 years of experience.",
    },
    animationTier: "standard",
  };
}

export const constructionRemixMeta: RemixMeta = {
  compatibleThemes: [
    "architect-blueprint",
    "industrial-steel",
    "concrete-gym",
    "carbon-fibre",
    "midnight-navy",
    "high-voltage",
    "whisky-peat",
    "speakeasy",
  ],
  compatibleHeros: ["image-bg", "stats-hero", "parallax", "video-bg", "centered"],
  sectionVariants: {
    services: ["card-grid", "icon-grid"],
    "project-showcase": ["case-study", "masonry"],
    process: ["steps-numbered", "steps-horizontal"],
    stats: ["counter-row"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel"],
    trust: ["badges"],
    gallery: ["masonry", "grid-3"],
    faq: ["accordion"],
    contact: ["split-form"],
  },
};

import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function homeservicePreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "homeservice",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Reliable repairs. Fast response. Done right.",
      subheadline: "Professional home service experts covering plumbing, electrical, HVAC, and more. Licensed, insured, and available 24/7.",
      cta: { text: "Get a Free Quote", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "Our Services",
          description: "Expert solutions for every corner of your home",
          items: [
            { title: "Plumbing", description: "Leak repairs, pipe installation, drain cleaning, and emergency call-outs.", icon: "droplets" },
            { title: "Electrical", description: "Wiring, panel upgrades, outlet installation, and safety inspections.", icon: "zap" },
            { title: "HVAC", description: "AC installation, furnace repair, duct cleaning, and seasonal tune-ups.", icon: "wind" },
            { title: "Deep Cleaning", description: "Full-home deep clean, post-construction clean-up, and move-in/out services.", icon: "sparkles" },
            { title: "Painting", description: "Interior and exterior painting with premium, low-VOC paints.", icon: "paintbrush" },
            { title: "Carpentry", description: "Custom furniture, door repairs, shelving, and trim work.", icon: "hammer" },
          ],
        },
      },
      {
        type: "trust",
        variant: "badges",
        content: {
          headline: "Why Homeowners Trust Us",
          items: [
            { title: "Licensed & Insured", description: "All technicians are fully licensed and carry liability insurance.", icon: "shield-check" },
            { title: "Background Checked", description: "Every team member passes a thorough background screening.", icon: "user-check" },
            { title: "Fixed Pricing", description: "Transparent quotes upfront — no surprises on your final bill.", icon: "receipt" },
            { title: "Satisfaction Guarantee", description: "If you're not happy, we'll come back and make it right.", icon: "badge-check" },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter-row",
        content: {
          items: [
            { value: "5,000+", label: "Jobs Completed" },
            { value: "4.9★", label: "Average Rating" },
            { value: "24/7", label: "Availability" },
            { value: "10 Years", label: "Experience" },
          ],
        },
      },
      {
        type: "process",
        variant: "steps-numbered",
        content: {
          headline: "How It Works",
          description: "From first call to final sign-off in four simple steps",
          steps: [
            { number: 1, title: "Request a Quote", description: "Call us or submit the online form with details about your issue." },
            { number: 2, title: "Get a Fixed Price", description: "We assess the job and give you a transparent, no-obligation quote." },
            { number: 3, title: "We Get to Work", description: "A vetted technician arrives on time and completes the job to spec." },
            { number: 4, title: "Sign Off & Review", description: "We walk you through the work and ask for your honest feedback." },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Customers Say",
          items: [
            { name: "Sandra M.", text: "Called at 11 PM with a burst pipe and they were at my door within 45 minutes. Absolute lifesavers.", rating: 5 },
            { name: "David K.", text: "They rewired our kitchen and the inspector passed it first time. Professional and tidy crew.", rating: 5 },
            { name: "Priya T.", text: "AC went down during a heatwave. Same-day fix, reasonable price, and they even cleaned the filters.", rating: 5 },
            { name: "Marcus L.", text: "Used them for a full house repaint. Finished on schedule, clean worksite, beautiful result.", rating: 5 },
          ],
        },
      },
      {
        type: "service-areas",
        variant: "list-with-badges",
        content: {
          headline: "Areas We Cover",
          description: "Fast response across the metro region",
          areas: [
            "Downtown", "Northside", "Eastfields", "West End", "Southgate",
            "Riverside", "Hillcrest", "Lakeview", "Midtown", "Parklands",
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Recent Work",
          description: "A sample of jobs completed by our team",
          images: [],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you offer emergency call-outs?", answer: "Yes. Our emergency line is open 24/7 for plumbing, electrical, and HVAC emergencies. Standard call-out fees apply after hours." },
            { question: "Are your technicians licensed?", answer: "All our technicians hold valid trade licenses and are fully insured. We can provide credentials on request." },
            { question: "Do I need to be home during the job?", answer: "For most jobs, yes. However, we can arrange access with a trusted key holder for certain pre-approved work." },
            { question: "How do you price your work?", answer: "We provide fixed-price quotes after assessing the job. There are no hidden fees or hourly surprises." },
            { question: "What is your warranty on completed work?", answer: "All workmanship carries a 12-month warranty. Parts are covered by the manufacturer's warranty." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Request a Quote",
          description: "Fill in your details and we'll get back to you within 2 hours.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Need urgent help? Call us now.",
          description: "Our 24/7 emergency line is always open for plumbing, electrical, and HVAC crises.",
          cta: { text: "Call Now", url: "tel:+1800000000", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Apex Home Services | Reliable Repairs & Home Maintenance",
      description: "Expert plumbing, electrical, HVAC, cleaning, and carpentry services. Licensed, insured, available 24/7.",
    },
    animationTier: "subtle",
  };
}

export const homeserviceRemixMeta: RemixMeta = {
  compatibleThemes: [
    "graphite",
    "industrial-steel",
    "concrete-gym",
    "midnight-navy",
    "carbon-fibre",
    "slate-blue",
    "charcoal-pro",
    "urban-dark",
  ],
  compatibleHeros: ["centered", "split-image", "image-bg", "gradient"],
  sectionVariants: {
    services: ["card-grid", "icon-grid", "icon-list"],
    trust: ["badges", "icon-grid"],
    stats: ["counter-row"],
    process: ["steps-numbered", "icon-flow"],
    testimonials: ["card-grid", "carousel"],
    "service-areas": ["list-with-badges"],
    gallery: ["masonry", "grid-3"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

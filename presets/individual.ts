import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function individualPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "individual",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "minimal",
      headline: "Independent. Intentional. Effective.",
      subheadline: "I'm Alex Morgan — a designer and consultant helping brands think clearly, move faster, and show up beautifully.",
      cta: { text: "Work With Me", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View My Work", url: "#portfolio" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About Me",
          description: "I've spent the past decade at the intersection of design and strategy — helping early-stage startups, scaling brands, and individual founders cut through noise and build something that lasts. I work with a small number of clients at a time so every project gets my full attention.",
          stats: [
            { value: "10 Years", label: "Experience" },
            { value: "60+", label: "Clients Served" },
            { value: "4.9", label: "Client Rating" },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "How I Can Help",
          description: "Focused engagements built around your actual needs",
          items: [
            { title: "Brand Strategy", description: "Positioning, messaging frameworks, and brand architecture for businesses that want to stand for something.", icon: "target" },
            { title: "UI/UX Design", description: "Interface design and user experience for web and mobile products — from wireframes to pixel-perfect handoff.", icon: "layout-template" },
            { title: "Web Development", description: "Clean, performant websites and web apps built with modern tooling. No bloat, just what you need.", icon: "code-2" },
            { title: "Consulting", description: "One-on-one strategy sessions to diagnose problems and create a clear path forward.", icon: "lightbulb" },
            { title: "Workshops", description: "Half-day or full-day working sessions for teams on design thinking, brand, or product strategy.", icon: "users" },
            { title: "Content Direction", description: "Content strategy, copywriting guidance, and editorial frameworks that align with your brand voice.", icon: "pen-line" },
          ],
        },
      },
      {
        type: "portfolio",
        variant: "masonry-grid",
        content: {
          headline: "Selected Projects",
          description: "A curated sample of recent work",
          items: [],
        },
      },
      {
        type: "process",
        variant: "icon-flow",
        content: {
          headline: "How I Work",
          description: "A lean, collaborative process that respects your time",
          steps: [
            { number: 1, title: "Discover", description: "We start with a deep-dive call to understand your goals, constraints, and context.", icon: "search" },
            { number: 2, title: "Define", description: "I frame the problem clearly and propose a scope of work with deliverables and timeline.", icon: "file-text" },
            { number: 3, title: "Create", description: "I do the work — iterating quickly and sharing progress as we go.", icon: "pencil-ruler" },
            { number: 4, title: "Deliver", description: "Final assets, documentation, and a handoff call to make sure everything lands well.", icon: "send" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Client Feedback",
          items: [
            { name: "Isabelle N., Founder", text: "Alex helped us reframe our entire positioning in a single workshop. Completely changed how we talk about ourselves — and it's working.", rating: 5 },
            { name: "Chris D., Product Lead", text: "The UI redesign Alex delivered increased our trial-to-paid conversion by 18%. Thorough, fast, and a pleasure to work with.", rating: 5 },
            { name: "Mara T., CEO", text: "I've worked with agencies and in-house teams. Alex delivers agency-quality thinking with the responsiveness of a great employee.", rating: 5 },
            { name: "Wei F., Startup Founder", text: "Two workshops with Alex saved us from an expensive pivot. The clarity she brought to our product strategy was invaluable.", rating: 5 },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Common Questions",
          items: [
            { question: "Are you available for full-time or part-time engagements?", answer: "I take on both. I offer fractional arrangements (2–3 days per week) for ongoing retainers and project-based work for defined deliverables." },
            { question: "What is your typical rate?", answer: "Project rates depend on scope and timeline. I'm happy to discuss on a call once I understand what you're trying to accomplish." },
            { question: "How many clients do you work with at once?", answer: "I keep my client list intentionally small — typically 2–4 active clients — so each engagement gets genuine focus." },
            { question: "Do you work remotely?", answer: "Yes, primarily. I'm comfortable working fully remote and have done so for years. I'm also happy to travel for key sessions when it adds real value." },
            { question: "What's the best way to get started?", answer: "Send me a message below with a brief overview of your project. I'll reply within 24 hours to schedule a call." },
          ],
        },
      },
      {
        type: "contact",
        variant: "minimal-form",
        content: {
          headline: "Get in Touch",
          description: "Have a project in mind? Tell me about it and I'll get back to you within one business day.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Currently accepting new projects for Q3.",
          description: "Limited slots available. Let's talk before they fill up.",
          cta: { text: "Start the Conversation", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Alex Morgan | Designer & Consultant",
      description: "Independent designer and consultant specialising in brand strategy, UI/UX design, and web development.",
    },
    animationTier: "standard",
  };
}

export const individualRemixMeta: RemixMeta = {
  compatibleThemes: [
    "portfolio-studio",
    "paper-white",
    "linen",
    "arctic",
    "gallery-white",
    "travertine",
    "midnight-navy",
    "slate-blue",
  ],
  compatibleHeros: ["minimal", "centered", "split-image", "gradient"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    services: ["card-grid", "icon-grid", "icon-list"],
    portfolio: ["masonry-grid", "categorized"],
    process: ["icon-flow", "steps-numbered", "steps-horizontal"],
    testimonials: ["card-grid", "carousel"],
    faq: ["accordion", "two-column"],
    contact: ["minimal-form", "split-form"],
    cta: ["banner"],
  },
};

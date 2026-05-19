import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function nonprofitPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "nonprofit",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Every action creates a ripple.",
      subheadline: "Brightpath Foundation empowers communities through education, health, and livelihood programs that create lasting change.",
      cta: { text: "Donate Now", url: "#donations", variant: "primary" },
      secondaryCta: { text: "Our Programs", url: "#programs" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "Who We Are",
          description: "Brightpath Foundation is a registered nonprofit dedicated to breaking cycles of poverty and inequality. Since 2014, we've worked hand-in-hand with underserved communities to build sustainable futures through youth education, community health, livelihood training, and environmental stewardship. We believe lasting change starts from within communities — our role is to provide the tools, training, and support to make it happen.",
          stats: [
            { value: "10 Years", label: "In Operation" },
            { value: "35,000+", label: "Lives Impacted" },
            { value: "92%", label: "Program Delivery Rate" },
          ],
        },
      },
      {
        type: "impact",
        variant: "stats-grid",
        content: {
          headline: "Our Impact",
          description: "Numbers that represent real people, real change",
          items: [
            { value: "12,400", label: "Children enrolled in education programs", icon: "graduation-cap" },
            { value: "8,200", label: "Health consultations delivered", icon: "heart-pulse" },
            { value: "4,600", label: "Livelihoods created or strengthened", icon: "briefcase" },
            { value: "18", label: "Communities actively served", icon: "map-pin" },
            { value: "3,100", label: "Trees planted this year", icon: "tree-pine" },
            { value: "98%", label: "Donor retention rate", icon: "users" },
          ],
        },
      },
      {
        type: "programs",
        variant: "card-grid",
        content: {
          headline: "Our Programs",
          description: "Four pillars of change — sustained, measurable, community-led",
          items: [
            { title: "Youth Education", description: "After-school tutoring, digital literacy classes, and scholarship support for children aged 6–18 in low-income areas.", icon: "book-open" },
            { title: "Community Health", description: "Free clinics, maternal care workshops, mental health support, and health education campaigns.", icon: "stethoscope" },
            { title: "Livelihood Training", description: "Vocational skills programs, microfinance access, and business mentorship for adults seeking economic independence.", icon: "trending-up" },
            { title: "Environmental Action", description: "Tree planting drives, clean water access projects, and community-led waste reduction initiatives.", icon: "leaf" },
          ],
        },
      },
      {
        type: "donations",
        variant: "simple-form",
        content: {
          headline: "Support Our Work",
          description: "Every rupee goes directly to programs on the ground. We publish full financial reports annually.",
          amounts: [500, 1000, 2500, 5000],
          customAmountLabel: "Custom Amount",
          cta: { text: "Donate Securely", url: "#", variant: "primary" },
          trustNote: "Your donation is tax-deductible under Section 80G. You'll receive a receipt via email.",
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Our Leadership",
          description: "Driven by purpose, guided by community",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Voices From the Field",
          items: [
            { name: "Sunita R., Program Beneficiary", text: "The livelihood training helped me start my own tailoring business. I now employ two other women from my village.", rating: 5 },
            { name: "Ramesh D., Volunteer", text: "Volunteering with Brightpath has been the most meaningful thing I've done. The team is genuinely committed.", rating: 5 },
            { name: "Kavitha M., Corporate Donor", text: "We've partnered with Brightpath for three years. Their transparency and community impact are unmatched.", rating: 5 },
            { name: "Arjun P., Scholarship Recipient", text: "Without the scholarship, I would have dropped out in Class 9. I'm now finishing my engineering degree.", rating: 5 },
          ],
        },
      },
      {
        type: "achievements",
        variant: "stats",
        content: {
          headline: "Recognition & Milestones",
          items: [
            { value: "2019", label: "National NGO Excellence Award" },
            { value: "2021", label: "UNDP Community Impact Partner" },
            { value: "2023", label: "Forbes Social Impact Spotlight" },
            { value: "4★", label: "GuideStar Transparency Rating" },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "From the Ground",
          description: "Moments from our programs, communities, and volunteers",
          images: [],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "How is my donation used?", answer: "At least 88 cents of every dollar goes directly to programs. Our full annual financial report is available on our website and filed with regulators." },
            { question: "Is my donation tax-deductible?", answer: "Yes. Brightpath Foundation is a registered 501(c)(3) organization. You'll receive a tax receipt via email after every donation." },
            { question: "Can I volunteer with you?", answer: "Absolutely. We welcome individual and corporate volunteers. Fill out our volunteer form and we'll match you with a program that fits your skills and availability." },
            { question: "Can my company partner with you?", answer: "Yes. We have CSR partnership programs ranging from employee volunteering to co-branded fundraising campaigns. Contact us to discuss options." },
            { question: "Do you accept in-kind donations?", answer: "We accept books, stationery, medical supplies, and IT equipment that meet our program needs. Please contact us before sending anything." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Get in Touch",
          description: "Reach out for partnerships, volunteering, media inquiries, or general questions.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Every action creates a ripple. Be the first one.",
          description: "Join thousands of donors and volunteers building better futures across 18 communities.",
          cta: { text: "Donate Today", url: "#donations", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Brightpath Foundation | Community Empowerment Nonprofit",
      description: "Empowering communities through youth education, health, livelihood training, and environmental action since 2014.",
    },
    animationTier: "subtle",
  };
}

export const nonprofitRemixMeta: RemixMeta = {
  compatibleThemes: [
    "mutual-aid",
    "wellness-coral",
    "apothecary-green",
    "linen",
    "paper-white",
    "forest-floor",
    "sand-dune",
    "spa-onsen",
  ],
  compatibleHeros: ["centered", "split-image", "image-bg", "gradient"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    impact: ["stats-grid", "counter-row"],
    programs: ["card-grid", "icon-grid"],
    donations: ["simple-form"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel"],
    achievements: ["stats", "counter-row"],
    gallery: ["masonry", "grid-3"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

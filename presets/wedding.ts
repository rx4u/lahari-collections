import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function weddingPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "wedding",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Your love story, beautifully told.",
      subheadline: "Bespoke wedding planning, design, and coordination that turns your vision into an unforgettable celebration.",
      cta: { text: "Start Planning", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Our Work", url: "#gallery" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About Eternal Celebrations",
          description: "Eternal Celebrations is a boutique wedding planning studio specialising in intimate gatherings and grand affairs alike. We believe every couple deserves a day that feels entirely, unmistakably theirs — and we pour every detail into making that happen.",
          stats: [
            { value: "200+", label: "Weddings Planned" },
            { value: "8yr", label: "Experience" },
            { value: "4.9", label: "Average Rating" },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "What We Do",
          description: "Every detail, handled with care",
          items: [
            { title: "Full Event Planning", description: "End-to-end wedding management from save-the-dates to final farewell.", icon: "calendar-check" },
            { title: "Venue Decoration", description: "Floral installations, draping, lighting design, and statement backdrops.", icon: "sparkles" },
            { title: "Floral Design", description: "Custom bridal bouquets, ceremony arches, and table arrangements by our in-house florists.", icon: "flower-2" },
            { title: "Photography & Film", description: "Curated network of award-winning photographers and cinematic videographers.", icon: "camera" },
            { title: "Catering Coordination", description: "Multi-cuisine menus, tasting sessions, and seamless day-of service management.", icon: "utensils" },
            { title: "Honeymoon Planning", description: "Personalised honeymoon itineraries, flight and hotel bookings, and surprise experiences.", icon: "plane" },
          ],
        },
      },
      {
        type: "packages",
        variant: "card-grid",
        content: {
          headline: "Our Packages",
          description: "Thoughtfully designed for every kind of celebration",
          plans: [
            {
              name: "Intimate",
              subtitle: "Up to 50 guests",
              price: "1,75,000",
              period: "package",
              features: [
                "Full-day event coordination",
                "Venue decoration (ceremony + reception)",
                "Floral arrangement — 3 key setups",
                "Photography (8 hours)",
                "Catering coordination",
                "Day-of timeline management",
              ],
              cta: { text: "Enquire", url: "#contact" },
            },
            {
              name: "Classic",
              subtitle: "Up to 150 guests",
              price: "3,50,000",
              period: "package",
              highlighted: true,
              features: [
                "Full wedding planning (3 months)",
                "Venue scouting & booking",
                "Complete floral design",
                "Photography + Videography",
                "Catering coordination (3 meals)",
                "Mehendi, sangeet & reception",
                "Honeymoon planning",
              ],
              cta: { text: "Enquire", url: "#contact" },
            },
            {
              name: "Grand Affair",
              subtitle: "300+ guests",
              price: "On Request",
              period: "",
              features: [
                "6-month full-service planning",
                "Luxury venue partnerships",
                "Celebrity entertainment coordination",
                "Multi-day event management",
                "Bespoke décor & theme design",
                "Dedicated on-day team of 10+",
                "International honeymoon planning",
              ],
              cta: { text: "Book a Consultation", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Our Work",
          description: "A glimpse into the celebrations we've crafted",
          images: [],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Meet the Team",
          description: "Planners, designers, and dreamers at your service",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Love Stories from Our Couples",
          items: [
            { name: "Ananya & Karan", text: "Eternal Celebrations turned our vision into a fairytale. Every detail was perfect — from the floral arches to the final sendoff.", rating: 5 },
            { name: "Priya & Rohan", text: "We had 280 guests and zero stress on our wedding day. The team handled everything flawlessly. Worth every penny.", rating: 5 },
            { name: "Divya & Arjun", text: "Our intimate beachside ceremony was exactly what we wanted. They listened, planned, and delivered beyond our expectations.", rating: 5 },
          ],
        },
      },
      {
        type: "process",
        variant: "steps-horizontal",
        content: {
          headline: "How We Bring Your Day to Life",
          description: "A five-step journey from dream to reality",
          steps: [
            { number: "01", title: "Dream Consultation", description: "We sit down with you to understand your vision, style, and priorities. No details are too small." },
            { number: "02", title: "Venue Selection", description: "We shortlist and visit venues that match your aesthetic, guest count, and budget." },
            { number: "03", title: "Vendor Coordination", description: "We curate and confirm the best photographers, caterers, florists, and entertainers for your day." },
            { number: "04", title: "Final Walkthrough", description: "A detailed run-through of every moment of the day, so nothing is left to chance." },
            { number: "05", title: "Your Perfect Day", description: "We're on-site from setup to send-off, so you can be fully present in every moment." },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "How far in advance should we book?", answer: "For peak season (October–February), we recommend booking 9–12 months in advance. For off-season dates, 4–6 months is usually sufficient." },
            { question: "Do you work with destination weddings?", answer: "Yes. We plan destination weddings across India and internationally. Additional coordination fees apply for out-of-city events." },
            { question: "Can we choose our own vendors?", answer: "Absolutely. We're happy to work with your preferred vendors and integrate them into the day's planning seamlessly." },
            { question: "What is included in day-of coordination?", answer: "A dedicated coordinator and assistant are on-site for the full event, managing timelines, vendor communication, and any last-minute surprises." },
            { question: "Is a payment plan available?", answer: "Yes. We offer a phased payment structure: 30% at booking, 40% three months before the event, and the balance on the week of the wedding." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Let's Plan Your Wedding",
          description: "Tell us about your dream day and we'll set up a complimentary consultation.",
        },
      },
      {
        type: "cta",
        variant: "image-overlay",
        content: {
          headline: "Every great love story deserves a perfect day.",
          description: "Eternal Celebrations. Where every detail tells your story.",
          cta: { text: "Start Planning", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Eternal Celebrations | Wedding Planner & Event Design",
      description: "Your love story, beautifully told. Boutique wedding planning, floral design, photography coordination, and full-service event management.",
    },
    animationTier: "premium",
  };
}

export const weddingRemixMeta: RemixMeta = {
  compatibleThemes: [
    "desert-rose",
    "linen",
    "botanical",
    "natural-wine",
    "wine-country",
    "skincare-matte",
    "spa-onsen",
    "paper-white",
  ],
  compatibleHeros: ["image-bg", "split-image", "parallax", "collage", "gradient"],
  sectionVariants: {
    services: ["card-grid", "icon-grid"],
    packages: ["card-grid", "pricing-cards"],
    gallery: ["masonry", "grid-3", "collage"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel"],
    process: ["steps-horizontal", "steps-numbered"],
    faq: ["accordion", "two-column"],
    contact: ["split-form"],
    cta: ["image-overlay", "banner"],
  },
};

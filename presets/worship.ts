import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function worshipPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "worship",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "A place to belong. A community to grow.",
      subheadline: "Grace Community Church welcomes everyone. Join us for worship, fellowship, and a life rooted in faith.",
      cta: { text: "Join Us Sunday", url: "#hours", variant: "primary" },
      secondaryCta: { text: "Our Programs", url: "#programs" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About Grace Community Church",
          description: "Founded in 1998, Grace Community Church is a vibrant, multi-generational congregation dedicated to worship, discipleship, and serving our neighbours. We believe every person has a place here — whether you're exploring faith for the first time or have walked with God for decades. Our doors are always open.",
          stats: [
            { value: "26 Years", label: "Serving the Community" },
            { value: "1,200+", label: "Active Members" },
            { value: "18", label: "Ministries & Programs" },
          ],
        },
      },
      {
        type: "programs",
        variant: "card-grid",
        content: {
          headline: "Our Programs",
          description: "Ministries for every season of life",
          items: [
            { title: "Sunday Service", description: "Weekly worship service with contemporary and traditional elements. All are welcome.", icon: "church" },
            { title: "Youth Ministry", description: "A safe, fun, faith-filled space for teens to grow, connect, and lead.", icon: "users" },
            { title: "Bible Study", description: "Mid-week small groups exploring scripture in depth across the city.", icon: "book-open" },
            { title: "Community Outreach", description: "Food drives, shelter volunteering, and neighbourhood support initiatives.", icon: "heart-handshake" },
            { title: "Choir & Worship", description: "Join our choir or worship team and use your gifts to glorify God together.", icon: "music" },
            { title: "Prayer Groups", description: "Intimate, focused prayer gatherings held every Tuesday and Thursday morning.", icon: "hands-praying" },
          ],
        },
      },
      {
        type: "events-calendar",
        variant: "list",
        content: {
          headline: "Upcoming Events",
          description: "All are welcome to join us",
          items: [
            { title: "Sunday Worship Service", description: "Weekly celebration of faith with worship, message, and community.", frequency: "Every Sunday", time: "9:00 AM & 11:00 AM" },
            { title: "Youth Night", description: "Games, worship, and discussion for teens aged 12–18.", frequency: "Bi-weekly Friday", time: "6:30 PM" },
            { title: "Community Dinner", description: "Free shared meal open to all — members and neighbours alike.", frequency: "First Saturday of month", time: "5:00 PM" },
            { title: "Annual Church Retreat", description: "A weekend away for spiritual renewal, fellowship, and rest.", frequency: "Annually in October", time: "Fri–Sun" },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Our Leadership",
          description: "Shepherding the congregation with humility and purpose",
          members: [],
        },
      },
      {
        type: "donations",
        variant: "simple-form",
        content: {
          headline: "Support the Mission",
          description: "Your giving enables our programs, outreach, and facilities. Every contribution makes a difference.",
          amounts: [500, 1000, 2500, 5000],
          customAmountLabel: "Custom Amount",
          cta: { text: "Give Now", url: "#", variant: "primary" },
          trustNote: "All tithes and offerings are acknowledged. Financial statements are available to members on request.",
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Members Say",
          items: [
            { name: "Rachel M.", text: "Grace Church is where I found community after moving to a new city. The warmth here is real.", rating: 5 },
            { name: "Thomas K.", text: "The Bible Study groups changed how I understand faith. Deep, honest, welcoming.", rating: 5 },
            { name: "Priya L.", text: "My kids love Youth Ministry. It's the highlight of their week and I trust the leaders completely.", rating: 5 },
            { name: "James O.", text: "After years away from church, Grace welcomed me back without judgment. I'm home.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Life at Grace",
          description: "Moments of worship, fellowship, and service",
          images: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Service Times",
          hours: {
            Sunday: { open: "09:00", close: "12:30" },
            Monday: "closed",
            Tuesday: { open: "07:00", close: "09:00" },
            Wednesday: { open: "18:30", close: "20:30" },
            Thursday: { open: "07:00", close: "09:00" },
            Friday: { open: "18:30", close: "21:00" },
            Saturday: "closed",
          },
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Find Us",
          description: "We're located in the heart of the community. Ample parking is available on-site.",
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Get in Touch",
          description: "Whether you have a question, need prayer, or want to get involved — we'd love to hear from you.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "You are welcome here.",
          description: "Join us this Sunday and experience the warmth of Grace Community Church for yourself.",
          cta: { text: "Plan Your Visit", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Grace Community Church | A Place to Belong",
      description: "A welcoming church community offering Sunday services, youth ministry, Bible study, and outreach programs.",
    },
    animationTier: "subtle",
  };
}

export const worshipRemixMeta: RemixMeta = {
  compatibleThemes: [
    "linen",
    "paper-white",
    "sand-dune",
    "spa-onsen",
    "apothecary-green",
    "forest-floor",
    "mutual-aid",
    "wellness-coral",
  ],
  compatibleHeros: ["image-bg", "centered", "split-image", "gradient"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    programs: ["card-grid", "icon-grid"],
    "events-calendar": ["list"],
    team: ["grid"],
    donations: ["simple-form"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    hours: ["simple-card"],
    location: ["map-embed"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

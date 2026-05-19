import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function wellnessPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "wellness",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      headline: "Balance your body. Quiet your mind.",
      subheadline: "A sanctuary for healing, movement, and inner peace. Begin your wellness journey today.",
      cta: { text: "Book a Class", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Schedule", url: "#class-schedule" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "Welcome to Serenity Wellness Studio",
          description: "Founded on the belief that true wellness touches every part of you — body, mind, and spirit. Our certified practitioners bring decades of experience in yoga, meditation, and holistic healing under one roof.",
          stats: [
            { value: "12+", label: "Years in Practice" },
            { value: "2,000+", label: "Happy Members" },
            { value: "4.9", label: "Average Rating" },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "Our Offerings",
          description: "Holistic practices for a healthier, happier you",
          items: [
            { title: "Yoga Classes", description: "Hatha, Vinyasa, Yin, and restorative yoga for all levels.", icon: "activity" },
            { title: "Meditation", description: "Guided mindfulness and breathwork sessions to calm the nervous system.", icon: "brain" },
            { title: "Massage Therapy", description: "Swedish, deep-tissue, and aromatherapy massages by certified therapists.", icon: "hand" },
            { title: "Sound Healing", description: "Tibetan bowls and crystal sound baths for deep cellular relaxation.", icon: "music" },
            { title: "Nutrition Coaching", description: "Personalized dietary guidance aligned with your wellness goals.", icon: "apple" },
            { title: "Reiki", description: "Energy healing sessions to restore balance and promote natural healing.", icon: "zap" },
          ],
        },
      },
      {
        type: "class-schedule",
        variant: "card-grid",
        content: {
          headline: "Weekly Class Schedule",
          description: "Morning and evening sessions Monday through Saturday",
          schedule: {
            Monday: [
              { time: "07:00", name: "Morning Hatha Yoga", trainer: "Ananya" },
              { time: "18:30", name: "Evening Vinyasa", trainer: "Priya" },
            ],
            Tuesday: [
              { time: "07:00", name: "Guided Meditation", trainer: "Rishi" },
              { time: "18:30", name: "Sound Healing", trainer: "Kavya" },
            ],
            Wednesday: [
              { time: "07:00", name: "Yin Yoga", trainer: "Ananya" },
              { time: "18:30", name: "Breathwork & Meditation", trainer: "Rishi" },
            ],
            Thursday: [
              { time: "07:00", name: "Power Vinyasa", trainer: "Priya" },
              { time: "18:30", name: "Restorative Yoga", trainer: "Ananya" },
            ],
            Friday: [
              { time: "07:00", name: "Morning Meditation", trainer: "Rishi" },
              { time: "18:30", name: "Reiki Circle", trainer: "Kavya" },
            ],
            Saturday: [
              { time: "08:00", name: "Weekend Flow Yoga", trainer: "Priya" },
              { time: "10:00", name: "Sound Bath", trainer: "Kavya" },
            ],
          },
        },
      },
      {
        type: "membership",
        variant: "pricing-cards",
        content: {
          headline: "Membership Plans",
          description: "Commit to your wellness journey",
          plans: [
            {
              name: "Drop-In",
              price: "699",
              period: "per session",
              features: ["Single class access", "Mat & props included", "Locker access", "Herbal welcome tea"],
              cta: { text: "Book a Class", url: "#contact" },
            },
            {
              name: "Monthly Unlimited",
              price: "3,999",
              period: "month",
              highlighted: true,
              features: ["Unlimited class access", "One free massage/month", "Nutrition check-in", "Priority booking", "Member community access"],
              cta: { text: "Join Now", url: "#contact" },
            },
            {
              name: "Annual VIP",
              price: "39,999",
              period: "year",
              features: ["All Monthly features", "Two massages/month", "Quarterly nutrition plan", "Private coaching session", "Exclusive workshops & retreats"],
              cta: { text: "Enquire", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Meet Our Practitioners",
          description: "Certified healers dedicated to your transformation",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Our Members Say",
          items: [
            { name: "Divya S.", text: "Serenity changed my relationship with stress. The sound healing sessions are life-changing.", rating: 5 },
            { name: "Rohan M.", text: "Three months in and I sleep better, feel calmer, and move without pain. Best investment I've made.", rating: 5 },
            { name: "Preethi K.", text: "The nutrition coaching paired with yoga has completely transformed how I eat and feel.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "The Studio",
          description: "A peaceful space designed to support your practice",
          images: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Studio Hours",
          hours: {
            Monday: { open: "06:30", close: "20:00" },
            Tuesday: { open: "06:30", close: "20:00" },
            Wednesday: { open: "06:30", close: "20:00" },
            Thursday: { open: "06:30", close: "20:00" },
            Friday: { open: "06:30", close: "20:00" },
            Saturday: { open: "07:00", close: "14:00" },
            Sunday: "closed",
          },
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Find Us",
          description: "Conveniently located in the heart of the city",
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do I need prior experience for yoga classes?", answer: "Not at all. We welcome complete beginners. Our instructors provide modifications for every level in every class." },
            { question: "What should I bring to class?", answer: "Comfortable clothes and a water bottle. We provide mats, blocks, bolsters, and straps. You're welcome to bring your own mat." },
            { question: "Can I try before joining a membership?", answer: "Yes. We offer a single drop-in pass so you can experience the studio before committing to a membership plan." },
            { question: "How do I book a massage or Reiki session?", answer: "You can book directly through the contact form below, call us, or use the member portal if you're an existing member." },
            { question: "Are online or hybrid classes available?", answer: "Yes. Monthly Unlimited and Annual VIP members get access to our live-streamed morning sessions when they can't make it in person." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Book a Session",
          description: "Reach out to reserve your spot or ask us anything.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Your wellness journey starts with one step.",
          description: "Join Serenity today and feel the difference within a week.",
          cta: { text: "Get Started", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Serenity Wellness Studio | Yoga, Meditation & Holistic Healing",
      description: "Balance your body and quiet your mind at Serenity Wellness Studio. Yoga, meditation, massage, sound healing, and nutrition coaching.",
    },
    animationTier: "standard",
  };
}

export const wellnessRemixMeta: RemixMeta = {
  compatibleThemes: [
    "wellness-coral",
    "spa-onsen",
    "botanical-apothecary",
    "meditation-zen",
    "linen",
    "botanical",
    "forest-floor",
    "desert-rose",
  ],
  compatibleHeros: ["split-image", "centered", "gradient", "minimal", "image-bg"],
  sectionVariants: {
    services: ["card-grid", "icon-grid", "icon-list"],
    "class-schedule": ["card-grid", "weekly-table"],
    membership: ["pricing-cards", "tier-cards"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel", "simple-grid"],
    gallery: ["masonry", "grid-3"],
    faq: ["accordion", "two-column"],
    contact: ["split-form"],
  },
};

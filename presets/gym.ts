import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function gymPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "gym",
    },
    theme: {
      mode: "dark",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "video-bg",
      headline: "Transform your body, elevate your life",
      subheadline: "World-class training facilities, expert coaches, and a community that pushes you beyond your limits.",
      cta: { text: "Start Free Trial", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Plans", url: "#membership" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Training Programs",
          description: "Find the workout that fits your goals",
          items: [
            { title: "CrossFit", description: "High-intensity functional training to build strength and endurance.", icon: "flame" },
            { title: "Strength Training", description: "Progressive overload programs with free weights and machines.", icon: "dumbbell" },
            { title: "Yoga & Flexibility", description: "Vinyasa, power yoga, and mobility classes for mind-body balance.", icon: "flower-2" },
            { title: "Cardio Zone", description: "Treadmills, cycles, and rowing machines for peak cardiovascular fitness.", icon: "heart-pulse" },
            { title: "Personal Training", description: "One-on-one coaching with certified trainers for customized results.", icon: "user-check" },
            { title: "Group Classes", description: "Zumba, HIIT, spinning, and aerobics with high-energy instructors.", icon: "users" },
          ],
        },
      },
      {
        type: "class-schedule",
        variant: "weekly-table",
        content: {
          headline: "Class Schedule",
          description: "Weekly timetable for all group sessions",
          schedule: {
            Monday: [
              { time: "06:00", name: "CrossFit", trainer: "Coach Arjun" },
              { time: "07:30", name: "Yoga", trainer: "Meera" },
              { time: "18:00", name: "HIIT", trainer: "Coach Ravi" },
            ],
            Wednesday: [
              { time: "06:00", name: "Strength", trainer: "Coach Arjun" },
              { time: "07:30", name: "Zumba", trainer: "Priya" },
              { time: "18:00", name: "CrossFit", trainer: "Coach Ravi" },
            ],
            Friday: [
              { time: "06:00", name: "HIIT", trainer: "Coach Arjun" },
              { time: "07:30", name: "Yoga", trainer: "Meera" },
              { time: "18:00", name: "Spinning", trainer: "Coach Ravi" },
            ],
          },
        },
      },
      {
        type: "membership",
        variant: "tier-cards",
        content: {
          headline: "Membership Plans",
          description: "Choose the plan that fits your fitness journey",
          plans: [
            {
              name: "Basic",
              price: "1,999",
              period: "month",
              features: ["Gym floor access", "Locker room", "Basic equipment", "Open 6 AM - 10 PM"],
              cta: { text: "Join Now", url: "#contact" },
            },
            {
              name: "Pro",
              price: "3,499",
              period: "month",
              highlighted: true,
              features: ["All Basic features", "Group classes", "Sauna & steam", "Diet consultation", "InBody analysis"],
              cta: { text: "Join Now", url: "#contact" },
            },
            {
              name: "Elite",
              price: "5,999",
              period: "month",
              features: ["All Pro features", "Personal trainer (8 sessions)", "Nutrition plan", "Priority booking", "Guest passes (2/month)"],
              cta: { text: "Join Now", url: "#contact" },
            },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Our Trainers",
          members: [],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "The Facility",
          description: "10,000 sq ft of premium training space in Madhapur",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "Member Stories",
          items: [
            { name: "Vikram R.", text: "Lost 15 kgs in 4 months. The trainers here are next level.", rating: 5 },
            { name: "Sneha P.", text: "Best gym in Hyderabad. The CrossFit program changed my life.", rating: 5 },
            { name: "Karthik D.", text: "Incredible facility and motivating atmosphere. Worth every rupee.", rating: 5 },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Visit Us",
          description: "Located in Madhapur, Hyderabad. Walk in for a free tour anytime.",
        },
      },
    ],
    seo: {
      title: "Gym | Premium Fitness Center in Hyderabad",
      description: "Transform your body with CrossFit, strength training, yoga, and personal coaching in Hyderabad.",
    },
    animationTier: "premium",
  };
}

export const gymRemixMeta: RemixMeta = {
  compatibleThemes: [
    "gym-kettlebell",
    "carbon-fibre",
    "concrete-gym",
    "high-voltage",
    "neon-arcade",
    "midnight-navy",
    "sports-turf",
    "industrial-steel",
  ],
  compatibleHeros: ["video-bg", "image-bg", "parallax", "stats-hero", "gradient"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    "class-schedule": ["weekly-table"],
    membership: ["tier-cards"],
    team: ["grid"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
  },
};

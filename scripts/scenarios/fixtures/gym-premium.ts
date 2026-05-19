/**
 * Scenario: a gym site on a premium-tier theme — many variants, multiple
 * variant-required fields exercised (cta:countdown needs deadline,
 * announcement:modal needs text, class-schedule needs schedule).
 */
const scenario = {
  name: "gym:premium",
  designTokens: {
    colors: {
      neutral: "oklch(0.99 0 0)",
      primary: "oklch(0.12 0.02 240)",
      secondary: "oklch(0.50 0.04 240)",
      tertiary: "oklch(0.65 0.20 30)",
      surface: "oklch(0.96 0.01 240)",
      onPrimary: "oklch(0.98 0 0)",
    },
  },
  config: {
    hero: { style: "video-bg", headline: "Train relentlessly" },
    nav: {
      items: [
        { href: "#class-schedule", label: "Classes" },
        { href: "#membership", label: "Pricing" },
        { href: "#cta", label: "Join" },
      ],
    },
    sections: [
      {
        type: "announcement",
        variant: "modal",
        content: { title: "New year sale — 30% off annual passes" },
      },
      {
        type: "class-schedule",
        variant: "weekly-table",
        content: {
          headline: "This week",
          schedule: [{ day: "Mon", class: "HIIT", time: "06:00" }],
        },
      },
      {
        type: "membership",
        variant: "tier-cards",
        content: {
          headline: "Plans",
          plans: [{ name: "Monthly", price: 2999 }],
        },
      },
      {
        type: "cta",
        variant: "countdown",
        content: {
          headline: "Sale ends Sunday",
          deadline: "2026-12-31T23:59:59Z",
        },
      },
    ],
  },
  expect: { dark: false, requiredAnchors: ["class-schedule", "membership", "cta"] },
};
export default scenario;

/**
 * Scenario: restaurant on a dark, sans-driven theme.
 * Exercises: dark-mode auto-detection (neutral lightness < 0.3), menu-food
 * + gallery before-after variant + hours inline-banner, FAQ section. Should
 * also catch dead-anchor in nav.
 */
const scenario = {
  name: "restaurant:dark-sans",
  designTokens: {
    colors: {
      neutral: "oklch(0.16 0.005 0)",
      primary: "oklch(0.98 0 0)",
      secondary: "oklch(0.70 0 0)",
      tertiary: "oklch(0.72 0.15 65)",
      surface: "oklch(0.22 0.005 0)",
      onPrimary: "oklch(0.13 0 0)",
    },
  },
  config: {
    hero: { style: "image-bg", headline: "Plates worth coming back for" },
    nav: {
      items: [
        { href: "#menu-food", label: "Menu" },
        { href: "#gallery", label: "Gallery" },
        { href: "#hours", label: "Hours" },
        { href: "#faq", label: "FAQ" },
      ],
    },
    sections: [
      {
        type: "menu-food",
        variant: "categorized",
        content: {
          headline: "Tonight's menu",
          categories: [{ name: "Starters", items: [{ name: "Pakora", price: 180 }] }],
        },
      },
      {
        type: "gallery",
        variant: "before-after",
        content: {
          headline: "Before & after the rebuild",
          pairs: [{ before: "/img/before.jpg", after: "/img/after.jpg" }],
        },
      },
      {
        type: "hours",
        variant: "inline-banner",
        content: { headline: "We're open", note: "Closed Mondays" },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Questions",
          items: [{ q: "Do you take reservations?", a: "Yes — call us." }],
        },
      },
    ],
  },
  expect: { dark: true, requiredAnchors: ["menu-food", "gallery", "hours", "faq"] },
};
export default scenario;

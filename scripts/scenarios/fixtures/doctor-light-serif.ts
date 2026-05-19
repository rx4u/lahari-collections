/**
 * Scenario: a doctor practice site on a light, serif-driven theme.
 * Exercises: subtle animation tier, conservative section set, light dark-mode
 * detection (neutral lightness ≈ 0.98), serif font from theme tokens.
 */
const scenario = {
  name: "doctor:light-serif",
  designTokens: {
    colors: {
      neutral: "oklch(0.98 0.005 80)",
      primary: "oklch(0.18 0.02 230)",
      secondary: "oklch(0.45 0.03 230)",
      tertiary: "oklch(0.52 0.12 230)",
      surface: "oklch(0.97 0.01 80)",
      onPrimary: "oklch(0.98 0 0)",
    },
  },
  config: {
    hero: { style: "split-image", headline: "Compassionate care" },
    nav: {
      items: [
        { href: "#services", label: "Services" },
        { href: "#conditions-treated", label: "Conditions" },
        { href: "#contact", label: "Contact" },
      ],
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "What we treat",
          items: [{ name: "General consult", description: "Routine checkups" }],
        },
      },
      {
        type: "conditions-treated",
        variant: "accordion",
        content: {
          headline: "Conditions we treat",
          items: [{ name: "Diabetes", description: "Long-term care" }],
        },
      },
      {
        type: "contact",
        variant: "split-info",
        content: {
          headline: "Visit us",
          phone: "+91 9876 543 210",
          email: "hello@example.in",
          address: "1 Main Street, Bengaluru",
        },
      },
    ],
  },
  expect: { dark: false, requiredAnchors: ["services", "conditions-treated", "contact"] },
};
export default scenario;

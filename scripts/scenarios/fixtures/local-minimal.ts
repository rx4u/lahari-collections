/**
 * Scenario: a minimal local-business site — only the bare-essential sections,
 * no optional content. Tests that the validators don't false-positive on a
 * stripped-down config. Light theme.
 */
const scenario = {
  name: "local:minimal",
  designTokens: {
    colors: {
      neutral: "oklch(0.99 0 0)",
      primary: "oklch(0.20 0 0)",
      secondary: "oklch(0.50 0 0)",
      tertiary: "oklch(0.55 0.10 150)",
      surface: "oklch(0.97 0 0)",
      onPrimary: "oklch(0.98 0 0)",
    },
  },
  config: {
    hero: { style: "minimal", headline: "Hello, neighborhood" },
    nav: {
      items: [
        { href: "#about", label: "About" },
        { href: "#contact", label: "Contact" },
      ],
    },
    sections: [
      {
        type: "about",
        variant: "split-content",
        content: { headline: "Who we are", description: "A small workshop." },
      },
      {
        type: "contact",
        variant: "minimal",
        content: { headline: "Reach us", email: "hi@example.in" },
      },
    ],
  },
  expect: { dark: false, requiredAnchors: ["about", "contact"] },
};
export default scenario;

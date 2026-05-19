/**
 * Scenario: a hospital site on a dark, serif-driven theme. Exercises:
 * dark-mode detection, emergency section's variant-required phone field,
 * departments + procedures, anchor coverage across many sections.
 */
const scenario = {
  name: "hospital:dark-serif",
  designTokens: {
    colors: {
      neutral: "oklch(0.14 0.005 240)",
      primary: "oklch(0.97 0 0)",
      secondary: "oklch(0.70 0.02 240)",
      tertiary: "oklch(0.68 0.16 220)",
      surface: "oklch(0.20 0.01 240)",
      onPrimary: "oklch(0.13 0.01 240)",
    },
  },
  config: {
    hero: { style: "image-bg", headline: "Care, around the clock" },
    nav: {
      items: [
        { href: "#emergency", label: "Emergency" },
        { href: "#departments", label: "Departments" },
        { href: "#procedures", label: "Procedures" },
        { href: "#doctor-directory", label: "Doctors" },
      ],
    },
    sections: [
      {
        type: "emergency",
        variant: "top-banner",
        content: { headline: "24/7 emergency", phone: "+91 9000 000 000" },
      },
      {
        type: "departments",
        variant: "grid",
        content: {
          headline: "Departments",
          items: [{ name: "Cardiology", description: "Heart care" }],
        },
      },
      {
        type: "procedures",
        variant: "tabbed",
        content: {
          headline: "Procedures",
          items: [{ name: "Angiography", description: "Diagnostic imaging" }],
        },
      },
      {
        type: "doctor-directory",
        variant: "filterable-grid",
        content: {
          headline: "Our doctors",
          doctors: [{ name: "Dr Rao", speciality: "Cardiology" }],
        },
      },
    ],
  },
  expect: {
    dark: true,
    requiredAnchors: ["emergency", "departments", "procedures", "doctor-directory"],
  },
};
export default scenario;

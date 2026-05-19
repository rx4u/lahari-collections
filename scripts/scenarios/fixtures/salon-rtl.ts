/**
 * Scenario: salon site with RTL locale + Arabic content. Light theme. Tests
 * that scanners don't choke on non-ASCII strings and that anchors built from
 * latin section.type slugs still match nav hrefs when business content is
 * RTL. (Anchor identity is decoupled from locale.)
 */
const scenario = {
  name: "salon:rtl",
  locale: "ar",
  designTokens: {
    colors: {
      neutral: "oklch(0.99 0.005 30)",
      primary: "oklch(0.16 0.02 340)",
      secondary: "oklch(0.50 0.05 340)",
      tertiary: "oklch(0.68 0.18 340)",
      surface: "oklch(0.97 0.01 30)",
      onPrimary: "oklch(0.98 0 0)",
    },
  },
  config: {
    locale: "ar",
    hero: { style: "centered", headline: "أناقة معاصرة" },
    nav: {
      items: [
        { href: "#services", label: "الخدمات" },
        { href: "#gallery", label: "المعرض" },
        { href: "#booking", label: "الحجز" },
      ],
    },
    sections: [
      {
        type: "services",
        variant: "icon-list",
        content: {
          headline: "خدماتنا",
          items: [{ name: "قصة شعر", description: "خدمة كاملة" }],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "أعمالنا",
          images: [{ src: "/img/salon-1.jpg" }],
        },
      },
      {
        type: "booking",
        variant: "whatsapp-cta",
        content: {
          headline: "احجزي الآن",
          whatsappNumber: "+919876543210",
        },
      },
    ],
  },
  expect: { dark: false, requiredAnchors: ["services", "gallery", "booking"] },
};
export default scenario;

const config = {
  hero: {
    cta: { url: "#contact" },
    secondaryCta: { url: "#how-it-works-timeline" },
  },
  sections: [
    { type: "pricing", content: { plans: [
      { cta: { url: "#contact" } },
    ]}},
    { type: "external", content: { link: { url: "https://wa.me/123" } } },
    { type: "internal", content: { link: { url: "/products" } } },
  ],
};
export default config;

const config = {
  business: { phone: "+1 (800) 555-0190", email: "hello@example.com" },
  hero: {
    cta: { url: "#programs" },
    secondaryCta: { url: "#how-it-works-timeline" },
  },
  sections: [
    { type: "gallery", content: { headline: "x", images: [] } },
    { type: "pricing", content: { plans: [
      { cta: { url: "#contact" } },
    ]}},
    // services base requires items.min(1) — empty items is the Ridgeline
    // failure shape that the unified scanner catches via Zod too_small.
    { type: "services", content: { headline: "Our services", items: [] } },
  ],
};
export default config;

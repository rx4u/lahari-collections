const config = {
  sections: [
    // missing required: services.items
    { type: "services", content: { headline: "Our services" } },
    // unknown field: typo (discription vs description)
    { type: "cta", content: { headline: "Book now", discription: "typo here" } },
    // valid — should produce no findings
    { type: "faq", content: { headline: "Q&A", items: [{ q: "x", a: "y" }] } },
    // unregistered section type — should be skipped silently
    { type: "custom-thing", content: { whatever: 1 } },
  ],
};
export default config;

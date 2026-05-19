import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function publicationPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "publication",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "editorial-bg",
      headline: "Design that\nthinks ahead",
      subheadline: "A curated publication exploring architecture, interiors, and the spaces where life happens.",
      cta: { text: "Read the Journal", url: "#about", variant: "primary" },
      secondaryCta: { text: "Subscribe", url: "#contact" },
      credentialBar: { items: [{ text: "Est. 2019" }, { text: "Mumbai & Hyderabad" }, { text: "12K+ Readers" }, { text: "Quarterly Issue" }] },
    },
    sections: [
      {
        type: "trust",
        variant: "facts-bar",
        content: {
          facts: [
            "Quarterly print + digital",
            "Contributions from 40+ architects",
            "Featured in Wallpaper* India",
            "Available at select stores nationwide",
          ],
        },
      },
      {
        type: "about",
        variant: "editorial-split",
        content: {
          eyebrow: "The Publication",
          headline: "We believe the built\nenvironment shapes who we are.",
          description: "Every issue explores a single theme — light, memory, material — through long-form essays, studio visits, and photography. No trend pieces. No listicles.",
          description2: "Founded by designers for designers. Our writers are practitioners. Our photographers live in the buildings they shoot.",
          cta: { text: "About the Team", url: "#team" },
          image: "/images/defaults/publication/editorial-spread.jpg",
        },
      },
      {
        type: "gallery",
        variant: "location-grid",
        content: {
          eyebrow: "From the Archive",
          headline: "Issues",
          items: [
            { city: "Light", label: "Issue 01 — Monsoon 2022", image: "/images/defaults/publication/issue-01.jpg" },
            { city: "Memory", label: "Issue 02 — Winter 2022", image: "/images/defaults/publication/issue-02.jpg" },
            { city: "Material", label: "Issue 03 — Monsoon 2023", image: "/images/defaults/publication/issue-03.jpg" },
            { city: "Threshold", label: "Issue 04 — Winter 2023", image: "/images/defaults/publication/issue-04.jpg" },
            { city: "Ground", label: "Issue 05 — Monsoon 2024", image: "/images/defaults/publication/issue-05.jpg" },
            { city: "Void", label: "Issue 06 — Winter 2024", image: "/images/defaults/publication/issue-06.jpg" },
          ],
          cta: { text: "Browse All Issues", url: "#contact" },
        },
      },
      {
        type: "stats",
        variant: "dark-split",
        content: {
          eyebrow: "The Numbers",
          headline: "Small run.\nBig reach.",
          description: "We print 2,000 copies per issue. Every one finds a home. Our digital edition reaches 10,000 readers across South Asia and the diaspora.",
          image: "/images/defaults/publication/press.jpg",
          stats: [
            { value: "6", label: "Issues Published" },
            { value: "10K+", label: "Readers" },
            { value: "40+", label: "Contributors" },
          ],
          cta: { text: "Get a Copy", url: "#contact" },
        },
      },
      {
        type: "testimonials",
        variant: "editorial-carousel",
        content: {
          items: [
            {
              quote: "The most rigorous design writing coming out of India right now. Each issue is a small education.",
              name: "Anish Kapila",
              title: "Architect, Studio Kapila Mumbai",
            },
            {
              quote: "Finally, a publication that treats readers as intelligent. Not a single filler piece in six issues.",
              name: "Divya Menon",
              title: "Interior Designer, Hyderabad",
            },
            {
              quote: "The photography alone is worth the subscription. They find buildings no one else is documenting.",
              name: "Rohan Shetty",
              title: "Critic, Architectural Digest India",
            },
          ],
          autoAdvance: 7000,
        },
      },
      {
        type: "contact",
        variant: "minimal",
        content: {
          headline: "Subscribe",
          description: "Annual subscription includes four issues, print and digital, shipped anywhere in India.",
        },
      },
    ],
    seo: {
      title: "Publication | Architecture & Design Journal",
      description: "A curated quarterly exploring architecture, interiors, and the built environment across South Asia.",
    },
    animationTier: "standard",
  };
}

export const publicationRemixMeta: RemixMeta = {
  compatibleThemes: [
    "kraft-paper",
    "swiss-grid",
    "sand-dune",
    "minimal-concrete",
    "paper-white",
    "coworking-loft",
    "charcoal-editorial",
    "haven-ivory",
  ],
  compatibleHeros: ["editorial-bg", "image-bg", "split-image", "minimal"],
  sectionVariants: {
    trust: ["facts-bar", "inline-list"],
    about: ["editorial-split", "split-content", "story"],
    gallery: ["location-grid", "masonry", "grid"],
    stats: ["dark-split", "counter"],
    testimonials: ["editorial-carousel", "featured-quote", "carousel"],
  },
};

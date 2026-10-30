import type { SiteConfig } from "./src/lib/types";

const config: SiteConfig = {
  business: {
    type: "jewellery",
    name: "Lahari Collections",
    tagline: "Where heritage meets haute couture",
    description:
      "A boutique fashion house specializing in handloom sarees, contemporary ethnic wear, and bridal couture — sourced directly from master weavers across India.",
    phone: "",
    email: "",
    address: "Road No. 36, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Jubilee+Hills+Hyderabad",
    socialLinks: {
      instagram: "#",
      whatsapp: "#",
    },
    logo: "https://ui-avatars.com/api/?name=Lahari&size=200&background=6B1D3A&color=FAF7F5&bold=true&format=svg",
    favicon:
      "https://ui-avatars.com/api/?name=L&size=32&background=6B1D3A&color=FAF7F5&bold=true&format=svg",
  },

  theme: {
    designMd: "desert-rose",
    accentColor: "#6B1D3A",
  },

  layout: {
    type: "single-page",
  },

  hero: {
    style: "image-bg",
    headline: "Lahari Collections",
    subheadline: "Handloom sarees and bridal couture from India's master weavers",
    cta: {
      text: "View the Collections",
      url: "#collections",
      variant: "primary",
    },
    secondaryCta: {
      text: "The Atelier",
      url: "#about",
    },
    image: "/images/hero-bg.jpg",
  },

  sections: [
    {
      type: "about",
      variant: "editorial-split",
      navLabel: null,
      content: {
        headline: "From the loom\nto the light",
        description:
          "Every Lahari piece starts on a handloom. Varanasi silk. Kanchipuram zari. Pochampally ikat. We work directly with the weavers, not wholesalers. The techniques are centuries old. The silhouettes are not.",
        description2:
          "This is clothing that carries weight. Not trend, not season. Fabric with a past, cut for a life that's actually being lived.",
        image: "/images/weaver-craft.jpg",
        imagePosition: "center 30%",
        cta: {
          text: "Visit the Atelier",
          url: "#contact",
        },
      },
    },
    {
      type: "collections",
      variant: "banner-grid",
      navLabel: "Collections",
      content: {
        headline: "The Collections",
        description:
          "Three lines. One principle: nothing leaves the atelier that we wouldn't wear ourselves.",
        collections: [
          {
            name: "Heritage Weaves",
            description:
              "Handloom sarees and dupattas. Banarasi brocade, Kanjeevaram silk, Pochampally double ikat. The original luxury.",
            image: "/images/collection-heritage.jpg",
            cta: { text: "View Heritage", url: "#" },
          },
          {
            name: "Modern Drape",
            description: "Pre-draped sarees, concept blouses, and fluid separates. Traditional fabric, contemporary form.",
            image: "/images/collection-modern.jpg",
            cta: { text: "View Modern", url: "#" },
          },
          {
            name: "Bridal Heirloom",
            description:
              "Zari-heavy Banarasis, Kanjeevaram reds, custom trousseau sets. Made for the day and the decades after.",
            image: "/images/collection-bridal.jpg",
            cta: { text: "View Bridal", url: "#" },
          },
        ],
      },
    },
    {
      type: "contact",
      variant: "split-info",
      navLabel: "Visit",
      content: {
        headline: "By Appointment",
        description:
          "Walk in, or write ahead for a private viewing. The atelier is open six days a week.",
        address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
      },
    },
  ],

  seo: {
    title: "Lahari Collections | Handloom Fashion House, Hyderabad",
    description:
      "Handloom sarees, contemporary ethnic wear, and bridal couture sourced directly from master weavers across India. Visit our Jubilee Hills atelier.",
    ogImage: "/images/hero-bg.jpg",
    keywords: [
      "Lahari Collections",
      "handloom sarees",
      "ethnic wear Hyderabad",
      "bridal couture",
      "Indian fashion",
      "Kanchipuram sarees",
      "Pochampally ikat",
      "luxury ethnic wear",
    ],
    locale: "en_IN",
  },

  animationTier: "premium",

  nav: {
    style: "sticky",
    ctaButton: "Visit",
    ctaHref: "#contact",
  },

  footer: {
    variant: "editorial-dark",
    includeNewsletter: false,
  },
};

export default config;

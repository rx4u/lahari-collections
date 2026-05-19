import type { SiteConfig } from "./src/lib/types";

const config: SiteConfig = {
  business: {
    type: "jewellery",
    name: "Lahari Collections",
    tagline: "Where heritage meets haute couture",
    description:
      "A boutique fashion house specializing in handloom sarees, contemporary ethnic wear, and bridal couture — sourced directly from master weavers across India.",
    phone: "+91 91000 00000",
    email: "hello@laharicollections.com",
    address: "Jubilee Hills, Road No. 36",
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
    style: "carousel",
    headline: "Lahari Collections",
    subheadline: "Handloom sarees and bridal couture from India's master weavers",
    eyebrow: "Hyderabad",
    cta: {
      text: "View the Collections",
      url: "#collections",
      variant: "primary",
    },
    secondaryCta: {
      text: "The Atelier",
      url: "#about",
    },
    images: [
      { src: "/images/hero-bg.jpg", alt: "Bridal handloom saree", focalPoint: "center 30%" },
      { src: "/images/collection-bridal.jpg", alt: "Bridal Banarasi", focalPoint: "center center" },
      { src: "/images/collection-heritage.jpg", alt: "Heritage weave detail", focalPoint: "center center" },
      { src: "/images/craft-parallax.jpg", alt: "Loom craft", focalPoint: "center center" },
    ],
  },

  sections: [
    {
      type: "about",
      variant: "editorial-split",
      navLabel: null,
      eyebrow: "The Craft",
      content: {
        headline: "From the loom\nto the light",
        description:
          "Every Lahari piece starts on a handloom. Varanasi silk. Kanchipuram zari. Pochampally ikat. We work directly with the weavers, not wholesalers. The techniques are centuries old. The silhouettes are not.",
        description2:
          "This is clothing that carries weight. Not trend, not season. Fabric with a past, cut for a life that's actually being lived.",
        image: "/images/weaver-craft.jpg",
        imagePosition: "center 30%",
        cta: {
          text: "Discover the Process",
          url: "#cta",
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
            featured: true,
            cta: { text: "View Bridal", url: "#" },
          },
        ],
      },
    },
    {
      type: "cta",
      variant: "banner",
      navLabel: null,
      content: {
        headline: "Worn, Not Displayed",
        description:
          "India's finest textiles belong in your life, not behind glass.",
        image: "/images/craft-parallax.jpg",
        cta: {
          text: "Visit the Atelier",
          url: "#about",
        },
      },
    },
    {
      type: "about",
      variant: "story",
      navLabel: "About",
      eyebrow: "Est. 2024, Hyderabad",
      content: {
        headline: "The Atelier",
        description:
          "Lahari started with one question: why does India's finest handloom end up in archives instead of wardrobes? We work with weaving families across six states. Their craft becomes clothing you reach for on your best days and your quietest ones.",
        stats: [
          { value: "6", label: "States sourced from" },
          { value: "40+", label: "Artisan families" },
          { value: "100%", label: "Handloom" },
        ],
      },
    },
    {
      type: "contact",
      variant: "split-info",
      navLabel: "Contact",
      content: {
        headline: "Find Us",
        description:
          "Walk in, write to us, or call ahead for a private viewing. The atelier is open six days a week.",
        phone: "+91 91000 00000",
        email: "hello@laharicollections.com",
        address: "Road No. 36, Jubilee Hills, Hyderabad 500033",
        submitText: "Send Message",
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
    ctaButton: "Explore Collection",
    ctaHref: "#collections",
  },

  footer: {
    variant: "editorial-dark",
    includeNewsletter: true,
  },
};

export default config;

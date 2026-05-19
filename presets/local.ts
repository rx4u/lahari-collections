import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function localPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "local",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Your trusted local business",
      subheadline: "Serving the community with quality products and services. Visit us today.",
      cta: { text: "Get in Touch", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Learn More", url: "#about" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "What We Offer",
          description: "Quality services tailored to your needs",
          items: [
            { title: "Service One", description: "Description of your first service offering.", icon: "briefcase" },
            { title: "Service Two", description: "Description of your second service offering.", icon: "settings" },
            { title: "Service Three", description: "Description of your third service offering.", icon: "star" },
          ],
        },
      },
      {
        type: "stats",
        variant: "dark-band",
        content: {
          items: [
            { value: "5+", label: "Years in Business" },
            { value: "1,000+", label: "Happy Customers" },
            { value: "4.5★", label: "Average Rating" },
          ],
        },
      },
      {
        type: "about",
        variant: "story",
        content: {
          headline: "About Us",
          description: "We are a locally owned business committed to providing excellent service to our community. With years of experience and a passion for what we do, we strive to exceed your expectations every time.",
          stats: [
            { value: "5+", label: "Years in Business" },
            { value: "1,000+", label: "Happy Customers" },
            { value: "4.5", label: "Rating" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "What Our Customers Say",
          items: [
            { name: "Customer", text: "Great service and friendly staff. Highly recommend!", rating: 5 },
            { name: "Customer", text: "Been coming here for years. Never disappointed.", rating: 5 },
            { name: "Customer", text: "The best in town. Professional and reliable.", rating: 5 },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "What are your hours?", answer: "We are open Monday through Saturday. Please check our hours section for details." },
            { question: "Do you offer free consultations?", answer: "Yes, we offer free initial consultations for all new customers." },
            { question: "How can I contact you?", answer: "You can reach us by phone, email, or by filling out our contact form below." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Contact Us",
          description: "We'd love to hear from you. Reach out today.",
        },
      },
    ],
    seo: {
      title: "Local Business",
      description: "Your trusted local business serving the community.",
    },
    animationTier: "subtle",
  };
}

export const localRemixMeta: RemixMeta = {
  compatibleThemes: [
    "kraft-paper",
    "notion-beige",
    "swiss-grid",
    "tailwind-base",
    "cobalt-product",
    "scandi-pine",
    "farmers-market",
    "coworking-loft",
  ],
  compatibleHeros: ["image-bg", "centered", "gradient", "split-image", "minimal"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    about: ["story", "split-content"],
    testimonials: ["carousel", "simple-grid"],
    faq: ["accordion", "two-column"],
  },
};

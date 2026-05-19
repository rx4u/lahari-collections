import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function pharmacyPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "pharmacy",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Your neighborhood health partner",
      subheadline: "Trusted prescriptions, quality health products, and doorstep delivery. Serving Hyderabad families for over a decade.",
      cta: { text: "Order Medicine", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Pharmacy Services",
          description: "Your one-stop shop for health and wellness",
          items: [
            { title: "Prescription Dispensing", description: "Accurate prescription filling with licensed pharmacist verification.", icon: "pill" },
            { title: "Health Products", description: "Vitamins, supplements, personal care, and wellness essentials.", icon: "heart-pulse" },
            { title: "Home Delivery", description: "Free same-day delivery on orders above Rs 500 across Hyderabad.", icon: "truck" },
            { title: "Health Checkups", description: "Blood pressure, blood sugar, and BMI checks in-store.", icon: "activity" },
            { title: "Vaccination Services", description: "Flu shots, travel vaccines, and COVID boosters by appointment.", icon: "syringe" },
            { title: "Medical Equipment", description: "BP monitors, glucometers, nebulizers, and orthopedic aids.", icon: "stethoscope" },
          ],
        },
      },
      {
        type: "hours",
        variant: "card",
        content: {
          headline: "Store Hours",
          hours: {
            Monday: { open: "08:00", close: "22:00" },
            Tuesday: { open: "08:00", close: "22:00" },
            Wednesday: { open: "08:00", close: "22:00" },
            Thursday: { open: "08:00", close: "22:00" },
            Friday: { open: "08:00", close: "22:00" },
            Saturday: { open: "08:00", close: "22:00" },
            Sunday: { open: "09:00", close: "21:00" },
          },
        },
      },
      {
        type: "trust",
        variant: "logo-bar",
        content: {
          headline: "Certifications & Partners",
          logos: [],
        },
      },
      {
        type: "location",
        variant: "card",
        content: {
          headline: "Our Location",
          description: "Conveniently located in Kukatpally, Hyderabad, near KPHB colony main road.",
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you offer home delivery?", answer: "Yes, free delivery on orders above Rs 500 within Hyderabad. Same-day delivery for orders placed before 4 PM." },
            { question: "Can I upload a prescription online?", answer: "Yes, WhatsApp your prescription to our number and we will prepare your order for pickup or delivery." },
            { question: "Do you stock rare or imported medicines?", answer: "We can source specialty and imported medications on request. Please allow 2-3 business days for procurement." },
            { question: "Are generic medicines available?", answer: "Yes, we stock a wide range of affordable generic alternatives and our pharmacists can advise on substitutions." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Contact Us",
          description: "Call, WhatsApp, or visit us for all your health needs.",
        },
      },
    ],
    seo: {
      title: "Pharmacy | Health & Wellness in Hyderabad",
      description: "Trusted pharmacy in Hyderabad offering prescriptions, health products, home delivery, and health checkups.",
    },
    animationTier: "subtle",
  };
}

export const pharmacyRemixMeta: RemixMeta = {
  compatibleThemes: [
    "pharma-clean",
    "clinic-sage",
    "arctic",
    "paper-white",
    "apothecary-green",
    "therapy-room",
    "wellness-coral",
    "clinical",
  ],
  compatibleHeros: ["centered", "minimal", "gradient", "split-image"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    hours: ["card"],
    trust: ["logo-bar"],
    location: ["card"],
    faq: ["accordion", "two-column"],
  },
};

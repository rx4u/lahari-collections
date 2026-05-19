import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function dentistPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "dentist",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      headline: "Your smile deserves the best care",
      subheadline: "Advanced dental treatments with a gentle touch. From routine check-ups to smile makeovers, we keep Hyderabad smiling.",
      cta: { text: "Book Appointment", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Treatments", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Dental Services",
          description: "Complete oral care for the whole family",
          items: [
            { title: "Root Canal Treatment", description: "Painless root canal therapy with advanced rotary instruments.", icon: "scan" },
            { title: "Braces & Aligners", description: "Metal braces, ceramic braces, and clear aligners for all ages.", icon: "align-center" },
            { title: "Teeth Whitening", description: "Professional whitening for a brighter, confident smile.", icon: "sparkles" },
            { title: "Dental Implants", description: "Permanent tooth replacement with titanium implants.", icon: "pin" },
            { title: "General Dentistry", description: "Routine check-ups, cleanings, and cavity fillings.", icon: "stethoscope" },
            { title: "Cosmetic Dentistry", description: "Veneers, bonding, and smile design for a perfect look.", icon: "smile" },
          ],
        },
      },
      {
        type: "procedures",
        variant: "accordion",
        content: {
          headline: "Our Procedures",
          description: "Learn about our treatment processes",
          items: [
            { title: "Root Canal Therapy", description: "A step-by-step painless procedure to save your natural tooth. Completed in 1-2 visits with local anesthesia." },
            { title: "Dental Implant Placement", description: "Titanium post insertion followed by a healing period of 3-4 months before the crown is placed." },
            { title: "Orthodontic Treatment", description: "Initial assessment, treatment planning, and regular adjustments over 12-18 months for optimal alignment." },
            { title: "Teeth Whitening Process", description: "In-office whitening takes about 60 minutes. Results last 6-12 months with proper care." },
          ],
        },
      },
      {
        type: "booking",
        variant: "inline-form",
        content: {
          headline: "Book Your Visit",
          description: "Schedule a consultation or treatment appointment",
        },
      },
      {
        type: "gallery",
        variant: "grid-3",
        content: {
          headline: "Our Clinic",
          description: "State-of-the-art dental facility in Banjara Hills",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Patient Reviews",
          items: [
            { name: "Priya S.", text: "Got my braces done here. The entire experience was smooth and painless.", rating: 5 },
            { name: "Rahul M.", text: "Best dental clinic in Hyderabad. The whitening results are amazing.", rating: 5 },
            { name: "Ananya K.", text: "My kids love coming here. The doctors are so patient and gentle.", rating: 5 },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Visit Our Clinic",
          description: "Located in Banjara Hills, Hyderabad. Walk-ins welcome for emergencies.",
        },
      },
    ],
    seo: {
      title: "Dentist | Advanced Dental Care in Hyderabad",
      description: "Expert dental care including root canals, braces, implants, and teeth whitening in Hyderabad.",
    },
    animationTier: "subtle",
  };
}

export const dentistRemixMeta: RemixMeta = {
  compatibleThemes: [
    "pharma-clean",
    "clinic-sage",
    "arctic",
    "paper-white",
    "therapy-room",
    "wellness-coral",
    "apothecary-green",
    "clinical",
  ],
  compatibleHeros: ["split-image", "centered", "minimal", "gradient"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    procedures: ["accordion"],
    booking: ["inline-form", "whatsapp-cta", "calendly-embed"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
  },
};

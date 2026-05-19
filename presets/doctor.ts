import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function doctorPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "doctor",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      headline: "Compassionate healthcare you can trust",
      subheadline: "Providing expert medical care with a personal touch. Book your appointment today.",
      cta: { text: "Book Appointment", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Our Services",
          description: "Comprehensive care under one roof",
          items: [
            { title: "General Consultation", description: "Thorough evaluation and treatment plans for all health concerns.", icon: "stethoscope" },
            { title: "Preventive Care", description: "Regular screenings and health check-ups to keep you at your best.", icon: "shield-check" },
            { title: "Diagnostics", description: "On-site lab tests and imaging for quick, accurate results.", icon: "microscope" },
            { title: "Vaccinations", description: "Up-to-date immunization schedules for children and adults.", icon: "syringe" },
            { title: "Chronic Disease Management", description: "Ongoing care and monitoring for diabetes, hypertension, and more.", icon: "heart-pulse" },
            { title: "Emergency Care", description: "Urgent medical attention when you need it most.", icon: "alert-circle" },
          ],
        },
      },
      {
        type: "about",
        variant: "split-content",
        content: {
          headline: "About the Doctor",
          description: "A dedicated physician with years of experience in patient-centered care.",
          stats: [
            { value: "10+", label: "Years Experience" },
            { value: "5,000+", label: "Patients Treated" },
            { value: "4.8", label: "Patient Rating" },
          ],
        },
      },
      {
        type: "doctor-directory",
        variant: "editorial",
        content: {
          eyebrow: "Our Team",
          headline: "Meet the Doctors",
          description: "Specialists committed to your health and wellbeing.",
          doctors: [],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Patient Testimonials",
          items: [
            { name: "Patient", text: "Excellent care and attention to detail. Highly recommended.", rating: 5 },
            { name: "Patient", text: "The doctor truly listens and explains everything clearly.", rating: 5 },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you accept walk-ins?", answer: "Yes, we accept walk-ins for urgent care. Appointments are recommended for routine visits." },
            { question: "What insurance do you accept?", answer: "We accept most major health insurance plans. Please call to verify your specific plan." },
            { question: "What are your consultation fees?", answer: "Fees vary by service. Please contact our office for current pricing." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Contact Us",
          description: "Schedule your appointment or visit our clinic today.",
        },
      },
    ],
    seo: {
      title: "Doctor | Trusted Healthcare",
      description: "Providing expert medical care with compassion and dedication.",
    },
    animationTier: "subtle",
  };
}

export const doctorRemixMeta: RemixMeta = {
  compatibleThemes: [
    "clinic-sage",
    "pharma-clean",
    "therapy-room",
    "clinical",
    "arctic",
    "paper-white",
    "wellness-coral",
    "apothecary-green",
  ],
  compatibleHeros: ["split-image", "centered", "minimal", "gradient"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    about: ["split-content", "story"],
    "doctor-directory": ["editorial", "filterable-grid", "list"],
    testimonials: ["carousel", "simple-grid"],
    faq: ["accordion", "two-column"],
  },
};

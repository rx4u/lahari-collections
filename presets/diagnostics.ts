import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function diagnosticsPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "diagnostics",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Accurate results. Compassionate care.",
      subheadline: "Trusted diagnostic testing with fast turnaround and home collection. Your health clarity starts here.",
      cta: { text: "Book a Test", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Tests", url: "#tests-offered" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About ClearPath Diagnostics",
          description: "ClearPath Diagnostics is a NABL and ISO-certified laboratory committed to delivering precise, timely results. With state-of-the-art automated analyzers and a patient-first approach, we make diagnostic care accessible, reliable, and stress-free.",
          stats: [
            { value: "500+", label: "Tests Available" },
            { value: "24hr", label: "Report Turnaround" },
            { value: "100K+", label: "Patients Served" },
          ],
        },
      },
      {
        type: "tests-offered",
        variant: "categorized-list",
        content: {
          headline: "Tests We Offer",
          description: "Comprehensive diagnostics across all major categories",
          categories: [
            {
              name: "Blood Tests",
              description: "CBC, lipid panel, blood glucose, liver function, kidney function, thyroid, and more.",
              icon: "droplet",
            },
            {
              name: "Urine Analysis",
              description: "Routine urinalysis, microalbumin, urine culture and sensitivity, 24-hour urine tests.",
              icon: "flask-conical",
            },
            {
              name: "Imaging",
              description: "Digital X-ray, ultrasound abdomen, ECG, and 2D Echo for cardiac and abdominal assessment.",
              icon: "scan",
            },
            {
              name: "Genetic Testing",
              description: "Carrier screening, hereditary disease panels, and pharmacogenomics testing.",
              icon: "dna",
            },
            {
              name: "Cardiac Markers",
              description: "Troponin I & T, BNP, D-Dimer, CRP hs, and homocysteine panels.",
              icon: "heart-pulse",
            },
            {
              name: "Hormone Panels",
              description: "Thyroid (TSH, T3, T4), reproductive hormones, cortisol, and adrenal function tests.",
              icon: "activity",
            },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "Our Services",
          description: "Designed for your convenience",
          items: [
            { title: "Home Sample Collection", description: "Certified phlebotomists at your doorstep — early morning slots available.", icon: "home" },
            { title: "Report Delivery", description: "Digital reports via email and WhatsApp within 24 hours for most tests.", icon: "mail" },
            { title: "Corporate Health Packages", description: "Tailored annual health check-up packages for companies and their employees.", icon: "briefcase" },
            { title: "Pre-employment Screening", description: "Comprehensive medical fitness certificates and drug screenings for employers.", icon: "file-check" },
          ],
        },
      },
      {
        type: "trust",
        variant: "badges",
        content: {
          headline: "Certifications & Accreditations",
          description: "Held to the highest standards of laboratory quality",
          badges: [
            { label: "ISO 15189 Certified", icon: "award" },
            { label: "NABL Accredited", icon: "shield-check" },
            { label: "CAP Inspected", icon: "badge-check" },
            { label: "HIPAA Compliant", icon: "lock" },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter-row",
        content: {
          headline: "By the Numbers",
          items: [
            { value: "500", suffix: "+", label: "Tests Available" },
            { value: "24", suffix: "hr", label: "Report Turnaround" },
            { value: "100000", suffix: "+", label: "Patients Served", display: "100K+" },
            { value: "15", suffix: "+", label: "Years of Excellence" },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Our Medical Team",
          description: "Pathologists and lab specialists you can trust",
          members: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Collection Center Hours",
          hours: {
            Monday: { open: "07:00", close: "20:00" },
            Tuesday: { open: "07:00", close: "20:00" },
            Wednesday: { open: "07:00", close: "20:00" },
            Thursday: { open: "07:00", close: "20:00" },
            Friday: { open: "07:00", close: "20:00" },
            Saturday: { open: "07:00", close: "18:00" },
            Sunday: { open: "08:00", close: "13:00" },
          },
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Find Our Center",
          description: "Conveniently located with ample parking",
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do I need a doctor's prescription to book a test?", answer: "Most tests can be booked directly without a prescription. However, certain specialized panels may require one. Our team will guide you when you call." },
            { question: "How long does it take to get my report?", answer: "Most routine tests are reported within 24 hours. Specialized tests may take 48–72 hours. Culture tests can take 3–5 days." },
            { question: "Is home sample collection available in my area?", answer: "We offer home collection across the city and select suburbs. Enter your pincode at booking to confirm availability." },
            { question: "How will I receive my report?", answer: "Reports are delivered digitally via email and WhatsApp. Hard copies can be collected from our center or couriered on request." },
            { question: "Are your lab results accepted by hospitals and insurance companies?", answer: "Yes. As a NABL-accredited laboratory, our reports are accepted by all major hospitals, clinics, and insurance providers." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Book a Test",
          description: "Schedule a walk-in or home collection. Our team will confirm your slot.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Know your numbers. Take control of your health.",
          description: "Book a test today and get results you can trust.",
          cta: { text: "Book Now", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "ClearPath Diagnostics | Accurate Lab Tests & Home Collection",
      description: "ISO-certified diagnostic lab offering 500+ tests, 24-hour reports, and home sample collection. Accurate results, compassionate care.",
    },
    animationTier: "subtle",
  };
}

export const diagnosticsRemixMeta: RemixMeta = {
  compatibleThemes: [
    "pharma-clean",
    "clinic-sage",
    "arctic",
    "paper-white",
    "clinical",
    "apothecary-green",
    "therapy-room",
    "wellness-coral",
  ],
  compatibleHeros: ["centered", "split-image", "minimal", "gradient"],
  sectionVariants: {
    "tests-offered": ["categorized-list"],
    services: ["card-grid", "icon-grid"],
    trust: ["badges"],
    stats: ["counter-row"],
    team: ["grid"],
    faq: ["accordion", "two-column"],
    contact: ["split-form"],
  },
};

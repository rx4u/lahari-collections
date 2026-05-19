import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function hospitalPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "hospital",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "stats-hero",
      headline: "Advanced healthcare for your family",
      subheadline: "Multi-specialty hospital with 200+ beds, 50+ doctors, and 24/7 emergency care in Hyderabad.",
      cta: { text: "Book Appointment", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Departments", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Departments",
          description: "Specialized care across every discipline",
          items: [
            { title: "Cardiology", description: "Advanced cardiac diagnostics, angioplasty, and bypass surgery.", icon: "heart-pulse" },
            { title: "Orthopaedics", description: "Joint replacement, sports medicine, and spine surgery.", icon: "bone" },
            { title: "Neurology", description: "Stroke care, epilepsy management, and neuro-rehabilitation.", icon: "brain" },
            { title: "Paediatrics", description: "Comprehensive child healthcare with a dedicated NICU.", icon: "baby" },
            { title: "General Surgery", description: "Laparoscopic and open surgical procedures by expert surgeons.", icon: "scissors" },
            { title: "Obstetrics & Gynaecology", description: "Maternity care, high-risk pregnancies, and women's health.", icon: "stethoscope" },
          ],
        },
      },
      {
        type: "trust",
        variant: "stats-inline",
        content: {
          stats: [
            { value: "200+", label: "Beds", icon: "🛏" },
            { value: "50+", label: "Specialists", icon: "👨‍⚕️" },
            { value: "24/7", label: "Emergency Care", icon: "🚑" },
            { value: "30+", label: "Insurance Accepted", icon: "🛡" },
          ],
        },
      },
      {
        type: "doctor-directory",
        variant: "editorial",
        content: {
          eyebrow: "Our Medical Team",
          headline: "Meet our Specialists",
          description: "Board-certified specialists across every department.",
          doctors: [],
        },
      },
      {
        type: "emergency",
        variant: "top-banner",
        content: {
          headline: "24/7 Emergency",
          description: "Round-the-clock emergency and trauma care. Call 040-XXXX-XXXX.",
          phone: "040-XXXX-XXXX",
        },
      },
      {
        type: "amenities",
        variant: "icon-grid",
        content: {
          headline: "Facilities & Amenities",
          description: "World-class infrastructure for patient comfort",
          items: [
            { title: "ICU & Critical Care", description: "20-bed ICU with ventilators and continuous monitoring.", icon: "monitor" },
            { title: "Pharmacy", description: "In-house 24/7 pharmacy with all essential medications.", icon: "pill" },
            { title: "Diagnostic Lab", description: "NABL-accredited lab for blood tests, imaging, and biopsies.", icon: "microscope" },
            { title: "Ambulance Service", description: "Advanced life support ambulances available round the clock.", icon: "siren" },
            { title: "Cafeteria", description: "Hygienic dining for patients, attendants, and staff.", icon: "utensils" },
            { title: "Parking", description: "Multi-level parking with 200+ spaces for visitors.", icon: "car" },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter",
        content: {
          headline: "Hospital at a Glance",
          items: [
            { value: "200+", label: "Beds" },
            { value: "50+", label: "Doctors" },
            { value: "15+", label: "Departments" },
            { value: "1L+", label: "Patients Treated" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "carousel",
        content: {
          headline: "Patient Stories",
          items: [
            { name: "Ramesh G.", text: "The cardiac team saved my life. Forever grateful to the entire staff.", rating: 5 },
            { name: "Padma V.", text: "My delivery experience was wonderful. The maternity ward is excellent.", rating: 5 },
            { name: "Srinivas K.", text: "Knee replacement surgery was a success. Walking pain-free again.", rating: 5 },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you accept insurance?", answer: "Yes, we are empanelled with 30+ insurance companies including Star Health, ICICI Lombard, and HDFC Ergo." },
            { question: "What are visiting hours?", answer: "General visiting hours are 10 AM - 12 PM and 4 PM - 6 PM. ICU has restricted timings." },
            { question: "Is there a pharmacy on site?", answer: "Yes, our 24/7 in-house pharmacy stocks all prescribed and essential medications." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Contact Us",
          description: "Located in Secunderabad, Hyderabad. 24/7 emergency services available.",
        },
      },
    ],
    seo: {
      title: "Hospital | Multi-Specialty Healthcare in Hyderabad",
      description: "Advanced multi-specialty hospital with 200+ beds, 50+ doctors, and 24/7 emergency care in Hyderabad.",
    },
    animationTier: "subtle",
  };
}

export const hospitalRemixMeta: RemixMeta = {
  compatibleThemes: [
    "clinic-sage",
    "pharma-clean",
    "arctic",
    "clinical",
    "paper-white",
    "therapy-room",
    "wellness-coral",
    "apothecary-green",
  ],
  compatibleHeros: ["stats-hero", "centered", "split-image", "minimal"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    trust: ["stats-inline", "logo-cloud", "certifications"],
    "doctor-directory": ["editorial", "filterable-grid", "list"],
    emergency: ["top-banner"],
    amenities: ["icon-grid"],
    stats: ["counter"],
    testimonials: ["carousel", "simple-grid"],
    faq: ["accordion", "two-column"],
  },
};

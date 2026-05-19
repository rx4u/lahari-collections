import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function vetPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "vet",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "split-image",
      headline: "Compassionate care for your furry family",
      subheadline: "Expert veterinary services for dogs, cats, birds, and exotic pets. Your pet's health is our priority.",
      cta: { text: "Book Visit", url: "#booking", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "icon-grid",
        content: {
          headline: "Pet Care Services",
          description: "Comprehensive healthcare for all companion animals",
          items: [
            { title: "General Check-ups", description: "Routine wellness exams, vaccinations, and deworming.", icon: "stethoscope" },
            { title: "Surgery", description: "Spaying, neutering, orthopedic, and soft tissue surgeries.", icon: "scissors" },
            { title: "Dental Care", description: "Teeth cleaning, extractions, and oral health assessments.", icon: "smile" },
            { title: "Diagnostics", description: "Digital X-rays, ultrasound, and in-house blood testing.", icon: "scan" },
            { title: "Grooming", description: "Professional bathing, trimming, and coat care.", icon: "sparkles" },
            { title: "Pet Boarding", description: "Safe, comfortable boarding with daily care and monitoring.", icon: "home" },
          ],
        },
      },
      {
        type: "booking",
        variant: "whatsapp-cta",
        content: {
          headline: "Book an Appointment",
          description: "Message us on WhatsApp for quick appointment booking",
          phone: "+91-9XXXXXXXXX",
        },
      },
      {
        type: "emergency",
        variant: "top-banner",
        content: {
          headline: "Pet Emergency?",
          description: "24/7 emergency care available. Call us immediately at 040-XXXX-XXXX.",
          phone: "040-XXXX-XXXX",
        },
      },
      {
        type: "gallery",
        variant: "grid-3",
        content: {
          headline: "Our Clinic & Patients",
          description: "Happy pets, happy families",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "Pet Parent Reviews",
          items: [
            { name: "Kavitha R.", text: "Dr. Sharma saved our dog's life during an emergency. Cannot thank the team enough.", rating: 5 },
            { name: "Arun D.", text: "Best vet clinic in Hyderabad. They treat our cat like family.", rating: 5 },
            { name: "Neha M.", text: "The grooming service is excellent. Our golden retriever loves it here.", rating: 5 },
          ],
        },
      },
      {
        type: "hours",
        variant: "card",
        content: {
          headline: "Clinic Hours",
          hours: {
            Monday: { open: "09:00", close: "20:00" },
            Tuesday: { open: "09:00", close: "20:00" },
            Wednesday: { open: "09:00", close: "20:00" },
            Thursday: { open: "09:00", close: "20:00" },
            Friday: { open: "09:00", close: "20:00" },
            Saturday: { open: "09:00", close: "18:00" },
            Sunday: { open: "10:00", close: "14:00" },
          },
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Visit Our Clinic",
          description: "Located in Ameerpet, Hyderabad. Ample parking for pet parents.",
        },
      },
    ],
    seo: {
      title: "Veterinary Clinic | Pet Care in Hyderabad",
      description: "Expert veterinary care for dogs, cats, birds, and exotic pets in Hyderabad.",
    },
    animationTier: "standard",
  };
}

export const vetRemixMeta: RemixMeta = {
  compatibleThemes: [
    "pet-pawprint",
    "forest-floor",
    "botanical",
    "scandi-pine",
    "farmers-market",
    "therapy-room",
    "wellness-coral",
    "apothecary-green",
  ],
  compatibleHeros: ["split-image", "centered", "gradient", "collage"],
  sectionVariants: {
    services: ["icon-grid", "icon-list"],
    booking: ["whatsapp-cta", "inline-form", "calendly-embed"],
    emergency: ["top-banner"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
    hours: ["card"],
  },
};

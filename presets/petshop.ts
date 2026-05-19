import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function petshopPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "petshop",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Because your pet deserves the best.",
      subheadline: "Paws & Play is your neighbourhood pet shop, grooming studio, and veterinary care centre — all under one roof.",
      cta: { text: "Book Grooming", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Services", url: "#services" },
    },
    sections: [
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "Our Services",
          description: "Everything your pet needs, handled with love",
          items: [
            { title: "Grooming", description: "Full bath, blow-dry, breed cut, nail trim, and ear cleaning by certified groomers.", icon: "scissors" },
            { title: "Veterinary Checkup", description: "Routine health examinations, vaccinations, deworming, and health certificates.", icon: "stethoscope" },
            { title: "Pet Training", description: "Obedience training, puppy socialisation, and behaviour correction programs.", icon: "award" },
            { title: "Daycare", description: "Supervised play and rest for dogs and cats while you're at work or travelling.", icon: "sun" },
            { title: "Boarding", description: "Safe, comfortable overnight stays with feeding, walks, and one-on-one attention.", icon: "home" },
            { title: "Dental Care", description: "Professional teeth cleaning and oral health check-ups to keep smiles healthy.", icon: "sparkles" },
          ],
        },
      },
      {
        type: "products",
        variant: "categorized",
        content: {
          headline: "Shop Our Products",
          description: "Premium brands, thoughtfully chosen for your pet",
          categories: [
            {
              name: "Food & Nutrition",
              description: "Dry kibble, wet food, raw diets, and vet-approved supplements for dogs, cats, and small animals.",
              icon: "bowl-food",
            },
            {
              name: "Toys & Accessories",
              description: "Interactive toys, chews, leads, harnesses, collars, and enrichment items for every personality.",
              icon: "gamepad-2",
            },
            {
              name: "Health & Wellness",
              description: "Flea & tick treatments, vitamins, probiotics, dental chews, and grooming essentials.",
              icon: "heart-pulse",
            },
            {
              name: "Bedding & Crates",
              description: "Cozy beds, travel crates, kennels, and carriers for rest and safe transport.",
              icon: "bed",
            },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Meet Our Team",
          description: "Pet lovers with the training to match",
          members: [],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "Happy Pet Parents",
          items: [
            { name: "Ananya S.", text: "Bruno came back from grooming looking like a show dog. The team here genuinely love animals.", rating: 5 },
            { name: "Rohan T.", text: "The vet here is fantastic — patient, thorough, and great with anxious dogs. Highly recommend.", rating: 5 },
            { name: "Meena P.", text: "Daycare has been a lifesaver. My cat is so relaxed and well-socialised now.", rating: 5 },
            { name: "David F.", text: "Best boarding facility we've used. My dog was clearly happy and well cared for.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "Our Furry Visitors",
          description: "Happy pets make our day, every day",
          images: [],
        },
      },
      {
        type: "hours",
        variant: "simple-card",
        content: {
          headline: "Opening Hours",
          hours: {
            Monday: { open: "09:00", close: "19:00" },
            Tuesday: { open: "09:00", close: "19:00" },
            Wednesday: { open: "09:00", close: "19:00" },
            Thursday: { open: "09:00", close: "19:00" },
            Friday: { open: "09:00", close: "19:00" },
            Saturday: { open: "09:00", close: "18:00" },
            Sunday: { open: "10:00", close: "16:00" },
          },
        },
      },
      {
        type: "location",
        variant: "map-embed",
        content: {
          headline: "Find Us",
          description: "Drop in anytime. Parking available. We welcome walk-ins for the shop and scheduled appointments for vet and grooming.",
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do I need to book grooming in advance?", answer: "Yes, grooming appointments are recommended as slots fill quickly, especially on weekends. You can book by phone or through our contact form." },
            { question: "What vaccinations does my pet need before boarding?", answer: "Dogs must be up-to-date on rabies, distemper, and bordetella. Cats need rabies and FVRCP. Vaccination records are required at check-in." },
            { question: "Do you groom cats as well as dogs?", answer: "Yes. We offer cat grooming including bathing, blow-dry, nail trim, and de-shedding treatments. Please call ahead as cat grooming requires specific time slots." },
            { question: "What brands of pet food do you stock?", answer: "We carry Royal Canin, Hills Science Diet, Orijen, Acana, Drools, and several raw and freeze-dried options. Our team can help you choose the right diet." },
            { question: "Is there a vet on site every day?", answer: "Our in-house vet is available Tuesday through Saturday. Emergency referrals are available through our partner clinic 24/7." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Book an Appointment",
          description: "Schedule grooming, a vet visit, daycare, or boarding. We'll confirm within a few hours.",
        },
      },
      {
        type: "cta",
        variant: "banner",
        content: {
          headline: "Give your pet the care they deserve.",
          description: "Book a grooming session or vet check-up today. First-time customers get 10% off their first service.",
          cta: { text: "Book Now", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "Paws & Play Pet Shop | Grooming, Vet & Pet Care",
      description: "Your complete pet care destination — grooming, veterinary services, boarding, daycare, and premium pet products.",
    },
    animationTier: "standard",
  };
}

export const petshopRemixMeta: RemixMeta = {
  compatibleThemes: [
    "pet-pawprint",
    "wellness-coral",
    "forest-floor",
    "apothecary-green",
    "paper-white",
    "sand-dune",
    "linen",
    "spa-onsen",
  ],
  compatibleHeros: ["image-bg", "split-image", "centered", "gradient"],
  sectionVariants: {
    services: ["card-grid", "icon-grid"],
    products: ["categorized", "grid"],
    team: ["grid"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    hours: ["simple-card"],
    location: ["map-embed"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "split-map"],
    cta: ["banner"],
  },
};

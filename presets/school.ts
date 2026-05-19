import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function schoolPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "school",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "centered",
      headline: "Nurturing minds, building futures",
      subheadline: "A progressive school in Hyderabad offering holistic education from primary to pre-university. Admissions open.",
      cta: { text: "Apply Now", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Our Programs", url: "#programs" },
    },
    sections: [
      {
        type: "programs",
        variant: "card-grid",
        content: {
          headline: "Academic Programs",
          description: "Structured learning pathways for every stage",
          items: [
            { title: "Primary School (Grade 1-5)", description: "Activity-based learning with a strong foundation in languages, math, and sciences.", icon: "book-open" },
            { title: "Middle School (Grade 6-8)", description: "Conceptual learning with integrated STEM projects and creative arts.", icon: "flask-conical" },
            { title: "Secondary School (Grade 9-10)", description: "Board exam preparation with personalized mentoring and career guidance.", icon: "graduation-cap" },
            { title: "Pre-University (Grade 11-12)", description: "Science, commerce, and humanities streams with competitive exam coaching.", icon: "award" },
          ],
        },
      },
      {
        type: "about",
        variant: "story",
        content: {
          headline: "Our Story",
          description: "Founded in 1998, our school has grown from a small neighborhood institution to one of Hyderabad's most respected schools. We blend academic rigor with extracurricular excellence, producing well-rounded students who thrive in college and beyond.",
          stats: [
            { value: "1998", label: "Established" },
            { value: "2,500+", label: "Students" },
            { value: "98%", label: "Board Pass Rate" },
          ],
        },
      },
      {
        type: "team",
        variant: "grid",
        content: {
          headline: "Our Faculty",
          members: [],
        },
      },
      {
        type: "gallery",
        variant: "grid-3",
        content: {
          headline: "Campus Life",
          description: "A vibrant campus with modern facilities",
          images: [],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "Parent Testimonials",
          items: [
            { name: "Dr. Shalini R.", text: "Both my children study here. The teachers are dedicated and the curriculum is excellent.", rating: 5 },
            { name: "Venkat P.", text: "My son's confidence has grown tremendously since joining. Great school culture.", rating: 5 },
            { name: "Nandini K.", text: "The balance of academics and sports is perfect. Our daughter loves going to school.", rating: 5 },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter",
        content: {
          headline: "School at a Glance",
          items: [
            { value: "25+", label: "Years of Excellence" },
            { value: "150+", label: "Faculty Members" },
            { value: "15", label: "Acre Campus" },
            { value: "50+", label: "Extracurricular Clubs" },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Admissions FAQ",
          items: [
            { question: "When do admissions open?", answer: "Admissions for the next academic year open in December. Early applications are encouraged." },
            { question: "What is the fee structure?", answer: "Fees vary by grade level. Please contact the admissions office for the current fee schedule." },
            { question: "Do you offer transport?", answer: "Yes, we have a fleet of GPS-tracked buses covering major routes across Hyderabad." },
            { question: "What board is the school affiliated with?", answer: "We are affiliated with CBSE with an option for ICSE in select grades." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Visit Our Campus",
          description: "Located in Kompally, Hyderabad. Schedule a campus tour today.",
        },
      },
    ],
    seo: {
      title: "School | Quality Education in Hyderabad",
      description: "Progressive school in Hyderabad offering holistic education from primary to pre-university.",
    },
    animationTier: "standard",
  };
}

export const schoolRemixMeta: RemixMeta = {
  compatibleThemes: [
    "classroom-paper",
    "kraft-paper",
    "swiss-grid",
    "pastel-pop",
    "scandi-pine",
    "tailwind-base",
    "paper-white",
    "cobalt-product",
  ],
  compatibleHeros: ["centered", "split-image", "gradient", "image-bg"],
  sectionVariants: {
    programs: ["card-grid"],
    about: ["story", "split-content"],
    team: ["grid"],
    gallery: ["grid-3", "masonry"],
    testimonials: ["carousel", "simple-grid"],
    stats: ["counter"],
    faq: ["accordion", "two-column"],
  },
};

import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function lawyerPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "lawyer",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "minimal",
      headline: "Protecting your rights with integrity",
      subheadline: "Experienced legal counsel for corporate, family, criminal, and property matters. Trusted by clients across Hyderabad.",
      cta: { text: "Free Consultation", url: "#contact", variant: "primary" },
      secondaryCta: { text: "Practice Areas", url: "#practice-areas" },
    },
    sections: [
      {
        type: "practice-areas",
        variant: "icon-grid",
        content: {
          headline: "Practice Areas",
          description: "Comprehensive legal services for individuals and businesses",
          items: [
            { title: "Corporate Law", description: "Company formation, contracts, compliance, and mergers & acquisitions.", icon: "building-2" },
            { title: "Family Law", description: "Divorce, custody, maintenance, and matrimonial disputes.", icon: "heart" },
            { title: "Criminal Defense", description: "Bail applications, trial representation, and appellate work.", icon: "shield" },
            { title: "Property Disputes", description: "Title verification, land disputes, and RERA matters.", icon: "home" },
            { title: "Civil Litigation", description: "Consumer cases, recovery suits, and injunction petitions.", icon: "scale" },
            { title: "Tax Advisory", description: "Income tax, GST compliance, and tribunal representation.", icon: "receipt" },
          ],
        },
      },
      {
        type: "case-results",
        variant: "stats",
        content: {
          headline: "Case Results",
          description: "A proven track record of success",
          items: [
            { value: "95%", label: "Success Rate" },
            { value: "2,000+", label: "Cases Handled" },
            { value: "500+", label: "Corporate Clients" },
            { value: "20+", label: "Years of Practice" },
          ],
        },
      },
      {
        type: "about",
        variant: "split-content",
        content: {
          headline: "About the Firm",
          description: "Established in 2004, our firm has built a reputation for diligent advocacy and ethical practice. We combine deep legal expertise with a client-first approach, ensuring every case receives the attention it deserves.",
          stats: [
            { value: "2004", label: "Founded" },
            { value: "12", label: "Advocates" },
            { value: "4.8", label: "Client Rating" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "simple-grid",
        content: {
          headline: "Client Testimonials",
          items: [
            { name: "Rajesh K.", text: "Won a complex property dispute that others said was unwinnable. Outstanding legal team.", rating: 5 },
            { name: "Sunita M.", text: "Handled my divorce case with sensitivity and professionalism. Grateful for the support.", rating: 5 },
            { name: "Tech Corp Pvt Ltd", text: "Our go-to firm for all corporate legal matters. Reliable and thorough.", rating: 5 },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "Do you offer free initial consultations?", answer: "Yes, we offer a 30-minute free consultation for new clients to understand your legal needs." },
            { question: "What are your fees?", answer: "Fees depend on the nature and complexity of the case. We offer transparent billing with no hidden charges." },
            { question: "Which courts do you practice in?", answer: "We practice in the Telangana High Court, district courts across Hyderabad, and various tribunals." },
            { question: "Can I consult remotely?", answer: "Yes, we offer video consultations for clients who cannot visit our office in person." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Schedule a Consultation",
          description: "Visit our chambers in Somajiguda, Hyderabad, or book a video consultation.",
        },
      },
    ],
    seo: {
      title: "Law Firm | Legal Services in Hyderabad",
      description: "Experienced legal counsel for corporate, family, criminal, and property matters in Hyderabad.",
    },
    animationTier: "subtle",
  };
}

export const lawyerRemixMeta: RemixMeta = {
  compatibleThemes: [
    "swiss-grid",
    "barrister-oak",
    "paper-white",
    "old-money",
    "ink-wash",
    "midnight-navy",
    "tailwind-base",
    "arctic",
  ],
  compatibleHeros: ["minimal", "centered", "gradient", "split-image"],
  sectionVariants: {
    "practice-areas": ["icon-grid"],
    "case-results": ["stats"],
    about: ["split-content", "story"],
    testimonials: ["carousel", "simple-grid"],
    faq: ["accordion", "two-column"],
  },
};

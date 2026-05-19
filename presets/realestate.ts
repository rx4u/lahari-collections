import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function realestatePreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "realestate",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "editorial-bg",
      headline: "Find your\ndream home\nin Hyderabad",
      subheadline: "Premium properties in Gachibowli, Madhapur, Kondapur, and Jubilee Hills. Your trusted partner for buying, selling, and renting.",
      cta: { text: "Browse Properties", url: "#property-listings", variant: "primary" },
      secondaryCta: { text: "Talk to an Agent", url: "#contact" },
      credentialBar: { items: [{ text: "Est. 2009" }, { text: "Hyderabad" }, { text: "500+ Properties Sold" }, { text: "RERA Registered" }] },
    },
    sections: [
      {
        type: "property-listings",
        variant: "featured-carousel",
        content: {
          headline: "Featured Properties",
          description: "Handpicked listings across Hyderabad's prime locations",
          listings: [
            { title: "3 BHK in Gachibowli", price: "1.2 Cr", area: "1,850 sq ft", location: "Gachibowli", type: "Apartment" },
            { title: "Villa in Jubilee Hills", price: "3.5 Cr", area: "3,200 sq ft", location: "Jubilee Hills", type: "Villa" },
            { title: "2 BHK in Kondapur", price: "68 L", area: "1,150 sq ft", location: "Kondapur", type: "Apartment" },
            { title: "4 BHK Duplex in Madhapur", price: "2.1 Cr", area: "2,800 sq ft", location: "Madhapur", type: "Duplex" },
          ],
        },
      },
      {
        type: "area-guide",
        variant: "card-grid",
        content: {
          headline: "Explore Neighborhoods",
          description: "Discover the best areas to live in Hyderabad",
          areas: [
            { name: "Gachibowli", description: "IT hub with excellent connectivity and modern amenities.", highlights: ["IT corridor", "Metro access", "Schools"] },
            { name: "Madhapur", description: "Vibrant locality with dining, shopping, and tech parks.", highlights: ["HITEC City", "Nightlife", "Restaurants"] },
            { name: "Kondapur", description: "Affordable yet well-connected residential area.", highlights: ["Budget-friendly", "Parks", "Hospitals"] },
            { name: "Jubilee Hills", description: "Premium residential enclave with luxury villas and gated communities.", highlights: ["Luxury living", "Film city", "Heritage"] },
          ],
        },
      },
      {
        type: "services",
        variant: "icon-list",
        content: {
          headline: "Our Services",
          description: "End-to-end real estate solutions",
          items: [
            { title: "Buying Assistance", description: "Find and negotiate the perfect property with expert guidance.", icon: "home" },
            { title: "Selling Support", description: "Market your property effectively and close at the best price.", icon: "trending-up" },
            { title: "Rental Management", description: "Hassle-free tenant screening, agreements, and property management.", icon: "key" },
            { title: "Legal Advisory", description: "Documentation verification, registration, and RERA compliance.", icon: "shield-check" },
            { title: "Home Loans", description: "Partnered with leading banks for the best interest rates.", icon: "landmark" },
            { title: "Interior Design", description: "Turn your new home into a dream space with our design partners.", icon: "paintbrush" },
          ],
        },
      },
      {
        type: "stats",
        variant: "counter",
        content: {
          headline: "Our Track Record",
          items: [
            { value: "500+", label: "Properties Sold" },
            { value: "1,200+", label: "Happy Families" },
            { value: "15+", label: "Years Experience" },
            { value: "50 Cr+", label: "Property Value Handled" },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "editorial-carousel",
        content: {
          items: [
            { quote: "Found our dream apartment in Gachibowli within two weeks. Exceptional service from start to finish.", name: "Suresh & Lakshmi", title: "Home Buyers, Gachibowli" },
            { quote: "Sold my villa at a great price. The team handled paperwork, negotiations, and handover seamlessly.", name: "Anil K.", title: "Seller, Jubilee Hills" },
            { quote: "The rental management service saved us so much time and hassle. Highly recommended for NRI investors.", name: "Divya R.", title: "NRI Investor, USA" },
          ],
          autoAdvance: 7000,
        },
      },
      {
        type: "about",
        variant: "editorial-split",
        content: {
          eyebrow: "About Us",
          headline: "Built on\ntransparency\nand trust.",
          description: "Founded in 2009, we have been helping families find their perfect home in Hyderabad. With deep knowledge of the local market, we make property transactions simple and stress-free.",
          description2: "We do not just show properties — we understand your life stage, your budget constraints, and the neighbourhood dynamics that only locals know.",
          cta: { text: "Meet the Team", url: "#contact" },
          image: "/images/defaults/realestate/team.jpg",
        },
      },
      {
        type: "contact",
        variant: "split-map",
        content: {
          headline: "Get in Touch",
          description: "Visit our office in Madhapur or schedule a property viewing today.",
        },
      },
    ],
    seo: {
      title: "Real Estate | Properties in Hyderabad",
      description: "Find your dream home in Hyderabad. Premium properties in Gachibowli, Madhapur, Kondapur, and Jubilee Hills.",
    },
    animationTier: "standard",
  };
}

export const realestateRemixMeta: RemixMeta = {
  compatibleThemes: [
    "realty-open-house",
    "kraft-paper",
    "swiss-grid",
    "cobalt-product",
    "sand-dune",
    "minimal-concrete",
    "tailwind-base",
    "coworking-loft",
  ],
  compatibleHeros: ["editorial-bg", "image-bg", "split-image", "centered"],
  sectionVariants: {
    "property-listings": ["featured-carousel"],
    "area-guide": ["card-grid"],
    services: ["icon-grid", "icon-list"],
    stats: ["counter", "dark-split"],
    testimonials: ["editorial-carousel", "carousel", "simple-grid"],
    about: ["editorial-split", "story", "split-content"],
  },
};

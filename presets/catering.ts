import type { SiteConfig, RemixMeta } from "../src/lib/types";

type DeepPartial<T> = { [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] };

export function cateringPreset(): DeepPartial<SiteConfig> {
  return {
    business: {
      type: "catering",
    },
    theme: {
      mode: "light",
    },
    layout: {
      type: "single-page",
    },
    hero: {
      style: "image-bg",
      headline: "Fresh ingredients. Unforgettable events.",
      subheadline: "The Harvest Table brings seasonal, farm-to-table catering to weddings, corporate events, and private celebrations across the city.",
      cta: { text: "Request a Quote", url: "#contact", variant: "primary" },
      secondaryCta: { text: "View Menus", url: "#menu-food" },
    },
    sections: [
      {
        type: "about",
        variant: "split-image",
        content: {
          headline: "About The Harvest Table",
          description: "The Harvest Table was founded by chef Priya Menon in 2016 with a simple belief: great events deserve great food made from honest ingredients. We work directly with local farmers to source seasonal produce, and every menu is designed fresh for each event. No frozen shortcuts. No pre-packaged meals. Just real cooking for real occasions.",
          stats: [
            { value: "8 Years", label: "In Business" },
            { value: "2,400+", label: "Events Catered" },
            { value: "4.9", label: "Average Rating" },
          ],
        },
      },
      {
        type: "services",
        variant: "card-grid",
        content: {
          headline: "What We Cater",
          description: "From boardroom lunches to grand weddings",
          items: [
            { title: "Corporate Events", description: "Working lunches, team dinners, product launches, and annual day banquets for 20–500 guests.", icon: "briefcase" },
            { title: "Weddings", description: "Full wedding banquets, sangeet nights, and day-after brunches with custom menu planning.", icon: "heart" },
            { title: "Private Dining", description: "Intimate in-home dinner parties with a chef-present, multi-course experience.", icon: "utensils" },
            { title: "Cocktail Parties", description: "Passed canapés, live stations, and curated small plates for cocktail and networking events.", icon: "wine" },
            { title: "Food Trucks", description: "Our street-style food truck brings casual, high-quality dining to festivals and outdoor events.", icon: "truck" },
            { title: "Meal Prep", description: "Weekly subscription meal prep for busy families and professionals — healthy, portioned, and ready to heat.", icon: "container" },
          ],
        },
      },
      {
        type: "menu-food",
        variant: "card-grid",
        content: {
          headline: "Menu Categories",
          description: "Seasonal menus crafted around your occasion and dietary needs",
          items: [
            { title: "Appetizers", description: "Bruschetta platters, chaat stations, stuffed mushrooms, skewers, and artisanal dips with seasonal accompaniments.", icon: "salad" },
            { title: "Mains", description: "Pan-Indian and continental mains: slow-cooked curries, roasted meats, pasta stations, and carving boards.", icon: "utensils" },
            { title: "Desserts", description: "Petit fours, dessert stations, wedding cake alternatives, mithai assortments, and house-churned ice cream.", icon: "cake" },
            { title: "Beverages", description: "Mocktail bars, infused water stations, specialty chai counters, and cold brew setups.", icon: "coffee" },
            { title: "Vegetarian", description: "Full vegetarian and sattvic menus available for every event type — no compromise on variety or presentation.", icon: "leaf" },
            { title: "Dietary Special", description: "Gluten-free, nut-free, vegan, diabetic, and Jain meal options prepared separately in a dedicated kitchen area.", icon: "shield-check" },
          ],
        },
      },
      {
        type: "packages",
        variant: "card-grid",
        content: {
          headline: "Our Packages",
          description: "Choose a starting point and we'll customise from there",
          items: [
            {
              title: "Essential",
              description: "Ideal for corporate lunches and small gatherings up to 50 guests. Three-course set menu with service staff.",
              price: "From ₹850/head",
              features: ["3-course set menu", "Service staff included", "Crockery & cutlery", "Setup & cleanup"],
            },
            {
              title: "Signature",
              description: "Our most popular package for events of 50–200 guests. Live stations, extended menu, and full event coordination.",
              price: "From ₹1,400/head",
              features: ["5-course or live station menu", "Dedicated event coordinator", "Full bar setup option", "Floral centrepieces", "Premium crockery"],
            },
            {
              title: "Grand Celebration",
              description: "Complete luxury catering for weddings and large events of 200–1,000 guests. Full service from tasting to teardown.",
              price: "From ₹2,200/head",
              features: ["Custom tasting session", "Full banquet menu", "Dessert & chaat stations", "Bar, mocktail & chai counters", "Full event coordination", "Day-of chef presence"],
            },
          ],
        },
      },
      {
        type: "testimonials",
        variant: "card-grid",
        content: {
          headline: "What Clients Say",
          items: [
            { name: "Ananya & Rohan S.", text: "The Harvest Table made our wedding feast extraordinary. Guests are still talking about the food six months later.", rating: 5 },
            { name: "Divya C., HR Manager", text: "We've used them for every company event for two years. Consistent quality, professional staff, zero stress.", rating: 5 },
            { name: "Meera P.", text: "The private dining experience was magical. Chef Priya cooked in our home and it felt like a restaurant at its best.", rating: 5 },
            { name: "Sanjay K.", text: "Best food at any event I've attended. The live stations were a hit and the dietary options were genuinely good.", rating: 5 },
          ],
        },
      },
      {
        type: "gallery",
        variant: "masonry",
        content: {
          headline: "From Our Events",
          description: "A look at the food, setups, and moments we've been part of",
          images: [],
        },
      },
      {
        type: "process",
        variant: "steps-numbered",
        content: {
          headline: "How We Work",
          description: "A smooth, collaborative process from first contact to the last plate",
          steps: [
            { step: 1, title: "Inquiry", description: "Tell us about your event — date, guest count, venue, and any cuisine preferences. We respond within 4 hours." },
            { step: 2, title: "Menu Planning", description: "Our culinary team creates a custom menu proposal tailored to your occasion, dietary needs, and budget." },
            { step: 3, title: "Tasting Session", description: "For events over 100 guests, we offer an optional paid tasting session where you sample key dishes and finalise the menu." },
            { step: 4, title: "Confirm & Book", description: "Once the menu and package are agreed, a 30% deposit secures your date. Balance is due one week before the event." },
            { step: 5, title: "Event Day", description: "Our team arrives 3–4 hours early for setup. A dedicated coordinator manages the event from start to cleanup." },
          ],
        },
      },
      {
        type: "faq",
        variant: "accordion",
        content: {
          headline: "Frequently Asked Questions",
          items: [
            { question: "What is your minimum guest count?", answer: "Our minimum is 20 guests for most packages. For private dining experiences, we accommodate from 8 guests." },
            { question: "Do you provide serving staff?", answer: "Yes, all packages include trained service staff. Staffing ratios are based on guest count and event type." },
            { question: "Can you accommodate dietary restrictions?", answer: "Absolutely. We cater for vegan, gluten-free, nut-free, Jain, diabetic, and other requirements. Please inform us during menu planning." },
            { question: "Do you handle outdoor and destination events?", answer: "Yes. We cater outdoor events with full equipment including generators, temporary kitchen setups, and weather-appropriate solutions. Destination events within 150 km of the city are welcome." },
            { question: "How far in advance should I book?", answer: "We recommend booking at least 4–6 weeks in advance for corporate events and 3–6 months for weddings. Last-minute requests are accommodated subject to availability." },
          ],
        },
      },
      {
        type: "contact",
        variant: "split-form",
        content: {
          headline: "Request a Quote",
          description: "Share your event details and we'll come back with a custom menu proposal and pricing within one business day.",
        },
      },
      {
        type: "cta",
        variant: "image-overlay",
        content: {
          headline: "Your event deserves food that's remembered.",
          description: "Let's plan your menu together. Tasting sessions available for weddings and large events.",
          cta: { text: "Request a Quote", url: "#contact", variant: "primary" },
        },
      },
    ],
    seo: {
      title: "The Harvest Table | Farm-to-Table Catering & Event Food",
      description: "Fresh, seasonal catering for weddings, corporate events, private dining, and celebrations. Custom menus, full service.",
    },
    animationTier: "standard",
  };
}

export const cateringRemixMeta: RemixMeta = {
  compatibleThemes: [
    "natural-wine",
    "forest-floor",
    "coffee-roast",
    "sand-dune",
    "linen",
    "trattoria-red",
    "wine-country",
    "apothecary-green",
  ],
  compatibleHeros: ["image-bg", "split-image", "centered", "gradient"],
  sectionVariants: {
    about: ["split-image", "split-content"],
    services: ["card-grid", "icon-grid"],
    "menu-food": ["card-grid", "icon-list"],
    packages: ["card-grid", "tier-cards"],
    testimonials: ["card-grid", "carousel"],
    gallery: ["masonry", "grid-3"],
    process: ["steps-numbered", "steps-horizontal"],
    faq: ["accordion", "two-column"],
    contact: ["split-form", "split-map"],
    cta: ["image-overlay", "banner"],
  },
};

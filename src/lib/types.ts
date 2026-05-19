export type BusinessType =
  | "doctor"
  | "dentist"
  | "restaurant"
  | "salon"
  | "gym"
  | "realestate"
  | "lawyer"
  | "retail"
  | "hospital"
  | "vet"
  | "bakery"
  | "pharmacy"
  | "school"
  | "hotel"
  | "events"
  | "wedding"
  | "homeservice"
  | "auto"
  | "photographer"
  | "interiors"
  | "individual"
  | "nonprofit"
  | "worship"
  | "petshop"
  | "jewellery"
  | "printing"
  | "catering"
  | "wellness"
  | "diagnostics"
  | "construction"
  | "ecommerce"
  | "publication"
  | "local";

export type HeroStyle =
  | "centered"
  | "split-image"
  | "image-bg"
  | "video-bg"
  | "gradient"
  | "carousel"
  | "parallax"
  | "collage"
  | "minimal"
  | "map-hero"
  | "product"
  | "stats-hero"
  | "editorial-bg"
  | "external";

export type AnimationTier = "subtle" | "standard" | "premium";

export interface NavConfig {
  style?: "sticky" | "floating-pill" | "transparent";
  ctaButton?: string;
  ctaHref?: string;
}

export interface FooterConfig {
  variant: "4-column-info" | "3-column-minimal" | "editorial-dark" | "warm-simple" | "split-cta";
  bgColor?: string;
  includeHours?: boolean;
  includeNewsletter?: boolean;
  ctaHeading?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
}

export interface SectionConfig {
  type: string;
  variant: string;
  content: Record<string, unknown>;
  page?: string;
  eyebrow?: string;
  subtitle?: string;
  navLabel?: string | null;
}

export interface DesignTokens {
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
    neutral: string;
    surface: string;
    onPrimary: string;
  };
  typography: {
    display: TypographyToken & { letterSpacing?: string };
    h1: TypographyToken;
    body: BodyTypographyToken;
    label: TypographyToken & { letterSpacing?: string };
  };
  rounded: { sm: string; md: string; lg: string };
  spacing: { sm: string; md: string; lg: string };
  components: {
    buttonPrimary: ComponentToken;
    card: ComponentToken;
  };
}

interface TypographyToken {
  fontFamily: string;
  fontSize: string;
  fontWeight: number;
}

interface BodyTypographyToken {
  fontFamily: string;
  fontSize: string;
  lineHeight: number;
}

interface ComponentToken {
  backgroundColor: string;
  textColor: string;
  rounded: string;
  padding: string;
}

export interface ThemeConfig {
  designMd?: string;
  designMdPath?: string;
  accentColor?: string;
  mode?: "light" | "dark" | "auto";
}

export interface BusinessConfig {
  type: BusinessType;
  name: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  mapUrl?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
    youtube?: string;
    linkedin?: string;
    whatsapp?: string;
  };
  hours?: Record<string, { open: string; close: string } | "closed">;
  logo?: string;
  favicon?: string;
}

export interface HeroItem {
  src: string;
  alt?: string;
  focalPoint?: string;
  overlay?: number;
}

export interface CredentialBar {
  items: Array<{ icon?: string; text: string }>;
}

export interface HeroConfig {
  style: HeroStyle;
  headline: string;
  subheadline: string;
  eyebrow?: string;
  credentialBar?: CredentialBar;
  cta: { text: string; url: string; variant: "primary" | "secondary" };
  secondaryCta?: { text: string; url: string };
  image?: string;
  video?: string;
  images?: (string | HeroItem)[];
}

export interface SEOConfig {
  title: string;
  description: string;
  ogImage?: string;
  keywords?: string[];
  locale?: string;
}

export interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  slug: string;
  name: string;
  price: number;
  comparePrice?: number;
  currency: string;
  category: string;
  images: string[];
  description: string;
  features?: string[];
  tags?: string[];
  inStock: boolean;
  variants?: ProductVariant[];
  rating?: number;
}

export interface Category {
  slug: string;
  name: string;
  description?: string;
  image?: string;
}

export interface ProductData {
  categories: Category[];
  products: Product[];
}

export interface ProductGridContent {
  headline: string;
  description?: string;
  filterTag: string;
  limit?: number;
  showPrice: boolean;
  variant?: "standard" | "portrait";
}

export interface EcommerceConfig {
  currency: string;
  currencySymbol: string;
  whatsappNumber: string;
  cartEnabled: boolean;
  showComparePrice: boolean;
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedVariants?: Record<string, string>;
}

export interface SiteConfig {
  business: BusinessConfig;
  theme: ThemeConfig;
  layout: {
    type: "single-page" | "multi-page";
    pages?: string[];
  };
  hero: HeroConfig;
  sections: SectionConfig[];
  seo: SEOConfig;
  animationTier: AnimationTier;
  nav?: NavConfig;
  footer?: FooterConfig;
  locale?: string;
  locales?: string[];
  features?: {
    blog?: boolean;
    i18n?: boolean;
  };
  ecommerce?: EcommerceConfig;
}

export interface RemixMeta {
  compatibleThemes: string[];
  compatibleHeros: string[];
  sectionVariants: Record<string, string[]>;
}

export interface DesignBrief {
  typography?: { displayFont?: string; bodyFont?: string };
  color?: { accent?: string };
  nav?: NavConfig;
  footer?: FooterConfig;
  animation?: { tier?: AnimationTier };
  motion?: {
    durationFast?: string;    // e.g. "120ms" — overrides --duration-fast
    durationNormal?: string;  // e.g. "200ms" — overrides --duration-normal
    durationSlow?: string;    // e.g. "400ms" — overrides --duration-slow
    easing?: string;          // e.g. "cubic-bezier(0.4, 0, 0.2, 1)" — overrides --easing-default
  };
  layout?: {
    contentMaxWidth?: string;       // e.g. "1440px", "1920px" — overrides .page-container max-width
    sectionPaddingMobile?: string;  // e.g. "4rem" — overrides .section-y at base breakpoint
    sectionPaddingTablet?: string;  // e.g. "5rem" — overrides .section-y at 640px+
    sectionPaddingDesktop?: string; // e.g. "6rem" — overrides .section-y at 1024px+
  };
}

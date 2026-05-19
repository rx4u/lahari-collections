/**
 * Config Generator for Template Hub
 *
 * Maps Google Places prospect data + Design Director brief → site.config.ts
 *
 * Usage:
 *   import { generateSiteConfig } from './lib/config-generator'
 *   const config = generateSiteConfig(prospect, brief)
 *   writeSiteConfig(config, './site.config.ts')
 *
 * Place this file at: ~/claude-code/template-hub/lib/config-generator.ts
 */

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProspectData {
  businessName: string
  category: string // Google Maps category
  phone: string
  address: string
  city: string
  state?: string
  country?: string
  googleRating?: number
  reviewCount?: number
  placeId?: string
  website?: string
  hours?: BusinessHours[]
  photos?: string[] // URLs from Places API or image_search
  socialLinks?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
  }
}

export interface BusinessHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface DesignBrief {
  businessType: string
  mood: 'Calm' | 'Balanced' | 'Bold' | 'Cinematic'
  taste: {
    designVariance: number
    motionIntensity: number
    visualDensity: number
  }
  typography: {
    display: string
    body: string
    import: string
  }
  color: {
    accent: string // Tailwind class e.g. "amber-600"
    accentHex: string
    neutral: 'zinc' | 'slate' | 'stone'
    strategy: string
  }
  theme: {
    designMdId: string
    overrides?: {
      fontHeading?: string
      fontBody?: string
      accentColor?: string
    }
  }
  hero: {
    layout: string
    recipe: string
    textAnimation: string
    source: 'template-hub' | 'hero-canvas'
  }
  sections: Array<{
    type: string
    variant: string
    navLabel: string | null
  }>
  nav: {
    style: 'sticky' | 'floating-pill' | 'transparent'
    items: string[]
    ctaButton: {
      text: string
      action: 'whatsapp' | 'scroll' | 'phone'
    }
  }
  footer: {
    variant: string
  }
  animation: {
    tier: 'subtle' | 'standard' | 'premium'
  }
  copy: {
    tonePreset: 'professional' | 'friendly' | 'minimal'
    market: 'global' | 'indian'
  }
}

export interface SiteConfig {
  business: {
    name: string
    slug: string
    type: string
    tagline: string
    description: string
    phone: string
    email: string
    address: string
    city: string
    state: string
    country: string
    hours: BusinessHours[]
    socialLinks: Record<string, string>
  }
  theme: {
    designMd: string
    accentColor: string
    fonts: {
      display: string
      body: string
      import: string
    }
    neutral: string
  }
  hero: {
    style: string
    headline: string
    subtitle: string
    cta: {
      text: string
      action: string
      target: string
    }
    image: string
    overlay?: boolean
  }
  nav: {
    style: string
    items: Array<{
      label: string
      href: string
    }>
    cta: {
      text: string
      action: string
    }
  }
  sections: Array<{
    type: string
    variant: string
    content: Record<string, unknown>
  }>
  footer: {
    variant: string
  }
  seo: {
    title: string
    description: string
    keywords: string[]
    ogImage: string
  }
  animationTier: string
  images: {
    hero: string
    logo: string
    gallery: string[]
    team: string[]
    favicon: string
  }
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function generatePlaceholderImages(slug: string, sectionTypes: string[]): SiteConfig['images'] {
  const gallery: string[] = []
  const team: string[] = []

  for (const section of sectionTypes) {
    if (section === 'gallery' || section === 'portfolio') {
      for (let i = 1; i <= 4; i++) {
        gallery.push(`https://picsum.photos/seed/${slug}-gallery-${i}/800/600`)
      }
    }
    if (section === 'team' || section === 'doctors' || section === 'trainers') {
      for (let i = 1; i <= 3; i++) {
        team.push(`https://picsum.photos/seed/${slug}-team-${i}/400/400`)
      }
    }
  }

  if (gallery.length === 0) {
    for (let i = 1; i <= 3; i++) {
      gallery.push(`https://picsum.photos/seed/${slug}-gallery-${i}/800/600`)
    }
  }

  return {
    hero: `https://picsum.photos/seed/${slug}-hero/1920/1080`,
    logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(slug)}&size=200&bold=true&format=svg`,
    gallery,
    team,
    favicon: `https://ui-avatars.com/api/?name=${encodeURIComponent(slug.charAt(0).toUpperCase())}&size=32&bold=true&format=svg`,
  }
}

function upgradeImagesFromProspect(
  images: SiteConfig['images'],
  prospect: ProspectData,
  accentHex: string
): SiteConfig['images'] {
  const upgraded = { ...images }

  // Use real photos from Places API if available
  if (prospect.photos && prospect.photos.length > 0) {
    upgraded.hero = prospect.photos[0]
    upgraded.gallery = prospect.photos.slice(1, 5).length > 0
      ? prospect.photos.slice(1, 5)
      : upgraded.gallery
  }

  // Generate logo with accent color
  const cleanHex = accentHex.replace('#', '')
  upgraded.logo = `https://ui-avatars.com/api/?name=${encodeURIComponent(prospect.businessName)}&size=200&background=${cleanHex}&color=fff&bold=true&format=svg`
  upgraded.favicon = `https://ui-avatars.com/api/?name=${encodeURIComponent(prospect.businessName.charAt(0))}&size=32&background=${cleanHex}&color=fff&bold=true&format=svg`

  return upgraded
}

function detectMarket(prospect: ProspectData): 'indian' | 'global' {
  const indianSignals = [
    prospect.country?.toLowerCase().includes('india'),
    prospect.phone?.startsWith('+91'),
    prospect.phone?.startsWith('91'),
    prospect.city?.match(/hyderabad|mumbai|delhi|bangalore|chennai|kolkata|pune|ahmedabad|jaipur|lucknow|chandigarh|kochi|gurgaon|noida|indore|bhopal|vizag|coimbatore|surat|vadodara|nagpur|patna|thiruvananthapuram/i),
    prospect.address?.toLowerCase().includes('india'),
  ]
  return indianSignals.some(Boolean) ? 'indian' : 'global'
}

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateSiteConfig(
  prospect: ProspectData,
  brief: DesignBrief
): SiteConfig {
  const slug = slugify(prospect.businessName)
  const sectionTypes = brief.sections.map(s => s.type)

  // Build nav items
  const navItems = brief.nav.items.map(label => ({
    label,
    href: `#${slugify(label)}`,
  }))

  // Build sections with empty content shells
  // Claude fills these during the copy pass (Step 5)
  const sections = brief.sections.map(s => ({
    type: s.type,
    variant: s.variant,
    content: buildSectionContentShell(s.type, prospect, brief),
  }))

  // Start with placeholders, upgrade if real photos exist
  let images = generatePlaceholderImages(slug, sectionTypes)
  images = upgradeImagesFromProspect(images, prospect, brief.color.accentHex)

  const market = detectMarket(prospect)

  // WhatsApp target
  const cleanPhone = prospect.phone.replace(/[^0-9]/g, '')
  const whatsappUrl = `https://wa.me/${cleanPhone}`

  const ctaTarget = brief.nav.ctaButton.action === 'whatsapp'
    ? whatsappUrl
    : brief.nav.ctaButton.action === 'phone'
      ? `tel:${cleanPhone}`
      : '#contact'

  return {
    business: {
      name: prospect.businessName,
      slug,
      type: brief.businessType,
      tagline: '', // Claude fills during copy pass
      description: '', // Claude fills during copy pass
      phone: prospect.phone,
      email: prospect.socialLinks?.instagram || '', // placeholder, often not in Places data
      address: prospect.address,
      city: prospect.city,
      state: prospect.state || '',
      country: prospect.country || 'India',
      hours: prospect.hours || generateDefaultHours(brief.businessType),
      socialLinks: prospect.socialLinks || {},
    },
    theme: {
      designMd: brief.theme.designMdId,
      accentColor: brief.color.accentHex,
      fonts: {
        display: brief.typography.display,
        body: brief.typography.body,
        import: brief.typography.import,
      },
      neutral: brief.color.neutral,
    },
    hero: {
      style: brief.hero.layout,
      headline: '', // Claude fills during copy pass
      subtitle: '', // Claude fills during copy pass
      cta: {
        text: brief.nav.ctaButton.text,
        action: brief.nav.ctaButton.action,
        target: ctaTarget,
      },
      image: images.hero,
      overlay: brief.mood === 'Bold' || brief.mood === 'Cinematic',
    },
    nav: {
      style: brief.nav.style,
      items: navItems,
      cta: {
        text: brief.nav.ctaButton.text,
        action: brief.nav.ctaButton.action,
      },
    },
    sections,
    footer: {
      variant: brief.footer.variant,
    },
    seo: {
      title: `${prospect.businessName} | ${capitalizeType(brief.businessType)} in ${prospect.city}`,
      description: '', // Claude fills during copy pass
      keywords: generateKeywords(prospect, brief),
      ogImage: images.hero,
    },
    animationTier: brief.animation.tier,
    images,
  }
}

// ─── Section Content Shells ──────────────────────────────────────────────────

function buildSectionContentShell(
  type: string,
  prospect: ProspectData,
  brief: DesignBrief
): Record<string, unknown> {
  switch (type) {
    case 'about':
      return {
        heading: '',
        body: '',
        image: `https://picsum.photos/seed/${slugify(prospect.businessName)}-about/800/600`,
        stats: [],
      }
    case 'services':
    case 'menu':
    case 'products':
      return {
        heading: capitalizeType(type),
        items: [],
        // Claude populates items during copy pass based on business type
      }
    case 'team':
    case 'doctors':
    case 'trainers':
      return {
        heading: capitalizeType(type),
        members: [],
      }
    case 'gallery':
    case 'portfolio':
      return {
        heading: capitalizeType(type),
        images: [],
        // Images populated from prospect.photos or placeholders
      }
    case 'testimonials':
    case 'reviews':
      return {
        heading: 'What Our Customers Say',
        items: [],
        // Claude writes paraphrased reviews from Google Reviews
      }
    case 'faq':
      return {
        heading: 'Frequently Asked Questions',
        items: [],
        // Claude writes business-specific Q&As
      }
    case 'pricing':
      return {
        heading: 'Pricing',
        plans: [],
      }
    case 'contact':
      return {
        heading: 'Get in Touch',
        phone: prospect.phone,
        address: prospect.address,
        city: prospect.city,
        mapEmbed: `https://www.google.com/maps/embed/v1/place?key=MAPS_KEY&q=${encodeURIComponent(prospect.address + ', ' + prospect.city)}`,
        whatsapp: `https://wa.me/${prospect.phone.replace(/[^0-9]/g, '')}`,
      }
    case 'hours':
      return {
        heading: 'Business Hours',
        hours: prospect.hours || generateDefaultHours(brief.businessType),
      }
    case 'stats':
      return {
        items: [],
        // Claude generates relevant stats (years in business, customers served, etc.)
      }
    case 'trust':
      return {
        heading: '',
        logos: [],
        certifications: [],
      }
    case 'cta':
      return {
        heading: '',
        subtitle: '',
        buttonText: brief.nav.ctaButton.text,
        buttonAction: brief.nav.ctaButton.action,
      }
    default:
      return { heading: capitalizeType(type) }
  }
}

// ─── Utility Functions ───────────────────────────────────────────────────────

function capitalizeType(type: string): string {
  return type
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function generateKeywords(prospect: ProspectData, brief: DesignBrief): string[] {
  const keywords = [
    prospect.businessName,
    brief.businessType,
    prospect.city,
  ]

  // Add category-specific keywords
  const categoryKeywords: Record<string, string[]> = {
    doctor: ['clinic', 'healthcare', 'medical', 'appointment'],
    restaurant: ['food', 'dining', 'cuisine', 'menu'],
    salon: ['beauty', 'haircut', 'grooming', 'spa'],
    gym: ['fitness', 'workout', 'training', 'health'],
    lawyer: ['legal', 'attorney', 'advocate', 'consultation'],
    hotel: ['accommodation', 'rooms', 'stay', 'booking'],
    dentist: ['dental', 'teeth', 'oral care'],
    bakery: ['cakes', 'pastry', 'baked goods'],
    realestate: ['property', 'homes', 'real estate', 'buying'],
    photographer: ['photography', 'photos', 'portraits', 'wedding photography'],
  }

  const typeKeys = categoryKeywords[brief.businessType]
  if (typeKeys) keywords.push(...typeKeys)

  if (prospect.state) keywords.push(prospect.state)

  return keywords
}

function generateDefaultHours(businessType: string): BusinessHours[] {
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const weekend = ['Saturday', 'Sunday']

  // Most Indian businesses have different timings
  const timings: Record<string, { open: string; close: string; satClose?: string; sunClosed?: boolean }> = {
    doctor: { open: '09:00', close: '18:00', sunClosed: true },
    hospital: { open: '00:00', close: '23:59' }, // 24/7
    restaurant: { open: '11:00', close: '23:00' },
    salon: { open: '10:00', close: '20:00', sunClosed: true },
    gym: { open: '05:30', close: '22:00' },
    retail: { open: '10:00', close: '21:00' },
    lawyer: { open: '10:00', close: '18:00', sunClosed: true },
    default: { open: '09:00', close: '18:00', sunClosed: true },
  }

  const t = timings[businessType] || timings.default
  const hours: BusinessHours[] = []

  for (const day of weekdays) {
    hours.push({ day, open: t.open, close: t.close })
  }
  hours.push({ day: 'Saturday', open: t.open, close: t.satClose || t.close })
  hours.push({
    day: 'Sunday',
    open: t.sunClosed ? '' : t.open,
    close: t.sunClosed ? '' : t.close,
    closed: t.sunClosed,
  })

  return hours
}

// ─── File Writer ─────────────────────────────────────────────────────────────

export function serializeSiteConfig(config: SiteConfig): string {
  return `import type { SiteConfig } from './types/site-config'

const config: SiteConfig = ${JSON.stringify(config, null, 2)}

export default config
`
}

// ─── Quick Test ──────────────────────────────────────────────────────────────
// Run: npx tsx lib/config-generator.ts
// Generates a sample config for a restaurant prospect

if (require.main === module) {
  const sampleProspect: ProspectData = {
    businessName: 'Spice Garden',
    category: 'Restaurant',
    phone: '+919876543210',
    address: 'Road No 10, Jubilee Hills',
    city: 'Hyderabad',
    state: 'Telangana',
    country: 'India',
    googleRating: 4.5,
    reviewCount: 230,
    placeId: 'ChIJ_sample_id',
    hours: [
      { day: 'Monday', open: '11:00', close: '23:00' },
      { day: 'Tuesday', open: '11:00', close: '23:00' },
      { day: 'Wednesday', open: '11:00', close: '23:00' },
      { day: 'Thursday', open: '11:00', close: '23:00' },
      { day: 'Friday', open: '11:00', close: '23:00' },
      { day: 'Saturday', open: '11:00', close: '23:30' },
      { day: 'Sunday', open: '11:00', close: '23:00' },
    ],
  }

  const sampleBrief: DesignBrief = {
    businessType: 'restaurant',
    mood: 'Balanced',
    taste: { designVariance: 6, motionIntensity: 5, visualDensity: 4 },
    typography: {
      display: 'Instrument Serif',
      body: 'DM Sans',
      import: 'https://fonts.googleapis.com/css2?family=Instrument+Serif&family=DM+Sans:wght@400;500;700&display=swap',
    },
    color: {
      accent: 'amber-600',
      accentHex: '#d97706',
      neutral: 'stone',
      strategy: 'Warm Appetite',
    },
    theme: {
      designMdId: 'coffee-roast',
    },
    hero: {
      layout: 'split-screen',
      recipe: 'split-screen-parallax',
      textAnimation: 'staggered-fade-up',
      source: 'hero-canvas',
    },
    sections: [
      { type: 'about', variant: 'story-image', navLabel: 'About' },
      { type: 'menu', variant: 'categorized-grid', navLabel: 'Menu' },
      { type: 'gallery', variant: 'masonry', navLabel: 'Gallery' },
      { type: 'testimonials', variant: 'carousel', navLabel: null },
      { type: 'hours', variant: 'card', navLabel: null },
      { type: 'contact', variant: 'split-map', navLabel: 'Contact' },
      { type: 'cta', variant: 'simple', navLabel: null },
    ],
    nav: {
      style: 'sticky',
      items: ['About', 'Menu', 'Gallery', 'Contact'],
      ctaButton: { text: 'Reserve a Table', action: 'whatsapp' },
    },
    footer: { variant: 'warm-simple' },
    animation: { tier: 'standard' },
    copy: { tonePreset: 'friendly', market: 'indian' },
  }

  const config = generateSiteConfig(sampleProspect, sampleBrief)
  console.log(serializeSiteConfig(config))
}

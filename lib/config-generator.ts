/**
 * Config Generator for Template Hub
 *
 * Maps Google Places prospect data + Design Director brief → site.config.ts
 * Uses the actual SiteConfig type from src/lib/types (not the starter's definition).
 *
 * Usage:
 *   import { generateSiteConfig } from './lib/config-generator'
 *   const config = generateSiteConfig(prospect, brief)
 */

import type {
  SiteConfig,
  BusinessType,
  HeroStyle,
  AnimationTier,
  SectionConfig,
  FooterConfig,
} from '../src/lib/types'

// ─── Prospect & Brief Types ──────────────────────────────────────────────────

export interface ProspectData {
  businessName: string
  category: string
  phone: string
  address: string
  city: string
  state?: string
  country?: string
  googleRating?: number
  reviewCount?: number
  placeId?: string
  website?: string
  /** Array format from Places API — converted to Record on output */
  hours?: ProspectHours[]
  photos?: string[]
  socialLinks?: {
    instagram?: string
    facebook?: string
    youtube?: string
    twitter?: string
    whatsapp?: string
  }
}

export interface ProspectHours {
  day: string
  open: string
  close: string
  closed?: boolean
}

export interface PipelineBrief {
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
    accent: string      // Tailwind class e.g. "amber-600"
    accentHex: string   // hex e.g. "#d97706"
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
    layout: string      // maps to HeroStyle
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

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

function capitalizeType(type: string): string {
  return type
    .split(/[-_]/)
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function detectMarket(prospect: ProspectData): 'indian' | 'global' {
  const indianSignals = [
    prospect.country?.toLowerCase().includes('india'),
    prospect.phone?.startsWith('+91'),
    prospect.phone?.startsWith('91'),
    !!prospect.city?.match(/hyderabad|mumbai|delhi|bangalore|bengaluru|chennai|kolkata|pune|ahmedabad|jaipur|lucknow|chandigarh|kochi|gurgaon|gurugram|noida|indore|bhopal|vizag|coimbatore|surat|vadodara|nagpur|patna|thiruvananthapuram/i),
    prospect.address?.toLowerCase().includes('india'),
  ]
  return indianSignals.some(Boolean) ? 'indian' : 'global'
}

/** Convert Places API hours array to the Record format used by SiteConfig */
function hoursToRecord(
  hours: ProspectHours[]
): Record<string, { open: string; close: string } | 'closed'> {
  const record: Record<string, { open: string; close: string } | 'closed'> = {}
  for (const h of hours) {
    record[h.day] = h.closed ? 'closed' : { open: h.open, close: h.close }
  }
  return record
}

function generateDefaultHours(
  businessType: string
): Record<string, { open: string; close: string } | 'closed'> {
  const timings: Record<string, { open: string; close: string; sunClosed?: boolean }> = {
    doctor:    { open: '09:00', close: '18:00', sunClosed: true },
    hospital:  { open: '00:00', close: '23:59' },
    restaurant:{ open: '11:00', close: '23:00' },
    salon:     { open: '10:00', close: '20:00', sunClosed: true },
    gym:       { open: '05:30', close: '22:00' },
    retail:    { open: '10:00', close: '21:00' },
    lawyer:    { open: '10:00', close: '18:00', sunClosed: true },
    bakery:    { open: '08:00', close: '21:00' },
    pharmacy:  { open: '08:00', close: '22:00' },
    default:   { open: '09:00', close: '18:00', sunClosed: true },
  }

  const t = timings[businessType] || timings.default
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  const record: Record<string, { open: string; close: string } | 'closed'> = {}
  for (const day of days) {
    if (day === 'Sunday' && t.sunClosed) {
      record[day] = 'closed'
    } else {
      record[day] = { open: t.open, close: t.close }
    }
  }
  return record
}

function generateKeywords(prospect: ProspectData, brief: PipelineBrief): string[] {
  const keywords = [prospect.businessName, brief.businessType, prospect.city]

  const categoryKeywords: Record<string, string[]> = {
    doctor:      ['clinic', 'healthcare', 'medical', 'appointment'],
    restaurant:  ['food', 'dining', 'cuisine', 'menu'],
    salon:       ['beauty', 'haircut', 'grooming', 'spa'],
    gym:         ['fitness', 'workout', 'training', 'health'],
    lawyer:      ['legal', 'attorney', 'advocate', 'consultation'],
    hotel:       ['accommodation', 'rooms', 'stay', 'booking'],
    dentist:     ['dental', 'teeth', 'oral care'],
    bakery:      ['cakes', 'pastry', 'baked goods'],
    realestate:  ['property', 'homes', 'real estate', 'buying'],
    photographer:['photography', 'photos', 'portraits', 'wedding photography'],
  }

  const typeKeys = categoryKeywords[brief.businessType]
  if (typeKeys) keywords.push(...typeKeys)
  if (prospect.state) keywords.push(prospect.state)

  return keywords
}

function buildSectionContentShell(
  type: string,
  prospect: ProspectData,
  brief: PipelineBrief
): Record<string, unknown> {
  const slug = slugify(prospect.businessName)
  const cleanPhone = prospect.phone.replace(/[^0-9]/g, '')

  // Sentinel placeholders — fail prebuild via placeholder-scanner if a copy
  // pass never fills the field. See CLAUDE.md "Pre-Deploy Guardrails".
  const PENDING = (label: string) => `__PLACEHOLDER__:${label}:__`

  switch (type) {
    case 'about':
      return {
        headline: PENDING('about-headline-pending'),
        description: PENDING('about-description-pending'),
        image: `https://picsum.photos/seed/${slug}-about/800/600`,
        stats: [PENDING('about-stats-pending') as unknown as never],
      }
    case 'services':
    case 'menu':
    case 'menu-food':
    case 'menu-services':
    case 'products':
      return {
        headline: capitalizeType(type),
        description: '',
        items: [PENDING(`${type}-items-pending`) as unknown as never],
      }
    case 'programs':
      return {
        headline: capitalizeType(type),
        items: [PENDING('programs-items-pending') as unknown as never],
      }
    case 'process':
      return {
        headline: capitalizeType(type),
        steps: [PENDING('process-steps-pending') as unknown as never],
      }
    case 'team':
    case 'doctors':
    case 'trainers':
      return {
        headline: capitalizeType(type),
        members: [PENDING(`${type}-members-pending`) as unknown as never],
      }
    case 'gallery':
    case 'portfolio': {
      const photos = prospect.photos?.slice(0, 6) ?? []
      return {
        headline: capitalizeType(type),
        images: photos.length > 0
          ? photos
          : [PENDING(`${type}-images-pending`) as unknown as never],
      }
    }
    case 'testimonials':
    case 'reviews':
      return {
        headline: 'What Our Customers Say',
        items: [PENDING(`${type}-items-pending`) as unknown as never],
      }
    case 'faq':
      return {
        headline: 'Frequently Asked Questions',
        items: [PENDING('faq-items-pending') as unknown as never],
      }
    case 'pricing':
      return {
        headline: 'Pricing',
        description: '',
        plans: [PENDING('pricing-plans-pending') as unknown as never],
      }
    case 'contact':
      return {
        headline: 'Get in Touch',
        phone: prospect.phone,
        address: prospect.address,
        city: prospect.city,
        whatsapp: `https://wa.me/${cleanPhone}`,
      }
    case 'hours':
      return {
        headline: 'Opening Hours',
        hours: prospect.hours
          ? hoursToRecord(prospect.hours)
          : generateDefaultHours(brief.businessType),
      }
    case 'stats':
      return {
        items: [PENDING('stats-items-pending') as unknown as never],
      }
    case 'trust':
      return { heading: '', logos: [], certifications: [] }
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

// ─── Generator ───────────────────────────────────────────────────────────────

export function generateSiteConfig(
  prospect: ProspectData,
  brief: PipelineBrief
): SiteConfig {
  const slug = slugify(prospect.businessName)
  const cleanPhone = prospect.phone.replace(/[^0-9]/g, '')

  const ctaTarget = brief.nav.ctaButton.action === 'whatsapp'
    ? `https://wa.me/${cleanPhone}`
    : brief.nav.ctaButton.action === 'phone'
      ? `tel:${cleanPhone}`
      : '#contact'

  const heroImage = prospect.photos?.[0]
    ?? `https://picsum.photos/seed/${slug}-hero/1920/1080`

  const accentColorClean = brief.color.accentHex.replace('#', '')

  const sections: SectionConfig[] = brief.sections.map(s => ({
    type: s.type,
    variant: s.variant,
    navLabel: s.navLabel,
    content: buildSectionContentShell(s.type, prospect, brief),
  }))

  const hours = prospect.hours
    ? hoursToRecord(prospect.hours)
    : generateDefaultHours(brief.businessType)

  const market = detectMarket(prospect)

  return {
    business: {
      type: brief.businessType as BusinessType,
      name: prospect.businessName,
      tagline: '',          // Claude fills during copy pass
      description: '',      // Claude fills during copy pass
      phone: prospect.phone,
      email: prospect.socialLinks?.instagram || '',
      address: prospect.address,
      city: prospect.city,
      state: prospect.state || '',
      pincode: '',
      mapUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(prospect.address + ', ' + prospect.city)}`,
      socialLinks: {
        ...prospect.socialLinks,
        whatsapp: prospect.socialLinks?.whatsapp || `https://wa.me/${cleanPhone}`,
      },
      hours,
      logo: `https://ui-avatars.com/api/?name=${encodeURIComponent(prospect.businessName)}&size=200&background=${accentColorClean}&color=fff&bold=true&format=svg`,
      favicon: `https://ui-avatars.com/api/?name=${encodeURIComponent(prospect.businessName.charAt(0))}&size=32&background=${accentColorClean}&color=fff&bold=true&format=svg`,
    },

    theme: {
      designMd: brief.theme.designMdId,
      accentColor: brief.color.accentHex,
    },

    layout: {
      type: 'single-page',
    },

    hero: {
      style: brief.hero.layout as HeroStyle,
      headline: '',         // Claude fills during copy pass
      subheadline: '',      // Claude fills during copy pass
      cta: {
        text: brief.nav.ctaButton.text,
        url: ctaTarget,
        variant: 'primary',
      },
      image: heroImage,
    },

    sections,

    seo: {
      title: `${prospect.businessName} | ${capitalizeType(brief.businessType)} in ${prospect.city}`,
      description: '',      // Claude fills during copy pass
      ogImage: heroImage,
      keywords: generateKeywords(prospect, brief),
      locale: market === 'indian' ? 'en_IN' : 'en_US',
    },

    animationTier: brief.animation.tier as AnimationTier,

    nav: {
      style: brief.nav.style,
      ctaButton: brief.nav.ctaButton.text,
      ctaHref: ctaTarget,
    },

    footer: {
      variant: (brief.footer.variant || 'warm-simple') as FooterConfig['variant'],
    },
  }
}

// ─── File Serializer ─────────────────────────────────────────────────────────

export function serializeSiteConfig(config: SiteConfig): string {
  return `import type { SiteConfig } from "./src/lib/types";

const config: SiteConfig = ${JSON.stringify(config, null, 2)};

export default config;
`
}

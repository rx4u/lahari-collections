/**
 * build-from-prospect.ts — CLI entry point for the web-agency-pipeline
 *
 * Usage:
 *   npx tsx scripts/build-from-prospect.ts \
 *     --name "Business Name" \
 *     --type restaurant \
 *     --phone +919876543210 \
 *     --address "Address" \
 *     --city "City" \
 *     [--brief design-brief.json]
 *
 * What it does:
 *   1. Parses CLI args
 *   2. Reads pipeline-brief.json if --brief provided, otherwise generates defaults for --type
 *   3. Calls generateSiteConfig to produce the site config
 *   4. Writes site.config.ts and site.config.json
 *   5. Writes pipeline-brief.json (for later pipeline-save use)
 *   6. Calls applyTheme to set up design.md and .theme-recipe.json
 *   7. Prints next steps
 */

import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs'
import { join, resolve } from 'path'
import { generateSiteConfig, serializeSiteConfig } from '../lib/config-generator'
import { applyTheme } from '../lib/theme-resolver'
import type { ProspectData, PipelineBrief } from '../lib/config-generator'

// ─── Default brief per business type ────────────────────────────────────────

const THEME_DEFAULTS: Record<string, { themeId: string; mood: PipelineBrief['mood'] }> = {
  doctor:      { themeId: 'glassline',       mood: 'Calm' },
  hospital:    { themeId: 'glassline',       mood: 'Calm' },
  dentist:     { themeId: 'paper-white',     mood: 'Calm' },
  pharmacy:    { themeId: 'matcha',          mood: 'Calm' },
  restaurant:  { themeId: 'terracotta',      mood: 'Balanced' },
  bakery:      { themeId: 'linen',           mood: 'Balanced' },
  cafe:        { themeId: 'forest-floor',    mood: 'Balanced' },
  salon:       { themeId: 'botanical',       mood: 'Balanced' },
  spa:         { themeId: 'desert-rose',     mood: 'Calm' },
  gym:         { themeId: 'brutalist-office',mood: 'Bold' },
  fitness:     { themeId: 'graphite',        mood: 'Bold' },
  hotel:       { themeId: 'heritage',        mood: 'Cinematic' },
  photographer:{ themeId: 'gallery-white',   mood: 'Cinematic' },
  lawyer:      { themeId: 'heritage',        mood: 'Calm' },
  realestate:  { themeId: 'heritage',        mood: 'Balanced' },
}

function buildDefaultBrief(businessType: string): PipelineBrief {
  const defaults = THEME_DEFAULTS[businessType] || { themeId: 'heritage', mood: 'Balanced' as const }

  return {
    businessType,
    mood: defaults.mood,
    taste: { designVariance: 5, motionIntensity: 5, visualDensity: 5 },
    typography: {
      display: 'DM Serif Display',
      body: 'DM Sans',
      import: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=DM+Sans:wght@400;500;600&display=swap',
    },
    color: {
      accent: 'teal-600',
      accentHex: '#0d9488',
      neutral: 'stone',
      strategy: 'Accent on CTA and highlights',
    },
    theme: {
      designMdId: defaults.themeId,
      overrides: {},
    },
    hero: {
      layout: 'image-bg',
      recipe: 'bottom-left-text',
      textAnimation: 'fade-up',
      source: 'template-hub',
    },
    sections: [
      { type: 'about',        variant: 'text-image',   navLabel: 'About' },
      { type: 'services',     variant: 'grid-3',       navLabel: 'Services' },
      { type: 'testimonials', variant: 'carousel',     navLabel: null },
      { type: 'contact',      variant: 'split-map',    navLabel: 'Contact' },
    ],
    nav: {
      style: 'sticky',
      items: ['About', 'Services', 'Contact'],
      ctaButton: { text: 'Book Now', action: 'whatsapp' },
    },
    footer: { variant: 'warm-simple' },
    animation: { tier: 'standard' },
    copy: { tonePreset: 'friendly', market: 'indian' },
  }
}

// ─── Arg parser ──────────────────────────────────────────────────────────────

function parseArgs(argv: string[]): Record<string, string> {
  const result: Record<string, string> = {}
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith('--')) {
      const key = argv[i].slice(2)
      result[key] = argv[i + 1] || ''
      i++
    }
  }
  return result
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  const args = parseArgs(process.argv.slice(2))
  const projectRoot = resolve(process.cwd())

  const name    = args['name']
  const type    = args['type']
  const phone   = args['phone']
  const address = args['address']
  const city    = args['city']
  const briefArg = args['brief']

  if (!name || !type || !phone || !address || !city) {
    console.error('Usage: npx tsx scripts/build-from-prospect.ts')
    console.error('  --name "Business Name"')
    console.error('  --type <businessType>')
    console.error('  --phone <phone>')
    console.error('  --address "Address"')
    console.error('  --city "City"')
    console.error('  [--brief pipeline-brief.json]')
    process.exit(1)
  }

  // 1. Load or generate brief
  let brief: PipelineBrief
  if (briefArg && existsSync(briefArg)) {
    brief = JSON.parse(readFileSync(briefArg, 'utf-8'))
    console.log(`Using brief from ${briefArg}`)
  } else {
    brief = buildDefaultBrief(type)
    console.log(`Generated default brief for type: ${type}`)
  }

  // 2. Build prospect data
  const prospect: ProspectData = {
    businessName: name,
    category: type,
    phone,
    address,
    city,
  }

  // 3. Generate site config
  const config = generateSiteConfig(prospect, brief)
  console.log(`Config generated for: ${name}`)

  // 4. Write site.config.ts
  const configTs = serializeSiteConfig(config)
  writeFileSync(join(projectRoot, 'site.config.ts'), configTs, 'utf-8')
  console.log('Wrote site.config.ts')

  // 5. Write site.config.json (machine-readable for pipeline-save)
  writeFileSync(join(projectRoot, 'site.config.json'), JSON.stringify(config, null, 2), 'utf-8')
  console.log('Wrote site.config.json')

  // 6. Write pipeline-brief.json (pipeline-save reads this, NOT design-brief.json)
  writeFileSync(join(projectRoot, 'pipeline-brief.json'), JSON.stringify(brief, null, 2), 'utf-8')
  console.log('Wrote pipeline-brief.json')

  // 7. Apply theme (sets up design.md + .theme-recipe.json)
  const themeId = brief.theme.designMdId
  console.log(`Applying theme: ${themeId}`)
  try {
    applyTheme(themeId, brief, projectRoot)
  } catch (err) {
    console.warn(`Theme apply failed (theme "${themeId}" may not exist): ${(err as Error).message}`)
    console.warn('Run: npx designdotmd add <themeId> --force — then re-run this script')
  }

  // 8. Done
  console.log('\n✓ Build setup complete. Next steps:')
  console.log('  1. Fill in copy: site.config.ts (tagline, description, section content)')
  console.log('  2. Preview: pnpm dev')
  console.log('  3. Build: pnpm build')
  console.log('  4. Deploy: vercel --prod')
  console.log('  5. Save to pipeline: npx tsx lib/pipeline-save.ts save . <deployUrl>')
  console.log('  6. Remix theme: npx tsx lib/theme-resolver.ts remix')
}

main().catch(err => {
  console.error(err.message)
  process.exit(1)
})

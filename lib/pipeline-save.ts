/**
 * Pipeline Save — post-deploy logging to Raja OS
 *
 * NOT part of the template-hub build. Never imported by src/. Never bundled.
 * Run manually after `vercel --prod` to log the build to the agency ops files.
 *
 * Writes to:
 *   ~/claude-code/raja-os/feedback/projects.jsonl  — append-only build log
 *   ~/claude-code/raja-os/brand/portfolio.json      — if portfolio_worthy: true
 *
 * Usage:
 *   npx tsx lib/pipeline-save.ts save . https://client.vercel.app
 *   npx tsx lib/pipeline-save.ts save . https://client.vercel.app --portfolio
 */

import { readFileSync, writeFileSync, appendFileSync, existsSync } from 'fs'
import { join, resolve } from 'path'

const RAJA_OS = resolve(process.env.HOME || '~', 'claude-code/raja-os')
const PROJECTS_LOG = join(RAJA_OS, 'feedback/projects.jsonl')
const PORTFOLIO_JSON = join(RAJA_OS, 'brand/portfolio.json')

// ─── Log to projects.jsonl ────────────────────────────────────────────────────

export function logToProjects(entry: Record<string, unknown>): void {
  if (!existsSync(PROJECTS_LOG)) {
    throw new Error(`projects.jsonl not found at ${PROJECTS_LOG}`)
  }
  appendFileSync(PROJECTS_LOG, JSON.stringify(entry) + '\n', 'utf-8')
  console.log(`Logged to projects.jsonl: ${entry.client}`)
}

// ─── Update portfolio.json ────────────────────────────────────────────────────

export function addToPortfolio(entry: {
  id: string
  title: string
  domain: string[]
  service: string
  client_type: string
  scope: string
  result: string
  proof_link: string | null
  tags: string[]
  date: string
}): void {
  if (!existsSync(PORTFOLIO_JSON)) {
    throw new Error(`portfolio.json not found at ${PORTFOLIO_JSON}`)
  }

  const raw = JSON.parse(readFileSync(PORTFOLIO_JSON, 'utf-8'))
  const cases: Record<string, unknown>[] = raw.case_studies || []

  const existing = cases.findIndex((c: Record<string, unknown>) => c.id === entry.id)
  if (existing >= 0) {
    cases[existing] = { ...cases[existing], ...entry }
    console.log(`Updated portfolio entry: ${entry.id}`)
  } else {
    cases.push(entry)
    console.log(`Added portfolio entry: ${entry.id}`)
  }

  raw.case_studies = cases
  writeFileSync(PORTFOLIO_JSON, JSON.stringify(raw, null, 2), 'utf-8')
}

// ─── Save from project files ──────────────────────────────────────────────────

export function saveFromProject(
  projectRoot: string,
  deployUrl: string,
  portfolioWorthy = false
): void {
  const configJsonPath = join(projectRoot, 'site.config.json')
  if (!existsSync(configJsonPath)) {
    throw new Error(`No site.config.json at ${projectRoot}. Run build-from-prospect first.`)
  }

  const config = JSON.parse(readFileSync(configJsonPath, 'utf-8'))
  const business = config.business || {}

  const briefPath = join(projectRoot, 'pipeline-brief.json')
  const brief = existsSync(briefPath)
    ? JSON.parse(readFileSync(briefPath, 'utf-8'))
    : null

  const recipePath = join(projectRoot, '.theme-recipe.json')
  const recipe = existsSync(recipePath)
    ? JSON.parse(readFileSync(recipePath, 'utf-8'))
    : null

  const businessType: string = brief?.businessType || business.type || 'unknown'
  const theme: string = recipe?.themeId || brief?.theme?.designMdId || 'unknown'
  const tier: string = brief?.animation?.tier || 'standard'
  const heroLayout: string = brief?.hero?.layout || 'unknown'
  const city: string = business.city || ''

  const projectEntry = {
    date: new Date().toISOString().split('T')[0],
    client: business.name,
    project: `${business.name} Website`,
    type: 'client-project',
    platform: 'Next.js / Vercel (template-hub)',
    budget: null,
    duration_days: null,
    deployed_url: deployUrl,
    client_satisfaction: null,
    what_worked: '',
    what_didnt: '',
    repeat_likelihood: null,
    portfolio_worthy: portfolioWorthy,
    notes: `Business type: ${businessType}. Theme: ${theme}. Hero: ${heroLayout}. Animation tier: ${tier}. City: ${city}.`,
  }

  logToProjects(projectEntry)

  if (portfolioWorthy) {
    const slug = business.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    addToPortfolio({
      id: slug,
      title: `${business.name} — ${businessType.charAt(0).toUpperCase() + businessType.slice(1)} Website`,
      domain: [businessType],
      service: 'design+build',
      client_type: `Client project — ${city}`,
      scope: `Local business website for a ${businessType} in ${city}. Built with template-hub (Next.js static). Theme: ${theme}. Animation tier: ${tier}.`,
      result: `Designed and deployed. Live on Vercel.`,
      proof_link: deployUrl,
      tags: ['template-hub', businessType, theme, tier, 'local-business', 'Next.js'],
      date: new Date().toISOString().split('T')[0],
    })
  }

  console.log('\nNext: fill in what_worked / what_didnt in projects.jsonl, then commit raja-os.')
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'save': {
      const projectRoot = args[1] || process.cwd()
      const deployUrl = args[2] || ''
      const portfolioWorthy = args.includes('--portfolio')
      if (!deployUrl) {
        console.error('Usage: npx tsx lib/pipeline-save.ts save [projectRoot] [deployUrl] [--portfolio]')
        process.exit(1)
      }
      saveFromProject(resolve(projectRoot), deployUrl, portfolioWorthy)
      break
    }
    default:
      console.log('Usage:')
      console.log('  npx tsx lib/pipeline-save.ts save [projectRoot] [deployUrl] [--portfolio]')
      console.log('')
      console.log('Logs the build to ~/claude-code/raja-os/feedback/projects.jsonl')
      console.log('Pass --portfolio to also add an entry to brand/portfolio.json')
  }
}

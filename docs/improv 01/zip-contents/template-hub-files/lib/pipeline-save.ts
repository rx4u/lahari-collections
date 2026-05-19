/**
 * Pipeline Save Utility for Template Hub
 *
 * Writes build metadata to the web_agency_pipeline Supabase table after deploy.
 * Called by the CLI or directly by Claude Code after `vercel --prod`.
 *
 * Place at: ~/claude-code/template-hub/lib/pipeline-save.ts
 *
 * Requires: SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in environment
 * Install: pnpm add @supabase/supabase-js (if not present)
 */

import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join } from 'path'

// ─── Types ───────────────────────────────────────────────────────────────────

interface PipelineRecord {
  // Business info
  business_name: string
  category?: string
  address?: string
  phone?: string
  email?: string
  google_rating?: number
  review_count?: number
  place_id?: string

  // Assessment
  has_website?: boolean
  website_url?: string
  audit_score?: number
  audit_issues?: string[]

  // Pipeline
  lead_priority?: string
  status: string

  // Build
  build_mode: string
  business_type?: string
  preset_id?: string
  hero_variant?: string
  animation_tier?: string
  design_brief?: Record<string, unknown>
  site_config?: Record<string, unknown>
  repo_path?: string

  // Deliverables
  demo_url?: string
  live_url?: string

  // Commercial
  tier?: string
  setup_fee?: number
  monthly_rate?: number
}

// ─── Supabase Client ─────────────────────────────────────────────────────────

function getSupabaseClient() {
  const url = process.env.SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !key) {
    throw new Error(
      'Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Set these in your environment or .env file.'
    )
  }

  return createClient(url, key)
}

// ─── Save to Pipeline ────────────────────────────────────────────────────────

export async function saveToPipeline(record: PipelineRecord): Promise<string> {
  const supabase = getSupabaseClient()

  const { data, error } = await supabase
    .from('web_agency_pipeline')
    .insert(record)
    .select('id')
    .single()

  if (error) {
    throw new Error(`Pipeline save failed: ${error.message}`)
  }

  console.log(`Saved to pipeline: ${record.business_name} (${data.id})`)
  return data.id
}

// ─── Save from Project Files ─────────────────────────────────────────────────

export async function saveFromProject(
  projectRoot: string,
  deployUrl: string,
  prospectData?: {
    google_rating?: number
    review_count?: number
    place_id?: string
    has_website?: boolean
    website_url?: string
    audit_score?: number
    audit_issues?: string[]
    lead_priority?: string
  }
): Promise<string> {
  // Read site config
  const configPath = join(projectRoot, 'site.config.ts')
  if (!existsSync(configPath)) {
    throw new Error(`No site.config.ts found at ${projectRoot}`)
  }

  // Read design brief
  const briefPath = join(projectRoot, 'design-brief.json')
  const brief = existsSync(briefPath)
    ? JSON.parse(readFileSync(briefPath, 'utf-8'))
    : null

  // Read theme recipe
  const recipePath = join(projectRoot, '.theme-recipe.json')
  const recipe = existsSync(recipePath)
    ? JSON.parse(readFileSync(recipePath, 'utf-8'))
    : null

  // Parse config for business fields
  // Note: site.config.ts is TypeScript, so we read it as text and extract JSON-like content
  // In practice, the config generator also writes a .json version for machine reading
  const configJsonPath = join(projectRoot, 'site.config.json')
  let config: Record<string, unknown> = {}
  if (existsSync(configJsonPath)) {
    config = JSON.parse(readFileSync(configJsonPath, 'utf-8'))
  }

  const business = (config.business || {}) as Record<string, unknown>

  const record: PipelineRecord = {
    business_name: (business.name as string) || '',
    category: (business.type as string) || brief?.businessType || '',
    address: (business.address as string) || '',
    phone: (business.phone as string) || '',
    status: 'demo_sent',
    build_mode: 'template-hub',
    business_type: brief?.businessType || (business.type as string) || '',
    preset_id: recipe?.themeId || brief?.theme?.designMdId || '',
    hero_variant: brief?.hero?.layout || '',
    animation_tier: brief?.animation?.tier || '',
    design_brief: brief || undefined,
    site_config: config || undefined,
    repo_path: projectRoot,
    demo_url: deployUrl,
    ...prospectData,
  }

  return saveToPipeline(record)
}

// ─── Update Remix Count ──────────────────────────────────────────────────────

export async function incrementRemixCount(businessName: string): Promise<void> {
  const supabase = getSupabaseClient()

  const { error } = await supabase
    .from('web_agency_pipeline')
    .update({
      remix_count: supabase.rpc('increment_remix', { name: businessName }),
      last_remix_at: new Date().toISOString(),
    })
    .eq('business_name', businessName)

  if (error) {
    // Fallback: read current count, increment, write back
    const { data } = await supabase
      .from('web_agency_pipeline')
      .select('remix_count')
      .eq('business_name', businessName)
      .single()

    if (data) {
      await supabase
        .from('web_agency_pipeline')
        .update({
          remix_count: (data.remix_count || 0) + 1,
          last_remix_at: new Date().toISOString(),
        })
        .eq('business_name', businessName)
    }
  }

  console.log(`Remix count incremented for ${businessName}`)
}

// ─── CLI ─────────────────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case 'save': {
      const projectRoot = args[1] || process.cwd()
      const deployUrl = args[2] || ''
      if (!deployUrl) {
        console.error('Usage: pipeline-save save [projectRoot] [deployUrl]')
        process.exit(1)
      }
      saveFromProject(projectRoot, deployUrl)
        .then(id => console.log(`Done. Pipeline ID: ${id}`))
        .catch(err => console.error(err.message))
      break
    }
    case 'remix': {
      const name = args[1]
      if (!name) {
        console.error('Usage: pipeline-save remix [businessName]')
        process.exit(1)
      }
      incrementRemixCount(name)
        .catch(err => console.error(err.message))
      break
    }
    default:
      console.log('Usage:')
      console.log('  npx tsx lib/pipeline-save.ts save [projectRoot] [deployUrl]')
      console.log('  npx tsx lib/pipeline-save.ts remix [businessName]')
  }
}

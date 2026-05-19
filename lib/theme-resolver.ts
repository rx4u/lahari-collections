/**
 * Theme Resolver for Template Hub
 *
 * Sits between Design Director and designdotmd CLI.
 * Handles: theme filtering, font weight validation, design.md merging,
 * merge recipe persistence for remix.
 *
 * Uses gray-matter (already a project dependency) for YAML parsing.
 */

import { execSync } from 'child_process'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

function loadCompatData(projectRoot: string) {
  const compatPath = join(projectRoot, 'data', 'font-theme-compat.json')
  if (!existsSync(compatPath)) {
    throw new Error(`Missing data/font-theme-compat.json at ${compatPath}`)
  }
  return JSON.parse(readFileSync(compatPath, 'utf-8'))
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface DirectorBrief {
  businessType: string
  mood: 'Calm' | 'Balanced' | 'Bold' | 'Cinematic'
  typography: {
    display: string
    body: string
  }
  color: {
    accent: string      // Tailwind class e.g. "amber-600"
    accentHex: string   // hex e.g. "#d97706"
    neutral: string     // zinc | slate | stone
  }
  theme: {
    designMdId: string
  }
}

interface DesignMdData {
  version: string
  name: string
  description: string
  colors: {
    primary: string
    secondary: string
    tertiary: string
    neutral: string
    surface: string
    'on-primary': string
  }
  typography: {
    display: {
      fontFamily: string
      fontSize: string
      fontWeight: number
      letterSpacing?: string
    }
    h1: {
      fontFamily: string
      fontSize: string
      fontWeight: number
    }
    body: {
      fontFamily: string
      fontSize: string
      lineHeight: number
    }
    label: {
      fontFamily: string
      fontSize: string
      fontWeight?: number
      letterSpacing?: string
    }
  }
  rounded: { sm: string; md: string; lg: string }
  spacing: { sm: string; md: string; lg: string }
  components: Record<string, unknown>
}

export interface MergeRecipe {
  themeId: string
  directorBrief: DirectorBrief
  mergedAt: string
  remixCount: number
}

// ─── Theme Listing ───────────────────────────────────────────────────────────

export function listAllThemes(): Array<{ id: string; name: string; tags: string }> {
  const output = execSync('npx designdotmd list', { encoding: 'utf-8' })
  return output
    .split('\n')
    .filter(line => line.trim())
    .map(line => {
      const parts = line.split('—').map(s => s.trim())
      const idAndName = parts[0].split(/\s{2,}/)
      return {
        id: idAndName[0]?.trim() || '',
        name: idAndName[1]?.trim() || '',
        tags: parts[1] || '',
      }
    })
    .filter(t => t.id)
}

export function listCompatibleThemes(
  mood: string,
  neutralFamily: string,
  projectRoot: string,
  excludeThemeId?: string
): string[] {
  const compat = loadCompatData(projectRoot)
  const keywords = compat.moodThemeKeywords[mood] || compat.moodThemeKeywords['Balanced']
  const allThemes = listAllThemes()

  return allThemes
    .filter(t => {
      if (t.id === excludeThemeId) return false
      const tagsLower = t.tags.toLowerCase()
      return keywords.some((kw: string) => tagsLower.includes(kw))
    })
    .map(t => t.id)
}

// ─── Font Weight Validation ──────────────────────────────────────────────────

export function getValidWeight(
  fontFamily: string,
  requestedWeight: number,
  projectRoot: string
): number {
  const compat = loadCompatData(projectRoot)
  const fontData = compat.fonts[fontFamily]

  if (!fontData) {
    console.warn(`Unknown font "${fontFamily}", using requested weight ${requestedWeight}`)
    return requestedWeight
  }

  const available = fontData.weights as number[]
  if (available.includes(requestedWeight)) return requestedWeight

  return available.reduce((closest: number, w: number) =>
    Math.abs(w - requestedWeight) < Math.abs(closest - requestedWeight) ? w : closest
  )
}

// ─── Tailwind to Hex ─────────────────────────────────────────────────────────

export function tailwindToHex(tailwindClass: string, projectRoot: string): string {
  const compat = loadCompatData(projectRoot)
  const hex = compat.tailwindToHex[tailwindClass]
  if (!hex) {
    console.warn(`No hex mapping for Tailwind class "${tailwindClass}", returning as-is`)
    return tailwindClass
  }
  return hex
}

// ─── Design.md Parsing (via gray-matter) ─────────────────────────────────────

function parseDesignMd(filePath: string): { data: DesignMdData; content: string } {
  const raw = readFileSync(filePath, 'utf-8')
  const parsed = matter(raw)
  return { data: parsed.data as DesignMdData, content: parsed.content }
}

function writeDesignMd(filePath: string, data: DesignMdData, content: string): void {
  const output = matter.stringify(content, data as unknown as Record<string, unknown>)
  writeFileSync(filePath, output, 'utf-8')
}

// ─── Core: Apply Theme with Director Overrides ──────────────────────────────

export function applyTheme(
  themeId: string,
  brief: DirectorBrief,
  projectRoot: string
): void {
  const designMdPath = join(projectRoot, 'design.md')

  execSync(`npx designdotmd add ${themeId} --force`, { cwd: projectRoot, encoding: 'utf-8' })

  const { data, content } = parseDesignMd(designMdPath)

  const themeDisplayWeight = data.typography.display.fontWeight
  const themeH1Weight = data.typography.h1.fontWeight

  data.typography.display.fontFamily = brief.typography.display
  data.typography.display.fontWeight = getValidWeight(
    brief.typography.display,
    themeDisplayWeight,
    projectRoot
  )

  data.typography.h1.fontFamily = brief.typography.display
  data.typography.h1.fontWeight = getValidWeight(
    brief.typography.display,
    themeH1Weight,
    projectRoot
  )

  data.typography.body.fontFamily = brief.typography.body

  const accentHex = brief.color.accentHex.startsWith('#')
    ? brief.color.accentHex
    : tailwindToHex(brief.color.accent, projectRoot)

  data.colors.tertiary = accentHex

  writeDesignMd(designMdPath, data, content)

  saveMergeRecipe(projectRoot, {
    themeId,
    directorBrief: brief,
    mergedAt: new Date().toISOString(),
    remixCount: 0,
  })

  console.log(`Theme "${themeId}" applied with Director overrides:`)
  console.log(`  Display: ${brief.typography.display} (weight: ${data.typography.display.fontWeight})`)
  console.log(`  Body: ${brief.typography.body}`)
  console.log(`  Accent: ${accentHex}`)
  console.log(`  Layout tokens (rounded, spacing, components): from ${themeId}`)
}

// ─── Merge Recipe Persistence ────────────────────────────────────────────────

const RECIPE_FILE = '.theme-recipe.json'

export function saveMergeRecipe(projectRoot: string, recipe: MergeRecipe): void {
  writeFileSync(join(projectRoot, RECIPE_FILE), JSON.stringify(recipe, null, 2), 'utf-8')
}

export function loadMergeRecipe(projectRoot: string): MergeRecipe | null {
  const recipePath = join(projectRoot, RECIPE_FILE)
  if (!existsSync(recipePath)) return null
  return JSON.parse(readFileSync(recipePath, 'utf-8'))
}

// ─── Remix ───────────────────────────────────────────────────────────────────

export function remixTheme(projectRoot: string, specificThemeId?: string): void {
  const recipe = loadMergeRecipe(projectRoot)
  if (!recipe) {
    throw new Error('No .theme-recipe.json found. Run a full build first.')
  }

  const brief = recipe.directorBrief

  let newThemeId: string
  if (specificThemeId) {
    newThemeId = specificThemeId
  } else {
    const compatible = listCompatibleThemes(
      brief.mood,
      brief.color.neutral,
      projectRoot,
      recipe.themeId
    )
    if (compatible.length === 0) {
      throw new Error(`No compatible themes found for mood "${brief.mood}" excluding "${recipe.themeId}"`)
    }
    const currentIndex = compatible.indexOf(recipe.themeId)
    newThemeId = compatible[(currentIndex + 1) % compatible.length]
  }

  console.log(`Remixing: ${recipe.themeId} -> ${newThemeId}`)
  applyTheme(newThemeId, brief, projectRoot)

  const updatedRecipe = loadMergeRecipe(projectRoot)!
  updatedRecipe.remixCount = recipe.remixCount + 1
  saveMergeRecipe(projectRoot, updatedRecipe)

  console.log(`Remix complete. Count: ${updatedRecipe.remixCount}`)
}

// ─── CLI Entry Point ─────────────────────────────────────────────────────────

if (require.main === module) {
  const args = process.argv.slice(2)
  const command = args[0]
  const projectRoot = process.cwd()

  switch (command) {
    case 'list': {
      const mood = args[1] || 'Balanced'
      const themes = listCompatibleThemes(mood, 'stone', projectRoot)
      console.log(`Compatible themes for ${mood} mood:`)
      themes.forEach(t => console.log(`  ${t}`))
      break
    }
    case 'apply': {
      const themeId = args[1]
      const briefPath = args[2] || 'pipeline-brief.json'
      if (!themeId) { console.error('Usage: theme-resolver apply [themeId] [briefPath]'); process.exit(1) }
      const brief = JSON.parse(readFileSync(join(projectRoot, briefPath), 'utf-8'))
      applyTheme(themeId, brief, projectRoot)
      break
    }
    case 'remix': {
      const specificId = args[1]
      remixTheme(projectRoot, specificId)
      break
    }
    default:
      console.log('Usage:')
      console.log('  npx tsx lib/theme-resolver.ts list [mood]')
      console.log('  npx tsx lib/theme-resolver.ts apply [themeId] [briefPath]')
      console.log('  npx tsx lib/theme-resolver.ts remix [specificThemeId?]')
  }
}

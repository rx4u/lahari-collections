# Template Hub Integration: Claude Code Prompt

Paste this into Claude Code when inside `~/claude-code/template-hub/`.

---

```
Read CLAUDE.md first to understand the project.

I'm integrating the web-agency-pipeline skill with template-hub. The skill was just updated to v5.0.0 with a new architecture: theme resolver, config generator, pipeline save, and a single-page vs multi-page decision system. I have starter files for each utility. Your job is to adapt them to match the ACTUAL template-hub codebase, not blindly copy them.

There are 5 tasks. Do them in order.

## Task 1: Font/theme compatibility data

Create `data/font-theme-compat.json` from the attached file. This is a static data file. Don't modify the structure, but verify the font weight data against Google Fonts if you can.

## Task 2: Theme resolver

Create `lib/theme-resolver.ts` from the attached starter file. This is the most important piece. It fixes remix breakage.

Before writing, read the actual `design.md` format in this project (run `npx designdotmd add heritage --force` and look at the output). The starter uses the `yaml` npm package to parse/write YAML frontmatter. If this project already has a YAML parser, use that instead.

What it does:
- `listCompatibleThemes(mood, neutral, projectRoot, excludeId?)`: lists designdotmd themes filtered by mood keywords
- `applyTheme(themeId, brief, projectRoot)`: applies a theme, then overwrites display/h1 fonts + fontWeight + body font + accent color with Design Director values. Keeps theme's layout tokens (rounded, spacing, components)
- `getValidWeight(fontFamily, requestedWeight, projectRoot)`: returns the closest valid Google Fonts weight for a font
- `saveMergeRecipe(projectRoot, recipe)`: saves the merge state to `.theme-recipe.json` so remix can re-apply overrides
- `remixTheme(projectRoot, specificThemeId?)`: reads `.theme-recipe.json`, picks next compatible theme, applies with SAME Director overrides

Key constraint: the starter file is a SPEC, not final code. Match it to what template-hub actually uses for types, paths, and config structure. If the project uses a SiteConfig type, import it. If design.md is parsed elsewhere, reuse that parser.

Install `yaml` package if needed: `pnpm add yaml`

Test: run `npx tsx lib/theme-resolver.ts apply heritage design-brief.json` with a sample brief. Verify the output design.md has heritage's radius/spacing but the Director's fonts and accent color.

## Task 3: Config generator

Create `lib/config-generator.ts` from the attached starter file.

CRITICAL: the starter defines its own SiteConfig type. DO NOT use that type. Instead, look at the actual SiteConfig or equivalent type/interface already in this project. The generator must produce configs that the existing renderer consumes. If the existing config shape differs from what the starter defines, adapt the generator to match the project's shape.

What it does:
- `generateSiteConfig(prospect, brief)`: maps Google Places prospect data + Design Director brief to a site.config.ts
- Handles placeholder images (seeded picsum URLs), Indian market detection, default hours per business type
- Content fields are empty shells that Claude fills during the copy pass

Also create `scripts/build-from-prospect.ts` as a CLI entry point:
```
npx tsx scripts/build-from-prospect.ts \
  --name "Business Name" \
  --type restaurant \
  --phone +919876543210 \
  --address "Address" \
  --city "City" \
  --brief design-brief.json
```

The CLI should:
1. Parse args
2. If --brief is provided, read the design-brief.json. If not, generate default Director values for the --type
3. Call generateSiteConfig
4. Write site.config.ts (or whatever format the project uses)
5. Call the theme resolver: applyTheme(brief.theme.designMdId, brief, projectRoot)
6. Print success message with next steps

Also write `site.config.json` alongside `site.config.ts` for machine readability (the pipeline save utility reads the JSON version).

## Task 4: Pipeline save

Create `lib/pipeline-save.ts` from the attached starter file.

**IMPORTANT: template-hub is a static site generator. It has no database, no auth, no API routes, and no Supabase client anywhere in the build.** pipeline-save is an external reporting tool that lives in this repo for convenience only. It never touches `pnpm build`, never gets bundled, never runs during the Next.js build. It is invoked manually after `vercel --prod`.

pipeline-save writes to Raja OS local files — no Supabase, no network calls, no env vars required:
- `~/claude-code/raja-os/feedback/projects.jsonl` — append-only JSONL build log
- `~/claude-code/raja-os/brand/portfolio.json` — optional, if `--portfolio` flag is passed

Key functions:
- `logToProjects(entry)`: appends one line to projects.jsonl
- `addToPortfolio(entry)`: upserts into portfolio.json `case_studies` array by id
- `saveFromProject(projectRoot, deployUrl, portfolioWorthy?)`: reads site.config.json + pipeline-brief.json + .theme-recipe.json, builds entry, calls logToProjects and optionally addToPortfolio

CLI usage:
```
npx tsx lib/pipeline-save.ts save . https://client.vercel.app
npx tsx lib/pipeline-save.ts save . https://client.vercel.app --portfolio
```

Do NOT add `@supabase/supabase-js`. No external dependencies — pure Node.js fs only.

## Task 5: Verify everything works together

Run this sequence:

1. `npx tsx scripts/build-from-prospect.ts --name "Test Bakery" --type bakery --phone +919876543210 --address "Banjara Hills" --city Hyderabad`
   - Should generate site.config.ts, site.config.json, design-brief.json, design.md, .theme-recipe.json
2. `pnpm build` should succeed with the generated config
3. `npx tsx lib/theme-resolver.ts remix` should swap to a new theme while keeping Director fonts/colors
4. `pnpm build` should still succeed after remix
5. Check design.md after remix: display font should be the Director's choice, NOT the new theme's default

If any step fails, fix it before moving to the next.

## What NOT to do

- Don't modify existing section components, hero variants, or the renderer
- Don't restructure the project's file layout
- Don't change the designdotmd integration (we're wrapping it, not replacing it)
- Don't add dependencies beyond `yaml` (and only if no existing YAML parser is available)
- Don't hardcode business names, theme IDs, or color values in the utilities. All values come from function parameters
```

---

## Files to drop into the project before running this prompt

Copy these into `~/claude-code/template-hub/` before pasting the prompt:

1. `data/font-theme-compat.json` (font weights, tailwind-to-hex map, mood keywords)
2. `lib/theme-resolver.ts` (starter, Claude Code adapts to actual types)
3. `lib/config-generator.ts` (starter, Claude Code adapts to actual SiteConfig type)
4. `lib/pipeline-save.ts` (starter, Claude Code adapts to actual project structure)

Claude Code will read these starters, read the actual codebase, and produce adapted versions that match.

## After this prompt completes

1. Test a full build: prospect a business, run the CLI, fill content, deploy
2. Test a remix: `npx tsx lib/theme-resolver.ts remix`
3. After deploy, log to Raja OS: `npx tsx lib/pipeline-save.ts save . <deployUrl>`
4. Pass `--portfolio` if the site is showcase-worthy
5. Push: `git add . && git commit -m "feat: theme resolver, config generator, pipeline save" && git push`

**No Supabase migration needed. No environment variables needed for pipeline-save.**

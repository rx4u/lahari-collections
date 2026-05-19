# Template Hub + Web Agency Pipeline Integration

## Execution Prompt for Claude Code

Paste this into Claude Code when inside the `~/claude-code/template-hub/` project:

---

```
I'm integrating the config generator into template-hub so the web-agency-pipeline can go from prospect data to deployed site automatically.

## Task 1: Add the config generator

Copy the config generator from the attached file into `lib/config-generator.ts`. Read the file first, understand the types, then:

1. Create `lib/config-generator.ts` with the full implementation
2. Create `types/site-config.ts` exporting the `SiteConfig` interface that matches what the generator produces
3. Make sure the existing `site.config.ts` at the project root conforms to the `SiteConfig` type. If the current config structure differs, update the generator types to match what template-hub actually uses (the generator adapts to the engine, not the other way around)
4. Add a test script at `scripts/generate-sample-config.ts` that runs the generator with the sample restaurant data (Spice Garden) and writes to `site.config.sample.ts`

Test: `npx tsx scripts/generate-sample-config.ts` produces a valid config. `pnpm build` still works with the existing config.

## Task 2: Add the pipeline save utility

Create `lib/pipeline-save.ts`:

1. A function `saveToPipeline(config: SiteConfig, prospect: ProspectData, brief: DesignBrief, deployUrl: string)` that inserts a row into the `web_agency_pipeline` Supabase table
2. Uses `@supabase/supabase-js` (add to dependencies if not present)
3. Maps the config/brief fields to the table columns (business_name, business_type, preset_id, hero_variant, animation_tier, design_brief as JSONB, site_config as JSONB, demo_url, build_mode: 'template-hub')
4. Reads SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY from environment

This is optional infrastructure. The pipeline works without it. But when available, it tracks every build.

## Task 3: Add a CLI entry point

Create `scripts/build-from-prospect.ts`:

Usage: `npx tsx scripts/build-from-prospect.ts --name "Spice Garden" --type restaurant --phone +919876543210 --address "Road No 10, Jubilee Hills" --city Hyderabad`

This script:
1. Takes prospect data from CLI args
2. Looks up the business type in the Design Director map (you can hardcode the map from the design-director.md reference, or read from a JSON version)
3. Generates a design brief with defaults for that business type
4. Runs the config generator
5. Writes `site.config.ts` to project root
6. Runs `npx designdotmd add [themeId] --force`
7. Prints: "Config generated. Run `pnpm build && vercel --prod --name [slug]` to deploy."

This is the glue that the web-agency-pipeline skill calls. The skill doesn't need to understand template-hub internals. It just runs this script with prospect data.

## Task 4: Update README.md

Add a "Pipeline Integration" section to the README:

- How the config generator works (prospect data + brief = config)
- CLI usage for `build-from-prospect.ts`
- The Supabase schema migration (reference the SQL file)
- How remix works on generated configs

## What NOT to do

- Don't modify any existing section components
- Don't change the theme system or designdotmd integration
- Don't add any new dependencies except @supabase/supabase-js (and only if Task 2 is attempted)
- Don't restructure the project. Add files, don't move files
```

---

## After This Prompt Completes

1. Test the sample config generation: `npx tsx scripts/generate-sample-config.ts`
2. Test a build with the sample: copy `site.config.sample.ts` to `site.config.ts`, run `pnpm build`
3. Run the CLI: `npx tsx scripts/build-from-prospect.ts --name "Test Bakery" --type bakery --phone +919876543210 --address "Banjara Hills" --city Hyderabad`
4. If the Supabase migration hasn't been run yet, run `schema-migration.sql` in the Supabase SQL Editor
5. Push: `git add . && git commit -m "feat: add config generator and pipeline integration" && git push`

## What This Unlocks

After this integration ships, the web-agency-pipeline skill can do:

```
User: "prospect bakeries in Banjara Hills"
  → Pipeline prospects, returns lead table

User: "build site for Sweet Delights"
  → Pipeline classifies type (bakery)
  → Design Director resolves brief
  → Runs: cd ~/claude-code/clients/sweet-delights && npx tsx scripts/build-from-prospect.ts [args]
  → Config generated, theme applied
  → Copy pass fills content
  → pnpm build && vercel --prod --name sweet-delights
  → Live at sweet-delights.vercel.app
  → Saved to Supabase pipeline
```

Full cycle: ~15 minutes from prospect to deployed demo site.

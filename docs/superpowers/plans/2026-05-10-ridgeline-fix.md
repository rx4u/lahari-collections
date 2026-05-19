# Ridgeline Site Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development to execute. Steps use `- [ ]` checkbox tracking.

**Goal:** Re-deploy https://ridgeline-iota.vercel.app/ on top of the now-migrated template-hub (`main` at `9153c10`) so the hero respects `--container-max-w`, body text is visible, the `#contact` anchor resolves, the gallery is populated or removed, and no placeholder content (Marcus Chen, `+1 (800) 555-0190`, `hello@example.com`) ships.

**Why this is a content task, not a code task:** the hub fixes already landed on main. The validators will tell us what's wrong with the Ridgeline config. The remaining work is curating real content (or excising sections that can't be populated) and triggering a rebuild.

**Tech Stack:** template-hub `main` @ `9153c10`. `pnpm prebuild` for validation. `vercel --prod` for deploy. The Ridgeline Vercel project: `ridgeline-iota`.

**Pre-flight assumption:** the Vercel CLI is linked to the Ridgeline project (`vercel link` already done at some point). If not, Task 0.5 below covers it.

---

## File Structure

This plan touches the live `site.config.ts` at the repo root, the `design-brief.json` if it exists, and `public/images/` for any new gallery images.

```
template-hub/
├── site.config.ts                           (REPLACE — Tasks 0, 2)
├── design-brief.json                        (REVIEW or CREATE — Task 0.5)
├── public/images/ridgeline/                 (NEW — Task 3 if gallery is kept)
└── (optional) clients/ridgeline/context.md  (NEW — Task 5 audit trail per CLAUDE.md)
```

---

# Phase 0 — Recover Ridgeline's Site Config

**Why:** The current local `site.config.ts` is a bakery test. We need Ridgeline's config to validate and fix it. The Ridgeline config that produced the broken deploy is **not committed** anywhere in `template-hub`. Three recovery paths in priority order.

## Task 0.1: Try the Vercel deployment artifact first

The fastest path: pull the last successful Ridgeline build from Vercel and read the bundled config.

- [ ] **Step 1: Confirm Vercel link**

```bash
cd /Users/Rajaraman.A/claude-code/template-hub
cat .vercel/project.json 2>/dev/null
```
Expected: JSON with `projectId` and `orgId`. If file missing or wrong project, skip to Step 2.

- [ ] **Step 2: List Ridgeline deployments**

```bash
vercel ls ridgeline-iota --limit 5
```
Note the URL of the most recent successful deployment.

- [ ] **Step 3: Pull source via Vercel inspect or download**

```bash
vercel pull --yes --environment=production
```

Or fetch the deployed bundle:
```bash
vercel inspect ridgeline-iota.vercel.app
```

If the source-tarball is downloadable, extract `site.config.ts` from it. Otherwise move to Task 0.2.

## Task 0.2: Pipeline run-log recovery

If web-agency-pipeline logs each run to `~/claude-code/raja-os/feedback/projects.jsonl` per CLAUDE.md, the Ridgeline entry may include the generated config or a path to it.

- [ ] **Step 1: Search Raja OS feedback for Ridgeline**

```bash
grep -i ridgeline ~/claude-code/raja-os/feedback/projects.jsonl
grep -i ridgeline ~/claude-code/raja-os/feedback/proposals.jsonl
```

- [ ] **Step 2: Search pipeline temp/output dirs**

```bash
find ~/claude-code/web-agency-pipeline -name "site.config*" -newer /tmp/anchor 2>/dev/null
find ~/claude-code -name "site.config*ridgeline*" 2>/dev/null
```

If nothing surfaces, move to Task 0.3.

## Task 0.3: Reverse-engineer from deployed HTML

Last resort. The deployed HTML at https://ridgeline-iota.vercel.app/ contains all visible content. We reconstruct a `site.config.ts` from it.

- [ ] **Step 1: Download the deployed HTML**

```bash
curl -sL https://ridgeline-iota.vercel.app/ -o /tmp/ridgeline.html
wc -l /tmp/ridgeline.html
```

- [ ] **Step 2: Manually map deployed sections → config**

Walk the deployed page. For each section, extract:
- `type` (programs / about / pricing / etc.)
- `variant` (best guess from rendering — `editorial-bg`, `card-grid`, `cards`, `accordion`)
- `content` fields (headline, copy, items)

Build a `site.config.ts` mirroring the live page. Use the bakery test config as a structural template; replace each block with Ridgeline content.

The deployed page has these sections (confirmed from prior forensic pass):
1. `hero` — style: `editorial-bg`, headline `"The road earns your attention."`, eyebrow `"CYCLING EXPEDITIONS"`, CTAs to `#programs` (primary) and `#how-it-works-timeline` (secondary, BROKEN — fix in Phase 2)
2. `about` — variant: `editorial-split`, eyebrow `"WHY RIDGELINE"`, headline `"We don't organize tours.\nWe design expeditions."`, two paragraphs, CTA `"Our story"` to `#programs` (BROKEN — wrong anchor)
3. `programs` — variant: `card-grid`, headline `"Three formats. One standard."`, 3 items (Day Rides, Multi-Day, Expeditions)
4. `stats` — variant: `dark-band`, 4 items (12,000+ km, 38,000 m, 8 max riders, 100% support)
5. `process` (`how-it-works`) — variant: `steps-horizontal`, headline `"From sign-up to summit."`, 3 steps
6. `gallery` — variant: `fullwidth-carousel`, headline `"The terrain speaks."`, **EMPTY images array** (BROKEN)
7. `pricing` — variant: `cards`, headline `"Transparent pricing."`, 3 plans
8. `testimonials` — variant: `editorial-carousel` (or `carousel`), headline `"From the road."`, currently has placeholder `Marcus Chen, Software Engineer, San Francisco` (BROKEN)
9. `faq` — variant: `accordion`, headline `"Questions."`, 6 items
10. `cta` — variant: `banner`, headline `"The next departure leaves in 14 days."`, button `"Reserve your spot"` to `#contact` (BROKEN — section missing)

- [ ] **Step 3: Save the reconstructed config to `site.config.ts`**

Replace the contents of `/Users/Rajaraman.A/claude-code/template-hub/site.config.ts` with the reverse-engineered Ridgeline config. **Do not commit yet** — Phase 2 will rewrite it after fixing blockers.

```bash
git status site.config.ts
```
Should show as modified. Leave uncommitted until validators are green.

## Task 0.5: Verify design-brief.json (theme override)

The Heritage theme in `design.md` resolves to a warm-light palette. If Ridgeline used different layout/motion overrides, capture them here.

- [ ] **Step 1: Inspect deployed `<html style>` for token overrides**

```bash
grep -oE 'style="[^"]*--container-max-w[^"]*"' /tmp/ridgeline.html
grep -oE 'style="[^"]*--section-y-desktop[^"]*"' /tmp/ridgeline.html
```

If either returns a value different from defaults (1440px / 6rem), set them in `design-brief.json` at the repo root:

```json
{
  "layout": {
    "contentMaxWidth": "<value>",
    "sectionPaddingDesktop": "<value>"
  }
}
```

If no overrides observed: skip — the defaults apply.

---

# Phase 1 — Run Prebuild Against the Recovered Config (Catalog Blockers)

## Task 1: First validator pass

- [ ] **Step 1: Run prebuild**

```bash
pnpm prebuild 2>&1 | tee /tmp/ridgeline-validators.txt
```

Expected output: a non-zero exit with a list of `[placeholder]`, `[dead-anchor]`, `[empty-section]` findings. **Save the output** — it's the punch list for Phase 2.

- [ ] **Step 2: Categorize the findings**

Open `/tmp/ridgeline-validators.txt`. For each finding, write down which Phase 2 task addresses it. Expected approximate set (based on prior forensic):
- `[placeholder]` business.phone (`+1 (800) 555-0190`) → Task 2.5
- `[placeholder]` business.email (`hello@example.com`) → Task 2.5
- `[placeholder]` testimonials items[0].name (`Marcus Chen`) — **note:** the new scanner is structural-only and won't catch generic names. Manual removal in Task 2.4.
- `[dead-anchor]` hero.cta.url `#contact` → Task 2.1
- `[dead-anchor]` pricing plans CTAs `#contact` → Task 2.1
- `[dead-anchor]` cta.cta.url `#contact` → Task 2.1
- `[dead-anchor]` hero.secondaryCta.url `#how-it-works-timeline` → Task 2.2
- `[dead-anchor]` about CTA `#programs` (only flagged if `programs` section is removed; keep for awareness) → Task 2.3
- `[empty-section]` gallery images[] → Task 2.6

The Marcus Chen line will not show in `[placeholder]` because the scanner uses structural patterns only. **Manual review of testimonials.items required in Task 2.4.**

---

# Phase 2 — Fix Each Blocker

Each task: edit `site.config.ts`, re-run `pnpm prebuild`, confirm the specific finding is gone, commit. Frequent commits so each fix is reviewable.

## Task 2.1: Add a Contact section + retarget all `#contact` CTAs

The headline Ridgeline failure. Six CTAs anchor to `#contact`; no section emits that id.

**Decision:** Either add a `contact` section to the sections array OR retarget every CTA to `tel:`/`mailto:`/WhatsApp.

For Ridgeline (premium booking-driven service), add a contact section.

- [ ] **Step 1: Append a contact section to `config.sections`**

Add as the second-to-last section (just before the bottom `cta` banner, so the booking flow lands on the form):

```ts
{
  type: "contact",
  variant: "split-map",
  navLabel: "Book",
  content: {
    headline: "Reserve your departure.",
    description: "Tell us which program and dates. We'll confirm availability within 24 hours.",
    phone: "<REAL PHONE>",                            // resolve in Task 2.5
    email: "<REAL EMAIL>",                            // resolve in Task 2.5
    address: "Boulder, Colorado",
    cta: { text: "Send enquiry", url: "mailto:<REAL EMAIL>" }
  }
}
```

- [ ] **Step 2: Re-run prebuild**

```bash
pnpm prebuild 2>&1 | grep -E "\[dead-anchor\].*contact"
```
Expected: zero lines (the `#contact` dead-anchor findings are gone because `contact` is now an active anchor).

- [ ] **Step 3: Commit**

```bash
git add site.config.ts
git commit -m "fix(ridgeline): add contact section so #contact CTAs resolve"
```

## Task 2.2: Fix hero secondary CTA — `#how-it-works-timeline` → `#how-it-works`

The Process section component emits `id="how-it-works"`, not `id="how-it-works-timeline"`.

- [ ] **Step 1: Edit `site.config.ts`**

In `hero.secondaryCta`:
```ts
secondaryCta: { text: "How it works", url: "#how-it-works" },
```

- [ ] **Step 2: Re-run prebuild**

```bash
pnpm prebuild 2>&1 | grep "how-it-works-timeline"
```
Expected: zero lines.

- [ ] **Step 3: Commit**

```bash
git add site.config.ts
git commit -m "fix(ridgeline): hero secondary CTA → #how-it-works (was non-existent #how-it-works-timeline)"
```

## Task 2.3: Fix about "Our story" CTA

In the deployed site, the about section's "Our story" link points to `#programs`. Semantically wrong. Either remove the CTA or point it to a real story page.

- [ ] **Step 1: Edit `site.config.ts`**

In `about.content`, remove the `cta` field entirely:
```ts
{
  type: "about",
  variant: "editorial-split",
  navLabel: null,
  content: {
    eyebrow: "WHY RIDGELINE",
    headline: "We don't organize tours.\nWe design expeditions.",
    description: "<existing copy>",
    description2: "<existing copy>",
    image: "<existing image path or URL>"
    // cta removed — about copy is strong enough standalone
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add site.config.ts
git commit -m "fix(ridgeline): drop about 'Our story' CTA (was anchoring to wrong section)"
```

## Task 2.4: Remove placeholder Marcus Chen testimonial

The validator's structural scanner doesn't catch generic names. Manual fix.

- [ ] **Step 1: Decide testimonial strategy**

Three options:
- **A.** Replace with real client testimonials (you have to source them).
- **B.** Remove the testimonials section entirely until real testimonials exist.
- **C.** Replace with a curated press/quote block ("As featured in Outside, Bicycling Magazine") — different content type.

Pick one. **Default: B (remove)** — better to ship a shorter site than a fake one.

- [ ] **Step 2A: If removing**

Delete the testimonials section block from `config.sections`. Also remove the nav link `Stories` if present (search for `navLabel: "Stories"`).

- [ ] **Step 2B: If replacing with real testimonials**

Replace each item:
```ts
items: [
  { name: "<REAL NAME>", role: "<REAL ROLE/CITY>", text: "<REAL QUOTE>", rating: 5 },
  // ...
]
```

Each item must have all four fields. No `__PLACEHOLDER__` sentinels — they will fail prebuild.

- [ ] **Step 3: Re-run prebuild**

```bash
pnpm prebuild 2>&1 | tail -10
```
Confirm no `[placeholder]` findings related to testimonials.

- [ ] **Step 4: Commit**

```bash
git add site.config.ts
git commit -m "fix(ridgeline): remove Marcus Chen placeholder testimonial — <strategy chosen>"
```

## Task 2.5: Replace placeholder phone and email with real values

Ridgeline contact details — the deploy ships with `+1 (800) 555-0190` and `hello@example.com`.

- [ ] **Step 1: Source real values**

You decide: real Ridgeline phone, real email. Until you have them, the site cannot ship.

If Ridgeline is a demo/portfolio piece (not a real client): use a clearly-marked owned address like `hello@<your-real-domain>.com` and either no phone or a call-deflecting Vercel form.

- [ ] **Step 2: Edit `site.config.ts`**

Replace in:
- `business.phone`
- `business.email`
- `business.socialLinks.whatsapp` (if WhatsApp CTA used)
- The contact section's `phone`, `email`, `cta.url` (mailto)
- Any other place those values appear (footer, nav CTA href, etc.)

- [ ] **Step 3: Re-run prebuild**

```bash
pnpm prebuild 2>&1 | grep "\[placeholder\]"
```
Expected: zero lines.

- [ ] **Step 4: Commit**

```bash
git add site.config.ts
git commit -m "fix(ridgeline): real phone and email — replace 555/example.com placeholders"
```

## Task 2.6: Populate or remove the gallery

Deployed gallery has empty `images[]`. The empty-section scanner blocks deploy.

- [ ] **Step 1: Decide strategy**

Two options:
- **A.** Populate with 4–8 real route images. Adds visual weight. Requires actual photos.
- **B.** Remove the gallery section entirely.

For a high-end cycling expedition site, **A is the right call** — the routes ARE the product. But it needs real photos, not stock.

- [ ] **Step 2A: If populating**

Place 4–8 royalty-free or owned cycling route images at:
```
public/images/ridgeline/route-1.jpg
public/images/ridgeline/route-2.jpg
...
```

Then in `site.config.ts` gallery section:
```ts
{
  type: "gallery",
  variant: "fullwidth-carousel",
  navLabel: "Routes",
  content: {
    headline: "The terrain speaks.",
    images: [
      { src: "/images/ridgeline/route-1.jpg", alt: "<route name>", caption: "<route caption>" },
      // ... 3–7 more
    ]
  }
}
```

`pnpm prebuild` will run `check-images.ts` on these paths — make sure each file actually exists in `public/images/ridgeline/`.

- [ ] **Step 2B: If removing**

Delete the gallery section block from `config.sections`. Also remove the nav link `Routes` if present.

- [ ] **Step 3: Re-run full prebuild**

```bash
pnpm prebuild 2>&1 | tail -10
```
Expected: `check-images: all N image(s) OK` and `check-config: OK`.

If still failing, address remaining findings before continuing.

- [ ] **Step 4: Commit**

```bash
git add site.config.ts public/images/ridgeline/
git commit -m "fix(ridgeline): gallery — <populate with N route images | remove section>"
```

## Task 2.7: Final all-green prebuild gate

- [ ] **Step 1: Confirm both validators green**

```bash
pnpm prebuild
```
Expected:
```
check-images: all <N> image(s) OK
check-config: OK
```

If anything is red, return to the relevant Task 2.x and fix.

---

# Phase 3 — Build, Visual QA, Deploy

## Task 3.1: Local build + visual smoke test

- [ ] **Step 1: Build**

```bash
pnpm build 2>&1 | tail -20
```
Expected: green build, no warnings about missing pages.

- [ ] **Step 2: Local serve and visual check**

```bash
pnpm dev
```

Open http://localhost:3748. Verify by eye:
- Hero text is **visible** (not white-on-white). Headline reads dark on light background.
- Hero content is centered/anchored within the configured `--container-max-w` (default 1440px) — no sprawl on widescreens.
- About section pull quote is **visible** (was invisible in the prior deploy).
- Body paragraphs in about and testimonials section are readable.
- Clicking "Book Now" / "Reserve" / "Send enquiry" scrolls to the new contact section. No dead anchors.
- Clicking "How it works" scrolls to the process section.
- Gallery either shows N images or is absent (per Task 2.6 decision).

Stop the dev server.

- [ ] **Step 3: Capture screenshots**

Take screenshots of hero, about, gallery, contact for the Raja OS log.

```bash
mkdir -p ~/claude-code/raja-os/clients/ridgeline/screenshots/2026-05-10/
# Place screenshots there with names: hero.png, about.png, gallery.png, contact.png
```

## Task 3.2: Deploy to Vercel preview first

- [ ] **Step 1: Preview deploy**

```bash
vercel
```
Note the preview URL (e.g. `https://ridgeline-iota-<hash>.vercel.app`).

- [ ] **Step 2: Smoke test the preview URL**

Hit the preview in a browser. Run the same checklist as Task 3.1 Step 2 against the preview URL. If anything regresses vs. local, debug before promoting.

## Task 3.3: Promote to production

- [ ] **Step 1: Production deploy**

```bash
vercel --prod 2>&1 | tee /tmp/ridgeline-deploy.txt
```

Capture the production URL (`ridgeline-iota.vercel.app` or whatever the alias resolves to).

- [ ] **Step 2: Final production smoke test**

Hit https://ridgeline-iota.vercel.app/ and re-run the full visual check. Verify the deployed CSS contains `1440px` (not the old `1200px`):

```bash
curl -sL https://ridgeline-iota.vercel.app/ | grep -oE "max-width:[^;\"]{2,20}" | sort | uniq -c
```
Expected: `1440px` appears (or whatever `--container-max-w` resolves to — definitely not `1200px`).

```bash
curl -sL https://ridgeline-iota.vercel.app/ | grep -c "color:var(--color-neutral)"
```
Expected: `0` (or very small if any non-section context still uses neutral as text — but the editorial sections should be clean).

```bash
curl -sL https://ridgeline-iota.vercel.app/ | grep -oE 'id="[a-z-]+"' | sort | uniq
```
Expected: `id="contact"` is present in the list.

---

# Phase 4 — Audit Trail + Raja OS

Per the user's CLAUDE.md auto-update rules: log this redeploy.

## Task 4.1: Commit the Ridgeline config to a clients folder

So next time we have an audit trail.

- [ ] **Step 1: Snapshot the working Ridgeline config**

```bash
mkdir -p clients/ridgeline
cp site.config.ts clients/ridgeline/site.config.ts
cp design.md clients/ridgeline/design.md
[ -f design-brief.json ] && cp design-brief.json clients/ridgeline/design-brief.json
```

- [ ] **Step 2: Add a context note**

Create `clients/ridgeline/context.md`:

```markdown
# Ridgeline

- Domain: cycling expeditions, Boulder CO
- Live URL: https://ridgeline-iota.vercel.app/
- Deployed: 2026-05-10 (re-deploy after editorial-migration-and-guardrails fix)
- Theme: Heritage (warm light, sea-green tertiary)
- Animation tier: standard
- Config snapshot: clients/ridgeline/site.config.ts (frozen at deploy time)
- Original failure: shipped with hardcoded 1200px hero width, neutral-as-text-color invisible body, dead #contact and #how-it-works-timeline anchors, empty gallery, Marcus Chen placeholder testimonial, +1 (800) 555-0190 placeholder phone, hello@example.com placeholder email
- Resolution: ad7db13..9153c10 hub fixes + this redeploy
```

- [ ] **Step 3: Commit**

```bash
git add clients/ridgeline/
git commit -m "client: snapshot Ridgeline working config + context (audit trail)"
git push origin main
```

## Task 4.2: Update Raja OS feedback log

Per `~/.claude/CLAUDE.md` Raja OS Auto-Updates section.

- [ ] **Step 1: Append entry to projects.jsonl**

```bash
echo '{"name":"Ridgeline","domain":"cycling-expeditions","service":"editorial-website","url":"https://ridgeline-iota.vercel.app/","tags":["template-hub","editorial","redeploy"],"date":"2026-05-10","status":"redeployed","notes":"Re-deploy after template-hub editorial-migration-and-guardrails fix. Original failure modes documented in template-hub/docs/forensic-2026-05-ridgeline.md."}' >> ~/claude-code/raja-os/feedback/projects.jsonl
```

- [ ] **Step 2: Commit Raja OS**

```bash
cd ~/claude-code/raja-os
git add feedback/projects.jsonl
git commit -m "feedback: log Ridgeline redeploy"
git push
cd /Users/Rajaraman.A/claude-code/template-hub
```

- [ ] **Step 3: If portfolio-worthy, update brand portfolio**

Per CLAUDE.md, if the redeploy quality justifies portfolio inclusion, update `~/claude-code/raja-os/brand/portfolio.json` and sync to `~/.claude/references/portfolio.json`. Skip otherwise.

---

# Self-Review

Coverage check:

| User-visible failure on the live Ridgeline | Where addressed |
|---|---|
| Hero hardcoded 1200px width | Hub fix already on main; rebuilt in Task 3.1 |
| About body text invisible (neutral as text color) | Hub fix already on main; rebuilt in Task 3.1 |
| Testimonials editorial carousel — invisible quote | Hub fix on main; rebuilt + Task 2.4 removes Marcus Chen |
| Hero CTA button text invisible (white on white) | Hub fix on main; rebuilt |
| Six dead `#contact` CTAs | Task 2.1 |
| Hero `#how-it-works-timeline` dead anchor | Task 2.2 |
| About `Our story` → `#programs` mismatch | Task 2.3 |
| Marcus Chen placeholder testimonial | Task 2.4 |
| `+1 (800) 555-0190` placeholder phone | Task 2.5 |
| `hello@example.com` placeholder email | Task 2.5 |
| Empty gallery rendering broken section | Task 2.6 |
| No audit trail for deployed config | Task 4.1 |
| Raja OS feedback log not updated | Task 4.2 |

No placeholders in this plan. Every `<REAL PHONE>` / `<REAL EMAIL>` / `<REAL TESTIMONIAL>` marker is intentional — these are content decisions only the user can make. Every command, file path, and grep target is exact.

---

# Subagent Dispatch Strategy

Most of this plan is **content curation**, not code. Subagents help where the work is mechanical:

| Task | Mode | Dispatch |
|---|---|---|
| 0.1 — Vercel artifact recovery | Manual / shell | User runs |
| 0.2 — Pipeline log recovery | Subagent | grep + report |
| 0.3 — Reverse-engineer config | **User-led** with subagent assist (hub knowledge required) |
| 1.0 — First validator pass | Subagent | runs + categorizes findings |
| 2.1 — Add contact section | Subagent | after user provides phone/email |
| 2.2 — Fix hero secondary CTA | Subagent | one-line edit |
| 2.3 — Drop about CTA | Subagent | one-block edit |
| 2.4 — Remove/replace testimonials | **User-led** content decision |
| 2.5 — Replace phone/email | **User-led** content (subagent applies values) |
| 2.6 — Populate or remove gallery | **User-led** content decision |
| 2.7 — Final prebuild gate | Subagent | runs + reports |
| 3.1 — Local build + visual QA | Subagent for build, **user for visual** |
| 3.2 — Preview deploy | Subagent |
| 3.3 — Production deploy | **User-confirmed** before vercel --prod |
| 4.1 — Audit trail commit | Subagent |
| 4.2 — Raja OS log | Subagent |

The blocking unknowns are: real phone, real email, real testimonials, real gallery images. Until those are decided, the deploy cannot complete. The plan can run up to Task 2.0 (validator pass) without them; everything from Task 2.1 onward needs content decisions.

---

# Execution

Plan saved to `docs/superpowers/plans/2026-05-10-ridgeline-fix.md`.

Two ways to start:

1. **Recovery first.** I run Tasks 0.1, 0.2, 0.3 to reconstruct Ridgeline's config, then run validators (Task 1) to produce a precise punch list. You decide content (testimonials / phone / email / gallery), then I apply Tasks 2–4.

2. **Content-first.** You hand me the content decisions upfront (phone, email, testimonials strategy, gallery strategy) and I drive the whole flow including config reconstruction.

Tell me which.

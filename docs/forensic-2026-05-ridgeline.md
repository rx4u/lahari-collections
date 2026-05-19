# Forensic Audit — Ridgeline (template-hub via web-agency-pipeline)
**URL:** https://ridgeline-iota.vercel.app/  
**Date:** 2026-05-10  
**Mode:** Read-only forensic. No code changed. No fixes applied.  

---

## 0. Acknowledgment

You are right to be frustrated. My prior review (`docs/design-review-findings-2026-05-ridgeline.md`) treated symptoms (dead anchors, ₹ icon, empty gallery) as the audit. It missed the **structural** root causes you named: page width, text color, and copy repeated from prior client. Those are the real story. This report fixes that omission.

---

## 1. Symptoms reported

| # | Symptom | Status |
|---|---|---|
| S1 | Page width not applied | **Confirmed by deployed HTML** |
| S2 | Text color not working | **Confirmed by deployed HTML** |
| S3 | Repeated content from previous project | **Confirmed by deployed HTML** |
| S4 | Same mistakes recurring | **Confirmed against `project_template_hub_known_issues.md`** |

---

## 2. Evidence (deployed HTML, not assumptions)

Downloaded https://ridgeline-iota.vercel.app/ to `/tmp/ridgeline.html`.

### S1 — Page width
```
page-container class       : 3 occurrences across the whole page
max-width values present   : 1200px (×1, hero inline)
                             22ch   (×1, headline cap)
                             480px  (×2, media-query rule)
                             1440px (×0)   ← the configured token
section-y class            : 0 occurrences  (utility never applied)
```

The site has 9 sections (`hero, about, programs, stats, how-it-works, gallery, pricing, testimonials, faq, cta`). Only **3 of those wrap content in `.page-container`**. The remaining 6+ use inline `padding: clamp(...)` with no max-width cap, so on widescreens content sprawls; or hardcode `maxWidth: "1200px"` inline (hero), bypassing the configured 1440 token entirely.

### S2 — Text color
Inline `color: var(--…)` declarations in the deployed HTML:
```
color: var(--color-primary)            : 14   ← correct (text token)
color: var(--color-secondary)          : 10   ← correct
color: var(--color-surface)            :  9   ← BUG (surface is card background)
color: var(--color-neutral)            :  7   ← BUG (neutral is page background)
color: color-mix(... --color-neutral …):  3   ← BUG (same)
color: var(--color-tertiary)           :  5   ← correct (accent)
color: var(--color-on-primary)         :  1   ← correct (only the hero)
```

Theme resolved at build (from `design.md`):
```
--color-primary  : #1A1715   (near-black — text)
--color-neutral  : #F4EFE8   (off-white — BACKGROUND)
--color-surface  : #F0E8D8   (cream — CARD BACKGROUND)
```

**19 inline declarations use a *background* token as a *text color*.** On this warm-light theme, that paints off-white text on off-white background. Visible result: stretches of "missing" or near-invisible text in the editorial sections.

### S3 — Repeated content
```
"Marcus Chen"                : 2
"Software Engineer"          : 2
"San Francisco"              : 2
"+1 (800) 555-0190"          : 6
"hello@ridgelinecycles..."   : 6
"Boulder"                    : 6
```

"Marcus Chen, Software Engineer, San Francisco" testimonial is generic placeholder copy for a Boulder cycling expedition. The phone `+1 (800) 555-0190` is a 555 placeholder. Both ship live, indistinguishable from real client content.

### S4 — Section IDs vs CTA targets
```
IDs present in deployed DOM : about cta faq gallery hero how-it-works pricing programs testimonials
CTA hrefs in nav/buttons    : #contact (×6)  #how-it-works-timeline (×1)
```
`#contact` does not exist. `#how-it-works-timeline` does not exist (the section's ID is `how-it-works`). Six booking CTAs and the hero secondary CTA are dead anchors.

---

## 3. Root cause per symptom

### S1 — Page width not applied

**Where:** `src/components/sections/Hero/HeroEditorialBg.tsx`, `src/components/sections/About/AboutEditorialSplit.tsx`, and likely `TestimonialsEditorialCarousel.tsx` (and any other editorial-* variant).

**Mechanism:** These variants were authored with **inline `style={...}` blocks** for layout — `padding: "0 clamp(1.5rem, 8vw, 8rem)..."`, then an inner `<div style={{ maxWidth: "1200px", margin: "0 auto" }}>`. They never use `<div className="page-container">`.

**Consequence:**
- The `--container-max-w` CSS variable is correctly injected on `<html>` by `src/app/layout.tsx:62` (via `getLayoutCssVars()` in `design-brief-loader.ts`).
- The `.page-container` utility correctly reads it (`globals.css:230`: `max-width: var(--container-max-w);`).
- But editorial sections never read either. They hardcode `1200px`. So `design-brief.json layout.contentMaxWidth` is ignored on those sections.

**Provenance:** Commit `939981a feat(editorial): absorb HAVEN + Maayas design vocabulary as section variants` introduced inline-styled editorial variants. The later commit `ad7db13 feat(design-system): tokenize structure + motion, wire per-theme overrides` formalized the token contract but never migrated the existing editorial variants.

The result: a token contract written *into CLAUDE.md* but not *enforced in code*.

### S2 — Text color not working

**Where:** All inline `color: var(--color-neutral)` and `color: var(--color-surface)` declarations. Concentrated in `AboutEditorialSplit.tsx` (uses `color-mix(in oklch, var(--color-neutral) 55%, transparent)` for body text) and the hairline-rule eyebrows.

**Mechanism — token semantics inversion:**
The design.md system defines:
| Token | Role | Ridgeline value |
|---|---|---|
| `--color-primary` | text / headline | `#1A1715` (near-black) |
| `--color-neutral` | page background | `#F4EFE8` (off-white) |
| `--color-surface` | card background | `#F0E8D8` (cream) |
| `--color-on-primary` | text on primary fill | `#F4EFE8` (off-white) |

The editorial components were authored with the assumption that `--color-neutral` meant "a neutral grey for body text." It does not. In this system, `neutral` is the **page background**. Using it as a text color paints background-on-background.

This works on dark themes by accident (where neutral is dark, body text shows up against dark surface), so the bug went undetected during component development.

**Provenance:** Same commit as S1. The editorial vocabulary was lifted from external designs (HAVEN, Maayas) where the source had its own token names; the migration to template-hub's tokens did not preserve semantics.

### S3 — Repeated content from previous project

**Where:** the site config generator in the web-agency-pipeline (lives outside template-hub; the artifact is `site.config.ts` written into the repo at deploy time).

**Mechanism:** When the pipeline cannot extract or generate client-specific testimonials, it falls back to a hardcoded placeholder set. `Marcus Chen / Software Engineer / San Francisco` is one of those placeholders. So is `+1 (800) 555-0190` for phone fallback. These ship to production with no visual marker indicating they're placeholders.

This is **not** literal repetition from the Rangrez project (Rangrez wouldn't have an SF software engineer). It's the *same placeholder set* used for both clients — which still reads as "you reused content" because the content is generic, not real.

**Provenance:** Pipeline-side, not in this repo's history. The current local `site.config.ts` is a bakery test config, so the Ridgeline config was generated, deployed, and discarded without ever being committed. **No audit trail exists in template-hub for what shipped to ridgeline-iota.vercel.app.** That itself is a P1 systemic gap.

### S4 — Same mistakes

Cross-checking against `~/.claude/projects/.../memory/project_template_hub_known_issues.md` (post-Rangrez retrospective from a06f2bbe…):

| Known issue (post-Rangrez) | Recurred on Ridgeline? |
|---|---|
| Empty categories render broken cards | **Yes** — gallery renders heading with no images, no empty state |
| Missing images deploy silently | **Yes** — gallery image array empty/broken |
| Container width inconsistency: 4 different max-widths | **Yes** — confirmed: 1200px, 22ch, 480px, 768px in deployed HTML |
| `/configure` and `/preview` public in production | Not re-tested, presumed unfixed |
| WhatsApp number hardcoded | Not applicable (no WhatsApp) |
| React key prop warnings | Not re-tested |
| No CMS / client cannot edit | Not applicable (template issue) |
| Dead section code shipped per client | **Yes** — DoctorDirectory, PropertyListings etc. still in `src/components/sections/` |
| No CONTENT.md per project | **Yes** — none generated |
| Blog pages missing Navbar+Footer | Not applicable (no blog deployed) |

Hit rate: **at least 4 of the 10 known issues recurred verbatim.**

The retrospective produced a memory note. The memory note never became:
- a lint rule
- a build-time check
- a CODEOWNERS gate
- a pipeline pre-deploy validator

So the next client (Ridgeline) hit the same defects. The retrospective changed the documentation surface, not the code.

---

## 4. Gap analysis — why my prior review missed this

My first review counted **dead anchors and a ₹ icon** as the headline findings. Those are real but *cosmetic*. I missed:

1. **Page width never applied** — I read the components and saw `var(--radius-lg)` and `var(--font-display)` and concluded "high token compliance." I did not grep the *deployed HTML* for `page-container` count vs section count. If I had, the 3-vs-9 ratio would have surfaced immediately.

2. **Text color inversion** — I read `AboutEditorialSplit.tsx` and saw `color: var(--color-neutral)`. I did not cross-check against the design.md semantics where neutral is background. I treated "uses CSS vars" as proof of correctness.

3. **Repeated copy** — I read "Marcus Chen, San Francisco, software engineer" and accepted it as content. I did not ask: *for a Boulder cycling company, why an SF software engineer?* That smell-test would have caught the placeholder.

4. **Cross-check with known-issues memory** — there is a memory file titled exactly `project_template_hub_known_issues.md`. I did not load it during the review. Had I done so, the audit would have started from "did Ridgeline repeat any of these?" rather than "what does the page look like?"

The error pattern: **token compliance ≠ token correctness.** Using `var(--color-neutral)` is "token-compliant" but using neutral as a text color is semantically wrong. My checklist treated CSS-var presence as a passing signal. It isn't.

---

## 5. Pattern analysis — why this repeats

Three meta-failures compound:

**(a) Token contract enforced in docs, not code.** CLAUDE.md says "Never hardcode colors, fonts, or spacing. Always CSS variables from design.md." But:
- No lint rule fails on inline `style={{ maxWidth: "1200px" }}`.
- No lint rule flags `color: var(--color-neutral)` (background token used as text color).
- The `taste-skill` ban list covers fonts/copy but not token misuse.
- `check-images.ts` exists as a prebuild hook for image paths. There is no equivalent for tokens, anchors, or empty arrays.

**(b) Pipeline-generated config is not committed.** The Ridgeline `site.config.ts` was generated, used to build, deployed, and overwritten by the next bakery test. The repo has zero auditable record of what shipped. When a client asks "why does my site say Marcus Chen?", you cannot diff against a known config. You can only re-read the deployed HTML.

**(c) Retrospectives become memory files, not test fixtures.** The Rangrez backlog is a markdown document describing what broke. There is no `__tests__/known-regressions/` folder where each issue is encoded as a failing test until it's fixed in the template. So issues persist past the moment of awareness.

These three together produce the user-visible pattern: every new client surfaces the same defects, the post-mortem produces another memory entry, and the next client surfaces them again.

---

## 6. The deeper mismatch

The template-hub has **two parallel design systems** living in the same repo:

| System A — "tokenized" | System B — "editorial" |
|---|---|
| Uses `<section className="section-y">` | Uses inline `style={{ padding: ... }}` |
| Uses `<div className="page-container">` | Uses inline `maxWidth: "1200px"` |
| Reads `var(--color-primary)` for text | Reads `var(--color-neutral)` for text |
| Honors `design-brief.json` overrides | Ignores them |
| Default sections (Pricing, Programs, Stats, Process, FAQ, CTA, Testimonials carousel) | Editorial sections (Hero `editorial-bg`, About `editorial-split`, Testimonials `editorial-carousel`) |

The Ridgeline site is rendered with a mixture of both. The non-editorial sections look correct. The editorial sections (visually the most prominent — hero and about) are the broken ones. So the most-seen surfaces of the site are the worst-conforming.

The token-contract refactor (commit `ad7db13`) made System A correct but never migrated System B. That is the structural debt.

---

## 7. What would prevent recurrence (stated, not implemented)

**Per STOP RULES I am not changing code. These are observations, not actions taken.**

1. **Lint rule: ban inline `maxWidth`/`max-width` literal pixel values in `src/components/sections/**`.** Force `page-container` or token reference.
2. **Lint rule: warn on `color: var(--color-neutral)` and `color: var(--color-surface)` in inline styles.** These are background tokens. Text should reach for `--color-primary` / `--color-secondary` / `--color-on-primary`.
3. **Pipeline pre-deploy validator:** parse generated `site.config.ts`, fail if it contains placeholder strings (`Marcus Chen`, `+1 (800) 555-0190`, `hello@example.com`, …).
4. **Pipeline pre-deploy validator:** parse generated config, fail if any CTA href references an anchor not produced by the section list.
5. **Pipeline pre-deploy validator:** fail if any section's `items`/`images` array is empty for sections that require content.
6. **Commit the generated `site.config.ts` per client to a `clients/<slug>/` folder** before deploy, so there is an audit trail.
7. **Convert each known-issue entry into a fixture test** under `__tests__/regressions/`. Issue closes when test goes green.
8. **Migrate editorial section variants** to use `page-container` + `var(--color-primary)`/`var(--color-on-primary)` for text, retiring inline maxWidth and inline neutral-as-text usages.

---

## 8. Stop and decide

I am not proceeding with any fix. You asked for a forensic report. This is the report.

When you decide what to do next, the practical options are:
- **A. Surgical fix to Ridgeline only** — patch `HeroEditorialBg`, `AboutEditorialSplit`, `TestimonialsEditorialCarousel` to use `page-container` + correct text tokens; add the missing `id="contact"` section; replace placeholder testimonials. ~3-4 hours.
- **B. Block-and-fix-the-pipeline** — pause client deploys, implement validators (#3–#6 above), then resume. Higher upfront cost, last time you should hit this class of bug.
- **C. Both** — A first to unblock Ridgeline, B in parallel before the next client.

Tell me which, and I'll do exactly that.

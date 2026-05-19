# Design Token Contract

This is the **single source of truth** for what every CSS variable in template-hub means.
Drift from this contract is the cause of the Ridgeline (invisible-text) and Birdeye
(dark-on-dark, ivory footer) classes of bugs. The token-contract-scanner
(`scripts/validators/token-contract-scanner.ts`) enforces this doc at
`pnpm prebuild` time.

## Background — why this exists

Two real-world bug classes shipped past every existing validator (ESLint, Zod, prebuild
scanners) because nothing checked token **semantics**:

- **Class A — wrong-role token use.** A footer rendered `background: var(--color-primary)`.
  Under the bridge convention, `--color-primary` is the **TEXT FOREGROUND** color
  (it maps to shadcn `--foreground`). In a dark theme, that's ivory — so the footer
  painted ivory and became invisible. The Ridgeline regression is the symmetric bug:
  `color: var(--color-neutral)` — using a BACKGROUND token as TEXT.
- **Class B — broken `.dark` formula.** `globals.css` `.dark` overrode
  `--muted-foreground` via `color-mix(in oklch, var(--color-on-primary) 70%, ...)`.
  But `--color-on-primary` means "text on the tertiary/accent fill" — often **dark**
  (e.g. dark text on an indigo button). Using it as a muted-foreground source breaks
  any theme where on-primary is dark.

The contract below pins each token's role, allowed CSS properties, dark-mode rule,
and the specific anti-patterns the scanner catches.

## How to read this doc

Each token entry has four fields:
- **Role** — what this token represents semantically.
- **Allowed CSS properties** — which CSS properties may consume this token. Anything else = violation.
- **Dark-mode rule** — what happens when the theme is dark.
- **Banned anti-patterns** — known-bad uses, with the rule ID the scanner emits.

---

## Family 1 — design.md tokens (theme-driven source of truth)

These six tokens are written by design.md / `theme-generator.ts` into `:root`. Dark
themes invert by changing the **value** of these tokens; never by adding a `.dark`
override block for these names.

### `--color-primary`
- **Role:** TEXT FOREGROUND. Primary body and heading text on page background and on
  card surfaces. Bridged to shadcn `--foreground`.
- **Allowed CSS properties:** `color:`, `border-color:`, `outline-color:`, `caret-color:`,
  `fill:` (for icon-as-text).
- **Forbidden CSS properties:** `background:`, `background-color:`, `background-image:`.
- **Dark-mode rule:** Inverts via design.md — dark themes set `--color-primary` to a
  light value directly. **NEVER override in the `.dark` block.**
- **Banned anti-patterns:**
  - `background(-color)?: ... var(--color-primary) ...` — Bug A (Footer Editorial Dark) → rule `no-primary-as-bg` (ERROR)
  - `bg-[var(--color-primary)]` — Tailwind variant of the same bug → rule `no-primary-as-bg`
  - `.dark { ... --color-primary: ... }` — overriding primary in `.dark` block → rule `no-color-primary-override-in-dark`

### `--color-secondary`
- **Role:** MUTED TEXT FOREGROUND. Body small print, captions, helper text, the source
  for the `--muted-foreground` and `--border` recipes.
- **Allowed CSS properties:** `color:`, `border-color:`, `outline-color:`,
  `fill:`, and **as input to `color-mix(...)` recipes** for borders/inputs.
- **Forbidden CSS properties:** `background:`, `background-color:`, `background-image:`.
- **Dark-mode rule:** Inverts via design.md. **NEVER override in `.dark`.**
- **Banned anti-patterns:**
  - `background(-color)?: ... var(--color-secondary) ...` → rule `no-secondary-as-bg`
  - `bg-[var(--color-secondary)]` → rule `no-secondary-as-bg`

### `--color-tertiary`
- **Role:** ACCENT / BRAND FILL color. Buttons, links, ring focus, branded shapes,
  active-state pills. Bridged to shadcn `--primary` and `--ring`.
- **Allowed CSS properties:** `background:`, `background-color:`, `color:`,
  `border-color:`, `outline-color:`, `fill:`, `stroke:`, `box-shadow:` (rings).
- **Dark-mode rule:** Inverts via design.md when warranted (some themes keep brand
  accent invariant across modes — that's the theme's choice). **NEVER override in `.dark`.**
- **Banned anti-patterns:** None — this is the most-flexible token by design.

### `--color-neutral`
- **Role:** PAGE BACKGROUND. The base page fill. Bridged to shadcn `--background`.
- **Allowed CSS properties:** `background:`, `background-color:`, `border-color:`
  (for chip outlines that match the page bg).
- **Forbidden CSS properties:** `color:` (use `--color-primary`). Using a background
  token as text color is the Ridgeline bug.
- **Dark-mode rule:** Inverts via design.md to a dark value. **NEVER override in `.dark`.**
- **Banned anti-patterns:**
  - `color: ... var(--color-neutral) ...` — Ridgeline regression → rule `no-neutral-as-color` (ERROR)
  - `text-[var(--color-neutral)]` — Tailwind variant → rule `no-neutral-as-color`

### `--color-surface`
- **Role:** ELEVATED BACKGROUND. Cards, popovers, menus, sticky bars, modals' chrome.
  Bridged to shadcn `--card`, `--popover`, `--secondary`, `--muted`, `--accent`.
- **Allowed CSS properties:** `background:`, `background-color:`, `border-color:`.
- **Forbidden CSS properties:** `color:` — surface is for fills, not text.
- **Dark-mode rule:** Inverts via design.md. **NEVER override in `.dark`.**
- **Banned anti-patterns:**
  - `color: ... var(--color-surface) ...` — symmetric Ridgeline regression → rule `no-surface-as-color`
  - `text-[var(--color-surface)]` → rule `no-surface-as-color`

### `--color-on-primary`
- **Role:** TEXT-ON-TERTIARY-FILL. The foreground color that sits on top of
  `--color-tertiary` surfaces (button labels on accent buttons). Bridged to shadcn
  `--primary-foreground`. **NOT a general "light text" token** — its value flips with the
  accent's lightness, so a dark accent yields dark on-primary text.
- **Allowed CSS properties:** `color:`, `fill:`, `border-color:` (rare).
- **Forbidden CSS properties:** `background:` (you almost never want a fill of this color).
- **Dark-mode rule:** Inverts via design.md. **NEVER override in `.dark`.**
- **Banned anti-patterns:**
  - `.dark { ... --color-primary: ... }` etc. — bridge contract → see Family 2 rules.
  - **Used as a source token inside a `.dark` override of a non-foreground bridge token
    (e.g. `--muted-foreground` color-mix recipe).** This is Bug B. → rule
    `no-on-primary-in-dark-block` (ERROR).
  - As a substitute for `--color-on-image` (for text on photo scrims) — use the
    fixed-light `--color-on-image*` tokens instead. *Not yet enforced; this is a
    code-review concern.*

---

## Family 2 — Shadcn bridge tokens

Defined in `:root` in `globals.css`, mapped from Family 1. The `.dark` block may
**only** override the four explicitly listed below; all other bridge tokens MUST
inherit via the Family 1 token they reference.

| Bridge token            | Source token              | Role                                  |
|-------------------------|---------------------------|---------------------------------------|
| `--background`          | `--color-neutral`         | page background                       |
| `--foreground`          | `--color-primary`         | body/heading text                     |
| `--card`                | `--color-surface`         | card background                       |
| `--card-foreground`     | `--color-primary`         | text on cards                         |
| `--popover`             | `--color-surface`         | popover background                    |
| `--popover-foreground`  | `--color-primary`         | text on popovers                      |
| `--primary`             | `--color-tertiary`        | accent fill                           |
| `--primary-foreground`  | `--color-on-primary`      | text on accent fill                   |
| `--secondary`           | `--color-surface`         | secondary surface                     |
| `--secondary-foreground`| `--color-primary`         | text on secondary surface             |
| `--muted`               | `--color-surface`         | muted surface                         |
| `--muted-foreground`    | `color-mix(--color-primary, --color-neutral)` | muted body text |
| `--accent`              | `--color-surface`         | accent surface                        |
| `--accent-foreground`   | `--color-primary`         | text on accent surface                |
| `--border`              | `color-mix(--color-secondary, transparent)` | dividers/outlines  |
| `--input`               | same recipe as `--border` | input outlines                        |
| `--ring`                | `--color-tertiary`        | focus ring                            |

**`.dark` block contract.** The dark block must touch only these properties,
all via `color-mix` against Family 1 tokens (NOT `--color-on-primary` — use
`--color-primary`, which already inverts via design.md):

- `--border`
- `--input`
- `--muted-foreground`
- `--sidebar` (background)
- `--sidebar-foreground`
- `--sidebar-border`

Any other shadcn-bridge token MUST NOT be overridden in `.dark` — its value
should flow from a Family-1 token that already inverts via the theme palette.

Components SHOULD prefer Tailwind utilities backed by these bridge tokens (`bg-card`,
`text-foreground`, `border-border`) over direct `var(--color-*)` references — but
direct use is allowed and not flagged.

---

## Family 3 — Semantic state tokens (theme-independent)

Fixed `oklch` values, do not change with theme. Used for status semantics, not branding.

| Token                     | Use                                                  |
|---------------------------|------------------------------------------------------|
| `--color-success`         | open, available, veg, joined                         |
| `--color-success-soft`    | soft success fills (badge bg)                        |
| `--color-danger`          | closed, sold, emergency, nonveg                      |
| `--color-danger-soft`     | soft danger fills                                    |
| `--color-warning`         | alerts, pending                                      |
| `--color-warning-soft`    | soft warning fills                                   |
| `--color-info`            | rented, info badges                                  |
| `--color-info-soft`       | soft info fills                                      |
| `--color-rating`          | stars, ratings                                       |
| `--color-whatsapp`        | brand-locked WhatsApp green (#25D366)                |

- **Allowed CSS properties:** any (color, background, border, fill).
- **Dark-mode rule:** Never override — these are state colors, not theme colors.
- **Banned anti-patterns:** None at the token level. (Raw Tailwind state colors
  like `bg-red-500` are caught elsewhere by code review, not by this scanner.)

---

## Family 4 — Fixed-contrast tokens

For surfaces with locked contrast: photo scrims (always-dark backdrop) and
forced-dark sections (stats bands, dark footers).

### `--color-on-image`, `--color-on-image-muted`, `--color-on-image-subtle`
- **Role:** TEXT OVER PHOTOGRAPHY. The scrim under hero/gallery images is
  `rgba(0,0,0,...)` regardless of theme, so the text on it must be invariantly light.
- **Allowed CSS properties:** `color:`, `fill:`, `border-color:`.
- **Forbidden CSS properties:** `background:` (use the scrim itself).
- **Dark-mode rule:** **No `.dark` override** — defeats the purpose.
- **Banned anti-patterns:**
  - `.dark { ... --color-on-image: ... }` — defeats fixed-contrast purpose → rule
    `no-on-image-override-in-dark`.

### `--color-forced-dark`, `--color-on-forced-dark`, `--color-on-forced-dark-muted`
- **Role:** LOCKED-DARK SURFACE. Sections that are semantically always dark
  (stats bands, "dark footer" variants). The `--color-forced-dark` fill plus
  `--color-on-forced-dark` text together stay dark even when the rest of the page
  is in a light theme.
- **Allowed CSS properties:** `--color-forced-dark`: `background:`, `background-color:`.
  `--color-on-forced-dark*`: `color:`, `fill:`, `border-color:`.
- **Dark-mode rule:** Never override.
- **Banned anti-patterns:** None (these tokens have very narrow, well-understood use).

---

## Family 5 — Layout + motion tokens

Structural, theme-overridable via `design-brief.json`.

| Token                       | Use                                         |
|-----------------------------|---------------------------------------------|
| `--container-max-w`         | page container max-width                    |
| `--section-y-mobile`        | section vertical padding, mobile            |
| `--section-y-tablet`        | section vertical padding, tablet            |
| `--section-y-desktop`       | section vertical padding, desktop           |
| `--duration-fast/normal/slow/slower` | animation/transition timings       |
| `--easing-default`          | default easing curve                        |

- **Allowed CSS properties:** the obvious matching properties (`max-width`,
  `padding-top`, `transition-duration`, `transition-timing-function`, etc.).
- **Dark-mode rule:** Never override (these are structural, not theme-driven).
- **Banned anti-patterns:** Hardcoded `max-width: 1440px` / `1200px` literals in
  inline styles inside `src/components/sections/**` and `src/components/layout/**`
  — already caught by the ESLint custom rules in `eslint.config.mjs`.

---

## Family 6 — Z-index scale

| Token             | Use                                              |
|-------------------|--------------------------------------------------|
| `--z-base`        | default (0)                                      |
| `--z-overlay`     | hero text on bg images, content above absolute bg |
| `--z-sticky`      | sticky elements within sections                  |
| `--z-dropdown`    | select menus, language switcher                  |
| `--z-header`      | sticky navbar                                    |
| `--z-modal`       | dialogs, lightboxes, full-screen overlays        |

- **Allowed CSS properties:** `z-index:`.
- **Banned anti-patterns:** Raw `z-10`/`z-20`/`z-50` Tailwind utilities in components —
  surfacing this is left to code review for now, not flagged by the scanner.

---

## Scanner rules — index

The token-contract-scanner enforces the contract via these rule IDs:

| Rule ID                                   | Severity | Catches                                                                                  |
|-------------------------------------------|----------|------------------------------------------------------------------------------------------|
| `no-primary-as-bg`                        | error    | `--color-primary` used as background (Bug A: ivory footer)                               |
| `no-secondary-as-bg`                      | error    | `--color-secondary` used as background                                                   |
| `no-neutral-as-color`                     | error    | `--color-neutral` used as text color (Ridgeline)                                         |
| `no-surface-as-color`                     | error    | `--color-surface` used as text color (Ridgeline-class)                                   |
| `no-on-primary-in-dark-block`     | error    | Bug B: `.dark { --muted-foreground: ... --color-on-primary ... }`                        |
| `no-color-primary-override-in-dark`       | error    | `.dark { --color-primary: ... }` — design.md owns the inversion                          |
| `no-color-neutral-override-in-dark`       | error    | `.dark { --color-neutral: ... }` — design.md owns the inversion                          |
| `no-color-surface-override-in-dark`       | error    | `.dark { --color-surface: ... }` — design.md owns the inversion                          |
| `no-color-secondary-override-in-dark`     | error    | `.dark { --color-secondary: ... }` — design.md owns the inversion                        |
| `no-color-tertiary-override-in-dark`      | error    | `.dark { --color-tertiary: ... }` — design.md owns the inversion                         |
| `no-on-image-override-in-dark`            | error    | `.dark { --color-on-image: ... }` — defeats fixed-contrast purpose                       |

Each rule has a corresponding allowlist key. Grandfathered violations live in
`scripts/validators/token-contract-allowlist.json` and are tracked for migration in
`docs/token-contract-violations-baseline.md`.

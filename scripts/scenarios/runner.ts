/**
 * Smoke-set scenario runner.
 *
 * Runs all three prebuild validators (placeholder, dead-anchor,
 * section-shape — the last now subsumes the prior empty-section check
 * via variant-aware z.array().min(1)) plus dark-mode detection against
 * six representative (preset, theme, variant) configs that the single
 * live site.config.ts can't cover. Fast (~1s total) — designed for
 * pre-push.
 *
 * Each scenario is expected to produce ZERO findings and match its `expect`
 * block. Any deviation fails the run and prints the diff.
 *
 * Add a new scenario:
 *   1. Drop a fixture in scripts/scenarios/fixtures/
 *   2. Add it to SCENARIOS below.
 */
import { scanForPlaceholders } from "../validators/placeholder-scanner";
import { scanForDeadAnchors } from "../validators/dead-anchor-scanner";
import { scanForSectionShape } from "../validators/section-shape-scanner";

import doctorLightSerif from "./fixtures/doctor-light-serif";
import restaurantDarkSans from "./fixtures/restaurant-dark-sans";
import gymPremium from "./fixtures/gym-premium";
import salonRtl from "./fixtures/salon-rtl";
import localMinimal from "./fixtures/local-minimal";
import hospitalDarkSerif from "./fixtures/hospital-dark-serif";

interface Scenario {
  name: string;
  designTokens: { colors: { neutral: string } };
  config: Record<string, unknown>;
  expect: { dark: boolean; requiredAnchors: readonly string[] };
}

const SCENARIOS: Scenario[] = [
  doctorLightSerif,
  restaurantDarkSans,
  gymPremium,
  salonRtl,
  localMinimal,
  hospitalDarkSerif,
];

/**
 * Mirror of src/app/layout.tsx isDarkTheme. Kept here as a literal so a
 * scenario failure surfaces a mismatch between the runner and the renderer
 * without an import cycle through Next-only code.
 */
function isDarkTheme(neutral: string): boolean {
  const m = neutral.match(/oklch\(\s*([0-9.]+)/i);
  if (!m) return false;
  const l = parseFloat(m[1]);
  return Number.isFinite(l) && l < 0.3;
}

function computeActiveAnchors(config: Record<string, unknown>): Set<string> {
  const anchors = new Set<string>();
  if ((config as { hero?: unknown }).hero) anchors.add("hero");
  const sections = (config as { sections?: Array<{ type?: string }> }).sections ?? [];
  for (const s of sections) if (s.type) anchors.add(s.type.toLowerCase());
  if (sections.some((s) => s.type === "process")) anchors.add("how-it-works");
  return anchors;
}

interface ScenarioResult {
  name: string;
  pass: boolean;
  errors: string[];
}

function runOne(s: Scenario): ScenarioResult {
  const errors: string[] = [];

  // 1. Static scanners — should be zero against a clean scenario.
  const placeholders = scanForPlaceholders(s.config);
  if (placeholders.length) {
    for (const f of placeholders) errors.push(`placeholder: ${f.path}: "${f.value}" — ${f.reason}`);
  }

  const activeAnchors = computeActiveAnchors(s.config);
  const deadAnchors = scanForDeadAnchors(s.config, activeAnchors);
  if (deadAnchors.length) {
    for (const f of deadAnchors) errors.push(`dead-anchor: ${f.path}: #${f.anchor}`);
  }

  const shape = scanForSectionShape(s.config);
  if (shape.length) {
    for (const f of shape) {
      errors.push(
        `section-shape: sections[${f.index}] ${f.section}${f.variant ? `:${f.variant}` : ""} — ${
          f.kind
        } "${f.field}"`
      );
    }
  }

  // 2. Dark-mode detection matches scenario expectation.
  const computedDark = isDarkTheme(s.designTokens.colors.neutral);
  if (computedDark !== s.expect.dark) {
    errors.push(
      `dark-mode: expected ${s.expect.dark} for neutral=${s.designTokens.colors.neutral}, got ${computedDark}`
    );
  }

  // 3. Every required anchor is reachable from the active set.
  for (const a of s.expect.requiredAnchors) {
    if (!activeAnchors.has(a)) {
      errors.push(`anchor-coverage: expected anchor "#${a}" but no section emits it`);
    }
  }

  return { name: s.name, pass: errors.length === 0, errors };
}

function main() {
  console.log(`scenarios: running ${SCENARIOS.length} smoke scenario(s)\n`);
  const results = SCENARIOS.map(runOne);

  let failed = 0;
  for (const r of results) {
    const status = r.pass ? "PASS" : "FAIL";
    console.log(`  [${status}] ${r.name}`);
    if (!r.pass) {
      failed++;
      for (const e of r.errors) console.log(`         · ${e}`);
    }
  }

  console.log();
  if (failed > 0) {
    console.error(`scenarios: ${failed}/${results.length} failed`);
    process.exit(1);
  }
  console.log(`scenarios: ${results.length}/${results.length} passed`);
}

main();

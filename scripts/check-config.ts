import path from "path";
import { fileURLToPath } from "url";
import { loadSiteConfig } from "./validators/load-config";
import { scanForPlaceholders } from "./validators/placeholder-scanner";
import { scanForDeadAnchors } from "./validators/dead-anchor-scanner";
import { scanForSectionShape } from "./validators/section-shape-scanner";
import { scanForTokenContractViolations, groupByRule } from "./validators/token-contract-scanner";

// Scanner mode: "warn" logs findings but exits 0; "error" treats them as blockers.
// Switched to "error" once the baseline backlog (docs/token-contract-violations-baseline.md)
// is migrated. New violations introduced after baseline should be fixed at PR time,
// not allowlisted.
const TOKEN_CONTRACT_MODE: "warn" | "error" = "warn";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

function getActiveAnchors(config: Record<string, unknown>): Set<string> {
  const anchors = new Set<string>();
  if ((config as { hero?: unknown }).hero) anchors.add("hero");
  const sections = (config as { sections?: Array<{ type?: string }> }).sections ?? [];
  for (const s of sections) {
    if (s.type) anchors.add(s.type.toLowerCase());
  }
  // Known alias: process section emits id="how-it-works" in its rendered output
  if (sections.some((s) => s.type === "process")) anchors.add("how-it-works");
  return anchors;
}

async function main() {
  const config = await loadSiteConfig(repoRoot);
  const activeAnchors = getActiveAnchors(config);

  const placeholders = scanForPlaceholders(config);
  const deadAnchors = scanForDeadAnchors(config, activeAnchors);
  const sectionShape = scanForSectionShape(config);

  const tokenContract = scanForTokenContractViolations(repoRoot);

  const total = placeholders.length + deadAnchors.length + sectionShape.length;

  if (placeholders.length) {
    console.error(`\n[placeholder] ${placeholders.length} finding(s):`);
    for (const f of placeholders) console.error(`  ${f.path}: "${f.value}" — ${f.reason}`);
  }
  if (deadAnchors.length) {
    console.error(`\n[dead-anchor] ${deadAnchors.length} finding(s):`);
    for (const f of deadAnchors) console.error(`  ${f.path}: #${f.anchor} → no section in config emits this id`);
  }
  if (sectionShape.length) {
    console.error(`\n[section-shape] ${sectionShape.length} finding(s):`);
    for (const f of sectionShape) {
      const variantStr = f.variant ? ` variant=${f.variant}` : "";
      let msg: string;
      switch (f.kind) {
        case "missing":
          msg = `missing required field "${f.field}"`;
          break;
        case "unknown":
          msg = `unknown field "${f.field}" — typo or unregistered key`;
          break;
        case "type":
          msg = `wrong type at "${f.field}"`;
          break;
        case "empty":
          msg = `${f.field}[] must not be empty (variant requires at least one entry)`;
          break;
      }
      console.error(`  sections[${f.index}] type=${f.section}${variantStr}: ${msg}`);
    }
  }

  if (tokenContract.length) {
    const byRule = groupByRule(tokenContract);
    const stream = TOKEN_CONTRACT_MODE === "error" ? console.error : console.warn;
    const tag = TOKEN_CONTRACT_MODE === "error" ? "ERROR" : "WARN";
    stream(`\n[token-contract] ${tokenContract.length} finding(s) (${tag}):`);
    for (const [rule, items] of Object.entries(byRule).sort((a, b) => b[1].length - a[1].length)) {
      stream(`  ${rule}: ${items.length}`);
    }
    // Show first 10 for context; rest are in docs/token-contract-violations-baseline.md
    for (const f of tokenContract.slice(0, 10)) {
      stream(`  ${f.file}:${f.line} — ${f.rule}`);
      stream(`    ${f.match.slice(0, 140)}`);
      stream(`    fix: ${f.fix}`);
    }
    if (tokenContract.length > 10) {
      stream(`  …and ${tokenContract.length - 10} more — see docs/token-contract-violations-baseline.md`);
    }
  }

  const blockerCount = total + (TOKEN_CONTRACT_MODE === "error" ? tokenContract.length : 0);
  if (blockerCount > 0) {
    console.error(`\ncheck-config: ${blockerCount} blocker(s) — fix before deploying`);
    process.exit(1);
  }
  console.log("check-config: OK");
}

main().catch((err) => {
  console.error("check-config: unexpected error", err);
  process.exit(2);
});

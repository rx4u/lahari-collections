import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForPlaceholders } from "../placeholder-scanner";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import { scanForSectionShape } from "../section-shape-scanner";
import config from "./fixtures/ridgeline-shaped";

// Active anchors as derived by check-config.ts: hero (always) + each section.type
const activeAnchors = new Set(["hero", "gallery", "pricing", "services"]);

test("regression: placeholder scanner catches 555 phone and example.com email", () => {
  const f = scanForPlaceholders(config as Record<string, unknown>);
  assert.ok(f.some((x) => /555/.test(x.value)), "555 phone not caught");
  assert.ok(f.some((x) => /example\.com/.test(x.value)), "example.com not caught");
});

test("regression: dead-anchor scanner catches #contact and #how-it-works-timeline (active anchors only)", () => {
  const f = scanForDeadAnchors(config as Record<string, unknown>, activeAnchors);
  assert.ok(f.some((x) => x.anchor === "contact"), "#contact not caught (regression!)");
  assert.ok(f.some((x) => x.anchor === "how-it-works-timeline"), "#how-it-works-timeline not caught (regression!)");
});

test("regression: unified section-shape scanner catches empty services.items", () => {
  // Services base has items: z.array(...).min(1) — too_small Zod issue
  // becomes a kind:"empty" finding in the unified scanner. This replaces
  // the dedicated empty-section-scanner for the Ridgeline failure shape.
  const f = scanForSectionShape(config as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "services" && x.field === "items" && x.kind === "empty"),
    "empty services not caught (regression!)"
  );
});

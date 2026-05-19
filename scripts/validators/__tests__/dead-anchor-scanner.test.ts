import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForDeadAnchors } from "../dead-anchor-scanner";
import dirty from "./fixtures/with-dead-anchors";

test("dead #contact is flagged when no section emits id=contact", () => {
  const known = new Set(["hero", "pricing", "how-it-works"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.ok(findings.some((f) => f.anchor === "contact"));
});

test("misspelled #how-it-works-timeline is flagged", () => {
  const known = new Set(["hero", "pricing", "how-it-works", "contact"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.ok(findings.some((f) => f.anchor === "how-it-works-timeline"));
});

test("external https URLs are not flagged", () => {
  const known = new Set(["hero", "pricing", "how-it-works", "contact"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.equal(findings.filter((f) => f.anchor === "wa.me/123" || f.anchor.startsWith("http")).length, 0);
});

test("internal route paths (/products) are not flagged", () => {
  const known = new Set(["hero", "pricing"]);
  const findings = scanForDeadAnchors(dirty as Record<string, unknown>, known);
  assert.equal(findings.filter((f) => f.anchor === "products").length, 0);
});

test("hex color values like #0d9488 are not flagged as anchors", () => {
  const config = { theme: { accentColor: "#0d9488", primary: "#1a1715" } };
  const findings = scanForDeadAnchors(config, new Set(["hero"]));
  assert.equal(findings.length, 0, `hex colors leaked: ${JSON.stringify(findings)}`);
});

test("anchor with digit prefix is not flagged (must start with letter)", () => {
  const config = { hero: { cta: { url: "#0section" } } };
  const findings = scanForDeadAnchors(config, new Set(["hero"]));
  assert.equal(findings.length, 0);
});

import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForSectionShape } from "../section-shape-scanner";
import dirty from "./fixtures/with-shape-errors";

test("missing required field is flagged", () => {
  const f = scanForSectionShape(dirty as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "services" && x.field === "items" && x.kind === "missing"),
    "expected services.items to be flagged as missing"
  );
});

test("unknown (typo) field is flagged", () => {
  const f = scanForSectionShape(dirty as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "cta" && x.field === "discription" && x.kind === "unknown"),
    "expected cta.discription typo to be flagged as unknown"
  );
});

test("valid section produces no findings", () => {
  const f = scanForSectionShape(dirty as Record<string, unknown>);
  assert.ok(!f.some((x) => x.section === "faq"), "faq with full content should not be flagged");
});

test("unregistered section type is skipped (opt-in registry)", () => {
  const f = scanForSectionShape(dirty as Record<string, unknown>);
  assert.ok(!f.some((x) => x.section === "custom-thing"), "unregistered types are not validated");
});

test("populated config matching shape produces no findings", () => {
  const clean = {
    sections: [
      { type: "services", content: { headline: "x", items: [{ name: "a" }] } },
      { type: "cta", content: { headline: "Book", cta: { label: "Go", href: "#" } } },
    ],
  };
  const f = scanForSectionShape(clean as Record<string, unknown>);
  assert.equal(f.length, 0);
});

test("variant-required field (cta:countdown needs deadline) is flagged when missing", () => {
  const cfg = {
    sections: [
      // base cta has no required fields, but variant "countdown" adds deadline
      { type: "cta", variant: "countdown", content: { headline: "Sale ends" } },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "cta" && x.variant === "countdown" && x.field === "deadline" && x.kind === "missing"),
    "expected cta:countdown deadline to be flagged"
  );
});

test("variant-required field present produces no missing finding", () => {
  const cfg = {
    sections: [
      {
        type: "gallery",
        variant: "before-after",
        content: { images: [{ src: "/a.jpg" }], pairs: [{ before: "/b.jpg", after: "/a.jpg" }] },
      },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    !f.some((x) => x.kind === "missing"),
    "expected no missing-field findings when both base + variant required keys are present"
  );
});

test("non-variant sections still validated via base shape", () => {
  const cfg = {
    sections: [
      // emergency requires phone (no variants)
      { type: "emergency", content: { headline: "Call us" } },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(f.some((x) => x.section === "emergency" && x.field === "phone" && x.kind === "missing"));
});

// --- Scope-lift + empty-merge coverage ---

test("required array .min(1) violation produces kind=empty finding", () => {
  const cfg = {
    sections: [
      { type: "services", content: { headline: "x", items: [] } },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "services" && x.field === "items" && x.kind === "empty"),
    "empty items[] should produce kind=empty finding"
  );
});

test("variant-aware empty check: testimonials:carousel requires items but featured-quote does not", () => {
  const cfg = {
    sections: [
      // carousel: items required non-empty
      { type: "testimonials", variant: "carousel", content: { headline: "x", items: [] } },
      // featured-quote: items optional, featured is the load-bearing key
      {
        type: "testimonials",
        variant: "featured-quote",
        content: { featured: { quote: "Great service." } },
      },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    f.some((x) => x.section === "testimonials" && x.variant === "carousel" && x.kind === "empty"),
    "testimonials:carousel empty items should be flagged"
  );
  assert.ok(
    !f.some((x) => x.section === "testimonials" && x.variant === "featured-quote"),
    "testimonials:featured-quote without items should not be flagged"
  );
});

test("nested missing required field is flagged with dotted path", () => {
  const cfg = {
    sections: [
      // pricing:toggle-monthly-annual requires monthlyPrice + annualPrice per plan
      {
        type: "pricing",
        variant: "toggle-monthly-annual",
        content: { plans: [{ name: "Pro" }] },
      },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    f.some(
      (x) =>
        x.section === "pricing" &&
        x.variant === "toggle-monthly-annual" &&
        x.field === "plans.0.monthlyPrice" &&
        x.kind === "missing"
    ),
    "nested missing monthlyPrice should be flagged with dotted path"
  );
  assert.ok(
    f.some(
      (x) =>
        x.section === "pricing" &&
        x.variant === "toggle-monthly-annual" &&
        x.field === "plans.0.annualPrice" &&
        x.kind === "missing"
    ),
    "nested missing annualPrice should be flagged with dotted path"
  );
});

test("nested unknown key inside item is NOT surfaced as separate unknown finding", () => {
  // Per scanner contract: unknown_keys is reported only at top-level (path.length===0).
  // Nested strict() violations show up via missing/type findings for the real problem.
  const cfg = {
    sections: [
      {
        type: "pricing",
        variant: "cards",
        content: { plans: [{ name: "x", invalidKey: "y" }] },
      },
    ],
  };
  const f = scanForSectionShape(cfg as Record<string, unknown>);
  assert.ok(
    !f.some((x) => x.kind === "unknown" && x.field.includes("invalidKey")),
    "nested unknown keys should not produce separate unknown findings"
  );
});

import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import os from "os";
import path from "path";
import {
  scanContentForRules,
  scanForTokenContractViolations,
  findDarkBlockRanges,
  loadAllowlist,
  RULES,
} from "../token-contract-scanner";

test("clean file: zero findings", () => {
  const clean = `
    export function Foo() {
      return <div style={{ color: "var(--color-primary)", backgroundColor: "var(--color-neutral)" }}>hi</div>;
    }
  `;
  const f = scanContentForRules("src/components/Foo.tsx", clean);
  assert.equal(f.length, 0);
});

test("no-primary-as-bg: inline style backgroundColor flagged", () => {
  const dirty = `<footer style={{ backgroundColor: "var(--color-primary)" }} />`;
  const f = scanContentForRules("src/components/Footer.tsx", dirty);
  assert.ok(f.some((x) => x.rule === "no-primary-as-bg"));
});

test("no-primary-as-bg: CSS background shorthand flagged", () => {
  const dirty = `.foo { background: var(--color-primary); }`;
  const f = scanContentForRules("src/app/x.css", dirty);
  assert.ok(f.some((x) => x.rule === "no-primary-as-bg"));
});

test("no-primary-as-bg: Tailwind bg-[var(--color-primary)] flagged", () => {
  const dirty = `<div className="bg-[var(--color-primary)] text-white" />`;
  const f = scanContentForRules("src/components/X.tsx", dirty);
  assert.ok(f.some((x) => x.rule === "no-primary-as-bg"));
});

test("no-neutral-as-color: color: var(--color-neutral) flagged (Ridgeline)", () => {
  const dirty = `<p style={{ color: "var(--color-neutral)" }} />`;
  const f = scanContentForRules("src/components/X.tsx", dirty);
  assert.ok(f.some((x) => x.rule === "no-neutral-as-color"));
});

test("no-neutral-as-color: does NOT flag background-color: var(--color-neutral)", () => {
  const ok = `<div style={{ backgroundColor: "var(--color-neutral)" }} />`;
  const f = scanContentForRules("src/components/X.tsx", ok);
  assert.equal(f.filter((x) => x.rule === "no-neutral-as-color").length, 0);
});

test("no-surface-as-color: color: var(--color-surface) flagged", () => {
  const dirty = `<p style={{ color: "var(--color-surface)" }} />`;
  const f = scanContentForRules("src/components/X.tsx", dirty);
  assert.ok(f.some((x) => x.rule === "no-surface-as-color"));
});

test("no-secondary-as-bg: background-color: var(--color-secondary) flagged", () => {
  const dirty = `.foo { background-color: var(--color-secondary); }`;
  const f = scanContentForRules("src/app/x.css", dirty);
  assert.ok(f.some((x) => x.rule === "no-secondary-as-bg"));
});

test("findDarkBlockRanges: returns the inside of .dark { ... }", () => {
  const css = `:root { --x: 1; }\n.dark {\n  --y: 2;\n  --z: 3;\n}\n`;
  const ranges = findDarkBlockRanges(css);
  assert.equal(ranges.length, 1);
  const [s, e] = ranges[0];
  const inside = css.slice(s, e);
  assert.ok(inside.includes("--y: 2"));
});

test("findDarkBlockRanges: CSS comments containing `.dark {` do NOT produce phantom ranges", () => {
  // A comment like /* .dark { old */ would have created a phantom range
  // and any code after it could have been incorrectly classified as dark-scoped.
  const css = `/* old: .dark { stale } */\n:root { --x: 1; }\n.dark {\n  --y: 2;\n}\n`;
  const ranges = findDarkBlockRanges(css);
  assert.equal(ranges.length, 1, "only the real .dark block should be counted");
  const inside = css.slice(...ranges[0]);
  assert.ok(inside.includes("--y: 2"));
  assert.ok(!inside.includes("stale"));
});

test("findDarkBlockRanges: unbalanced braces inside CSS comments don't extend real range", () => {
  // Unbalanced `{` inside a comment used to throw off brace counting,
  // extending the .dark range past its real closing `}`.
  const css = `.dark {\n  /* opening { only */\n  --y: 2;\n}\n.other { --z: 99; }\n`;
  const ranges = findDarkBlockRanges(css);
  assert.equal(ranges.length, 1);
  const inside = css.slice(...ranges[0]);
  assert.ok(inside.includes("--y: 2"));
  assert.ok(!inside.includes("--z: 99"), ".other rule must NOT be inside the .dark range");
});

test("no-on-primary-in-dark-block: Bug B is caught", () => {
  // Mimics the literal pattern in globals.css
  const css = `:root { --muted-foreground: ok; }\n.dark {\n  --muted-foreground: color-mix(in oklch, var(--color-on-primary) 70%, var(--color-neutral));\n}\n`;
  const f = scanContentForRules("src/app/globals.css", css);
  assert.ok(
    f.some((x) => x.rule === "no-on-primary-in-dark-block"),
    "Bug B (on-primary in .dark muted formula) was not flagged",
  );
});

test("no-on-primary-in-dark-block: same pattern OUTSIDE .dark is NOT flagged", () => {
  const css = `:root {\n  --muted-foreground: color-mix(in oklch, var(--color-on-primary) 70%, var(--color-neutral));\n}\n`;
  const f = scanContentForRules("src/app/globals.css", css);
  assert.equal(
    f.filter((x) => x.rule === "no-on-primary-in-dark-block").length,
    0,
    "scope=dark-block must not flag matches outside .dark",
  );
});

test("no-color-primary-override-in-dark: catches bridge contract violation", () => {
  const css = `.dark { --color-primary: oklch(0.95 0 0); }`;
  const f = scanContentForRules("src/app/globals.css", css);
  assert.ok(f.some((x) => x.rule === "no-color-primary-override-in-dark"));
});

test("no-color-neutral-override-in-dark: catches bridge contract violation", () => {
  const css = `.dark {\n  --color-neutral: oklch(0.13 0 0);\n}`;
  const f = scanContentForRules("src/app/globals.css", css);
  assert.ok(f.some((x) => x.rule === "no-color-neutral-override-in-dark"));
});

test("Bug A regression: FooterEditorialDark-shaped fixture flags no-primary-as-bg", () => {
  const footer = `
    export function FooterEditorialDark({ footer }: { footer?: { bgColor?: string } }) {
      return (
        <footer
          style={{ backgroundColor: footer?.bgColor ?? "var(--color-primary)" }}
          className="text-[var(--color-on-forced-dark)]"
        />
      );
    }
  `;
  const f = scanContentForRules("src/components/layout/Footer/FooterEditorialDark.tsx", footer);
  assert.ok(
    f.some((x) => x.rule === "no-primary-as-bg"),
    "Bug A (footer using --color-primary as bg) was not flagged",
  );
});

test("allowlist suppresses flagged finding", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tcs-"));
  try {
    // Stage a fake repo root with one offending file + an allowlist entry for it.
    fs.mkdirSync(path.join(tmp, "src/components/Foo"), { recursive: true });
    fs.mkdirSync(path.join(tmp, "scripts/validators"), { recursive: true });
    const offending = `<div style={{ backgroundColor: "var(--color-primary)" }} />\n`;
    fs.writeFileSync(path.join(tmp, "src/components/Foo/Bar.tsx"), offending);
    fs.writeFileSync(
      path.join(tmp, "scripts/validators/token-contract-allowlist.json"),
      JSON.stringify({
        entries: [{ file: "src/components/Foo/Bar.tsx", line: 1, rule: "no-primary-as-bg" }],
      }),
    );
    const findings = scanForTokenContractViolations(tmp);
    assert.equal(
      findings.filter((x) => x.rule === "no-primary-as-bg").length,
      0,
      "allowlist entry should suppress the finding",
    );
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("loadAllowlist: returns empty set when file missing", () => {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "tcs-"));
  try {
    const set = loadAllowlist(tmp);
    assert.equal(set.size, 0);
  } finally {
    fs.rmSync(tmp, { recursive: true, force: true });
  }
});

test("RULES: every rule has id, pattern, fix, appliesTo", () => {
  for (const r of RULES) {
    assert.ok(r.id);
    assert.ok(r.pattern instanceof RegExp);
    assert.ok(r.pattern.flags.includes("g"), `rule ${r.id} pattern must be /g`);
    assert.ok(r.fix);
    assert.ok(r.appliesTo instanceof RegExp);
  }
});

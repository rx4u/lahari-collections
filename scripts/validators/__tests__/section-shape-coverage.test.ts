import { test } from "node:test";
import assert from "node:assert/strict";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { SECTION_SCHEMAS } from "../../../src/components/sections/schemas-registry";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "../../..");

/**
 * Drift guard: every key in src/lib/section-renderer.tsx's SECTION_MAP must
 * have an entry in src/components/sections/schemas-registry.ts. If a
 * developer adds a new section to the renderer without registering its
 * schema, this test fails — preventing the validator from silently
 * skipping a new section type.
 *
 * We parse the renderer source by regex rather than importing it, because
 * section-renderer.tsx imports React components that the test runner
 * shouldn't try to evaluate.
 */
test("every SECTION_MAP key has a registered schema", () => {
  const src = fs.readFileSync(path.join(repoRoot, "src/lib/section-renderer.tsx"), "utf-8");
  const mapMatch = src.match(/SECTION_MAP[^=]*=\s*\{([\s\S]*?)\n\};/);
  assert.ok(mapMatch, "could not locate SECTION_MAP literal in section-renderer.tsx");
  const body = mapMatch[1];
  const keys: string[] = [];
  const keyRegex = /^\s*(?:"([a-z][a-z0-9-]*)"|([a-z][a-zA-Z0-9]*))\s*:/gm;
  let m: RegExpExecArray | null;
  while ((m = keyRegex.exec(body)) !== null) {
    keys.push(m[1] ?? m[2]);
  }
  assert.ok(keys.length > 0, "parsed zero keys from SECTION_MAP");

  const missing = keys.filter((k) => !SECTION_SCHEMAS[k]);
  assert.deepEqual(
    missing,
    [],
    `SECTION_MAP has ${missing.length} key(s) with no entry in schemas-registry.ts: ${missing.join(", ")}`
  );
});

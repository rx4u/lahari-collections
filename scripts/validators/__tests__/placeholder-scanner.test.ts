import { test } from "node:test";
import assert from "node:assert/strict";
import { scanForPlaceholders } from "../placeholder-scanner";
import clean from "./fixtures/clean";
import dirty from "./fixtures/with-placeholders";

test("clean config: zero findings", () => {
  assert.equal(scanForPlaceholders(clean as Record<string, unknown>).length, 0);
});

test("555 phone is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /555/.test(x.value)), "555 not caught");
});

test("@example.com email is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /example\.com/.test(x.value)), "example.com not caught");
});

test("lorem ipsum is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => /lorem ipsum/i.test(x.value)), "lorem ipsum not caught");
});

test("__PLACEHOLDER__ sentinel is flagged", () => {
  const f = scanForPlaceholders(dirty as Record<string, unknown>);
  assert.ok(f.some((x) => x.value.includes("__PLACEHOLDER__")), "sentinel not caught");
});

test("real names like Anita Sharma are NOT flagged", () => {
  const f = scanForPlaceholders(clean as Record<string, unknown>);
  assert.equal(f.filter((x) => /Anita/.test(x.value)).length, 0);
});

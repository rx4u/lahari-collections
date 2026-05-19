#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const configPath = path.resolve(__dirname, "../site.config.ts");
const publicDir = path.resolve(__dirname, "../public");

if (!fs.existsSync(configPath)) {
  console.error("site.config.ts not found at", configPath);
  process.exit(1);
}

const configText = fs.readFileSync(configPath, "utf8");
const lines = configText.split("\n");

const imagePaths = [];

lines.forEach((line, index) => {
  const matches = line.matchAll(/["'`]((?:\.\/|\/)?images\/[^"'`\s]+)["'`]/g);
  for (const match of matches) {
    const rawPath = match[1];
    const normalised = rawPath.startsWith("/") ? rawPath : "/" + rawPath;
    imagePaths.push({ path: normalised, line: index + 1, raw: rawPath });
  }
});

if (imagePaths.length === 0) {
  console.log("No image paths found in site.config.ts");
  process.exit(0);
}

let missing = 0;

for (const entry of imagePaths) {
  const fsPath = path.join(publicDir, entry.path);
  if (!fs.existsSync(fsPath)) {
    console.error(
      `MISSING  site.config.ts:${entry.line}  ${entry.raw}  =>  ${fsPath}`
    );
    missing++;
  }
}

if (missing === 0) {
  console.log(`All ${imagePaths.length} image path(s) validated OK.`);
  process.exit(0);
} else {
  console.error(`\n${missing} missing image(s) found.`);
  process.exit(1);
}

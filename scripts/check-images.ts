import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const configPath = path.resolve(__dirname, "../site.config.ts");
const publicDir = path.resolve(__dirname, "../public");

if (!fs.existsSync(configPath)) {
  console.error("site.config.ts not found");
  process.exit(1);
}

const configText = fs.readFileSync(configPath, "utf8");
const lines = configText.split("\n");

const imagePaths: Array<{ path: string; line: number; raw: string }> = [];

lines.forEach((line, index) => {
  const matches = line.matchAll(/["'`]((?:\.\/|\/)?images\/[^"'`\s]+)["'`]/g);
  for (const match of matches) {
    const raw = match[1];
    const normalized = raw.startsWith("/") ? raw : `/${raw}`;
    imagePaths.push({ path: normalized, line: index + 1, raw });
  }
});

if (imagePaths.length === 0) {
  console.log("check-images: no image paths found in site.config.ts");
  process.exit(0);
}

let missing = 0;

for (const entry of imagePaths) {
  const fsPath = path.join(publicDir, entry.path);
  if (!fs.existsSync(fsPath)) {
    console.error(`MISSING  site.config.ts:${entry.line}  ${entry.raw}`);
    missing++;
  }
}

if (missing === 0) {
  console.log(`check-images: all ${imagePaths.length} image(s) OK`);
} else {
  console.error(`\ncheck-images: ${missing} missing image(s) — add files or update paths before deploying`);
  process.exit(1);
}

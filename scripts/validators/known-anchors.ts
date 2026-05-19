import fs from "fs";
import path from "path";

export function collectKnownAnchors(sectionsDir: string): Set<string> {
  const anchors = new Set<string>();
  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) walkDir(full);
      else if (entry.name.endsWith(".tsx")) {
        const text = fs.readFileSync(full, "utf8");
        for (const m of text.matchAll(/id=["']([a-z][a-z0-9-]*)["']/gi)) {
          anchors.add(m[1].toLowerCase());
        }
      }
    }
  }
  walkDir(sectionsDir);
  return anchors;
}

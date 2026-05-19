import path from "path";
import { remix, type RemixMode } from "../src/lib/remix";

// Dynamically import to avoid bundling issues
async function main() {
  const arg = process.argv[2] ?? "all";
  const validModes = ["theme", "hero", "sections", "all"];

  if (!validModes.includes(arg)) {
    console.error(`Usage: pnpm remix [theme|hero|sections|all]`);
    console.error(`  Got: "${arg}"`);
    process.exit(1);
  }

  const mode = arg as RemixMode;
  const configPath = path.join(process.cwd(), "site.config.ts");

  // Read business type from config
  const fs = await import("fs");
  const raw = fs.readFileSync(configPath, "utf-8");
  const businessType = raw.match(/type:\s*"(\w+)"/)?.[1] ?? "local";

  // Load remix meta
  const { getRemixMeta } = await import("../presets/index");
  const meta = getRemixMeta(businessType);

  if (!meta) {
    console.error(`No remix metadata for business type: ${businessType}`);
    console.error(`Available types with remix support: doctor, restaurant, salon, local`);
    process.exit(1);
  }

  console.log(`Remixing ${mode} for ${businessType}...`);
  const result = remix(mode, configPath, meta);

  if (Object.keys(result.changes).length === 0) {
    console.log("No changes made (already at end of rotation, will wrap on next run).");
    return;
  }

  console.log("\nChanges:");
  for (const [key, { from, to }] of Object.entries(result.changes)) {
    console.log(`  ${key}: ${from} → ${to}`);
  }

  console.log("\nRun 'pnpm build' to rebuild, then 'vercel --prod' to deploy.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

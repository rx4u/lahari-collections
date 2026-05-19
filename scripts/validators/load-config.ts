import path from "path";
import { pathToFileURL } from "url";

export type ResolvedConfig = Record<string, unknown>;

export async function loadSiteConfig(repoRoot: string): Promise<ResolvedConfig> {
  const configPath = path.resolve(repoRoot, "site.config.ts");
  const url = pathToFileURL(configPath).href;
  const mod = (await import(url)) as { default?: ResolvedConfig };
  if (!mod.default) throw new Error(`site.config.ts at ${configPath} has no default export`);
  return mod.default;
}

export function* walk(node: unknown, pathArr: Array<string | number> = []): Generator<{ path: string; value: unknown }> {
  if (node === null || node === undefined) return;
  if (typeof node === "string" || typeof node === "number" || typeof node === "boolean") {
    yield { path: pathArr.join("."), value: node };
    return;
  }
  if (Array.isArray(node)) {
    for (let i = 0; i < node.length; i++) yield* walk(node[i], [...pathArr, i]);
    return;
  }
  if (typeof node === "object") {
    for (const [k, v] of Object.entries(node as Record<string, unknown>)) {
      yield* walk(v, [...pathArr, k]);
    }
  }
}

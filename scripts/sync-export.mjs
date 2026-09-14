import { cp, mkdir, readdir, rm } from "node:fs/promises";
import { join } from "node:path";

const projectRoot = new URL("../", import.meta.url);
const exportRoot = new URL("../out/", import.meta.url);
const retained = new Set([".git", ".github", ".gitignore", "app", "components", "data", "lib", "node_modules", "out", "public", "scripts", "tests"]);

for (const entry of await readdir(projectRoot, { withFileTypes: true })) {
  if (retained.has(entry.name)) continue;
  if (entry.name.startsWith(".") && entry.name !== ".nojekyll") continue;
  if (["package.json", "package-lock.json", "next.config.ts", "tsconfig.json", "eslint.config.mjs", "vitest.config.ts", "README.md", "ARCHITECTURE.md", "LICENSE"].includes(entry.name)) continue;
  await rm(join(projectRoot.pathname, entry.name), { recursive: true, force: true });
}

await mkdir(projectRoot, { recursive: true });
await cp(exportRoot, projectRoot, { recursive: true, force: true });
console.log("Static export synchronized to the repository root for branch-based GitHub Pages hosting.");

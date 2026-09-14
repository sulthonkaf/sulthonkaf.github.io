import { rm } from "node:fs/promises";

const generatedDirectories = [
  new URL("../.next/", import.meta.url),
  new URL("../out/", import.meta.url),
];

for (const directory of generatedDirectories) {
  await rm(directory, { recursive: true, force: true });
}

console.log("Removed local Next.js build directories.");

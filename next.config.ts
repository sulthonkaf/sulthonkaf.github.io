import type { NextConfig } from "next";
import { createHash } from "node:crypto";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function fingerprint(paths: string[]) {
  const hash = createHash("sha256");
  const visit = (path: string) => {
    if (statSync(path).isDirectory()) {
      for (const entry of readdirSync(path).sort()) visit(join(path, entry));
      return;
    }
    hash.update(path);
    hash.update(readFileSync(path));
  };
  paths.forEach(visit);
  return hash.digest("hex").slice(0, 20);
}

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "avatars.githubusercontent.com" }],
  },
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  generateBuildId: async () => fingerprint(["app", "components", "data", "lib", "public", "package-lock.json"]),
};

export default nextConfig;

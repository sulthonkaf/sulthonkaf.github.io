import { access, readFile } from "node:fs/promises";
import { JSDOM } from "jsdom";

const exportRoot = new URL("../out/", import.meta.url);
const errors = [];
const assert = (condition, message) => { if (!condition) errors.push(message); };

const html = await readFile(new URL("index.html", exportRoot), "utf8");
const { document } = new JSDOM(html).window;

assert(document.documentElement.lang === "en", "The document language must be English.");
assert(document.querySelectorAll("h1").length === 1, "The home page must have exactly one h1.");
assert(Boolean(document.querySelector("header nav")), "Primary navigation is missing.");
assert(Boolean(document.querySelector("main")), "The main landmark is missing.");
assert(Boolean(document.querySelector("footer")), "The footer landmark is missing.");
assert(Boolean(document.querySelector('link[rel="canonical"][href="https://sulthonkaf.github.io/"]')), "Canonical URL is missing or incorrect.");
assert(Boolean(document.querySelector('meta[property="og:image:alt"]')), "Open Graph image alt text is missing.");
assert(Boolean(document.querySelector('script[type="application/ld+json"]')), "Person structured data is missing.");
assert(!html.includes('style="opacity:0'), "Static content must not be hidden before JavaScript runs.");

const ids = new Set([...document.querySelectorAll("[id]")].map((node) => node.id));
for (const link of document.querySelectorAll('a[href^="#"]')) {
  const target = link.getAttribute("href")?.slice(1);
  assert(!target || ids.has(target), `Missing fragment target: #${target}`);
}

for (const image of document.querySelectorAll("img")) {
  assert(image.hasAttribute("alt"), `Image is missing alt text: ${image.getAttribute("src")}`);
  assert(image.hasAttribute("width") && image.hasAttribute("height"), `Image dimensions are missing: ${image.getAttribute("src")}`);
}

for (const link of document.querySelectorAll('a[target="_blank"]')) {
  assert((link.getAttribute("rel") ?? "").split(/\s+/).includes("noreferrer"), `External link is missing noreferrer: ${link.getAttribute("href")}`);
}

for (const element of document.querySelectorAll("[href], [src]")) {
  const reference = element.getAttribute("href") ?? element.getAttribute("src");
  if (!reference || reference.startsWith("#") || /^(https?:|mailto:|tel:|data:)/.test(reference)) continue;
  const relativePath = reference.replace(/^\//, "").split("?")[0];
  try {
    await access(new URL(relativePath, exportRoot));
  } catch {
    errors.push(`Missing exported asset: ${reference}`);
  }
}

const notFoundHtml = await readFile(new URL("404.html", exportRoot), "utf8");
const notFoundDocument = new JSDOM(notFoundHtml).window.document;
assert(notFoundDocument.querySelectorAll("h1").length === 1, "The 404 page must have exactly one h1.");
assert((notFoundDocument.querySelector('meta[name="robots"]')?.getAttribute("content") ?? "").includes("noindex"), "The 404 page must be noindex.");

if (errors.length) {
  console.error("Static export validation failed:");
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Static export validation passed: ${ids.size} IDs, ${document.querySelectorAll("a").length} links, ${document.querySelectorAll("img").length} images, metadata, structured data, assets, and 404.`);

#!/usr/bin/env python3
"""Dependency-free structural checks for the static portfolio."""

from html.parser import HTMLParser
from pathlib import Path
import json
import sys
import xml.etree.ElementTree as ET


ROOT = Path(__file__).resolve().parents[1]


class SiteParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.ids: set[str] = set()
        self.duplicate_ids: set[str] = set()
        self.fragment_links: list[str] = []
        self.local_assets: list[str] = []
        self.images: list[dict[str, str | None]] = []
        self.blank_links: list[dict[str, str | None]] = []
        self.landmarks: set[str] = set()
        self.h1_count = 0
        self.html_lang: str | None = None
        self.titles: list[str] = []
        self.meta_names: dict[str, str | None] = {}
        self.meta_properties: dict[str, str | None] = {}
        self.canonical_urls: list[str | None] = []
        self.json_ld_blocks: list[str] = []
        self._capture_title = False
        self._capture_json_ld = False
        self._buffer: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        if tag == "html":
            self.html_lang = attributes.get("lang")
        element_id = attributes.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.add(element_id)
            self.ids.add(element_id)

        if tag == "h1":
            self.h1_count += 1
        if tag == "title":
            self._capture_title = True
            self._buffer = []
        if tag == "script" and attributes.get("type") == "application/ld+json":
            self._capture_json_ld = True
            self._buffer = []
        if tag == "meta" and attributes.get("name"):
            self.meta_names[attributes["name"]] = attributes.get("content")
        if tag == "meta" and attributes.get("property"):
            self.meta_properties[attributes["property"]] = attributes.get("content")
        if tag == "link" and "canonical" in (attributes.get("rel") or "").split():
            self.canonical_urls.append(attributes.get("href"))
        if tag in {"main", "header", "footer", "nav"}:
            self.landmarks.add(tag)
        if tag == "img":
            self.images.append(attributes)
        if tag == "a" and attributes.get("target") == "_blank":
            self.blank_links.append(attributes)

        for attribute in ("href", "src"):
            value = attributes.get(attribute)
            if not value:
                continue
            if value.startswith("#"):
                self.fragment_links.append(value[1:])
            elif not value.startswith(("http://", "https://", "data:", "mailto:", "tel:")):
                local_path = value.split("?", 1)[0]
                if local_path != "/":
                    self.local_assets.append(local_path)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title" and self._capture_title:
            self.titles.append("".join(self._buffer).strip())
            self._capture_title = False
            self._buffer = []
        if tag == "script" and self._capture_json_ld:
            self.json_ld_blocks.append("".join(self._buffer).strip())
            self._capture_json_ld = False
            self._buffer = []

    def handle_data(self, data: str) -> None:
        if self._capture_title or self._capture_json_ld:
            self._buffer.append(data)


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    parser = SiteParser()
    parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))

    if parser.html_lang != "en":
        fail(f"Expected html lang='en'; found {parser.html_lang!r}.", errors)
    if len(parser.titles) != 1 or not parser.titles[0]:
        fail(f"Expected one non-empty title; found {parser.titles}.", errors)
    if parser.h1_count != 1:
        fail(f"Expected exactly one h1; found {parser.h1_count}.", errors)
    if parser.duplicate_ids:
        fail(f"Duplicate IDs: {sorted(parser.duplicate_ids)}", errors)

    missing_fragments = sorted({fragment for fragment in parser.fragment_links if fragment and fragment not in parser.ids})
    if missing_fragments:
        fail(f"Missing fragment targets: {missing_fragments}", errors)

    missing_landmarks = {"main", "header", "footer", "nav"} - parser.landmarks
    if missing_landmarks:
        fail(f"Missing landmarks: {sorted(missing_landmarks)}", errors)

    for meta_name in ("viewport", "description", "robots", "theme-color", "twitter:card"):
        if not parser.meta_names.get(meta_name):
            fail(f"Missing or empty meta name: {meta_name}", errors)

    for property_name in ("og:type", "og:url", "og:title", "og:description", "og:image", "og:image:alt"):
        if not parser.meta_properties.get(property_name):
            fail(f"Missing or empty Open Graph property: {property_name}", errors)

    if parser.canonical_urls != ["https://sulthonkaf.github.io/"]:
        fail(f"Unexpected canonical URL: {parser.canonical_urls}", errors)

    if len(parser.json_ld_blocks) != 1:
        fail(f"Expected one JSON-LD block; found {len(parser.json_ld_blocks)}.", errors)
    else:
        try:
            structured_data = json.loads(parser.json_ld_blocks[0])
            if structured_data.get("@type") != "Person":
                fail("JSON-LD root type must be Person.", errors)
        except json.JSONDecodeError as exc:
            fail(f"Invalid JSON-LD: {exc}", errors)

    for image in parser.images:
        missing = {name for name in ("alt", "width", "height") if name not in image}
        if missing:
            fail(f"Image is missing attributes {sorted(missing)}: {image.get('src')}", errors)

    for link in parser.blank_links:
        rel = set((link.get("rel") or "").split())
        if "noreferrer" not in rel:
            fail(f"External blank-target link is missing noreferrer: {link.get('href')}", errors)

    for asset in sorted(set(parser.local_assets)):
        path = ROOT / asset.lstrip("/")
        if not path.exists():
            fail(f"Referenced local asset does not exist: {asset}", errors)

    try:
        manifest = json.loads((ROOT / "site.webmanifest").read_text(encoding="utf-8"))
        if manifest.get("theme_color") != parser.meta_names.get("theme-color"):
            fail("Manifest and HTML theme colors do not match.", errors)
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"Invalid web manifest: {exc}", errors)

    try:
        ET.parse(ROOT / "sitemap.xml")
    except (OSError, ET.ParseError) as exc:
        fail(f"Invalid sitemap: {exc}", errors)

    not_found_parser = SiteParser()
    not_found_parser.feed((ROOT / "404.html").read_text(encoding="utf-8"))
    if not_found_parser.h1_count != 1 or "main" not in not_found_parser.landmarks:
        fail("404 page must contain one h1 and a main landmark.", errors)
    if "noindex" not in (not_found_parser.meta_names.get("robots") or ""):
        fail("404 page must use a noindex robots directive.", errors)

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap: https://sulthonkaf.github.io/sitemap.xml" not in robots:
        fail("robots.txt must advertise the production sitemap.", errors)

    if errors:
        print("Portfolio validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"Portfolio validation passed: {len(parser.ids)} IDs, "
        f"{len(parser.fragment_links)} internal links, {len(parser.local_assets)} local references, "
        "metadata, structured data, manifest, sitemap, robots, and 404 checks."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

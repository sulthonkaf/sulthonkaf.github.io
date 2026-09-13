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

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        element_id = attributes.get("id")
        if element_id:
            if element_id in self.ids:
                self.duplicate_ids.add(element_id)
            self.ids.add(element_id)

        if tag == "h1":
            self.h1_count += 1
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
                self.local_assets.append(value.split("?", 1)[0])


def fail(message: str, errors: list[str]) -> None:
    errors.append(message)


def main() -> int:
    errors: list[str] = []
    parser = SiteParser()
    parser.feed((ROOT / "index.html").read_text(encoding="utf-8"))

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
        json.loads((ROOT / "site.webmanifest").read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        fail(f"Invalid web manifest: {exc}", errors)

    try:
        ET.parse(ROOT / "sitemap.xml")
    except (OSError, ET.ParseError) as exc:
        fail(f"Invalid sitemap: {exc}", errors)

    if errors:
        print("Portfolio validation failed:", file=sys.stderr)
        for error in errors:
            print(f"- {error}", file=sys.stderr)
        return 1

    print(
        f"Portfolio validation passed: {len(parser.ids)} IDs, "
        f"{len(parser.fragment_links)} internal links, and {len(parser.local_assets)} local references."
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

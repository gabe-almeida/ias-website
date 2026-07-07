#!/usr/bin/env python3
"""Render the price-list PDF to a WebP image for the inline lightbox.

WHY: the "View Full Price List" button opens this in an inline lightbox as an
image (universal browser/mobile rendering, zero JS deps) instead of a new tab.
The text-searchable PDF stays as a "Download" fallback inside the lightbox.

WHEN TO RUN: whenever public/assets/ias-price-list.pdf is updated, so the image
does not silently go stale. Run via `npm run regen:pricelist` (or directly).

HOW: pymupdf (fitz) renders page 1 at 3x zoom -> PNG -> Pillow saves WebP(q92).
"""
import sys
from pathlib import Path
import fitz  # pymupdf
from PIL import Image
import io

ROOT = Path(__file__).resolve().parent.parent
PDF = ROOT / "public" / "assets" / "ias-price-list.pdf"
OUT = ROOT / "public" / "assets" / "ias-price-list.webp"
ZOOM = 3.0  # 792pt page -> ~2376px wide; legible for dense tabular text
QUALITY = 92


def main() -> int:
    if not PDF.exists():
        print(f"ERROR: {PDF} not found", file=sys.stderr)
        return 1
    doc = fitz.open(PDF)
    page = doc[0]
    pix = page.get_pixmap(matrix=fitz.Matrix(ZOOM, ZOOM), alpha=False)
    png = io.BytesIO(pix.tobytes("png"))
    img = Image.open(png)
    img.save(OUT, "WEBP", quality=QUALITY, method=6)
    print(f"OK: {OUT.relative_to(ROOT)}  {img.width}x{img.height}  ({OUT.stat().st_size // 1024} KB)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

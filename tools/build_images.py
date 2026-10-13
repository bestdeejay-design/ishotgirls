#!/usr/bin/env python3
"""
ISHOT — image pipeline.

Takes the raw renders (PNG masters) and produces the exact web assets the site
expects: cover-cropped, resized, WebP q=80 (progressive-ish, method=6) plus the
composed Open Graph card.

Usage:
    python3 tools/build_images.py [SRC_DIR]

SRC_DIR defaults to ./raw (both `raw/` and `/tmp/raw` are common). The output
always lands in ./img.

Naming contract with the site:
    hero-main.webp     hero portrait panel      4:5   900x1125
    hero-inset.webp    hero detail (square)     1:1   520x520
    roster-NN-*.webp   roster cards             3:4   720x960
    column-train.webp  column wide              16:10 800x500
    column-fuel.webp   column wide              16:10 800x500
    column-recover.webp column wide             16:10 800x500
    feature-wide.webp  full-bleed band          21:9  1400x600
    og-image.png       social card              2:1   1280x640
"""
from __future__ import annotations

import sys
import tempfile
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "img"

# name -> (source stem, aspect (w, h), target (w, h), gravity)
MANIFEST: dict[str, tuple[str, tuple[int, int], tuple[int, int], str]] = {
    "hero-main": ("hero-main", (4, 5), (900, 1125), "center"),
    "hero-inset": ("hero-inset", (1, 1), (520, 520), "center"),
    "roster-01-anna": ("roster-01-anna", (3, 4), (720, 960), "top"),
    "roster-02-maria": ("roster-02-maria", (3, 4), (720, 960), "top"),
    "roster-03-sofia": ("roster-03-sofia", (3, 4), (720, 960), "top"),
    "roster-04-olivia": ("roster-04-olivia", (3, 4), (720, 960), "top"),
    "roster-05-emma": ("roster-05-emma", (3, 4), (720, 960), "top"),
    "roster-06-lily": ("roster-06-lily", (3, 4), (720, 960), "top"),
    "roster-07-nadia": ("roster-07-nadia", (3, 4), (720, 960), "top"),
    "roster-08-yuki": ("roster-08-yuki", (3, 4), (720, 960), "top"),
    "roster-09-clara": ("roster-09-clara", (3, 4), (720, 960), "top"),
    "column-train": ("column-train", (16, 10), (800, 500), "center"),
    "column-fuel": ("column-fuel", (16, 10), (800, 500), "center"),
    "column-recover": ("column-recover", (16, 10), (800, 500), "center"),
    "feature-wide": ("feature-wide", (21, 9), (1400, 600), "center"),
}


def cover_crop(im: Image.Image, aspect: tuple[int, int], gravity: str) -> Image.Image:
    """Center/aspect crop without distortion."""
    aw, ah = aspect
    target_ratio = aw / ah
    w, h = im.size
    ratio = w / h
    if ratio > target_ratio:  # too wide -> crop sides
        new_w = int(round(h * target_ratio))
        if gravity in ("left", "top-left"):
            box = (0, 0, new_w, h)
        elif gravity in ("right", "top-right"):
            box = (w - new_w, 0, w, h)
        else:
            x = (w - new_w) // 2
            box = (x, 0, x + new_w, h)
    else:  # too tall -> crop top/bottom
        new_h = int(round(w / target_ratio))
        if gravity == "top":
            box = (0, 0, w, new_h)
        elif gravity == "bottom":
            box = (0, h - new_h, w, h)
        else:
            y = (h - new_h) // 2
            box = (0, y, w, y + new_h)
    return im.crop(box)


def build(src: Path) -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    made: list[str] = []
    missing: list[str] = []

    for name, (stem, aspect, target, gravity) in MANIFEST.items():
        cand = [src / f"{stem}.png", src / f"{stem}.webp", src / f"{stem}.jpg"]
        found = next((c for c in cand if c.exists()), None)
        if not found:
            missing.append(name)
            continue
        im = Image.open(found).convert("RGB")
        im = cover_crop(im, aspect, gravity)
        if im.size != target:
            im = im.resize(target, Image.LANCZOS)
        dest = OUT / f"{name}.webp"
        im.save(dest, "WEBP", quality=80, method=6)
        made.append(f"{dest.name:26} {target[0]}x{target[1]}  {dest.stat().st_size // 1024} KB")

    print("\n".join(made) if made else "nothing built")
    if missing:
        print("\nMISSING (skipped): " + ", ".join(missing))


# ---------------------------------------------------------------- OG composer
FONTS = ROOT / "assets" / "fonts"
_TTF_CACHE: dict[str, Path] = {}


def _ttf(name: str) -> Path:
    """Pillow cannot read woff2 — unwrap it to a temp .ttf once per run."""
    if name in _TTF_CACHE:
        return _TTF_CACHE[name]
    from fontTools.ttLib import TTFont

    src = FONTS / name
    dst = Path(tempfile.gettempdir()) / f"ishot-{src.stem}.ttf"
    if not dst.exists() or dst.stat().st_mtime < src.stat().st_mtime:
        font = TTFont(str(src))
        font.flavor = None
        font.save(str(dst))
    _TTF_CACHE[name] = dst
    return dst


def _font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(_ttf(name)), size)


def build_og() -> None:
    """Compose the social card from the site's own tokens + hero asset."""
    W, H = 1280, 640
    INK, BONE, OLIVE, DIM = (10, 10, 9), (239, 233, 221), (124, 139, 94), (166, 158, 142)
    card = Image.new("RGB", (W, H), INK)
    d = ImageDraw.Draw(card)

    # right-hand hero panel
    panel_w = 430
    hero = Image.open(OUT / "hero-main.webp").convert("RGB")
    hero = cover_crop(hero, (panel_w, H), "center").resize((panel_w, H), Image.LANCZOS)
    card.paste(hero, (W - panel_w, 0))
    # darken the panel so the type never fights it
    scrim = Image.new("RGBA", (panel_w, H), (10, 10, 9, 130))
    card.paste(Image.alpha_composite(hero.convert("RGBA"), scrim).convert("RGB"), (W - panel_w, 0))

    # olive rules
    d.rectangle([0, 0, W, 6], fill=OLIVE)

    mono = _font("jetbrains-mono-latin.woff2", 17)
    mono_sm = _font("jetbrains-mono-latin.woff2", 14)
    serif = _font("instrument-serif-latin.woff2", 96)
    serif_i = _font("instrument-serif-latin-italic.woff2", 96)

    d.text((72, 74), "FIELD NOTES  ·  ISSUE №01", font=mono, fill=OLIVE)
    d.text((72, 140), "Real training.", font=serif, fill=BONE)
    d.text((72, 244), "Not filtered", font=serif, fill=BONE)
    d.text((72, 348), "motivation.", font=serif_i, fill=OLIVE)

    d.line([(72, 486), (748, 486)], fill=(70, 68, 60), width=1)
    d.text((72, 512), "ISHOTGIRLS  ·  THE TRAINING JOURNAL", font=mono_sm, fill=DIM)
    d.text((72, 542), "47 ATHLETES   ·   12 480 SESSIONS   ·   214 TRANSFORMATIONS", font=mono_sm, fill=DIM)

    # issue badge on the panel
    bx, by = W - panel_w + 32, 34
    d.rectangle([bx, by, bx + 176, by + 44], fill=OLIVE)
    d.text((bx + 16, by + 13), "ISSUE №01", font=mono, fill=INK)

    dest = OUT / "og-image.png"
    card.save(dest, "PNG", optimize=True)
    print(f"{dest.name:26} {W}x{H}  {dest.stat().st_size // 1024} KB")


if __name__ == "__main__":
    src = Path(sys.argv[1]) if len(sys.argv) > 1 else ROOT / "raw"
    build(src)
    if (OUT / "hero-main.webp").exists():
        try:
            build_og()
        except Exception as exc:  # pragma: no cover
            print(f"og compose skipped: {exc}")

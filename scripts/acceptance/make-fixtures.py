#!/usr/bin/env python3
"""
Generate synthetic deal documents for the ingest acceptance tests.

Fake names only — nothing here is real customer data.

    python3 scripts/acceptance/make-fixtures.py

Writes to scripts/acceptance/fixtures/:
    desk_sheet_clean.png    full deal, all fields legible
    desk_sheet_mini.png     full mini, zero front gross
    crm_delivered.png       CRM delivered list, 3 rows (audit fixture)
    desk_sheet_blurry.jpg   clean sheet degraded — ambiguity test
"""

from pathlib import Path
from random import randint

from PIL import Image, ImageDraw, ImageFilter, ImageFont

OUT = Path(__file__).parent / "fixtures"
W, H = 1000, 1300
INK = (24, 24, 26)
MUTED = (110, 110, 118)
LINE = (208, 208, 214)
PAPER = (252, 251, 248)


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    candidates = [
        "/System/Library/Fonts/Supplemental/Arial Bold.ttf" if bold else "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Helvetica.ttc",
        "/Library/Fonts/Arial.ttf",
    ]
    for path in candidates:
        try:
            return ImageFont.truetype(path, size)
        except OSError:
            continue
    return ImageFont.load_default()


def sheet(title: str, subtitle: str) -> tuple[Image.Image, ImageDraw.ImageDraw]:
    img = Image.new("RGB", (W, H), PAPER)
    d = ImageDraw.Draw(img)
    d.rectangle([0, 0, W, 96], fill=(18, 18, 20))
    d.text((40, 26), title, font=font(34, True), fill=(250, 250, 250))
    d.text((40, 66), subtitle, font=font(18), fill=(170, 170, 178))
    return img, d


def row(d: ImageDraw.ImageDraw, y: int, label: str, value: str, bold: bool = False) -> None:
    d.text((48, y), label.upper(), font=font(17), fill=MUTED)
    d.text((48, y + 26), value, font=font(30, bold), fill=INK)
    d.line([(44, y + 74), (W - 44, y + 74)], fill=LINE, width=2)


def desk_sheet_clean() -> None:
    img, d = sheet("DEAL SHEET", "SUN TOYOTA  ·  NEW PORT RICHEY, FL")
    y = 140
    row(d, y, "Date", "08/14/2026"); y += 96
    row(d, y, "Salesperson", "T. LENG"); y += 96
    row(d, y, "Customer", "SMITH, JOHN"); y += 96
    row(d, y, "Vehicle / Stock", "2026 CAMRY SE     STK T44821"); y += 96
    row(d, y, "Front Gross", "$2,140.00", bold=True); y += 96
    row(d, y, "Back Gross", "$1,485.00"); y += 96
    row(d, y, "Pack", "$0.00"); y += 96
    row(d, y, "Trade / Payoff", "2019 CIVIC  ·  $9,200 / $10,050"); y += 96

    d.rectangle([44, y + 10, W - 44, y + 120], outline=LINE, width=2)
    d.text((66, y + 30), "DEAL TYPE", font=font(17), fill=MUTED)
    d.text((66, y + 56), "FULL DEAL — FINANCE", font=font(30, True), fill=INK)
    img.save(OUT / "desk_sheet_clean.png")


def desk_sheet_mini() -> None:
    img, d = sheet("DEAL SHEET", "SUN TOYOTA  ·  NEW PORT RICHEY, FL")
    y = 140
    row(d, y, "Date", "08/22/2026"); y += 96
    row(d, y, "Salesperson", "T. LENG"); y += 96
    row(d, y, "Customer", "ORTIZ, MARIA"); y += 96
    row(d, y, "Vehicle / Stock", "2026 RAV4 XLE     STK T45102"); y += 96
    row(d, y, "Front Gross", "$0.00", bold=True); y += 96
    row(d, y, "Back Gross", "$0.00"); y += 96
    row(d, y, "Pack", "$0.00"); y += 96
    row(d, y, "Trade / Payoff", "NONE"); y += 96

    d.rectangle([44, y + 10, W - 44, y + 120], outline=LINE, width=2)
    d.text((66, y + 30), "DEAL TYPE", font=font(17), fill=MUTED)
    d.text((66, y + 56), "MINI", font=font(30, True), fill=INK)
    img.save(OUT / "desk_sheet_mini.png")


def crm_delivered() -> None:
    img, d = sheet("DELIVERED", "AUGUST 2026  ·  SALES: T. LENG")
    cols = [44, 380, 560, 760, 880]
    heads = ["CUSTOMER", "STOCK", "VEHICLE", "DATE", "STATUS"]
    for x, head in zip(cols, heads):
        d.text((x, 150), head, font=font(16, True), fill=MUTED)
    d.line([(44, 182), (W - 44, 182)], fill=INK, width=3)

    rows = [
        ("SMITH, JOHN", "T44821", "CAMRY SE", "08/14", "DELIVERED"),
        ("ORTIZ, MARIA", "T45102", "RAV4 XLE", "08/22", "DELIVERED"),
        ("BELL, DEREK", "T44977", "TUNDRA SR5", "08/29", "DELIVERED"),
    ]
    y = 205
    for name, stock, vehicle, date, status in rows:
        values = [name, stock, vehicle, date, status]
        for x, value in zip(cols, values):
            d.text((x, y), value, font=font(21, bold=(status == "DELIVERED")), fill=INK)
        d.line([(44, y + 40), (W - 44, y + 40)], fill=LINE, width=1)
        y += 56
    img.save(OUT / "crm_delivered.png")


def desk_sheet_blurry() -> None:
    src = Image.open(OUT / "desk_sheet_clean.png").convert("RGB")
    src = src.rotate(-2.4, expand=True, fillcolor=PAPER)
    src = src.filter(ImageFilter.GaussianBlur(radius=2.6))

    px = src.load()
    for _ in range(22000):
        x = randint(0, src.width - 1)
        y = randint(0, src.height - 1)
        r, g, b = px[x, y]
        delta = randint(-26, 26)
        px[x, y] = (
            max(0, min(255, r + delta)),
            max(0, min(255, g + delta)),
            max(0, min(255, b + delta)),
        )
    src.save(OUT / "desk_sheet_blurry.jpg", quality=38)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    desk_sheet_clean()
    desk_sheet_mini()
    crm_delivered()
    desk_sheet_blurry()
    for path in sorted(OUT.iterdir()):
        print(f"{path.name:26} {path.stat().st_size / 1024:7.1f} KB")

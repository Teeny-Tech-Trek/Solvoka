import os
import json
from pathlib import Path
from PIL import Image

SOURCE_DIR = Path("public/Infrastructure-Assets/background-removed")
OUTPUT_DIR = SOURCE_DIR  # Save WebP directly in public/Infrastructure-Assets/background-removed/

def check_transparency(img: Image.Image):
    rgba = img.convert("RGBA")
    alpha = rgba.getchannel("A")
    lo, hi = alpha.getextrema()
    has_alpha = lo < 255
    return has_alpha, lo, hi

def convert_all():
    if not SOURCE_DIR.is_dir():
        print(f"Error: Directory not found: {SOURCE_DIR}")
        return

    png_files = sorted([p for p in SOURCE_DIR.glob("*.png")])
    print(f"Found {len(png_files)} PNG files in {SOURCE_DIR}\n")

    results = []
    total_orig_bytes = 0
    total_webp_bytes = 0

    for i, png_path in enumerate(png_files, 1):
        webp_name = png_path.stem + ".webp"
        webp_path = OUTPUT_DIR / webp_name

        try:
            with Image.open(png_path) as im:
                orig_has_alpha, orig_lo, orig_hi = check_transparency(im)
                orig_size = png_path.stat().st_size
                total_orig_bytes += orig_size

                # Convert to RGBA to ensure alpha channel is preserved
                rgba_im = im.convert("RGBA")

                # Save as high-quality WebP with alpha transparency preserved
                rgba_im.save(
                    webp_path,
                    format="WEBP",
                    quality=95,
                    method=6
                )

            # Verify the resulting WebP
            with Image.open(webp_path) as webp_im:
                webp_has_alpha, webp_lo, webp_hi = check_transparency(webp_im)
                webp_size = webp_path.stat().st_size
                total_webp_bytes += webp_size
                dim_match = (webp_im.size == im.size)

            if not webp_has_alpha:
                raise ValueError(f"WebP lost transparency! Min alpha: {webp_lo}")

            reduction = (1 - (webp_size / orig_size)) * 100
            print(f"[{i:02d}/{len(png_files)}] Converted: {png_path.name} -> {webp_name}")
            print(f"       PNG: {orig_size / 1024:.1f} KB | WebP: {webp_size / 1024:.1f} KB (-{reduction:.1f}%) | Alpha: [{webp_lo}, {webp_hi}] | Size: {webp_im.size}")

            results.append({
                "original_file": png_path.name,
                "webp_file": webp_name,
                "status": "success",
                "png_size_bytes": orig_size,
                "webp_size_bytes": webp_size,
                "dimensions": list(webp_im.size),
                "alpha_min": webp_lo,
                "alpha_max": webp_hi,
                "transparency_preserved": webp_has_alpha
            })

        except Exception as e:
            print(f"[{i:02d}/{len(png_files)}] FAILED: {png_path.name} -> {e}")
            results.append({
                "original_file": png_path.name,
                "status": "failed",
                "error": str(e)
            })

    report = {
        "source_images_count": len(png_files),
        "webp_generated_count": sum(1 for r in results if r["status"] == "success"),
        "failed_count": sum(1 for r in results if r["status"] == "failed"),
        "total_png_mb": round(total_orig_bytes / (1024 * 1024), 2),
        "total_webp_mb": round(total_webp_bytes / (1024 * 1024), 2),
        "details": results
    }

    report_path = SOURCE_DIR / "webp_conversion_report.json"
    with open(report_path, "w", encoding="utf-8") as f:
        json.dump(report, f, indent=2)

    print("\n========================================")
    print("CONVERSION SUMMARY")
    print("========================================")
    print(f"Total source PNGs:     {report['source_images_count']}")
    print(f"Successfully converted: {report['webp_generated_count']}")
    print(f"Failures:              {report['failed_count']}")
    print(f"Total PNG size:        {report['total_png_mb']} MB")
    print(f"Total WebP size:       {report['total_webp_mb']} MB")
    print(f"Report saved to:       {report_path}")
    print("========================================")

if __name__ == "__main__":
    convert_all()

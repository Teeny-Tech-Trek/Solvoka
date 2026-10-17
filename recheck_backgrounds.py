
from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import json

ROOT = Path("public/Infrastructure-Assets/background-removed")
REPORT = ROOT / "background_recheck_report.json"

EXTENSIONS = {".png", ".webp", ".jpg", ".jpeg"}

def has_transparency(image):
    rgba = image.convert("RGBA")
    alpha = rgba.getchannel("A")
    lo, hi = alpha.getextrema()
    return lo < 255, lo, hi

def corners_are_opaque(image):
    rgba = image.convert("RGBA")
    w, h = rgba.size

    # Small patches from all four corners
    size = max(1, min(w, h) // 30)
    boxes = [
        (0, 0, size, size),
        (w - size, 0, w, size),
        (0, h - size, size, h),
        (w - size, h - size, w, h),
    ]

    for box in boxes:
        patch = rgba.crop(box)
        alpha = patch.getchannel("A")
        if alpha.getextrema()[0] < 250:
            return False

    return True

def main():
    if not ROOT.is_dir():
        print(f"Folder not found: {ROOT.resolve()}")
        return

    files = [
        p for p in ROOT.rglob("*")
        if p.is_file()
        and p.name != REPORT.name
        and p.suffix.lower() in EXTENSIONS
    ]

    print(f"Images found: {len(files)}")

    suspicious = []
    report_data = []

    for path in files:
        try:
            with Image.open(path) as image:
                transparent, alpha_min, alpha_max = has_transparency(image)
                opaque_corners = corners_are_opaque(image)

                # Opaque corners can indicate an unremoved background,
                # but may also be valid for a transparent cutout.
                needs_review = not transparent or opaque_corners

                item = {
                    "file": str(path),
                    "has_transparency": transparent,
                    "opaque_corners": opaque_corners,
                    "needs_review": needs_review,
                }
                report_data.append(item)

                if needs_review:
                    suspicious.append(path)
                    print(f"CHECK: {path.name}")
                else:
                    print(f"OK: {path.name}")

        except Exception as error:
            print(f"ERROR reading {path.name}: {error}")

    REPORT.write_text(
        json.dumps(report_data, indent=2),
        encoding="utf-8"
    )

    print(f"\nNeeds review: {len(suspicious)}")
    print(f"Report: {REPORT.resolve()}")

    if not suspicious:
        print("No suspicious images found.")
        return

    answer = input(
        "\nReprocess all flagged images with AI? Type YES to continue: "
    )

    if answer != "YES":
        print("No images changed. Review the report first.")
        return

    session = new_session("u2net")
    fixed = 0

    for path in suspicious:
        try:
            with Image.open(path) as image:
                result = remove(image.convert("RGBA"), session=session)
                result.save(path, format="PNG")

            fixed += 1
            print(f"REPROCESSED: {path.name}")

        except Exception as error:
            print(f"FAILED: {path.name}: {error}")

    print(f"\nReprocessed: {fixed}/{len(suspicious)}")
    print("Review the images visually to confirm the result.")

if __name__ == "__main__":
    main()

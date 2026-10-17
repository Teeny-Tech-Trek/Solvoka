
from pathlib import Path
from rembg import remove, new_session
from PIL import Image, ImageOps

ROOT = Path("public/Infrastructure-Assets")
OUTPUT = ROOT / "background-removed"

SKIP = {
    "golden hour scaffolding yard",
    "golden-hour formwork over city skyline",
    "precast slab lift at construction site",
}

EXTENSIONS = {
    ".jpg", ".jpeg", ".png", ".webp",
    ".bmp", ".tif", ".tiff"
}

def main():
    if not ROOT.is_dir():
        print(f"Folder not found: {ROOT.resolve()}")
        return

    files = [
        p for p in ROOT.rglob("*")
        if p.is_file()
        and OUTPUT not in p.parents
        and p.suffix.lower() in EXTENSIONS
    ]

    print(f"Total images found: {len(files)}")
    print("Loading AI model...")

    session = new_session("u2net")
    done = skipped = failed = 0

    for i, src in enumerate(files, 1):
        if src.stem.strip().casefold() in SKIP:
            print(f"[{i}/{len(files)}] SKIPPED: {src.name}")
            skipped += 1
            continue

        try:
            with Image.open(src) as im:
                im = ImageOps.exif_transpose(im).convert("RGBA")
                result = remove(im, session=session)

                relative = src.relative_to(ROOT)
                dest = OUTPUT / relative.parent / (src.stem + ".png")
                dest.parent.mkdir(parents=True, exist_ok=True)
                result.save(dest, "PNG")

            print(f"[{i}/{len(files)}] DONE: {src.name}")
            done += 1

        except Exception as e:
            print(f"[{i}/{len(files)}] FAILED: {src.name}: {e}")
            failed += 1

    print("\n--- COMPLETE ---")
    print(f"Processed: {done}")
    print(f"Skipped: {skipped}")
    print(f"Failed: {failed}")
    print(f"Output: {OUTPUT.resolve()}")

if __name__ == "__main__":
    main()

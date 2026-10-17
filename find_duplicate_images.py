
from pathlib import Path
from collections import defaultdict
import hashlib

ROOT = Path("public/Infrastructure-Assets")
OUTPUT = ROOT / "background-removed"

def file_hash(path):
    digest = hashlib.sha256()
    with path.open("rb") as f:
        for chunk in iter(lambda: f.read(1024 * 1024), b""):
            digest.update(chunk)
    return digest.hexdigest()

def main():
    if not ROOT.is_dir():
        print(f"Folder not found: {ROOT.resolve()}")
        return

    groups = defaultdict(list)

    for path in ROOT.rglob("*"):
        if not path.is_file() or OUTPUT in path.parents:
            continue
        if path.suffix.lower() not in {
            ".jpg", ".jpeg", ".png", ".webp",
            ".bmp", ".tif", ".tiff"
        }:
            continue

        try:
            groups[file_hash(path)].append(path)
        except OSError as e:
            print(f"Cannot read {path}: {e}")

    duplicate_groups = [
        paths for paths in groups.values() if len(paths) > 1
    ]

    report = ROOT / "duplicate_images_report.txt"

    with report.open("w", encoding="utf-8") as f:
        for number, paths in enumerate(duplicate_groups, 1):
            f.write(f"\nDuplicate group {number}:\n")
            for path in paths:
                f.write(f"  {path}\n")

    print(f"Duplicate groups found: {len(duplicate_groups)}")
    print(f"Report saved to: {report.resolve()}")

    for number, paths in enumerate(duplicate_groups, 1):
        print(f"\nGroup {number}:")
        for path in paths:
            print(f"  {path}")

    print("\nNo files were deleted.")

if __name__ == "__main__":
    main()

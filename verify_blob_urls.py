import json
import urllib.request
import io
from pathlib import Path
from PIL import Image

def verify_blobs():
    with open("blob-mapping.json", "r", encoding="utf-8") as f:
        mapping = json.load(f)

    # Filter to unique URLs in Infrastructure-Assets/background-removed
    target_urls = {}
    for key, url in mapping.items():
        if key.startswith("/Infrastructure-Assets/background-removed/") and key.endswith(".webp"):
            # Avoid duplicate checking if key and encodedKey point to same url
            if url not in target_urls.values():
                target_urls[key] = url

    print(f"Total unique WebP Blob URLs to verify: {len(target_urls)}\n")

    verified = 0
    failed = 0
    details = []

    for i, (key, url) in enumerate(sorted(target_urls.items()), 1):
        try:
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            with urllib.request.urlopen(req, timeout=15) as resp:
                status = resp.status
                content_type = resp.headers.get("Content-Type")
                data = resp.read()

            with Image.open(io.BytesIO(data)) as im:
                has_alpha = "A" in im.getbands()
                alpha_min = im.getchannel("A").getextrema()[0] if has_alpha else None
                dimensions = im.size
                format_name = im.format

            is_valid = (
                status == 200
                and "image/webp" in (content_type or "").lower()
                and has_alpha
                and alpha_min == 0
            )

            if is_valid:
                verified += 1
                print(f"[{i:02d}/{len(target_urls)}] OK (200) | Alpha Min: {alpha_min} | {format_name} {dimensions} | {Path(key).name}")
                details.append({
                    "key": key,
                    "url": url,
                    "status": "OK",
                    "http_status": status,
                    "content_type": content_type,
                    "dimensions": dimensions,
                    "alpha_min": alpha_min
                })
            else:
                failed += 1
                print(f"[{i:02d}/{len(target_urls)}] FAILED VALIDATION | status={status}, type={content_type}, alpha_min={alpha_min} | {url}")
                details.append({
                    "key": key,
                    "url": url,
                    "status": "FAILED_VALIDATION",
                    "http_status": status,
                    "content_type": content_type
                })

        except Exception as e:
            failed += 1
            print(f"[{i:02d}/{len(target_urls)}] ERROR fetching {url}: {e}")
            details.append({
                "key": key,
                "url": url,
                "status": "ERROR",
                "error": str(e)
            })

    print("\n========================================")
    print("VERIFICATION SUMMARY")
    print("========================================")
    print(f"Total URLs checked:    {len(target_urls)}")
    print(f"Successfully verified: {verified}")
    print(f"Failed verification:   {failed}")
    print("========================================")

    with open("public/Infrastructure-Assets/background-removed/blob_verification_report.json", "w", encoding="utf-8") as f:
        json.dump({"total": len(target_urls), "verified": verified, "failed": failed, "details": details}, f, indent=2)

if __name__ == "__main__":
    verify_blobs()

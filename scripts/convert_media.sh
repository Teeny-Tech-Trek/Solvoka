#!/usr/bin/env bash
# Media Optimization Script using FFmpeg
# Requirements: ffmpeg (run: sudo apt install ffmpeg OR brew install ffmpeg OR choco install ffmpeg)

set -e

PUBLIC_DIR="./public"

if ! command -v ffmpeg &> /dev/null; then
    echo "FFmpeg is not installed."
    echo "Install command:"
    echo "  Windows (winget): winget install Gyan.FFmpeg"
    echo "  Windows (choco):  choco install ffmpeg"
    echo "  Mac (Homebrew):   brew install ffmpeg"
    echo "  Ubuntu/Debian:    sudo apt update && sudo apt install -y ffmpeg"
    exit 1
fi

echo "========================================"
echo "    SOLVOKA MEDIA OPTIMIZATION"
echo "========================================"

# 1. Convert Images (.jpg, .jpeg, .png -> .webp)
echo ""
echo "--- Converting Images to WebP (CRF/Quality ~78, max width 1920px) ---"
find "$PUBLIC_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" \) ! -iname "*.webp" | while read -r img; do
    out="${img%.*}.webp"
    echo "Converting image: $img -> $out"
    ffmpeg -y -i "$img" -vf "scale=w='min(1920,trunc(iw/2)*2)':h=-2" -quality 78 "$out" </dev/null
done

# 2. Convert GIFs (.gif -> .webm)
echo ""
echo "--- Converting GIFs to WebM (VP9, CRF 35, no audio) ---"
find "$PUBLIC_DIR" -type f -iname "*.gif" | while read -r gif; do
    out="${gif%.*}.webm"
    echo "Converting GIF: $gif -> $out"
    ffmpeg -y -i "$gif" -c:v libvpx-vp9 -crf 35 -b:v 0 -an -vf "scale=w='min(1920,trunc(iw/2)*2)':h=-2" "$out" </dev/null
done

# 3. Convert Videos (.mp4, .mov, .avi, .mkv -> .webm)
echo ""
echo "--- Converting Videos to WebM (VP9 + Opus, CRF 33, max width 1920px) ---"
find "$PUBLIC_DIR" -type f \( -iname "*.mp4" -o -iname "*.mov" -o -iname "*.avi" -o -iname "*.mkv" \) ! -iname "*.webm" | while read -r vid; do
    out="${vid%.*}.webm"
    echo "Converting video: $vid -> $out"
    ffmpeg -y -i "$vid" -map 0:v -map 0:a? -c:v libvpx-vp9 -crf 33 -b:v 0 -c:a libopus -vf "scale=w='min(1920,trunc(iw/2)*2)':h=-2" "$out" </dev/null
done

echo ""
echo "========================================"
echo "All conversions completed!"
echo "Original files kept safe."
echo "========================================"

#!/usr/bin/env python3
"""Optimize images for web: resize and convert to JPEG."""
import os
from PIL import Image

SRC = "/home/z/my-project/download/images"
MAX_W = 1200
QUALITY = 82

for fname in sorted(os.listdir(SRC)):
    if not (fname.endswith(".png") or fname.endswith(".jpeg") or fname.endswith(".jpg")):
        continue
    path = os.path.join(SRC, fname)
    im = Image.open(path).convert("RGB")
    w, h = im.size
    if w > MAX_W:
        new_h = int(h * MAX_W / w)
        im = im.resize((MAX_W, new_h), Image.LANCZOS)
    base = os.path.splitext(fname)[0]
    out_path = os.path.join(SRC, base + ".jpg")
    im.save(out_path, "JPEG", quality=QUALITY, optimize=True)
    old_kb = os.path.getsize(path) // 1024
    new_kb = os.path.getsize(out_path) // 1024
    print(f"{fname} ({old_kb}KB) -> {base}.jpg ({new_kb}KB) [{im.size[0]}x{im.size[1]}]")
    # Remove original PNG if a JPG was created
    if fname.endswith(".png") and out_path != path:
        os.remove(path)

print("\nFinal files:")
for f in sorted(os.listdir(SRC)):
    size = os.path.getsize(os.path.join(SRC, f)) // 1024
    print(f"  {f} ({size} KB)")

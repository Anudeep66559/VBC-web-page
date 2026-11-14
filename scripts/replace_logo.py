#!/usr/bin/env python3
"""Replace about.jpg with the new Navy V Skyline Wave Logo."""
import os
import shutil
from PIL import Image

SRC = "/home/z/my-project/upload/Navy V Skyline Wave Logo.png"
DEST = "/home/z/my-project/download/images/about.jpg"
IMG_DIR = "/home/z/my-project/download/images"

# Optimize: resize to max 1000px wide, convert to JPEG
im = Image.open(SRC).convert("RGB")
w, h = im.size
max_w = 1000
if w > max_w:
    new_h = int(h * max_w / w)
    im = im.resize((max_w, new_h), Image.LANCZOS)

im.save(DEST, "JPEG", quality=85, optimize=True)
size_kb = os.path.getsize(DEST) // 1024
print(f"Created {DEST}: {im.size[0]}x{im.size[1]} ({size_kb} KB)")

# Also create a version for project-sree-villas replacement? No, keep that one.
# The about.jpg is used in: about section + 3 project cards (mythri, mithaiwala, independent)

print("\nAll images in dir:")
for f in sorted(os.listdir(IMG_DIR)):
    s = os.path.getsize(os.path.join(IMG_DIR, f)) // 1024
    print(f"  {f} ({s} KB)")

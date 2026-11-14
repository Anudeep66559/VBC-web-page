#!/usr/bin/env python3
"""
Make all requested changes:
1. Remove the Navy V logo image from the about section completely
2. Remove the 3 pillars (Craftsmanship, Modern Design, Lasting Value) from about
3. Replace Mythri/Mithaiwala/Independent project backgrounds with original images from first upload
"""
import re
import base64
import os
from PIL import Image

HTML = "/home/z/my-project/download/veerabhadra-constructions.html"
IMG_DIR = "/home/z/my-project/download/images"

# Read HTML
with open(HTML, "r", encoding="utf-8") as f:
    html = f.read()

# Helper: read image as data URI
def img_to_uri(path):
    with open(path, "rb") as f:
        data = f.read()
    ext = os.path.splitext(path)[1].lstrip(".")
    if ext == "jpg":
        ext = "jpeg"
    b64 = base64.b64encode(data).decode("ascii")
    return f"data:image/{ext};base64,{b64}"

# === 1. Remove the about img tag, replace frame content with CSS visual ===
# The frame currently contains: <img src="data:..." alt="Veerabhadra Constructions project showcase">
# Replace with a CSS scaffold pattern (the original design before images were added)
html = re.sub(
    r'<div class="frame">\s*<img src="data:image/jpeg;base64,[^"]*" alt="Veerabhadra Constructions project showcase">\s*</div>',
    '''<div class="frame">
        <div class="scaffold"><i class="fas fa-building"></i></div>
      </div>''',
    html
)
print("1. Removed about image, restored CSS scaffold visual")

# === 2. Remove the pillars div ===
# The pillars section: <div class="pillars">...</div>
html = re.sub(
    r'\s*<div class="pillars">.*?</div>\s*',
    '',
    html,
    flags=re.DOTALL
)
print("2. Removed the 3 pillars (Craftsmanship, Modern Design, Lasting Value)")

# === 3. Replace project card backgrounds ===
# Find each project card and replace its background image
# The project cards are in order: Mythri, Sree Villas, Mithaiwala, Independent Houses

project_images = {
    0: "original-project-mythri-convention.jpg",
    1: "original-project-sree-villas.jpg",  # keep Sree Villas with its original too
    2: "original-project-mithaiwala.jpg",
    3: "original-project-independent-houses.jpg",
}

# Find all project-card bg divs and replace their background-image
# Pattern: <div class="bg" style="background-image:url('data:image/jpeg;base64,...')"></div>
def replace_project_bg(match):
    idx_counter = getattr(replace_project_bg, 'counter', 0)
    img_file = project_images.get(idx_counter)
    if img_file and os.path.exists(os.path.join(IMG_DIR, img_file)):
        uri = img_to_uri(os.path.join(IMG_DIR, img_file))
        replace_project_bg.counter = idx_counter + 1
        return f'''<div class="bg" style="background-image:url('{uri}')"></div>'''
    replace_project_bg.counter = idx_counter + 1
    return match.group(0)

replace_project_bg.counter = 0
html = re.sub(
    r'<div class="bg" style="background-image:url\(\'data:image/jpeg;base64,[^\']*\'\)"></div>',
    replace_project_bg,
    html
)
print(f"3. Replaced {replace_project_bg.counter} project card backgrounds with original images")

# Write back
with open(HTML, "w", encoding="utf-8") as f:
    f.write(html)

final_kb = os.path.getsize(HTML) // 1024
print(f"\nFinal HTML size: {final_kb} KB")

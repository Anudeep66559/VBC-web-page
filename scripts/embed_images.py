#!/usr/bin/env python3
"""Embed all images as base64 data URIs directly in the HTML file."""
import base64
import re
import os

HTML = "/home/z/my-project/download/veerabhadra-constructions.html"
IMG_DIR = "/home/z/my-project/download/images"

# Read current HTML
with open(HTML, "r", encoding="utf-8") as f:
    html = f.read()

# Build a cache of image -> data URI
cache = {}

def img_to_data_uri(rel_path):
    # Strip leading 'images/' if present
    name = rel_path
    if name.startswith("images/"):
        name = name[len("images/"):]
    if name in cache:
        return cache[name]
    full = os.path.join(IMG_DIR, name)
    if not os.path.exists(full):
        print(f"  MISSING: {rel_path} -> {full}")
        return None
    with open(full, "rb") as f:
        data = f.read()
    ext = os.path.splitext(name)[1].lower().lstrip(".")
    if ext == "jpg":
        ext = "jpeg"
    mime = f"image/{ext}"
    b64 = base64.b64encode(data).decode("ascii")
    uri = f"data:{mime};base64,{b64}"
    cache[name] = uri
    size_kb = len(data) // 1024
    print(f"  Embedded {rel_path} ({size_kb} KB)")
    return uri

# Replace <img src="images/...">
def replace_img_src(match):
    path = match.group(1)
    uri = img_to_data_uri(path)
    if uri:
        return f'src="{uri}"'
    return match.group(0)

html = re.sub(r'src="(images/[^"]+)"', replace_img_src, html)

# Replace background-image:url('images/...')
def replace_bg_url(match):
    path = match.group(1)
    uri = img_to_data_uri(path)
    if uri:
        return f"background-image:url('{uri}')"
    return match.group(0)

html = re.sub(r"background-image:url\('(images/[^']+)'\)", replace_bg_url, html)

# Write back
with open(HTML, "w", encoding="utf-8") as f:
    f.write(html)

final_kb = os.path.getsize(HTML) // 1024
print(f"\nFinal HTML size: {final_kb} KB ({final_kb//1024} MB)")
print("All images embedded as base64 data URIs.")

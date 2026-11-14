#!/usr/bin/env python3
"""Extract each img tag's image, named by its section context."""
import re
import os
import base64

SRC = "/home/z/my-project/upload/veerabhadra constructions final.html"
OUT = "/home/z/my-project/download/images"
os.makedirs(OUT, exist_ok=True)

# Clean previous extractions
for f in os.listdir(OUT):
    if f.startswith("image_"):
        os.remove(os.path.join(OUT, f))

with open(SRC, "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Service headings in order
service_names = [
    "residential",
    "commercial",
    "renovation",
    "interior",
    "project-management",
    "construction-consulting",
]
project_names = [
    "mythri-convention",
    "sree-villas",
    "mithaiwala",
    "independent-houses",
]

# Find all img tags with positions
img_tags = []
for m in re.finditer(r'<img[^>]*src="data:image/(\w+);base64,([A-Za-z0-9+/=]+)"', html):
    img_tags.append({
        'pos': m.start(),
        'ext': m.group(1),
        'data': m.group(2),
    })

print(f"Found {len(img_tags)} img tags")

# Classify each img by context
service_idx = 0
project_idx = 0
saved = {}

for i, img in enumerate(img_tags):
    pos = img['pos']
    ctx_before = html[max(0, pos-600):pos]
    classes = re.findall(r'class="([^"]+)"', ctx_before)
    last_class = classes[-1] if classes else ""
    
    name = None
    if 'about-image' in ctx_before or 'about-image' in last_class:
        name = "about"
    elif 'service-img' in last_class or 'service' in last_class:
        if service_idx < len(service_names):
            name = f"service-{service_names[service_idx]}"
            service_idx += 1
        else:
            name = f"service-extra-{i}"
    elif 'project-card' in ctx_before or 'project' in last_class:
        if project_idx < len(project_names):
            name = f"project-{project_names[project_idx]}"
            project_idx += 1
        else:
            name = f"project-extra-{i}"
    else:
        name = f"unknown-{i}"
    
    # Dedupe by data hash
    data_key = img['data'][:200]
    if data_key in saved:
        print(f"  IMG {i} ({name}) = duplicate of {saved[data_key]}")
        continue
    
    fname = f"{OUT}/{name}.{img['ext']}"
    try:
        binary = base64.b64decode(img['data'])
        with open(fname, "wb") as out:
            out.write(binary)
        size_kb = len(binary) // 1024
        saved[data_key] = name
        print(f"  IMG {i} -> {fname} ({size_kb} KB) [last_class={last_class}]")
    except Exception as e:
        print(f"  IMG {i} ({name}) failed: {e}")

print(f"\nSaved {len(saved)} unique images")
print("\nFiles in output dir:")
for f in sorted(os.listdir(OUT)):
    size = os.path.getsize(os.path.join(OUT, f)) // 1024
    print(f"  {f} ({size} KB)")

#!/usr/bin/env python3
"""Re-extract the ORIGINAL about image and project images from the first upload."""
import re
import os
import base64

SRC = "/home/z/my-project/upload/veerabhadra constructions final.html"
OUT = "/home/z/my-project/download/images"

with open(SRC, "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find all img tags with positions and context
img_tags = []
for m in re.finditer(r'<img[^>]*src="data:image/(\w+);base64,([A-Za-z0-9+/=]+)"', html):
    img_tags.append({
        'pos': m.start(),
        'ext': m.group(1),
        'data': m.group(2),
    })

# Classify each img by context (same logic as before)
service_idx = 0
project_idx = 0
service_names = ["residential","commercial","renovation","interior","project-management","construction-consulting"]
project_names = ["mythri-convention","sree-villas","mithaiwala","independent-houses"]

results = {}
for i, img in enumerate(img_tags):
    ctx_before = html[max(0, img['pos']-600):img['pos']]
    classes = re.findall(r'class="([^"]+)"', ctx_before)
    last_class = classes[-1] if classes else ""
    
    if 'about-image' in ctx_before or 'about-image' in last_class:
        name = "original-about"
    elif 'service-img' in last_class:
        name = f"original-service-{service_names[service_idx]}" if service_idx < len(service_names) else f"svc-{i}"
        service_idx += 1
    elif 'project-card' in ctx_before or 'project' in last_class:
        name = f"original-project-{project_names[project_idx]}" if project_idx < len(project_names) else f"proj-{i}"
        project_idx += 1
    else:
        name = f"unknown-{i}"
    
    if name in results:
        print(f"  IMG {i} ({name}) = duplicate, skipping")
        continue
    
    fname = f"{OUT}/{name}.{img['ext']}"
    binary = base64.b64decode(img['data'])
    
    # Optimize: resize to max 1000px, convert to JPEG
    from PIL import Image
    import io
    im = Image.open(io.BytesIO(binary)).convert("RGB")
    w, h = im.size
    if w > 1000:
        new_h = int(h * 1000 / w)
        im = im.resize((1000, new_h), Image.LANCZOS)
    fname = fname.rsplit(".", 1)[0] + ".jpg"
    im.save(fname, "JPEG", quality=82, optimize=True)
    
    size_kb = os.path.getsize(fname) // 1024
    results[name] = fname
    print(f"  IMG {i} -> {fname} ({size_kb} KB) [{im.size[0]}x{im.size[1]}]")

print(f"\nExtracted {len(results)} unique images")

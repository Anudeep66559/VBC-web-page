#!/usr/bin/env python3
"""Find the context (parent section) of each img tag in the original HTML."""
import re

SRC = "/home/z/my-project/upload/veerabhadra constructions final.html"
with open(SRC, "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

# Find each img tag with surrounding context
for i, m in enumerate(re.finditer(r'<img[^>]*src="data:image/(\w+);base64,([A-Za-z0-9+/=]{40})', html)):
    ext = m.group(1)
    prefix = m.group(2)
    pos = m.start()
    # Look back ~400 chars for section/class context
    ctx_before = html[max(0, pos-400):pos]
    # Look forward ~100 chars
    ctx_after = html[pos:pos+100]
    # Extract class hints
    classes = re.findall(r'class="([^"]+)"', ctx_before)
    headings = re.findall(r'<h3[^>]*>([^<]+)</h3>', ctx_before)
    print(f"\n=== IMG {i} (.{ext}, prefix={prefix}...) ===")
    print(f"  Nearby classes: {classes[-3:] if classes else 'none'}")
    print(f"  Nearby headings: {headings[-2:] if headings else 'none'}")

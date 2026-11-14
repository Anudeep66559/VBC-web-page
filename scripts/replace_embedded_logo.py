#!/usr/bin/env python3
"""Replace the old about.jpg base64 data URI with the new logo in the HTML."""
import re
import base64
import os

HTML = "/home/z/my-project/download/veerabhadra-constructions.html"
NEW_IMG = "/home/z/my-project/download/images/about.jpg"

# Read the new image as base64
with open(NEW_IMG, "rb") as f:
    new_data = f.read()
new_b64 = base64.b64encode(new_data).decode("ascii")
new_uri = f"data:image/jpeg;base64,{new_b64}"
print(f"New about.jpg base64 URI length: {len(new_uri)}")

# Read the HTML
with open(HTML, "r", encoding="utf-8") as f:
    html = f.read()

# Find the old about.jpg data URI by locating the about section img tag
# The about img has alt="Veerabhadra Constructions project showcase"
m = re.search(r'src="(data:image/jpeg;base64,[A-Za-z0-9+/=]+)"[^>]*alt="Veerabhadra Constructions project showcase"', html)
if not m:
    # Try reverse order (alt before src)
    m = re.search(r'alt="Veerabhadra Constructions project showcase"[^>]*src="(data:image/jpeg;base64,[A-Za-z0-9+/=]+)"', html)

if not m:
    print("ERROR: Could not find the about img tag in HTML")
    # List all data URIs to help debug
    for i, match in enumerate(re.finditer(r'data:image/jpeg;base64,([A-Za-z0-9+/=]{40})', html)):
        print(f"  URI {i}: {match.group(1)}...")
    exit(1)

old_uri = m.group(1)
print(f"Old about.jpg base64 URI length: {len(old_uri)}")

# Count occurrences
count = html.count(old_uri)
print(f"Occurrences of old about URI in HTML: {count}")

# Replace all occurrences with the new URI
html = html.replace(old_uri, new_uri)
print(f"Replaced {count} occurrences with new logo")

# Write back
with open(HTML, "w", encoding="utf-8") as f:
    f.write(html)

final_kb = os.path.getsize(HTML) // 1024
print(f"\nFinal HTML size: {final_kb} KB")
print("Done!")

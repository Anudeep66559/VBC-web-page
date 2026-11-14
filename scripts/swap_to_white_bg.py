#!/usr/bin/env python3
"""Replace the Navy V logo with the original white-background V logo in the final HTML."""
import base64
import os

FINAL = "/home/z/my-project/download/veerabhadra-constructions-final.html"
NEW_IMG = "/home/z/my-project/download/images/original-about.jpg"

# Read the original white-background image
with open(NEW_IMG, "rb") as f:
    data = f.read()
new_b64 = base64.b64encode(data).decode("ascii")
new_uri = f"data:image/jpeg;base64,{new_b64}"
print(f"New image (white bg) base64 URI length: {len(new_uri)}")

with open(FINAL, "r", encoding="utf-8") as f:
    html = f.read()

# Find the current about img and replace its src
import re
m = re.search(r'<img src="(data:image/jpeg;base64,[^"]+)" alt="Veerabhadra Constructions logo">', html)
if not m:
    print("ERROR: Could not find the about img tag")
    exit(1)

old_uri = m.group(1)
print(f"Old image (Navy V) base64 URI length: {len(old_uri)}")

count = html.count(old_uri)
print(f"Occurrences: {count}")

html = html.replace(old_uri, new_uri)
print(f"Replaced {count} occurrence(s)")

with open(FINAL, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\nFinal HTML size: {os.path.getsize(FINAL)//1024} KB")

#!/usr/bin/env python3
"""Merge the separate HTML, CSS, JS back into one self-contained file."""
import os

HTML = "/home/z/my-project/download/veerabhadra-constructions.html"
CSS = "/home/z/my-project/download/styles.css"
JS = "/home/z/my-project/download/script.js"
OUT = "/home/z/my-project/download/veerabhadra-constructions-final.html"

with open(HTML, "r", encoding="utf-8") as f:
    html = f.read()
with open(CSS, "r", encoding="utf-8") as f:
    css = f.read()
with open(JS, "r", encoding="utf-8") as f:
    js = f.read()

# Replace the external CSS link with inline <style>
html = html.replace(
    '<link rel="stylesheet" href="styles.css">',
    f'<style>\n{css}\n</style>'
)

# Replace the external JS script with inline <script>
html = html.replace(
    '<script src="script.js"></script>',
    f'<script>\n{js}\n</script>'
)

with open(OUT, "w", encoding="utf-8") as f:
    f.write(html)

size_kb = os.path.getsize(OUT) // 1024
print(f"Created {OUT} ({size_kb} KB)")

# Verify
with open(OUT, "r", encoding="utf-8") as f:
    h = f.read()
print(f"  Inline <style>: {h.count('<style>')}")
print(f"  Inline <script>: {h.count('<script>') - h.count('<script src=')}")
print(f"  External CSS link: {h.count('href=\"styles.css\"')}")
print(f"  External JS src: {h.count('src=\"script.js\"')}")

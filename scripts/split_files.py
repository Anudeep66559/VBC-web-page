#!/usr/bin/env python3
"""Split the single HTML file into separate HTML, CSS, and JS files."""
import re
import os

HTML_FILE = "/home/z/my-project/download/veerabhadra-constructions.html"
CSS_FILE = "/home/z/my-project/download/styles.css"
JS_FILE = "/home/z/my-project/download/script.js"

with open(HTML_FILE, "r", encoding="utf-8") as f:
    html = f.read()

# Extract CSS (content between <style> and </style>)
css_match = re.search(r'<style>(.*?)</style>', html, re.DOTALL)
css_content = css_match.group(1).strip() if css_match else ""

# Extract JS (content between <script> and </script>)
js_match = re.search(r'<script>(.*?)</script>', html, re.DOTALL)
js_content = js_match.group(1).strip() if js_match else ""

# Write CSS file
with open(CSS_FILE, "w", encoding="utf-8") as f:
    f.write(css_content)
print(f"Written {CSS_FILE} ({len(css_content)} chars, {os.path.getsize(CSS_FILE)//1024} KB)")

# Write JS file
with open(JS_FILE, "w", encoding="utf-8") as f:
    f.write(js_content)
print(f"Written {JS_FILE} ({len(js_content)} chars, {os.path.getsize(JS_FILE)//1024} KB)")

# Update HTML: replace <style>...</style> with <link>
html = re.sub(
    r'<style>.*?</style>',
    '<link rel="stylesheet" href="styles.css">',
    html,
    flags=re.DOTALL
)

# Update HTML: replace <script>...</script> with <script src="script.js"></script>
html = re.sub(
    r'<script>.*?</script>',
    '<script src="script.js"></script>',
    html,
    flags=re.DOTALL
)

# Write updated HTML
with open(HTML_FILE, "w", encoding="utf-8") as f:
    f.write(html)
print(f"Updated {HTML_FILE} ({os.path.getsize(HTML_FILE)//1024} KB)")

# Verify
print("\nVerification:")
with open(HTML_FILE, "r", encoding="utf-8") as f:
    h = f.read()
print(f"  <style> tags in HTML: {h.count('<style>')}")
print(f"  <script> inline in HTML: {len(re.findall(r'<script>', h)) - h.count('<script src=')}")
print(f"  <link> to styles.css: {h.count('styles.css')}")
print(f"  <script src> to script.js: {h.count('script.js')}")

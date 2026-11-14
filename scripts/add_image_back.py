#!/usr/bin/env python3
"""Add the Navy V logo image back to the about section."""
import base64
import os

HTML = "/home/z/my-project/download/veerabhadra-constructions.html"
CSS = "/home/z/my-project/download/styles.css"
IMG = "/home/z/my-project/download/images/about.jpg"

# Read the Navy V logo as base64
with open(IMG, "rb") as f:
    data = f.read()
b64 = base64.b64encode(data).decode("ascii")
data_uri = f"data:image/jpeg;base64,{b64}"
print(f"Image base64 URI length: {len(data_uri)}")

# Update HTML: replace scaffold with img
with open(HTML, "r", encoding="utf-8") as f:
    html = f.read()

old_frame = '''<div class="frame">
        <div class="scaffold"><i class="fas fa-building"></i></div>
      </div>'''

new_frame = f'''<div class="frame">
        <img src="{data_uri}" alt="Veerabhadra Constructions logo">
      </div>'''

html = html.replace(old_frame, new_frame)

with open(HTML, "w", encoding="utf-8") as f:
    f.write(html)
print(f"Updated HTML ({os.path.getsize(HTML)//1024} KB)")

# Update CSS: restore img styling, keep scaffold as fallback
with open(CSS, "r", encoding="utf-8") as f:
    css = f.read()

old_css = """.about-visual .frame{border-radius:16px;overflow:hidden;border:1px solid var(--line);aspect-ratio:4/5;position:relative;background:linear-gradient(145deg,#222a38,#161b22)}
.about-visual .frame::before{content:'';position:absolute;inset:0;background:
  repeating-linear-gradient(45deg,rgba(201,162,39,.04) 0 2px,transparent 2px 22px),
  radial-gradient(circle at 50% 40%,rgba(201,162,39,.18),transparent 65%)}
.about-visual .frame .scaffold{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:var(--gold);font-size:5rem;opacity:.85}
.about-visual .frame::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(13,17,23,.5));pointer-events:none}"""

new_css = """.about-visual .frame{border-radius:16px;overflow:hidden;border:1px solid var(--line);aspect-ratio:4/5;position:relative;background:#161b22;display:flex;align-items:center;justify-content:center}
.about-visual .frame img{width:100%;height:100%;object-fit:cover;display:block}
.about-visual .frame::after{content:'';position:absolute;inset:0;background:linear-gradient(180deg,transparent 60%,rgba(13,17,23,.3));pointer-events:none}"""

css = css.replace(old_css, new_css)

with open(CSS, "w", encoding="utf-8") as f:
    f.write(css)
print(f"Updated CSS ({os.path.getsize(CSS)//1024} KB)")

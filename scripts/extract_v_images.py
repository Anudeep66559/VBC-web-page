import base64
import re
import os

html_path = "/home/z/my-project/download/veerabhadra-constructions-final.html"
out_dir = "/home/z/my-project/public/images"
os.makedirs(out_dir, exist_ok=True)

with open(html_path, "r", encoding="utf-8") as f:
    html = f.read()

pattern = re.compile(r'data:image/(jpeg|png|jpg);base64,([A-Za-z0-9+/=]+)')

matches = list(pattern.finditer(html))
print(f"Found {len(matches)} images")

def context(pos):
    start = max(0, pos - 800)
    end = min(len(html), pos + 200)
    return html[start:end]

service_count = 0
project_count = 0
about_done = False

for i, m in enumerate(matches):
    ext = m.group(1)
    if ext == "jpeg":
        ext = "jpg"
    data_b64 = m.group(2)
    ctx = context(m.start())
    
    if ("about-visual" in ctx or ("about" in ctx and not about_done and "service" not in ctx and "project" not in ctx)) and not about_done:
        name = f"about-logo.{ext}"
        about_done = True
    elif "service-card" in ctx or 'class="thumb"' in ctx:
        service_count += 1
        name = f"service-{service_count}.{ext}"
    elif "project-card" in ctx or 'class="bg"' in ctx:
        project_count += 1
        name = f"project-{project_count}.{ext}"
    else:
        name = f"misc-{i}.{ext}"
    
    out_path = os.path.join(out_dir, name)
    try:
        decoded = base64.b64decode(data_b64)
        with open(out_path, "wb") as out:
            out.write(decoded)
        print(f"Saved {name} ({len(decoded)} bytes)")
    except Exception as e:
        print(f"Failed {name}: {e}")

print("Done")

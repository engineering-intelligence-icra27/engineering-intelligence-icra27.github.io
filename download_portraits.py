#!/usr/bin/env python3
"""Optionally localize the public profile images; no third-party packages needed."""
from pathlib import Path
from urllib.request import Request, urlopen
from html import escape
import json
import sys

root = Path(__file__).resolve().parent
people = json.loads((root / 'people.json').read_text())
index_path = root / 'index.html'
html = index_path.read_text()
destination = root / 'assets' / 'portraits'
destination.mkdir(parents=True, exist_ok=True)
failed = []

for person in people['speakers'] + people['organizers']:
    source = person['image']
    try:
        request = Request(source, headers={'User-Agent': 'Mozilla/5.0 (Workshop website portrait preparation)'})
        with urlopen(request, timeout=25) as response:
            content_type = response.headers.get_content_type()
            data = response.read(15 * 1024 * 1024 + 1)
        if len(data) > 15 * 1024 * 1024:
            raise ValueError('Image exceeds the 15 MB limit')
        if data.startswith(b'\xff\xd8\xff'):
            suffix = '.jpg'
        elif data.startswith(b'\x89PNG\r\n\x1a\n'):
            suffix = '.png'
        elif data.startswith(b'RIFF') and data[8:12] == b'WEBP':
            suffix = '.webp'
        else:
            raise ValueError(f'Unexpected image format ({content_type})')
        image_path = destination / (person['id'] + suffix)
        image_path.write_bytes(data)
        local_source = image_path.relative_to(root).as_posix()
        html = html.replace('src="' + escape(source, quote=True) + '"', 'src="' + local_source + '"')
        print(f"Saved {person['name']}: {local_source}")
    except Exception as error:
        failed.append(person['name'])
        print(f"Kept remote portrait for {person['name']}: {error}", file=sys.stderr)

index_path.write_text(html)
total = len(people['speakers']) + len(people['organizers'])
print(f'Localized {total - len(failed)} of {total} portraits. Source credits remain in the page.')
if failed:
    sys.exit(1)

import json
from pathlib import Path

base = Path('source-extracts/batch-7/drive-metadata')
for path in sorted(base.glob('*.json')):
    data = json.loads(path.read_text())
    files = data.get('files', []) if isinstance(data, dict) else []
    if not files:
        if isinstance(data, dict) and data.get('mimeType') == 'application/pdf':
            files = [data]
    for f in files:
        if f.get('mimeType') == 'application/pdf':
            print(path.name, f.get('id'), f.get('name'))

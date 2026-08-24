import json
from pathlib import Path

src = Path('/tmp/batch8-grid.json')
data = json.loads(src.read_text())
result = []

def walk(obj, path=''):
    if isinstance(obj, dict):
        if 'hyperlink' in obj:
            result.append({'path': path, 'hyperlink': obj['hyperlink']})
        if 'textFormatRuns' in obj:
            for i, run in enumerate(obj['textFormatRuns']):
                fmt = run.get('format', {})
                if 'link' in fmt:
                    result.append({'path': f'{path}.textFormatRuns[{i}]', 'link': fmt['link']})
        for key, value in obj.items():
            walk(value, f'{path}.{key}' if path else key)
    elif isinstance(obj, list):
        for i, value in enumerate(obj):
            walk(value, f'{path}[{i}]')

walk(data)
out = Path('source-extracts/batch-8-grid-links.json')
out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
for item in result:
    print(item)

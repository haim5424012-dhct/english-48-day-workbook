import json
from pathlib import Path

src = Path('/tmp/batch7-grid.json')
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
        for k, v in obj.items():
            walk(v, f'{path}.{k}' if path else k)
    elif isinstance(obj, list):
        for i, v in enumerate(obj):
            walk(v, f'{path}[{i}]')

walk(data)
out = Path('source-extracts/batch-7-grid-links.json')
out.write_text(json.dumps(result, ensure_ascii=False, indent=2) + '\n')
for item in result:
    print(item)

import json
from pathlib import Path

path = Path('source-extracts/batch-7-sheet-rows.json')
data = json.loads(path.read_text())
print('type:', type(data).__name__)
if isinstance(data, dict):
    print('keys:', list(data.keys()))
    for key, value in data.items():
        if isinstance(value, list):
            print('list key:', key, 'length:', len(value))
            print(json.dumps(value[-24:], ensure_ascii=False, indent=2))
            break
else:
    print(json.dumps(data[-24:], ensure_ascii=False, indent=2))

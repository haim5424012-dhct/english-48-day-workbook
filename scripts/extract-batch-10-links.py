import json
import re
from pathlib import Path

root = Path('/home/ubuntu/english-48-day-workbook')
raw = json.loads((root / 'source-extracts/batch-10/sheet-grid.json').read_text(encoding='utf-8'))
rows = raw.get('sheets', [{}])[0].get('data', [{}])[0].get('rowData', [])
items = []
for offset in range(0, 9, 3):
    heading_row = 137 + offset
    block = rows[offset:offset + 3]
    texts, links = [], []
    for row in block:
        for cell in row.get('values', []):
            value = cell.get('effectiveValue', {})
            text = value.get('stringValue') or value.get('numberValue')
            if text is not None:
                texts.append(str(text))
            link = cell.get('effectiveFormat', {}).get('textFormat', {}).get('link', {}).get('uri')
            if link:
                links.append(link)
    heading = next((t for t in texts if re.search(r'NGÀY\s*([0-9]+)', t, re.I)), '')
    match = re.search(r'NGÀY\s*([0-9]+)', heading, re.I)
    day = int(match.group(1)) if match else None
    title = heading.split('.', 1)[1].strip() if '.' in heading else heading
    items.append({'day': day, 'title': title, 'headingRow': heading_row, 'texts': texts, 'links': links})
(root / 'source-extracts/batch-10/sheet-links.json').write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(items, ensure_ascii=False, indent=2))

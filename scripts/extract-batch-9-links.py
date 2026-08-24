import json
import re
from pathlib import Path
from urllib.parse import urlparse

root = Path('/home/ubuntu/english-48-day-workbook')
raw = json.loads((root / 'source-extracts/batch-9/sheet-grid.json').read_text(encoding='utf-8'))
rows = raw.get('sheets', [{}])[0].get('data', [{}])[0].get('rowData', [])
# Grid is requested from row 122 (1-indexed); preserve empty rows and use displayed values.
items = []
for offset in range(0, 15, 3):
    heading = 122 + offset
    block = rows[offset:offset + 3]
    texts = []
    links = []
    for row in block:
        for cell in row.get('values', []):
            ev = cell.get('effectiveValue', {})
            text = ev.get('stringValue') or ev.get('numberValue')
            if text is not None:
                texts.append(str(text))
            fmt = cell.get('effectiveFormat', {})
            link = fmt.get('textFormat', {}).get('link', {}).get('uri')
            if link:
                links.append(link)
    heading_text = next((t for t in texts if re.search(r'NGÀY\s*([0-9]+)', t, re.IGNORECASE)), '')
    match = re.search(r'NGÀY\s*([0-9]+)', heading_text, re.IGNORECASE)
    day = int(match.group(1)) if match else None
    title = next((t for t in texts if t.lower().startswith('ngày ') and day is not None), 'Chưa đọc được chủ đề gốc từ Sheet')
    if title.startswith('NGÀY '):
        title = title.split('.', 1)[1].strip() if '.' in title else title
    # Source columns are ordered by the Sheet layout; retain all links for manual audit.
    items.append({'day': day, 'title': title, 'headingRow': heading, 'texts': texts, 'links': links})
(root / 'source-extracts/batch-9/sheet-links.json').write_text(json.dumps(items, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(items, ensure_ascii=False, indent=2))

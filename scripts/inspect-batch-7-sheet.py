import json
from pathlib import Path

src = Path('/tmp/batch7-sheet.json')
out = Path('source-extracts/batch-7-sheet-rows.json')
out.parent.mkdir(parents=True, exist_ok=True)
data = json.loads(src.read_text())
rows = data.get('values', [])
selected = []
for i, row in enumerate(rows, start=1):
    if 88 <= i <= 108:
        selected.append({'sheet_row': i, 'values': row})
out.write_text(json.dumps({'source': 'Google Sheet values API', 'sheet': '48 NGÀY LẤY  GỐC TIẾNG ANH TOÀN DIỆN', 'rows': selected}, ensure_ascii=False, indent=2) + '\n')
for item in selected:
    print(f"ROW {item['sheet_row']}: ", ' | '.join(str(x) for x in item['values']))

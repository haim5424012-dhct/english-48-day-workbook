import json
from pathlib import Path

root = Path('/home/ubuntu/english-48-day-workbook')
items = json.loads((root / 'source-extracts/batch-10/sheet-links.json').read_text(encoding='utf-8'))
manifest = {
    'spreadsheetId': '1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI',
    'sheetTitle': '48 NGÀY LẤY  GỐC TIẾNG ANH TOÀN DIỆN',
    'retrievedAt': '2026-08-24',
    'sheetRange': 'A137:H145',
    'days': []
}
for item in items:
    links = item['links']
    manifest['days'].append({
        'day': item['day'],
        'title': item['title'].title(),
        'rows': {'heading': item['headingRow'], 'lesson': item['headingRow'] + 1, 'online': item['headingRow'] + 2},
        'sources': {
            'fileDe': links[0] if len(links) > 0 else None,
            'baiHoc': links[1] if len(links) > 1 else None,
            'fileDeOnline': links[2] if len(links) > 2 else None,
            'dapAn': links[3] if len(links) > 3 else None,
        },
    })
(root / 'source-extracts/batch-10-source-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(manifest, ensure_ascii=False, indent=2))

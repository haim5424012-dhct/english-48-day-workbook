import json
from pathlib import Path

data = json.loads(Path('/tmp/batch8-grid.json').read_text())
for sheet in data.get('sheets', []):
    props = sheet.get('properties', {})
    print('SHEET', props.get('title'))
    row_data = sheet.get('data', [{}])[0].get('rowData', [])
    start = int(sheet.get('data', [{}])[0].get('startRow', 0)) + 1
    for offset, row in enumerate(row_data):
        values = row.get('values', [])
        texts = []
        links = []
        for col, cell in enumerate(values, start=1):
            text = cell.get('formattedValue') or cell.get('userEnteredValue', {}).get('stringValue') or ''
            if text:
                texts.append(f'{col}:{text.replace(chr(10), " / ")}')
            if cell.get('hyperlink'):
                links.append(f'{col}:{cell["hyperlink"]}')
        if texts or links:
            print(f'ROW {start + offset}:', ' | '.join(texts))
            for link in links:
                print('  LINK', link)

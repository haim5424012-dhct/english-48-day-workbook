import json
from pathlib import Path

for path in [Path('/home/ubuntu/english-48-day-workbook/data/days.json'), Path('/home/ubuntu/english-48-day-workbook/client/src/data/days.json')]:
    data = json.loads(path.read_text(encoding='utf-8'))
    for day in data['days']:
        if day.get('status') == 'pending-source' and not day.get('sourceNote'):
            day['sourceNote'] = 'Chưa đọc được nguồn gốc trong phạm vi đợt hiện tại; không tự bịa chủ đề hoặc nội dung thay thế.'
    path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(path)

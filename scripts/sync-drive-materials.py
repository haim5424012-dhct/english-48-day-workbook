import json
from pathlib import Path

source = Path('/tmp/ai-source-files.json')
out = Path('client/src/data/drive-materials.json')
items = json.loads(source.read_text())['files']


def category(name: str) -> str:
    n = name.lower()
    if 'prompt' in n:
        return 'Prompt & trợ giảng'
    if 'sáng kiến' in n or 'skkn' in n:
        return 'Sáng kiến kinh nghiệm'
    if 'notebooklm' in n:
        return 'NotebookLM'
    if 'tập huấn' in n or 'giáo trình' in n or 'giáo dục' in n or 'dạy học' in n:
        return 'AI trong dạy học'
    if 'ebook' in n or 'kiếm tiền' in n or 'thu nhập' in n or 'threads' in n or 'văn phòng' in n:
        return 'Ebook & ứng dụng'
    return 'Tài liệu tham khảo'

normalized = []
for item in sorted(items, key=lambda x: x['name'].casefold()):
    normalized.append({
        'id': item['id'],
        'name': item['name'],
        'mimeType': item.get('mimeType', ''),
        'size': int(item.get('size', 0) or 0),
        'modifiedTime': item.get('modifiedTime', ''),
        'webViewLink': item.get('webViewLink', f"https://drive.google.com/file/d/{item['id']}/view"),
        'category': category(item['name']),
        'format': 'PDF' if item.get('mimeType') == 'application/pdf' else 'DOCX' if 'wordprocessingml' in item.get('mimeType', '') else 'DOC' if item.get('mimeType') == 'application/msword' else 'JSON' if item.get('mimeType') == 'application/json' else 'Tệp',
    })

payload = {
    'sourceFolderId': '1k7jjsRrZDa-eExOX5YR6ldy7_QT05ZLO',
    'sourceFolderName': 'AI TRONG GIÁO DỤC',
    'syncedAt': '2026-08-25',
    'count': len(normalized),
    'totalBytes': sum(item['size'] for item in normalized),
    'note': 'Catalog metadata được đồng bộ từ Google Drive. Tệp gốc vẫn lưu trên Drive; website mở liên kết Drive thay vì nhúng tệp lớn vào bundle.',
    'items': normalized,
}
out.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + '\n')
print(f'Wrote {len(normalized)} materials to {out}')

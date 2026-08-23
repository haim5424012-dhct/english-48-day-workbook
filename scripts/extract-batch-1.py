from pathlib import Path
from bs4 import BeautifulSoup
import re

ROOT = Path('/home/ubuntu/english_learning_project/materials')
OUT = Path('/home/ubuntu/english-48-day-workbook/source-extracts/batch-1')
OUT.mkdir(parents=True, exist_ok=True)

for day in range(1, 6):
    src = ROOT / f'ngay_{day:02d}'
    out = OUT / f'ngay-{day:02d}.md'
    chunks = [f'# Nguồn trích xuất Ngày {day}\n']
    for path in sorted(src.iterdir()):
        if path.suffix.lower() == '.txt':
            text = path.read_text(encoding='utf-8', errors='ignore')
            chunks.append(f'\n## {path.name}\n\n{text[:20000]}\n')
        elif path.suffix.lower() == '.html':
            soup = BeautifulSoup(path.read_text(encoding='utf-8', errors='ignore'), 'html.parser')
            text = '\n'.join(line.strip() for line in soup.get_text('\n').splitlines() if line.strip())
            chunks.append(f'\n## {path.name}\n\n{text[:20000]}\n')
    out.write_text('\n'.join(chunks), encoding='utf-8')
    print(out)

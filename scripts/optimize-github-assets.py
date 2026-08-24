from pathlib import Path
from PIL import Image

source = Path('/home/ubuntu/webdev-static-assets')
out = Path('/home/ubuntu/english-48-day-workbook/client/public/assets')
out.mkdir(parents=True, exist_ok=True)

mark = Image.open(source / 'english-workbook-mark.png').convert('RGBA')
mark.thumbnail((512, 512), Image.Resampling.LANCZOS)
mark.save(out / 'english-workbook-mark.png', optimize=True)

hero = Image.open(source / 'english-workbook-hero.png').convert('RGB')
hero.thumbnail((1440, 1000), Image.Resampling.LANCZOS)
hero.save(out / 'english-workbook-hero.jpg', quality=86, optimize=True, progressive=True)

paper = Image.open(source / 'english-workbook-paper-texture.png').convert('RGB')
paper.thumbnail((1600, 1200), Image.Resampling.LANCZOS)
paper.save(out / 'english-workbook-paper-texture.jpg', quality=78, optimize=True, progressive=True)

for path in sorted(out.iterdir()):
    print(f'{path.name}: {path.stat().st_size} bytes')

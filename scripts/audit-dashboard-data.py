import json
import re
from collections import Counter
from pathlib import Path

root = Path('/home/ubuntu/english-48-day-workbook')
data = json.loads((root / 'data/days.json').read_text(encoding='utf-8'))
days = data['days']
keys = Counter()
rows = []
for day in days:
    keys.update(day.keys())
    html = day.get('grammarContent') or ''
    paragraphs = re.findall(r'<p\b[^>]*>(.*?)</p>', html, flags=re.I | re.S)
    labels = re.findall(r'<strong\b[^>]*>(.*?)</strong>', html, flags=re.I | re.S)
    ems = re.findall(r'<em\b[^>]*>(.*?)</em>', html, flags=re.I | re.S)
    rows.append({
        'day': day['day'],
        'title': day.get('title', ''),
        'status': day.get('status'),
        'hasGrammar': bool(html.strip()),
        'grammarParagraphs': len(paragraphs),
        'grammarLabels': len(labels),
        'emTerms': len(ems),
        'srsCards': len(day.get('srsCards') or []),
        'hasVocabularyField': 'vocabulary' in day,
        'hasExplicitGrammarField': 'grammarContent' in day,
    })
summary = {
    'totalDays': len(days),
    'dayMin': min(d['day'] for d in days),
    'dayMax': max(d['day'] for d in days),
    'daysWithGrammarContent': sum(r['hasGrammar'] for r in rows),
    'daysWithSrsCards': sum(r['srsCards'] > 0 for r in rows),
    'totalGrammarParagraphs': sum(r['grammarParagraphs'] for r in rows),
    'totalGrammarLabels': sum(r['grammarLabels'] for r in rows),
    'totalItalicTermGroups': sum(r['emTerms'] for r in rows),
    'totalSrsCards': sum(r['srsCards'] for r in rows),
    'hasExplicitVocabularyField': any(r['hasVocabularyField'] for r in rows),
    'keys': sorted(keys),
    'rows': rows,
}
(root / 'data/dashboard-audit.json').write_text(json.dumps(summary, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(json.dumps(summary, ensure_ascii=False, indent=2))

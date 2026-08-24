import fs from 'node:fs';

const input = '/home/ubuntu/english-48-day-workbook/source-extracts/batch-5-sheet-raw.json';
const output = '/home/ubuntu/english-48-day-workbook/source-extracts/batch-5-source-manifest.json';
const book = JSON.parse(fs.readFileSync(input, 'utf8'));
const rows = book.sheets?.[0]?.data?.[0]?.rowData ?? [];
const out = [];
let currentDay = null;
let currentTitle = '';
for (let i = 0; i < rows.length; i += 1) {
  const cells = rows[i]?.values ?? [];
  const values = cells.map((cell) => ({
    text: cell.formattedValue ?? '',
    link: cell.hyperlink ?? cell.textFormat?.link?.uri ?? '',
  }));
  const heading = values[0]?.text.match(/^NGÀY\s+(\d+)\.\s*(.*)$/i);
  if (heading) {
    currentDay = Number(heading[1]);
    currentTitle = heading[2].trim();
    continue;
  }
  if (!currentDay || currentDay < 21 || currentDay > 25) continue;
  const label = values[0]?.text.trim() ?? '';
  const links = values.filter((cell) => cell.link);
  if (label === '1' && links.length) {
    out.push({ day: currentDay, sheetRow: i + 1, kind: 'lesson', title: currentTitle, links });
  } else if (label === '2' && links.length) {
    out.push({ day: currentDay, sheetRow: i + 1, kind: 'online-test-and-answer', title: currentTitle, links });
  }
}
fs.writeFileSync(output, JSON.stringify({ spreadsheetId: '1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI', sheet: book.sheets?.[0]?.properties?.title ?? '', rows: out }, null, 2) + '\n');
console.log(`Wrote ${out.length} manifest rows to ${output}`);
for (const row of out) console.log(`${row.day}\t${row.sheetRow}\t${row.kind}\t${row.links.map((x) => x.link).join(' | ')}`);

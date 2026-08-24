import fs from "node:fs";

const inputPath = "source-extracts/batch-4-sheet-grid.json";
const outputPath = "source-extracts/batch-4-source-manifest.json";
const spreadsheetId = "1xP0Ltw0ydYaLFeJal4w8ma36HdvoYpbfCt8Jmt5PcsI";
const sheetName = "48 NGÀY LẤY  GỐC TIẾNG ANH TOÀN DIỆN";
const payload = JSON.parse(fs.readFileSync(inputPath, "utf8"));
const rows = payload.sheets?.[0]?.data?.[0]?.rowData ?? [];
const rangeStartRow = 47;

function unwrapGoogleUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    const wrapped = parsed.searchParams.get("q");
    return wrapped ? decodeURIComponent(wrapped) : url;
  } catch {
    return url;
  }
}

function cellLink(cell) {
  const direct = cell?.hyperlink;
  if (direct) return unwrapGoogleUrl(direct);
  const run = (cell?.textFormatRuns ?? []).find((item) => item.format?.link?.uri);
  return unwrapGoogleUrl(run?.format?.link?.uri ?? null);
}

function rowCells(row) {
  return (row.values ?? []).map((cell, index) => ({
    column: String.fromCharCode(65 + index),
    label: cell.formattedValue ?? "",
    url: cellLink(cell),
  }));
}

const selected = [];
for (let index = 0; index < rows.length; index += 1) {
  const cells = rowCells(rows[index]);
  const first = cells.find((cell) => cell.column === "A")?.label ?? "";
  const heading = first.match(/^NGÀY\s+(1[6-9]|20)\.\s*(.*)$/i);
  if (!heading) continue;
  const day = Number(heading[1]);
  const title = heading[2].trim();
  const sourceRows = [];
  for (let offset = 1; offset <= 2; offset += 1) {
    const sourceIndex = index + offset;
    if (!rows[sourceIndex]) continue;
    const sourceCells = rowCells(rows[sourceIndex]);
    sourceRows.push({
      sheetRow: rangeStartRow + sourceIndex,
      label: sourceCells.find((cell) => cell.column === "B")?.label ?? "",
      links: sourceCells.filter((cell) => cell.url).map((cell) => ({ column: cell.column, label: cell.label, url: cell.url })),
    });
  }
  selected.push({ day, title, headingSheetRow: rangeStartRow + index, sourceRows });
}

const manifest = {
  spreadsheetId,
  sheetName,
  retrievedAt: new Date().toISOString(),
  sourceRows: selected,
};
fs.writeFileSync(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(JSON.stringify(manifest, null, 2));

#!/usr/bin/env bash
set -u
ROOT="/home/ubuntu/english-48-day-workbook"
IN="$ROOT/source-extracts/batch-5/originals"
OUT="$ROOT/source-extracts/batch-5/text"
mkdir -p "$OUT"
for pdf in "$IN"/day-*.pdf; do
  base=$(basename "$pdf" .pdf)
  pdftotext -layout "$pdf" "$OUT/$base.txt"
  pdfinfo "$pdf" | awk -F: '/^Pages|^Title|^Author|^CreationDate/ {gsub(/^ +/,"",$2); print $1"\t"$2}' > "$IN/$base.metadata.txt"
done
printf 'Extracted text files:\n'
find "$OUT" -maxdepth 1 -type f -printf '%f\t%s bytes\n' | sort

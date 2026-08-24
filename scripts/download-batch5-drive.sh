#!/usr/bin/env bash
set -u
ROOT="/home/ubuntu/english-48-day-workbook"
OUT="$ROOT/source-extracts/batch-5/originals"
mkdir -p "$OUT"
: > "$OUT/download-errors.tsv"
files=(
  "21 lesson 1XLEq1KYlugZyfU-DKrm3s3faCsUy_jvf"
  "21 online 1pIoWVO4jpxYsMDXoBnS8RNzz7Sq8d4lh"
  "22 lesson 16NJq-PKx9rquM6FkJGDyFmygAb8L5RtB"
  "22 online 1gE9xnSQc8nz4LU12lrb9Wk5s9DPso18a"
  "23 lesson 1JGEOYNq1t5eDl8WotDAFfVFF_l7WQINB"
  "23 online 10v9WBBMvqODwPnnUG1OqLHpswtsaY8vc"
  "24 lesson 1dKaMyn2kUrtkzb6wEdJ6LsA9beUUWiQ6"
  "24 online 1ZY_tZwhKG_80TzTYoQaCv4nhjTyhP72z"
  "25 lesson 1yAij7cNAJ-iTDdgj2jutWA8TdI5MAOkm"
  "25 online 1Wsp5a0oknUMxW3GBxKUcJBE5jA4BqJol"
)
for entry in "${files[@]}"; do
  read -r day kind id <<< "$entry"
  out="$OUT/day-$day-$kind.pdf"
  echo "Downloading day $day $kind ($id)"
  if ! gws drive files get --params "{\"fileId\":\"$id\",\"alt\":\"media\"}" --output "source-extracts/batch-5/originals/day-$day-$kind.pdf"; then
    printf '%s\t%s\t%s\n' "$day" "$kind" "$id" >> "$OUT/download-errors.tsv"
    rm -f "$out"
  fi
done
printf '\nDownloaded files:\n'
find "$OUT" -maxdepth 1 -name 'day-*.pdf' -printf '%f\t%s bytes\n' | sort
printf '\nErrors:\n'
cat "$OUT/download-errors.tsv"

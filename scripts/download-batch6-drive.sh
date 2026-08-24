#!/usr/bin/env bash
set -u
ROOT="${WORKBOOK_ROOT:-/home/ubuntu/english-48-day-workbook}"
OUT="$ROOT/source-extracts/batch-6/originals"
mkdir -p "$OUT"

# Chỉ tải PDF; không tải audio/video gốc.
declare -a ITEMS=(
  "day-26-lesson|1CJjOurAqn2aDM7XKNosJUB7YrHoBLyXm"
  "day-26-online|1-L_pGqs495exoAyxsCI4ytH5CuUlnSDf"
  "day-27-lesson|1UV527fRZktSUT1s0JBlQEhyCrrtkv69k"
  "day-27-online|1sW3HVRcztpcCyQTEozyflelQKjse2N2_"
  "day-28-lesson|1OrwXqislIj56e6BKS6pKbBWDzV3UNh7j"
  "day-28-online|1nRwAXWCVZ8kgahPPhAuGe2-UUdhdnieq"
  "day-29-lesson|1yzLHiY0FGHR_eq5E1bPw-SbpjP_ToqGz"
  "day-29-online|1AhiE3aYmotGVWrx5R0J4lEBlAvQywpGN"
  "day-30-lesson|1Uoy2jlOufDsZPJ3OnU61h6a-kKshDByH"
  "day-30-online|1RYy46iP1U92FQZondBLlAi4ZxxMb8Guu"
)

: > "$ROOT/source-extracts/batch-6/download-status.tsv"
for item in "${ITEMS[@]}"; do
  name="${item%%|*}"
  id="${item##*|}"
  out="$OUT/$name.pdf"
  if gws drive files get --params "{\"fileId\":\"$id\",\"alt\":\"media\"}" --output "$out" >/tmp/batch6-download.log 2>&1; then
    printf '%s\t%s\t%s\t%s\n' "$name" "$id" "downloaded" "$out" >> "$ROOT/source-extracts/batch-6/download-status.tsv"
  else
    printf '%s\t%s\t%s\t%s\n' "$name" "$id" "blocked-or-missing" "$(tr '\n' ' ' </tmp/batch6-download.log)" >> "$ROOT/source-extracts/batch-6/download-status.tsv"
  fi
done
cat "$ROOT/source-extracts/batch-6/download-status.tsv"

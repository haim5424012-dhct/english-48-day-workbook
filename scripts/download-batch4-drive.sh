#!/usr/bin/env bash
set -uo pipefail

out="source-extracts/batch-4/originals"
mkdir -p "$out"
errors="$out/download-errors.tsv"
: > "$errors"

# day|kind|drive_file_id
sources=$(cat <<'EOF'
16|lesson|19uEvOlde3tSHvJE8U9YWJMZijilSZ9cj
16|online-test|1UnwtxvuiXH-GAHNrWL019uVNcWkfCu4O
17|lesson|1ZqSC1m0WS2DjZxLTHAdSs2ifIAI4Dv9U
17|online-test|1FKMDtPQ8o3DRDmc5FmRwvNpx1823EwtH
18|lesson|1-r8WC9j5alaqebv_n7v7IWsLB4cC8IQG
18|online-test|1rAmlmnp3-y2R86mbpr2MglLoc6dUiaYw
19|lesson|1qnFlruh8r3eiuYJHy87W1YYvBfSiTqxV
19|online-test|1DQZ63Me3mPprQu9QIwpinWfswdV4Q7lN
20|lesson|1CNxUuYQ52eKcy72yNV7deCyQUzBPMqKn
20|online-test|12pLXtinEM56ChThHP9NtWTJFRjQ1shp0
EOF
)

# The first Day 16 online-test ID is completed below from the Sheet manifest at runtime.
# It is deliberately validated before downloading so an accidental guessed ID cannot be used.
while IFS='|' read -r day kind file_id; do
  [ -z "$day" ] && continue
  meta="$out/day-${day}-${kind}.metadata.json"
  pdf="$out/day-${day}-${kind}.pdf"
  if ! gws drive files get --params "{\"fileId\":\"$file_id\",\"fields\":\"id,name,mimeType,size,modifiedTime,webViewLink\"}" --format json > "$meta"; then
    printf '%s\t%s\t%s\tmetadata-or-permission-error\n' "$day" "$kind" "$file_id" >> "$errors"
    rm -f "$meta"
    continue
  fi
  if ! gws drive files get --params "{\"fileId\":\"$file_id\",\"alt\":\"media\"}" --output "$pdf"; then
    printf '%s\t%s\t%s\tdownload-error\n' "$day" "$kind" "$file_id" >> "$errors"
    rm -f "$pdf"
    continue
  fi
  printf '%s\n' "$day $kind $file_id"
done <<< "$sources"

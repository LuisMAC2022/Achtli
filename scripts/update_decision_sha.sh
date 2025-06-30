#!/usr/bin/env bash
# Script to replace the placeholder in a decision file with the given commit SHA.
# Usage: ./scripts/update_decision_sha.sh decisiones/20250630-file.md [commit]
# If the commit SHA is not provided, the script uses the latest commit (HEAD).
set -e

if [ $# -lt 1 ]; then
  echo "Usage: $0 <decision_file> [commit]" >&2
  exit 1
fi

FILE="$1"
SHA="${2:-$(git rev-parse HEAD)}"

if [ ! -f "$FILE" ]; then
  echo "File not found: $FILE" >&2
  exit 1
fi

tmp=$(mktemp)
awk -v sha="$SHA" '{
  print $0
  if ($0 ~ /^###SHA$/) {
    getline
    print sha
  }
}' "$FILE" > "$tmp"

mv "$tmp" "$FILE"

echo "Updated $FILE with SHA $SHA"


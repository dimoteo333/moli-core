#!/bin/bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_DIR="$(basename "$SCRIPT_DIR")"
cd "$(dirname "$SCRIPT_DIR")"

# version from package.json
VERSION=$(node -e "console.log(require('$SCRIPT_DIR/package.json').version)")
OUTPUT="${PROJECT_DIR}-v${VERSION}.tar.gz"

echo "📦 Packaging ${PROJECT_DIR} v${VERSION}..."
tar czf "$OUTPUT" \
  --exclude='.git' \
  --exclude='*.tar.gz' \
  "$PROJECT_DIR/"

SIZE=$(du -sh "$OUTPUT" | cut -f1)
echo "✅ Created: $OUTPUT ($SIZE)"
echo "   Path: $(pwd)/$OUTPUT"

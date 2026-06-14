#!/bin/bash
# Bootstrap et nyt projekt med PM-platform-core fra claudeproject.
# Kørsel: bash /sti/til/claudeproject/bootstrap.sh /sti/til/nyt-projekt

set -e

SOURCE="$(cd "$(dirname "$0")" && pwd)"
TARGET="${1:?Angiv målmappe: bash bootstrap.sh /sti/til/nyt-projekt}"

echo "Kopierer PM-platform-core til: $TARGET"

mkdir -p "$TARGET"

# Agents
cp -r "$SOURCE/agents" "$TARGET/"

# Bundles og custom skills
mkdir -p "$TARGET/.claude/skills"
cp -r "$SOURCE/.claude/skills/bundles" "$TARGET/.claude/skills/"
cp -r "$SOURCE/.claude/skills/custom"  "$TARGET/.claude/skills/"

# Slash commands
cp -r "$SOURCE/.claude/commands" "$TARGET/.claude/"

# Base CLAUDE.md — kopieres kun hvis der ikke allerede er én
if [ ! -f "$TARGET/CLAUDE.md" ]; then
  cp "$SOURCE/CLAUDE.md" "$TARGET/CLAUDE.md"
  echo "CLAUDE.md kopieret — tilpas rolle og formål til projektet."
else
  echo "CLAUDE.md findes allerede — springer over."
fi

# Projektstruktur
mkdir -p "$TARGET/docs" "$TARGET/output" "$TARGET/research"

echo ""
echo "Færdig. Næste skridt:"
echo "  1. Tilpas $TARGET/CLAUDE.md til projektets rolle og formål"
echo "  2. cd $TARGET && git init && git add . && git commit -m 'Init fra PM-platform-core'"

#!/bin/bash
# bootstrap.sh — Sæt PM Platform op på en ny maskine
#
# Kør fra projektets rod:
#   bash .claude/bootstrap.sh
#
# Hvad scriptet gør:
#   1. Installerer install-skill-bundle globalt i ~/.local/bin/
#   2. Tilføjer ~/.local/bin til PATH i ~/.zshrc (hvis ikke allerede der)
#   3. Installerer globale skills der skal være tilgængelige i alle projekter

set -e

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
BIN_SOURCE="$REPO_DIR/.claude/bin/install-skill-bundle"
BIN_DEST="$HOME/.local/bin/install-skill-bundle"
ZSHRC="$HOME/.zshrc"

echo ""
echo "PM Platform — Bootstrap"
echo "========================"

# 1. Installér install-skill-bundle
echo ""
echo "▸ Installerer install-skill-bundle..."
mkdir -p "$HOME/.local/bin"
cp "$BIN_SOURCE" "$BIN_DEST"
chmod +x "$BIN_DEST"
echo "  ✓ $BIN_DEST"

# 2. Tilføj ~/.local/bin til PATH i .zshrc
echo ""
echo "▸ Tjekker PATH i ~/.zshrc..."
if grep -q 'local/bin' "$ZSHRC" 2>/dev/null; then
  echo "  ✓ ~/.local/bin allerede i PATH"
else
  echo '' >> "$ZSHRC"
  echo '# Lokale scripts (bl.a. install-skill-bundle)' >> "$ZSHRC"
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$ZSHRC"
  echo "  ✓ Tilføjet til ~/.zshrc"
fi

# Aktiver PATH i den aktuelle session
export PATH="$HOME/.local/bin:$PATH"

# 3. Installér globale skills
echo ""
echo "▸ Installerer globale skills..."
echo "  (Disse er tilgængelige i alle projekter uden projektinstallation)"
echo ""

GLOBAL="--global"

install_global() {
  echo "  → $*"
  npx skills add $GLOBAL "$@" 2>&1 | grep -E "Done|Error|No valid" || true
}

# Meta — altid nyttige uanset projekt
echo "  [meta]"
install_global vercel-labs/skills --skill find-skills
install_global mattpocock/skills --skill grill-with-docs
install_global mattpocock/skills --skill zoom-out
install_global obra/superpowers --skill executing-plans

# Output-styring
echo ""
echo "  [output]"
install_global https://github.com/Leonxlnx/taste-skill --skill full-output-enforcement

# Arkitektur & kodekvalitet
echo ""
echo "  [architecture]"
install_global mattpocock/skills --skill improve-codebase-architecture
install_global mattpocock/skills --skill tdd
install_global mattpocock/skills --skill diagnose
install_global mattpocock/skills --skill to-issues
install_global mattpocock/skills --skill to-prd

# Frontend & design
echo ""
echo "  [frontend]"
install_global anthropics/skills --skill frontend-design
install_global vercel-labs/agent-skills --skill web-design-guidelines
install_global jakubkrehel/make-interfaces-feel-better --skill make-interfaces-feel-better
install_global emilkowalski/skill --skill emil-design-eng
install_global wondelai/skills/refactoring-ui
install_global pbakaus/impeccable
install_global NTCoding/claude-skillz/data-visualization

# Web-kvalitet
echo ""
echo "  [web-quality]"
install_global addyosmani/web-quality-skills

echo ""
echo "========================"
echo "✓ Bootstrap færdig."
echo ""
echo "Kør følgende for at aktivere PATH i den aktuelle terminal:"
echo "  source ~/.zshrc"
echo ""
echo "Herefter kan du installere projekt-specifikke skills med:"
echo "  install-skill-bundle pm"
echo "  install-skill-bundle pm-metrics"
echo "  install-skill-bundle gtm"
echo "  install-skill-bundle presentation"
echo "  install-skill-bundle --help"
echo ""

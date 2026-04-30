#!/usr/bin/env bash
# =============================================================================
# Z Protocol — push the design system + scan to GitHub as two private repos.
#
# What this script does:
#   1. Sanity-checks that `gh` is installed and authenticated
#   2. Copies apps/scan/ to a sibling folder ~/Documents/.../Zed/z-scan
#   3. Initializes z-scan, creates github.com/protocol-z/z-scan (private), pushes
#   4. Strips apps/scan from the design-system tree (it now lives in z-scan)
#   5. Initializes z-design-system, creates github.com/protocol-z/z-design-system
#      (private), pushes
#
# Run it from anywhere — paths are absolute.
# =============================================================================
set -euo pipefail

# ----- Config ----------------------------------------------------------------
ORG="protocol-z"
DS_REPO="z-design-system"
SCAN_REPO="z-scan"
ZED_DIR="$HOME/Documents/MH/MHJ-Design/Vibes/Zed"
DS_DIR="$ZED_DIR/$DS_REPO"
SCAN_DIR="$ZED_DIR/$SCAN_REPO"

# ----- Helpers ---------------------------------------------------------------
say() { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()  { printf "  \033[1;32m✓\033[0m %s\n" "$*"; }
warn() { printf "  \033[1;33m!\033[0m %s\n" "$*"; }
die()  { printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

confirm() {
  read -r -p "  Continue? [y/N] " ans
  [[ "$ans" =~ ^[Yy]$ ]] || die "Aborted by user."
}

# ----- Preflight -------------------------------------------------------------
say "Preflight checks"

command -v gh >/dev/null || die "GitHub CLI (gh) not found. Install: brew install gh"
ok "gh CLI present ($(gh --version | head -1))"

if ! gh auth status >/dev/null 2>&1; then
  die "gh is not authenticated. Run: gh auth login"
fi
ok "gh authenticated as: $(gh api user --jq .login)"

[[ -d "$DS_DIR" ]] || die "Design system folder not found: $DS_DIR"
ok "Found design system: $DS_DIR"

[[ -d "$DS_DIR/apps/scan" ]] || die "Scan app folder not found: $DS_DIR/apps/scan"
ok "Found scan app: $DS_DIR/apps/scan"

if [[ -e "$SCAN_DIR" ]]; then
  warn "Sibling folder already exists at $SCAN_DIR"
  warn "It will be left alone — extraction will fail if it has content."
fi

# Confirm what's about to happen
echo
echo "About to:"
echo "  1. Copy   $DS_DIR/apps/scan/  →  $SCAN_DIR/"
echo "  2. Create + push  github.com/$ORG/$SCAN_REPO  (private)"
echo "  3. Remove $DS_DIR/apps/scan/"
echo "  4. Create + push  github.com/$ORG/$DS_REPO   (private)"
echo
confirm

# ----- Step 1 — Extract scan to its own folder ------------------------------
say "Step 1 — Extracting scan to $SCAN_DIR"

if [[ -e "$SCAN_DIR" && -n "$(ls -A "$SCAN_DIR" 2>/dev/null || true)" ]]; then
  die "$SCAN_DIR already exists and isn't empty. Move it out of the way first."
fi

mkdir -p "$SCAN_DIR"
# Copy contents including hidden files. Trailing /. on the source means "contents of" not "directory itself".
cp -R "$DS_DIR/apps/scan/." "$SCAN_DIR/"
ok "Copied scan to $SCAN_DIR"

# ----- Step 2 — Push z-scan -------------------------------------------------
say "Step 2 — Initialising and pushing $ORG/$SCAN_REPO (private)"

cd "$SCAN_DIR"

# Make sure we're not pushing build artefacts
rm -rf .next node_modules tsconfig.tsbuildinfo 2>/dev/null || true

# Fresh git repo
[[ -d .git ]] && rm -rf .git
git init -b main
git add .
git commit -m "Z Scan — v2 restyle, initial release"

# gh repo create handles repo creation + remote + push in one
gh repo create "$ORG/$SCAN_REPO" \
  --private \
  --source=. \
  --remote=origin \
  --push \
  --description "Z Scan — block explorer for Z Protocol. Built on the Z Design System (v2)."

ok "Pushed $ORG/$SCAN_REPO"

# ----- Step 3 — Remove apps/scan from design-system tree --------------------
say "Step 3 — Removing apps/scan from design-system (now lives in $SCAN_REPO)"

cd "$DS_DIR"
rm -rf apps/scan
ok "Removed $DS_DIR/apps/scan"

# Update workspaces — no longer include apps/scan
say "Step 3b — Updating root package.json (drop apps/scan workspace)"
node -e "
  const fs = require('fs');
  const path = '$DS_DIR/package.json';
  const pkg = JSON.parse(fs.readFileSync(path, 'utf8'));
  pkg.workspaces = (pkg.workspaces || []).filter(w => w !== 'apps/scan' && w !== 'apps/*');
  // Drop scan-related scripts
  if (pkg.scripts) {
    delete pkg.scripts['scan:dev'];
    delete pkg.scripts['scan:build'];
    delete pkg.scripts['scan:typecheck'];
  }
  fs.writeFileSync(path, JSON.stringify(pkg, null, 2) + '\n');
  console.log('  ✓ package.json updated');
"

# ----- Step 4 — Push z-design-system ----------------------------------------
say "Step 4 — Initialising and pushing $ORG/$DS_REPO (private)"

# Clean any build/cache before committing
rm -rf node_modules package-lock.json 2>/dev/null || true
find . -name "*.tsbuildinfo" -not -path "*/node_modules/*" -delete 2>/dev/null || true

# Fresh git repo
[[ -d .git ]] && rm -rf .git
git init -b main
git add .
git commit -m "Z Design System v2 (Serene System) — initial release"

gh repo create "$ORG/$DS_REPO" \
  --private \
  --source=. \
  --remote=origin \
  --push \
  --description "Design system, tokens, and component library for Z Protocol surfaces (v2 / Serene System)."

ok "Pushed $ORG/$DS_REPO"

# ----- Done ------------------------------------------------------------------
say "Done"
echo
echo "  Design system → https://github.com/$ORG/$DS_REPO"
echo "  Scan          → https://github.com/$ORG/$SCAN_REPO"
echo
echo "Next:"
echo "  1. cd $SCAN_DIR && npm install && npm run dev    # local dev with @zds/ui from GitHub"
echo "  2. Set up Vercel projects for both repos for PR previews"
echo "  3. Publish @zds/ui to npm when the API is stable (see GITHUB_HANDOFF.md)"

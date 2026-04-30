#!/usr/bin/env bash
# =============================================================================
# Push the latest changes (brand docs, v2 rename, .bak cleanup) to GitHub.
#
# What this does:
#   1. Sets the git remote on the v2 folder if it's missing
#   2. Removes leftover .bak files
#   3. Commits all pending changes
#   4. Pushes to GitHub
#   5. Same for z-scan
# =============================================================================
set -euo pipefail

ORG="protocol-z"
DS_REPO="z-design-system-v2"
SCAN_REPO="z-scan"
ZED_DIR="$HOME/Documents/MH/MHJ-Design/Vibes/Zed"

say() { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()  { printf "  \033[1;32m✓\033[0m %s\n" "$*"; }
warn() { printf "  \033[1;33m!\033[0m %s\n" "$*"; }
die()  { printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

# ----- Preflight ------------------------------------------------------------
command -v gh >/dev/null || die "gh not installed. brew install gh"
gh auth status >/dev/null 2>&1 || die "gh not authenticated. gh auth login"
ok "gh authenticated"

# ----- Step 1 — Fix the v2 folder's git remote -----------------------------
say "Step 1 — Configuring $DS_REPO remote + pushing pending changes"
cd "$ZED_DIR/$DS_REPO"

current_remote=$(git remote get-url origin 2>/dev/null || echo "")
expected_remote_https="https://github.com/$ORG/$DS_REPO.git"
expected_remote_ssh="git@github.com:$ORG/$DS_REPO.git"

if [[ -z "$current_remote" ]]; then
  # No remote set — pick https as the default since user is using gh CLI
  git remote add origin "$expected_remote_https"
  ok "Added remote: $expected_remote_https"
elif [[ "$current_remote" != "$expected_remote_https" && "$current_remote" != "$expected_remote_ssh" ]]; then
  git remote set-url origin "$expected_remote_https"
  ok "Updated remote: $current_remote → $expected_remote_https"
else
  ok "Remote already correct: $current_remote"
fi

# Remove leftover .bak files
bak_count=$(find "$ZED_DIR/$DS_REPO" "$ZED_DIR/$SCAN_REPO" -name "*.bak" -not -path "*/node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
if [[ "$bak_count" -gt 0 ]]; then
  find "$ZED_DIR/$DS_REPO" "$ZED_DIR/$SCAN_REPO" -name "*.bak" -not -path "*/node_modules/*" -delete
  ok "Removed $bak_count .bak files"
fi

# Stage + commit + push
git add -A
if git diff --cached --quiet; then
  ok "Nothing new to commit in $DS_REPO"
else
  git commit -m "Add brand spec docs (BRAND/VOICE/AESTHETIC), rename references to v2, clean up .bak files"
  ok "Committed"
  git push -u origin main
  ok "Pushed to $ORG/$DS_REPO"
fi

# ----- Step 2 — Same for z-scan ---------------------------------------------
say "Step 2 — Pushing pending changes in $SCAN_REPO"
cd "$ZED_DIR/$SCAN_REPO"

git add -A
if git diff --cached --quiet; then
  ok "Nothing new to commit in $SCAN_REPO"
else
  git commit -m "Use @zds/ui exports for tokens.css; bump Next to 15.5; remove .bak files"
  ok "Committed"
  git push -u origin main
  ok "Pushed to $ORG/$SCAN_REPO"
fi

# ----- Done ------------------------------------------------------------------
say "Done"
echo
echo "  Design system → https://github.com/$ORG/$DS_REPO"
echo "  Scan          → https://github.com/$ORG/$SCAN_REPO"
echo
echo "What's now on GitHub that wasn't before:"
echo "  • docs/BRAND.md, docs/VOICE.md, docs/AESTHETIC.md"
echo "  • All 'z-design-system' → 'z-design-system-v2' references"
echo "  • Cleaned-up file tree (no .bak files)"
echo "  • Bumped Next.js to ^15.5.0 in scan"
echo "  • Tokens import switched to @zds/ui/styles/tokens.css"

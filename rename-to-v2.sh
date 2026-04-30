#!/usr/bin/env bash
# =============================================================================
# Rename the design-system repo to z-design-system-v2.
#
# What this does:
#   1. Renames the GitHub repo:  protocol-z/z-design-system → protocol-z/z-design-system-v2
#   2. Renames the local folder: ~/.../Zed/z-design-system  → ~/.../Zed/z-design-system-v2
#   3. Updates the git remote URL inside the renamed local folder
#   4. Removes the leftover .bak files
#   5. Commits + pushes the file rename changes (already on disk)
#
# Idempotent — safe to re-run if a step fails.
# =============================================================================
set -euo pipefail

ORG="protocol-z"
OLD_NAME="z-design-system"
NEW_NAME="z-design-system-v2"

ZED_DIR="$HOME/Documents/MH/MHJ-Design/Vibes/Zed"
OLD_DIR="$ZED_DIR/$OLD_NAME"
NEW_DIR="$ZED_DIR/$NEW_NAME"

say() { printf "\n\033[1;36m▸ %s\033[0m\n" "$*"; }
ok()  { printf "  \033[1;32m✓\033[0m %s\n" "$*"; }
warn() { printf "  \033[1;33m!\033[0m %s\n" "$*"; }
die()  { printf "\n\033[1;31m✗ %s\033[0m\n" "$*"; exit 1; }

# ----- Preflight ------------------------------------------------------------
say "Preflight checks"
command -v gh >/dev/null || die "GitHub CLI not found. Install: brew install gh"
gh auth status >/dev/null 2>&1 || die "gh not authenticated. Run: gh auth login"
ok "gh authenticated"

# ----- Step 1 — Rename the GitHub repo --------------------------------------
say "Step 1 — Renaming GitHub repo: $ORG/$OLD_NAME → $ORG/$NEW_NAME"

if gh repo view "$ORG/$NEW_NAME" >/dev/null 2>&1; then
  ok "Repo $ORG/$NEW_NAME already exists — skipping rename"
elif gh repo view "$ORG/$OLD_NAME" >/dev/null 2>&1; then
  gh repo rename "$NEW_NAME" --repo "$ORG/$OLD_NAME" --yes
  ok "Renamed on GitHub"
else
  die "Neither $ORG/$OLD_NAME nor $ORG/$NEW_NAME exists. Did the original push succeed?"
fi

# ----- Step 2 — Rename the local folder -------------------------------------
say "Step 2 — Renaming local folder: $OLD_NAME → $NEW_NAME"

if [[ -d "$NEW_DIR" && -d "$OLD_DIR" ]]; then
  die "Both $OLD_DIR and $NEW_DIR exist — resolve manually first"
elif [[ -d "$NEW_DIR" ]]; then
  ok "Local folder already at $NEW_DIR — skipping rename"
elif [[ -d "$OLD_DIR" ]]; then
  mv "$OLD_DIR" "$NEW_DIR"
  ok "Renamed local folder"
else
  die "Neither $OLD_DIR nor $NEW_DIR exists"
fi

# ----- Step 3 — Update git remote URL ---------------------------------------
say "Step 3 — Updating git remote URL"
cd "$NEW_DIR"

current_remote=$(git remote get-url origin 2>/dev/null || echo "")
new_remote_https="https://github.com/$ORG/$NEW_NAME.git"
new_remote_ssh="git@github.com:$ORG/$NEW_NAME.git"

# Pick https or ssh depending on what was already there
if [[ "$current_remote" == git@* ]]; then
  target="$new_remote_ssh"
else
  target="$new_remote_https"
fi

if [[ "$current_remote" == "$target" ]]; then
  ok "Remote already correct: $target"
else
  git remote set-url origin "$target"
  ok "Remote updated: $current_remote → $target"
fi

# ----- Step 4 — Remove leftover .bak files ----------------------------------
say "Step 4 — Removing leftover .bak files"
bak_count=$(find "$NEW_DIR" "$ZED_DIR/z-scan" -name "*.bak" -not -path "*/node_modules/*" 2>/dev/null | wc -l | tr -d ' ')
if [[ "$bak_count" -gt 0 ]]; then
  find "$NEW_DIR" "$ZED_DIR/z-scan" -name "*.bak" -not -path "*/node_modules/*" -delete
  ok "Removed $bak_count .bak files"
else
  ok "No .bak files found"
fi

# ----- Step 5 — Commit + push the file updates ------------------------------
say "Step 5 — Committing + pushing the v2 rename to $ORG/$NEW_NAME"
cd "$NEW_DIR"

if [[ -z "$(git status --porcelain)" ]]; then
  ok "Nothing to commit — repo already in sync"
else
  git add -A
  git commit -m "Rename to z-design-system-v2; clean up .bak artefacts"
  git push origin main
  ok "Pushed updates to $ORG/$NEW_NAME"
fi

# ----- Step 6 — Update z-scan if needed -------------------------------------
say "Step 6 — Pushing z-scan updates (file: path now points at z-design-system-v2)"
SCAN_DIR="$ZED_DIR/z-scan"

if [[ -d "$SCAN_DIR/.git" ]]; then
  cd "$SCAN_DIR"
  if [[ -z "$(git status --porcelain)" ]]; then
    ok "z-scan has no pending changes"
  else
    git add -A
    git commit -m "Point @zds/ui at z-design-system-v2 sibling folder"
    git push origin main
    ok "Pushed z-scan updates"
  fi
else
  warn "z-scan is not a git repo — skipping"
fi

# ----- Done ------------------------------------------------------------------
say "Done"
echo
echo "  Design system → https://github.com/$ORG/$NEW_NAME"
echo "  Scan          → https://github.com/$ORG/z-scan"
echo "  Local design system folder is now: $NEW_DIR"
echo
echo "To run scan locally:"
echo "  cd $SCAN_DIR"
echo "  rm -rf node_modules .next && npm install"
echo "  lsof -ti:4174 | xargs kill -9 2>/dev/null"
echo "  npm run dev"

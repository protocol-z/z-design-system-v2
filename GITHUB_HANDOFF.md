# GitHub repo handoff — split into two repos

This document is for whoever pushes this codebase to GitHub. We're shipping
**two repos** so the design system is reusable across multiple apps:

- **`protocol-z/z-design-system-v2`** — `@zds/ui` package + brand docs. The
  source of truth other apps depend on.
- **`protocol-z/z-scan`** — the block explorer app. Imports `@zds/ui` from
  the design-system repo.

## Why two repos

The design system is the **shared brand spec**. Z Trade, Z Lend, future
apps, and the marketing site will all consume it. Keeping it in its own
repo lets each app pin a stable version of `@zds/ui`, while the
design system can iterate (add components, fix tokens) without dragging
every consuming app along.

The scan app is one consumer. When Z Trade ships, it'll be a third repo
that does the same `npm install @zds/ui` dance.

## Step 1 — Push the design system

```bash
cd ~/Documents/MH/MHJ-Design/Vibes/Zed/z-design-system-v2

# Remove the scan app temporarily — it gets its own repo (Step 2)
mv apps/scan /tmp/z-scan-extract

# Initialise + push
git init -b main
git add .
git commit -m "Z Design System v2 (Serene System) — initial release"
git remote add origin git@github.com:protocol-z/z-design-system-v2.git
git push -u origin main
```

What ships in this repo:

```
z-design-system-v2/
├── .github/workflows/ci.yml       # Typecheck + scan build
├── packages/ui/                   # @zds/ui — the published package
│   ├── src/                       # TSX source + tokens.css
│   ├── package.json               # Public package metadata
│   ├── README.md                  # npm-page README
│   └── .npmignore                 # What to exclude from publish
├── apps/preview/                  # Static HTML reference (v2.html, scan-restyle.html)
├── docs/                          # BRAND.md / VOICE.md / AESTHETIC.md / TOKENS.md / HANDOFF.md
├── brand/                         # Logos, photography direction, archived v1 assets
├── INVENTORY.md                   # Token + component status
├── README.md                      # Repo front page
├── LICENSE                        # MIT
└── package.json                   # Workspace root (no longer references apps/scan)
```

## Step 2 — Push the scan app

```bash
# Re-extract the scan app
mkdir -p ~/Documents/MH/MHJ-Design/Vibes/Zed/z-scan
mv /tmp/z-scan-extract/* /tmp/z-scan-extract/.[!.]* ~/Documents/MH/MHJ-Design/Vibes/Zed/z-scan/
cd ~/Documents/MH/MHJ-Design/Vibes/Zed/z-scan

# Initialise + push
git init -b main
git add .
git commit -m "Z Scan — v2 restyle, initial release"
git remote add origin git@github.com:protocol-z/z-scan.git
git push -u origin main
```

What ships in this repo:

```
z-scan/
├── .github/workflows/ci.yml       # Typecheck + build
├── app/                           # Next.js App Router routes
├── components/                    # SiteHeader, SiteFooter, TokenFlow, PreviewPanel, ChartCard
├── lib/                           # Mock data, formatters, shared types
├── styles/                        # Page-shell globals
├── package.json                   # Depends on @zds/ui from GitHub (until published to npm)
├── tsconfig.json
├── next.config.js
├── README.md                      # Repo front page
├── LICENSE                        # MIT
└── .gitignore
```

The scan's `package.json` already references `@zds/ui` from GitHub:

```json
"@zds/ui": "github:protocol-z/z-design-system-v2"
```

When `@zds/ui` is published to npm, swap to:

```json
"@zds/ui": "^0.1.0"
```

## Step 3 — Publish `@zds/ui` to npm (optional but recommended)

If you want consuming apps to install via `npm install @zds/ui` instead of
the GitHub URL:

```bash
cd ~/Documents/MH/MHJ-Design/Vibes/Zed/z-design-system-v2/packages/ui

# Make sure you're logged in to the @zds org
npm whoami
npm publish --access public
```

The package is set up for public publish — `publishConfig.access: "public"`
is already in `package.json`.

## Step 4 — Wire CI

Both repos ship with `.github/workflows/ci.yml`:

- **`z-design-system-v2`** — runs `npm run typecheck` + `npm run scan:build`
  on push and PR.
- **`z-scan`** — runs `npm run typecheck` + `npm run build` on push and PR.

No secrets or environment variables required for the basic CI. If you want
to deploy preview environments per PR (recommended), add a Vercel project
for each repo and set `VERCEL_ORG_ID` / `VERCEL_PROJECT_ID` /
`VERCEL_TOKEN` in repo secrets.

## Step 5 — Domain setup

| Domain | Repo | Notes |
|---|---|---|
| `scan.zprotocol.org` | `z-scan` | Production block explorer (Mainnet) |
| `scan.dev.zprotocol.org` | `z-scan` | DevNet preview (separate Vercel env) |
| `docs.zprotocol.org/design` | `z-design-system-v2` | Brand spec + component reference (use docs deployment) |

## Local development after the split

Two ways to develop the scan against a local design-system checkout:

### Option A — `npm link` (quick, dev only)

```bash
# In z-design-system-v2/packages/ui
cd ~/Documents/.../z-design-system-v2/packages/ui
npm link

# In z-scan
cd ~/Documents/.../z-scan
npm link @zds/ui
npm run dev
```

When you change a component in `z-design-system-v2/packages/ui/src/`, the
scan dev server picks it up immediately.

### Option B — `file:` protocol in package.json

```json
"@zds/ui": "file:../z-design-system-v2/packages/ui"
```

Simpler, but you have to `npm install` after every design-system change.

## Branding files included in this drop

- `docs/BRAND.md` — five values, anti-patterns, visual signatures
- `docs/VOICE.md` — writing system, tone, copy patterns, casing
- `docs/AESTHETIC.md` — typography, photography, motion, color discipline
- `docs/TOKENS.md` — every token with hex value
- `docs/HANDOFF.md` — engineering ground rules
- `docs/COMPONENT-REGISTRY.md` — what's coded, what's coming next
- `docs/SNIPPETS.md` — copy-paste examples

These all live in `z-design-system-v2/docs/`. The scan repo's README links
back to them as the brand source of truth.

## Open follow-ups

- [ ] Push `z-design-system-v2` to `github.com/protocol-z/z-design-system-v2`
- [ ] Push `z-scan` to `github.com/protocol-z/z-scan` (after `git mv`)
- [ ] Publish `@zds/ui@0.1.0` to npm (one command)
- [ ] Set up Vercel projects for both repos with PR previews
- [ ] Wire DNS: `scan.zprotocol.org` → Vercel project for `z-scan`
- [ ] Pin a stable @zds/ui version in scan's package.json once published
- [ ] Add the four pages still missing from the scan brief (EIP-7702 Authorizations, Validator Set Info — small) to a follow-up PR
- [ ] Review brand `.md` docs with marketing before treating them as canonical

## Questions to answer before pushing

1. **GitHub org name?** The handoff assumes `zprotocol`. Change in URLs if different.
2. **MIT or Apache-2 license?** Currently MIT. Apache-2 if you want patent grants.
3. **Public or private repos?** Both are set up for public; flip in GitHub settings if you'd rather keep them private during DevNet.
4. **Tagging strategy?** Recommend semver — design-system at `v0.x` until the API is locked in, scan at `v0.x` until Mainnet.

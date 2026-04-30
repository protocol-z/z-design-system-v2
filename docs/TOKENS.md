# Tokens — v2 (Serene System)

Source of truth: `packages/ui/src/styles/tokens.css`. Brand direction: `brand/system/v2/brand-direction-v2.md`.

## Color roles

### Grounds (the canvas)

| Token | Hex / value | Usage |
|---|---|---|
| `--zds-bg` | `#F6F5F1` | Default page field — warm cream |
| `--zds-paper` | `#FFFFFF` | Floating modules only — plates, cards |
| `--zds-cream` | `#F9F7F1` | Slightly lifted cream — nested plates |
| `--zds-mist` | `#F4F2ED` | Cooler cream — sidebars, rest states, segmented track |

### Sky band (parallax + section breaks)

`--zds-sky-1` `#CFE0EA` → `--zds-sky-2` `#DCE7EC` → `--zds-sky-3` `#ECE6DE` → `--zds-sky-4` `#F3DFCD` → `--zds-sky-5` `#F7EEE3`

Used as an atmospheric gradient when a section needs a "morning light" beat. Never as a card background — these are for whole-section grounds only.

### Ink ramp (text + structure on light)

`--zds-ink-950` `#0B0B0D` (text default), `--zds-ink-900` `#1A1A1D`, `--zds-ink-800`, `--zds-ink-700` `#44444A` (secondary text on light), `--zds-ink-500`, `--zds-ink-400`, `--zds-ink-300` `#C4C4C8` (tonal trailing digits), `--zds-ink-200`, `--zds-ink-100`.

| Convenience token | Resolves to |
|---|---|
| `--zds-text` | `#0B0B0D` |
| `--zds-text-secondary` | `rgba(11, 11, 13, 0.64)` |
| `--zds-text-tertiary` | `rgba(11, 11, 13, 0.44)` |

### Accents (one at a time per surface)

| Token | Hex | Role |
|---|---|---|
| `--zds-mint-300` | `#7FD6B4` | Hover halos, pill fills |
| `--zds-mint-500` | `#3FB58A` | The brand UI accent (CTAs in app, focus rings) |
| `--zds-zcash-500` | `#F4B731` | The campaign CTA color — one per screen, never two |
| `--zds-moss-400` | `#6FA389` | Editorial green for marginalia and illustrations |
| `--zds-stone-600` | `#6B6860` | Warm earth neutral, for photography blends |

### Status

| Token | Hex | Notes |
|---|---|---|
| `--zds-positive` | `#3FB58A` | Mint 500 — same as UI accent |
| `--zds-positive-wash` | `rgba(63,181,138,0.10)` | Background wash for positive states |
| `--zds-negative` | `#D77A6E` | Desaturated terracotta — *the only* negative across product, marketing, and print |
| `--zds-negative-wash` | `rgba(215,122,110,0.10)` | Background wash |
| `--zds-pending` | `#6B6860` | Stone 600 — neutral pending state |

### v1 → v2 transitional aliases

For incremental migration. Remove once `grep -r "zds-gold\|zds-mint\b\|zds-muted\|zds-warning"` is empty.

| Alias | Resolves to |
|---|---|
| `--zds-gold` | `--zds-zcash-500` |
| `--zds-mint` | `--zds-mint-500` |
| `--zds-muted` | `--zds-text-secondary` |
| `--zds-warning` | `--zds-negative` |

## Lines + dividers

| Token | Value |
|---|---|
| `--zds-line` | `rgba(11, 11, 13, 0.08)` — default border |
| `--zds-line-soft` | `rgba(11, 11, 13, 0.05)` — quiet dividers |
| `--zds-line-strong` | `rgba(11, 11, 13, 0.16)` — emphasized borders |
| `--zds-line-focus` | `rgba(63, 181, 138, 0.32)` — mint focus ring |

## Surface elevations

| Token | When to use |
|---|---|
| `--zds-shadow-plate` | Default card / button-on-paper shadow |
| `--zds-shadow-plate-hover` | Plate hover state |
| `--zds-shadow-glass` | Glass / frosted module |
| `--zds-shadow-pop` | Modals, popovers, drag-overlays |

## Aurora washes

`--zds-aurora-warm` (peach radial), `--zds-aurora-cool` (slate-blue radial). Apply with `filter: blur(40px)` on a positioned `::before` for the atmospheric hero effect.

## Radius

| Token | Value | Use |
|---|---|---|
| `--zds-radius-sm` | 8px | Compact tags, micro-meta |
| `--zds-radius-md` | 14px | Inputs, small cards |
| `--zds-radius-lg` | 20px | Cards, plates |
| `--zds-radius-xl` | 28px | Large editorial cards, aurora hero |
| `--zds-radius-pill` | 9999px | Pills, buttons, chips, asset tags |

**Concentric corner rule:** when nesting a rounded element inside a padded plate, set `inner_radius = outer_radius − padding` so corners share a center. Visible misnesting is treated as a bug.

## Spacing + rhythm

`--zds-container` 1280px, `--zds-container-wide` 1440px, `--zds-gutter` `clamp(20px, 4vw, 56px)`.

Spacing scale: `--zds-space-1..9` → 4, 8, 12, 16, 24, 32, 48, 64, 96px.

## Typography

| Family | Token | Use |
|---|---|---|
| `Space Grotesk` | `--zds-font-display` | Display + headings (everything h1–h3) |
| `Instrument Sans` | `--zds-font-body` | Body, UI labels, controls |
| `Instrument Serif` | `--zds-font-serif` | Editorial accents — pull-quotes, italic emphasis, marginalia (promoted to official brand serif April 2026) |
| `JetBrains Mono` | `--zds-font-mono` | Captions, micro-labels, code, metric units |

Display scale (3-step): `--zds-display-xl` (hero), `--zds-display-l` (section), `--zds-display-m` (card title), `--zds-display-s` (sub-card). Don't free-form between these — pick one.

Body sizes: `--zds-body-l` 20, `--zds-body-m` 16, `--zds-body-s` 14, `--zds-caption` 12.

Display line-heights: xl 0.92, l 0.94, m 0.96, s 1.02. These are tight by design — v2 wants headlines that read as a single visual mass.

## Motion

| Token | Value | Feeling |
|---|---|---|
| `--zds-ease-out` | `cubic-bezier(0.20, 0.80, 0.20, 1.00)` | Standard exit |
| `--zds-ease-settle` | `cubic-bezier(0.16, 1.00, 0.30, 1.00)` | The signature *settle* — overshoot, soft landing |
| `--zds-dur-fast` | 180ms | Hover, focus |
| `--zds-dur-med` | 420ms | Card enter, section reveal |
| `--zds-dur-slow` | 720ms | Aurora drift, hero settle |

## Texture

`--zds-dotted-grid` — the 12px-spaced radial-dot pattern used as a data-plate background. Apply with `background: var(--zds-paper); background-image: var(--zds-dotted-grid);`.

## Dark surface

The `[data-theme="dark"]` block in `tokens.css` overrides grounds, ink, and shadows for product surfaces that need a dark canvas (e.g. workspace tools where users want it). Dark mode is *not* the brand — marketing always renders light.

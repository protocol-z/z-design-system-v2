# Aesthetic — the visual language of v2

> Companion to [`BRAND.md`](./BRAND.md) and [`TOKENS.md`](./TOKENS.md). This file is for designers, illustrators, and anyone making the visual artifacts that carry the brand outside the product (decks, social posts, photo art direction, swag).

## Atmosphere

The brand's atmosphere is **a clear morning in the mountains**. That phrase is the tagline in the footer; it's also the design brief. When you're not sure which way to go, ask: *does this feel like a clear morning in the mountains?*

Practically:
- Light is warm but not yellow — early, not midday
- Air is still — reduce motion, no looping animation
- Distance feels real — soft contrast, hairline rules instead of strong borders, generous whitespace
- The far horizon is peach-cream, the zenith is soft blue (the `--zds-sky-*` tokens)

This is the opposite of v1's "midnight server room with neon accents." If your composition would feel at home in a cypherpunk movie, redirect.

## Typography system

| Family | Use | Rules |
|---|---|---|
| **Space Grotesk** (display + structural) | Headlines, KPI numerals, key labels | Weight 500 by default, never bold-bold. Negative letter-spacing on display sizes (-0.035em). |
| **Instrument Sans** (body + UI) | Body copy, controls, helpers | Default weight 400. Don't substitute. |
| **Instrument Serif Italic** (variable phrase) | The italic emphasis clause in headlines and ActionBanner | Italic only. Never use the upright. |
| **JetBrains Mono** (mono / data) | Hashes, addresses, axis labels, eyebrow caps | Use for numerals when the value is a hash / fixed string, never for prose. |

**Display size ladder.** Use the tokens, not raw px:

```
--zds-display-xl   clamp(56px, 8.6vw, 136px)   homepage hero only
--zds-display-l    clamp(44px, 6vw,    96px)   marketing section heads
--zds-display-m    clamp(32px, 4vw,    60px)   page heros (Z Scan home)
--zds-display-s    clamp(24px, 2.4vw,  38px)   page titles, ActionBanner
--zds-body-l       20px                        marketing body
--zds-body-m       16px                        product body
--zds-body-s       14px                        helper / metadata
--zds-caption      12px                        eyebrows, axis labels
```

**Italic emphasis pattern.** Always:

```html
Search the chain. <em>Privately.</em>
```

Where `<em>` is wired (in BRAND or in any HTML/JSX) to render Instrument Serif italic. Don't fake it with `font-style: italic` on Space Grotesk — it looks wrong.

## Color discipline

The full token list is in [`TOKENS.md`](./TOKENS.md). The discipline rules:

1. **One accent per surface.** Mint OR yellow OR moss — never two on the same screen.
2. **Status ≠ category.** Mint = positive outcome. Don't reuse it to mean "private" on the same screen where it also means "success."
3. **Negative is for actual negative.** Don't use terracotta for "false," "expired," or "not yet" — those are neutral states.
4. **Cream is the page.** White is for floating cards, mist is for sidebars and segmented tracks. The default `body` background is *never* white.
5. **No untokened colors.** Anywhere you reach for a hex, there's a v2 token for it. If there isn't, the design is wrong — fix the design or extend the tokens (with sign-off).

## Photography direction

Photography is the marketing surface. The product surfaces don't use photos.

**The look:** soft natural light, mountain or coastal landscape, peopled scenes with a calm posture, warm midtones, no high-contrast color grading. The visual cousin is the Aesop catalog or A Magazine — not the typical "fintech glossy."

**Avoid:**
- Clichés: padlocks, eyes, fingerprints, fingerprint-on-glass macro shots
- High-contrast neon / cyberpunk grading
- Stock-photo shutter shots of "diverse team in modern office"
- Drone shots of cities at night
- Crypto symbology in any form (never put a Bitcoin on a beach)

**Lean into:**
- Mornings — the literal first hour of light
- Mountains, rivers, ocean horizons — geological time scales
- Hands at work — paper, ceramic, fabric, real tools
- Architectural details that have weathered well

## Iconography

Lucide React's stroke icons at 1.5px, 24px box. That's it. Don't mix Lucide with another icon set on the same page.

Custom illustrations are line-only, ink color (`--zds-ink-950`) on cream, with at most one accent-color highlight (mint or yellow). No fills, no gradients, no shadows.

## Logo

The mark is a stylized **Z** that lives in `brand/logos/v2/`. Use the SVG, not bitmaps.

Tones:
- **Default** — ink-950 on cream
- **Reverse** — cream on ink-950 (dark surfaces only)
- **Mint** — mint-500 on cream (use sparingly — for active product chrome)
- **Yellow** — zcash-500 on cream (campaign moments only)

Never:
- Stretch the mark
- Place on busy photography (use a glass plate or solid backing)
- Add effects, glows, gradients
- Pair with a wordmark in a horizontal lockup unless you must — the mark holds on its own

## Surface elevation

Three plate types, three shadows:

| Plate | Shadow token | When |
|---|---|---|
| Base plate (most cards) | `--zds-shadow-plate` | Tables, stat tiles, KV grids — the everyday card |
| Glass plate (over photo / aurora) | `--zds-shadow-glass` | When the surface sits on a busy ground |
| Pop (modals, dropdowns, hover cards) | `--zds-shadow-pop` | Floating overlays only |

Never go deeper than these. v1 had heavy drop-shadows; v2 is hairline-and-light.

## Motion

Motion is **arrival**, not animation. We move things into place once and let them rest. Looping motion is banned outside the marketing hero (and even there, sparingly).

| Use | Token | Easing |
|---|---|---|
| Hover / fast feedback | `--zds-dur-fast` (180ms) | `--zds-ease-out` |
| Modal arrival, big state change | `--zds-dur-med` (420ms) | `--zds-ease-settle` |
| Hero / orchestrated reveal | `--zds-dur-slow` (720ms) | `--zds-ease-settle` |

`prefers-reduced-motion` is honored everywhere — animate-in only on first paint, then stop.

## The dotted micro-grid

Charts and data plates sit on a faint dot pattern, not gridlines. The token is `--zds-dotted-grid`. Use it on:

- Chart backgrounds (every chart in `@zds/ui/charts` already does)
- The hero background of a stats / dashboard hero
- Nowhere else — don't try to apply it to body text or marketing surfaces

## Composition principles

### Whitespace > borders

Where v1 used a border, v2 uses space. If you can solve a layout problem by moving the elements 24px apart instead of putting a 1px line between them — do.

### Eyebrows lead

A monospace UPPERCASE eyebrow above a headline (`Z PROTOCOL · MAINNET` → `Search the chain.`) is the v2 signature opening. It tells the reader where they are without using a breadcrumb.

### Pill geometry

Buttons, chips, hashes, badges — almost everything is a pill (`--zds-radius-pill`). Cards and plates use the larger radii (`--zds-radius-lg`, `--zds-radius-xl`). The shared geometry is what makes things feel like family.

### One italic, max

A page can have one italic phrase. Two competes; three is a brochure.

## Aesthetic anti-patterns

- Skeuomorphism. We're not pretending to be paper or leather.
- Gradients on UI. Backgrounds can have an aurora wash; UI elements are solid.
- "Glassmorphism." Glass effects only on overlays, never on plates.
- Bold tags / labels everywhere. The eye needs rest.
- Three colors competing. Pick one.
- Drop-cap-style oversized first letters. Editorial mood, not magazine pastiche.

## Reference moodboard

When in doubt, look at:

- **Aesop's brand surfaces** — paper grain, cream backgrounds, calm typography
- **A Magazine Curated By** — display + serif italic emphasis
- **Stripe Press book covers** — modernist editorial
- **Frieze magazine** — editorial cadence, breathing room
- **The Conran Shop catalogues** — restrained warmth

Avoid:

- Most fintech homepages from 2017–2023 (gradient mesh + 3D blob)
- Most crypto homepages from 2020–2024 (dark + neon + glitch)
- "Brutalist" trend pages (we are calm, not loud)

## Taking the brand off-product

When the brand goes to swag, decks, or campaigns:

1. **Photo or type — pick one.** Don't put display Grotesk on a photo and call it a day. Either the photo carries the page (with a small caption mark in the corner) or the type carries the page (on cream, no photo).
2. **Cream is non-negotiable.** Backgrounds are cream, not white. Print spec: warm white paper, never bright white.
3. **One CTA.** A campaign has one ask. Two CTAs split the reader's attention; in editorial work it kills the message entirely.
4. **The italic phrase travels.** Wherever the brand goes, the italic clause goes with it. "A clear morning in the mountains." can recompose into pull quotes, video sting, billboard — it's the brand's voice in five words.

## Source files

| File | Where |
|---|---|
| Logo SVG (default) | `brand/logos/v2/Logo-v2-Black-noBG.svg` |
| Logo SVG (reverse) | `brand/logos/v2/Logo-v2-White-noBG.svg` |
| Brand-direction master doc | `brand/system/v2/brand-direction-v2.md` |
| Implementation tokens | `packages/ui/src/styles/tokens.css` |
| Visual reference page | `apps/preview/v2.html` |
| Photography direction (boards) | `brand/photography/v2/` |

If a brand-aesthetic decision isn't reflected in any of the above, it doesn't exist yet — file a PR or a decision in `brand/decisions/`.

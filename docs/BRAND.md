# Z Protocol — Brand spec (v2 / Serene System)

> **Status:** Signed off April 2026. Direction owner: Design.
> Companions: [`TOKENS.md`](./TOKENS.md) for the implementation, [`VOICE.md`](./VOICE.md) for the writing system, [`AESTHETIC.md`](./AESTHETIC.md) for the visual language.
> The umbrella brand-direction document lives at `brand/system/v2/brand-direction-v2.md`. This file is the engineering- and writer-facing distillation.

## What we are

Z Protocol is the privacy-first L1. Our brand language has to do two things at once: feel **calm and credible** (the kind of place real money lives) and **clear and curious** (the kind of place that invites exploration). We don't sell privacy as paranoia — we sell it as the default condition of a healthy financial life.

The v2 brand language replaces the v1 "obfuscation / dark dominance / pixel masks" direction. v1 read as cypherpunk; v2 reads as morning light in the mountains.

## The five values driving v2

1. **Calm capability.** Surfaces feel quiet, but the work underneath is rigorous. We never substitute personality for precision.
2. **Privacy as default, not as warning.** Privacy is a feature, not an alarm. The tone is "this is intentional," never "danger zone."
3. **Editorial cadence.** Writing has rhythm — short clauses, occasional italic clauses for emphasis, no jargon when an English word will do.
4. **Light-mode-first.** The brand renders on cream. Dark mode is a product surface, not the brand voice.
5. **One accent per surface.** Discipline beats range. Mint OR yellow OR moss — never two on the same screen.

## Brand pillars

| Pillar | What it means in design | What it means in copy |
|---|---|---|
| **Privacy** | Mint accent, MASP labeling treatment, "Amounts hidden" notices framed as features | "Transfer details are private. Amounts and recipients are encrypted." |
| **Capability** | Display-grotesk numerals, dense data plates, real depth in tables | "Search the chain. Privately." — short, declarative, no marketing puffery |
| **Trust** | Hairlines instead of strong borders, soft shadows, breathing room around values | Honest about limits — "Wire to the indexer to populate." not "Coming soon!" |
| **Open infra** | Credits open-source libraries, links to docs, exposes the components | Engineers ship the same brand surface designers shipped — no rewrites |

## Visual signatures

These are the bits an outsider should be able to point to as "that's Z."

- **The cream / mint pairing.** `#F6F5F1` ground + `#3FB58A` for active privacy / positive states.
- **Pill geometry.** Buttons, badges, chips, hashes — almost everything is a pill. The rounded form is the family resemblance.
- **The italic emphasis line.** Display Grotesk for the body of a headline, Instrument Serif italic for the variable noun ("Search the chain. *Privately.*").
- **The dotted micro-grid.** Charts and data plates sit on a faint dot pattern, not gridlines. It signals "data in a place that respects you."
- **The MASP Pool label.** Wherever the privacy contract appears, it's labeled; never raw hex. This is a brand commitment, not a UI nicety.

## Anti-patterns (never do these)

- **Two accents on one surface.** Mint AND yellow on the same page — pick one.
- **Apology copy.** "Cannot display transaction details due to privacy" is wrong. We don't apologize for the product working.
- **Dark gradient marketing pages.** v1 used dark dominance for marketing; v2 is light-mode-first. Dark mode is product-only.
- **Pixel masks, glitch effects, scan lines.** v1 visual language. Retired.
- **Stock photography of locks, padlocks, eyes, fingerprints.** Lazy privacy iconography. We use the morning-mountain photo system instead.
- **Red for normal states.** `--zds-negative` is for actual failure or risk. Never for "false," "expired," or anything categorical-and-fine.

## Composition rules

These are the rules that keep the brand consistent without a designer in every loop.

1. **Headers cap at one accent.** A page heading uses Display Grotesk on ink + at most one Instrument Serif italic clause.
2. **Tables use dots, not fills, for type badges.** A 50-row table with six color fills shouts. A small color dot on a neutral pill respects the page.
3. **Status ≠ category.** `--zds-positive` (mint) means *outcome* success. Don't dual-purpose it for "private" and "successful."
4. **One CTA per screen.** Yellow campaign accent is a one-per-page resource. The action banner can use it; the secondary buttons can't.
5. **Editorial italic for variable phrases.** In ActionBanner copy, wrap the noun being acted on in `<em>` so it inherits Instrument Serif italic. ("Pay *12.50 USDZ* via x402 to *api.example.com*.")

## Brand scopes

| Surface | Brand voice | Notes |
|---|---|---|
| Marketing site (`protocol-z.xyz`) | v2 light-mode editorial | The brand at full strength — photo, type, italic emphasis |
| Z Scan | v2 light-mode product | Calm, dense, every interaction component is `@zds/ui` |
| Z Trade / Z Lend | v2 light-mode app | Same plate / pill / accent vocabulary as Scan |
| Internal docs | v2 with relaxed grid | Markdown defaults are fine; type still uses the v2 stack |
| Decks / press | v2 photo + type | Editorial layout — photo + bold display + small mono captions |

## Trademark + naming

- **Z Protocol** is the umbrella entity name.
- **Z Scan**, **Z Trade**, **Z Lend** are product names. No "Z" prefix on internal-only tools.
- The lowercase **`z`** in code (e.g. `--zds-*` tokens) is intentional — it preserves the family without forcing every CSS variable to start with a capital.
- The token symbol is **Z**. The native gas asset is **ZEC**. The stable is **USDZ** on Mainnet, **ZUSD** on DevNet.

## What goes in this folder

- [`TOKENS.md`](./TOKENS.md) — every CSS custom property, with hex values and intended use
- [`VOICE.md`](./VOICE.md) — writing system: tone, cadence, copy patterns
- [`AESTHETIC.md`](./AESTHETIC.md) — visual language: photography, typography, motion, illustration
- [`COMPONENT-REGISTRY.md`](./COMPONENT-REGISTRY.md) — what's coded, what's coming next
- [`SNIPPETS.md`](./SNIPPETS.md) — copy-paste examples
- [`HANDOFF.md`](./HANDOFF.md) — how engineering consumes the system

## Source of truth, in priority order

1. `packages/ui/src/styles/tokens.css` — the tokens, in code
2. `apps/preview/v2.html` — the visual reference page
3. `brand/system/v2/brand-direction-v2.md` — the umbrella brand doc
4. This file and the other files in `docs/`

If they disagree, walk down the list — code wins, then preview, then brand doc, then this file. Disagreements are bugs; please flag them in PRs.

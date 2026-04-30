# Z Design System

> The component library, tokens, and brand system for Z Protocol — currently on **v2 (Serene System)**, signed off April 2026.
>
> *A clear morning in the mountains.*

[![License](https://img.shields.io/badge/license-MIT-3FB58A.svg)](./LICENSE)
[![Status](https://img.shields.io/badge/status-v2-3FB58A.svg)](./brand/system/v2/brand-direction-v2.md)
[![Components](https://img.shields.io/badge/components-37-3FB58A.svg)](./INVENTORY.md)

---

## What's in here

| Surface | Path | What it is |
|---|---|---|
| **Tokens** | [`packages/ui/src/styles/tokens.css`](./packages/ui/src/styles/tokens.css) | Source of truth — every color, radius, shadow, type token |
| **Components** | [`packages/ui/src/components/`](./packages/ui/src/components/) | 37 React components on v2 tokens (`@zds/ui`) |
| **Visual reference** | [`apps/preview/v2.html`](./apps/preview/v2.html) | One file demonstrating every primitive — send for design review |
| **Brand spec** | [`docs/BRAND.md`](./docs/BRAND.md) | What the brand stands for, the five values, anti-patterns |
| **Voice spec** | [`docs/VOICE.md`](./docs/VOICE.md) | Writing system — tone, cadence, copy patterns |
| **Aesthetic spec** | [`docs/AESTHETIC.md`](./docs/AESTHETIC.md) | Visual language — typography, photography, motion |
| **Token reference** | [`docs/TOKENS.md`](./docs/TOKENS.md) | Every token with hex value and usage |
| **Handoff** | [`docs/HANDOFF.md`](./docs/HANDOFF.md) | How engineering consumes this package |

## Install in another app

```bash
# From npm (when published)
npm install @zds/ui

# From GitHub (until npm publish)
npm install github:protocol-z/z-design-system#main
```

```tsx
// styles/tokens.css must be imported once at the app root
import "@zds/ui/styles/tokens.css";

// then use any component
import { Button, DataTable, ChainSwitcher } from "@zds/ui";

export default function Page() {
  return <Button variant="primary">Open the chain</Button>;
}
```

If your app is built on Next.js App Router, add `"@zds/ui"` to `transpilePackages` in `next.config.js`. The package ships TSX source — Next compiles it through SWC.

## Local development

```bash
git clone https://github.com/protocol-z/z-design-system.git
cd z-design-system
npm install

# View the visual reference at http://localhost:4173
npm run preview

# Typecheck the source
npm run typecheck

# Run the Z Scan demo app at http://localhost:4174
npm run scan:dev
```

## Repo structure

```
z-design-system/
├── packages/ui/             # The published package — @zds/ui
│   ├── src/components/      # React components on v2 tokens
│   ├── src/styles/          # tokens.css (the source of truth)
│   └── src/index.ts         # Barrel export
├── apps/
│   ├── preview/             # Static HTML reference pages
│   └── scan/                # Z Scan demo app (Next.js) — see its README
├── docs/                    # Brand + system documentation
├── brand/                   # Logos, photography direction, archived v1 assets
└── INVENTORY.md             # Token + component status overview
```

## Brand discipline (the rules that matter)

1. **One accent per surface.** Mint OR yellow OR moss — never two.
2. **Status ≠ category.** Mint = positive outcome. Don't dual-purpose it for "private" and "successful" on the same screen.
3. **Cream is the page.** White is for floating cards, mist is for sidebars.
4. **Italic does real work.** Wrap variable nouns in `<em>` for the editorial italic — never decoration.
5. **Light-mode-first.** Dark mode is product chrome, not the brand voice.

Full brand spec: [`docs/BRAND.md`](./docs/BRAND.md).

## v1 → v2

The v1 brand language (privacy/obfuscation, dark dominance, pixel masks) has been retired. v1 source files live in `brand/archive/`. A small set of CSS aliases (`--zds-gold`, `--zds-mint`, `--zds-muted`, `--zds-warning`) ship as transitional compatibility — they map to v2 names. Migration plan: see [`INVENTORY.md`](./INVENTORY.md).

## Status

| Area | State |
|---|---|
| Tokens (v2) | **Shipped** |
| React components | **37 shipped** — see [`INVENTORY.md`](./INVENTORY.md) for the full table |
| Visual reference | **Shipped** at `apps/preview/v2.html` |
| Z Scan demo | **In dev** — runs at `apps/scan/` |
| Type system | TypeScript strict, 0 errors |
| Coverage | Marketing surfaces + most product primitives. Missing: command palette, drawer, toast — tracked in `INVENTORY.md` |

## Contributing

Contributions are welcome — check out [`docs/HANDOFF.md`](./docs/HANDOFF.md) for the engineering ground rules and [`docs/EXPANSION-ROADMAP.md`](./docs/EXPANSION-ROADMAP.md) for what's next.

PR rules of thumb:
- Tokens-first. Anywhere you reach for a hex, use a `--zds-*` token.
- One accent per surface. The PR review will catch this.
- Document the component in `docs/COMPONENT-REGISTRY.md` if it's new.
- Update `apps/preview/v2.html` if it changes the visual reference.

## License

[MIT](./LICENSE) — © 2026 Z Protocol.

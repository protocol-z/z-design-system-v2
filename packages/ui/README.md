# @zds/ui

React components and tokens for [Z Protocol](https://github.com/protocol-z) surfaces.
Built on the **v2 (Serene System)** design language.

```bash
npm install @zds/ui
```

## Quick start

```tsx
import "@zds/ui/styles/tokens.css";
import { Button, DataTable, ChainSwitcher } from "@zds/ui";
```

In Next.js App Router projects, add `"@zds/ui"` to `transpilePackages` in
`next.config.js` — the package ships TSX source, so Next compiles it
through SWC.

```js
// next.config.js
module.exports = {
  transpilePackages: ["@zds/ui"]
};
```

## What's exported

37 components covering: buttons, badges, hash chips, address labels, data
tables, charts, tabs, modals (coming), key-value grids, transaction
steppers, and the full app shell (header, footer, search, chain switcher,
theme toggle).

Full inventory: see the [INVENTORY.md](https://github.com/protocol-z/z-design-system-v2/blob/main/INVENTORY.md) in the repo.

## Brand

This package is part of a larger brand system. Read the
[brand spec](https://github.com/protocol-z/z-design-system-v2/blob/main/docs/BRAND.md)
for tone, voice, and aesthetic guidance before building new surfaces.

## License

MIT — © 2026 Z Protocol.

# Inventory

This file is the quickest way to understand the current state of the Z Design System.

> **Status: v2 (Serene System) — April 2026.**
> Source of truth: `brand/system/v2/brand-direction-v2.md` and `packages/ui/src/styles/tokens.css`.
> Visual reference: `apps/preview/v2.html`.
> The v1 token names below are retained as transitional aliases in `tokens.css` and resolve to v2 values; new code should use the `--zds-*` v2 names listed in `docs/TOKENS.md`.

## Tokens (v2 — see `docs/TOKENS.md` for the full reference)

### Grounds & ink
- `--zds-bg` `#F6F5F1` (warm cream) · `--zds-paper` `#FFFFFF` · `--zds-cream` `#F9F7F1` · `--zds-mist` `#F4F2ED`
- `--zds-ink-950` `#0B0B0D` (text) · `--zds-text-secondary` (64% ink) · `--zds-text-tertiary` (44% ink)

### Accents (one per surface)
- `--zds-mint-500` `#3FB58A` — UI accent (CTAs, focus rings)
- `--zds-zcash-500` `#F4B731` — campaign yellow (one per screen)
- `--zds-moss-400` `#6FA389` — editorial green
- `--zds-stone-600` `#6B6860` — earth neutral
- `--zds-negative` `#D77A6E` — single negative-status terracotta (April 2026 sign-off)

### v1 → v2 transitional aliases (kept in `tokens.css`)
- `--zds-gold` → `--zds-zcash-500`
- `--zds-mint` → `--zds-mint-500`
- `--zds-muted` → `--zds-text-secondary`
- `--zds-warning` → `--zds-negative`

## Typography

| Token / Rule | Purpose | Usage |
| --- | --- | --- |
| `Space Grotesk` | Heading and structural emphasis | titles, high-signal values, key labels |
| `Instrument Sans` | UI and support text | body copy, controls, helper copy |

## Component Status (April 2026, post-v2 migration)

Legend:
- `Designed`: exists in `apps/preview/v2.html`
- `Documented`: appears in docs / snippets / registry
- `Coded (v2)`: shipped React implementation on v2 tokens
- `Pending`: not yet exported

| Component | Designed | Documented | Coded (v2) | Notes |
| --- | --- | --- | --- | --- |
| `LogoMark` | Yes | Yes | Yes | Uses official `brand/logos/v2/Logo-v2-Black-noBG.svg` path; tones: default/reverse/mint/yellow |
| `Button` | Yes | Yes | Yes | `primary` (yellow) · `ghost` (frosted, default workhorse) · `dark` · `link` (animated underline) — pill geometry |
| `Chip` | Yes | Yes | Yes | `default` / `mint` / `dark` tones; pill |
| `MicroBadge` | Yes | Yes | Yes | Tones: default / mint / yellow / moss / negative |
| `TextField` | Yes | Yes | Yes | `pill` variant for chat/search |
| `Tabs` | Yes | Yes | Yes | Pill-segmented track on mist |
| `IconButton` | Yes | Yes | Yes | Tones: default / dark / ghost |
| `WalletState` | Yes | Yes | Yes | Status pill with dot; tones mint/yellow/negative/neutral |
| `SideNav` | Yes | Yes | Yes | Mist track, ink-fill active state |
| `StatTile` | Yes | Yes | Yes | Compact KPI plate |
| `TokenInput` | Yes | Yes | Yes | Composable, plate background |
| `AssetPill` | Yes | Yes | Yes | Pill with shadow, used in TokenInput and headers |
| `QuoteCard` | Yes | Yes | Yes | Tones: default / mint / warning / muted |
| `TransactionStepper` | Yes | Yes | Yes | States: default / current / complete (yellow) |
| `MarketRow` | Yes | Yes | Yes | Three-column data row |
| `PositionCard` | Yes | Yes | Yes | Editorial title + 2x stat grid |
| `RiskCallout` | Yes | Yes | Yes | Tones: negative (default) / yellow / mint / neutral |
| `AppShellHeader` | Yes | Yes | Pending | Composes from Button + LogoMark; design exists |
| `AppSwitcher` | Yes | Yes | Pending | |
| `NetworkSwitcher` | Yes | Yes | Pending | |
| `ExecutionStrip` | Yes | Yes | Pending | |
| `ReceiptCard` | Yes | Yes | Pending | |
| `Sparkline` | Yes | Yes | Pending | Inline SVG path utility |
| `DonutChart` | Yes | Yes | Pending | |
| `ProofCard` | Yes | Yes | Pending | Domain-specific trust component |
| `ProofBadge` | Yes | Yes | Pending | |
| `HealthCard` | Yes | Yes | Pending | |
| `HealthMeter` | Yes | Yes | Pending | |
| `TooltipCard` | Yes | Yes | Pending | |
| `TooltipBubble` | Yes | Yes | Pending | |
| `Toast` | Yes | Yes | Pending | |
| `ActivityPopover` | Yes | Yes | Pending | |
| `ModalCard` | Yes | Yes | Pending | |
| `AccountRail` | Yes | Yes | Pending | |
| `AccountBlock` | Yes | Yes | Pending | |
| `ActivityFeed` | Yes | Yes | Pending | |
| `DisconnectedState` | Yes | Yes | Pending | |
| `ProofCard` | Yes | Yes | No | Domain-specific trust component |
| `ProofBadge` | Yes | Yes | No | Good small export |
| `HealthCard` | Yes | Yes | No | Domain-specific risk component |
| `HealthMeter` | Yes | Yes | No | Could be standalone |
| `TooltipCard` | Yes | Yes | No | Overlay helper |
| `TooltipBubble` | Yes | Yes | No | Overlay helper |
| `Toast` | Yes | Yes | No | Shared feedback primitive |
| `ActivityPopover` | Yes | Yes | No | Needs interaction model |
| `ModalCard` | Yes | Yes | No | Shared overlay primitive |
| `AccountRail` | Yes | Yes | No | Shared app shell/product component |
| `AccountBlock` | Yes | Yes | No | Likely internal to rail |
| `ActivityFeed` | Yes | Yes | No | Shared account/history component |
| `FeedRow` | Yes | Yes | No | Likely internal to feed |
| `DisconnectedState` | Yes | Yes | No | Shared wallet/app empty state |

## Z Scan additions (April 2026 — see `briefs/Z Scan/scan-component-audit-v2.md`)

These components surface from the scanner change brief and are needed for the Z Scan v2 restyle. Most generalize to other apps (every app eventually has hashes, addresses, tables, charts) — keep them in the shared library.

### Tier 1 — shipped April 2026

All Tier 1 components are **coded against v2 tokens** in `packages/ui/src/components/`, exported from `packages/ui/src/index.ts`, and demonstrated in `apps/preview/scan.html`.

| Component | Status | Notes |
|---|---|---|
| `TypeBadge` | Coded (v2) | Tones: `private` (mint), `unshield` (moss), `infra` (stone — covers EIP-7702/ERC-4337), `payment` (yellow — for x402), `agent` (stone placeholder until iris ships), `standard` (neutral). Sizes `sm` (dot on paper) / `md` (color fill). |
| `AddressLabel` | Coded (v2) | Named-address chip with tooltip on hover. Categories: privacy / contract / validator / merchant / agent. |
| `InlineNotice` | Coded (v2) | Tones: `private` / `info` / `warning` / `negative`. Built-in icons per tone. |
| `SectionLabel` | Coded (v2) | Editorial header strip; tones default / private / unshield / infra / payment. |
| `ActionBanner` | Coded (v2) | Plain-English transaction summary; display-s + serif italic for variable phrases. |
| `HashChip` | Coded (v2) | Compact hash with truncation, copy-on-click, full hex on hover. Sizes `sm` / `md`. |
| `CopyButton` | Coded (v2) | Inline copy action with check + "Copied" success state. |
| `Tooltip` | Coded (v2) | Paper plate, settle motion. Placements top / bottom / left / right. |
| `DataTable` | Coded (v2) | Full table primitive: sortable headers, hairline rows, hover state, expandable rows, empty state. |
| `ColumnHeader` | Coded (v2) | Standalone sortable header cell. |
| `Pagination` | Coded (v2) | Prev/next + page indicator + page-size selector. |
| `KeyValueGrid` | Coded (v2) | Stacked label:value rows; densities `compact` / `comfortable`. |
| `ExpandableRow` | Coded (v2) | Standalone expandable row outside DataTable. |
| `Tabs` (extended) | Coded (v2) | Existing component, now supports per-tab `count` and `scrollable` variant. |

### Tier 2 — chart kit (shipped April 2026)

All Tier 2 components are coded against v2 tokens in `packages/ui/src/components/charts/`, exported from `packages/ui/src/index.ts`, and demonstrated in section 10 of `apps/preview/scan.html`. Color palette is capped at 4 series (mint → moss → stone → ink-300) by design.

| Component | Status | Notes |
|---|---|---|
| `LineChart` | Coded (v2) | Single or multi-series time-series; auto area fill on single, multi defaults to lines. Dotted-grid plate. |
| `AreaChart` | Coded (v2) | Stacked area, capped at 4 series. |
| `BarChart` | Coded (v2) | Single or grouped vertical bars; configurable groupGap / barGap. |
| `DonutChart` | Coded (v2) | Proportional ring with optional center title + caption. |
| `Sparkline` | Coded (v2) | Inline mini-chart for table cells / stat tiles; tones positive/negative/neutral/private. |
| `ChartTooltip` | Coded (v2) | Branded hover card; tonal numerals, mono values, paper plate with pop shadow. |
| `ChartLegend` | Coded (v2) | Pill row with tone dots; clickable to toggle series. |
| `AxisLabel` | Coded (v2) | SVG `<text>` element; variants `tick` / `title`, alignments start/middle/end. |

### Tier 3 — shell parts (shipped April 2026)

All Tier 3 components are coded against v2 tokens, exported from `packages/ui/src/index.ts`, and demonstrated in section 11 of `apps/preview/scan.html`.

| Component | Status | Notes |
|---|---|---|
| `AppHeader` | Coded (v2) | Top nav strip with brand · nav · center · actions slots. Variants: `marketing` / `app` / `scanner`. Optional `glass` for photo / aurora overlays. |
| `AppHeaderLink` | Coded (v2) | Pill nav item; active state gets mist fill. |
| `SearchField` | Coded (v2) | Pill input with leading icon, optional "/" shortcut hint, `default` and `glass` variants. Press `/` anywhere on the page to focus when `bindShortcut`. |
| `Footer` | Coded (v2) | Multi-column site footer with brand block, columns, social row, meta. Replaces v1 footer. No "Powered by" line. |
| `ChainSwitcher` | Coded (v2) | Network pill with status dot + dropdown. Networks `mainnet` (mint), `testnet` (yellow), `devnet` (stone), `custom` (neutral). |
| `ThemeToggle` | Coded (v2) | Light/dark switch (product surfaces only). Sets `data-theme="dark"` on `documentElement`. |

### Pending palette decision

| Token | Proposed | Used for |
|---|---|---|
| `--zds-iris-500` | `#8B7CB6` (muted lavender) | Agent Inference badge — only added if Agent Inference ships in scanner v1 |

## Additional Components Observed In The Dev App

These are either missing from the current library or only partially covered by the existing preview.

| Component | Why It Matters | Suggested Status |
| --- | --- | --- |
| `PageHeader` | Route title + subtitle pattern used across dashboard, faucet, shield, receive, trade | Add |
| `TopNavLink` | Individual top-level route item with active state | Add |
| `WalletPill` | Compact connected wallet pill in header | Add |
| `MetricCard` | Dashboard stat card for tree, leaf index, pool status | Add |
| `StatusBadge` | Active / disconnected / whitelisted / successful states | Add |
| `KeyValueGrid` | Network info layout with labeled values | Add |
| `DataCard` | Generic product card wrapper for route sections | Add |
| `SelectField` | Token selector and generic dropdown field | Add |
| `PresetButtonGroup` | Quick amount selectors like `100 zUSD`, `1,000 zUSD` | Add |
| `AmountField` | Numeric amount input with max/helper affordances | Add |
| `PrimaryActionBar` | Full-width route CTA block | Add |
| `SuccessBanner` | Inline transaction confirmation banner | Add |
| `ResultCard` | Post-action result summary card | Add |
| `SecurityPromptModal` | Modal for deriving shielded keys or other prerequisites | Add |
| `AddressPanel` | Shielded account address display with helper copy | Add |
| `CopyButton` | Utility action for copying addresses/raw data | Add |
| `Accordion` | Expand/collapse panel like manual key entry or raw data | Add |
| `CodeBlock` | Raw JSON / tx data presentation | Add |
| `QRCodeCard` | Receive flow QR panel with actions | Add |
| `ActionPair` | Side-by-side actions like `Copy` / `Share` | Add |
| `SegmentedControl` | Public/shielded toggle and similar switches | Add |
| `SwapDirectionButton` | Midpoint action between `You pay` and `You receive` | Add |
| `SwapModeSwitcher` | Swap mode header control | Add |
| `OptionChipGroup` | Slippage and fee tier option rows | Add |
| `InlineHelperText` | Small descriptive/support text under fields and cards | Add |
| `SectionDivider` | Quiet structural separation in dense product cards | Add |
| `EventEmptyState` | No events / no activity state | Add |

## Recommended Next React Exports

Priority order:
1. `MicroBadge`
2. `AssetPill`
3. `StatTile`
4. `WalletState`
5. `SideNav`
6. `TokenInput`
7. `QuoteCard`
8. `TransactionStepper`
9. `RiskCallout`
10. `MarketRow`
11. `PositionCard`
12. `AccountRail`
13. `Toast`
14. `ModalCard`
15. `DisconnectedState`

## Expanded Recommended Next React Exports

After the current priority set, the best additions from the dev app are:
16. `PageHeader`
17. `StatusBadge`
18. `MetricCard`
19. `SelectField`
20. `AmountField`
21. `PresetButtonGroup`
22. `SuccessBanner`
23. `ResultCard`
24. `SecurityPromptModal`
25. `AddressPanel`
26. `CopyButton`
27. `Accordion`
28. `CodeBlock`
29. `QRCodeCard`
30. `SegmentedControl`
31. `SwapDirectionButton`
32. `OptionChipGroup`

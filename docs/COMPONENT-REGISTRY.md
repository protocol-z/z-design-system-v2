# Component Registry

This file maps the current static library into implementation-oriented names.

> **Status: v2 — April 2026.** Names below are stable across v1 → v2; the *implementations* in `packages/ui/src/components/` have been migrated to v2 tokens (light-mode-first, pill geometry, single negative status). When a component description mentions `gold`, `mint`, or "dark surface" it is describing legacy v1 styling — the live code is on v2. See `brand/system/v2/brand-direction-v2.md` for the umbrella direction and `apps/preview/v2.html` for the visual reference.

## Foundations

### `LogoMark`
- Static code name: `.hero__mark`, `.shell__brand`
- Asset: `./assets/logo-v2.svg`
- Purpose: display the approved protocol mark

### `Button`
- Static code name: `.z-button`
- Variants:
  - `.z-button--primary`
  - `.z-button--secondary`
  - `.z-button--ghost`
- States:
  - default
  - hover
  - pressed
  - disabled

### `Chip`
- Static code name: `.z-chip`
- States:
  - default
  - active

### `MicroBadge`
- Static code name: `.micro-badge`
- Variants:
  - `.micro-badge--mint`
  - `.micro-badge--gold`

### `TextField`
- Static code name: `.z-field`

### `Tabs`
- Static code name: `.z-tabs`

### `IconButton`
- Static code name: `.icon-button`

## Shell

### `AppShellHeader`
- Static code name: `.shell__header`

### `AppSwitcher`
- Static code name: `.app-switcher`

### `WalletState`
- Static code name: `.wallet-state`

### `NetworkSwitcher`
- Static code name: `.network-switcher`

### `SideNav`
- Static code name: `.side-nav`

### `StatTile`
- Static code name: `.stat-tile`

## Transaction

### `TokenInput`
- Static code name: `.token-input`
- Child elements:
  - `.token-input__top`
  - `.token-input__body`

### `AssetPill`
- Static code name: `.asset-pill`

### `ExecutionStrip`
- Static code name: `.execution-strip`

### `QuoteCard`
- Static code name: `.quote-card`

### `RouteVisual`
- Static code name: `.route-visual`

### `TransactionStepper`
- Static code name: `.stepper`

### `Step`
- Static code name: `.step`
- States:
  - `.is-complete`
  - `.is-current`

### `ReceiptCard`
- Static code name: `.receipt`

## Markets

### `MarketRow`
- Static code name: `.market-row`

### `Sparkline`
- Static code name: `.sparkline`
- Variants:
  - `.spark--up`
  - `.spark--flat`

### `PositionCard`
- Static code name: `.position-card`

### `DonutChart`
- Static code name: `.donut-chart`

## Risk

### `RiskCallout`
- Static code name: `.callout`

### `ProofCard`
- Static code name: `.proof-card`

### `ProofBadge`
- Static code name: `.proof-badge`

### `HealthCard`
- Static code name: `.health-card`

### `HealthMeter`
- Static code name: `.health-meter`

## Overlays

### `TooltipCard`
- Static code name: `.mini-card`

### `TooltipBubble`
- Static code name: `.tooltip-bubble`

### `Toast`
- Static code name: `.toast`
- Variants:
  - `.toast--success`

### `ActivityPopover`
- Static code name: `.activity-pop`

### `ModalCard`
- Static code name: `.modal-card`
- Purpose: shared modal shell with backdrop, title, close action, body, and footer actions

## Account

### `AccountRail`
- Static code name: `.account-rail`

### `AccountBlock`
- Static code name: `.account-block`

### `ActivityFeed`
- Static code name: `.activity-feed`

### `FeedRow`
- Static code name: `.feed-row`

### `DisconnectedState`
- Static code name: `.disconnected-state`

## Additional Recommended Components

These are not fully modeled in the static preview yet, but they are needed based on the current platform surfaces.

### `PageHeader`
- Purpose: route title, support copy, meta, and page-level actions
- Status: shipped in React May 2026

### `TopNavLink`
- Purpose: top-level navigation item with active indicator

### `WalletPill`
- Purpose: compact connected wallet display in header

### `MetricCard`
- Purpose: dashboard metric summary card
- Status: shipped in React May 2026

### `StatusBadge`
- Purpose: active, disconnected, whitelisted, successful, or warning states
- Status: shipped in React May 2026

### `KeyValueGrid`
- Purpose: labeled system or network metadata layout

### `DataCard`
- Purpose: generic product card section wrapper
- Status: shipped in React May 2026

### `SelectField`
- Purpose: token or option selection field
- Status: shipped in React May 2026

### `PresetButtonGroup`
- Purpose: quick amount presets
- Status: shipped in React May 2026

### `AmountField`
- Purpose: numeric amount input with token workflow compatibility
- Status: shipped in React May 2026

### `PrimaryActionBar`
- Purpose: full-width route CTA
- Status: shipped in React May 2026

### `SuccessBanner`
- Purpose: immediate success or confirmation feedback

### `ResultCard`
- Purpose: post-transaction result summary
- Status: shipped in React May 2026

### `SecurityPromptModal`
- Purpose: required setup or derivation modal

### `AddressPanel`
- Purpose: long-form address display with support copy

### `CopyButton`
- Purpose: copy action for addresses, raw data, tx hashes

### `Accordion`
- Purpose: expandable section for advanced or optional content

### `CodeBlock`
- Purpose: raw structured output display

### `QRCodeCard`
- Purpose: QR receive view with related actions

### `ActionPair`
- Purpose: paired horizontal actions such as `Copy` and `Share`

### `SegmentedControl`
- Purpose: mode toggles like public/shielded

### `SwapDirectionButton`
- Purpose: reverse pair direction in a swap flow

### `SwapModeSwitcher`
- Purpose: mode control at top of trade flow

### `OptionChipGroup`
- Purpose: grouped selectable options like slippage and fee tier

### `InlineHelperText`
- Purpose: quiet support or explanatory copy within a form

### `SectionDivider`
- Purpose: low-emphasis structure inside dense surfaces

### `EventEmptyState`
- Purpose: empty state for events or activity lists

## Feedback & Guidance (v2.1 — June 2026)

New reusable, app-data-decoupled components. Themed via tokens, light + dark, exported from `packages/ui/src/index.ts`.

### `UsageMeter`
- Purpose: labeled allowance bar — used/total with optional banked segment, reset hint, and ok/warn/over tones (auto-derived from ratio)
- Status: shipped in React June 2026

### `ProcessSteps`
- Purpose: compact live run-list (done/active/todo) with spinner on the active step and an optional inline action ("AI is thinking…")
- Status: shipped in React June 2026
- Note: distinct from `TransactionStepper` (editorial, large-title signing flow); use `ProcessSteps` for tight status lists

### `RecoveryNotice`
- Purpose: actionable error/warning card — title, message, primary action, secondary link, and optional collapsible technical detail (`<details>`)
- Status: shipped in React June 2026

### `Coachmark`
- Purpose: anchored product-tour bubble (badge, title, body, step counter, back/next/close) positioned beside a target rect; no full-screen overlay
- Status: shipped in React June 2026

### `SideNav` (upgraded)
- Purpose: first-class sidebar rail — brand slot, primary nav items (active w/ `aria-current`), scrollable middle (recents/lists), pinned account slot
- Status: extended additively June 2026 (original `items`/`linkProps` API unchanged)

## Enterprise extension (experimental — July 2026)

The Enterprise extension is exported through `@zds/ui/enterprise` and requires `@zds/ui/styles/enterprise.css`. It inherits the core system and is not an independent theme or package.

### `EnterpriseRoot`
- Purpose: scopes operational typography, density, control aliases, and the large-text acceptance state
- Props: `textScale` (`default` / `large`), `density` (`compact` / `comfortable`), standard `div` attributes
- Status: experimental; proven across Enterprise overview, project, and policy prototype destinations

### `StateLabel`
- Purpose: compact sentence-case state for policy, request, key, budget, and evidence workflows
- Props: `tone` (`neutral` / `positive` / `attention` / `negative` / `info`), `size` (`sm` / `md`), `showDot`
- Status: experimental; distinct from the categorical/all-caps `StatusBadge`

## Proposed Future React Exports
When this moves into code, a clean export surface would look like:

```ts
export {
  LogoMark,
  Button,
  Chip,
  MicroBadge,
  TextField,
  Tabs,
  IconButton,
  AppShellHeader,
  AppSwitcher,
  WalletState,
  NetworkSwitcher,
  SideNav,
  StatTile,
  TokenInput,
  AssetPill,
  ExecutionStrip,
  QuoteCard,
  RouteVisual,
  TransactionStepper,
  ReceiptCard,
  MarketRow,
  Sparkline,
  PositionCard,
  DonutChart,
  RiskCallout,
  ProofCard,
  ProofBadge,
  HealthCard,
  HealthMeter,
  TooltipCard,
  TooltipBubble,
  Toast,
  ActivityPopover,
  ModalCard,
  AccountRail,
  AccountBlock,
  ActivityFeed,
  FeedRow,
  DisconnectedState,
  PageHeader,
  TopNavLink,
  WalletPill,
  MetricCard,
  StatusBadge,
  KeyValueGrid,
  DataCard,
  SelectField,
  PresetButtonGroup,
  AmountField,
  PrimaryActionBar,
  SuccessBanner,
  ResultCard,
  SecurityPromptModal,
  AddressPanel,
  CopyButton,
  Accordion,
  CodeBlock,
  QRCodeCard,
  ActionPair,
  SegmentedControl,
  SwapDirectionButton,
  SwapModeSwitcher,
  OptionChipGroup,
  InlineHelperText,
  SectionDivider,
  EventEmptyState
}
```

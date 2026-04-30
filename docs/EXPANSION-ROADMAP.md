# Expansion Roadmap

This file suggests which components to build next in the React export library.

> **Status: v2 — April 2026.** Tier 1 below has been completed. The currently-coded set covers Button, Chip, MicroBadge, TextField, Tabs, IconButton, AssetPill, StatTile, WalletState, SideNav, TokenInput, QuoteCard, TransactionStepper, MarketRow, PositionCard, RiskCallout, LogoMark — all migrated to v2 tokens. The remaining items (Toast, ModalCard, ActivityPopover, AppShellHeader, AppSwitcher, etc.) are still pending — see `INVENTORY.md` for the full status table.
>
> When building new components, start from the v2 patterns demonstrated in `apps/preview/v2.html` and the existing components in `packages/ui/src/components/`. Use `--zds-*` v2 tokens; avoid the transitional aliases (`--zds-gold`, `--zds-mint`, `--zds-muted`, `--zds-warning`) in new code.

## Best Next Components

### Tier 1: Immediate (April 2026 — DONE)
These unlocked real product implementation quickly.

- `MicroBadge`
- `AssetPill`
- `StatTile`
- `WalletState`
- `SideNav`
- `TokenInput`
- `QuoteCard`
- `TransactionStepper`
- `RiskCallout`

## Tier 2: Product Surfaces
These start turning the library into a usable DeFi app kit.

- `MarketRow`
- `PositionCard`
- `AccountRail`
- `ProofBadge`
- `HealthMeter`
- `ReceiptCard`
- `DisconnectedState`
- `PageHeader`
- `MetricCard`
- `StatusBadge`
- `SelectField`
- `AmountField`
- `PresetButtonGroup`
- `PrimaryActionBar`
- `ResultCard`

## Tier 3: Overlay and Feedback
These should come after the main product surfaces are stable.

- `Toast`
- `ModalCard`
- `TooltipBubble`
- `ActivityPopover`
- `SuccessBanner`
- `SecurityPromptModal`
- `Accordion`
- `CodeBlock`

## Good Future Additions Not Yet In The Preview
These are worth adding even though they are not fully modeled yet.

- `SectionHeading`
- `DataValue`
- `FieldHint`
- `InlineStatus`
- `EmptyState`
- `LoadingSkeleton`
- `FilterBar`
- `TableHeader`
- `KeyValueList`
- `ConfirmationSummary`
- `RouteRow`
- `PrivacyIndicator`
- `ProofIndicator`
- `LiquidationMeter`
- `PositionSummary`
- `NetworkBanner`
- `TransactionNotice`
- `ActivityItem`
- `ShellRail`
- `WalletPill`
- `TopNavLink`
- `KeyValueGrid`
- `DataCard`
- `AddressPanel`
- `CopyButton`
- `QRCodeCard`
- `ActionPair`
- `SegmentedControl`
- `SwapDirectionButton`
- `SwapModeSwitcher`
- `OptionChipGroup`
- `EventEmptyState`

## Suggested Build Order
1. Complete the small primitives missing from export.
2. Build the transaction path components.
3. Add the dashboard and route scaffolding components from the live product.
4. Build the market and position layer.
5. Build the account and feedback layer.
6. Add overlay and helper utilities last.

## Recommendation
The next code pass should prioritize components that let a dev assemble:
- a shell
- a transaction flow
- a market table
- an account sidebar

That is the minimum usable product kit.

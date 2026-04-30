# Handoff Guide

> **Status: v2 (Serene System) — April 2026.** All component code in `packages/ui/src/components/` has been migrated to v2 tokens. The visual reference is `apps/preview/v2.html`. The brand direction document is `brand/system/v2/brand-direction-v2.md`. References below to v1 conventions (dark dominance, rounded dark cards, gold/mint dual accents) describe the *previous* state — see `brand/archive/` for v1 source files.
>
> Key practical changes: light-mode-first (`--zds-bg` cream `#F6F5F1`), pill geometry for controls (`--zds-radius-pill`), single negative status (`--zds-negative` terracotta), surface system (Field · Plate · Glass · Aurora · Photographic), tonal numerals (muted trailing digits), Instrument Serif promoted to official brand serif.

## Framework Compatibility
The current design system work is compatible with:
- `Next.js`
- `React`
- `Tailwind CSS`

The live draft platform already uses `Next.js` App Router and Tailwind-style utility classes, so this library can be ported into that stack without changing framework.

## What This Folder Is
This folder is the visual and structural source of truth before React implementation.

It defines:
- spacing rhythm
- typography hierarchy
- color and surface intent
- component naming direction
- interaction states
- logo usage

It does not yet define:
- final React props
- final TypeScript interfaces
- final token packaging
- production accessibility test coverage

## Implementation Strategy

### Phase 1: Foundations
Implement first:
- logo component
- button
- chip
- field
- tabs
- icon button
- shell header
- side navigation

### Phase 2: Product Surfaces
Implement next:
- token input
- quote card
- transaction stepper
- receipt
- market row
- position card
- risk callout
- account rail

### Phase 3: Advanced Layers
Implement after core alignment:
- tooltip
- toast
- modal
- activity popover
- disconnected wallet state

## Recommended React Naming
Use PascalCase for React components and keep classnames/token references aligned with the current static library.

Examples:
- `LogoMark`
- `Button`
- `Chip`
- `TextField`
- `Tabs`
- `IconButton`
- `AppShellHeader`
- `SideNav`
- `TokenInput`
- `QuoteCard`
- `TransactionStepper`
- `MarketRow`
- `PositionCard`
- `RiskCallout`
- `AccountRail`

## Recommended Styling Strategy
Keep three layers separate:

### 1. Tokens
Map foundation values into CSS variables or Tailwind theme tokens.

### 2. Components
Wrap stable visual patterns into reusable components.

### 3. Screens
Compose components into pages without redefining core spacing, card chrome, or type scale.

## Rules For The Dev Team
- Do not replace the approved logo with a text placeholder.
- Do not shrink spacing to fit more data without a deliberate product decision.
- Do not introduce nested card-on-card-on-card patterns by default.
- Do not let dashboard density override readability.
- Keep hover, focus, pressed, and disabled states explicit for every interactive control.
- Prefer reusable components over route-level utility class clusters.

## Maintenance Rules
- Any new component should first be added to the static library or documented against an existing pattern.
- Any visual change to a shared component should update both implementation and documentation.
- Any new route in the product app should state which shared components it uses.
- If a screen requires custom exceptions, document why.

## Design Intent Summary
The system should feel:
- privacy-native
- technical
- sparse
- confident
- readable under financial density

It should not feel:
- like a generic admin dashboard
- crowded
- over-boxed
- over-glassy
- visually noisy

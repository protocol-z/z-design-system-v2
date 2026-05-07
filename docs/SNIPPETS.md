# Copy-Paste Snippets

> **Status: v2 — April 2026.** The classes below are from the archived static v1 preview (`apps/preview/archive/v1-dark-product-primitives.html`, `apps/preview/archive/v1-dark-product-primitives.css`). For the v2 patterns (aurora hero, glass module, plate surface, dotted-grid plate, editorial card, model picker), open `apps/preview/v2.html` and copy from there — markup is intentionally minimal so it can be lifted directly. The React equivalents in `packages/ui/src/components/` are already on v2 tokens; new product code should use those.

## Logo Mark

```html
<div class="hero__mark">
  <img src="./assets/logo-v2.svg" alt="Z logo" />
</div>
```

## Primary Button

```html
<button class="z-button z-button--primary">Start building</button>
```

## Secondary Button

```html
<button class="z-button z-button--secondary">Explore docs</button>
```

## Ghost Button

```html
<button class="z-button z-button--ghost">Learn more</button>
```

## Active Chip

```html
<button class="z-chip is-active">Builder</button>
```

## Micro Badge

```html
<span class="micro-badge micro-badge--mint">Proof verified</span>
```

## Text Field

```html
<label class="z-field">
  <span>Email address</span>
  <input type="email" placeholder="you@example.com" />
</label>
```

## Tabs

```html
<div class="z-tabs">
  <button class="is-active">Supply</button>
  <button>Borrow</button>
  <button>History</button>
</div>
```

## Icon Button

```html
<button class="icon-button" aria-label="Search">
  <span class="icon icon--search"></span>
</button>
```

## Wallet State

```html
<div class="wallet-state">
  <div>
    <strong>0x7A...91B4</strong>
    <span>Mainnet</span>
  </div>
  <em>Connected</em>
</div>
```

## Token Input

```html
<div class="token-input">
  <div class="token-input__top">
    <span>You pay</span>
    <span>Balance 3.49 ETH</span>
  </div>
  <div class="token-input__body">
    <strong>1.50</strong>
    <button class="asset-pill">ETH</button>
  </div>
</div>
```

## Quote Card

```html
<div class="quote-card">
  <div class="quote-row">
    <span>Minimum received</span>
    <strong>4,176.09 USDC</strong>
  </div>
  <div class="quote-row">
    <span>Price impact</span>
    <strong class="tone-warning">0.42%</strong>
  </div>
  <div class="quote-row">
    <span>Privacy state</span>
    <strong class="tone-mint">Bounded reveal</strong>
  </div>
</div>
```

## Transaction Stepper

```html
<div class="stepper">
  <div class="step is-complete">
    <span>01</span>
    <div>
      <strong>Allowance approved</strong>
      <p>Contract access granted within current limits.</p>
    </div>
  </div>
  <div class="step is-current">
    <span>02</span>
    <div>
      <strong>Swap pending</strong>
      <p>Waiting for network confirmation.</p>
    </div>
  </div>
</div>
```

## Market Row

```html
<div class="market-row">
  <div>
    <strong>ZETH</strong>
    <span>Shielded ETH market</span>
  </div>
  <div>
    <strong>4.82%</strong>
    <span>Supply APY</span>
  </div>
  <div>
    <strong>68%</strong>
    <span>Utilization</span>
  </div>
  <div class="sparkline">
    <span class="spark spark--up"></span>
  </div>
  <em class="tone-mint">Healthy</em>
</div>
```

## Position Card

```html
<article class="glass position-card">
  <div class="position-card__top">
    <div>
      <p class="eyebrow">Open Position</p>
      <h3>Supply ZETH, borrow ZUSD</h3>
    </div>
    <span class="status-dot"></span>
  </div>
  <div class="position-stat-grid">
    <div>
      <strong>$48,240</strong>
      <span>Collateral</span>
    </div>
    <div>
      <strong>$16,100</strong>
      <span>Borrowed</span>
    </div>
  </div>
</article>
```

## Risk Callout

```html
<article class="glass callout">
  <span class="callout__eyebrow">Liquidation Warning</span>
  <h3>Your health factor will drop to 1.31 if this borrow executes.</h3>
  <p>Review collateral settings or reduce borrow size before signing.</p>
</article>
```

## Toast

```html
<div class="toast toast--success">
  <span class="icon icon--check"></span>
  <div>
    <strong>Swap confirmed</strong>
    <p>Receipt is ready to review.</p>
  </div>
</div>
```

## Modal

```html
<div class="modal-card">
  <div class="modal-card__header">
    <div>
      <p class="eyebrow">Confirm borrow</p>
      <h3>Borrow 8,000 ZUSD</h3>
    </div>
    <button class="icon-button" aria-label="Close">
      <span class="icon icon--close"></span>
    </button>
  </div>
  <div class="quote-card">
    <div class="quote-row">
      <span>Projected health factor</span>
      <strong class="tone-warning">1.31</strong>
    </div>
  </div>
  <div class="modal-card__actions">
    <button class="z-button z-button--ghost">Cancel</button>
    <button class="z-button z-button--primary">Confirm borrow</button>
  </div>
</div>
```

## Account Rail

```html
<aside class="account-rail">
  <div class="account-block">
    <span>Total balance</span>
    <strong>$128,442</strong>
  </div>
  <div class="account-block">
    <span>Open positions</span>
    <strong>04</strong>
  </div>
  <div class="account-block">
    <span>Proof state</span>
    <strong class="tone-mint">Verified</strong>
  </div>
</aside>
```

## Disconnected State

```html
<article class="glass disconnected-state">
  <span class="proof-badge">Wallet state</span>
  <h3>Connect a wallet to view balances, positions, and transaction history.</h3>
  <p>Access remains bounded by the permissions and networks you approve.</p>
  <div class="row">
    <button class="z-button z-button--primary">Connect wallet</button>
    <button class="z-button z-button--secondary">Learn permissions</button>
  </div>
</article>
```

## React Naming Reference

```ts
Button
Chip
TextField
Tabs
IconButton
AppShellHeader
WalletState
TokenInput
QuoteCard
TransactionStepper
MarketRow
PositionCard
RiskCallout
Toast
ModalCard
AccountRail
DisconnectedState
```

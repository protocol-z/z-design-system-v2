# Voice — how we write

> Companion to [`BRAND.md`](./BRAND.md). This file is for anyone writing copy that ships — engineers writing UI strings, designers writing Figma annotations, marketing writing announcements, support writing docs.

## The one-sentence test

Read your sentence aloud. If it sounds like a marketing brochure, rewrite. If it sounds like a thoughtful engineer explaining their work to a curious non-engineer, you're there.

## The cadence

We write in **short, declarative sentences with one italic clause for emphasis**. The rhythm is two beats then a turn:

> Search the chain. *Privately.*
> Pay 12.50 USDZ via x402 to *api.example.com*.
> A clear morning in the mountains.

That italic clause is real Instrument Serif italic in the UI — wrap variable nouns in `<em>` and they inherit it. The structure isn't decoration; it's how we tell the reader which word does the work.

## What we sound like

| We are | We are not |
|---|---|
| Curious | Hype-y |
| Specific | Vague |
| Calm | Reassuring (about things they didn't ask about) |
| Editorial | Marketing |
| Technically honest | Apologetic |
| Patient | Rushed |
| Plainspoken | Folksy |

## Privacy-language rules

Privacy is a feature. The copy makes that explicit; it never apologizes.

| Don't | Do |
|---|---|
| "Cannot display transaction details due to privacy." | "Transfer details are private. Amounts and recipients are encrypted within the MASP pool." |
| "Sensitive transaction." | "Private transfer." |
| "Hidden for security." | "Encrypted within the shielded pool." |
| "Privacy mode active." | "Private." (just the word — the badge does the rest) |
| "Warning: this is a private transaction." | (no warning. it's working as intended.) |

## Action-banner copy

Action banners describe a transaction in plain English at the top of the detail page. They are SEO + share-card surface — the literal sentence appears in OG cards. Worth being precise.

Pattern: **Verb + amount + via/to + endpoint.** The amount and the endpoint are wrapped in `<em>` for editorial italic.

| Type | Banner copy |
|---|---|
| Shield | Shield *86.5 ZEC* into the *MASP pool* |
| Private | Private transfer within the *MASP pool* |
| Unshield | Unshield *1,200 USDZ* from the *MASP pool* |
| x402 Payment | Pay *12.50 USDZ* via x402 to *api.example.com* |
| EIP-7702 | Delegate authority to *Smart account* |
| ERC-4337 | Execute *3 user operations* via Bundler |
| Standard | Transfer *2.0 ZEC* from *0xSender* to *0xRecipient* |

## Status copy

Always positive language for normal states. Red is for actual problems.

| State | Copy | Color |
|---|---|---|
| Confirmed | "✓ Success" | mint |
| Pending | "… Pending" | stone |
| Failed | "✕ Failed" | terracotta |
| Online (validator) | "Online" | mint |
| Catching up (validator) | "Catching up" | yellow |
| Jailed (validator) | "Jailed" | terracotta |
| Inactive (validator) | "Inactive" | neutral |
| EIP-7702 validity = false | "Inactive" | neutral (not red — it's normal) |

## Number formatting

| Context | Format |
|---|---|
| Block / tx counts | Thousand-separated: `1,284,720` |
| Amounts (display) | Up to 2 decimals: `86.5 ZEC`, `12.50 USDZ` |
| Hashes | `0xabcd…1234` (truncated; full on hover via Tooltip) |
| Hex (input data, etc.) | `0x4a8c25e0…` (head only, click to expand) |
| Percentages | One decimal max: `38%`, `99.92%` |
| Time | "2 min ago", "3 hr ago", "Just now" — never "1 minute ago" (use "min") |
| Datestamps | `27 Apr 2026, 12:14:08 UTC` |

## Casing rules

- **Sentence case for everything.** Headings, buttons, labels, menu items.
- **UPPERCASE only for monospace eyebrows** (`Z PROTOCOL · MAINNET`, `LATEST BLOCK`).
- **Title Case for product names.** Z Scan. Z Trade. Z Lend.
- **lowercase for technical references in body.** "the masp pool" reads wrong; "the MASP Pool" reads right; "the pool" is fine in flow.

## Empty states

Empty states are an opportunity to teach the user what would go there. They are NEVER apologetic.

| Don't | Do |
|---|---|
| "No data" | "No transactions in this window." |
| "Nothing here yet" | "No validators in the active set." |
| "Coming soon!" | "User Ops tab — wire to the indexer to populate." (in dev). For users: "No user operations in this transaction." |
| "Error: failed to load" | "Couldn't load this block. Try again, or check the network status." |

## Loading states

Loading is a feature of the network, not a failure. Show progress, name what's loading.

| Don't | Do |
|---|---|
| "Loading…" | "Reading block 19,648…" |
| "Please wait" | (nothing — let the skeleton do the talking) |
| "Hang tight!" | (just no) |

## Error states

Be specific. Tell the user what went wrong and what they can try. No jargon.

| Don't | Do |
|---|---|
| "RPC error" | "We couldn't reach the network. Try refreshing — or check status.zprotocol.org." |
| "Invalid input" | "That doesn't look like an address, hash, or block number." |
| "Forbidden" | "This transaction was rejected by the protocol." |

## Marketing copy

For announcement / blog / social, the rules tighten:

1. **Lead with the verb.** "We shipped …" not "Today we're announcing …"
2. **Number it or skip it.** If you can't put a number on the win, the win is fuzzy and the post should wait.
3. **Show, don't claim.** Link to the chart, show the screenshot — don't write "fastest." Let the data speak.
4. **End with what the reader does next.** "Open Z Scan." "Try the Shield Portal." Always a verb.

## What we never write

- "Powered by" — anywhere. v2 retired this line.
- "Web3" as a marketing word. Use specifics ("MASP pool", "smart account", "x402 payment").
- "Disrupting" anything. Tired.
- "Revolutionary." Tired.
- Emojis in product copy. Some social copy fine; product UI no.
- "Game-changing." Especially tired.

## Review checklist before shipping a string

- [ ] Read it aloud. Does it sound like a curious engineer?
- [ ] Is the italic clause doing real work, or is it decoration?
- [ ] Does it apologize for something working as intended?
- [ ] Does the noun get specific (MASP Pool, ZEC, EntryPoint) where it should?
- [ ] Does it open with a verb?
- [ ] Is the number formatted correctly?
- [ ] Would a non-engineer understand it?

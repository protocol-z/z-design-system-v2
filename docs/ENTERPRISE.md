# Enterprise extension

Status: experimental foundation. Code is the source of truth.

The Enterprise extension gives operational and administrative products a denser working mode without forking the Z Design System. It inherits the core tokens, fonts, icon language, focus treatment, motion, radii, and themes. Only proven operational roles live here.

## Source-of-truth model

1. Product flows are explored in a runnable prototype.
2. Patterns that repeat across at least two destinations are promoted here.
3. React and CSS in `@zds/ui` are canonical.
4. `apps/preview/enterprise.html` is the reviewable visual reference.
5. Consumer repositories receive the Enterprise subpath through the manifest-based sync script.

Figma is optional for concept exploration and stakeholder communication. It is not a required mirror of the component implementation.

## Import

```tsx
import "@zds/ui/styles/tokens.css";
import "@zds/ui/styles/enterprise.css";
import { EnterpriseRoot, StateLabel } from "@zds/ui/enterprise";

export function AdminSurface() {
  return (
    <EnterpriseRoot textScale="default" density="compact">
      <StateLabel tone="positive">Active</StateLabel>
    </EnterpriseRoot>
  );
}
```

## Stable foundation

- Instrument Sans for operational headings, body, controls, and labels.
- JetBrains Mono only for identifiers, endpoints, timestamps, and evidence values.
- Semantic type roles from 11px micro metadata through 16px section headings.
- A 1.125x large-text acceptance state that complements browser zoom.
- Compact and comfortable density contracts.
- Theme-aware action, secondary-control, and field aliases.
- `EnterpriseRoot` for scoping type, density, and semantic aliases.
- `StateLabel` for compact sentence-case operational state.

## Reuse map

| Need | Current decision |
| --- | --- |
| Primary and secondary actions | Reuse `Button`; do not create Enterprise button components yet. |
| Text and select fields | Reuse `TextField` and `SelectField`; API-key work will determine whether an operational size is needed. |
| Tabs | Reuse `Tabs`; Enterprise destinations reflow rather than force horizontal scrolling. |
| Category badges | Reuse `StatusBadge`. |
| Operational status | Use `StateLabel`; it is sentence case and optimized for dense metadata. |
| Data tables | Keep product-local responsive rows until the Requests and Audit destinations prove a shared responsive table contract. |
| Activation progress | Keep product-local until API Access proves a second horizontal activation workflow. |
| Policy editor | Product composition, not a library component. |

## Promotion gate

Promote a product pattern only when:

- it appears in at least two Enterprise destinations;
- its data and product behavior can be removed from the component API;
- light, dark, default text, large text, narrow width, focus, disabled, loading, empty, and error states are known;
- it works without raw prompt, completion, tool payload, or provider-body content;
- its naming describes a reusable job rather than one screen.

Components remain `experimental` until a production consumer uses them. Breaking changes are allowed only while experimental and must update the preview, documentation, sync manifest, and consumer in the same delivery.

## Vendored Nito sync

Nito currently aliases `@zds/ui` to a vendored source tree. The existing core tree has product-specific drift, so the sync intentionally owns only the additive Enterprise subpath.

```bash
npm run sync:enterprise -- --target ../inference-gateway
npm run check:enterprise-sync -- --target ../inference-gateway
```

The sync copies only:

- `src/enterprise/EnterpriseRoot.tsx`
- `src/enterprise/StateLabel.tsx`
- `src/enterprise/index.ts`
- `src/styles/enterprise.css`

It also writes `enterprise-sync.json` with the source revision and SHA-256 hash for every owned file. Consumer CI verifies those hashes so local edits cannot silently fork the vendored Enterprise layer.


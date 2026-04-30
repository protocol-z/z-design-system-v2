import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 WalletState — connected-wallet pill with address, network, status dot.
 * Status defaults to "Connected" (mint dot). Pass `statusTone="negative"` for errors.
 */
type StatusTone = "mint" | "yellow" | "negative" | "neutral";

export type WalletStateProps = HTMLAttributes<HTMLDivElement> & {
  address: ReactNode;
  network: ReactNode;
  status?: ReactNode;
  statusTone?: StatusTone;
};

const dotColors: Record<StatusTone, string> = {
  mint: "var(--zds-mint-500)",
  yellow: "var(--zds-zcash-500)",
  negative: "var(--zds-negative)",
  neutral: "var(--zds-ink-700)"
};

export function WalletState({
  address,
  network,
  status = "Connected",
  statusTone = "mint",
  style,
  ...props
}: WalletStateProps) {
  const dot = dotColors[statusTone];

  return (
    <div
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 14,
        padding: "8px 14px",
        borderRadius: "var(--zds-radius-pill)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 8,
          height: 8,
          borderRadius: 999,
          background: dot,
          boxShadow: `0 0 0 3px color-mix(in srgb, ${dot} 28%, transparent)`,
          flex: "0 0 auto"
        }}
      />
      <div style={{ display: "grid", gap: 1, lineHeight: 1.2 }}>
        <strong style={{ color: "var(--zds-ink-950)", fontSize: 13, fontWeight: 500 }}>{address}</strong>
        <span style={{ color: "var(--zds-text-tertiary)", fontSize: 11 }}>{network}</span>
      </div>
      <em
        style={{
          fontStyle: "normal",
          color: "var(--zds-text-secondary)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase"
        }}
      >
        {status}
      </em>
    </div>
  );
}

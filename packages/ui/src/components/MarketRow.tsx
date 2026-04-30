import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 MarketRow — list row for markets, pools, instruments.
 * Three columns of label+value, optional trailing status pill.
 */
export type MarketRowProps = HTMLAttributes<HTMLDivElement> & {
  asset: ReactNode;
  assetMeta?: ReactNode;
  primaryValue: ReactNode;
  primaryLabel: ReactNode;
  secondaryValue: ReactNode;
  secondaryLabel: ReactNode;
  status?: ReactNode;
};

const valueStyle: React.CSSProperties = {
  color: "var(--zds-ink-950)",
  fontFamily: "var(--zds-font-display)",
  fontSize: 22,
  lineHeight: 1,
  letterSpacing: "-0.025em",
  fontWeight: 500
};

const labelStyle: React.CSSProperties = {
  color: "var(--zds-text-secondary)",
  fontSize: 13
};

export function MarketRow({
  asset,
  assetMeta,
  primaryValue,
  primaryLabel,
  secondaryValue,
  secondaryLabel,
  status,
  style,
  ...props
}: MarketRowProps) {
  return (
    <div
      {...props}
      style={{
        display: "grid",
        gridTemplateColumns: "1.4fr 1fr 1fr auto",
        alignItems: "center",
        columnGap: 24,
        padding: "20px 24px",
        background: "var(--zds-paper)",
        borderTop: "1px solid var(--zds-line-soft)",
        ...style
      }}
    >
      <div style={{ display: "grid", gap: 4 }}>
        <strong style={valueStyle}>{asset}</strong>
        {assetMeta ? <span style={labelStyle}>{assetMeta}</span> : null}
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        <strong style={valueStyle}>{primaryValue}</strong>
        <span style={labelStyle}>{primaryLabel}</span>
      </div>
      <div style={{ display: "grid", gap: 4 }}>
        <strong style={valueStyle}>{secondaryValue}</strong>
        <span style={labelStyle}>{secondaryLabel}</span>
      </div>
      {status ? (
        <span
          style={{
            justifySelf: "end",
            color: "var(--zds-ink-700)",
            fontSize: 13,
            fontWeight: 500
          }}
        >
          {status}
        </span>
      ) : null}
    </div>
  );
}

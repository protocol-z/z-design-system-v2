import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 PositionCard — paper plate with editorial title and 2x stat grid.
 * Optional eyebrow (campaign accent), status indicator (right-aligned),
 * and footer slot below a soft divider.
 */
export type PositionStat = {
  label: ReactNode;
  value: ReactNode;
};

export type PositionCardProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  statusIndicator?: ReactNode;
  stats: PositionStat[];
  footer?: ReactNode;
};

export function PositionCard({
  eyebrow,
  title,
  statusIndicator,
  stats,
  footer,
  style,
  ...props
}: PositionCardProps) {
  return (
    <article
      {...props}
      style={{
        display: "grid",
        gap: 24,
        padding: "28px 28px 24px",
        borderRadius: "var(--zds-radius-xl)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 20, alignItems: "start" }}>
        <div style={{ display: "grid", gap: 8 }}>
          {eyebrow ? (
            <span
              style={{
                color: "var(--zds-mint-500)",
                fontSize: 12,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                fontWeight: 500
              }}
            >
              {eyebrow}
            </span>
          ) : null}
          <h3
            style={{
              margin: 0,
              color: "var(--zds-ink-950)",
              fontFamily: "var(--zds-font-display)",
              fontSize: "1.5rem",
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 500
            }}
          >
            {title}
          </h3>
        </div>
        {statusIndicator}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
          gap: "20px 28px"
        }}
      >
        {stats.map((stat, index) => (
          <div key={index} style={{ display: "grid", gap: 6 }}>
            <strong
              style={{
                color: "var(--zds-ink-950)",
                fontFamily: "var(--zds-font-display)",
                fontSize: "1.6rem",
                lineHeight: 1,
                letterSpacing: "-0.035em",
                fontWeight: 500
              }}
            >
              {stat.value}
            </strong>
            <span style={{ color: "var(--zds-text-secondary)", fontSize: 13 }}>{stat.label}</span>
          </div>
        ))}
      </div>
      {footer ? (
        <div style={{ paddingTop: 18, borderTop: "1px solid var(--zds-line-soft)" }}>{footer}</div>
      ) : null}
    </article>
  );
}

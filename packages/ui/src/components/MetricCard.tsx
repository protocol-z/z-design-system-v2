import type { HTMLAttributes, ReactNode } from "react";
import { StatusBadge } from "./StatusBadge";

type MetricTone = "default" | "positive" | "warning" | "negative" | "private";

export type MetricCardProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  value: ReactNode;
  detail?: ReactNode;
  delta?: ReactNode;
  tone?: MetricTone;
  icon?: ReactNode;
};

const accents: Record<MetricTone, string> = {
  default: "var(--zds-stone-600)",
  positive: "var(--zds-positive)",
  warning: "var(--zds-zcash-500)",
  negative: "var(--zds-negative)",
  private: "var(--zds-mint-500)"
};

const badgeTones: Record<MetricTone, "neutral" | "positive" | "warning" | "negative" | "private"> = {
  default: "neutral",
  positive: "positive",
  warning: "warning",
  negative: "negative",
  private: "private"
};

export function MetricCard({
  label,
  value,
  detail,
  delta,
  tone = "default",
  icon,
  style,
  ...props
}: MetricCardProps) {
  const accent = accents[tone];

  return (
    <div
      {...props}
      style={{
        position: "relative",
        display: "grid",
        gap: 14,
        minHeight: 132,
        padding: 20,
        borderRadius: "var(--zds-radius-lg)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        overflow: "hidden",
        ...style
      }}
    >
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: "0 auto 0 0",
          width: 3,
          background: accent,
          opacity: tone === "default" ? 0.36 : 1
        }}
      />
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
        <span
          style={{
            color: "var(--zds-text-tertiary)",
            fontSize: 12,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 500
          }}
        >
          {label}
        </span>
        {icon && <span style={{ color: accent, display: "inline-flex" }}>{icon}</span>}
      </div>
      <strong
        style={{
          color: "var(--zds-ink-950)",
          fontFamily: "var(--zds-font-display)",
          fontSize: "clamp(28px, 3vw, 38px)",
          lineHeight: 0.95,
          letterSpacing: 0,
          fontWeight: 500
        }}
      >
        {value}
      </strong>
      {(detail || delta) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
          {detail && (
            <span style={{ color: "var(--zds-text-secondary)", fontSize: 13, lineHeight: 1.4 }}>
              {detail}
            </span>
          )}
          {delta && (
            <StatusBadge tone={badgeTones[tone]} size="sm" showDot={false}>
              {delta}
            </StatusBadge>
          )}
        </div>
      )}
    </div>
  );
}

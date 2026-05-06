import type { HTMLAttributes, ReactNode } from "react";
import { KeyValueGrid, type KeyValueRow } from "./KeyValueGrid";
import { StatusBadge } from "./StatusBadge";

type ResultTone = "positive" | "warning" | "negative" | "info" | "private";

export type ResultCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  tone?: ResultTone;
  label?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  rows?: KeyValueRow[];
  action?: ReactNode;
};

const icons: Record<ResultTone, ReactNode> = {
  positive: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  warning: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3 21 20H3L12 3z" />
      <path d="M12 10v4M12 17v.01" />
    </svg>
  ),
  negative: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M15 9 9 15M9 9l6 6" />
    </svg>
  ),
  info: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v.01M12 11v5" />
    </svg>
  ),
  private: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  )
};

const badgeTone: Record<ResultTone, "positive" | "warning" | "negative" | "info" | "private"> = {
  positive: "positive",
  warning: "warning",
  negative: "negative",
  info: "info",
  private: "private"
};

const color: Record<ResultTone, string> = {
  positive: "var(--zds-positive)",
  warning: "var(--zds-zcash-500)",
  negative: "var(--zds-negative)",
  info: "var(--zds-stone-600)",
  private: "var(--zds-mint-500)"
};

export function ResultCard({
  tone = "positive",
  label,
  title,
  description,
  rows,
  action,
  style,
  ...props
}: ResultCardProps) {
  return (
    <section
      {...props}
      style={{
        display: "grid",
        gap: 18,
        padding: 22,
        borderRadius: "var(--zds-radius-lg)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <header style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 42,
            height: 42,
            borderRadius: "var(--zds-radius-pill)",
            background: tone === "negative" ? "var(--zds-negative-wash)" : "var(--zds-positive-wash)",
            color: color[tone],
            flex: "0 0 auto"
          }}
        >
          {icons[tone]}
        </span>
        <div style={{ display: "grid", gap: 7, minWidth: 0 }}>
          <StatusBadge tone={badgeTone[tone]} size="sm">
            {label ?? tone}
          </StatusBadge>
          <h2
            style={{
              margin: 0,
              color: "var(--zds-ink-950)",
              fontFamily: "var(--zds-font-display)",
              fontSize: 22,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              fontWeight: 500
            }}
          >
            {title}
          </h2>
          {description && (
            <p style={{ margin: 0, color: "var(--zds-text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
              {description}
            </p>
          )}
        </div>
      </header>
      {rows && rows.length > 0 && <KeyValueGrid rows={rows} density="compact" />}
      {action && <div style={{ display: "flex", justifyContent: "flex-start" }}>{action}</div>}
    </section>
  );
}

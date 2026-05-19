import type { HTMLAttributes, PropsWithChildren } from "react";

type StatusTone =
  | "neutral"
  | "positive"
  | "warning"
  | "negative"
  | "private"
  | "info";

type StatusSize = "sm" | "md";

export type StatusBadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: StatusTone;
    size?: StatusSize;
    showDot?: boolean;
  }
>;

const tones: Record<StatusTone, { bg: string; border: string; color: string; dot: string }> = {
  neutral: {
    bg: "var(--zds-mist)",
    border: "var(--zds-line)",
    color: "var(--zds-text-secondary)",
    dot: "var(--zds-ink-700)"
  },
  positive: {
    bg: "var(--zds-positive-wash)",
    border: "rgba(63,181,138,0.24)",
    color: "var(--zds-ink-900)",
    dot: "var(--zds-positive)"
  },
  warning: {
    bg: "rgba(244,183,49,0.12)",
    border: "rgba(244,183,49,0.30)",
    color: "var(--zds-ink-900)",
    dot: "var(--zds-zcash-500)"
  },
  negative: {
    bg: "var(--zds-negative-wash)",
    border: "rgba(215,122,110,0.30)",
    color: "var(--zds-ink-900)",
    dot: "var(--zds-negative)"
  },
  private: {
    bg: "var(--zds-positive-wash)",
    border: "rgba(63,181,138,0.24)",
    color: "var(--zds-ink-900)",
    dot: "var(--zds-mint-500)"
  },
  info: {
    bg: "var(--zds-paper)",
    border: "var(--zds-line)",
    color: "var(--zds-ink-800)",
    dot: "var(--zds-stone-600)"
  }
};

export function StatusBadge({
  tone = "neutral",
  size = "md",
  showDot = true,
  children,
  style,
  ...props
}: StatusBadgeProps) {
  const t = tones[tone];
  const height = size === "sm" ? 24 : 30;

  return (
    <span
      {...props}
      style={{
        minHeight: height,
        display: "inline-flex",
        alignItems: "center",
        gap: size === "sm" ? 6 : 8,
        padding: size === "sm" ? "0 13px" : "0 17px",
        borderRadius: "var(--zds-radius-pill)",
        border: `1px solid ${t.border}`,
        background: t.bg,
        color: t.color,
        fontSize: size === "sm" ? 11 : 12,
        fontWeight: 500,
        lineHeight: 1,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        whiteSpace: "nowrap",
        ...style
      }}
    >
      {showDot && (
        <span
          aria-hidden="true"
          style={{
            width: size === "sm" ? 5 : 6,
            height: size === "sm" ? 5 : 6,
            borderRadius: 999,
            background: t.dot,
            flex: "0 0 auto"
          }}
        />
      )}
      {children}
    </span>
  );
}

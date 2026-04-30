import type { HTMLAttributes, PropsWithChildren } from "react";

/**
 * v2 MicroBadge — tiny tag with optional status dot.
 *
 *  default — ink dot on paper
 *  mint    — positive / live
 *  yellow  — emphasis / new
 *  moss    — editorial / archival
 *  negative — terracotta wash
 */
type MicroBadgeTone = "default" | "mint" | "yellow" | "moss" | "negative";

export type MicroBadgeProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: MicroBadgeTone;
    showDot?: boolean;
  }
>;

const dots: Record<MicroBadgeTone, string> = {
  default: "var(--zds-ink-700)",
  mint: "var(--zds-mint-500)",
  yellow: "var(--zds-zcash-500)",
  moss: "var(--zds-moss-400)",
  negative: "var(--zds-negative)"
};

export function MicroBadge({
  tone = "default",
  showDot = true,
  children,
  style,
  ...props
}: MicroBadgeProps) {
  return (
    <span
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        borderRadius: "var(--zds-radius-pill)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        color: "var(--zds-ink-700)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        lineHeight: 1,
        ...style
      }}
    >
      {showDot && (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: dots[tone],
            flex: "0 0 auto"
          }}
        />
      )}
      {children}
    </span>
  );
}

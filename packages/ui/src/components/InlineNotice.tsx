import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 InlineNotice — muted inline banner.
 *
 * Use for empty-by-design states ("Amounts hidden — encrypted within MASP pool"),
 * footnotes below tables, helper messages on tabs without action.
 * Visually feels like a *feature*, not a warning.
 *
 * Tones:
 *   private  — mint wash; the privacy "this is intentional" feeling
 *   info     — neutral mist, default helper
 *   warning  — yellow wash; cautionary but not blocking
 *   negative — terracotta wash; only for actual errors / risks
 */
type NoticeTone = "private" | "info" | "warning" | "negative";

export type InlineNoticeProps = HTMLAttributes<HTMLDivElement> & {
  tone?: NoticeTone;
  icon?: ReactNode;
  title?: ReactNode;
};

const tones: Record<NoticeTone, { bg: string; border: string; color: string; iconColor: string }> = {
  private: {
    bg:        "var(--zds-positive-wash)",
    border:    "rgba(63,181,138,0.22)",
    color:     "var(--zds-ink-800)",
    iconColor: "var(--zds-mint-500)"
  },
  info: {
    bg:        "var(--zds-mist)",
    border:    "var(--zds-line)",
    color:     "var(--zds-ink-800)",
    iconColor: "var(--zds-ink-700)"
  },
  warning: {
    bg:        "rgba(244,183,49,0.12)",
    border:    "rgba(244,183,49,0.28)",
    color:     "var(--zds-ink-800)",
    iconColor: "var(--zds-zcash-500)"
  },
  negative: {
    bg:        "var(--zds-negative-wash)",
    border:    "rgba(215,122,110,0.28)",
    color:     "var(--zds-ink-800)",
    iconColor: "var(--zds-negative)"
  }
};

const defaultIcons: Record<NoticeTone, ReactNode> = {
  private: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="11" width="16" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 1 1 8 0v4" />
    </svg>
  ),
  info: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v.01M12 11v5" />
    </svg>
  ),
  warning: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l9.5 17H2.5L12 3z" />
      <path d="M12 10v4M12 17v.01" />
    </svg>
  ),
  negative: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16v.01" />
    </svg>
  )
};

export function InlineNotice({
  tone = "info",
  icon,
  title,
  children,
  style,
  ...props
}: InlineNoticeProps) {
  const t = tones[tone];
  const resolvedIcon = icon ?? defaultIcons[tone];

  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "flex-start",
        gap: 12,
        padding: "12px 16px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--zds-radius-md)",
        color: t.color,
        fontSize: 14,
        lineHeight: 1.5,
        ...style
      }}
    >
      {resolvedIcon && (
        <span
          style={{
            color: t.iconColor,
            flex: "0 0 auto",
            display: "inline-flex",
            paddingTop: 1
          }}
        >
          {resolvedIcon}
        </span>
      )}
      <div style={{ display: "grid", gap: 2, minWidth: 0 }}>
        {title && (
          <strong style={{ fontWeight: 500, color: "var(--zds-ink-950)" }}>{title}</strong>
        )}
        {children && <div>{children}</div>}
      </div>
    </div>
  );
}

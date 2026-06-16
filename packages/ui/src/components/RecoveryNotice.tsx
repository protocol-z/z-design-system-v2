import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 RecoveryNotice — actionable error / warning card.
 *
 * For recoverable failures: a clear title + message, a primary action to retry
 * or fix, an optional secondary link, and optional collapsible technical detail
 * (uses native <details>, so it works without client JS and stays accessible).
 *
 *   <RecoveryNotice
 *     tone="error"
 *     title="Payment failed"
 *     message="Your card was declined. Update your payment method to keep sending."
 *     primaryAction={<Button variant="primary" size="sm">Update card</Button>}
 *     secondaryLink={<Button variant="link">Contact support</Button>}
 *     detail="gateway: card_declined (insufficient_funds)"
 *   />
 */
export type RecoveryTone = "error" | "warning";

export type RecoveryNoticeProps = HTMLAttributes<HTMLDivElement> & {
  tone?: RecoveryTone;
  title: ReactNode;
  message?: ReactNode;
  /** leading icon; a tone-matched default is supplied */
  icon?: ReactNode;
  /** primary action node (pass a <Button>) */
  primaryAction?: ReactNode;
  /** secondary link node (pass a link or <Button variant="link">) */
  secondaryLink?: ReactNode;
  /** collapsible technical detail */
  detail?: ReactNode;
  /** toggle label for the detail disclosure (default "Show details") */
  detailLabel?: ReactNode;
};

const tones: Record<RecoveryTone, { wash: string; border: string; accent: string }> = {
  error: {
    wash: "var(--zds-negative-wash)",
    border: "rgba(215,122,110,0.30)",
    accent: "var(--zds-negative)"
  },
  warning: {
    wash: "rgba(244,183,49,0.12)",
    border: "rgba(244,183,49,0.30)",
    accent: "var(--zds-zcash-500)"
  }
};

const defaultIcons: Record<RecoveryTone, ReactNode> = {
  error: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16v.01" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l9.5 17H2.5L12 3z" />
      <path d="M12 10v4M12 17v.01" />
    </svg>
  )
};

export function RecoveryNotice({
  tone = "error",
  title,
  message,
  icon,
  primaryAction,
  secondaryLink,
  detail,
  detailLabel = "Show details",
  style,
  ...props
}: RecoveryNoticeProps) {
  const t = tones[tone];
  const resolvedIcon = icon ?? defaultIcons[tone];

  return (
    <div
      {...props}
      role={tone === "error" ? "alert" : "status"}
      style={{
        display: "grid",
        gridTemplateColumns: "auto minmax(0,1fr)",
        gap: 14,
        padding: "18px 20px",
        borderRadius: "var(--zds-radius-lg)",
        border: `1px solid ${t.border}`,
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: t.wash,
          color: t.accent,
          flex: "0 0 auto"
        }}
      >
        {resolvedIcon}
      </span>

      <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
        <div style={{ display: "grid", gap: 4 }}>
          <strong style={{ fontSize: 15, fontWeight: 600, color: "var(--zds-ink-950)", lineHeight: 1.3 }}>
            {title}
          </strong>
          {message ? (
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--zds-text-secondary)" }}>
              {message}
            </p>
          ) : null}
        </div>

        {detail ? (
          <details style={{ fontSize: 13 }}>
            <summary
              style={{
                cursor: "pointer",
                color: "var(--zds-text-secondary)",
                fontWeight: 500,
                listStyle: "none",
                width: "fit-content"
              }}
            >
              {detailLabel}
            </summary>
            <div
              style={{
                marginTop: 8,
                padding: "10px 12px",
                borderRadius: "var(--zds-radius-sm)",
                background: "var(--zds-mist)",
                border: "1px solid var(--zds-line)",
                color: "var(--zds-text-secondary)",
                fontFamily: "var(--zds-font-mono)",
                fontSize: 12,
                lineHeight: 1.5,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word"
              }}
            >
              {detail}
            </div>
          </details>
        ) : null}

        {(primaryAction || secondaryLink) && (
          <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", marginTop: 2 }}>
            {primaryAction}
            {secondaryLink}
          </div>
        )}
      </div>
    </div>
  );
}

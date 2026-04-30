import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 ActionBanner — plain-English transaction summary at the top of a detail page.
 *
 * Etherscan-style "Transaction Action" but in v2's editorial cadence:
 *   - display-s typography
 *   - Instrument Serif italic for the variable phrase ("on Railgun", "to api.example.com")
 *   - tone follows TypeBadge family so the banner self-classifies
 *
 * Usage:
 *   <ActionBanner tone="payment" eyebrow="Action">
 *     Pay <em>12.50 USDZ</em> via x402 to <em>api.example.com</em>
 *   </ActionBanner>
 *
 * Wrap variable phrases in <em>...</em> and they inherit the serif italic.
 */
type ActionTone = "default" | "private" | "unshield" | "infra" | "payment" | "agent";

export type ActionBannerProps = HTMLAttributes<HTMLDivElement> & {
  eyebrow?: ReactNode;
  tone?: ActionTone;
  icon?: ReactNode;
};

const accents: Record<ActionTone, string> = {
  default:  "var(--zds-ink-700)",
  private:  "var(--zds-mint-500)",
  unshield: "var(--zds-moss-400)",
  infra:    "var(--zds-stone-600)",
  payment:  "var(--zds-zcash-500)",
  agent:    "var(--zds-stone-600)" // TODO: --zds-iris-500
};

export function ActionBanner({
  eyebrow = "Action",
  tone = "default",
  icon,
  children,
  style,
  ...props
}: ActionBannerProps) {
  return (
    <div
      {...props}
      style={{
        position: "relative",
        padding: "20px 24px 22px",
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-lg)",
        boxShadow: "var(--zds-shadow-plate)",
        overflow: "hidden",
        ...style
      }}
    >
      {/* hairline accent strip on the left */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          top: 16,
          bottom: 16,
          width: 3,
          borderRadius: "0 var(--zds-radius-pill) var(--zds-radius-pill) 0",
          background: accents[tone]
        }}
      />
      <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginLeft: 8 }}>
        {icon && (
          <span style={{ color: accents[tone], display: "inline-flex", alignSelf: "center" }}>
            {icon}
          </span>
        )}
        <span
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--zds-text-tertiary)",
            fontFamily: "var(--zds-font-mono)",
            flex: "0 0 auto",
            paddingTop: 4
          }}
        >
          {eyebrow}
        </span>
        <p
          style={{
            margin: 0,
            color: "var(--zds-ink-950)",
            fontFamily: "var(--zds-font-display)",
            fontSize: "clamp(20px, 2.4vw, 28px)",
            lineHeight: 1.18,
            letterSpacing: "-0.025em",
            fontWeight: 500
          }}
        >
          <style>{`
            [data-zds-action] em {
              font-family: var(--zds-font-serif);
              font-style: italic;
              font-weight: 400;
            }
          `}</style>
          <span data-zds-action>{children}</span>
        </p>
      </div>
    </div>
  );
}

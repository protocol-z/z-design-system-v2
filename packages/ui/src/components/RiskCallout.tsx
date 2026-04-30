import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 RiskCallout — editorial risk/disclosure card.
 * Eyebrow tone defaults to negative (terracotta wash), can be set to mint or yellow.
 */
type CalloutTone = "negative" | "yellow" | "mint" | "neutral";

export type RiskCalloutProps = HTMLAttributes<HTMLElement> & {
  eyebrow: ReactNode;
  title: ReactNode;
  description: ReactNode;
  tone?: CalloutTone;
};

const eyebrowStyles: Record<CalloutTone, React.CSSProperties> = {
  negative: {
    background: "var(--zds-negative-wash)",
    color: "var(--zds-negative)",
    border: "1px solid rgba(215,122,110,0.30)"
  },
  yellow: {
    background: "rgba(244,183,49,0.14)",
    color: "var(--zds-zcash-500)",
    border: "1px solid rgba(244,183,49,0.30)"
  },
  mint: {
    background: "var(--zds-positive-wash)",
    color: "var(--zds-mint-500)",
    border: "1px solid rgba(63,181,138,0.30)"
  },
  neutral: {
    background: "var(--zds-mist)",
    color: "var(--zds-ink-700)",
    border: "1px solid var(--zds-line)"
  }
};

export function RiskCallout({
  eyebrow,
  title,
  description,
  tone = "negative",
  style,
  ...props
}: RiskCalloutProps) {
  return (
    <article
      {...props}
      style={{
        display: "grid",
        gap: 18,
        alignContent: "start",
        padding: "32px 28px 28px",
        borderRadius: "var(--zds-radius-xl)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <span
        style={{
          display: "inline-flex",
          width: "fit-content",
          padding: "6px 12px",
          borderRadius: "var(--zds-radius-pill)",
          fontSize: 12,
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          ...eyebrowStyles[tone]
        }}
      >
        {eyebrow}
      </span>
      <h3
        style={{
          margin: 0,
          maxWidth: "16ch",
          color: "var(--zds-ink-950)",
          fontFamily: "var(--zds-font-display)",
          fontSize: "clamp(1.75rem, 2.4vw, 2.4rem)",
          lineHeight: 0.98,
          letterSpacing: "-0.04em",
          fontWeight: 500,
          textWrap: "balance"
        }}
      >
        {title}
      </h3>
      <p
        style={{
          margin: 0,
          maxWidth: "32ch",
          fontSize: 15,
          lineHeight: 1.5,
          color: "var(--zds-text-secondary)"
        }}
      >
        {description}
      </p>
    </article>
  );
}

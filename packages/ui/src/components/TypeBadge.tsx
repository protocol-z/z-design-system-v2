import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 TypeBadge — pill-tag for transaction type / privacy class.
 *
 * Tones reconcile the scanner change-brief proposal to v2 accent discipline:
 *   private     — Mint 500   — Shield, Shielded Transfer (privacy/active)
 *   unshield    — Zcash 500  — Unshield (transparent exit)
 *   infra       — #64748B    — EIP-7702, ERC-4337 (account abstraction / infrastructure)
 *   payment     — Zcash 500  — x402 Payment (one per surface; check for CTA conflict)
 *   agent       — #8B5CF6    — Agent Inference (new actor type)
 *   standard    — Neutral    — Default; usually no badge needed (component returns null at sm size)
 *
 * Sizes:
 *   sm — table-row size (compact, dot + label only, paper background)
 *   md — detail-page header size (color-fill background, larger label)
 *
 * The size choice enforces our discipline: dense tables get *dots on neutral pills*,
 * detail pages get *fill colors*. Don't fill-color a sm badge — it'll shout.
 */
type TypeTone = "private" | "unshield" | "infra" | "payment" | "agent" | "standard";
type TypeSize = "sm" | "md";

export type TypeBadgeProps = HTMLAttributes<HTMLSpanElement> & {
  tone: TypeTone;
  size?: TypeSize;
  label?: ReactNode;
  /** Hide the dot indicator (md size already has full color, dot is optional). */
  hideDot?: boolean;
};

const defaultLabels: Record<TypeTone, string> = {
  private:  "Private",
  unshield: "Unshield",
  infra:    "Infra",
  payment:  "Payment",
  agent:    "Agent",
  standard: "Standard"
};

const dotColors: Record<TypeTone, string> = {
  private:  "var(--zds-mint-500)",
  unshield: "var(--zds-zcash-500)",
  infra:    "#64748B",
  payment:  "var(--zds-zcash-500)",
  agent:    "#8B5CF6",
  standard: "var(--zds-ink-700)"
};

const fillColors: Record<TypeTone, { bg: string; color: string; border: string }> = {
  private:  { bg: "var(--zds-positive-wash)",     color: "var(--zds-mint-500)",  border: "rgba(63,181,138,0.30)" },
  unshield: { bg: "rgba(244,183,49,0.16)",        color: "var(--zds-zcash-500)", border: "rgba(244,183,49,0.32)" },
  infra:    { bg: "rgba(100,116,139,0.14)",       color: "#64748B",              border: "rgba(100,116,139,0.30)" },
  payment:  { bg: "rgba(244,183,49,0.16)",        color: "var(--zds-zcash-500)", border: "rgba(244,183,49,0.32)" },
  agent:    { bg: "rgba(139,92,246,0.14)",        color: "#8B5CF6",              border: "rgba(139,92,246,0.32)" },
  standard: { bg: "var(--zds-mist)",              color: "var(--zds-ink-700)",   border: "var(--zds-line)" }
};

export function TypeBadge({
  tone,
  size = "sm",
  label,
  hideDot = false,
  style,
  ...props
}: TypeBadgeProps) {
  const text = label ?? defaultLabels[tone];

  // sm: dot + label on neutral pill (paper bg)
  // md: full color fill, optional dot
  const sm: React.CSSProperties = {
    background: "var(--zds-paper)",
    border: "1px solid var(--zds-line)",
    color: "var(--zds-ink-900)",
    padding: "2px 10px 2px 8px",
    fontSize: 11,
    height: 20,
    letterSpacing: "0.04em"
  };

  const md: React.CSSProperties = {
    background: fillColors[tone].bg,
    border: `1px solid ${fillColors[tone].border}`,
    color: fillColors[tone].color,
    padding: "4px 12px 4px 10px",
    fontSize: 12,
    height: 26,
    letterSpacing: "0.05em"
  };

  return (
    <span
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        borderRadius: "var(--zds-radius-pill)",
        fontWeight: 500,
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...(size === "sm" ? sm : md),
        ...style
      }}
    >
      {!hideDot && (
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: 999,
            background: dotColors[tone],
            flex: "0 0 auto"
          }}
        />
      )}
      {text}
    </span>
  );
}

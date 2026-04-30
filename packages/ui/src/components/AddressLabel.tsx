import type { HTMLAttributes, ReactNode } from "react";
import { Tooltip } from "./Tooltip";
import { CopyButton } from "./CopyButton";

/**
 * v2 AddressLabel — named-address chip with category tone.
 *
 * Use whenever a raw hex address has a known label
 * ("MASP Pool", "Z Test Token (ZTT)", "Validator: Stakefish", etc.).
 * Hovers reveal the full address; an inline copy button is included.
 *
 * Tones:
 *   privacy    — mint, e.g. MASP Pool
 *   contract   — neutral, e.g. ERC-20 token contracts
 *   validator  — stone, e.g. validator addresses
 *   merchant   — yellow wash, e.g. x402 merchants
 *   agent      — stone (placeholder until --zds-iris-500 ships)
 */
type AddressTone = "privacy" | "contract" | "validator" | "merchant" | "agent";

export type AddressLabelProps = HTMLAttributes<HTMLSpanElement> & {
  label: ReactNode;
  address: string;
  tone?: AddressTone;
  href?: string;
  showCopy?: boolean;
  showAddressTail?: boolean;
};

const tones: Record<AddressTone, { dot: string; bg: string; border: string; color: string }> = {
  privacy: {
    dot:    "var(--zds-mint-500)",
    bg:     "var(--zds-positive-wash)",
    border: "rgba(63,181,138,0.30)",
    color:  "var(--zds-ink-900)"
  },
  contract: {
    dot:    "var(--zds-ink-700)",
    bg:     "var(--zds-mist)",
    border: "var(--zds-line)",
    color:  "var(--zds-ink-900)"
  },
  validator: {
    dot:    "var(--zds-stone-600)",
    bg:     "rgba(107,104,96,0.10)",
    border: "rgba(107,104,96,0.30)",
    color:  "var(--zds-ink-900)"
  },
  merchant: {
    dot:    "var(--zds-zcash-500)",
    bg:     "rgba(244,183,49,0.14)",
    border: "rgba(244,183,49,0.30)",
    color:  "var(--zds-ink-900)"
  },
  agent: {
    dot:    "var(--zds-stone-600)", // TODO: swap to --zds-iris-500 when token ships
    bg:     "rgba(107,104,96,0.10)",
    border: "rgba(107,104,96,0.30)",
    color:  "var(--zds-ink-900)"
  }
};

function tail(address: string, n = 4): string {
  return address.length > n ? address.slice(-n) : address;
}

export function AddressLabel({
  label,
  address,
  tone = "contract",
  href,
  showCopy = true,
  showAddressTail = true,
  style,
  ...props
}: AddressLabelProps) {
  const t = tones[tone];

  const labelInner = (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: t.dot,
          flex: "0 0 auto"
        }}
      />
      <span style={{ fontWeight: 500, fontSize: 13, color: t.color }}>{label}</span>
      {showAddressTail && (
        <span
          style={{
            fontFamily: "var(--zds-font-mono)",
            fontSize: 11,
            color: "var(--zds-text-tertiary)",
            letterSpacing: "0.02em"
          }}
        >
          ·{tail(address)}
        </span>
      )}
    </span>
  );

  const wrapped = href ? (
    <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
      {labelInner}
    </a>
  ) : (
    labelInner
  );

  return (
    <span
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "4px 10px",
        background: t.bg,
        border: `1px solid ${t.border}`,
        borderRadius: "var(--zds-radius-pill)",
        ...style
      }}
    >
      <Tooltip label={address} placement="top">
        {wrapped}
      </Tooltip>
      {showCopy && <CopyButton value={address} size={12} />}
    </span>
  );
}

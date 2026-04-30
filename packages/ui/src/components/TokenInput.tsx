import type { ButtonHTMLAttributes, HTMLAttributes, ReactNode } from "react";
import { AssetPill } from "./AssetPill";

/**
 * v2 TokenInput — paper plate row with label, large numeral, asset pill.
 * Standalone (no longer hairline-bordered top); compose vertically inside a card.
 */
export type TokenInputProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  meta?: ReactNode;
  value: ReactNode;
  asset: ReactNode;
  assetButtonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

export function TokenInput({
  label,
  meta,
  value,
  asset,
  assetButtonProps,
  style,
  ...props
}: TokenInputProps) {
  return (
    <div
      {...props}
      style={{
        padding: "20px 24px",
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-lg)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center",
          marginBottom: 12
        }}
      >
        <span style={{ color: "var(--zds-text-secondary)", fontSize: 13, fontWeight: 500 }}>{label}</span>
        {meta ? (
          <span style={{ color: "var(--zds-text-tertiary)", fontSize: 12 }}>{meta}</span>
        ) : null}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 20,
          alignItems: "center"
        }}
      >
        <strong
          style={{
            color: "var(--zds-ink-950)",
            fontFamily: "var(--zds-font-display)",
            fontSize: "2.25rem",
            lineHeight: 1,
            letterSpacing: "-0.045em",
            fontWeight: 500
          }}
        >
          {value}
        </strong>
        <AssetPill {...assetButtonProps}>{asset}</AssetPill>
      </div>
    </div>
  );
}

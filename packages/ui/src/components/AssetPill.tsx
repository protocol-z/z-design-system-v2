import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

/**
 * v2 AssetPill — token/symbol pill, dropdown affordance.
 * Used in TokenInput, market headers, position rows.
 */
export type AssetPillProps = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement>>;

export function AssetPill({ children, style, ...props }: AssetPillProps) {
  return (
    <button
      {...props}
      style={{
        height: 40,
        padding: "0 14px 0 8px",
        borderRadius: "var(--zds-radius-pill)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        color: "var(--zds-ink-900)",
        font: "inherit",
        fontSize: 14,
        fontWeight: 500,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        cursor: "pointer",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      {children}
    </button>
  );
}

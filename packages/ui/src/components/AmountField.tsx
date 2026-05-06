import type { InputHTMLAttributes, ReactNode } from "react";

export type AmountFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: ReactNode;
  asset?: ReactNode;
  balance?: ReactNode;
  hint?: ReactNode;
  maxLabel?: ReactNode;
  onMax?: () => void;
};

export function AmountField({
  label,
  asset,
  balance,
  hint,
  maxLabel = "Max",
  onMax,
  style,
  ...props
}: AmountFieldProps) {
  return (
    <label style={{ display: "grid", gap: 8 }}>
      {(label || balance) && (
        <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          {label && (
            <span style={{ fontSize: 13, color: "var(--zds-text-secondary)", fontWeight: 500 }}>
              {label}
            </span>
          )}
          {balance && (
            <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)" }}>{balance}</span>
          )}
        </span>
      )}
      <span
        style={{
          display: "grid",
          gridTemplateColumns: "1fr auto",
          alignItems: "center",
          gap: 12,
          minHeight: 72,
          padding: "10px 12px 10px 18px",
          borderRadius: "var(--zds-radius-lg)",
          border: "1px solid var(--zds-line)",
          background: "var(--zds-paper)",
          boxShadow: "var(--zds-shadow-plate)"
        }}
      >
        <input
          {...props}
          inputMode={props.inputMode ?? "decimal"}
          placeholder={props.placeholder ?? "0.00"}
          style={{
            minWidth: 0,
            border: "none",
            outline: "none",
            background: "transparent",
            color: "var(--zds-ink-950)",
            fontFamily: "var(--zds-font-display)",
            fontSize: 30,
            lineHeight: 1,
            letterSpacing: "-0.035em",
            fontWeight: 500,
            ...style
          }}
        />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          {asset && (
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                minHeight: 34,
                padding: "0 12px",
                borderRadius: "var(--zds-radius-pill)",
                background: "var(--zds-mist)",
                color: "var(--zds-ink-900)",
                fontSize: 13,
                fontWeight: 500,
                whiteSpace: "nowrap"
              }}
            >
              {asset}
            </span>
          )}
          {onMax && (
            <button
              type="button"
              onClick={onMax}
              style={{
                height: 34,
                padding: "0 12px",
                borderRadius: "var(--zds-radius-pill)",
                border: "1px solid var(--zds-line)",
                background: "var(--zds-paper)",
                color: "var(--zds-ink-900)",
                font: "inherit",
                fontSize: 12,
                fontWeight: 500,
                cursor: "pointer"
              }}
            >
              {maxLabel}
            </button>
          )}
        </span>
      </span>
      {hint && (
        <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)", lineHeight: 1.4 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

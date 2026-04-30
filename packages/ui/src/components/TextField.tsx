import type { InputHTMLAttributes } from "react";

/**
 * v2 TextField — pill-radius input on paper, soft focus ring.
 * Optional `pill` variant for fully rounded (chat / search) form fields.
 */
export type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  hint?: string;
  pill?: boolean;
};

export function TextField({ label, hint, pill = false, style, ...props }: TextFieldProps) {
  const input = (
    <input
      {...props}
      style={{
        height: 48,
        borderRadius: pill ? "var(--zds-radius-pill)" : "var(--zds-radius-md)",
        border: "1px solid var(--zds-line)",
        padding: pill ? "0 22px" : "0 18px",
        background: "var(--zds-paper)",
        color: "var(--zds-ink-950)",
        font: "inherit",
        fontSize: 15,
        outline: "none",
        boxShadow: "var(--zds-shadow-plate)",
        transition: "border-color var(--zds-dur-fast) var(--zds-ease-out), box-shadow var(--zds-dur-fast) var(--zds-ease-out)",
        width: "100%",
        ...style
      }}
    />
  );

  if (!label) return input;

  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--zds-text-secondary)", fontWeight: 500 }}>{label}</span>
      {input}
      {hint && (
        <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)", lineHeight: 1.4 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

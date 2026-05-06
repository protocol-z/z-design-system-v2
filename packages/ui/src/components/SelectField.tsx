import type { SelectHTMLAttributes } from "react";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  hint?: string;
  options?: SelectOption[];
};

export function SelectField({ label, hint, options, children, style, ...props }: SelectFieldProps) {
  const select = (
    <span style={{ position: "relative", display: "block" }}>
      <select
        {...props}
        style={{
          height: 48,
          width: "100%",
          appearance: "none",
          WebkitAppearance: "none",
          borderRadius: "var(--zds-radius-md)",
          border: "1px solid var(--zds-line)",
          padding: "0 44px 0 18px",
          background: "var(--zds-paper)",
          color: "var(--zds-ink-950)",
          font: "inherit",
          fontSize: 15,
          outline: "none",
          boxShadow: "var(--zds-shadow-plate)",
          cursor: "pointer",
          ...style
        }}
      >
        {options
          ? options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))
          : children}
      </select>
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          right: 17,
          top: "50%",
          transform: "translateY(-50%)",
          pointerEvents: "none",
          color: "var(--zds-text-tertiary)"
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </span>
    </span>
  );

  if (!label) return select;

  return (
    <label style={{ display: "grid", gap: 8 }}>
      <span style={{ fontSize: 13, color: "var(--zds-text-secondary)", fontWeight: 500 }}>
        {label}
      </span>
      {select}
      {hint && (
        <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)", lineHeight: 1.4 }}>
          {hint}
        </span>
      )}
    </label>
  );
}

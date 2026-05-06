import type { HTMLAttributes, ReactNode } from "react";

export type PresetOption = {
  value: string;
  label: ReactNode;
  helper?: ReactNode;
};

export type PresetButtonGroupProps = Omit<HTMLAttributes<HTMLDivElement>, "onChange"> & {
  options: PresetOption[];
  value?: string;
  onChange?: (value: string) => void;
  ariaLabel?: string;
};

export function PresetButtonGroup({
  options,
  value,
  onChange,
  ariaLabel = "Preset options",
  style,
  ...props
}: PresetButtonGroupProps) {
  return (
    <div
      {...props}
      role="radiogroup"
      aria-label={ariaLabel}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        ...style
      }}
    >
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange?.(option.value)}
            style={{
              minHeight: option.helper ? 48 : 34,
              display: "inline-flex",
              flexDirection: option.helper ? "column" : "row",
              alignItems: option.helper ? "flex-start" : "center",
              justifyContent: "center",
              gap: 2,
              padding: option.helper ? "8px 13px" : "0 13px",
              borderRadius: "var(--zds-radius-pill)",
              border: `1px solid ${selected ? "var(--zds-line-strong)" : "var(--zds-line)"}`,
              background: selected ? "var(--zds-ink-950)" : "var(--zds-paper)",
              color: selected ? "var(--zds-paper)" : "var(--zds-ink-900)",
              boxShadow: selected ? "none" : "var(--zds-shadow-plate)",
              font: "inherit",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer"
            }}
          >
            <span>{option.label}</span>
            {option.helper && (
              <span
                style={{
                  color: selected ? "rgba(255,255,255,0.68)" : "var(--zds-text-tertiary)",
                  fontSize: 11,
                  fontWeight: 400
                }}
              >
                {option.helper}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

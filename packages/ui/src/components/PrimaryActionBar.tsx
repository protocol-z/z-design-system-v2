import type { HTMLAttributes, ReactNode } from "react";

export type PrimaryActionBarProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  primary?: ReactNode;
  secondary?: ReactNode;
  meta?: ReactNode;
};

export function PrimaryActionBar({
  title,
  description,
  primary,
  secondary,
  meta,
  children,
  style,
  ...props
}: PrimaryActionBarProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 18,
        flexWrap: "wrap",
        padding: "16px 18px",
        borderRadius: "var(--zds-radius-lg)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <div style={{ display: "grid", gap: 4, minWidth: 220, flex: "1 1 280px" }}>
        {title && (
          <strong
            style={{
              color: "var(--zds-ink-950)",
              fontFamily: "var(--zds-font-display)",
              fontSize: 18,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              fontWeight: 500
            }}
          >
            {title}
          </strong>
        )}
        {description && (
          <span style={{ color: "var(--zds-text-secondary)", fontSize: 14, lineHeight: 1.4 }}>
            {description}
          </span>
        )}
        {meta && (
          <span style={{ color: "var(--zds-text-tertiary)", fontSize: 12, lineHeight: 1.35 }}>
            {meta}
          </span>
        )}
        {children}
      </div>
      {(primary || secondary) && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {secondary}
          {primary}
        </div>
      )}
    </div>
  );
}

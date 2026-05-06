import type { HTMLAttributes, ReactNode } from "react";

export type DataCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  footer?: ReactNode;
  inset?: "compact" | "comfortable" | "spacious";
};

const padding = {
  compact: 16,
  comfortable: 22,
  spacious: 28
};

export function DataCard({
  title,
  description,
  actions,
  footer,
  inset = "comfortable",
  children,
  style,
  ...props
}: DataCardProps) {
  const pad = padding[inset];

  return (
    <section
      {...props}
      style={{
        display: "grid",
        gap: 18,
        padding: pad,
        borderRadius: "var(--zds-radius-lg)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      {(title || description || actions) && (
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap"
          }}
        >
          <div style={{ display: "grid", gap: 5, minWidth: 0 }}>
            {title && (
              <h2
                style={{
                  margin: 0,
                  color: "var(--zds-ink-950)",
                  fontFamily: "var(--zds-font-display)",
                  fontSize: 20,
                  lineHeight: 1.05,
                  letterSpacing: "-0.025em",
                  fontWeight: 500
                }}
              >
                {title}
              </h2>
            )}
            {description && (
              <p
                style={{
                  margin: 0,
                  color: "var(--zds-text-secondary)",
                  fontSize: 14,
                  lineHeight: 1.45,
                  maxWidth: 620
                }}
              >
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
              {actions}
            </div>
          )}
        </header>
      )}
      {children}
      {footer && (
        <footer
          style={{
            paddingTop: 14,
            borderTop: "1px solid var(--zds-line-soft)",
            color: "var(--zds-text-tertiary)",
            fontSize: 13,
            lineHeight: 1.45
          }}
        >
          {footer}
        </footer>
      )}
    </section>
  );
}

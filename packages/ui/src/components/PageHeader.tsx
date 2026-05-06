import type { HTMLAttributes, ReactNode } from "react";

export type PageHeaderProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  eyebrow?: ReactNode;
  title: ReactNode;
  description?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  align?: "start" | "center";
};

export function PageHeader({
  eyebrow,
  title,
  description,
  meta,
  actions,
  align = "start",
  style,
  ...props
}: PageHeaderProps) {
  const centered = align === "center";

  return (
    <div
      {...props}
      style={{
        display: "grid",
        gap: 18,
        justifyItems: centered ? "center" : "stretch",
        textAlign: centered ? "center" : "left",
        ...style
      }}
    >
      <div style={{ display: "grid", gap: 12, justifyItems: centered ? "center" : "start" }}>
        {eyebrow && (
          <span
            style={{
              fontFamily: "var(--zds-font-mono)",
              fontSize: 11,
              letterSpacing: "0.10em",
              textTransform: "uppercase",
              color: "var(--zds-text-tertiary)",
              fontWeight: 500
            }}
          >
            {eyebrow}
          </span>
        )}
        <h1
          style={{
            margin: 0,
            color: "var(--zds-ink-950)",
            fontFamily: "var(--zds-font-display)",
            fontSize: "clamp(34px, 5.2vw, 76px)",
            lineHeight: 0.94,
            letterSpacing: "-0.045em",
            fontWeight: 500,
            maxWidth: centered ? 820 : 980
          }}
        >
          {title}
        </h1>
        {description && (
          <p
            style={{
              margin: 0,
              color: "var(--zds-text-secondary)",
              fontSize: 17,
              lineHeight: 1.55,
              maxWidth: 720
            }}
          >
            {description}
          </p>
        )}
        {meta && (
          <div
            style={{
              color: "var(--zds-text-tertiary)",
              fontSize: 13,
              lineHeight: 1.4,
              maxWidth: 760
            }}
          >
            {meta}
          </div>
        )}
      </div>
      {actions && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: centered ? "center" : "flex-start",
            gap: 10,
            flexWrap: "wrap"
          }}
        >
          {actions}
        </div>
      )}
    </div>
  );
}

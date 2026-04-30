import type { HTMLAttributes, PropsWithChildren, ReactNode } from "react";

/**
 * v2 StatTile — small data plate, paper surface with line border.
 * Use for compact KPI rows and dashboard summaries.
 */
export type StatTileProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    label: ReactNode;
    value: ReactNode;
  }
>;

export function StatTile({ label, value, children, style, ...props }: StatTileProps) {
  return (
    <div
      {...props}
      style={{
        display: "grid",
        gap: 6,
        padding: "16px 20px",
        borderRadius: "var(--zds-radius-lg)",
        border: "1px solid var(--zds-line)",
        background: "var(--zds-paper)",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <span
        style={{
          color: "var(--zds-text-tertiary)",
          fontSize: 12,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          fontWeight: 500
        }}
      >
        {label}
      </span>
      <strong
        style={{
          color: "var(--zds-ink-950)",
          fontFamily: "var(--zds-font-display)",
          fontSize: 28,
          lineHeight: 1,
          letterSpacing: "-0.035em",
          fontWeight: 500
        }}
      >
        {value}
      </strong>
      {children}
    </div>
  );
}

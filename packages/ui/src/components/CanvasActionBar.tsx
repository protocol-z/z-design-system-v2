import type { HTMLAttributes, ReactNode } from "react";

export type CanvasActionBarProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  meta?: ReactNode;
  status?: ReactNode;
  actions?: ReactNode;
};

export function CanvasActionBar({
  title,
  meta,
  status,
  actions,
  className,
  style,
  ...props
}: CanvasActionBarProps) {
  return (
    <div
      {...props}
      className={className}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        ...style
      }}
    >
      <div style={{ display: "grid", gap: 3, minWidth: 0 }}>
        <span
          style={{
            fontFamily: "var(--zds-font-mono)",
            fontSize: 10,
            letterSpacing: "0.10em",
            textTransform: "uppercase",
            color: "var(--zds-text-tertiary)",
            fontWeight: 500
          }}
        >
          {title}
        </span>
        {meta && (
          <small
            style={{
              fontFamily: "var(--zds-font-mono)",
              fontSize: 11,
              color: "var(--zds-text-secondary)",
              fontWeight: 500
            }}
          >
            {meta}
          </small>
        )}
      </div>
      {(status || actions) && (
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 8,
            flexWrap: "wrap",
            minWidth: 0
          }}
        >
          {status}
          {actions}
        </div>
      )}
    </div>
  );
}

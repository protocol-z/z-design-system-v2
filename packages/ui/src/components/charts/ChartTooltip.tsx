import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 ChartTooltip — branded hover card shared across all charts.
 *
 * Paper plate, line border, tonal numerals, title in Space Grotesk.
 * Pass `point: {x, y}` in pixel coords and the tooltip positions itself.
 */
export type ChartTooltipSeries = {
  label: ReactNode;
  value: ReactNode;
  /** Color of the dot left of the label. Use a v2 token reference. */
  tone?: string;
};

export type ChartTooltipProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  /** Plain-text or rich title (e.g. a date). */
  title?: ReactNode;
  series: ChartTooltipSeries[];
  /** When provided, the tooltip is absolutely positioned at this pixel point. */
  point?: { x: number; y: number };
  /** Container offset for tooltip positioning (e.g. 12px above the cursor). */
  offset?: { x?: number; y?: number };
};

export function ChartTooltip({
  title,
  series,
  point,
  offset = { x: 12, y: -12 },
  style,
  ...props
}: ChartTooltipProps) {
  const positioned = point
    ? {
        position: "absolute" as const,
        left: point.x + (offset.x ?? 0),
        top: point.y + (offset.y ?? 0),
        pointerEvents: "none" as const
      }
    : {};

  return (
    <div
      role="tooltip"
      {...props}
      style={{
        ...positioned,
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-md)",
        padding: "10px 12px",
        boxShadow: "var(--zds-shadow-pop)",
        minWidth: 140,
        zIndex: 50,
        ...style
      }}
    >
      {title && (
        <div
          style={{
            fontFamily: "var(--zds-font-display)",
            fontSize: 13,
            fontWeight: 500,
            color: "var(--zds-ink-950)",
            letterSpacing: "-0.015em",
            marginBottom: series.length ? 6 : 0,
            lineHeight: 1.2
          }}
        >
          {title}
        </div>
      )}
      <div style={{ display: "grid", gap: 4 }}>
        {series.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              gap: 12,
              fontSize: 12
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "var(--zds-text-secondary)"
              }}
            >
              {s.tone && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: s.tone,
                    flex: "0 0 auto"
                  }}
                />
              )}
              {s.label}
            </span>
            <strong
              style={{
                fontFamily: "var(--zds-font-mono)",
                fontWeight: 500,
                color: "var(--zds-ink-950)",
                letterSpacing: "0.02em"
              }}
            >
              {s.value}
            </strong>
          </div>
        ))}
      </div>
    </div>
  );
}

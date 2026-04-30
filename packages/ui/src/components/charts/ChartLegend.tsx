import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 ChartLegend — pill row of series names with tone dots.
 *
 *   <ChartLegend
 *     items={[
 *       { label: "Shield",   tone: "var(--zds-mint-500)" },
 *       { label: "Transfer", tone: "var(--zds-moss-400)" },
 *       { label: "Unshield", tone: "var(--zds-stone-600)" }
 *     ]}
 *   />
 *
 * Click toggles the series via `onToggle` callback (caller handles state).
 */
export type ChartLegendItem = {
  label: ReactNode;
  tone: string;
  /** Render the legend pill in a "muted/disabled" state. */
  hidden?: boolean;
};

export type ChartLegendProps = HTMLAttributes<HTMLDivElement> & {
  items: ChartLegendItem[];
  onToggle?: (index: number) => void;
  align?: "start" | "center" | "end";
};

export function ChartLegend({
  items,
  onToggle,
  align = "start",
  style,
  ...props
}: ChartLegendProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: 8,
        justifyContent: align === "start" ? "flex-start" : align === "end" ? "flex-end" : "center",
        ...style
      }}
    >
      {items.map((item, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onToggle?.(i)}
          aria-pressed={!item.hidden}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            background: "var(--zds-paper)",
            border: "1px solid var(--zds-line)",
            borderRadius: "var(--zds-radius-pill)",
            color: item.hidden ? "var(--zds-text-tertiary)" : "var(--zds-ink-900)",
            opacity: item.hidden ? 0.55 : 1,
            font: "inherit",
            fontSize: 12,
            fontWeight: 500,
            cursor: onToggle ? "pointer" : "default",
            transition: "opacity var(--zds-dur-fast) var(--zds-ease-out)"
          }}
        >
          <span
            aria-hidden="true"
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              background: item.tone,
              flex: "0 0 auto",
              opacity: item.hidden ? 0.4 : 1
            }}
          />
          {item.label}
        </button>
      ))}
    </div>
  );
}

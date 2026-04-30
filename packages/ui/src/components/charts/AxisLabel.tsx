import type { SVGProps } from "react";

/**
 * v2 AxisLabel — caption-style axis text rendered as <text> inside an SVG.
 *
 * Used by LineChart / AreaChart / BarChart for tick labels and axis titles.
 * Mono font, ink-tertiary, 11px. Can be used standalone for hand-rolled
 * SVG dashboards.
 */
export type AxisLabelProps = SVGProps<SVGTextElement> & {
  variant?: "tick" | "title";
  align?: "start" | "middle" | "end";
};

export function AxisLabel({
  variant = "tick",
  align = "middle",
  children,
  style,
  ...props
}: AxisLabelProps) {
  return (
    <text
      {...props}
      textAnchor={align}
      style={{
        fontFamily: "var(--zds-font-mono)",
        fontSize: variant === "tick" ? 11 : 12,
        fontWeight: variant === "tick" ? 400 : 500,
        fill: variant === "tick" ? "var(--zds-text-tertiary)" : "var(--zds-text-secondary)",
        letterSpacing: "0.04em",
        ...style
      }}
    >
      {children}
    </text>
  );
}

import type { HTMLAttributes } from "react";
import { CHART_GRID, CHART_PALETTE, DEFAULT_MARGIN, formatTick, niceTicks, type Margin } from "./_chartUtils";
import { AxisLabel } from "./AxisLabel";

/**
 * v2 LineChart — time-series line chart on dotted-grid background.
 *
 * Default treatment: ink line with mint area fill. For multi-series, additional
 * lines pull from the v2 palette (mint → moss → stone → ink-300). Capped at 4
 * series — pass more and the chart will throw in dev to enforce discipline.
 *
 *   <LineChart
 *     xLabels={["Apr 1","Apr 8","Apr 15","Apr 22","Apr 29"]}
 *     series={[{ label: "Shield volume", values: [120, 168, 145, 212, 248] }]}
 *   />
 */
export type LineSeries = {
  label: string;
  values: number[];
  /** Override the auto-assigned tone. Useful when you need mint specifically (privacy). */
  tone?: string;
};

export type LineChartProps = HTMLAttributes<HTMLDivElement> & {
  xLabels: string[];
  series: LineSeries[];
  height?: number;
  /** Show area fill below each line. Default true for single-series, false for multi. */
  area?: boolean;
  margin?: Partial<Margin>;
  yTickCount?: number;
  /** Override tick formatter (default: 1.2k / 4.5M). */
  formatY?: (v: number) => string;
};

export function LineChart({
  xLabels,
  series,
  height = 320,
  area,
  margin: marginOverride,
  yTickCount = 5,
  formatY = formatTick,
  style,
  ...props
}: LineChartProps) {
  if (series.length > 4) {
    throw new Error("LineChart caps at 4 series. Split the chart or pre-aggregate.");
  }
  const margin: Margin = { ...DEFAULT_MARGIN, ...marginOverride };
  const showArea = area ?? series.length === 1;
  const width = 800; // viewBox width; SVG scales to container
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;

  const allValues = series.flatMap((s) => s.values);
  const minRaw = Math.min(...allValues, 0);
  const maxRaw = Math.max(...allValues);
  const ticks = niceTicks(minRaw, maxRaw, yTickCount);
  const yMin = ticks[0];
  const yMax = ticks[ticks.length - 1];
  const yRange = yMax - yMin || 1;

  const xAt = (i: number) => (xLabels.length > 1 ? (i / (xLabels.length - 1)) * innerW : innerW / 2);
  const yAt = (v: number) => innerH - ((v - yMin) / yRange) * innerH;

  return (
    <div
      {...props}
      style={{
        width: "100%",
        background: "var(--zds-paper)",
        backgroundImage: "var(--zds-dotted-grid)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-lg)",
        boxShadow: "var(--zds-shadow-plate)",
        padding: 0,
        ...style
      }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" preserveAspectRatio="xMidYMid meet" role="img">
        <g transform={`translate(${margin.left},${margin.top})`}>
          {/* Y gridlines + tick labels */}
          {ticks.map((t, i) => {
            const y = yAt(t);
            return (
              <g key={i}>
                <line x1={0} x2={innerW} y1={y} y2={y} stroke={CHART_GRID.line} strokeDasharray={i === 0 ? "" : "0"} />
                <AxisLabel x={-8} y={y + 4} align="end">{formatY(t)}</AxisLabel>
              </g>
            );
          })}
          {/* X-axis baseline */}
          <line x1={0} x2={innerW} y1={innerH} y2={innerH} stroke={CHART_GRID.axis} />

          {/* X tick labels */}
          {xLabels.map((label, i) => {
            const x = xAt(i);
            return (
              <AxisLabel key={i} x={x} y={innerH + 18} align="middle">{label}</AxisLabel>
            );
          })}

          {/* Series */}
          {series.map((s, idx) => {
            const tone = s.tone ?? CHART_PALETTE[idx];
            const points = s.values.map((v, i) => ({ x: xAt(i), y: yAt(v) }));
            const path = points.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`).join(" ");
            const areaPath = `${path} L${points[points.length - 1].x.toFixed(2)},${innerH.toFixed(2)} L0,${innerH.toFixed(2)} Z`;
            return (
              <g key={idx}>
                {showArea && (
                  <path d={areaPath} fill={tone} fillOpacity={0.16} />
                )}
                <path d={path} fill="none" stroke={tone} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
                {/* Last point emphasis */}
                <circle cx={points[points.length - 1].x} cy={points[points.length - 1].y} r={3} fill={tone} />
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}

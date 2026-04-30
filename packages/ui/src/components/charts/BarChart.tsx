import type { HTMLAttributes } from "react";
import { CHART_GRID, CHART_PALETTE, DEFAULT_MARGIN, formatTick, niceTicks, type Margin } from "./_chartUtils";
import { AxisLabel } from "./AxisLabel";

/**
 * v2 BarChart — vertical bars, single or grouped.
 *
 *   <BarChart
 *     xLabels={["Mon","Tue","Wed","Thu","Fri"]}
 *     series={[
 *       { label: "Daily MASP txs", values: [120, 142, 168, 144, 198] }
 *     ]}
 *   />
 *
 * Multi-series renders as grouped bars; capped at 4 series.
 */
export type BarSeries = {
  label: string;
  values: number[];
  tone?: string;
};

export type BarChartProps = HTMLAttributes<HTMLDivElement> & {
  xLabels: string[];
  series: BarSeries[];
  height?: number;
  margin?: Partial<Margin>;
  yTickCount?: number;
  /** Gap between bar groups (0–1, fraction of slot). */
  groupGap?: number;
  /** Gap between bars within a group (0–1, fraction of slot). */
  barGap?: number;
  formatY?: (v: number) => string;
};

export function BarChart({
  xLabels,
  series,
  height = 320,
  margin: marginOverride,
  yTickCount = 5,
  groupGap = 0.3,
  barGap = 0.1,
  formatY = formatTick,
  style,
  ...props
}: BarChartProps) {
  if (series.length === 0) return null;
  if (series.length > 4) {
    throw new Error("BarChart caps at 4 series.");
  }

  const margin: Margin = { ...DEFAULT_MARGIN, ...marginOverride };
  const width = 800;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const n = xLabels.length;

  const allValues = series.flatMap((s) => s.values);
  const ticks = niceTicks(0, Math.max(...allValues), yTickCount);
  const yMax = ticks[ticks.length - 1];

  const slot = innerW / n;
  const groupW = slot * (1 - groupGap);
  const barW = (groupW * (1 - barGap)) / series.length;

  const xAt = (i: number) => i * slot + (slot - groupW) / 2;
  const yAt = (v: number) => innerH - (v / yMax) * innerH;

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
        ...style
      }}
    >
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" preserveAspectRatio="xMidYMid meet" role="img">
        <g transform={`translate(${margin.left},${margin.top})`}>
          {ticks.map((t, i) => {
            const y = yAt(t);
            return (
              <g key={i}>
                <line x1={0} x2={innerW} y1={y} y2={y} stroke={CHART_GRID.line} />
                <AxisLabel x={-8} y={y + 4} align="end">{formatY(t)}</AxisLabel>
              </g>
            );
          })}
          <line x1={0} x2={innerW} y1={innerH} y2={innerH} stroke={CHART_GRID.axis} />

          {/* Bars */}
          {series.map((s, sIdx) => {
            const tone = s.tone ?? CHART_PALETTE[sIdx];
            const groupOffset = sIdx * barW + sIdx * (groupW * barGap) / Math.max(series.length - 1, 1);
            return (
              <g key={sIdx}>
                {s.values.map((v, i) => {
                  const x = xAt(i) + groupOffset;
                  const y = yAt(v);
                  const h = innerH - y;
                  return (
                    <rect
                      key={i}
                      x={x}
                      y={y}
                      width={Math.max(barW, 1)}
                      height={Math.max(h, 0)}
                      fill={tone}
                      fillOpacity={0.85}
                      rx={Math.min(4, barW / 4)}
                    />
                  );
                })}
              </g>
            );
          })}

          {/* X tick labels */}
          {xLabels.map((label, i) => (
            <AxisLabel key={i} x={xAt(i) + groupW / 2} y={innerH + 18} align="middle">{label}</AxisLabel>
          ))}
        </g>
      </svg>
    </div>
  );
}

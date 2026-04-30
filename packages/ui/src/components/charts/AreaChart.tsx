import type { HTMLAttributes } from "react";
import { CHART_GRID, CHART_PALETTE, DEFAULT_MARGIN, formatTick, niceTicks, type Margin } from "./_chartUtils";
import { AxisLabel } from "./AxisLabel";

/**
 * v2 AreaChart — stacked area for compositional time series.
 *
 *   <AreaChart
 *     xLabels={["Apr 1","Apr 8","Apr 15","Apr 22","Apr 29"]}
 *     series={[
 *       { label: "Shield",   values: [10, 12, 18, 14, 22] },
 *       { label: "Transfer", values: [ 6,  8,  9, 12, 16] },
 *       { label: "Unshield", values: [ 4,  5,  6,  7,  8] }
 *     ]}
 *   />
 *
 * Capped at 4 series. Stacks bottom-up in the order provided.
 */
export type AreaSeries = {
  label: string;
  values: number[];
  tone?: string;
};

export type AreaChartProps = HTMLAttributes<HTMLDivElement> & {
  xLabels: string[];
  series: AreaSeries[];
  height?: number;
  margin?: Partial<Margin>;
  yTickCount?: number;
  formatY?: (v: number) => string;
};

export function AreaChart({
  xLabels,
  series,
  height = 320,
  margin: marginOverride,
  yTickCount = 5,
  formatY = formatTick,
  style,
  ...props
}: AreaChartProps) {
  if (series.length === 0) return null;
  if (series.length > 4) {
    throw new Error("AreaChart caps at 4 series.");
  }

  const margin: Margin = { ...DEFAULT_MARGIN, ...marginOverride };
  const width = 800;
  const innerW = width - margin.left - margin.right;
  const innerH = height - margin.top - margin.bottom;
  const n = xLabels.length;

  // Stack values
  const stacks = series[0].values.map((_, i) =>
    series.map((s) => s.values[i] ?? 0)
  );
  const totals = stacks.map((cols) => cols.reduce((a, b) => a + b, 0));
  const ticks = niceTicks(0, Math.max(...totals), yTickCount);
  const yMax = ticks[ticks.length - 1];

  const xAt = (i: number) => (n > 1 ? (i / (n - 1)) * innerW : innerW / 2);
  const yAt = (v: number) => innerH - (v / yMax) * innerH;

  // Build cumulative arrays for each series so we can draw bottom-up bands.
  const cumulative = stacks.map((cols) => {
    let sum = 0;
    return cols.map((v) => {
      sum += v;
      return sum;
    });
  });

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
          {/* Gridlines */}
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

          {/* X tick labels */}
          {xLabels.map((label, i) => (
            <AxisLabel key={i} x={xAt(i)} y={innerH + 18} align="middle">{label}</AxisLabel>
          ))}

          {/* Stacked bands — paint top series first so lower bands cover correctly */}
          {series.map((s, sIdx) => {
            const tone = s.tone ?? CHART_PALETTE[sIdx];
            const top: { x: number; y: number }[] = [];
            const bot: { x: number; y: number }[] = [];
            for (let i = 0; i < n; i++) {
              const cumTop = cumulative[i][sIdx];
              const cumBot = sIdx === 0 ? 0 : cumulative[i][sIdx - 1];
              top.push({ x: xAt(i), y: yAt(cumTop) });
              bot.push({ x: xAt(i), y: yAt(cumBot) });
            }
            const path = [
              ...top.map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`),
              ...bot
                .slice()
                .reverse()
                .map((p) => `L${p.x.toFixed(2)},${p.y.toFixed(2)}`),
              "Z"
            ].join(" ");
            return (
              <path
                key={sIdx}
                d={path}
                fill={tone}
                fillOpacity={0.55}
                stroke={tone}
                strokeOpacity={0.7}
                strokeWidth={1}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}

import type { SVGProps } from "react";

/**
 * v2 Sparkline — inline mini-chart for table cells, stat tiles, summary rows.
 *
 *   <Sparkline values={[12, 18, 22, 19, 28, 32, 41]} tone="positive" />
 *
 * Tones map to v2 status colors so a sparkline in a positive/negative cell
 * inherits the same emotional signal as the surrounding data.
 *
 *   positive — mint     (default; gains, growth, "good")
 *   negative — terracotta
 *   neutral  — ink-700
 *   private  — mint     (privacy / shielded volume)
 */
type SparkTone = "positive" | "negative" | "neutral" | "private";

export type SparklineProps = Omit<SVGProps<SVGSVGElement>, "values"> & {
  values: number[];
  tone?: SparkTone;
  /** Render as area (filled) instead of line. */
  area?: boolean;
  /** Show the last point as an emphasis dot. */
  showLastDot?: boolean;
  width?: number;
  height?: number;
};

const stroke: Record<SparkTone, string> = {
  positive: "var(--zds-mint-500)",
  negative: "var(--zds-negative)",
  neutral:  "var(--zds-ink-700)",
  private:  "var(--zds-mint-500)"
};

const fill: Record<SparkTone, string> = {
  positive: "rgba(63,181,138,0.16)",
  negative: "rgba(215,122,110,0.16)",
  neutral:  "rgba(11,11,13,0.08)",
  private:  "rgba(63,181,138,0.16)"
};

export function Sparkline({
  values,
  tone = "positive",
  area = true,
  showLastDot = true,
  width = 120,
  height = 32,
  style,
  ...props
}: SparklineProps) {
  if (values.length === 0) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const pad = 2;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const points = values.map((v, i) => {
    const x = pad + (i / (values.length - 1 || 1)) * innerW;
    const y = pad + innerH - ((v - min) / range) * innerH;
    return { x, y };
  });

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(" ");

  const areaD = `${pathD} L${points[points.length - 1].x.toFixed(2)},${(pad + innerH).toFixed(2)} L${pad.toFixed(2)},${(pad + innerH).toFixed(2)} Z`;
  const last = points[points.length - 1];

  return (
    <svg
      {...props}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "inline-block", ...style }}
      aria-hidden="true"
    >
      {area && <path d={areaD} fill={fill[tone]} />}
      <path d={pathD} fill="none" stroke={stroke[tone]} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      {showLastDot && (
        <circle cx={last.x} cy={last.y} r={2.5} fill={stroke[tone]} />
      )}
    </svg>
  );
}

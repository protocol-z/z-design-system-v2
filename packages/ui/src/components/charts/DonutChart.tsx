import type { HTMLAttributes, ReactNode } from "react";
import { CHART_PALETTE } from "./_chartUtils";

/**
 * v2 DonutChart — proportional ring with optional center label.
 *
 *   <DonutChart
 *     segments={[
 *       { label: "Shielded", value: 38 },
 *       { label: "Transparent", value: 62 }
 *     ]}
 *     centerTitle="38%"
 *     centerCaption="Privacy Ratio"
 *   />
 *
 * Capped at 4 segments. Colors flow from the v2 palette in order.
 */
export type DonutSegment = {
  label: ReactNode;
  value: number;
  tone?: string;
};

export type DonutChartProps = HTMLAttributes<HTMLDivElement> & {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
  /** Big number rendered in the center (e.g. "38%") */
  centerTitle?: ReactNode;
  /** Caption rendered below the title in the center */
  centerCaption?: ReactNode;
};

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function arcPath(cx: number, cy: number, r: number, startDeg: number, endDeg: number): string {
  const start = polar(cx, cy, r, startDeg);
  const end = polar(cx, cy, r, endDeg);
  const large = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 1 ${end.x} ${end.y}`;
}

export function DonutChart({
  segments,
  size = 200,
  thickness = 22,
  centerTitle,
  centerCaption,
  style,
  ...props
}: DonutChartProps) {
  if (segments.length === 0) return null;
  if (segments.length > 4) {
    throw new Error("DonutChart caps at 4 segments.");
  }
  const total = segments.reduce((acc, s) => acc + Math.max(s.value, 0), 0) || 1;
  const cx = size / 2;
  const cy = size / 2;
  const r = (size - thickness) / 2;

  let cursor = 0;
  const paths = segments.map((seg, i) => {
    const tone = seg.tone ?? CHART_PALETTE[i];
    const portion = (seg.value / total) * 360;
    const start = cursor;
    const end = Math.min(cursor + portion, 360 - 0.0001); // avoid full-circle edge
    cursor += portion;
    return { tone, d: arcPath(cx, cy, r, start, end), label: seg.label, value: seg.value };
  });

  return (
    <div
      {...props}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        ...style
      }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img">
        {/* Track */}
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="var(--zds-line)" strokeWidth={thickness} />
        {paths.map((p, i) => (
          <path key={i} d={p.d} fill="none" stroke={p.tone} strokeWidth={thickness} strokeLinecap="butt" />
        ))}
      </svg>
      {(centerTitle || centerCaption) && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none"
          }}
        >
          {centerTitle && (
            <strong
              style={{
                fontFamily: "var(--zds-font-display)",
                fontSize: Math.max(20, size * 0.18),
                lineHeight: 1,
                letterSpacing: "-0.035em",
                color: "var(--zds-ink-950)",
                fontWeight: 500
              }}
            >
              {centerTitle}
            </strong>
          )}
          {centerCaption && (
            <span
              style={{
                marginTop: 4,
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--zds-text-tertiary)",
                fontFamily: "var(--zds-font-mono)"
              }}
            >
              {centerCaption}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

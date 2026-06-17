import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 UsageMeter — labeled allowance bar.
 *
 * Shows used / total with an optional banked segment and a reset hint.
 * Tone is auto-derived from the ratio (ok < 80% ≤ warn < 100% ≤ over) but can
 * be forced. Decoupled from any app data — pass plain numbers.
 *
 *   <UsageMeter label="Inference credits" used={820} total={1000}
 *     unit="credits" banked={150} resetLabel="Resets in 12 days" />
 */
export type UsageTone = "ok" | "warn" | "over";

export type UsageMeterProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  used: number;
  total: number;
  /** unit suffix shown after the used / total figures (e.g. "credits") */
  unit?: string;
  /** extra banked/rollover allowance, drawn as a second muted segment */
  banked?: number;
  /** small caption under the bar (e.g. "Resets in 12 days") */
  resetLabel?: ReactNode;
  /** force a tone; otherwise derived from used/total */
  tone?: UsageTone;
  /** custom number formatter (default toLocaleString) */
  formatValue?: (n: number) => string;
};

const toneColor: Record<UsageTone, string> = {
  ok: "var(--zds-mint-500)",
  warn: "var(--zds-zcash-500)",
  over: "var(--zds-negative)"
};

function deriveTone(used: number, total: number): UsageTone {
  if (total <= 0) return "ok";
  const r = used / total;
  if (r >= 1) return "over";
  if (r >= 0.8) return "warn";
  return "ok";
}

export function UsageMeter({
  label,
  used,
  total,
  unit,
  banked,
  resetLabel,
  tone,
  formatValue,
  style,
  ...props
}: UsageMeterProps) {
  const fmt = formatValue ?? ((n: number) => n.toLocaleString());
  const resolvedTone = tone ?? deriveTone(used, total);
  const color = toneColor[resolvedTone];

  const capacity = Math.max(total + (banked ?? 0), 1);
  const usedPct = Math.min(used, capacity) / capacity;
  const basePct = Math.min(used, total) / capacity; // up to plan total
  const overflowPct = Math.max(0, usedPct - basePct); // into banked
  const bankedTrackPct = (banked ?? 0) / capacity;

  const unitSuffix = unit ? ` ${unit}` : "";

  return (
    <div
      {...props}
      style={{
        display: "grid",
        gap: 8,
        ...style
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "var(--zds-ink-900)" }}>{label}</span>
        <span style={{ fontSize: 13, fontFamily: "var(--zds-font-mono)", color: "var(--zds-text-secondary)" }}>
          <span style={{ color: resolvedTone === "over" ? color : "var(--zds-ink-900)", fontWeight: 500 }}>
            {fmt(used)}
          </span>
          {" / "}
          {fmt(total)}
          {unitSuffix}
        </span>
      </div>

      <div
        role="meter"
        aria-label={typeof label === "string" ? label : undefined}
        aria-valuenow={used}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuetext={`${fmt(used)} of ${fmt(total)}${unitSuffix}`}
        style={{
          position: "relative",
          height: 8,
          borderRadius: "var(--zds-radius-pill)",
          background: "var(--zds-mist)",
          border: "1px solid var(--zds-line)",
          overflow: "hidden"
        }}
      >
        {/* banked capacity track (drawn under the fill) */}
        {bankedTrackPct > 0 && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              insetBlock: 0,
              left: `${basePct * 100}%`,
              width: `${bankedTrackPct * 100}%`,
              background: "color-mix(in srgb, var(--zds-mint-500) 14%, transparent)"
            }}
          />
        )}
        {/* used within plan */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            insetBlock: 0,
            left: 0,
            width: `${basePct * 100}%`,
            background: color,
            transition: "width var(--zds-dur-med) var(--zds-ease-out)"
          }}
        />
        {/* used spilling into banked */}
        {overflowPct > 0 && (
          <span
            aria-hidden="true"
            style={{
              position: "absolute",
              insetBlock: 0,
              left: `${basePct * 100}%`,
              width: `${overflowPct * 100}%`,
              background: "color-mix(in srgb, var(--zds-mint-500) 55%, var(--zds-mint-300))"
            }}
          />
        )}
      </div>

      {(resetLabel || banked != null) && (
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
          {resetLabel ? (
            <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)" }}>{resetLabel}</span>
          ) : (
            <span />
          )}
          {banked != null && (
            <span style={{ fontSize: 12, color: "var(--zds-text-tertiary)", fontFamily: "var(--zds-font-mono)" }}>
              +{fmt(banked)} banked
            </span>
          )}
        </div>
      )}
    </div>
  );
}

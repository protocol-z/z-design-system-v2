// Shared chart helpers — palette, scales, tick math.
// Internal to packages/ui/src/components/charts. Don't export from index.

/** v2 series palette, capped at 4. Use in this order so the first series gets the most weight. */
export const CHART_PALETTE = [
  "var(--zds-mint-500)",
  "var(--zds-moss-400)",
  "var(--zds-stone-600)",
  "var(--zds-ink-300)"
] as const;

/** v2 grid + axis line colors. */
export const CHART_GRID = {
  line: "var(--zds-line-soft)",
  axis: "var(--zds-line)",
  text: "var(--zds-text-tertiary)"
} as const;

export type Margin = { top: number; right: number; bottom: number; left: number };

export const DEFAULT_MARGIN: Margin = { top: 24, right: 24, bottom: 44, left: 56 };

export function niceTicks(min: number, max: number, count = 5): number[] {
  if (max === min) return [min];
  const range = max - min;
  const rough = range / (count - 1);
  const pow = Math.pow(10, Math.floor(Math.log10(rough)));
  const norm = rough / pow;
  const step =
    norm < 1.5 ? 1 * pow : norm < 3 ? 2 * pow : norm < 7 ? 5 * pow : 10 * pow;
  const start = Math.floor(min / step) * step;
  const end = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = start; v <= end + 1e-9; v += step) ticks.push(Number(v.toFixed(10)));
  return ticks;
}

export function formatTick(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${(value / 1_000).toFixed(1)}k`;
  if (abs < 1 && abs > 0) return value.toFixed(2);
  return String(value);
}

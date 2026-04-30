import type { CSSProperties } from "react";

/**
 * v2 LogoMark — official Z mark from brand/logos/v2/Logo-v2-Black-noBG.svg.
 * Uses currentColor for theming. Sized via `size` (height in px).
 *
 *  default — black ink on light grounds
 *  reverse — white on dark grounds (set color via CSS or style)
 *  mint    — campaign accent
 *  yellow  — campaign accent (rare)
 */
type LogoTone = "default" | "reverse" | "mint" | "yellow";

export type LogoMarkProps = {
  tone?: LogoTone;
  size?: number;
  style?: CSSProperties;
  ariaLabel?: string;
};

const toneToColor: Record<LogoTone, string> = {
  default: "var(--zds-ink-950)",
  reverse: "#fff",
  mint: "var(--zds-mint-500)",
  yellow: "var(--zds-zcash-500)"
};

// Z width:height ratio = 665:929 ≈ 0.716
const ASPECT = 665 / 929;

export function LogoMark({
  tone = "default",
  size = 40,
  style,
  ariaLabel = "Z"
}: LogoMarkProps) {
  return (
    <svg
      role="img"
      aria-label={ariaLabel}
      width={Math.round(size * ASPECT)}
      height={size}
      viewBox="0 0 665 929"
      fill="currentColor"
      style={{ color: toneToColor[tone], display: "block", ...style }}
    >
      <path d="M625 0C647.091 0 665 17.9086 665 40V258.352C665 268.961 660.786 279.135 653.284 286.637L211.716 728.206C204.214 735.708 200 745.882 200 756.49V889C200 911.091 182.091 929 160 929H40C17.9086 929 0 911.091 0 889V673.648C0 663.039 4.21426 652.865 11.7157 645.363L453.284 203.794C460.786 196.292 465 186.118 465 175.51V40C465 17.9086 482.909 0 505 0H625Z" />
      <rect width="300" height="200" rx="40" />
      <rect x="365" y="729" width="300" height="200" rx="40" />
    </svg>
  );
}

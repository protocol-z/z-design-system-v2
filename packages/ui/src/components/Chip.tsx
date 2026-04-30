import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

/**
 * v2 Chip — small pill-shaped toggle.
 *
 *  default — line border on paper
 *  mint    — soft mint wash with mint border (selected state)
 *  dark    — ink-950 fill (selected on light grounds)
 */
type ChipTone = "default" | "mint" | "dark";

export type ChipProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    tone?: ChipTone;
    active?: boolean;
  }
>;

export function Chip({ tone = "default", active = false, children, style, ...props }: ChipProps) {
  const resolved: ChipTone = active && tone === "default" ? "dark" : tone;

  const tones: Record<ChipTone, React.CSSProperties> = {
    default: {
      background: "var(--zds-paper)",
      border: "1px solid var(--zds-line)",
      color: "var(--zds-ink-900)"
    },
    mint: {
      background: "var(--zds-positive-wash)",
      border: "1px solid rgba(63,181,138,0.35)",
      color: "var(--zds-mint-500)"
    },
    dark: {
      background: "var(--zds-ink-950)",
      border: "1px solid var(--zds-ink-950)",
      color: "#fff"
    }
  };

  return (
    <button
      {...props}
      style={{
        height: 32,
        padding: "0 14px",
        borderRadius: "var(--zds-radius-pill)",
        font: "inherit",
        fontSize: 13,
        fontWeight: 500,
        letterSpacing: "-0.005em",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        cursor: "pointer",
        ...tones[resolved],
        ...style
      }}
    >
      {children}
    </button>
  );
}

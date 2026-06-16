import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

/**
 * v2 IconButton — circle icon control.
 *
 *  default — frosted-paper with line border
 *  dark    — ink-950 fill, white icon (used for forward arrow on hero)
 *  ghost   — transparent (nav and toolbar contexts)
 */
type IconButtonTone = "default" | "dark" | "ghost";

export type IconButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & { tone?: IconButtonTone; size?: number }
>;

export function IconButton({ tone = "default", size = 40, children, style, ...props }: IconButtonProps) {
  const tones: Record<IconButtonTone, React.CSSProperties> = {
    default: {
      background: "var(--zds-paper)",
      border: "1px solid var(--zds-line)",
      color: "var(--zds-ink-900)",
      boxShadow: "var(--zds-shadow-plate)"
    },
    dark: {
      background: "var(--zds-fill-strong)",
      border: "1px solid var(--zds-fill-strong)",
      color: "var(--zds-on-fill-strong)"
    },
    ghost: {
      background: "transparent",
      border: "1px solid transparent",
      color: "var(--zds-ink-900)"
    }
  };

  return (
    <button
      {...props}
      style={{
        width: size,
        height: size,
        display: "inline-grid",
        placeItems: "center",
        borderRadius: "50%",
        cursor: "pointer",
        ...tones[tone],
        ...style
      }}
    >
      {children}
    </button>
  );
}

import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

/**
 * v2 Button — pill geometry, light-mode-first.
 *
 *  primary  — Zcash 500 (yellow). One per surface.
 *  ghost    — frosted-paper background with line border. Default workhorse.
 *  dark     — ink-950 fill on light grounds.
 *  link     — text + animated underline; for tertiary actions.
 *
 * Heights: sm 36 · md 44 · lg 52
 */
type ButtonVariant = "primary" | "ghost" | "dark" | "link";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: ButtonVariant;
    size?: ButtonSize;
  }
>;

const heights: Record<ButtonSize, number> = { sm: 36, md: 44, lg: 52 };
const px: Record<ButtonSize, string> = { sm: "0 16px", md: "0 22px", lg: "0 28px" };

export function Button({
  variant = "ghost",
  size = "md",
  children,
  style,
  ...props
}: ButtonProps) {
  const base = {
    height: heights[size],
    padding: px[size],
    borderRadius: "var(--zds-radius-pill)",
    font: "inherit",
    fontWeight: 500,
    fontSize: size === "sm" ? 14 : 15,
    letterSpacing: "-0.005em",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    cursor: "pointer",
    transition: "transform var(--zds-dur-fast) var(--zds-ease-out), background var(--zds-dur-fast) var(--zds-ease-out), box-shadow var(--zds-dur-fast) var(--zds-ease-out)",
    border: "1px solid transparent"
  } as const;

  const variants: Record<ButtonVariant, React.CSSProperties> = {
    primary: {
      background: "var(--zds-zcash-500)",
      color: "#0B0B0D",
      boxShadow: "var(--zds-shadow-plate)"
    },
    ghost: {
      background: "var(--zds-paper)",
      borderColor: "var(--zds-line)",
      color: "var(--zds-text)",
      backdropFilter: "blur(14px)",
      WebkitBackdropFilter: "blur(14px)"
    },
    dark: {
      background: "var(--zds-fill-strong)",
      color: "var(--zds-on-fill-strong)"
    },
    link: {
      height: "auto",
      padding: "4px 0",
      background: "transparent",
      color: "var(--zds-text)",
      borderRadius: 0,
      textDecoration: "underline",
      textDecorationThickness: 1,
      textUnderlineOffset: 4,
      textDecorationColor: "var(--zds-line-strong)"
    }
  };

  return (
    <button {...props} style={{ ...base, ...variants[variant], ...style }}>
      {children}
    </button>
  );
}

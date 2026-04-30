"use client";

import { useId, useState, type HTMLAttributes, type PropsWithChildren, type ReactNode } from "react";

/**
 * v2 Tooltip — paper plate with line border, settle motion.
 * Wrap any element to get a hover tooltip.
 *
 * Uses CSS-only show/hide on hover/focus + a tiny React state for keyboard focus.
 * For chart tooltips, prefer composing the bare label/plate styles directly.
 */
type TooltipPlacement = "top" | "bottom" | "left" | "right";

export type TooltipProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    label: ReactNode;
    placement?: TooltipPlacement;
    /** delay in ms before showing (default 240) */
    delay?: number;
  }
>;

const placements: Record<TooltipPlacement, React.CSSProperties> = {
  top:    { bottom: "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
  bottom: { top:    "calc(100% + 8px)", left: "50%", transform: "translateX(-50%)" },
  left:   { right:  "calc(100% + 8px)", top:  "50%", transform: "translateY(-50%)" },
  right:  { left:   "calc(100% + 8px)", top:  "50%", transform: "translateY(-50%)" }
};

export function Tooltip({
  label,
  placement = "top",
  delay = 240,
  children,
  style,
  ...props
}: TooltipProps) {
  const id = useId();
  const [visible, setVisible] = useState(false);

  return (
    <span
      {...props}
      aria-describedby={visible ? id : undefined}
      onMouseEnter={() => setTimeout(() => setVisible(true), delay)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      style={{ position: "relative", display: "inline-flex", ...style }}
    >
      {children}
      <span
        role="tooltip"
        id={id}
        style={{
          position: "absolute",
          ...placements[placement],
          padding: "6px 10px",
          background: "var(--zds-paper)",
          border: "1px solid var(--zds-line)",
          borderRadius: "var(--zds-radius-sm)",
          boxShadow: "var(--zds-shadow-pop)",
          color: "var(--zds-ink-900)",
          fontSize: 12,
          fontWeight: 500,
          fontFamily: "var(--zds-font-mono)",
          letterSpacing: "0.02em",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          opacity: visible ? 1 : 0,
          transform: `${placements[placement].transform ?? ""} translateY(${visible ? "0" : "2px"})`,
          transition: "opacity var(--zds-dur-fast) var(--zds-ease-out), transform var(--zds-dur-fast) var(--zds-ease-out)",
          zIndex: 50
        }}
      >
        {label}
      </span>
    </span>
  );
}

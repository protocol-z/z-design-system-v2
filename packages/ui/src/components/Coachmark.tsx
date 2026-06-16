import type { HTMLAttributes, ReactNode } from "react";
import { Button } from "./Button";
import { IconButton } from "./IconButton";

/**
 * v2 Coachmark — anchored product-tour bubble.
 *
 * A small dialog that points at a target element. No full-screen overlay: pass
 * an `anchorRect` (typically from target.getBoundingClientRect()) and the bubble
 * positions itself beside the target with an arrow. Omit `anchorRect` to render
 * the bubble in-flow (handy for galleries / docs).
 *
 *   <Coachmark
 *     badge="New" title="Pick a model"
 *     body="Choose the engine that fits your budget. You can switch any time."
 *     step={2} total={4}
 *     onBack={...} onNext={...} onClose={...}
 *     placement="bottom" anchorRect={rect}
 *   />
 */
export type CoachmarkPlacement = "top" | "bottom" | "left" | "right";

export type CoachmarkProps = HTMLAttributes<HTMLDivElement> & {
  title: ReactNode;
  body?: ReactNode;
  badge?: ReactNode;
  /** current step (1-based) */
  step?: number;
  /** total steps; with `step` renders an "n of m" counter */
  total?: number;
  /** which side of the target the bubble sits on (default "bottom") */
  placement?: CoachmarkPlacement;
  onBack?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  backLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** target rectangle (viewport coords) to anchor against */
  anchorRect?: { top: number; left: number; width: number; height: number };
  /** gap between target and bubble (default 12) */
  offset?: number;
  /** bubble width (default 300) */
  width?: number;
};

function anchorStyle(
  placement: CoachmarkPlacement,
  rect: NonNullable<CoachmarkProps["anchorRect"]>,
  offset: number
): React.CSSProperties {
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + rect.height / 2;
  switch (placement) {
    case "top":
      return { position: "fixed", top: rect.top - offset, left: cx, transform: "translate(-50%, -100%)" };
    case "left":
      return { position: "fixed", top: cy, left: rect.left - offset, transform: "translate(-100%, -50%)" };
    case "right":
      return { position: "fixed", top: cy, left: rect.left + rect.width + offset, transform: "translate(0, -50%)" };
    case "bottom":
    default:
      return { position: "fixed", top: rect.top + rect.height + offset, left: cx, transform: "translate(-50%, 0)" };
  }
}

function arrowStyle(placement: CoachmarkPlacement): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 12,
    height: 12,
    background: "var(--zds-paper)",
    border: "1px solid var(--zds-line)",
    transform: "rotate(45deg)"
  };
  switch (placement) {
    case "top": // bubble above target → arrow at bottom edge
      return { ...base, bottom: -7, left: "50%", marginLeft: -6, borderTop: "none", borderLeft: "none" };
    case "left": // bubble left of target → arrow at right edge
      return { ...base, right: -7, top: "50%", marginTop: -6, borderBottom: "none", borderLeft: "none" };
    case "right": // bubble right of target → arrow at left edge
      return { ...base, left: -7, top: "50%", marginTop: -6, borderTop: "none", borderRight: "none" };
    case "bottom": // bubble below target → arrow at top edge
    default:
      return { ...base, top: -7, left: "50%", marginLeft: -6, borderBottom: "none", borderRight: "none" };
  }
}

export function Coachmark({
  title,
  body,
  badge,
  step,
  total,
  placement = "bottom",
  onBack,
  onNext,
  onClose,
  backLabel = "Back",
  nextLabel = "Next",
  anchorRect,
  offset = 12,
  width = 300,
  style,
  ...props
}: CoachmarkProps) {
  const positioned = anchorRect ? anchorStyle(placement, anchorRect, offset) : {};
  const showCounter = typeof step === "number" && typeof total === "number";
  const showBack = !!onBack && (step == null || step > 1);

  return (
    <div
      {...props}
      role="dialog"
      aria-modal="false"
      style={{
        ...positioned,
        width,
        maxWidth: "calc(100vw - 24px)",
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-lg)",
        boxShadow: "var(--zds-shadow-pop)",
        padding: 18,
        display: "grid",
        gap: 12,
        zIndex: 60,
        ...style
      }}
    >
      {anchorRect ? <span aria-hidden="true" style={arrowStyle(placement)} /> : null}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
          {badge ? (
            <span
              style={{
                width: "fit-content",
                padding: "3px 10px",
                borderRadius: "var(--zds-radius-pill)",
                background: "var(--zds-positive-wash)",
                color: "var(--zds-mint-500)",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.04em",
                textTransform: "uppercase"
              }}
            >
              {badge}
            </span>
          ) : null}
          <strong
            style={{
              fontFamily: "var(--zds-font-display)",
              fontSize: 18,
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: "var(--zds-ink-950)",
              lineHeight: 1.15
            }}
          >
            {title}
          </strong>
        </div>
        {onClose ? (
          <IconButton tone="ghost" size={28} onClick={onClose} aria-label="Close" style={{ flex: "0 0 auto", marginTop: -2 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </IconButton>
        ) : null}
      </div>

      {body ? (
        <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: "var(--zds-text-secondary)" }}>{body}</p>
      ) : null}

      {(showCounter || showBack || onNext) && (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginTop: 2 }}>
          <span style={{ fontSize: 12, fontFamily: "var(--zds-font-mono)", color: "var(--zds-text-tertiary)" }}>
            {showCounter ? `${step} of ${total}` : ""}
          </span>
          <div style={{ display: "flex", gap: 8 }}>
            {showBack ? (
              <Button variant="ghost" size="sm" onClick={onBack}>
                {backLabel}
              </Button>
            ) : null}
            {onNext ? (
              <Button variant="primary" size="sm" onClick={onNext}>
                {nextLabel}
              </Button>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
}

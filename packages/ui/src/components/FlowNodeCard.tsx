import type { ButtonHTMLAttributes, ReactNode } from "react";

export type FlowNodeTone = "done" | "active" | "review" | "blocked" | "neutral";

export type FlowNodeCardProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  rail: ReactNode;
  label: ReactNode;
  meta?: ReactNode;
  tone?: FlowNodeTone;
  selected?: boolean;
  source?: boolean;
  connectable?: boolean;
};

const toneStyle: Record<FlowNodeTone, React.CSSProperties> = {
  done: {
    borderColor: "rgba(63,181,138,0.42)"
  },
  active: {
    background: "rgba(248,181,46,0.14)",
    borderColor: "rgba(248,181,46,0.62)"
  },
  review: {},
  blocked: {
    opacity: 0.82
  },
  neutral: {}
};

export function FlowNodeCard({
  rail,
  label,
  meta,
  tone = "neutral",
  selected = false,
  source = false,
  connectable = false,
  className,
  style,
  ...props
}: FlowNodeCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      {...props}
      className={className}
      style={{
        display: "grid",
        gap: 6,
        padding: 14,
        borderRadius: "var(--zds-radius-md)",
        border: "1px solid var(--zds-line)",
        background: "var(--zi-node-fill, var(--zds-paper))",
        boxShadow: selected || source ? "var(--zds-shadow-pop)" : "var(--zds-shadow-plate)",
        textAlign: "left",
        cursor: connectable ? "crosshair" : "grab",
        touchAction: "none",
        userSelect: "none",
        transition:
          "transform var(--zds-dur-fast) var(--zds-ease-out), box-shadow var(--zds-dur-fast) var(--zds-ease-out), border-color var(--zds-dur-fast) var(--zds-ease-out)",
        ...toneStyle[tone],
        ...(selected ? { borderColor: "var(--zds-line-focus)" } : null),
        ...(source
          ? {
              borderColor: "var(--zds-mint-500)",
              boxShadow: "0 0 0 4px rgba(63,181,138,0.12), var(--zds-shadow-pop)"
            }
          : null),
        ...style
      }}
    >
      <span
        style={{
          fontFamily: "var(--zds-font-mono)",
          fontSize: 9,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "var(--zds-text-tertiary)",
          fontWeight: 500
        }}
      >
        {rail}
      </span>
      <strong
        style={{
          color: "var(--zi-node-text, var(--zds-text))",
          fontWeight: 500,
          fontSize: 15,
          lineHeight: 1.15
        }}
      >
        {label}
      </strong>
      {meta && (
        <span
          style={{
            fontFamily: "var(--zds-font-mono)",
            color: "var(--zds-text-secondary)",
            fontSize: 11
          }}
        >
          {meta}
        </span>
      )}
    </button>
  );
}

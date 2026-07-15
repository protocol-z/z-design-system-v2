import type { HTMLAttributes, PropsWithChildren } from "react";

export type EnterpriseStateTone = "neutral" | "positive" | "attention" | "negative" | "info";
export type EnterpriseStateSize = "sm" | "md";

export type StateLabelProps = PropsWithChildren<
  HTMLAttributes<HTMLSpanElement> & {
    tone?: EnterpriseStateTone;
    size?: EnterpriseStateSize;
    showDot?: boolean;
  }
>;

/**
 * Compact sentence-case state for operational workflows. This is distinct
 * from StatusBadge, which remains the categorical/all-caps badge primitive.
 */
export function StateLabel({
  tone = "neutral",
  size = "sm",
  showDot = true,
  className,
  children,
  ...props
}: StateLabelProps) {
  return (
    <span
      {...props}
      className={["zds-enterprise-state-label", className].filter(Boolean).join(" ")}
      data-tone={tone}
      data-size={size}
    >
      {showDot ? <span className="zds-enterprise-state-label__dot" aria-hidden="true" /> : null}
      <span>{children}</span>
    </span>
  );
}


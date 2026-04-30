import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 TransactionStepper — vertical stepper with editorial titles.
 * Step states: default · current (mint accent) · complete (yellow fill).
 */
export type StepState = "default" | "complete" | "current";

export type TransactionStep = {
  index: string;
  title: ReactNode;
  description?: ReactNode;
  state?: StepState;
};

export type TransactionStepperProps = HTMLAttributes<HTMLDivElement> & {
  steps: TransactionStep[];
};

export function TransactionStepper({ steps, style, ...props }: TransactionStepperProps) {
  return (
    <div {...props} style={{ display: "grid", gap: 18, ...style }}>
      {steps.map((step, idx) => {
        const complete = step.state === "complete";
        const current = step.state === "current";

        const indexStyle: React.CSSProperties = complete
          ? { background: "var(--zds-zcash-500)", color: "var(--zds-ink-950)", border: "1px solid var(--zds-zcash-500)" }
          : current
            ? { background: "var(--zds-paper)", color: "var(--zds-mint-500)", border: "1.5px solid var(--zds-mint-500)" }
            : { background: "var(--zds-paper)", color: "var(--zds-text-tertiary)", border: "1px solid var(--zds-line)" };

        return (
          <div
            key={idx}
            style={{
              display: "grid",
              gridTemplateColumns: "56px minmax(0, 1fr)",
              gap: 20,
              alignItems: "start",
              paddingTop: idx === 0 ? 0 : 18,
              borderTop: idx === 0 ? "0" : "1px solid var(--zds-line-soft)"
            }}
          >
            <span
              style={{
                width: 44,
                height: 44,
                display: "grid",
                placeItems: "center",
                borderRadius: "50%",
                fontSize: 14,
                fontWeight: 500,
                fontFamily: "var(--zds-font-mono)",
                ...indexStyle
              }}
            >
              {step.index}
            </span>
            <div style={{ display: "grid", gap: 6, paddingTop: 4 }}>
              <strong
                style={{
                  color: "var(--zds-ink-950)",
                  fontFamily: "var(--zds-font-display)",
                  fontSize: "1.5rem",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                  fontWeight: 500
                }}
              >
                {step.title}
              </strong>
              {step.description ? (
                <p
                  style={{
                    margin: 0,
                    maxWidth: "32rem",
                    fontSize: 14,
                    lineHeight: 1.5,
                    color: "var(--zds-text-secondary)"
                  }}
                >
                  {step.description}
                </p>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

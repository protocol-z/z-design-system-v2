import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 ProcessSteps — compact vertical run-list for live, multi-step work.
 *
 * Unlike TransactionStepper (editorial, big titles for signing flows), this is a
 * tight status list: done / active / todo, with a spinner on the active step and
 * an optional inline action node (e.g. an "AI is thinking…" shimmer or a Retry).
 *
 *   <ProcessSteps steps={[
 *     { label: "Read your prompt", state: "done" },
 *     { label: "Searching docs", state: "active", action: <em>AI is thinking…</em> },
 *     { label: "Draft answer", state: "todo" },
 *   ]} />
 */
export type ProcessStepState = "done" | "active" | "todo";

export type ProcessStep = {
  label: ReactNode;
  description?: ReactNode;
  state?: ProcessStepState;
  /** inline node rendered after the active label (spinner-adjacent) */
  action?: ReactNode;
};

export type ProcessStepsProps = HTMLAttributes<HTMLDivElement> & {
  steps: ProcessStep[];
  /** show a spinner on the active step (default true) */
  spinner?: boolean;
};

const spinKeyframes = `
@keyframes zds-process-spin { to { transform: rotate(360deg); } }
@media (prefers-reduced-motion: reduce) {
  .zds-process-spinner { animation: none !important; }
}
`;

function Marker({ state, spinner }: { state: ProcessStepState; spinner: boolean }) {
  if (state === "done") {
    return (
      <span
        aria-hidden="true"
        style={{
          width: 22,
          height: 22,
          borderRadius: "50%",
          display: "grid",
          placeItems: "center",
          background: "var(--zds-mint-500)",
          color: "#fff"
        }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>
    );
  }
  if (state === "active") {
    return (
      <span
        aria-hidden="true"
        style={{ width: 22, height: 22, display: "grid", placeItems: "center" }}
      >
        {spinner ? (
          <span
            className="zds-process-spinner"
            style={{
              width: 16,
              height: 16,
              borderRadius: "50%",
              border: "2px solid color-mix(in srgb, var(--zds-mint-500) 28%, transparent)",
              borderTopColor: "var(--zds-mint-500)",
              animation: "zds-process-spin 0.8s linear infinite"
            }}
          />
        ) : (
          <span style={{ width: 12, height: 12, borderRadius: "50%", background: "var(--zds-mint-500)" }} />
        )}
      </span>
    );
  }
  return (
    <span
      aria-hidden="true"
      style={{
        width: 22,
        height: 22,
        borderRadius: "50%",
        border: "1.5px solid var(--zds-line-strong)",
        background: "var(--zds-paper)"
      }}
    />
  );
}

export function ProcessSteps({ steps, spinner = true, style, ...props }: ProcessStepsProps) {
  return (
    <div {...props} role="list" style={{ display: "grid", gap: 0, ...style }}>
      <style>{spinKeyframes}</style>
      {steps.map((step, idx) => {
        const state = step.state ?? "todo";
        const last = idx === steps.length - 1;
        const labelColor =
          state === "todo" ? "var(--zds-text-tertiary)" : "var(--zds-ink-900)";
        return (
          <div
            key={idx}
            role="listitem"
            aria-current={state === "active" ? "step" : undefined}
            aria-busy={state === "active" ? true : undefined}
            style={{ display: "grid", gridTemplateColumns: "22px minmax(0,1fr)", gap: 12 }}
          >
            <div style={{ display: "grid", gridTemplateRows: "22px 1fr", justifyItems: "center" }}>
              <Marker state={state} spinner={spinner} />
              {!last && (
                <span
                  aria-hidden="true"
                  style={{
                    width: 2,
                    flex: 1,
                    marginTop: 2,
                    marginBottom: 2,
                    minHeight: 16,
                    background: state === "done" ? "var(--zds-mint-500)" : "var(--zds-line)"
                  }}
                />
              )}
            </div>
            <div style={{ paddingBottom: last ? 0 : 16, display: "grid", gap: 3, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: labelColor,
                    lineHeight: 1.3
                  }}
                >
                  {step.label}
                </span>
                {state === "active" && step.action ? (
                  <span style={{ fontSize: 13, color: "var(--zds-text-secondary)", fontFamily: "var(--zds-font-serif)", fontStyle: "italic" }}>
                    {step.action}
                  </span>
                ) : null}
              </div>
              {step.description ? (
                <span style={{ fontSize: 13, color: "var(--zds-text-secondary)", lineHeight: 1.45 }}>
                  {step.description}
                </span>
              ) : null}
            </div>
          </div>
        );
      })}
    </div>
  );
}

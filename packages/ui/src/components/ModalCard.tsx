import type { HTMLAttributes, ReactNode } from "react";

export type ModalCardProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  onClose?: () => void;
  closeLabel?: string;
  width?: number;
};

export function ModalCard({
  title,
  description,
  actions,
  onClose,
  closeLabel = "Close",
  width = 520,
  children,
  style,
  ...props
}: ModalCardProps) {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "grid",
        placeItems: "center",
        padding: 20,
        background: "rgba(11,11,13,0.38)",
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)"
      }}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose?.();
      }}
    >
      <section
        {...props}
        role="dialog"
        aria-modal="true"
        aria-label={typeof title === "string" ? title : undefined}
        style={{
          width: `min(${width}px, 100%)`,
          maxHeight: "min(760px, calc(100vh - 40px))",
          overflow: "auto",
          display: "grid",
          gap: 18,
          padding: 22,
          borderRadius: "var(--zds-radius-lg)",
          border: "1px solid var(--zds-line)",
          background: "var(--zds-paper)",
          boxShadow: "var(--zds-shadow-pop)",
          ...style
        }}
      >
        <header
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16
          }}
        >
          <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
            <h2
              style={{
                margin: 0,
                color: "var(--zds-ink-950)",
                fontFamily: "var(--zds-font-display)",
                fontSize: 24,
                lineHeight: 1,
                letterSpacing: "-0.03em",
                fontWeight: 500
              }}
            >
              {title}
            </h2>
            {description && (
              <p style={{ margin: 0, color: "var(--zds-text-secondary)", fontSize: 14, lineHeight: 1.5 }}>
                {description}
              </p>
            )}
          </div>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label={closeLabel}
              style={{
                width: 34,
                height: 34,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "var(--zds-radius-pill)",
                border: "1px solid var(--zds-line)",
                background: "var(--zds-mist)",
                color: "var(--zds-ink-900)",
                cursor: "pointer"
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          )}
        </header>
        {children}
        {actions && (
          <footer
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 8,
              flexWrap: "wrap",
              paddingTop: 14,
              borderTop: "1px solid var(--zds-line-soft)"
            }}
          >
            {actions}
          </footer>
        )}
      </section>
    </div>
  );
}

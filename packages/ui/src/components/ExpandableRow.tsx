"use client";

import { useState, type HTMLAttributes, type ReactNode } from "react";

/**
 * v2 ExpandableRow — standalone expandable row outside of DataTable.
 *
 * Use when a single row of detail wants progressive disclosure but isn't part
 * of a full table (e.g. an inline UserOps row inside a tx detail tab body).
 *
 * For tables, prefer DataTable with `row.expandable: true` — same visual
 * language but managed by the table.
 */
export type ExpandableRowProps = HTMLAttributes<HTMLDivElement> & {
  summary: ReactNode;
  defaultOpen?: boolean;
  /** Called when the open state changes. */
  onToggle?: (open: boolean) => void;
};

export function ExpandableRow({
  summary,
  defaultOpen = false,
  onToggle,
  children,
  style,
  ...props
}: ExpandableRowProps) {
  const [open, setOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  return (
    <div
      {...props}
      style={{
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-md)",
        overflow: "hidden",
        ...style
      }}
    >
      <button
        type="button"
        onClick={handleToggle}
        aria-expanded={open}
        style={{
          display: "flex",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          gap: 12,
          padding: "12px 16px",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--zds-ink-950)",
          fontFamily: "inherit",
          fontSize: 14,
          textAlign: "left"
        }}
      >
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            width: 14,
            height: 14,
            alignItems: "center",
            justifyContent: "center",
            transform: open ? "rotate(90deg)" : "rotate(0)",
            transition: "transform var(--zds-dur-fast) var(--zds-ease-out)",
            color: "var(--zds-text-tertiary)",
            flex: "0 0 auto"
          }}
        >
          ›
        </span>
        <span style={{ flex: 1, minWidth: 0 }}>{summary}</span>
      </button>
      {open && (
        <div
          style={{
            padding: "0 16px 16px 42px",
            borderTop: "1px solid var(--zds-line-soft)",
            background: "var(--zds-cream)",
            color: "var(--zds-ink-900)",
            fontSize: 13,
            lineHeight: 1.55
          }}
        >
          <div style={{ paddingTop: 12 }}>{children}</div>
        </div>
      )}
    </div>
  );
}

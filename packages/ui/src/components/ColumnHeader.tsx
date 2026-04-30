import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 ColumnHeader — sortable header cell.
 *
 * Most consumers will get the same look automatically via DataTable's column
 * descriptors. ColumnHeader exists for hand-rolled tables (or sticky-header
 * scrollable layouts) that need the same visual language.
 */
export type ColumnHeaderProps = HTMLAttributes<HTMLTableCellElement> & {
  label: ReactNode;
  sortable?: boolean;
  sorted?: "asc" | "desc" | null;
  align?: "start" | "center" | "end";
  onSortChange?: () => void;
};

export function ColumnHeader({
  label,
  sortable = false,
  sorted = null,
  align = "start",
  onSortChange,
  style,
  ...props
}: ColumnHeaderProps) {
  return (
    <th
      {...props}
      onClick={sortable ? onSortChange : undefined}
      style={{
        padding: "10px 12px",
        textAlign: align,
        background: "var(--zds-mist)",
        color: "var(--zds-text-secondary)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        borderBottom: "1px solid var(--zds-line)",
        cursor: sortable ? "pointer" : "default",
        whiteSpace: "nowrap",
        userSelect: "none",
        ...style
      }}
    >
      <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
        {label}
        {sortable && (
          <span
            aria-hidden="true"
            style={{
              opacity: sorted ? 1 : 0.35,
              transition: "opacity var(--zds-dur-fast) var(--zds-ease-out)"
            }}
          >
            {sorted === "desc" ? "▾" : "▴"}
          </span>
        )}
      </span>
    </th>
  );
}

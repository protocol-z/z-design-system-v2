"use client";

import { useState, type HTMLAttributes, type ReactNode, type Key } from "react";

/**
 * v2 DataTable — table primitive for list pages.
 *
 * Composable with HashChip / AddressLabel / TypeBadge / MicroBadge.
 * Sortable columns via `sortable: true` on the column descriptor + `onSort` callback.
 *
 * Visual: paper plate, hairline rows, hover = mist. Compact density for dense
 * scanner pages; comfortable for marketing.
 *
 * Use ExpandableRow inside `rows` if you want inline expansion (UserOps, etc.) —
 * pass `expandable: true` on the row and provide `expandedContent`.
 */
export type DataColumn<T> = {
  key: keyof T | string;
  header: ReactNode;
  width?: string;
  align?: "start" | "center" | "end";
  sortable?: boolean;
  cell?: (row: T) => ReactNode;
};

export type DataRow<T> = T & {
  id: Key;
  expandable?: boolean;
  expandedContent?: ReactNode;
};

export type DataTableProps<T> = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  columns: DataColumn<T>[];
  rows: DataRow<T>[];
  density?: "compact" | "comfortable";
  zebra?: boolean;
  onRowClick?: (row: DataRow<T>) => void;
  onSort?: (key: string, direction: "asc" | "desc") => void;
  defaultSort?: { key: string; direction: "asc" | "desc" };
  empty?: ReactNode;
};

export function DataTable<T>({
  columns,
  rows,
  density = "compact",
  zebra = false,
  onRowClick,
  onSort,
  defaultSort,
  empty = "No results.",
  style,
  ...props
}: DataTableProps<T>) {
  const [sort, setSort] = useState(defaultSort);
  const [expanded, setExpanded] = useState<Set<Key>>(new Set());

  const handleSort = (key: string) => {
    const next: { key: string; direction: "asc" | "desc" } = sort?.key === key
      ? { key, direction: sort.direction === "asc" ? "desc" : "asc" }
      : { key, direction: "asc" };
    setSort(next);
    onSort?.(next.key, next.direction);
  };

  const toggleExpand = (id: Key) => {
    setExpanded((prev) => {
      const n = new Set(prev);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  const padY = density === "compact" ? 10 : 16;
  const padX = density === "compact" ? 12 : 16;

  return (
    <div
      {...props}
      style={{
        background: "var(--zds-paper)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-lg)",
        overflow: "hidden",
        boxShadow: "var(--zds-shadow-plate)",
        ...style
      }}
    >
      <div style={{ overflowX: "auto" }}>
        <table
          role="table"
          style={{
            width: "100%",
            borderCollapse: "separate",
            borderSpacing: 0,
            fontFamily: "var(--zds-font-body)"
          }}
        >
          <thead>
            <tr>
              {columns.map((col) => {
                const isSorted = sort?.key === col.key;
                return (
                  <th
                    key={String(col.key)}
                    onClick={col.sortable ? () => handleSort(String(col.key)) : undefined}
                    style={{
                      padding: `${padY}px ${padX}px`,
                      textAlign: col.align ?? "start",
                      width: col.width,
                      background: "var(--zds-mist)",
                      color: "var(--zds-text-secondary)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      borderBottom: "1px solid var(--zds-line)",
                      cursor: col.sortable ? "pointer" : "default",
                      whiteSpace: "nowrap",
                      userSelect: "none"
                    }}
                  >
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                      {col.header}
                      {col.sortable && (
                        <span
                          aria-hidden="true"
                          style={{
                            display: "inline-flex",
                            opacity: isSorted ? 1 : 0.35,
                            transition: "opacity var(--zds-dur-fast) var(--zds-ease-out)"
                          }}
                        >
                          {isSorted && sort?.direction === "desc" ? "▾" : "▴"}
                        </span>
                      )}
                    </span>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  style={{
                    padding: "32px 16px",
                    textAlign: "center",
                    color: "var(--zds-text-tertiary)",
                    fontSize: 14
                  }}
                >
                  {empty}
                </td>
              </tr>
            )}
            {rows.map((row, rIdx) => {
              const isExpanded = expanded.has(row.id);
              const rowBg = zebra && rIdx % 2 === 1 ? "var(--zds-cream)" : "transparent";
              return (
                <DataTableRow
                  key={row.id}
                  row={row}
                  rIdx={rIdx}
                  rowBg={rowBg}
                  columns={columns}
                  isExpanded={isExpanded}
                  onToggleExpand={toggleExpand}
                  onRowClick={onRowClick}
                  padY={padY}
                  padX={padX}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DataTableRow<T>({
  row,
  rIdx,
  rowBg,
  columns,
  isExpanded,
  onToggleExpand,
  onRowClick,
  padY,
  padX
}: {
  row: DataRow<T>;
  rIdx: number;
  rowBg: string;
  columns: DataColumn<T>[];
  isExpanded: boolean;
  onToggleExpand: (id: Key) => void;
  onRowClick?: (row: DataRow<T>) => void;
  padY: number;
  padX: number;
}) {
  const clickable = !!onRowClick || !!row.expandable;

  const handleClick = () => {
    if (row.expandable) onToggleExpand(row.id);
    else onRowClick?.(row);
  };

  return (
    <>
      <tr
        onClick={clickable ? handleClick : undefined}
        style={{
          background: rowBg,
          cursor: clickable ? "pointer" : "default",
          transition: "background var(--zds-dur-fast) var(--zds-ease-out)"
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLTableRowElement).style.background = "var(--zds-mist)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLTableRowElement).style.background = rowBg;
        }}
      >
        {columns.map((col, cIdx) => {
          const value = col.cell ? col.cell(row) : (row as Record<string, ReactNode>)[String(col.key)];
          return (
            <td
              key={String(col.key)}
              style={{
                padding: `${padY}px ${padX}px`,
                textAlign: col.align ?? "start",
                color: "var(--zds-ink-950)",
                fontSize: 13,
                lineHeight: 1.4,
                borderTop: rIdx === 0 ? "none" : "1px solid var(--zds-line-soft)",
                whiteSpace: "nowrap",
                verticalAlign: "middle"
              }}
            >
              {cIdx === 0 && row.expandable ? (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                  <span
                    aria-hidden="true"
                    style={{
                      display: "inline-flex",
                      width: 14,
                      height: 14,
                      alignItems: "center",
                      justifyContent: "center",
                      transform: isExpanded ? "rotate(90deg)" : "rotate(0)",
                      transition: "transform var(--zds-dur-fast) var(--zds-ease-out)",
                      color: "var(--zds-text-tertiary)"
                    }}
                  >
                    ›
                  </span>
                  {value}
                </span>
              ) : (
                value
              )}
            </td>
          );
        })}
      </tr>
      {row.expandable && isExpanded && (
        <tr>
          <td
            colSpan={columns.length}
            style={{
              padding: 0,
              background: "var(--zds-cream)",
              borderTop: "1px solid var(--zds-line-soft)"
            }}
          >
            <div style={{ padding: "16px 24px" }}>{row.expandedContent}</div>
          </td>
        </tr>
      )}
    </>
  );
}

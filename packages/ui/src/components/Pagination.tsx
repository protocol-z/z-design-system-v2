import type { HTMLAttributes } from "react";

/**
 * v2 Pagination — page indicator + prev/next + optional page-size selector.
 *
 * Sits below DataTable. Default page sizes: 10, 25, 50, 100.
 * Pages are 1-indexed.
 */
export type PaginationProps = HTMLAttributes<HTMLDivElement> & {
  page: number;
  pageCount: number;
  pageSize?: number;
  pageSizeOptions?: number[];
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  total?: number;
};

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);
const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

export function Pagination({
  page,
  pageCount,
  pageSize = 25,
  pageSizeOptions = [10, 25, 50, 100],
  onPageChange,
  onPageSizeChange,
  total,
  style,
  ...props
}: PaginationProps) {
  const canPrev = page > 1;
  const canNext = page < pageCount;

  const navBtn = (disabled: boolean): React.CSSProperties => ({
    width: 32,
    height: 32,
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--zds-paper)",
    border: "1px solid var(--zds-line)",
    borderRadius: "var(--zds-radius-pill)",
    color: disabled ? "var(--zds-text-tertiary)" : "var(--zds-ink-900)",
    opacity: disabled ? 0.45 : 1,
    cursor: disabled ? "default" : "pointer"
  });

  return (
    <div
      {...props}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 16,
        padding: "16px 4px 4px",
        flexWrap: "wrap",
        ...style
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          color: "var(--zds-text-secondary)",
          fontSize: 13
        }}
      >
        <span style={{ fontFamily: "var(--zds-font-mono)", letterSpacing: "0.04em" }}>
          Page {page} of {pageCount}
        </span>
        {typeof total === "number" && (
          <span style={{ color: "var(--zds-text-tertiary)", fontSize: 12 }}>
            · {total.toLocaleString()} results
          </span>
        )}
      </div>

      <div style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
        {onPageSizeChange && (
          <label
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontSize: 12,
              color: "var(--zds-text-secondary)"
            }}
          >
            <span>Per page</span>
            <select
              value={pageSize}
              onChange={(e) => onPageSizeChange(Number(e.target.value))}
              style={{
                padding: "4px 26px 4px 12px",
                background: "var(--zds-paper)",
                border: "1px solid var(--zds-line)",
                borderRadius: "var(--zds-radius-pill)",
                fontFamily: "var(--zds-font-body)",
                fontSize: 12,
                color: "var(--zds-ink-900)"
              }}
            >
              {pageSizeOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </label>
        )}
        <div style={{ display: "inline-flex", gap: 6 }}>
          <button
            type="button"
            disabled={!canPrev}
            onClick={() => canPrev && onPageChange?.(page - 1)}
            style={navBtn(!canPrev)}
            aria-label="Previous page"
          >
            <ChevronLeft />
          </button>
          <button
            type="button"
            disabled={!canNext}
            onClick={() => canNext && onPageChange?.(page + 1)}
            style={navBtn(!canNext)}
            aria-label="Next page"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

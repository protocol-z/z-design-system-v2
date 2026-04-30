import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 KeyValueGrid — stacked label:value rows with hairline dividers.
 *
 * The default layout for transaction-detail Overview tabs, validator info,
 * network parameters, and any "facts about this thing" surface.
 *
 * Each row supports an optional `helper` line below the value for context
 * (e.g. block timestamp + relative time, or a hash + chain explanation).
 *
 * `density="compact"` for table-like detail pages, `density="comfortable"`
 * for editorial detail surfaces.
 */
export type KeyValueRow = {
  label: ReactNode;
  value: ReactNode;
  helper?: ReactNode;
  /** Optional inline element rendered to the right of the value (e.g. a copy button or chip) */
  trailing?: ReactNode;
};

export type KeyValueGridProps = HTMLAttributes<HTMLDListElement> & {
  rows: KeyValueRow[];
  density?: "compact" | "comfortable";
};

export function KeyValueGrid({
  rows,
  density = "comfortable",
  style,
  ...props
}: KeyValueGridProps) {
  const padY = density === "compact" ? 10 : 14;
  return (
    <dl
      {...props}
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(140px, 200px) 1fr",
        rowGap: 0,
        margin: 0,
        ...style
      }}
    >
      {rows.map((row, idx) => (
        <DefRow key={idx} row={row} padY={padY} hairline={idx > 0} />
      ))}
    </dl>
  );
}

function DefRow({
  row,
  padY,
  hairline
}: {
  row: KeyValueRow;
  padY: number;
  hairline: boolean;
}) {
  return (
    <>
      <dt
        style={{
          padding: `${padY}px 16px ${padY}px 0`,
          color: "var(--zds-text-secondary)",
          fontSize: 13,
          fontWeight: 500,
          borderTop: hairline ? "1px solid var(--zds-line-soft)" : "none",
          alignSelf: "start",
          lineHeight: 1.5
        }}
      >
        {row.label}
      </dt>
      <dd
        style={{
          margin: 0,
          padding: `${padY}px 0`,
          borderTop: hairline ? "1px solid var(--zds-line-soft)" : "none",
          color: "var(--zds-ink-950)",
          fontSize: 14,
          lineHeight: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap"
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          {row.value}
        </span>
        {row.trailing && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            {row.trailing}
          </span>
        )}
        {row.helper && (
          <span
            style={{
              flexBasis: "100%",
              color: "var(--zds-text-tertiary)",
              fontSize: 12,
              marginTop: 2
            }}
          >
            {row.helper}
          </span>
        )}
      </dd>
    </>
  );
}

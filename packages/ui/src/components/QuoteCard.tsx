import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 QuoteCard — vertical key:value list with hairline dividers.
 * Used for quote summaries, transaction previews, fee tables.
 */
export type QuoteRow = {
  label: ReactNode;
  value: ReactNode;
  tone?: "default" | "mint" | "warning" | "muted";
};

export type QuoteCardProps = HTMLAttributes<HTMLDivElement> & {
  rows: QuoteRow[];
};

const toneToColor: Record<NonNullable<QuoteRow["tone"]>, string> = {
  default: "var(--zds-ink-950)",
  mint: "var(--zds-mint-500)",
  warning: "var(--zds-negative)",
  muted: "var(--zds-text-secondary)"
};

export function QuoteCard({ rows, style, ...props }: QuoteCardProps) {
  return (
    <div {...props} style={{ display: "grid", gap: 0, ...style }}>
      {rows.map((row, index) => {
        const color = toneToColor[row.tone ?? "default"];
        return (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 20,
              alignItems: "center",
              padding: "12px 0",
              borderTop: index === 0 ? "0" : "1px solid var(--zds-line-soft)"
            }}
          >
            <span style={{ color: "var(--zds-text-secondary)", fontSize: 14 }}>{row.label}</span>
            <strong style={{ color, fontWeight: 500, fontSize: 15 }}>{row.value}</strong>
          </div>
        );
      })}
    </div>
  );
}

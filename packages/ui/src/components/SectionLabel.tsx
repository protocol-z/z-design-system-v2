import type { HTMLAttributes, ReactNode } from "react";

/**
 * v2 SectionLabel — small editorial header strip above a content block.
 *
 * Used to contextualize technical content for non-technical readers.
 * For example, above a MASP contract log entry:
 *   "MASP commitment insertion — new note added to the shielded pool"
 *
 * Visual: caption-style uppercase label, optional accent dot left, optional
 * `tone` for category color. Pairs naturally on top of a Plate or DataTable.
 */
type SectionTone = "default" | "private" | "unshield" | "infra" | "payment";

export type SectionLabelProps = HTMLAttributes<HTMLDivElement> & {
  label: ReactNode;
  description?: ReactNode;
  tone?: SectionTone;
};

const dotColors: Record<SectionTone, string> = {
  default:  "var(--zds-ink-700)",
  private:  "var(--zds-mint-500)",
  unshield: "var(--zds-moss-400)",
  infra:    "var(--zds-stone-600)",
  payment:  "var(--zds-zcash-500)"
};

export function SectionLabel({
  label,
  description,
  tone = "default",
  style,
  ...props
}: SectionLabelProps) {
  return (
    <div
      {...props}
      style={{
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        padding: "12px 16px",
        background: "var(--zds-mist)",
        borderTop: "1px solid var(--zds-line)",
        borderBottom: "1px solid var(--zds-line)",
        ...style
      }}
    >
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: 999,
          background: dotColors[tone],
          flex: "0 0 auto",
          alignSelf: "center"
        }}
      />
      <span
        style={{
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: "0.10em",
          textTransform: "uppercase",
          color: "var(--zds-ink-900)",
          fontFamily: "var(--zds-font-mono)",
          whiteSpace: "nowrap"
        }}
      >
        {label}
      </span>
      {description && (
        <span
          style={{
            fontSize: 13,
            color: "var(--zds-text-secondary)",
            lineHeight: 1.4,
            fontFamily: "var(--zds-font-body)"
          }}
        >
          {description}
        </span>
      )}
    </div>
  );
}

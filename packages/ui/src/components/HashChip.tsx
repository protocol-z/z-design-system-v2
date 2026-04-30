import type { HTMLAttributes } from "react";
import { Tooltip } from "./Tooltip";
import { CopyButton } from "./CopyButton";

/**
 * v2 HashChip — compact display for transaction/block hashes and addresses.
 *
 * Truncates `0xabcdef...123456` to `0xabcd…3456` by default.
 * Hovers reveal the full string in a tooltip.
 * Includes an inline `CopyButton`.
 *
 *  size="sm"  — 11px monospace, for table rows
 *  size="md"  — 13px monospace, for detail pages
 */
type HashSize = "sm" | "md";

export type HashChipProps = HTMLAttributes<HTMLSpanElement> & {
  value: string;
  size?: HashSize;
  /** Number of chars to show on each side of the ellipsis. Default 6/4 (sm) or 8/6 (md). */
  head?: number;
  tail?: number;
  showCopy?: boolean;
  href?: string;
};

const sizes: Record<HashSize, { font: number; head: number; tail: number; pad: string }> = {
  sm: { font: 12, head: 6,  tail: 4, pad: "2px 8px" },
  md: { font: 13, head: 8,  tail: 6, pad: "4px 10px" }
};

function truncate(value: string, head: number, tail: number): string {
  if (value.length <= head + tail + 1) return value;
  return `${value.slice(0, head)}…${value.slice(-tail)}`;
}

export function HashChip({
  value,
  size = "sm",
  head,
  tail,
  showCopy = true,
  href,
  style,
  ...props
}: HashChipProps) {
  const cfg = sizes[size];
  const display = truncate(value, head ?? cfg.head, tail ?? cfg.tail);

  const inner = (
    <Tooltip label={value} placement="top">
      <span
        style={{
          fontFamily: "var(--zds-font-mono)",
          fontSize: cfg.font,
          color: "var(--zds-ink-900)",
          letterSpacing: "0.02em"
        }}
      >
        {display}
      </span>
    </Tooltip>
  );

  return (
    <span
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: cfg.pad,
        background: "var(--zds-mist)",
        border: "1px solid var(--zds-line-soft)",
        borderRadius: "var(--zds-radius-pill)",
        ...style
      }}
    >
      {href ? (
        <a href={href} style={{ color: "inherit", textDecoration: "none" }}>
          {inner}
        </a>
      ) : (
        inner
      )}
      {showCopy && <CopyButton value={value} size={size === "sm" ? 12 : 14} />}
    </span>
  );
}

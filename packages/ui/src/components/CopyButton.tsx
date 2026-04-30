"use client";

import { useState, type ButtonHTMLAttributes } from "react";

/**
 * v2 CopyButton — tiny inline copy action.
 * Renders an icon-only button that briefly shows a check + "Copied" label
 * on successful clipboard write. Use anywhere the user might want to copy
 * a hash, address, raw data, or share link.
 */
export type CopyButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "value"> & {
  value: string;
  size?: number;
  ariaLabel?: string;
};

export function CopyButton({ value, size = 14, ariaLabel = "Copy", style, ...props }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* clipboard denied — silent */
    }
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={handleClick}
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: 4,
        background: "transparent",
        border: "none",
        borderRadius: "var(--zds-radius-sm)",
        cursor: "pointer",
        color: copied ? "var(--zds-mint-500)" : "var(--zds-text-tertiary)",
        transition: "color var(--zds-dur-fast) var(--zds-ease-out)",
        ...style
      }}
    >
      {copied ? (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="9" y="9" width="13" height="13" rx="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
      {copied && (
        <span style={{ fontSize: 11, fontFamily: "var(--zds-font-mono)", letterSpacing: "0.04em" }}>
          Copied
        </span>
      )}
    </button>
  );
}

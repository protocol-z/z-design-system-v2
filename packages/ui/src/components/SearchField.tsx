"use client";

import { useEffect, useRef, type InputHTMLAttributes } from "react";

/**
 * v2 SearchField — pill input with leading icon and optional "/" keyboard shortcut hint.
 *
 * Used as the global search in scanner / app shell / docs.
 * Pressing "/" anywhere in the document focuses the field (when `bindShortcut`).
 */
export type SearchFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  /** Tone variants — default for paper backgrounds, glass for dark/photo overlays. */
  variant?: "default" | "glass";
  /** Show the small "/" hint chip on the right. Default true. */
  showShortcut?: boolean;
  /** Bind document-level "/" key to focus this field. Default true. */
  bindShortcut?: boolean;
  /** Optional submit handler when the user presses Enter. */
  onSubmit?: (value: string) => void;
};

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </svg>
);

export function SearchField({
  variant = "default",
  showShortcut = true,
  bindShortcut = true,
  onSubmit,
  placeholder = "Search by address, hash, or block…",
  style,
  ...props
}: SearchFieldProps) {
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!bindShortcut) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "/" && document.activeElement?.tagName !== "INPUT" && document.activeElement?.tagName !== "TEXTAREA") {
        e.preventDefault();
        ref.current?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [bindShortcut]);

  const wrap: React.CSSProperties =
    variant === "glass"
      ? {
          background: "rgba(255,255,255,0.64)",
          border: "1px solid var(--zds-line)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)"
        }
      : {
          background: "var(--zds-paper)",
          border: "1px solid var(--zds-line)",
          boxShadow: "var(--zds-shadow-plate)"
        };

  return (
    <div
      className="zds-field-wrap"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "0 8px 0 16px",
        height: 44,
        borderRadius: "var(--zds-radius-pill)",
        width: "100%",
        maxWidth: 520,
        ...wrap,
        ...style
      }}
    >
      <span style={{ color: "var(--zds-text-tertiary)", display: "inline-flex", flex: "0 0 auto" }}>
        <SearchIcon />
      </span>
      <input
        ref={ref}
        type="search"
        placeholder={placeholder}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onSubmit) onSubmit((e.target as HTMLInputElement).value);
        }}
        {...props}
        style={{
          flex: 1,
          height: "100%",
          background: "transparent",
          border: "none",
          outline: "none",
          color: "var(--zds-ink-950)",
          font: "inherit",
          fontSize: 14,
          padding: 0
        }}
      />
      {showShortcut && (
        <span
          aria-hidden="true"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 24,
            height: 22,
            padding: "0 6px",
            background: "var(--zds-mist)",
            border: "1px solid var(--zds-line)",
            borderRadius: "var(--zds-radius-sm)",
            color: "var(--zds-text-tertiary)",
            fontFamily: "var(--zds-font-mono)",
            fontSize: 11,
            lineHeight: 1
          }}
        >
          /
        </span>
      )}
    </div>
  );
}

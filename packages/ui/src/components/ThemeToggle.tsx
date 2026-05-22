"use client";

import { useEffect, useState, type ButtonHTMLAttributes } from "react";

/**
 * v2 ThemeToggle — light/dark switch for product surfaces.
 *
 * Marketing always renders light (per brand-direction-v2.md). This control
 * is for product/app shells where users want a dark canvas.
 *
 * Sets `data-theme="dark"` on document.documentElement when `controlDocument`
 * is true (default), or you can wire it up yourself via `onChange`.
 *
 * Reads + persists user preference in `data-theme` attribute only — no
 * localStorage (per Cowork artifact constraints; product apps can layer
 * persistence via their own store).
 */
type ThemeMode = "light" | "dark";

export type ThemeToggleProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onChange"> & {
  defaultMode?: ThemeMode;
  controlDocument?: boolean;
  onChange?: (mode: ThemeMode) => void;
};

const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
  </svg>
);
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
  </svg>
);

export function ThemeToggle({
  defaultMode = "light",
  controlDocument = true,
  onChange,
  style,
  ...props
}: ThemeToggleProps) {
  const [mode, setMode] = useState<ThemeMode>(defaultMode);

  useEffect(() => {
    if (!controlDocument) return;
    const root = document.documentElement;
    if (mode === "dark") root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
  }, [mode, controlDocument]);

  const toggle = () => {
    const next: ThemeMode = mode === "light" ? "dark" : "light";
    setMode(next);
    onChange?.(next);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={mode === "dark"}
      aria-label={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
      onClick={toggle}
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        height: 36,
        padding: 4,
        background: "var(--zds-mist)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-pill)",
        cursor: "pointer",
        ...style
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: mode === "light" ? "var(--zds-paper)" : "transparent",
          color: mode === "light" ? "var(--zds-ink-950)" : "var(--zds-text-tertiary)",
          boxShadow: mode === "light" ? "var(--zds-shadow-plate)" : "none",
          transition: "background var(--zds-dur-fast) var(--zds-ease-out)"
        }}
      >
        <SunIcon />
      </span>
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: mode === "dark" ? "var(--zds-ink-950)" : "transparent",
          color: mode === "dark" ? "var(--zds-bg)" : "var(--zds-text-tertiary)",
          transition: "background var(--zds-dur-fast) var(--zds-ease-out)"
        }}
      >
        <MoonIcon />
      </span>
    </button>
  );
}

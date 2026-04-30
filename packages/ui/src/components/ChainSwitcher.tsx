"use client";

import { useState, type ButtonHTMLAttributes, type ReactNode } from "react";

/**
 * v2 ChainSwitcher — pill dropdown for current network.
 *
 * Status dot left of the chain name. Default tones:
 *   mainnet  — mint  (live, healthy)
 *   testnet  — yellow (test environment)
 *   devnet   — stone (development)
 *   custom   — neutral
 *
 * Click opens a small menu with the available chains.
 */
export type ChainOption = {
  id: string;
  name: string;
  network?: "mainnet" | "testnet" | "devnet" | "custom";
  meta?: ReactNode;
};

export type ChainSwitcherProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onSelect"> & {
  chains: ChainOption[];
  activeId: string;
  onSelect?: (id: string) => void;
};

const networkDot: Record<NonNullable<ChainOption["network"]>, string> = {
  mainnet: "var(--zds-mint-500)",
  testnet: "var(--zds-zcash-500)",
  devnet:  "var(--zds-stone-600)",
  custom:  "var(--zds-ink-700)"
};

const Caret = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export function ChainSwitcher({
  chains,
  activeId,
  onSelect,
  style,
  ...props
}: ChainSwitcherProps) {
  const [open, setOpen] = useState(false);
  const active = chains.find((c) => c.id === activeId) ?? chains[0];
  const dot = networkDot[active?.network ?? "custom"];

  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        {...props}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 36,
          padding: "0 12px",
          background: "var(--zds-paper)",
          border: "1px solid var(--zds-line)",
          borderRadius: "var(--zds-radius-pill)",
          boxShadow: "var(--zds-shadow-plate)",
          color: "var(--zds-ink-900)",
          font: "inherit",
          fontSize: 13,
          fontWeight: 500,
          cursor: "pointer",
          ...style
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 8,
            height: 8,
            borderRadius: 999,
            background: dot,
            boxShadow: `0 0 0 3px color-mix(in srgb, ${dot} 28%, transparent)`,
            flex: "0 0 auto"
          }}
        />
        <span>{active?.name ?? "Select chain"}</span>
        <span style={{ color: "var(--zds-text-tertiary)" }}>
          <Caret />
        </span>
      </button>
      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: 220,
            background: "var(--zds-paper)",
            border: "1px solid var(--zds-line)",
            borderRadius: "var(--zds-radius-md)",
            boxShadow: "var(--zds-shadow-pop)",
            padding: 6,
            zIndex: 60
          }}
        >
          {chains.map((c) => {
            const isActive = c.id === activeId;
            const cdot = networkDot[c.network ?? "custom"];
            return (
              <button
                key={c.id}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  onSelect?.(c.id);
                  setOpen(false);
                }}
                style={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: 10,
                  padding: "8px 10px",
                  background: isActive ? "var(--zds-mist)" : "transparent",
                  border: "none",
                  borderRadius: "var(--zds-radius-sm)",
                  color: "var(--zds-ink-900)",
                  font: "inherit",
                  fontSize: 13,
                  fontWeight: 500,
                  textAlign: "left",
                  cursor: "pointer"
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 999,
                    background: cdot,
                    flex: "0 0 auto"
                  }}
                />
                <span style={{ flex: 1 }}>{c.name}</span>
                {c.meta && (
                  <span
                    style={{
                      fontFamily: "var(--zds-font-mono)",
                      fontSize: 11,
                      color: "var(--zds-text-tertiary)",
                      letterSpacing: "0.04em"
                    }}
                  >
                    {c.meta}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </span>
  );
}

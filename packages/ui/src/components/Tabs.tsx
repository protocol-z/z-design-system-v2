import type { ButtonHTMLAttributes, ReactNode } from "react";

/**
 * v2 Tabs — pill-segmented control on a soft mist track.
 *
 * Two APIs:
 *  - simple:    `items: string[]` → just labels
 *  - rich:      `items: TabItem[]` → label + optional count + disabled
 *
 * `scrollable` lets the bar overflow horizontally for many-tabs scenarios
 * (tx detail pages with Overview / Logs / State / User Ops / Authorizations / Internal txs).
 */
export type TabItem = {
  label: string;
  count?: number;
  disabled?: boolean;
};

export type TabsProps = {
  items: (string | TabItem)[];
  activeIndex?: number;
  onSelect?: (index: number) => void;
  scrollable?: boolean;
  buttonProps?: ButtonHTMLAttributes<HTMLButtonElement>;
};

function normalize(item: string | TabItem): TabItem {
  return typeof item === "string" ? { label: item } : item;
}

function CountBadge({ value, active }: { value: number; active: boolean }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 20,
        height: 18,
        padding: "0 6px",
        background: active ? "color-mix(in srgb, var(--zds-on-fill-strong) 18%, transparent)" : "var(--zds-paper)",
        border: active ? "none" : "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-pill)",
        color: active ? "var(--zds-on-fill-strong)" : "var(--zds-text-tertiary)",
        fontSize: 11,
        fontFamily: "var(--zds-font-mono)",
        letterSpacing: 0,
        lineHeight: 1
      }}
    >
      {value > 999 ? "999+" : value}
    </span>
  );
}

export function Tabs({
  items,
  activeIndex = 0,
  onSelect,
  scrollable = false,
  buttonProps
}: TabsProps) {
  const tabs = items.map(normalize);

  const wrapperStyle: React.CSSProperties = scrollable
    ? {
        display: "flex",
        padding: 4,
        gap: 2,
        background: "var(--zds-mist)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-pill)",
        overflowX: "auto",
        scrollbarWidth: "none",
        maxWidth: "100%"
      }
    : {
        display: "inline-flex",
        padding: 4,
        gap: 2,
        background: "var(--zds-mist)",
        border: "1px solid var(--zds-line)",
        borderRadius: "var(--zds-radius-pill)"
      };

  return (
    <div style={wrapperStyle} role="tablist">
      {tabs.map((tab, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={`${tab.label}-${index}`}
            role="tab"
            aria-selected={active}
            disabled={tab.disabled}
            {...buttonProps}
            onClick={() => !tab.disabled && onSelect?.(index)}
            style={{
              height: 32,
              padding: tab.count != null ? "0 10px 0 14px" : "0 16px",
              borderRadius: "var(--zds-radius-pill)",
              border: "none",
              background: active ? "var(--zds-fill-strong)" : "transparent",
              color: active ? "var(--zds-on-fill-strong)" : tab.disabled ? "var(--zds-text-tertiary)" : "var(--zds-text-secondary)",
              font: "inherit",
              fontSize: 13,
              fontWeight: 500,
              cursor: tab.disabled ? "not-allowed" : "pointer",
              opacity: tab.disabled ? 0.5 : 1,
              transition: "background var(--zds-dur-fast) var(--zds-ease-out), color var(--zds-dur-fast) var(--zds-ease-out)",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              flex: "0 0 auto",
              whiteSpace: "nowrap"
            }}
          >
            {tab.label}
            {tab.count != null && <CountBadge value={tab.count} active={active} />}
          </button>
        );
      })}
    </div>
  );
}

import type { AnchorHTMLAttributes } from "react";

/**
 * v2 SideNav — vertical navigation rail.
 * Mist background, active item gets ink fill (no underline drift).
 */
export type SideNavItem = {
  label: string;
  href?: string;
  active?: boolean;
};

export type SideNavProps = {
  items: SideNavItem[];
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
};

export function SideNav({ items, linkProps }: SideNavProps) {
  return (
    <nav
      style={{
        display: "grid",
        gap: 4,
        padding: 16,
        background: "var(--zds-mist)",
        borderRight: "1px solid var(--zds-line)",
        height: "100%"
      }}
    >
      {items.map((item) => (
        <a
          key={item.label}
          href={item.href}
          {...linkProps}
          style={{
            padding: "10px 14px",
            borderRadius: "var(--zds-radius-md)",
            textDecoration: "none",
            fontSize: 14,
            fontWeight: 500,
            color: item.active ? "#fff" : "var(--zds-text-secondary)",
            background: item.active ? "var(--zds-ink-950)" : "transparent",
            transition: "background var(--zds-dur-fast) var(--zds-ease-out), color var(--zds-dur-fast) var(--zds-ease-out)"
          }}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

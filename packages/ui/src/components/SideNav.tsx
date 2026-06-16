import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from "react";

/**
 * v2 SideNav — first-class vertical navigation rail for the sidebar-first shell.
 *
 * Anatomy (top → bottom):
 *   1. brand     — optional brand slot (logo / workspace switcher)
 *   2. items     — primary nav, one active item gets the inverse "strong" fill
 *   3. children  — scrollable middle region (recents / lists / sections)
 *   4. account   — optional pinned bottom slot (account / settings)
 *
 * Backward compatible: the original `items` + `linkProps` API is unchanged.
 * Everything else is additive and optional. Mist background, no underline drift.
 */
export type SideNavItem = {
  label: string;
  href?: string;
  active?: boolean;
  /** optional leading glyph (16–18px line icon recommended) */
  icon?: ReactNode;
  /** optional trailing slot (count badge, kbd hint) */
  trailing?: ReactNode;
  /** per-item click handler (use when items are buttons, not links) */
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
};

export type SideNavProps = HTMLAttributes<HTMLElement> & {
  items: SideNavItem[];
  /** spread onto every nav <a> (e.g. a router Link's props) */
  linkProps?: AnchorHTMLAttributes<HTMLAnchorElement>;
  /** top brand slot (logo, workspace switcher) */
  brand?: ReactNode;
  /** scrollable middle region — recents, saved lists, secondary sections */
  children?: ReactNode;
  /** pinned bottom slot — account, settings, sign-out */
  account?: ReactNode;
  /** accessible label for the landmark (default "Primary") */
  ariaLabel?: string;
  /** rail width (default 248) */
  width?: number;
};

const focusStyle = `
.zds-sidenav a:focus-visible,
.zds-sidenav button:focus-visible {
  outline: none;
  box-shadow: var(--zds-focus-ring);
}
.zds-sidenav__mid::-webkit-scrollbar { width: 8px; }
.zds-sidenav__mid::-webkit-scrollbar-thumb {
  background: var(--zds-line-strong);
  border-radius: 999px;
}
`;

function NavLink({ item, linkProps }: { item: SideNavItem; linkProps?: AnchorHTMLAttributes<HTMLAnchorElement> }) {
  return (
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      onClick={item.onClick}
      {...linkProps}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "10px 14px",
        borderRadius: "var(--zds-radius-md)",
        textDecoration: "none",
        fontSize: 14,
        fontWeight: 500,
        color: item.active ? "var(--zds-on-fill-strong)" : "var(--zds-text-secondary)",
        background: item.active ? "var(--zds-fill-strong)" : "transparent",
        transition:
          "background var(--zds-dur-fast) var(--zds-ease-out), color var(--zds-dur-fast) var(--zds-ease-out)"
      }}
    >
      {item.icon ? (
        <span aria-hidden="true" style={{ display: "inline-flex", flex: "0 0 auto", opacity: item.active ? 1 : 0.8 }}>
          {item.icon}
        </span>
      ) : null}
      <span style={{ flex: "1 1 auto", minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
        {item.label}
      </span>
      {item.trailing ? (
        <span style={{ flex: "0 0 auto", color: "var(--zds-text-tertiary)", fontSize: 12 }}>{item.trailing}</span>
      ) : null}
    </a>
  );
}

export function SideNav({
  items,
  linkProps,
  brand,
  children,
  account,
  ariaLabel = "Primary",
  width = 248,
  style,
  ...props
}: SideNavProps) {
  return (
    <nav
      {...props}
      className={["zds-sidenav", props.className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
      style={{
        display: "grid",
        gridTemplateRows: `${brand ? "auto " : ""}auto minmax(0, 1fr)${account ? " auto" : ""}`,
        gap: 4,
        width,
        padding: 16,
        background: "var(--zds-mist)",
        borderRight: "1px solid var(--zds-line)",
        height: "100%",
        boxSizing: "border-box",
        ...style
      }}
    >
      <style>{focusStyle}</style>

      {brand ? <div style={{ padding: "4px 6px 12px" }}>{brand}</div> : null}

      <div style={{ display: "grid", gap: 4, alignContent: "start" }}>
        {items.map((item) => (
          <NavLink key={item.label} item={item} linkProps={linkProps} />
        ))}
      </div>

      {/* scrollable middle region — recents / lists */}
      <div
        className="zds-sidenav__mid"
        style={{
          minHeight: 0,
          overflowY: "auto",
          marginTop: 8,
          paddingTop: children ? 8 : 0,
          borderTop: children ? "1px solid var(--zds-line)" : "none"
        }}
      >
        {children}
      </div>

      {account ? (
        <div style={{ paddingTop: 12, marginTop: 4, borderTop: "1px solid var(--zds-line)" }}>{account}</div>
      ) : null}
    </nav>
  );
}

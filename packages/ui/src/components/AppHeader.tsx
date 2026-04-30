import type { HTMLAttributes, ReactNode } from "react";
import { LogoMark } from "./LogoMark";

/**
 * v2 AppHeader — top navigation strip used across every Z surface.
 *
 * Variants:
 *   marketing — slim 64px strip; logo + nav + ghost CTA (used on protocol-z.xyz)
 *   app       — 64px strip with primary nav + wallet pill on the right
 *   scanner   — 64px strip with global search center, chain switcher right
 *
 * Pass `nav` (ReactNode array) and `actions` (ReactNode) to compose.
 */
type HeaderVariant = "marketing" | "app" | "scanner";

export type AppHeaderProps = HTMLAttributes<HTMLElement> & {
  variant?: HeaderVariant;
  nav?: ReactNode;
  actions?: ReactNode;
  /** Replace the LogoMark with custom content (e.g. logo + product name lockup). */
  brand?: ReactNode;
  /** Center slot — typically the global search field (scanner). */
  center?: ReactNode;
  /** Render as glass surface (transparent on photo / aurora grounds). */
  glass?: boolean;
};

export function AppHeader({
  variant = "app",
  nav,
  actions,
  brand,
  center,
  glass = false,
  style,
  ...props
}: AppHeaderProps) {
  const surface: React.CSSProperties = glass
    ? {
        background: "rgba(255,255,255,0.64)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--zds-line)"
      }
    : {
        background: "var(--zds-paper)",
        borderBottom: "1px solid var(--zds-line)"
      };

  return (
    <header
      {...props}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 24,
        height: 64,
        padding: "0 24px",
        ...surface,
        ...style
      }}
    >
      {/* Brand */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 12, flex: "0 0 auto" }}>
        {brand ?? <LogoMark size={28} />}
      </div>

      {/* Nav (marketing/app variants put nav inline, scanner skips inline nav) */}
      {variant !== "scanner" && nav && (
        <nav
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 4,
            marginLeft: 16
          }}
        >
          {nav}
        </nav>
      )}

      {/* Center slot — search etc */}
      {center && (
        <div style={{ flex: 1, display: "flex", justifyContent: "center", minWidth: 0 }}>
          {center}
        </div>
      )}

      {/* Spacer if no center */}
      {!center && <div style={{ flex: 1 }} />}

      {/* Actions */}
      {actions && (
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, flex: "0 0 auto" }}>
          {actions}
        </div>
      )}
    </header>
  );
}

/**
 * v2 AppHeaderLink — a single nav item for AppHeader.
 *
 * Pill underline on hover, ink-950 fill on active.
 */
export type AppHeaderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean;
};

export function AppHeaderLink({ active = false, children, style, ...props }: AppHeaderLinkProps) {
  return (
    <a
      {...props}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: 36,
        padding: "0 14px",
        borderRadius: "var(--zds-radius-pill)",
        textDecoration: "none",
        color: active ? "var(--zds-ink-950)" : "var(--zds-text-secondary)",
        background: active ? "var(--zds-mist)" : "transparent",
        font: "inherit",
        fontSize: 14,
        fontWeight: 500,
        transition: "background var(--zds-dur-fast) var(--zds-ease-out), color var(--zds-dur-fast) var(--zds-ease-out)",
        ...style
      }}
    >
      {children}
    </a>
  );
}

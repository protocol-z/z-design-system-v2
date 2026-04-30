import type { HTMLAttributes, ReactNode } from "react";
import { LogoMark } from "./LogoMark";

/**
 * v2 Footer — multi-column site footer.
 *
 *   <Footer
 *     columns={[
 *       { title: "Z Protocol", links: [{ label: "Brand assets", href: "/brand" }, ...] },
 *       { title: "Community",  links: [...] },
 *       { title: "Apps",       links: [...] }
 *     ]}
 *     social={[...]}
 *     tagline="A clear morning in the mountains."
 *   />
 *
 * Replaces the v1 footer. Per the scanner change-brief C5 / C6: no "Powered by"
 * line; Z Protocol identity stands on its own.
 */
export type FooterColumn = {
  title: string;
  links: { label: ReactNode; href?: string }[];
};

export type FooterSocial = {
  label: string;
  href: string;
  icon: ReactNode;
};

export type FooterProps = HTMLAttributes<HTMLElement> & {
  columns: FooterColumn[];
  social?: FooterSocial[];
  tagline?: ReactNode;
  /** Right-side meta — copyright, version, etc. */
  meta?: ReactNode;
};

export function Footer({
  columns,
  social,
  tagline = "A clear morning in the mountains.",
  meta,
  style,
  ...props
}: FooterProps) {
  return (
    <footer
      {...props}
      style={{
        background: "var(--zds-cream)",
        borderTop: "1px solid var(--zds-line)",
        padding: "64px 56px 32px",
        ...style
      }}
    >
      {/* Top: column nav */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `260px repeat(${columns.length}, minmax(0, 1fr))`,
          gap: 48,
          marginBottom: 56
        }}
      >
        {/* Brand block */}
        <div>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
            <LogoMark size={32} />
          </div>
          <p
            style={{
              marginTop: 16,
              marginBottom: 0,
              maxWidth: "26ch",
              color: "var(--zds-stone-600)",
              fontFamily: "var(--zds-font-serif)",
              fontStyle: "italic",
              fontSize: 18,
              lineHeight: 1.4
            }}
          >
            {tagline}
          </p>
        </div>

        {/* Columns */}
        {columns.map((col) => (
          <div key={col.title}>
            <p
              style={{
                margin: "0 0 16px",
                fontSize: 11,
                fontWeight: 500,
                letterSpacing: "0.10em",
                textTransform: "uppercase",
                color: "var(--zds-text-tertiary)",
                fontFamily: "var(--zds-font-mono)"
              }}
            >
              {col.title}
            </p>
            <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "grid", gap: 10 }}>
              {col.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.href}
                    style={{
                      color: "var(--zds-ink-900)",
                      textDecoration: "none",
                      fontSize: 14,
                      transition: "color var(--zds-dur-fast) var(--zds-ease-out)"
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom: social row + meta */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 24,
          paddingTop: 24,
          borderTop: "1px solid var(--zds-line)",
          flexWrap: "wrap"
        }}
      >
        {social && social.length > 0 && (
          <div style={{ display: "inline-flex", gap: 8 }}>
            {social.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36,
                  height: 36,
                  background: "var(--zds-paper)",
                  border: "1px solid var(--zds-line)",
                  borderRadius: "50%",
                  color: "var(--zds-ink-900)",
                  textDecoration: "none"
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        )}
        <div
          style={{
            color: "var(--zds-text-tertiary)",
            fontSize: 12,
            fontFamily: "var(--zds-font-mono)",
            letterSpacing: "0.06em",
            textTransform: "uppercase"
          }}
        >
          {meta ?? `© ${new Date().getFullYear()} Z Protocol`}
        </div>
      </div>
    </footer>
  );
}

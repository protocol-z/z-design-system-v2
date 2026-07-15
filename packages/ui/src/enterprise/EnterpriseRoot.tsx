import type { HTMLAttributes, PropsWithChildren } from "react";

export type EnterpriseTextScale = "default" | "large";
export type EnterpriseDensity = "compact" | "comfortable";

export type EnterpriseRootProps = PropsWithChildren<
  HTMLAttributes<HTMLDivElement> & {
    textScale?: EnterpriseTextScale;
    density?: EnterpriseDensity;
  }
>;

/**
 * Establishes the semantic typography, density, and control aliases for an
 * operational Enterprise subtree. Import `@zds/ui/styles/enterprise.css`
 * once before using it.
 */
export function EnterpriseRoot({
  textScale = "default",
  density = "compact",
  className,
  children,
  ...props
}: EnterpriseRootProps) {
  return (
    <div
      {...props}
      className={["zds-enterprise-root", className].filter(Boolean).join(" ")}
      data-enterprise-text-scale={textScale}
      data-enterprise-density={density}
    >
      {children}
    </div>
  );
}


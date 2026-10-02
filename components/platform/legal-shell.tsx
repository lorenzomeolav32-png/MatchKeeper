import type { ReactNode } from "react";
import { FloodlightBackdrop } from "@/components/platform/floodlight-backdrop";
import { PlatformNav } from "@/components/platform/nav";
import { SiteFooter } from "@/components/platform/site-footer";

/**
 * Envoltorio compartido por las páginas legales (Terms, Privacy, Safety):
 * misma nav/fondo/footer que /home, contenido en formato artículo legible.
 */
export function LegalShell({
  eyebrow,
  title,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  /** Fecha en formato ISO (YYYY-MM-DD), se muestra tal cual. */
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="relative min-h-dvh bg-bg text-fg">
      <FloodlightBackdrop />
      <PlatformNav />

      <main className="mx-auto max-w-[760px] px-5 py-16 sm:px-8 sm:py-24">
        <p className="pl-eyebrow">{eyebrow}</p>
        <h1 className="pl-display mt-4 text-fg [font-size:var(--t-5xl)]">{title}</h1>
        <p className="mt-3 text-sm text-muted">Last updated {updated}</p>

        <div className="pl-prose legal-copy mt-10 space-y-6 text-[15px] text-fg-2">
          {children}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

import { ThemeScope } from "@/components/platform/theme";
import { themeInitScript } from "@/components/platform/theme-config";

/**
 * Mismo layout que app/home/layout.tsx: activa el tema de plataforma solo
 * para las páginas legales, sin afectar a la landing pública de "/".
 */
export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <ThemeScope>{children}</ThemeScope>
    </>
  );
}

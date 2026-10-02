import { ThemeScope } from "@/components/platform/theme";
import { themeInitScript } from "@/components/platform/theme-config";

/**
 * Layout de la PLATAFORMA. Monta el sistema de tema (oscuro "Floodlight" por
 * defecto, claro "Daylight" opcional) solo dentro de esta rama de rutas, de
 * forma que la landing pública de "/" siga usando los tokens de `:root`.
 *
 * El script se inyecta antes del árbol para que el atributo `data-theme` esté
 * puesto antes del primer paint y no haya flash de tema equivocado.
 */
export default function PlatformLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      <ThemeScope>{children}</ThemeScope>
    </>
  );
}

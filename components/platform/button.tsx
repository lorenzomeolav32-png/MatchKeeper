import type { ComponentProps } from "react";
import type Link from "next/link";
import { CtaLink, type CtaSize, type CtaVariant } from "@/components/platform/cta-button";

type BaseProps = {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Flecha en la casilla derecha. Por defecto solo en `primary`. */
  withArrow?: boolean;
  children: React.ReactNode;
  /** Se aplica al contenedor del botón. */
  className?: string;
};

/**
 * Botón de enlace de la plataforma. `primary` es la acción principal (solo una
 * por pantalla visible), `secondary` la vía alternativa, `onAccent` y `quiet`
 * son sus equivalentes sobre un bloque de acento.
 */
export function Button({
  variant = "primary",
  size = "md",
  withArrow,
  children,
  className,
  ...props
}: BaseProps & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <CtaLink variant={variant} size={size} arrow={withArrow} className={className} {...props}>
      {children}
    </CtaLink>
  );
}

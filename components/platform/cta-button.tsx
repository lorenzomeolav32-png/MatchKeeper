import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { ArrowRightIcon } from "@/components/platform/icons";

/**
 * Sistema único de botones de la plataforma: esquinas biseladas, etiqueta en
 * mayúsculas y casilla de flecha. Los estilos viven en `.pl-cta*` (globals.css).
 * El contenedor lleva la retícula y el foco porque `clip-path` recorta el
 * `outline` y las sombras del propio botón.
 */
export type CtaVariant = "primary" | "secondary" | "onAccent" | "quiet";
export type CtaSize = "sm" | "md" | "lg";

type Shared = {
  variant?: CtaVariant;
  size?: CtaSize;
  /** Por defecto solo el botón principal lleva flecha. */
  arrow?: boolean;
  /** Se aplica al contenedor: aquí van `w-full`, `hidden`, márgenes. */
  className?: string;
  children: ReactNode;
};

function wrapClass(variant: CtaVariant, size: CtaSize, className: string) {
  return `pl-cta-wrap pl-cta-wrap--${size} pl-cta-wrap--${variant} ${className}`.trim();
}

function Face({ children, arrow }: { children: ReactNode; arrow: boolean }) {
  return (
    <>
      <span className="pl-cta__label">{children}</span>
      {arrow && (
        <span className="pl-cta__icon" aria-hidden>
          <ArrowRightIcon className="h-5 w-5" />
        </span>
      )}
    </>
  );
}

export function CtaLink({
  variant = "primary",
  size = "lg",
  arrow = variant === "primary",
  className = "",
  children,
  ...props
}: Shared & Omit<ComponentProps<typeof Link>, "children" | "className">) {
  return (
    <span className={wrapClass(variant, size, className)}>
      <Link className="pl-cta" {...props}>
        <Face arrow={arrow}>{children}</Face>
      </Link>
    </span>
  );
}

export function CtaAction({
  variant = "primary",
  size = "lg",
  arrow = variant === "primary",
  className = "",
  children,
  type = "button",
  ...props
}: Shared & Omit<ComponentProps<"button">, "children" | "className">) {
  return (
    <span className={wrapClass(variant, size, className)}>
      <button type={type} className="pl-cta" {...props}>
        <Face arrow={arrow}>{children}</Face>
      </button>
    </span>
  );
}

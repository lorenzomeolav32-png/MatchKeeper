"use client";

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ElementType,
  type ReactNode,
  type RefObject,
} from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

/**
 * Preferencia de movimiento reducido, reactiva y sin desajustes de hidratación:
 * en servidor asume `false` y React re-renderiza tras hidratar si hace falta.
 * Es la contraparte en JS de lo que el CSS ya hace con la media query.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  );
}

/**
 * Detecta una sola vez que el elemento entra en pantalla. Se desconecta
 * inmediatamente: nada de observers vivos durante toda la sesión.
 */
export function useInView<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { threshold = 0.2, rootMargin = "0px 0px -12% 0px" } = {},
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Navegador sin IntersectionObserver: mostrar en el siguiente frame en vez
    // de dejar el contenido invisible para siempre.
    if (typeof IntersectionObserver === "undefined") {
      const frame = requestAnimationFrame(() => setInView(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        observer.disconnect();
      },
      { threshold, rootMargin },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, rootMargin]);

  return inView;
}

type RevealVariant = "default" | "soft" | "pop";

type RevealProps = {
  children: ReactNode;
  /** Escalonado en ms. Mantener ≤ 90ms por paso: más se percibe como lag. */
  delay?: number;
  /**
   * `soft` recorre menos distancia (para texto denso), `pop` añade una escala
   * mínima (para tarjetas). Tener 3 variantes evita que todo entre igual.
   */
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
  id?: string;
};

const VARIANT_CLASS: Record<RevealVariant, string> = {
  default: "",
  soft: "pl-reveal--soft",
  pop: "pl-reveal--pop",
};

export function Reveal({
  children,
  delay = 0,
  variant = "default",
  as,
  className = "",
  id,
}: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref);

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      className={`pl-reveal ${VARIANT_CLASS[variant]} ${className}`.trim()}
      style={{ "--pl-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}

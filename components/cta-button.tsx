import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost" | "invert";

type Props = ComponentProps<typeof Link> & {
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_8px_24px_-10px_var(--accent-glow)] hover:bg-accent-strong hover:shadow-[0_12px_32px_-10px_var(--accent-glow)]",
  ghost:
    "border border-line-strong bg-bg-2 text-fg hover:border-accent hover:text-accent-strong",
  /** Para usar sobre superficies oscuras (ej. el bloque final-CTA a sangre negra). */
  invert:
    "border-2 border-bg/60 bg-bg/[0.08] text-bg hover:border-accent hover:bg-accent hover:text-accent-ink",
};

export function CTAButton({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

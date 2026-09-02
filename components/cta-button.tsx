import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "ghost";

type Props = ComponentProps<typeof Link> & {
  variant?: Variant;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-ink shadow-[0_0_24px_var(--accent-glow)] hover:bg-accent-strong hover:shadow-[0_0_36px_var(--accent-glow)]",
  ghost:
    "card-surface text-fg hover:border-accent/60 hover:text-accent",
};

export function CTAButton({ variant = "primary", className = "", ...props }: Props) {
  return <Link className={`${base} ${variants[variant]} ${className}`} {...props} />;
}

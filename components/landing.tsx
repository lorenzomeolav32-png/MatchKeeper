import Link from "next/link";
import { CTAButton } from "@/components/cta-button";
import { GoalFrame } from "@/components/goal-frame";
import { Logo } from "@/components/logo";
import { PitchBackground } from "@/components/pitch-background";
import { Reveal } from "@/components/reveal";
import { content, LANGS, type Lang } from "@/lib/content";
import { FORMS, SITE_TAGLINE } from "@/lib/site";

/** Landing compartida por los 3 idiomas. El contenido viene de lib/content.ts. */
export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];

  return (
    <main lang={t.htmlLang} className="relative">
      <PitchBackground />

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo iconClassName="h-12 w-14" wordmarkClassName="text-2xl" />
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-xs text-muted sm:inline">
            {t.navPilot}
          </span>
          <div
            aria-label={t.langSwitch.aria}
            className="flex items-center gap-1 rounded-full border border-line px-1 py-1 font-mono text-xs"
          >
            {LANGS.map((l) =>
              l.code === lang ? (
                <span key={l.code} className="rounded-full bg-accent/10 px-2 py-1 text-accent">
                  {l.label}
                </span>
              ) : (
                <Link
                  key={l.code}
                  href={l.href}
                  className="rounded-full px-2 py-1 text-muted transition-colors hover:text-accent"
                >
                  {l.label}
                </Link>
              )
            )}
          </div>
        </div>
      </header>

      {/* ── Hero (value prop + CTA) ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Portería a todo el ancho, enmarcando el hero completo.
            El contenedor se ensancha 25% (centrado) para que los postes lleguen
            a los bordes; se alarga por arriba (larguero por ENCIMA del badge, sin
            cortarlo) y por abajo (línea de suelo al fondo, sin hueco vacío).
            Sin balón: el marco/red se estiran, el balón se dibuja aparte. */}
        <div className="pointer-events-none absolute top-[1%] -bottom-[24%] left-[3%] right-[3%] overflow-hidden">
          <GoalFrame
            preserveAspectRatio="none"
            className="goal-glow-in h-full w-full opacity-0"
          />
        </div>
        {/* Guante de arquero, logo de marca: monolínea a juego con GoalFrame.
            Centrado y apoyado en la línea de gol. */}
        <div className="pointer-events-none absolute bottom-[1%] left-1/2 -translate-x-1/2">
          <svg
            aria-hidden
            width="78"
            height="78"
            viewBox="0 0 64 64"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ball-glow-in opacity-0"
          >
            {/* puño */}
            <rect x="22" y="46" width="26" height="12" rx="4" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2.5" />
            <line x1="22" y1="52" x2="48" y2="52" stroke="var(--accent)" strokeWidth="1.5" opacity="0.5" />
            {/* pulgar */}
            <rect x="10" y="33" width="13" height="12" rx="6" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2.5" />
            {/* palma */}
            <rect x="18" y="28" width="34" height="22" rx="10" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2.5" />
            {/* dedos */}
            <rect x="20" y="12" width="6" height="19" rx="3" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
            <rect x="28" y="8" width="6" height="23" rx="3" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
            <rect x="36" y="8" width="6" height="23" rx="3" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
            <rect x="44" y="12" width="6" height="19" rx="3" fill="var(--bg-2)" stroke="var(--accent)" strokeWidth="2" />
            {/* costuras de agarre en la palma */}
            <g stroke="var(--accent)" strokeWidth="1.5" opacity="0.45">
              <line x1="23" y1="36" x2="47" y2="36" />
              <line x1="23" y1="41" x2="47" y2="41" />
            </g>
          </svg>
        </div>
        {/* Viñeta para mantener el texto legible sobre la red */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 45%, color-mix(in oklab, var(--bg) 78%, transparent), transparent 75%)",
          }}
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-12 pb-24 text-center md:pt-20">
          <p
            className="rise-in mb-5 inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent"
            style={{ "--rise-delay": "80ms" } as React.CSSProperties}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {t.hero.badge}
          </p>
          <h1
            className="rise-in font-display text-4xl font-bold leading-[1.05] text-fg text-glow md:text-6xl"
            style={{ "--rise-delay": "200ms" } as React.CSSProperties}
          >
            {t.hero.titleTop}
            <br className="hidden md:block" /> {t.hero.titleBottom}
          </h1>
          <p
            className="rise-in mx-auto mt-6 max-w-xl text-lg text-muted"
            style={{ "--rise-delay": "340ms" } as React.CSSProperties}
          >
            {t.hero.sub}
          </p>

          <div
            className="rise-in mt-9 flex flex-wrap justify-center gap-3"
            style={{ "--rise-delay": "480ms" } as React.CSSProperties}
          >
            <CTAButton href={FORMS.teams} target="_blank" rel="noopener noreferrer">
              {t.hero.ctaTeams}
            </CTAButton>
            <CTAButton
              href={FORMS.goalkeepers}
              target="_blank"
              rel="noopener noreferrer"
              variant="ghost"
            >
              {t.hero.ctaKeepers}
            </CTAButton>
          </div>
          <p
            className="rise-in mt-4 font-mono text-xs text-muted"
            style={{ "--rise-delay": "600ms" } as React.CSSProperties}
          >
            {t.hero.note}
          </p>
        </div>
      </section>

      {/* ── Problem (agitate) ──────────────────────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
          <span className="sweep-heading">{t.problem.heading}</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t.problem.sub}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.problem.cards.map((c, i) => (
            <Reveal key={c.title} delay={i * 120} className="card-surface rounded-2xl p-6">
              <h3 className="font-display text-lg font-semibold text-fg">{c.title}</h3>
              <p className="mt-2 text-sm text-muted">{c.body}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── How it would work ──────────────────────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
          <span className="sweep-heading">{t.how.heading}</span>
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="card-surface rounded-2xl p-6">
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── Coverage (todo tipo de cancha/formato, sujeto a disponibilidad) ─── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 pb-16">
        <div className="card-surface rounded-3xl p-8 md:p-10">
          <h2 className="font-display text-xl font-semibold text-fg md:text-2xl">
            {t.coverage.heading}
          </h2>
          <p className="mt-3 max-w-2xl text-muted">{t.coverage.body}</p>
          <p className="mt-3 max-w-2xl font-mono text-xs text-amber">{t.coverage.note}</p>
        </div>
      </Reveal>

      {/* ── Take part (los 3 formularios) ──────────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="font-display text-2xl font-semibold text-fg md:text-3xl">
          <span className="sweep-heading">{t.takePart.heading}</span>
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{t.takePart.sub}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {t.takePart.cards.map((c, i) => (
            <Reveal
              key={c.tag}
              delay={i * 120}
              className="card-surface flex flex-col rounded-3xl p-8"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-accent">{c.tag}</p>
              <h3 className="mt-3 font-display text-xl font-bold text-fg">{c.title}</h3>
              <p className="mt-3 flex-1 text-sm text-muted">{c.body}</p>
              <CTAButton
                href={FORMS[c.href]}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="mt-6 self-start"
              >
                {c.cta}
              </CTAButton>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── Honest project status ──────────────────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-16">
        <div className="card-surface rounded-3xl p-8 md:p-10">
          <p className="font-mono text-xs uppercase tracking-widest text-amber">
            {t.status.kicker}
          </p>
          <h2 className="mt-3 font-display text-2xl font-semibold text-fg md:text-3xl">
            {t.status.heading}
          </h2>
          <p className="mt-4 max-w-2xl text-muted">{t.status.body}</p>
          <div className="mt-8 flex flex-wrap gap-3 font-mono text-xs">
            {t.status.chips.map((chip, i) => (
              <span
                key={chip}
                className={
                  i === 0
                    ? "rounded-full border border-accent/40 px-3 py-1 text-accent"
                    : "rounded-full border border-line px-3 py-1 text-muted"
                }
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Final CTA ──────────────────────────────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-fg text-glow md:text-4xl">
            {t.finalCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">{t.finalCta.sub}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            {t.finalCta.buttons.map((b, i) => (
              <CTAButton
                key={b.label}
                href={FORMS[b.href]}
                target="_blank"
                rel="noopener noreferrer"
                variant={i === 0 ? "primary" : "ghost"}
              >
                {b.label}
              </CTAButton>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-muted sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Logo iconClassName="h-7 w-8" wordmarkClassName="text-sm" />
            <span className="font-mono text-[11px] text-muted">{SITE_TAGLINE}</span>
          </div>
          <span className="font-mono text-xs">{t.footerTagline}</span>
        </div>
      </footer>
    </main>
  );
}

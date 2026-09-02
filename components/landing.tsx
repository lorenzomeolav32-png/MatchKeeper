import Link from "next/link";
import { CTAButton } from "@/components/cta-button";
import { GoalFrame } from "@/components/goal-frame";
import { PitchBackground } from "@/components/pitch-background";
import { Reveal } from "@/components/reveal";
import { content, type Lang } from "@/lib/content";
import { FORMS, SITE_NAME } from "@/lib/site";

/** Landing compartida por ambos idiomas. El contenido viene de lib/content.ts. */
export function Landing({ lang }: { lang: Lang }) {
  const t = content[lang];
  const otherLang: Lang = lang === "en" ? "nl" : "en";
  const otherHref = otherLang === "en" ? "/" : "/nl";

  return (
    <main lang={t.htmlLang} className="relative">
      <PitchBackground />

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="font-display text-lg font-bold tracking-widest text-fg">
          {SITE_NAME}
        </span>
        <div className="flex items-center gap-3">
          <span className="hidden rounded-full border border-line px-3 py-1 font-mono text-xs text-muted sm:inline">
            {t.navPilot}
          </span>
          <Link
            href={otherHref}
            aria-label={t.langSwitch.aria}
            className="rounded-full border border-line px-3 py-1 font-mono text-xs text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            {t.langSwitch.label}
          </Link>
        </div>
      </header>

      {/* ── Hero (value prop + CTA) ────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Portería a todo el ancho, enmarcando el hero completo.
            El contenedor se ensancha 25% (centrado) para que los postes lleguen
            a los bordes; se alarga por arriba (larguero por ENCIMA del badge, sin
            cortarlo) y por abajo (línea de suelo al fondo, sin hueco vacío).
            Sin balón: el marco/red se estiran, el balón se dibuja aparte. */}
        <div className="pointer-events-none absolute -top-[17%] -bottom-[24%] -left-[12.5%] -right-[12.5%] overflow-hidden">
          <GoalFrame
            preserveAspectRatio="none"
            showBall={false}
            className="goal-glow-in h-full w-full opacity-0"
          />
        </div>
        {/* Balón (futuro logo) centrado y apoyado en la línea de gol; círculo real */}
        <div className="pointer-events-none absolute bottom-[4%] left-1/2 -translate-x-1/2">
          <svg
            aria-hidden
            width="54"
            height="54"
            viewBox="0 0 44 44"
            className="goal-glow-in opacity-0"
          >
            <circle cx="22" cy="22" r="19" stroke="var(--fg)" strokeWidth="2.5" fill="var(--bg-2)" />
            <path d="M22 15 l7 5 -2.7 8.5 h-8.6 l-2.7 -8.5 z" fill="var(--fg)" opacity="0.85" />
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
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 120} className="card-surface rounded-2xl p-6">
              <span className="font-mono text-sm text-accent">{s.n}</span>
              <h3 className="mt-3 font-display text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </Reveal>
          ))}
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
          <span className="font-display tracking-widest">{SITE_NAME}</span>
          <span className="font-mono text-xs">{t.footerTagline}</span>
        </div>
      </footer>
    </main>
  );
}

import Image from "next/image";
import { CTAButton } from "@/components/cta-button";
import { FacebookIcon, InstagramIcon, Logo } from "@/components/logo";
import { PitchBackground } from "@/components/pitch-background";
import { Reveal } from "@/components/reveal";
import { content } from "@/lib/content";
import { FORMS, SITE_TAGLINE, SOCIALS } from "@/lib/site";

const t = content;

export function Landing() {
  return (
    <main lang={t.htmlLang} className="relative">
      <PitchBackground />

      {/* ── Nav ────────────────────────────────────────────────────────────── */}
      <header className="relative z-20 mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <Logo iconClassName="h-11 w-13" wordmarkClassName="text-2xl" />
        <span className="hidden items-center gap-2 rounded-full border border-line px-3 py-1 font-mono text-xs text-muted sm:inline-flex">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {t.navPilot}
        </span>
      </header>

      {/* ── 1. Hero ────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        {/* Foto a la derecha, difuminada hacia el fondo con una máscara. */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-full md:w-[66%]">
          <div
            className="relative h-full w-full"
            style={{
              WebkitMaskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 30%, black 65%)",
              maskImage:
                "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.35) 30%, black 65%)",
            }}
          >
            <Image
              src="/hero-keeper.jpg"
              alt={t.hero.photoAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 66vw"
              className="object-cover object-[70%_30%]"
            />
          </div>
        </div>

        {/* Scrim: garantiza contraste del texto sobre la foto en cualquier ancho. */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(90deg, var(--bg) 0%, var(--bg) 26%, color-mix(in oklab, var(--bg) 82%, transparent) 44%, transparent 68%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-36 md:pt-24">
          <div className="max-w-xl">
            <p
              className="rise-in mb-5 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-bg-2/70 px-3 py-1 font-mono text-xs uppercase tracking-widest text-accent-strong backdrop-blur"
              style={{ "--rise-delay": "80ms" } as React.CSSProperties}
            >
              {t.hero.badge}
            </p>
            <h1
              className="rise-in font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg md:text-7xl"
              style={{ "--rise-delay": "200ms" } as React.CSSProperties}
            >
              {t.hero.titleTop}
              <br />
              <span className="text-accent">{t.hero.titleBottom}</span>
            </h1>
            <p
              className="rise-in mt-6 max-w-md text-lg leading-relaxed text-muted"
              style={{ "--rise-delay": "340ms" } as React.CSSProperties}
            >
              {t.hero.sub}
            </p>

            <div
              className="rise-in mt-9 flex flex-wrap gap-3"
              style={{ "--rise-delay": "480ms" } as React.CSSProperties}
            >
              <CTAButton href={FORMS.teams} target="_blank" rel="noopener noreferrer">
                {t.hero.ctaTeams}
              </CTAButton>
              <CTAButton
                href={FORMS.goalkeeperRegistration}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
              >
                {t.hero.ctaKeepers}
              </CTAButton>
            </div>
            <p
              className="rise-in mt-5 max-w-sm font-mono text-xs leading-relaxed text-muted"
              style={{ "--rise-delay": "600ms" } as React.CSSProperties}
            >
              {t.hero.note}
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. Benefits (dos columnas: equipos / arqueros) ─────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
          <span className="sweep-heading">{t.benefits.heading}</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">{t.benefits.sub}</p>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {[t.benefits.teams, t.benefits.keepers].map((col, colIndex) => (
            <Reveal
              key={col.kicker}
              delay={colIndex * 140}
              className={`flex flex-col rounded-3xl p-8 md:p-10 ${
                colIndex === 0
                  ? "bg-fg text-bg"
                  : "card-surface"
              }`}
            >
              <p
                className={`font-mono text-xs uppercase tracking-widest ${
                  colIndex === 0 ? "text-accent" : "text-accent-strong"
                }`}
              >
                {col.kicker}
              </p>
              <h3
                className={`mt-3 font-display text-2xl font-bold md:text-3xl ${
                  colIndex === 0 ? "text-bg" : "text-fg"
                }`}
              >
                {col.title}
              </h3>

              <ul className="mt-8 flex-1 space-y-6">
                {col.items.map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <span
                      className="mt-2 h-2 w-2 shrink-0 rounded-full"
                      style={{ background: "var(--accent)" }}
                    />
                    <div>
                      <p
                        className={`font-display text-lg font-semibold ${
                          colIndex === 0 ? "text-bg" : "text-fg"
                        }`}
                      >
                        {item.title}
                      </p>
                      <p
                        className={`mt-1 text-sm leading-relaxed ${
                          colIndex === 0 ? "text-bg/65" : "text-muted"
                        }`}
                      >
                        {item.body}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <CTAButton
                href={FORMS[col.href]}
                target="_blank"
                rel="noopener noreferrer"
                variant={colIndex === 0 ? "primary" : "ghost"}
                className="mt-10 self-start"
              >
                {col.cta}
              </CTAButton>
            </Reveal>
          ))}
        </div>
      </Reveal>

      {/* ── 3. Story (reemplaza la "prueba social": honesto, sin inventar) ─── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-accent-strong">
              {t.story.kicker}
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
              {t.story.heading}
            </h2>
            {t.story.paragraphs.map((p) => (
              <p key={p} className="mt-5 text-lg leading-relaxed text-muted">
                {p}
              </p>
            ))}
            <blockquote className="mt-10 border-l-2 border-accent pl-6 font-display text-2xl font-semibold leading-snug text-fg">
              {t.story.pullquote}
            </blockquote>
          </div>

          <div className="space-y-4">
            {t.story.scenarios.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 120}
                className="card-surface rounded-2xl p-6 md:p-7"
              >
                <p className="font-display text-lg font-semibold text-fg">{s.title}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── 4. How it works + coverage (detalle de la oferta) ──────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-3xl font-bold tracking-tight text-fg md:text-4xl">
          <span className="sweep-heading">{t.how.heading}</span>
        </h2>
        <p className="mt-4 max-w-xl text-lg text-muted">{t.how.sub}</p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {t.how.steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className="bg-bg-2 p-7 md:p-8">
              <span className="font-display text-4xl font-bold text-accent/35">{s.n}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-fg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 max-w-2xl border-l-2 border-amber/40 pl-4 font-mono text-xs leading-relaxed text-amber">
          {t.how.note}
        </p>

        <div className="card-surface mt-6 rounded-3xl p-8 md:p-10">
          <h3 className="font-display text-xl font-bold text-fg md:text-2xl">
            {t.how.coverage.heading}
          </h3>
          <p className="mt-3 max-w-2xl text-muted">{t.how.coverage.body}</p>
          <p className="mt-4 max-w-2xl border-l-2 border-amber/40 pl-4 font-mono text-xs leading-relaxed text-amber">
            {t.how.coverage.note}
          </p>
        </div>
      </Reveal>

      {/* ── 5. Final CTA (los 3 formularios) ───────────────────────────────── */}
      <Reveal as="section" className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-[2rem] bg-fg px-6 py-16 text-center md:px-12 md:py-20">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">
            {t.finalCta.kicker}
          </p>
          <h2 className="mt-3 font-display text-4xl font-bold tracking-tight text-bg md:text-5xl">
            {t.finalCta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-bg/60">{t.finalCta.sub}</p>

          <div className="mt-12 grid gap-4 text-left md:grid-cols-3">
            {t.finalCta.cards.map((c, i) => (
              <Reveal
                key={c.tag}
                delay={i * 120}
                className="flex flex-col rounded-2xl border border-bg/15 bg-bg/[0.04] p-7 transition-colors duration-300 hover:border-accent/50"
              >
                <p className="font-mono text-xs uppercase tracking-widest text-accent">
                  {c.tag}
                </p>
                <h3 className="mt-3 font-display text-xl font-bold text-bg">{c.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-bg/60">{c.body}</p>
                <CTAButton
                  href={FORMS[c.href]}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant={i === 0 ? "primary" : "invert"}
                  className="mt-7 self-start"
                >
                  {c.cta}
                </CTAButton>
              </Reveal>
            ))}
          </div>
        </div>
      </Reveal>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-muted sm:flex-row">
          <div className="flex flex-col items-center gap-1 sm:items-start">
            <Logo iconClassName="h-7 w-8" wordmarkClassName="text-sm" />
            <span className="font-mono text-[11px] text-muted">{SITE_TAGLINE}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={SOCIALS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MatchKeeper on Instagram"
              className="text-muted transition-colors hover:text-accent-strong"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIALS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="MatchKeeper on Facebook"
              className="text-muted transition-colors hover:text-accent-strong"
            >
              <FacebookIcon />
            </a>
          </div>
          <span className="font-mono text-xs">{t.footerTagline}</span>
        </div>
      </footer>
    </main>
  );
}

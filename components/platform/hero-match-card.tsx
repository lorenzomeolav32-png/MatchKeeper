"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, usePrefersReducedMotion } from "@/components/platform/reveal";
import { CheckIcon, ClockIcon, PinIcon, StarIcon } from "@/components/platform/icons";
import { MATCH_EXAMPLES, type Applicant, type MatchExample } from "@/components/platform/match-examples";

/**
 * Maqueta del producto para el hero. No es una captura: es UI real, estática,
 * que muestra en 3 segundos lo que la página tardaría 3 párrafos en explicar
 * (publicas un partido → los porteros se postulan → eliges por nota y precio).
 *
 * Secuencia: esqueletos → filas escalonadas → la mejor candidatura destacada.
 * Con `prefers-reduced-motion` se pinta directamente el estado final.
 */
export function HeroMatchCard({ example = MATCH_EXAMPLES[0] }: { example?: MatchExample }) {
  const APPLICANTS = example.applicants;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { threshold: 0.35 });
  const reducedMotion = usePrefersReducedMotion();
  const [settled, setSettled] = useState(false);

  // Con movimiento reducido nos saltamos la fase de esqueletos por completo.
  const loaded = reducedMotion || settled;

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const t = setTimeout(() => setSettled(true), 620);
    return () => clearTimeout(t);
  }, [inView, reducedMotion]);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
      className="pl-glass pl-spotlight rounded-[var(--r-xl)] p-5 sm:p-6"
    >
      {/* ── Cabecera del partido ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          {/* El partido es inventado. Etiquetarlo evita que alguien lo lea como
              oferta real, que es justo lo contrario de lo que busca la página. */}
          <span className="inline-flex items-center rounded-full border border-dashed border-line-strong px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted">
            Example
          </span>
          <h3 className="pl-display mt-2 truncate text-[color:var(--fg)] [font-size:var(--t-xl)]">
            {example.venue}
          </h3>
        </div>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 text-xs font-medium text-fg-2">
          <span className="relative grid place-items-center">
            <span
              className="pl-pulse block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--success)" }}
            />
          </span>
          Open
        </span>
      </div>

      <dl className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted">
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Format</dt>
          <dd>{example.format}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Kick-off</dt>
          <ClockIcon className="h-4 w-4 text-accent" />
          <dd className="pl-tnum">{example.kickoff}</dd>
        </div>
        <div className="flex items-center gap-1.5">
          <dt className="sr-only">Location</dt>
          <PinIcon className="h-4 w-4 text-accent" />
          <dd>{example.area}</dd>
        </div>
      </dl>

      <div className="my-5 h-px w-full bg-line" />

      {/* ── Candidaturas ── */}
      <p className="flex items-center justify-between text-xs font-medium tracking-wide text-muted">
        <span>{loaded ? `${APPLICANTS.length} goalkeepers applied` : "Finding goalkeepers nearby…"}</span>
        <span aria-hidden className="pl-tnum text-[11px] text-muted/70">
          {loaded ? "2 min ago" : ""}
        </span>
      </p>

      <ul className="mt-3 space-y-2" aria-busy={!loaded}>
        {APPLICANTS.map((a, i) =>
          loaded ? (
            <li
              key={a.name}
              className="pl-reveal pl-reveal--pop"
              data-visible="true"
              style={{ "--pl-delay": `${i * 90}ms` } as React.CSSProperties}
            >
              <ApplicantRow applicant={a} />
            </li>
          ) : (
            <li key={a.name} className="pl-skeleton h-[58px] rounded-[var(--r-md)]" />
          ),
        )}
      </ul>

      <p className="mt-4 border-t border-line pt-4 text-[11px] leading-relaxed text-muted">
        Example of a match listing. The goalkeepers, ratings and prices shown here are
        illustrative, not real bookings.
      </p>
    </div>
  );
}

function ApplicantRow({ applicant: a }: { applicant: Applicant }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-[var(--r-md)] border p-3 transition-colors duration-200 ${
        a.best
          ? "border-accent/45 bg-accent-soft"
          : "border-line bg-surface hover:border-line-strong"
      }`}
    >
      <span
        aria-hidden
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-[11px] font-bold tracking-wide ${
          a.best ? "bg-accent text-accent-ink" : "bg-surface-2 text-fg-2"
        }`}
      >
        {a.initials}
      </span>

      <div className="min-w-0 flex-1">
        <p className="flex items-center gap-1.5 text-sm font-semibold text-fg">
          <span className="truncate">{a.name}</span>
          {a.best && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-accent-ink">
              <CheckIcon className="h-2.5 w-2.5" />
              Verified
            </span>
          )}
        </p>
        <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
          <StarIcon className="h-3 w-3 text-accent" />
          <span className="pl-tnum">{a.rating}</span>
          <span aria-hidden>·</span>
          <span className="pl-tnum">{a.matches} matches</span>
          <span aria-hidden>·</span>
          <span className="pl-tnum">{a.distance}</span>
        </p>
      </div>

      <span className="pl-tnum shrink-0 text-sm font-bold text-fg">{a.price}</span>
    </div>
  );
}

"use client";

import { useState } from "react";
import { CTAButton } from "@/components/cta-button";
import { GoalFrame } from "@/components/goal-frame";

type Audience = "player" | "goalkeeper";

const COPY: Record<
  Audience,
  {
    eyebrow: string;
    titleTop: string;
    titleBottom: string;
    sub: string;
    cta: string;
    ctaHref: string;
  }
> = {
  player: {
    eyebrow: "For players & teams",
    titleTop: "Never cancel a match",
    titleBottom: "for lack of a keeper.",
    sub: "Post your match, get applications from nearby goalkeepers, and pick one by rating, matches played and price.",
    cta: "Find a goalkeeper",
    ctaHref: "/signup?role=player",
  },
  goalkeeper: {
    eyebrow: "For goalkeepers",
    titleTop: "Get paid to do",
    titleBottom: "what you already love.",
    sub: "Browse open matches near you, apply with your own rate, and get paid securely once the match is confirmed.",
    cta: "Join as a goalkeeper",
    ctaHref: "/signup?role=goalkeeper",
  },
};

export function AudienceHero() {
  const [audience, setAudience] = useState<Audience>("player");
  const c = COPY[audience];

  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.16]">
        <GoalFrame className="h-[85%] w-[95%]" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 pb-24 pt-20 text-center md:pb-32 md:pt-28">
        <div className="rise-in mx-auto inline-flex rounded-full border border-line bg-bg-2/80 p-1 backdrop-blur">
          {(Object.keys(COPY) as Audience[]).map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAudience(a)}
              className={`rounded-full px-5 py-2 font-mono text-xs uppercase tracking-widest transition-colors duration-200 ${
                audience === a
                  ? "bg-accent text-accent-ink"
                  : "text-muted hover:text-fg"
              }`}
            >
              {a === "player" ? "I need a keeper" : "I am a keeper"}
            </button>
          ))}
        </div>

        <p
          className="rise-in mt-8 font-mono text-xs uppercase tracking-widest text-accent-strong"
          style={{ "--rise-delay": "60ms" } as React.CSSProperties}
        >
          {c.eyebrow}
        </p>
        <h1
          className="rise-in mt-4 font-display text-5xl font-bold leading-[0.98] tracking-tight text-fg md:text-7xl"
          style={{ "--rise-delay": "120ms" } as React.CSSProperties}
        >
          {c.titleTop}
          <br />
          <span className="text-accent">{c.titleBottom}</span>
        </h1>
        <p
          className="rise-in mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted"
          style={{ "--rise-delay": "200ms" } as React.CSSProperties}
        >
          {c.sub}
        </p>

        <div
          className="rise-in mt-9 flex flex-wrap items-center justify-center gap-3"
          style={{ "--rise-delay": "280ms" } as React.CSSProperties}
        >
          <CTAButton href={c.ctaHref}>{c.cta}</CTAButton>
          <CTAButton href="#how-it-works" variant="ghost">
            How it works
          </CTAButton>
        </div>

        <p
          className="rise-in mt-6 font-mono text-xs text-muted"
          style={{ "--rise-delay": "340ms" } as React.CSSProperties}
        >
          London pilot · 15% platform fee · Payments held securely until the match is confirmed
        </p>
      </div>
    </section>
  );
}

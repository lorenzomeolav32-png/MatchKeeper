# MatchKeeper — Goalkeeper-on-demand for amateur football (UK pilot)

> Status: **validation phase**. The landing page is live, but no matching
> happens automatically yet — every connection between a team and a
> goalkeeper still has to be made by hand. This repo tracks the market
> research, the landing page, and the pivot history.

## The problem

Amateur football matches (friends, amateur teams, corporate teams,
tournaments) regularly get disrupted when the goalkeeper cancels last-minute
or none was arranged. Teams currently cope by asking friends, posting in
WhatsApp/Facebook groups, playing without a keeper, or cancelling the match.

## The idea

A team posts a match. Available goalkeepers nearby apply. The team picks who
plays, based on reviews and ratings once those exist. Fully manual for now
(no app, no accounts) — this phase is still market validation, not a working
product.

## Market

- Country: **UK**. Launch city: **London** — chosen for the size of its
  informal/5-a-side football scene. Future: Manchester, Birmingham, Leeds,
  Bristol.
- Demand side: groups of friends, amateur teams, corporate/5-a-side leagues,
  tournament organisers.
- Supply side: amateur/semi-competitive goalkeepers, students, casual
  players.

### Why UK and not Belgium

The pilot originally launched in **Ghent, Belgium**. After validating both
the federated-league segment and the informal/5-a-side segment there,
engagement stayed too low, and most organised leagues in Belgium don't allow
bringing in an outside keeper anyway — a structural ceiling, not just a
marketing problem. The Belgium version is fully archived in
[archive/belgium-ghent/](archive/belgium-ghent/) (trilingual EN/NL/FR
content, forms, everything) in case it's ever worth revisiting.

## Long-term vision

Could expand beyond goalkeepers to replacement players and referees. First
version stays scoped to goalkeepers only — the problem is clear and easy to
communicate.

## Core value proposition

Never cancel a match because your goalkeeper is unavailable. Goalkeepers get
more game time and get paid for it.

## Positioning rules

- Honest, community-driven, simple, football-focused, friendly, local, practical.
- Do **not** present the service as fully operational or claim an existing
  large goalkeeper network yet. No fake testimonials, no invented reviews.
- No startup buzzwords, no AI talk, no "Uber of football" framing.

## Current stage / next steps

- [x] Validated Ghent, Belgium via 3 Google Forms (federated + informal
  segments) — not enough engagement, plus a structural ceiling on bringing
  in outside keepers. Decided to pivot market.
- [x] Researched the UK competitive landscape — `rentagoalkeeper.com` claims
  to be live in the UK, but no app could be verified on the App Store or
  Google Play; most likely another pre-launch landing, not a proven
  competitor.
- [x] Pivoted the pilot to **London, UK**. Belgium fully archived.
- [x] Rebuilt the landing: new "Daylight Pitch" theme (white + orange), 5
  sections (hero, benefits for teams/keepers, an honest "where we're at"
  section instead of fake social proof, how-it-works with a
  keeper-applies/team-chooses flow, final CTA).
- [x] Created and connected the 3 real UK Google Forms in `lib/site.ts`
  (draft used: `research/surveys-uk-draft.md`).
- [x] New orange brand assets for the UK social accounts
  (`public/brand/social-uk/`). Belgium's IG/FB accounts suspended (not
  deleted).
- [ ] Create new Instagram/Facebook accounts for the UK pilot.
- [ ] Start driving traffic to the 3 forms (WhatsApp/Facebook groups,
  personal network in London).
- [ ] Review responses → go/no-go before building any real product
  (matching, accounts, payments).

## Repo structure

- `app/`, `components/`, `lib/` — the Next.js landing page (see
  [README.landing.md](README.landing.md) for the technical README).
- `archive/belgium-ghent/` — full frozen copy of the Belgium/Ghent version
  (content, forms, domain) from before the UK pivot.
- `archive/brand-uk-orange-src/` — HTML sources used to render the UK
  orange social assets (profile photo, Facebook cover, style exploration).
- `research/` — survey content for both markets and notes from manual
  outreach.
- `public/brand/` — brand assets: logo variants, Belgium's Facebook cover,
  and the UK orange social assets.


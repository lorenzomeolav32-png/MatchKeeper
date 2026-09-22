# Belgium / Ghent snapshot (archived before UK pivot)

This folder is a frozen copy of the MatchKeeper landing exactly as it stood for
the Ghent (Belgium) validation phase, taken before pivoting the active project
to the UK market (London pilot).

Full history is also preserved in git (this repo's log, branch `dev`) — this
folder just makes the Belgium version easy to grab without digging through git
if the project ever revisits Belgium.

## Contents

- `content.ts` — the original trilingual (EN/NL/FR) landing copy for Ghent,
  copied verbatim from `lib/content.ts`.
- `site.ts` — the original site constants (Ghent forms, `gkservice.be` domain
  placeholder), copied verbatim from `lib/site.ts`.

## If Belgium is ever revisited

1. Copy these two files back into `lib/` (overwriting the UK versions, or
   restoring the `Lang`/`LANGS` multi-language structure in
   `components/landing.tsx` and re-adding `app/nl/page.tsx` + `app/fr/page.tsx`,
   which were removed from the active app during the UK pivot).
2. The 3 Google Forms for Belgium are still the ones referenced in
   `research/surveys.md` at the repo root — those weren't touched by the pivot.

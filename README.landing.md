# MatchKeeper — Landing (validation phase, UK pilot)

Landing page para validar la idea de "portero a demanda" para fútbol amateur.
Objetivo: explicar la propuesta, captar waitlist y llevar a los 3 Google Forms.

**Pivot de mercado (2026-09)**: el piloto pasó de Gante (Bélgica) a Londres
(UK). La versión trilingüe (EN/NL/FR) de Bélgica quedó archivada en
`archive/belgium-ghent/` — el sitio activo es ahora solo en inglés. Los 3
Google Forms de UK todavía no existen: hay un borrador de las preguntas en
`research/surveys-uk-draft.md` y placeholders `FORMS.*` en `lib/site.ts` que
hay que reemplazar una vez creados los forms reales.

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/postcss`)
- Fuentes vía `next/font/google` (Chakra Petch display, Geist, JetBrains Mono)
- Sin backend ni base de datos. Los CTA enlazan a los Google Forms.
- Deploy en **Vercel Hobby** (gratis). Único coste: el dominio.

## Ejecutar en local

```powershell
cd GK_service
npm install
npm run dev
```

Abre http://localhost:3000

## Tema "Night Pitch"

Todo el tema está centralizado para poder cambiarlo fácil:

- **Colores**: variables CSS en `app/globals.css` (`--bg`, `--accent`, `--amber`…).
  Cambia esos tokens y cambia toda la web.
- **Fuentes**: en un solo sitio, `app/layout.tsx`.
- **Fondo (red de portería + foco de estadio)**: componente aislado
  `components/pitch-background.tsx`.
- **Textos y enlaces de forms**: `lib/site.ts`.

## Estructura

```
app/
  layout.tsx        # fuentes + metadata
  page.tsx          # secciones de la landing (PAS)
  globals.css       # tema Night Pitch (tokens CSS)
components/
  pitch-background.tsx  # fondo decorativo
  cta-button.tsx        # botón CTA reutilizable
  goal-frame.tsx        # ilustración SVG de la portería
lib/
  site.ts           # constantes + URLs de los 3 forms
```

## Notas

- Copy provisional (la propuesta de valor se refinará).
- Posicionamiento honesto: proyecto en fase de validación en Ghent, no un
  servicio ya operativo. Nada de buzzwords ni promesas exageradas.

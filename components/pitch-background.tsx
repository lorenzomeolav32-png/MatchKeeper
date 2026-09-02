/**
 * Fondo "Night Pitch": malla de portería + barrido de foco de estadio + glow.
 * Aislado en un solo componente para poder cambiar el motivo visual sin tocar
 * las secciones. Es puramente decorativo (aria-hidden).
 */
export function PitchBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradiente: césped de noche */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #10241a 0%, var(--bg-2) 42%, var(--bg) 100%)",
        }}
      />

      {/* Textura de red de portería */}
      <div className="net-overlay absolute inset-0 opacity-60" />

      {/* Marca de medio campo: línea + círculo central (muy sutil) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.10]">
        <div
          className="aspect-square w-[42rem] max-w-[80vw] rounded-full border"
          style={{ borderColor: "var(--line-strong)" }}
        />
      </div>
      <div
        className="absolute left-0 top-1/2 h-px w-full"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--line-strong) 35%, var(--line-strong) 65%, transparent)",
          opacity: 0.12,
        }}
      />

      {/* Glow verde inferior (foco lejano) */}
      <div
        className="absolute -bottom-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--accent-glow)", opacity: 0.22 }}
      />

      {/* Barrido de foco de estadio */}
      <div className="absolute -top-1/3 left-0 h-[160%] w-full">
        <div
          className="floodlight-sweep absolute top-0 h-full w-40 blur-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)",
          }}
        />
      </div>
    </div>
  );
}

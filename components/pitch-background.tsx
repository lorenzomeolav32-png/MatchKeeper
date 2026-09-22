/**
 * Fondo "Daylight Pitch": papel cálido + textura de red muy tenue + halo
 * naranja. Aislado en un solo componente para poder cambiar el motivo visual
 * sin tocar las secciones. Es puramente decorativo (aria-hidden).
 */
export function PitchBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, #ffffff 0%, var(--bg) 55%, #f4ede5 100%)",
        }}
      />

      {/* Textura de red de portería, casi imperceptible sobre fondo claro */}
      <div className="net-overlay absolute inset-0 opacity-[0.35]" />

      {/* Halo naranja inferior, muy difuso */}
      <div
        className="absolute -bottom-48 left-1/2 h-[34rem] w-[64rem] -translate-x-1/2 rounded-full blur-3xl"
        style={{ background: "var(--accent-glow)", opacity: 0.18 }}
      />
    </div>
  );
}

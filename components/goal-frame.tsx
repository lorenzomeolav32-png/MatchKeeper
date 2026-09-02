/** Lineart propio de una portería con un balón centrado.
 *  Decorativo, ligero (SVG inline). Con preserveAspectRatio="none" el marco/red
 *  se estiran para cubrir todo el contenedor sin deformar el grosor de línea
 *  (vector-effect). El balón se puede ocultar con showBall={false} para
 *  renderizarlo aparte y que no se deforme. */
export function GoalFrame({
  className = "",
  preserveAspectRatio = "xMidYMid meet",
  showBall = true,
}: {
  className?: string;
  preserveAspectRatio?: string;
  showBall?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 400 240"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Malla de la red */}
      <g stroke="var(--accent)" strokeWidth="0.8" opacity="0.32" vectorEffect="non-scaling-stroke">
        {Array.from({ length: 11 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={40 + i * 32}
            y1="40"
            x2={40 + i * 32}
            y2="200"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {Array.from({ length: 6 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1="40"
            y1={40 + i * 32}
            x2="360"
            y2={40 + i * 32}
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </g>

      {/* Marco de la portería */}
      <path
        d="M40 200 V40 H360 V200"
        stroke="var(--accent)"
        strokeWidth="3.5"
        opacity="0.55"
        vectorEffect="non-scaling-stroke"
      />
      {/* Suelo / línea de gol */}
      <line
        x1="16"
        y1="200"
        x2="384"
        y2="200"
        stroke="var(--fg)"
        strokeWidth="2"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />

      {/* Balón (futuro logo de marca) */}
      {showBall && (
        <>
          <circle
            cx="200"
            cy="176"
            r="14"
            stroke="var(--fg)"
            strokeWidth="2.5"
            fill="var(--bg-2)"
            vectorEffect="non-scaling-stroke"
          />
          <path d="M200 166 l6 5 -2 8 h-8 l-2 -8 z" fill="var(--fg)" opacity="0.85" />
        </>
      )}
    </svg>
  );
}

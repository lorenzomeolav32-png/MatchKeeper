/** Portería en PERSPECTIVA 3D (caja): marco frontal (la "boca" que enmarca el
 *  hero) + marco trasero recedido hacia el centro, unidos por hebras de red en
 *  techo, laterales y suelo. Monolínea, mismo --accent que el resto de la marca.
 *  Con preserveAspectRatio="none" la caja se estira para cubrir el contenedor;
 *  la convergencia simétrica mantiene la lectura 3D. */

type Pt = [number, number];
const lerp = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];

// Esquinas del marco FRONTAL (boca de la portería, cerca de los bordes).
const F_TL: Pt = [60, 56];
const F_TR: Pt = [1140, 56];
const F_BL: Pt = [60, 648];
const F_BR: Pt = [1140, 648];
// Esquinas del marco TRASERO (recedido y subido: mirada ligeramente en picado).
const B_TL: Pt = [300, 200];
const B_TR: Pt = [900, 200];
const B_BL: Pt = [300, 468];
const B_BR: Pt = [900, 468];

/** Hebras de red que conectan un borde frontal con su borde trasero. */
function strands(fA: Pt, fB: Pt, bA: Pt, bB: Pt, count: number) {
  return Array.from({ length: count + 1 }).map((_, i) => {
    const t = i / count;
    const f = lerp(fA, fB, t);
    const b = lerp(bA, bB, t);
    return { x1: f[0], y1: f[1], x2: b[0], y2: b[1] };
  });
}

export function GoalFrame({
  className = "",
  preserveAspectRatio = "xMidYMid meet",
}: {
  className?: string;
  preserveAspectRatio?: string;
}) {
  const roof = strands(F_TL, F_TR, B_TL, B_TR, 10);
  const sideL = strands(F_TL, F_BL, B_TL, B_BL, 7);
  const sideR = strands(F_TR, F_BR, B_TR, B_BR, 7);
  // El suelo NO lleva malla (es el piso). Solo techo y laterales.
  const depth = [...roof, ...sideL, ...sideR];

  // Rejilla de la red del fondo (plano trasero).
  const backV = Array.from({ length: 13 }).map((_, i) => B_TL[0] + ((B_TR[0] - B_TL[0]) / 12) * i);
  const backH = Array.from({ length: 8 }).map((_, i) => B_TL[1] + ((B_BL[1] - B_TL[1]) / 7) * i);

  return (
    <svg
      viewBox="0 0 1200 704"
      fill="none"
      aria-hidden
      className={className}
      preserveAspectRatio={preserveAspectRatio}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Hebras de profundidad (techo, laterales, suelo) */}
      <g stroke="var(--accent)" strokeWidth="1" opacity="0.26" vectorEffect="non-scaling-stroke">
        {depth.map((s, i) => (
          <line key={`d${i}`} x1={s.x1} y1={s.y1} x2={s.x2} y2={s.y2} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Rejilla de la red del fondo */}
      <g stroke="var(--accent)" strokeWidth="1" opacity="0.34" vectorEffect="non-scaling-stroke">
        {backV.map((x, i) => (
          <line key={`bv${i}`} x1={x} y1={B_TL[1]} x2={x} y2={B_BL[1]} vectorEffect="non-scaling-stroke" />
        ))}
        {backH.map((y, i) => (
          <line key={`bh${i}`} x1={B_TL[0]} y1={y} x2={B_TR[0]} y2={y} vectorEffect="non-scaling-stroke" />
        ))}
      </g>

      {/* Marco trasero */}
      <path
        d={`M${B_TL[0]} ${B_TL[1]} L${B_TR[0]} ${B_TR[1]} L${B_BR[0]} ${B_BR[1]} L${B_BL[0]} ${B_BL[1]} Z`}
        stroke="var(--accent)"
        strokeWidth="2"
        opacity="0.5"
        vectorEffect="non-scaling-stroke"
      />

      {/* Marco frontal (postes + larguero) — el borde más marcado, la boca */}
      <path
        d={`M${F_BL[0]} ${F_BL[1]} L${F_TL[0]} ${F_TL[1]} L${F_TR[0]} ${F_TR[1]} L${F_BR[0]} ${F_BR[1]}`}
        stroke="var(--accent)"
        strokeWidth="9"
        opacity="0.88"
        vectorEffect="non-scaling-stroke"
      />
      {/* Línea de gol (suelo frontal) */}
      <line
        x1={F_BL[0]}
        y1={F_BL[1]}
        x2={F_BR[0]}
        y2={F_BR[1]}
        stroke="var(--fg)"
        strokeWidth="2.5"
        opacity="0.4"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

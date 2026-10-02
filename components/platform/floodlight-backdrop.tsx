/**
 * Fondo de la plataforma: base con halo de acento, rejilla de red de portería
 * (estructura, no ruido) y un haz de foco de estadio que se mueve muy despacio.
 * Puramente decorativo y `fixed`, así que no participa en el layout ni provoca
 * reflow al hacer scroll.
 */
export function FloodlightBackdrop() {
  return (
    <div aria-hidden className="pl-backdrop">
      <div className="pl-backdrop__base" />
      <div className="pl-backdrop__grid" />
      <div className="pl-backdrop__beam" />
    </div>
  );
}

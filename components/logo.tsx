/** Marca MatchKeeper: escudo con portería + check, en línea con el lineart
 *  de GoalFrame (mismo --accent, mismo estilo monolínea). */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 132 116"
      fill="none"
      aria-hidden
      className={className}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M66 5 L122 20 V56 C122 86 98 103 66 111 C34 103 10 86 10 56 V20 Z"
        stroke="var(--accent)"
        strokeWidth="5"
      />
      <g stroke="var(--accent)" strokeWidth="1.5" opacity="0.45">
        <line x1="30" y1="30" x2="30" y2="64" />
        <line x1="39" y1="30" x2="39" y2="64" />
        <line x1="48" y1="30" x2="48" y2="64" />
        <line x1="57" y1="30" x2="57" y2="64" />
        <line x1="66" y1="30" x2="66" y2="64" />
        <line x1="75" y1="30" x2="75" y2="64" />
        <line x1="84" y1="30" x2="84" y2="64" />
        <line x1="93" y1="30" x2="93" y2="64" />
        <line x1="102" y1="30" x2="102" y2="64" />
        <line x1="30" y1="30" x2="102" y2="30" />
        <line x1="30" y1="38" x2="102" y2="38" />
        <line x1="30" y1="47" x2="102" y2="47" />
        <line x1="30" y1="56" x2="102" y2="56" />
        <line x1="30" y1="64" x2="102" y2="64" />
      </g>
      <path d="M30 64 V30 H102 V64" stroke="var(--accent)" strokeWidth="3" opacity="0.85" />
      <path d="M40 70 L56 88 L98 44" stroke="var(--accent-strong)" strokeWidth="9" />
    </svg>
  );
}

export function Logo({
  className = "",
  iconClassName = "h-8 w-8",
  wordmarkClassName = "text-lg",
}: {
  className?: string;
  iconClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <LogoMark className={iconClassName} />
      <span className={`font-display font-bold tracking-tight ${wordmarkClassName}`}>
        <span className="text-fg">Match</span>
        <span className="text-accent">Keeper</span>
      </span>
    </span>
  );
}

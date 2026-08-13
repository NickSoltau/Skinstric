function Arrow({ direction, color }) {
  const points =
    direction === "left" ? "9,0 9,10.89 0,5.45" : "0,0 0,10.89 9.43,5.45";
  return (
    <svg width={9.43} height={10.89} viewBox="0 0 9.43 10.89" fill={color}>
      <polygon points={points} />
    </svg>
  );
}

export default function DiamondNavLink({
  label,
  direction,
  href,
  onClick,
  onMouseEnter,
  onMouseLeave,
  light = false,
  textOpacity = 0.7,
  fadedOut = false,
}) {
  const color = light ? "var(--color-canvas)" : "var(--color-ink)";

  const icon = (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center transition-transform duration-300 ease-out group-hover:scale-110">
      <span className="absolute inset-0 rotate-45 border" style={{ borderColor: color }} />
      <span className="relative">
        <Arrow direction={direction} color={color} />
      </span>
    </span>
  );

  const text = (
    <span
      className="text-sm font-semibold uppercase"
      style={{ lineHeight: "16px", letterSpacing: "-0.02em", color, opacity: textOpacity }}
    >
      {label}
    </span>
  );

  const handleClick = onClick
    ? (event) => {
        event.preventDefault();
        onClick(event);
      }
    : undefined;

  return (
    
      <a href={href ?? "#"}
      onClick={handleClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`group flex items-center gap-4 transition-opacity duration-300 ease-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 ${
        fadedOut ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ outlineColor: color }}
    >
      {direction === "left" ? (
        <>
          {icon}
          {text}
        </>
      ) : (
        <>
          {text}
          {icon}
        </>
      )}
    </a>
  );
}
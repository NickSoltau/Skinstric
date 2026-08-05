/**
 * Small rotated-square (diamond) icon with an arrow, paired with a
 * label. Used for "◂ DISCOVER A.I." and "TAKE TEST ▸" on the hero.
 * Figma layers: button-icon-text-shrunk (150x44 / 127x44, gap 16)
 *   > button-icon-shrunk (44x44)
 *     > Polygon (arrow, 9.43x10.89 — rendered as a filled SVG
 *       triangle here; a unicode ◂/▸ glyph read as too thin/small
 *       against the reference site)
 *     > rect-inner-dash (opacity 0 at rest — hover state, not built yet)
 *     > rect-glow-line (opacity 0 at rest — hover state, not built yet)
 *     > rect-outer-line (1px solid rgba(26,27,28,1) — resting state)
 *   > button (14px/16px, weight 600, -2% ls, uppercase, 70% opacity)
 *
 * Hover state (dashed inner ring + glow) intentionally deferred —
 * see conversation notes.
 */
function Arrow({ direction }) {
  // Figma Polygon: 9.43 x 10.89
  const points =
    direction === "left" ? "9,0 9,10.89 0,5.45" : "0,0 0,10.89 9.43,5.45";
  return (
    <svg
      width={9.43}
      height={10.89}
      viewBox="0 0 9.43 10.89"
      fill="var(--color-ink)"
    >
      <polygon points={points} />
    </svg>
  );
}

export default function DiamondNavLink({ label, direction, href, onClick }) {
  const icon = (
    <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
      {/* rect-outer-line */}
      <span className="absolute inset-0 rotate-45 border border-[var(--color-ink)]" />
      <span className="relative">
        <Arrow direction={direction} />
      </span>
    </span>
  );

  const text = (
    <span
      className="text-sm font-semibold uppercase text-[var(--color-ink)]/70"
      style={{ lineHeight: "16px", letterSpacing: "-0.02em" }}
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
      className="group flex items-center gap-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-ink)]"
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
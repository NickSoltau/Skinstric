const DIAMONDS = [
  { size: 602, opacity: 1 },
  { size: 682, opacity: 0.6 },
  { size: 762, opacity: 0.3 },
];

// Largest diamond (762) has a diagonal of ~1078 (762*sqrt(2)).
const CANVAS = 1078;
const CENTER = CANVAS / 2;

// Figma's frame is 1920px wide — these are fixed px sizes and only
// look right at that exact width. Scale as a percentage of viewport
// width instead (same fix already applied to the hero headline),
// capped at the literal Figma size so it doesn't keep growing past
// the reference resolution on very wide screens.
const DISPLAY_SIZE = `min(${((CANVAS / 1920) * 100).toFixed(4)}vw, ${CANVAS}px)`;

export default function NestedDiamonds() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${CANVAS} ${CANVAS}`}>
        {DIAMONDS.map(({ size, opacity }) => {
          const offset = (CANVAS - size) / 2;
          return (
            <rect
              key={size}
              x={offset}
              y={offset}
              width={size}
              height={size}
              fill="none"
              stroke="var(--color-diamond-border)"
              strokeWidth={2}
              strokeOpacity={opacity}
              strokeDasharray="1 5"
              strokeLinecap="round"
              transform={`rotate(45 ${CENTER} ${CENTER})`}
            />
          );
        })}
      </svg>
    </div>
  );
}
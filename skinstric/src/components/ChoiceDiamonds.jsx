const DIAMONDS = [
  { size: 405.18, opacity: 1 },
  { size: 444.34, opacity: 0.6 },
  { size: 482, opacity: 0.3 },
];

const CANVAS = 682;
const CENTER = CANVAS / 2;
const DISPLAY_SIZE = `min(${((CANVAS / 1920) * 100).toFixed(4)}vw, ${CANVAS}px)`;

export default function ChoiceDiamonds() {
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
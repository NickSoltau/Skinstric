import { SPIN_TIERS } from "@/components/diamondSpin";

const DIAMONDS = [
  { size: 602, opacity: 1 }, // small
  { size: 682, opacity: 0.6 }, // medium
  { size: 762, opacity: 0.3 }, // large
];

const CANVAS = 1078;
const CENTER = CANVAS / 2;
const DISPLAY_SIZE = `min(${((CANVAS / 1920) * 100).toFixed(4)}vw, ${CANVAS}px)`;

export default function NestedDiamonds() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: DISPLAY_SIZE, height: DISPLAY_SIZE }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${CANVAS} ${CANVAS}`}>
        {DIAMONDS.map(({ size, opacity }, index) => {
          const offset = (CANVAS - size) / 2;
          const { duration, baseAngle } = SPIN_TIERS[index];
          return (
            <g key={size} transform={`rotate(${45 + baseAngle} ${CENTER} ${CENTER})`}>
              <rect
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
                style={{
                  transformBox: "fill-box",
                  transformOrigin: "center",
                  animation: `diamond-spin ${duration}s linear infinite`,
                }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
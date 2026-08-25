const CANVAS = 852;
const RECT_SIZE = 600;
const RECT_OFFSET = (CANVAS - RECT_SIZE) / 2;

function Diamond({ side, faded }) {
  return (
    <svg
      width={CANVAS}
      height={CANVAS}
      viewBox={`0 0 ${CANVAS} ${CANVAS}`}
      className="absolute top-1/2 transition-opacity duration-300 ease-out"
      style={{
        [side]: 0,
        transform: `translate(${side === "left" ? "-50%" : "50%"}, -50%)`,
        opacity: faded ? 0 : 1,
      }}
    >
      <rect
        x={RECT_OFFSET}
        y={RECT_OFFSET}
        width={RECT_SIZE}
        height={RECT_SIZE}
        fill="none"
        stroke="var(--color-diamond-border)"
        strokeWidth={2}
        strokeDasharray="1 5"
        strokeLinecap="round"
        transform={`rotate(45 ${CANVAS / 2} ${CANVAS / 2})`}
      />
    </svg>
  );
}

export default function DiamondBackdrop({ fadedSide }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Diamond side="left" faded={fadedSide === "left"} />
      <Diamond side="right" faded={fadedSide === "right"} />
    </div>
  );
}
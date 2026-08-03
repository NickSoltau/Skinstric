// A 602x602 square rotated 45deg has a diagonal of ~852px (602*sqrt(2)).
// The SVG canvas has to be at least that big, or the rotated corners
// clip against the SVG's own viewBox — that was the "disappearing
// lines" bug. The rect is centered inside the larger canvas so its
// own center (and therefore the diamond's point) stays anchored at
// the same spot as before.
const CANVAS = 852;
const RECT_SIZE = 600;
const RECT_OFFSET = (CANVAS - RECT_SIZE) / 2; // 126

function Diamond({ side }) {
  return (
    <svg
      width={CANVAS}
      height={CANVAS}
      viewBox={`0 0 ${CANVAS} ${CANVAS}`}
      className="absolute top-1/2"
      style={{
        [side]: 0,
        transform: `translate(${side === "left" ? "-50%" : "50%"}, -50%)`,
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

export default function DiamondBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <Diamond side="left" />
      <Diamond side="right" />
    </div>
  );
}
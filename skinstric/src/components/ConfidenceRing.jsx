export default function ConfidenceRing({ percent }) {
  const SIZE = 384;
  const STROKE = 3;
  const displaySize = `min(${((SIZE / 1920) * 100).toFixed(4)}vw, ${((SIZE / 960) * 100).toFixed(4)}vh, ${SIZE}px)`;
  const r = (SIZE - STROKE) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: displaySize, height: displaySize }}
    >
      <svg width="100%" height="100%" viewBox={`0 0 ${SIZE} ${SIZE}`}>
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={r}
          fill="none"
          stroke="rgba(193, 194, 195, 1)"
          strokeWidth={STROKE}
        />
        <circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          r={r}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth={STROKE}
          strokeDasharray={`${dash} ${c - dash}`}
          transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
      </svg>
      <span className="absolute flex items-baseline text-[var(--color-ink)]">
        <span style={{ fontSize: 40, lineHeight: "40px", letterSpacing: "-0.05em" }}>
          {percent}
        </span>
        <span style={{ fontSize: 24, lineHeight: "40px", letterSpacing: "-0.05em" }}>
          %
        </span>
      </span>
    </div>
  );
}
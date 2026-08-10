const TILE_SIZE = 108.83;
const REST_FILL = "rgba(243, 243, 244, 1)";
const HOVER_FILL = "rgba(225, 225, 226, 1)";
const ENABLED_KEYS = new Set(["demographics"]);

const QUADRANTS = [
  {
    key: "demographics",
    label: ["Demographics"],
    tileCenter: { xPct: 48.34, yPct: 34.89 },
  },
  {
    key: "skin-type-details",
    label: ["Skin Type", "Details"],
    tileCenter: { xPct: 42.45, yPct: 46.66 },
  },
  {
    key: "cosmetic-concerns",
    label: ["Cosmetic", "Concerns"],
    tileCenter: { xPct: 54.16, yPct: 46.66 },
  },
  {
    key: "weather",
    label: ["Weather"],
    tileCenter: { xPct: 48.34, yPct: 58.43 },
  },
];

export default function AnalysisQuadrants({ onSelect }) {
  return (
    <div aria-hidden={false} className="pointer-events-none absolute inset-0">
      {QUADRANTS.map(({ key, tileCenter }) => {
        const enabled = ENABLED_KEYS.has(key);
        return (
          <button
            key={key}
            type="button"
            disabled={!enabled}
            onClick={enabled ? () => onSelect?.(key) : undefined}
            aria-disabled={!enabled}
            className="group pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 rotate-45 transition-colors"
            style={{
              left: `${tileCenter.xPct}%`,
              top: `${tileCenter.yPct}%`,
              width: TILE_SIZE,
              height: TILE_SIZE,
              background: REST_FILL,
              cursor: enabled ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = HOVER_FILL)}
            onMouseLeave={(e) => (e.currentTarget.style.background = REST_FILL)}
          />
        );
      })}
      {QUADRANTS.map(({ key, label, tileCenter }) => (
        <span
          key={key}
          className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 text-center uppercase text-[var(--color-ink)]"
          style={{
            left: `${tileCenter.xPct}%`,
            top: `${tileCenter.yPct}%`,
            whiteSpace: "nowrap",
            fontSize: 16,
            lineHeight: "24px",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {label.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
      ))}
    </div>
  );
}
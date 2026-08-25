const TILE_SIZE = 108.83;
const SPACING = 78; // distance between adjacent tile centers — smaller than TILE_SIZE so tiles overlap
const GRID_SIZE = SPACING * 2 + TILE_SIZE;

const REST_FILL = "rgba(243, 243, 244, 1)";
const HOVER_FILL = "rgba(225, 225, 226, 1)";
const ENABLED_KEYS = new Set(["demographics"]);

// Center offsets from the middle of the cluster, in pixels.
const QUADRANTS = [
  { key: "demographics", label: ["Demographics"], dx: 0, dy: -SPACING },
  { key: "skin-type-details", label: ["Skin Type", "Details"], dx: -SPACING, dy: 0 },
  { key: "cosmetic-concerns", label: ["Cosmetic", "Concerns"], dx: SPACING, dy: 0 },
  { key: "weather", label: ["Weather"], dx: 0, dy: SPACING },
];

export default function AnalysisQuadrants({ onSelect }) {
  return (
    <div
      aria-hidden={false}
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ width: GRID_SIZE, height: GRID_SIZE }}
    >
      {QUADRANTS.map(({ key, dx, dy }) => {
        const enabled = ENABLED_KEYS.has(key);
        return (
          <button
            key={key}
            type="button"
            disabled={!enabled}
            onClick={enabled ? () => onSelect?.(key) : undefined}
            aria-disabled={!enabled}
            className="group pointer-events-auto absolute left-1/2 top-1/2 transition-colors"
            style={{
              width: TILE_SIZE,
              height: TILE_SIZE,
              transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px)) rotate(45deg)`,
              background: REST_FILL,
              cursor: enabled ? "pointer" : "not-allowed",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = HOVER_FILL)}
            onMouseLeave={(e) => (e.currentTarget.style.background = REST_FILL)}
          />
        );
      })}
      {QUADRANTS.map(({ key, label, dx, dy }) => (
        <span
          key={key}
          className="pointer-events-none absolute left-1/2 top-1/2 text-center uppercase text-[var(--color-ink)]"
          style={{
            transform: `translate(calc(-50% + ${dx}px), calc(-50% + ${dy}px))`,
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
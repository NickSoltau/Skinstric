const REST_FILL = "rgba(243, 243, 244, 1)";
const HOVER_FILL = "rgba(225, 225, 226, 1)";

export default function CategorySidebar({ categories, activeKey, onSelect, layout = "absolute" }) {
  const wrapperClassName =
    layout === "stacked"
      ? "flex w-full flex-col gap-3"
      : "absolute flex flex-col gap-3";
  const wrapperStyle =
    layout === "stacked" ? undefined : { left: "1.667%", top: "31.667%", width: "10.833%" };

  return (
    <div className={wrapperClassName} style={wrapperStyle}>
      {categories.map(({ key, value, label }) => {
        const isActive = key === activeKey;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect?.(key)}
            className="flex w-full flex-col justify-between border-t border-[var(--color-ink)] px-4 py-3 text-left transition-colors"
            style={{
              height: 104,
              background: isActive ? "var(--color-ink)" : REST_FILL,
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = HOVER_FILL;
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = REST_FILL;
            }}
          >
            <span
              className="block uppercase"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: isActive ? "var(--color-canvas)" : "var(--color-ink)",
              }}
            >
              {value}
            </span>
            <span
              className="block uppercase"
              style={{
                fontSize: 16,
                lineHeight: "24px",
                fontWeight: 600,
                letterSpacing: "-0.02em",
                color: isActive ? "var(--color-canvas)" : "var(--color-ink)",
              }}
            >
              {label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
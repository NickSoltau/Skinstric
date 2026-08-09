function RadioMarker({ filled }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 shrink-0 rotate-45 border"
      style={{
        borderColor: filled ? "var(--color-canvas)" : "var(--color-ink)",
      }}
    />
  );
}

export default function OptionsList({ heading, options, selectedKey, onSelect }) {
  return (
    <div
      className="absolute border-t border-[var(--color-ink)]"
      style={{ left: "75%", top: "31.667%", width: "23.333%", background: "rgba(243, 243, 244, 1)" }}
    >
      <div
        className="flex items-center justify-between px-4 py-2 uppercase text-[var(--color-ink)]/80"
        style={{ fontSize: 16, lineHeight: "24px", fontWeight: 500, letterSpacing: "-0.02em" }}
      >
        <span>{heading}</span>
        <span>A. I. Confidence</span>
      </div>

      {options.map(({ key, label, percent }) => {
        const isSelected = key === selectedKey;
        return (
          <button
            key={key}
            type="button"
            onClick={() => onSelect?.(key)}
            className="flex w-full items-center justify-between px-4 py-3 text-left transition-colors"
            style={{ background: isSelected ? "var(--color-ink)" : "transparent" }}
          >
            <span className="flex items-center gap-3">
              <RadioMarker filled={isSelected} />
              <span
                style={{
                  fontSize: 16,
                  lineHeight: "24px",
                  letterSpacing: "-0.02em",
                  color: isSelected ? "var(--color-canvas)" : "var(--color-ink)",
                }}
              >
                {label}
              </span>
            </span>
            <span
              style={{
                fontSize: 16,
                lineHeight: "24px",
                letterSpacing: "-0.02em",
                color: isSelected ? "var(--color-canvas)" : "var(--color-ink)",
              }}
            >
              {percent} %
            </span>
          </button>
        );
      })}
    </div>
  );
}
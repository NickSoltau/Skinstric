export function ApertureIcon({ className }) {
  const blades = Array.from({ length: 6 }, (_, i) => i * 60);
  return (
    <svg viewBox="0 0 100 100" className={className} fill="var(--color-canvas)">
      {blades.map((angle) => (
        <polygon
          key={angle}
          points="50,50 78,38 70,68"
          transform={`rotate(${angle} 50 50)`}
        />
      ))}
    </svg>
  );
}

export function GalleryIcon({ className }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="var(--color-ink)">
      <circle cx="68" cy="32" r="9" />
      <path d="M8 78 L34 46 L52 66 L66 50 L92 78 Z" />
    </svg>
  );
}
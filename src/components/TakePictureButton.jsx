function CameraGlyph() {
  return (
    <svg viewBox="0 0 27 22" className="h-4 w-5" fill="var(--color-diamond-border)">
      <rect x="0" y="4" width="27" height="16" rx="2" />
      <rect x="9" y="0" width="9" height="4" rx="1" />
      <circle cx="13.5" cy="12" r="5" fill="var(--color-canvas)" />
    </svg>
  );
}

export default function TakePictureButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group absolute right-8 top-1/2 flex -translate-y-1/2 items-center gap-4 md:right-10"
    >
      <span
        className="text-sm font-semibold uppercase text-[var(--color-canvas)] transition-opacity group-hover:opacity-70"
        style={{ lineHeight: "16px", letterSpacing: "-0.02em" }}
      >
        Take Picture
      </span>
      <span
        className="relative flex items-center justify-center rounded-full border-2 border-[var(--color-canvas)] transition-transform group-hover:scale-105"
        style={{ width: 62, height: 62 }}
      >
        <span
          className="flex items-center justify-center rounded-full bg-[var(--color-canvas)]"
          style={{ width: 55.11, height: 55.11 }}
        >
          <CameraGlyph />
        </span>
      </span>
    </button>
  );
}
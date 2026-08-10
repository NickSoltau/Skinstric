import Link from "next/link";

export default function SiteHeader({ crumb, showEnterCode = false, light = false }) {
  const color = light ? "var(--color-canvas)" : "var(--color-ink)";

  return (
    <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-8 py-6 md:px-10 md:py-8">
      <div className="flex items-center gap-2 text-xs font-semibold tracking-wide" style={{ color }}>
        <Link
          href="/"
          className="hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          style={{ outlineColor: color }}
        >
          SKINSTRIC
        </Link>
        <span className="flex items-center gap-1 font-normal opacity-60">
          <span aria-hidden>[</span>
          <span className="tracking-wide">{crumb}</span>
          <span aria-hidden>]</span>
        </span>
      </div>

      {showEnterCode && (
        <button
          type="button"
          className="rounded-none bg-[var(--color-ink)] px-4 py-2 text-[11px] font-semibold tracking-wide text-[var(--color-canvas)] transition-opacity hover:opacity-80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-ink)]"
        >
          ENTER CODE
        </button>
      )}
    </header>
  );
}
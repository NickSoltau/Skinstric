export default function CameraPermissionDialog({ onDeny, onAllow }) {
  return (
    <>
      {/* Mobile (below sm): fixed, centered in the viewport — reads as a
          modal rather than being anchored to the icon, which doesn't
          leave enough room on a phone. */}
      <div
        className="fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 bg-[var(--color-ink)] sm:hidden"
        style={{ maxWidth: 352 }}
      >
        <p
          className="px-4 pt-4 uppercase text-[var(--color-canvas)]"
          style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Allow A.I. to access your camera
        </p>

        <div
          className="flex items-center justify-end gap-0"
          style={{ marginTop: 24, height: 36, borderTop: "1px solid var(--color-canvas)" }}
        >
          <button
            type="button"
            onClick={onDeny}
            className="h-full px-4 text-sm font-semibold uppercase text-[var(--color-canvas)]/70"
            style={{ letterSpacing: "-0.02em" }}
          >
            Deny
          </button>
          <button
            type="button"
            onClick={onAllow}
            className="h-full px-4 text-sm font-semibold uppercase text-[var(--color-canvas)]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Allow
          </button>
        </div>
      </div>

      {/* Desktop (sm and up): original icon-anchored layout, unchanged */}
      <div
        className="absolute hidden bg-[var(--color-ink)] sm:block"
        style={{ top: -39, left: 112, width: 352, height: 136 }}
      >
        <p
          className="px-4 pt-4 uppercase text-[var(--color-canvas)]"
          style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          Allow A.I. to access your camera
        </p>

        <div
          className="absolute inset-x-0 flex items-center justify-end gap-0"
          style={{ top: 100, height: 36, borderTop: "1px solid var(--color-canvas)" }}
        >
          <button
            type="button"
            onClick={onDeny}
            className="h-full px-4 text-sm font-semibold uppercase text-[var(--color-canvas)]/70"
            style={{ letterSpacing: "-0.02em" }}
          >
            Deny
          </button>
          <button
            type="button"
            onClick={onAllow}
            className="h-full px-4 text-sm font-semibold uppercase text-[var(--color-canvas)]"
            style={{ letterSpacing: "-0.02em" }}
          >
            Allow
          </button>
        </div>
      </div>
    </>
  );
}
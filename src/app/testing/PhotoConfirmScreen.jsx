import SiteHeader from "@/components/SiteHeader";
import DiamondNavLink from "@/components/DiamondNavLink";

function TipBullet({ filled = false }) {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 rotate-45 border border-[var(--color-canvas)]"
      style={{ background: filled ? "var(--color-canvas)" : "transparent" }}
    />
  );
}

const TIPS = [
  { label: "Neutral Expression", filled: true },
  { label: "Frontal Pose", filled: true },
  { label: "Adequate Lighting", filled: false },
];

export default function PhotoConfirmScreen({ capturedImage, onBack, onProceed }) {
  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "rgba(205, 206, 204, 1)" }}
    >
      {capturedImage && (
        <img
          src={capturedImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}

      <SiteHeader crumb="ANALYSIS" light />

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center uppercase text-[var(--color-canvas)]"
        style={{
          top: "26.4583%",
          fontSize: "var(--text-caption-1920)",
          lineHeight: "var(--text-caption-1920--line-height)",
        }}
      >
        Great shot!
      </p>

      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ bottom: 42 }}
      >
        <p
          className="mb-2 uppercase text-[var(--color-canvas)]"
          style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
        >
          To get better results make sure to have
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {TIPS.map(({ label, filled }) => (
            <span
              key={label}
              className="flex items-center gap-1.5 uppercase text-[var(--color-canvas)]"
              style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
            >
              <TipBullet filled={filled} />
              {label}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} light textOpacity={1} />
        <DiamondNavLink label="PROCEED" direction="right" href="#" onClick={onProceed} light textOpacity={1} />
      </div>
    </main>
  );
}
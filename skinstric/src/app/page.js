import DiamondBackdrop from "@/components/DiamondBackdrop";
import DiamondNavLink from "@/components/DiamondNavLink";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="INTRO" showEnterCode />

      <DiamondBackdrop />

      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-8 md:px-10">
        <DiamondNavLink label="DISCOVER A.I." direction="left" href="#discover" />
        <DiamondNavLink label="TAKE TEST" direction="right" href="/testing" />
      </div>

      <h1
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[90vw] max-w-[680px] -translate-x-1/2 -translate-y-1/2 text-center font-light text-[var(--color-ink)]"
        style={{
          fontSize: "clamp(2.5rem, 8vw, var(--text-h1-1920))",
          lineHeight: "var(--text-h1-1920--line-height)",
          letterSpacing: "var(--text-h1-1920--letter-spacing)",
        }}
      >
        Sophisticated skincare
      </h1>

      <p
        className="absolute bottom-8 left-8 z-10 max-w-[316px] uppercase text-[var(--color-ink)] md:bottom-10 md:left-10"
        style={{
          fontSize: "var(--text-caption-1920)",
          lineHeight: "var(--text-caption-1920--line-height)",
          letterSpacing: "var(--text-caption-1920--letter-spacing)",
        }}
      >
        Skinstric developed an A.I. that creates a highly-personalised
        routine tailored to what your skin needs.
      </p>
    </main>
  );
}
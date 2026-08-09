import SiteHeader from "@/components/SiteHeader";
import DiamondNavLink from "@/components/DiamondNavLink";
import NestedDiamonds from "@/components/NestedDiamonds";
import AnalysisQuadrants from "@/components/AnalysisQuadrants";

export default function AnalysisScreen({ onBack, onSelectQuadrant, onGetSummary }) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="ANALYSIS" />

      <div className="absolute left-8 top-[86px] max-w-[336px] md:left-10">
        <p
          className="uppercase text-[var(--color-ink)]"
          style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          A. I. Analysis
        </p>
        <p
          className="mt-2 uppercase text-[var(--color-ink)]"
          style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400 }}
        >
          A. I. has estimated the following.
          <br />
          Fix estimated information if needed.
        </p>
      </div>

      <NestedDiamonds />
      <AnalysisQuadrants onSelect={onSelectQuadrant} />

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
        <DiamondNavLink label="GET SUMMARY" direction="right" href="#" onClick={onGetSummary} />
      </div>
    </main>
  );
}
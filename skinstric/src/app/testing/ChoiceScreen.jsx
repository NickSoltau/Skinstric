import ChoiceOption from "@/components/ChoiceOption";
import DiamondNavLink from "@/components/DiamondNavLink";
import SiteHeader from "@/components/SiteHeader";

export default function ChoiceScreen({ onBack }) {
  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="INTRO" />

      <p
        className="absolute left-8 top-[86px] uppercase text-[var(--color-ink)] md:left-10"
        style={{
          fontSize: "var(--text-eyebrow-1920)",
          lineHeight: "var(--text-eyebrow-1920--line-height)",
          letterSpacing: "var(--text-eyebrow-1920--letter-spacing)",
          fontWeight: 600,
        }}
      >
        TO START ANALYSIS
      </p>

      <ChoiceOption
        variant="camera"
        href="#"
        centerXPercent={25}
        label={["ALLOW A.I.", "TO SCAN YOUR FACE"]}
        labelAlign="left"
        labelWidth={167}
        labelOffset={{ top: -115, left: 112 }}
        dotOffset={{ top: -95.5, left: 103.5 }}
      />

      <ChoiceOption
        variant="gallery"
        href="#"
        centerXPercent={75}
        label={["ALLOW A.I.", "ACCESS GALLERY"]}
        labelAlign="right"
        labelWidth={136}
        labelOffset={{ top: 85, left: -247 }}
        dotOffset={{ top: 99, left: -103 }}
      />

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
      </div>
    </main>
  );
}
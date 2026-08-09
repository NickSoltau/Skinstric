"use client";

import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import DiamondNavLink from "@/components/DiamondNavLink";
import CategorySidebar from "@/components/CategorySidebar";
import ConfidenceRing from "@/components/ConfidenceRing";
import OptionsList from "@/components/OptionsList";

const RACE_OPTIONS = [
  { key: "east-asian", label: "East Asian", percent: 96 },
  { key: "white", label: "White", percent: 6 },
  { key: "black", label: "Black", percent: 3 },
  { key: "south-asian", label: "South Asian", percent: 2 },
  { key: "latino-hispanic", label: "Latino Hispanic", percent: 0 },
  { key: "south-east-asian", label: "South East Asian", percent: 0 },
  { key: "middle-eastern", label: "Middle Eastern", percent: 0 },
];

export default function DemographicsScreen({ onBack, onReset, onConfirm }) {
  const [activeCategory, setActiveCategory] = useState("race");
  const [selectedRace, setSelectedRace] = useState("east-asian");

  const sidebarCategories = [
    { key: "race", value: RACE_OPTIONS.find((o) => o.key === selectedRace)?.label ?? "", label: "Race" },
    { key: "age", value: "20-29", label: "Age" },
    { key: "sex", value: "Female", label: "Sex" },
  ];

  const currentPercent =
    RACE_OPTIONS.find((o) => o.key === selectedRace)?.percent ?? 0;
  const currentLabel =
    RACE_OPTIONS.find((o) => o.key === selectedRace)?.label ?? "";

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="ANALYSIS" />

      <div className="absolute left-8 top-[86px] md:left-10">
        <p
          className="uppercase text-[var(--color-ink)]"
          style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          A. I. Analysis
        </p>
        <p
          className="uppercase text-[var(--color-ink)]"
          style={{ fontSize: 72, lineHeight: "64px", fontWeight: 400, letterSpacing: "-0.06em", marginTop: 16 }}
        >
          Demographics
        </p>
        <p
          className="uppercase text-[var(--color-ink)]"
          style={{ fontSize: 14, lineHeight: "24px", fontWeight: 400, marginTop: 12 }}
        >
          Predicted Race &amp; Age
        </p>
      </div>

      <CategorySidebar
        categories={sidebarCategories}
        activeKey={activeCategory}
        onSelect={setActiveCategory}
      />

      <div
        className="absolute border-t border-[var(--color-ink)]"
        style={{
          left: "13.333%",
          top: "31.667%",
          width: "60.833%",
          height: "56.667%",
          background: "rgba(243, 243, 244, 1)",
        }}
      >
        <p
          className="absolute text-[var(--color-ink)]"
          style={{
            top: 20,
            left: 15,
            fontSize: 40,
            lineHeight: "40px",
            letterSpacing: "-0.05em",
          }}
        >
          {currentLabel}
        </p>
        <div className="absolute" style={{ left: "66%", top: "22%" }}>
          <ConfidenceRing percent={currentPercent} />
        </div>
      </div>

      {activeCategory === "race" && (
        <OptionsList
          heading="Race"
          options={RACE_OPTIONS}
          selectedKey={selectedRace}
          onSelect={setSelectedRace}
        />
      )}

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center text-[rgba(160,164,171,1)]"
        style={{ bottom: 42, fontSize: 16, lineHeight: "24px", letterSpacing: "-0.02em" }}
      >
        If A.I. estimate is wrong, select the correct one.
      </p>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
        <div className="flex items-center gap-4">
        <button
        type="button"
        onClick={onReset}
        className="border border-[var(--color-ink)] bg-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink)] transition-opacity hover:opacity-70"
        >
        Reset
        </button>
          <button
            type="button"
            onClick={onConfirm}
            className="bg-[var(--color-ink)] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-canvas)] transition-opacity hover:opacity-80"
          >
            Confirm
          </button>
        </div>
      </div>
    </main>
  );
}
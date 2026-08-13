"use client";

import { useMemo, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import DiamondNavLink from "@/components/DiamondNavLink";
import CategorySidebar from "@/components/CategorySidebar";
import ConfidenceRing from "@/components/ConfidenceRing";
import OptionsList from "@/components/OptionsList";
import { transformRace, transformAge, transformSex, topKey } from "@/lib/demographics";

export default function DemographicsScreen({ data, onBack, onConfirm }) {
  const raceOptions = useMemo(() => transformRace(data?.race), [data]);
  const ageOptions = useMemo(() => transformAge(data?.age), [data]);
  const sexOptions = useMemo(() => transformSex(data?.gender), [data]);

  const defaults = useMemo(
    () => ({
      race: topKey(raceOptions),
      age: topKey(ageOptions),
      sex: topKey(sexOptions),
    }),
    [raceOptions, ageOptions, sexOptions]
  );

  const [activeCategory, setActiveCategory] = useState("race");
  const [selectedRace, setSelectedRace] = useState(defaults.race);
  const [selectedAge, setSelectedAge] = useState(defaults.age);
  const [selectedSex, setSelectedSex] = useState(defaults.sex);

  const CATEGORIES = {
    race: { heading: "Race", options: raceOptions },
    age: { heading: "Age", options: ageOptions },
    sex: { heading: "Sex", options: sexOptions },
  };

  const selections = { race: selectedRace, age: selectedAge, sex: selectedSex };
  const setters = { race: setSelectedRace, age: setSelectedAge, sex: setSelectedSex };

  const findOption = (categoryKey) =>
    CATEGORIES[categoryKey].options.find((o) => o.key === selections[categoryKey]);

  const sidebarCategories = [
    { key: "race", value: findOption("race")?.label ?? "", label: "Race" },
    { key: "age", value: findOption("age")?.label ?? "", label: "Age" },
    { key: "sex", value: findOption("sex")?.label ?? "", label: "Sex" },
  ];

  const activeOption = findOption(activeCategory);
  const currentPercent = activeOption?.percent ?? 0;
  const currentHeadline =
    activeCategory === "age"
      ? `${activeOption?.label ?? ""} y.o.`
      : activeOption?.label ?? "";

  const handleReset = () => {
    setSelectedRace(defaults.race);
    setSelectedAge(defaults.age);
    setSelectedSex(defaults.sex);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="ANALYSIS" />

      <div className="flex min-h-screen flex-col gap-6 px-6 pb-32 pt-24 md:contents">
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
          {currentHeadline}
        </p>
        <div className="absolute" style={{ left: "66%", top: "22%" }}>
          <ConfidenceRing percent={currentPercent} />
        </div>
      </div>

      <OptionsList
        heading={CATEGORIES[activeCategory].heading}
        options={CATEGORIES[activeCategory].options}
        selectedKey={selections[activeCategory]}
        onSelect={setters[activeCategory]}
      />

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center text-[rgba(160,164,171,1)]"
        style={{ bottom: 42, fontSize: 16, lineHeight: "24px", letterSpacing: "-0.02em" }}
      >
        If A.I. estimate is wrong, select the correct one.
      </p>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={handleReset}
            className="border border-[var(--color-ink)] bg-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink)] transition-opacity hover:opacity-70"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={() => onConfirm?.(selections)}
            className="bg-[var(--color-ink)] px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-canvas)] transition-opacity hover:opacity-80"
          >
            Confirm
          </button>
        </div>
      </div>
    </main>
  );
}
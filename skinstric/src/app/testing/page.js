"use client";

import { useState } from "react";
import DiamondBackdrop from "@/components/DiamondBackdrop";
import DiamondNavLink from "@/components/DiamondNavLink";
import SiteHeader from "@/components/SiteHeader";

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState(null);

  const headlineShift =
    hoveredSide === "left"
      ? "calc(-50% + 25vw)"
      : hoveredSide === "right"
      ? "calc(-50% - 25vw)"
      : "-50%";
  const headlineAlign =
    hoveredSide === "left" ? "right" : hoveredSide === "right" ? "left" : "center";

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="INTRO" showEnterCode />

      <DiamondBackdrop hideSide={hoveredSide === "left" ? "right" : hoveredSide === "right" ? "left" : null} />

      <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-8 md:px-10">
        <DiamondNavLink
          label="DISCOVER A.I."
          direction="left"
          href="#discover"
          emphasized={hoveredSide === "left"}
          hidden={hoveredSide === "right"}
          onMouseEnter={() => setHoveredSide("left")}
          onMouseLeave={() => setHoveredSide(null)}
        />
        <DiamondNavLink
          label="TAKE TEST"
          direction="right"
          href="/testing"
          emphasized={hoveredSide === "right"}
          hidden={hoveredSide === "left"}
          onMouseEnter={() => setHoveredSide("right")}
          onMouseLeave={() => setHoveredSide(null)}
        />
      </div>

      <h1
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 w-[90vw] max-w-[680px] font-light text-[var(--color-ink)] transition-transform duration-700 ease-in-out"
        style={{
          fontSize: "clamp(2.5rem, 8vw, var(--text-h1-1920))",
          lineHeight: "var(--text-h1-1920--line-height)",
          letterSpacing: "var(--text-h1-1920--letter-spacing)",
          transform: `translateX(${headlineShift}) translateY(-50%)`,
          textAlign: headlineAlign,
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
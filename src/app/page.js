"use client";

import { useLayoutEffect, useRef, useState } from "react";
import DiamondBackdrop from "@/components/DiamondBackdrop";
import DiamondNavLink from "@/components/DiamondNavLink";
import SiteHeader from "@/components/SiteHeader";

const EDGE_INSET_PX = 32;
const DURATION_MS = 700;

function AnimatedHeadline({ align }) {
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const [layout, setLayout] = useState({ line1: 0, line2: 0, containerLeft: 0 });

  useLayoutEffect(() => {
    function measure() {
      const w1 = line1Ref.current?.getBoundingClientRect().width ?? 0;
      const w2 = line2Ref.current?.getBoundingClientRect().width ?? 0;
      const blockWidth = Math.max(w1, w2);
      const viewportWidth = window.innerWidth;

      function lineOffset(lineWidth) {
        if (align === "left") return 0;
        if (align === "right") return blockWidth - lineWidth;
        return (blockWidth - lineWidth) / 2;
      }

      let containerLeft;
      if (align === "left") {
        containerLeft = EDGE_INSET_PX;
      } else if (align === "right") {
        containerLeft = viewportWidth - EDGE_INSET_PX - blockWidth;
      } else {
        containerLeft = (viewportWidth - blockWidth) / 2;
      }

      setLayout({ line1: lineOffset(w1), line2: lineOffset(w2), containerLeft });
    }

    measure();
    window.addEventListener("resize", measure);

    // Re-measure once webfonts finish loading, in case fallback-font
    // widths differ from the real font (relevant once Roobert TRIAL
    // is licensed in).
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure);
    }

    return () => window.removeEventListener("resize", measure);
  }, [align]);

  return (
    <h1
      className="pointer-events-none absolute top-1/2 z-10 w-max font-light text-[var(--color-ink)]"
      style={{
        fontSize: "clamp(2.5rem, 8vw, var(--text-h1-1920))",
        lineHeight: "var(--text-h1-1920--line-height)",
        letterSpacing: "var(--text-h1-1920--letter-spacing)",
        left: `${layout.containerLeft}px`,
        transform: "translateY(-50%)",
        transition: `left ${DURATION_MS}ms ease-in-out`,
      }}
    >
      <span
        ref={line1Ref}
        style={{
          display: "block",
          width: "max-content",
          whiteSpace: "nowrap",
          transform: `translateX(${layout.line1}px)`,
          transition: `transform ${DURATION_MS}ms ease-in-out`,
        }}
      >
        Sophisticated
      </span>
      <span
        ref={line2Ref}
        style={{
          display: "block",
          width: "max-content",
          whiteSpace: "nowrap",
          transform: `translateX(${layout.line2}px)`,
          transition: `transform ${DURATION_MS}ms ease-in-out`,
        }}
      >
        skincare
      </span>
    </h1>
  );
}

export default function Home() {
  const [hoveredSide, setHoveredSide] = useState(null);

  const fadedSide =
    hoveredSide === "left" ? "right" : hoveredSide === "right" ? "left" : null;

  const headlineAlign =
    hoveredSide === "left" ? "right" : hoveredSide === "right" ? "left" : "center";

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="INTRO" showEnterCode />

      <div className="flex min-h-screen scale-75 items-center justify-center p-6 sm:scale-100 lg:hidden">
        <div className="relative flex flex-col items-center justify-center text-center">
          <div
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2"
          >
            <svg width="100%" height="100%" viewBox="0 0 594 594">
              <rect
                x={90}
                y={90}
                width={420}
                height={420}
                fill="none"
                stroke="var(--color-diamond-border)"
                strokeWidth={2}
                strokeDasharray="1 5"
                strokeLinecap="round"
                transform="rotate(45 297 297)"
              />
            </svg>
          </div>

          <h1
            className="relative z-10 font-light text-[var(--color-ink)]"
            style={{
              fontSize: "60px",
              lineHeight: "var(--text-h1-1920--line-height)",
              letterSpacing: "var(--text-h1-1920--letter-spacing)",
            }}
          >
            Sophisticated skincare
          </h1>

          <p
            className="relative z-10 mt-4 w-[30ch] text-center uppercase text-[var(--color-ink)]/70"
            style={{ fontSize: 16, fontWeight: 600 }}
          >
            Skinstric developed an A.I. that creates a highly-personalised
            routine tailored to what your skin needs.
          </p>

          
            <a href="/testing"
            className="relative z-10 mt-4 flex items-center gap-4"
          >
            <span className="text-sm font-semibold uppercase" style={{ letterSpacing: "-0.02em" }}>
              Enter Experience
            </span>
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center">
              <span className="absolute inset-0 rotate-45 border border-[var(--color-ink)]" />
              <svg width={9.43} height={10.89} viewBox="0 0 9.43 10.89" fill="var(--color-ink)" className="relative">
                <polygon points="0,0 0,10.89 9.43,5.45" />
              </svg>
            </span>
          </a>
        </div>
      </div>

      <div className="hidden lg:block">
        <DiamondBackdrop fadedSide={fadedSide} />

        <div className="absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between px-8 md:px-10">
          <DiamondNavLink
            label="DISCOVER A.I."
            direction="left"
            href="#discover"
            onMouseEnter={() => setHoveredSide("left")}
            onMouseLeave={() => setHoveredSide(null)}
            fadedOut={fadedSide === "left"}
          />
          <DiamondNavLink
            label="TAKE TEST"
            direction="right"
            href="/testing"
            onMouseEnter={() => setHoveredSide("right")}
            onMouseLeave={() => setHoveredSide(null)}
            fadedOut={fadedSide === "right"}
          />
        </div>

        <AnimatedHeadline align={headlineAlign} />

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
      </div>
    </main>
  );
}
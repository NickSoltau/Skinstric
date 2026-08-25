"use client";

import { useId } from "react";
import DiamondNavLink from "@/components/DiamondNavLink";
import NestedDiamonds from "@/components/NestedDiamonds";
import SiteHeader from "@/components/SiteHeader";

function LoadingDots() {
  return (
    <span className="mt-3 flex items-center justify-center gap-1.5" aria-hidden>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-1.5 w-1.5 rounded-full bg-[var(--color-ink)]/40"
          style={{
            animation: "diamond-step-dot 1.2s ease-in-out infinite",
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}

export default function DiamondStep({
  eyebrow = "TO START ANALYSIS",
  placeholder,
  value,
  onChange,
  onEnter,
  onBack,
  onProceedClick,
  boxWidth = 420,
  phase = "input",
  loadingText = "Processing submission",
  successHeadline = "Thank you!",
  successSubtext = "Proceed for the next step",
}) {
  const inputId = useId();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      onEnter?.();
    }
  };

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
        {eyebrow}
      </p>

      <NestedDiamonds />

      <div
        className="absolute left-1/2 top-1/2 z-10 w-[90vw] -translate-x-1/2 -translate-y-1/2 text-center"
        style={{ maxWidth: boxWidth }}
      >
        {phase === "input" && (
          <>
            <label
              htmlFor={inputId}
              className="mb-2 block uppercase"
              style={{
                fontSize: "var(--text-caption-1920)",
                lineHeight: "var(--text-caption-1920--line-height)",
                color: "var(--color-ink)",
                opacity: 0.4,
              }}
            >
              Click to type
            </label>
            <input
              id={inputId}
              type="text"
              value={value}
              onChange={(event) => onChange(event.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              autoComplete="off"
              className="diamond-step-input w-full border-0 border-b bg-transparent text-center font-normal outline-none focus-visible:outline-none"
              style={{
                fontSize: "clamp(2rem, 6vw, var(--text-h3-1920))",
                lineHeight: "var(--text-h3-1920--line-height)",
                letterSpacing: "var(--text-h3-1920--letter-spacing)",
                color: "var(--color-ink)",
                borderColor: "var(--color-ink)",
                paddingBottom: 8,
              }}
            />
          </>
        )}

        {phase === "loading" && (
          <div>
            <p
              className="uppercase"
              style={{
                fontSize: "var(--text-caption-1920)",
                lineHeight: "var(--text-caption-1920--line-height)",
                color: "var(--color-ink)",
                opacity: 0.6,
              }}
            >
              {loadingText}
            </p>
            <LoadingDots />
          </div>
        )}

        {phase === "success" && (
          <div>
            <p
              className="font-normal text-[var(--color-ink)]"
              style={{
                fontSize: "clamp(1.5rem, 4vw, 32px)",
                lineHeight: 1.2,
              }}
            >
              {successHeadline}
            </p>
            <p
              className="mt-2 text-[var(--color-ink)]/60"
              style={{ fontSize: "var(--text-caption-1920)" }}
            >
              {successSubtext}
            </p>
          </div>
        )}
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
        {phase === "success" ? (
          <DiamondNavLink label="PROCEED" direction="right" href="#" onClick={onProceedClick} />
        ) : (
          <span />
        )}
      </div>
    </main>
  );
}
"use client";

import { useEffect } from "react";
import { ApertureIcon } from "@/components/ChoiceIcons";
import CameraSetupDiamonds from "@/components/CameraSetupDiamonds";

function TipBullet() {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 rotate-45 border border-[var(--color-ink)]"
    />
  );
}

export default function CameraSetupScreen({ onReady }) {
  useEffect(() => {
    const timer = setTimeout(() => onReady?.(), 1500);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CameraSetupDiamonds />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span
          className="relative flex items-center justify-center rounded-full border border-[var(--color-ink)]"
          style={{ width: 130.29, height: 130.29 }}
        >
          <span
            className="flex items-center justify-center rounded-full bg-[var(--color-ink)]"
            style={{ width: 114, height: 114 }}
          >
            <ApertureIcon className="h-20 w-20" />
          </span>
        </span>
      </div>

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center uppercase text-[var(--color-ink)]"
        style={{
          top: "calc(50% + 85px)",
          fontSize: 16,
          lineHeight: "24px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        Setting up camera ...
      </p>

      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ top: "calc(50% + 245px)" }}
      >
        <p
          className="mb-2 uppercase text-[var(--color-ink)]"
          style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
        >
          To get better results make sure to have
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {["Neutral Expression", "Frontal Pose", "Adequate Lighting"].map((tip) => (
            <span
              key={tip}
              className="flex items-center gap-1.5 uppercase text-[var(--color-ink)]"
              style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
            >
              <TipBullet />
              {tip}
            </span>
          ))}
        </div>
      </div>
    </main>
  );
}
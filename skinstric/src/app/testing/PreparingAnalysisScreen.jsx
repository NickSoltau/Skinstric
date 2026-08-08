"use client";

import { useEffect } from "react";
import CameraSetupDiamonds from "@/components/CameraSetupDiamonds";

export default function PreparingAnalysisScreen({ onReady }) {
  useEffect(() => {
    const timer = setTimeout(() => onReady?.(), 1500);
    return () => clearTimeout(timer);
  }, [onReady]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CameraSetupDiamonds />

      <p
        className="absolute left-1/2 -translate-x-1/2 text-center uppercase text-[var(--color-ink)]"
        style={{
          top: "calc(50% - 13px)",
          fontSize: 16,
          lineHeight: "24px",
          fontWeight: 600,
          letterSpacing: "-0.02em",
        }}
      >
        Preparing your analysis ...
      </p>
    </main>
  );
}
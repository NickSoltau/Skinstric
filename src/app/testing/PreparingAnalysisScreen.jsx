"use client";

import { useEffect, useState } from "react";
import CameraSetupDiamonds from "@/components/CameraSetupDiamonds";

const PHASE_TWO_ENDPOINT =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

export default function PreparingAnalysisScreen({ capturedImage, onReady }) {
  const [error, setError] = useState(() =>
    capturedImage ? null : "No photo was captured."
  );
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    if (!capturedImage) return;

    let cancelled = false;

    async function run() {
      try {
        const base64 = capturedImage.split(",")[1] ?? capturedImage;
        const response = await fetch(PHASE_TWO_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const json = await response.json();
        console.log("Phase 2 API response:", json);
        if (!cancelled) onReady?.(json.data);
      } catch (err) {
        console.error("Phase 2 API request failed:", err);
        if (!cancelled) setError("Something went wrong preparing your analysis.");
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [capturedImage, onReady, attempt]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <CameraSetupDiamonds />

      {error ? (
        <div className="absolute left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 text-center">
          <p
            className="uppercase text-[var(--color-ink)]"
            style={{ fontSize: 16, lineHeight: "24px", fontWeight: 600, letterSpacing: "-0.02em" }}
          >
            {error}
          </p>
          <button
            type="button"
            onClick={() => {
              setError(null);
              setAttempt((n) => n + 1);
            }}
            className="mt-4 border border-[var(--color-ink)] bg-transparent px-4 py-2 text-[11px] font-semibold uppercase tracking-wide text-[var(--color-ink)] transition-opacity hover:opacity-70"
          >
            Try Again
          </button>
        </div>
      ) : (
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
      )}
    </main>
  );
}

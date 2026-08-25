"use client";

import { useEffect, useRef, useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import DiamondNavLink from "@/components/DiamondNavLink";
import TakePictureButton from "@/components/TakePictureButton";

function TipBullet() {
  return (
    <span
      aria-hidden
      className="inline-block h-2 w-2 rotate-45 border border-[var(--color-canvas)]"
    />
  );
}

export default function CameraCaptureScreen({ onBack, onTakePicture }) {
  const videoRef = useRef(null);
  const [status, setStatus] = useState("loading"); // "loading" | "ready" | "error"

  useEffect(() => {
    let stream;
    let cancelled = false;

    async function start() {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setStatus("ready");
      } catch (error) {
        console.error("Camera access failed:", error);
        setStatus("error");
      }
    }

    start();

    return () => {
      cancelled = true;
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const handleTakePicture = () => {
    const video = videoRef.current;
    if (!video || status !== "ready") return;

    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width, 0);
    ctx.scale(-1, 1);
    ctx.drawImage(video, 0, 0);

    const dataUrl = canvas.toDataURL("image/png");
    onTakePicture?.(dataUrl);
  };

  return (
    <main
      className="relative min-h-screen w-full overflow-hidden"
      style={{ background: "rgba(205, 206, 204, 1)" }}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
        style={{ transform: "scaleX(-1)", opacity: status === "ready" ? 1 : 0 }}
      />

      {status === "error" && (
        <p
          className="absolute left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 text-center uppercase text-[var(--color-canvas)]"
          style={{ fontSize: "var(--text-caption-1920)" }}
        >
          Couldn&apos;t access the camera. Check your browser permissions and try again.
        </p>
      )}

      <SiteHeader crumb="INTRO" light />

      <TakePictureButton onClick={handleTakePicture} />

      <div
        className="absolute left-1/2 -translate-x-1/2 text-center"
        style={{ bottom: 42 }}
      >
        <p
          className="mb-2 uppercase text-[var(--color-canvas)]"
          style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
        >
          To get better results make sure to have
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8">
          {["Neutral Expression", "Frontal Pose", "Adequate Lighting"].map((tip) => (
            <span
              key={tip}
              className="flex items-center gap-1.5 uppercase text-[var(--color-canvas)]"
              style={{ fontSize: "var(--text-caption-1920)", lineHeight: "var(--text-caption-1920--line-height)" }}
            >
              <TipBullet />
              {tip}
            </span>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink
          label="BACK"
          direction="left"
          href="/"
          onClick={onBack}
          light
          textOpacity={1}
        />
      </div>
    </main>
  );
}
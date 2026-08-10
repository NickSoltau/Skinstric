"use client";

import { useRef, useState } from "react";
import CameraPermissionDialog from "@/components/CameraPermissionDialog";
import ChoiceOption from "@/components/ChoiceOption";
import DiamondNavLink from "@/components/DiamondNavLink";
import SiteHeader from "@/components/SiteHeader";

export default function ChoiceScreen({ onBack, onCameraAllowed, onGallerySelected }) {
  const [cameraDialogOpen, setCameraDialogOpen] = useState(false);
  const fileInputRef = useRef(null);

  const handleCameraClick = () => setCameraDialogOpen(true);
  const handleDeny = () => setCameraDialogOpen(false);
  const handleAllow = () => {
    setCameraDialogOpen(false);
    onCameraAllowed?.();
  };

  const handleGalleryClick = () => fileInputRef.current?.click();

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => onGallerySelected?.(reader.result);
    reader.onerror = () => console.error("Failed to read selected image");
    reader.readAsDataURL(file);
  };

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      <SiteHeader crumb="INTRO" />

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

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
        onClick={cameraDialogOpen ? undefined : handleCameraClick}
        centerXPercent={25}
        label={["ALLOW A.I.", "TO SCAN YOUR FACE"]}
        labelAlign="left"
        labelWidth={167}
        labelOffset={{ top: -115, left: 112 }}
        dotOffset={{ top: -95.5, left: 103.5 }}
        ringSize={cameraDialogOpen ? 130.29 : 116.57}
        circleSize={cameraDialogOpen ? 114 : 102}
        overlay={
          cameraDialogOpen ? (
            <CameraPermissionDialog onDeny={handleDeny} onAllow={handleAllow} />
          ) : null
        }
      />

      <ChoiceOption
        variant="gallery"
        onClick={handleGalleryClick}
        centerXPercent={75}
        label={["ALLOW A.I.", "ACCESS GALLERY"]}
        labelAlign="right"
        labelWidth={136}
        labelOffset={{ top: 85, left: -247 }}
        dotOffset={{ top: 99, left: -103 }}
        muted={cameraDialogOpen}
      />

      <div className="absolute inset-x-0 bottom-8 z-10 flex items-center justify-between px-8 md:bottom-10 md:px-10">
        <DiamondNavLink label="BACK" direction="left" href="/" onClick={onBack} />
      </div>
    </main>
  );
}
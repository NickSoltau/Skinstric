"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DiamondStep from "@/components/DiamondStep";
import ChoiceScreen from "./ChoiceScreen";
import CameraSetupScreen from "./CameraSetupScreen";
import CameraCaptureScreen from "./CameraCaptureScreen"
import PhotoConfirmScreen from "./PhotoConfirmScreen";
import PreparingAnalysisScreen from "./PreparingAnalysisScreen";
import AnalysisScreen from "./AnalysisScreen";
import DemographicsScreen from "./DemographicsScreen";


const TEXT_PATTERN = /^[A-Za-z][A-Za-z\s'-]*$/;

const PHASE_ONE_ENDPOINT =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne";

const NAME_KEY = "skinstric_name";
const LOCATION_KEY = "skinstric_location";

function readSaved(key) {
  if (typeof window === "undefined") return "";
  return window.localStorage.getItem(key) ?? "";
}

export default function TestingPage() {
  const router = useRouter();
  const [step, setStep] = useState("name"); // "name" | "location" | "choice" | "camera-setup" | "camera-capture" | "photo-confirm"  | "preparing-analysis" | "preparing-analysis" | "analysis" | "analysis" | "demographics"
  const [name, setName] = useState(() => readSaved(NAME_KEY));
  const [location, setLocation] = useState(() => readSaved(LOCATION_KEY));
  const [locationPhase, setLocationPhase] = useState("input");
  const [capturedImage, setCapturedImage] = useState(null);

  const trimmedName = name.trim();
  const trimmedLocation = location.trim();
  const isNameValid = TEXT_PATTERN.test(trimmedName);
  const isLocationValid = TEXT_PATTERN.test(trimmedLocation);

  const handleBack = () => {
    window.localStorage.removeItem(NAME_KEY);
    window.localStorage.removeItem(LOCATION_KEY);
    router.push("/");
  };

  const handleNameEnter = () => {
    if (!isNameValid) return;
    window.localStorage.setItem(NAME_KEY, trimmedName);
    setStep("location");
  };

  const handleLocationChange = (next) => {
    setLocation(next);
    if (locationPhase !== "input") setLocationPhase("input");
  };

  const handleLocationEnter = async () => {
    if (!isLocationValid || locationPhase !== "input") return;
    window.localStorage.setItem(LOCATION_KEY, trimmedLocation);
    setLocationPhase("loading");

    try {
      const response = await fetch(PHASE_ONE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: trimmedName, location: trimmedLocation }),
      });
      const data = await response.json();
      console.log("Phase 1 API response:", data);
      setLocationPhase("success");
    } catch (error) {
      console.error("Phase 1 API request failed:", error);
      setLocationPhase("input");
    }
  };

  const handleProceedClick = () => {
    setStep("choice");
  };

if (step === "demographics") {
    return (
      <DemographicsScreen
        onBack={handleBack}
        onReset={() => console.log("Reset demographics selections")}
        onConfirm={() => console.log("Confirm demographics (next screen not built yet)")}
      />
    );
  }

  if (step === "analysis") {
    return (
      <AnalysisScreen
        onBack={handleBack}
        onSelectQuadrant={(key) => {
          if (key === "demographics") {
            setStep("demographics");
            return;
          }
          console.log("Selected quadrant:", key, "(detail screen not built yet)");
        }}
        onGetSummary={() => {
          console.log("Get summary (final summary screen not built yet)");
        }}
      />
    );
  }

  if (step === "preparing-analysis") {
    return (
      <PreparingAnalysisScreen onReady={() => setStep("analysis")} />
    );
  }

  if (step === "photo-confirm") {
    return (
      <PhotoConfirmScreen
        capturedImage={capturedImage}
        onBack={handleBack}
        onProceed={() => setStep("preparing-analysis")}
      />
    );
  }

  if (step === "camera-capture") {
      return (
        <CameraCaptureScreen
          onBack={handleBack}
          onTakePicture={(dataUrl) => {
            setCapturedImage(dataUrl);
            setStep("photo-confirm");
          }}
        />
      );
    }

  if (step === "camera-setup") {
    return <CameraSetupScreen onReady={() => setStep("camera-capture")} />;
  }

    if (step === "choice") {
      return (
        <ChoiceScreen
          onBack={handleBack}
          onCameraAllowed={() => setStep("camera-setup")}
        />
      );
    }

  if (step === "location") {
    return (
      <DiamondStep
        placeholder="Where are you from?"
        value={location}
        onChange={handleLocationChange}
        onEnter={handleLocationEnter}
        boxWidth={488}
        phase={locationPhase}
        onProceedClick={handleProceedClick}
        onBack={handleBack}
      />
    );
  }

  return (
    <DiamondStep
      placeholder="Introduce Yourself"
      value={name}
      onChange={setName}
      onEnter={handleNameEnter}
      boxWidth={420}
      phase="input"
      onBack={handleBack}
    />
  );
}
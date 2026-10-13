# Skinstric

An AI-powered skincare analysis app built from Figma designs during a virtual frontend internship. A visitor takes or uploads a photo and gets back demographic estimates with confidence scores.

**Live demo:** https://skinstric-phi-olive.vercel.app

## Try it

1. Open the demo and choose **Enter Experience**.
2. Enter a name and location.
3. Take a photo with your camera or upload one.
4. Wait for the analysis, then browse the results by category. Each result shows a confidence ring.

## What it does

- Multi-step flow: intro, camera or upload, photo confirmation, analysis, results
- Camera access with a permission dialog and a setup screen
- Calls the Skinstric analysis API and shows the results with animated confidence rings
- Animated diamond-shaped transitions and hover effects
- Responsive layout built from the Figma designs

## Tech stack

Next.js (App Router), React, Tailwind CSS v4, and React Icons. State is local React state. Data comes from the Skinstric API using `fetch`.

## My part

This was a program-provided virtual internship. I rebuilt the landing page hover interactions and micro-animations, and improved the responsive layout across multiple screens to match the Figma specs and an existing reference build. I used Claude Code alongside hand-written CSS and JavaScript.

## Run it locally

```bash
git clone https://github.com/NickSoltau/Skinstric.git
cd Skinstric
npm install
npm run dev
```

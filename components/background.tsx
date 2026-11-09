"use client";

import dynamic from "next/dynamic";

// Canvas is client-only and non-critical: load it after the page is interactive.
const AmbientCanvas = dynamic(() => import("./ambient-canvas"), { ssr: false });

export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="grid-bg absolute inset-0" />
      <div className="absolute -top-48 left-1/2 h-[460px] w-[880px] -translate-x-1/2 rounded-full bg-cyber/10 blur-[130px]" />
      <AmbientCanvas />
    </div>
  );
}

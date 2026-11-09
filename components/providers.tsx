"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { PaletteProvider } from "./palette-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <PaletteProvider>{children}</PaletteProvider>
    </MotionConfig>
  );
}

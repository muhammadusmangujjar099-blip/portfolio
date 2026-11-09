"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Obsidian card whose glow follows the cursor. Position is written straight to CSS variables (no re-render). */
export function GlowCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <div ref={ref} onPointerMove={onMove} className={cn("glow-card", className)}>
      {children}
    </div>
  );
}

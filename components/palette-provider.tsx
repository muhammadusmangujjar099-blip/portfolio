"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { CommandPalette } from "./command-palette";

type Ctx = { open: boolean; setOpen: (v: boolean) => void; toggle: () => void };
const PaletteContext = createContext<Ctx | null>(null);

export function usePalette() {
  const ctx = useContext(PaletteContext);
  if (!ctx) throw new Error("usePalette must be used inside <PaletteProvider>");
  return ctx;
}

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  const value = useMemo(() => ({ open, setOpen, toggle }), [open, toggle]);

  return (
    <PaletteContext.Provider value={value}>
      {children}
      <CommandPalette open={open} onClose={() => setOpen(false)} />
    </PaletteContext.Provider>
  );
}

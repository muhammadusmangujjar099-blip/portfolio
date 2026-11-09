import { cn } from "@/lib/utils";

/** Window chrome for terminal-like panels: the path tells you which "process" you are looking at. */
export function PanelBar({ path, right, className }: { path: string; right?: string; className?: string }) {
  return (
    <div className={cn("flex items-center justify-between gap-3 border-b border-line px-4 py-2.5", className)}>
      <div className="flex items-center gap-1.5" aria-hidden="true">
        <span className="h-2.5 w-2.5 rounded-full bg-mist/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-mist/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-cyber/70" />
      </div>
      <span className="truncate font-mono text-xs text-mist">{path}</span>
      <span className="hidden font-mono text-xs text-mist/70 sm:inline">{right}</span>
    </div>
  );
}

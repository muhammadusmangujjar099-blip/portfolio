import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

export function StatusPill({ compact, className }: { compact?: boolean; className?: string }) {
  return (
    <span
      role="status"
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 font-mono text-xs text-emerald-300",
        className
      )}
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>
      {compact ? "Available" : site.status}
    </span>
  );
}

"use client";

import { FormEvent, KeyboardEvent, useCallback, useEffect, useRef, useState } from "react";
import { BOOT_LINES, QUICK_COMMANDS, runCommand, type TermLine } from "@/lib/terminal";
import type { SectionId } from "@/lib/site";
import { cn } from "@/lib/utils";
import { PanelBar } from "./ui/panel-bar";

type Row = TermLine & { key: number; delay: number };

const KIND_STYLE: Record<TermLine["kind"], string> = {
  out: "text-ink/90",
  accent: "text-cyber",
  muted: "text-mist",
  error: "text-rose-300",
  cmd: "text-ink",
};

export function Terminal({ onNavigate }: { onNavigate: (id: SectionId) => void }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [value, setValue] = useState("");
  const history = useRef<string[]>([]);
  const cursor = useRef(-1);
  const keyRef = useRef(0);
  const booted = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const append = useCallback((lines: TermLine[]) => {
    setRows((prev) => [
      ...prev,
      ...lines.map((l, i) => ({ ...l, key: keyRef.current++, delay: Math.min(i * 40, 700) })),
    ]);
  }, []);

  // boot sequence, once (guarded for React strict mode)
  useEffect(() => {
    if (booted.current) return;
    booted.current = true;
    append(BOOT_LINES);
  }, [append]);

  // keep the newest output in view inside the terminal only (never scrolls the page)
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [rows]);

  const exec = useCallback(
    (raw: string) => {
      const cmd = raw.trim();
      const result = runCommand(cmd);
      if (cmd) history.current.unshift(cmd);
      cursor.current = -1;
      if (result.clear) {
        setRows([]);
        return;
      }
      append([{ kind: "cmd", text: cmd }, ...result.lines]);
      if (result.navigate) onNavigate(result.navigate);
    },
    [append, onNavigate]
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    exec(value);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!history.current.length) return;
      cursor.current = Math.min(cursor.current + 1, history.current.length - 1);
      setValue(history.current[cursor.current]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      cursor.current = Math.max(cursor.current - 1, -1);
      setValue(cursor.current === -1 ? "" : history.current[cursor.current]);
    } else if (e.key.toLowerCase() === "l" && e.ctrlKey) {
      e.preventDefault();
      setRows([]);
    }
  };

  return (
    <div className="overflow-hidden rounded-xl border border-cyber/25 bg-obsidian shadow-glow-sm">
      <PanelBar path="usman@core: ~" right="interactive" />

      <div
        ref={logRef}
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
        onClick={() => inputRef.current?.focus({ preventScroll: true })}
        className="h-[21rem] overflow-y-auto px-4 py-3 font-mono text-[13px] leading-6"
      >
        {rows.map((r) => {
          const style = { animationDelay: `${r.delay}ms` };
          if (r.kind === "cmd") {
            return (
              <p key={r.key} className="animate-line-in whitespace-pre-wrap break-words" style={style}>
                <span className="text-cyber">$ </span>
                <span className={KIND_STYLE.cmd}>{r.text}</span>
              </p>
            );
          }
          const external = r.href?.startsWith("http");
          return (
            <p key={r.key} className={cn("animate-line-in whitespace-pre-wrap break-words", KIND_STYLE[r.kind])} style={style}>
              {r.href ? (
                <a
                  href={r.href}
                  className="underline decoration-cyber/40 underline-offset-4 hover:text-cyber"
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  {...(r.href.endsWith(".pdf") ? { download: true } : {})}
                >
                  {r.text}
                </a>
              ) : (
                r.text
              )}
            </p>
          );
        })}

        <form onSubmit={onSubmit} className="flex items-center gap-2">
          <label htmlFor="terminal-input" className="text-cyber">
            $
          </label>
          <input
            id="terminal-input"
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            autoCapitalize="off"
            autoCorrect="off"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal command"
            placeholder="type a command"
            className="min-w-0 flex-1 bg-transparent text-ink caret-cyber outline-none placeholder:text-mist/50"
          />
        </form>
      </div>

      <div className="flex flex-wrap gap-2 border-t border-line px-4 py-3">
        {QUICK_COMMANDS.map((c) => (
          <button
            key={c}
            onClick={() => {
              exec(c);
              inputRef.current?.focus({ preventScroll: true });
            }}
            className="rounded-md border border-line bg-night/60 px-2.5 py-1 font-mono text-xs text-mist transition-colors hover:border-cyber/50 hover:text-cyber"
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

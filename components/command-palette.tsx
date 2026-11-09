"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Briefcase, Check, Copy, CornerDownLeft, Download, FileText, Github, Layers, Linkedin, Mail, Search, Send, Terminal,
  type LucideIcon,
} from "lucide-react";
import { sections, site } from "@/lib/site";
import { copyText, scrollToSection } from "@/lib/utils";
import { Modal } from "./modal";

type Item = {
  id: string;
  group: "Go to" | "Actions" | "Links";
  label: string;
  keywords?: string;
  icon: LucideIcon;
  run: () => void;
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  home: Terminal,
  skills: Layers,
  projects: FileText,
  experience: Briefcase,
  contact: Send,
};

export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  const items = useMemo<Item[]>(() => {
    const list: Item[] = sections.map((s) => ({
      id: `go-${s.id}`,
      group: "Go to",
      label: s.label,
      keywords: s.id,
      icon: SECTION_ICONS[s.id] ?? Terminal,
      run: () => scrollToSection(s.id),
    }));
    list.push(
      {
        id: "act-resume",
        group: "Actions",
        label: "Download ATS resume",
        keywords: "cv pdf",
        icon: Download,
        run: () => window.open(site.resumeUrl, "_blank", "noopener,noreferrer"),
      },
      {
        id: "act-email",
        group: "Actions",
        label: "Send an email",
        keywords: "mail contact hire",
        icon: Mail,
        run: () => {
          window.location.href = `mailto:${site.email}`;
        },
      },
      {
        id: "act-copy",
        group: "Actions",
        label: "Copy email address",
        keywords: "clipboard",
        icon: Copy,
        run: () => {
          void copyText(site.email);
        },
      }
    );
    if (site.links.github)
      list.push({ id: "link-gh", group: "Links", label: "Open GitHub", keywords: "code repos", icon: Github, run: () => window.open(site.links.github, "_blank", "noopener,noreferrer") });
    if (site.links.linkedin)
      list.push({ id: "link-li", group: "Links", label: "Open LinkedIn", keywords: "profile", icon: Linkedin, run: () => window.open(site.links.linkedin, "_blank", "noopener,noreferrer") });
    return list;
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.keywords ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setCopied(false);
    }
  }, [open]);

  useEffect(() => setActive(0), [query]);

  useEffect(() => {
    listRef.current?.querySelector(`[data-index="${active}"]`)?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const choose = (item: Item) => {
    if (item.id === "act-copy") {
      setCopied(true);
      item.run();
      window.setTimeout(onClose, 700);
      return;
    }
    onClose();
    // wait for the dialog to release the scroll lock before scrolling or navigating
    window.setTimeout(item.run, 140);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      choose(results[active]);
    }
  };

  return (
    <Modal open={open} onClose={onClose} label="Command bar" className="mt-[12vh] max-w-xl overflow-hidden">
      <div className="flex items-center gap-3 border-b border-line px-4">
        <Search className="h-4 w-4 text-mist" aria-hidden="true" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Jump to a section or run an action"
          role="combobox"
          aria-expanded="true"
          aria-controls="palette-list"
          aria-activedescendant={results[active] ? `pal-${results[active].id}` : undefined}
          aria-label="Search commands"
          className="h-14 w-full bg-transparent text-sm text-ink outline-none placeholder:text-mist/70"
        />
        <span className="kbd">Esc</span>
      </div>

      <ul id="palette-list" role="listbox" ref={listRef} className="max-h-[50vh] overflow-y-auto p-2">
        {results.length === 0 && (
          <li className="px-3 py-8 text-center text-sm text-mist">No match for “{query}”. Try “projects” or “email”.</li>
        )}
        {results.map((item, i) => {
          const Icon = item.id === "act-copy" && copied ? Check : item.icon;
          const showGroup = i === 0 || results[i - 1].group !== item.group;
          return (
            <li key={item.id} role="presentation">
              {showGroup && <p className="px-3 pb-1 pt-3 text-xs font-medium text-mist/80">{item.group}</p>}
              <div
                id={`pal-${item.id}`}
                role="option"
                aria-selected={i === active}
                data-index={i}
                onMouseMove={() => setActive(i)}
                onClick={() => choose(item)}
                className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  i === active ? "bg-cyber/10 text-cyber" : "text-ink"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span className="flex-1">{item.id === "act-copy" && copied ? "Copied" : item.label}</span>
                {i === active && <CornerDownLeft className="h-3.5 w-3.5" aria-hidden="true" />}
              </div>
            </li>
          );
        })}
      </ul>

      <div className="flex items-center gap-4 border-t border-line px-4 py-2.5 text-xs text-mist">
        <span className="flex items-center gap-1.5"><span className="kbd">↑</span><span className="kbd">↓</span> move</span>
        <span className="flex items-center gap-1.5"><span className="kbd">Enter</span> select</span>
      </div>
    </Modal>
  );
}

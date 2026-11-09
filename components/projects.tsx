"use client";

import { useState } from "react";
import { Check, ExternalLink, Github, Network, X } from "lucide-react";
import { projects, type Project } from "@/lib/data";
import { ArchitectureDiagram } from "./architecture-diagram";
import { Modal } from "./modal";
import { Action } from "./ui/action";
import { GlowCard } from "./ui/glow-card";
import { SectionHeading } from "./ui/section-heading";

function ProjectCard({ project: p, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <GlowCard className="flex flex-col p-6">
      <div className="flex flex-wrap gap-2">
        {p.badges.map((b) => (
          <span key={b} className="rounded-md border border-cyber/30 bg-cyber/10 px-2 py-0.5 font-mono text-xs text-cyber">
            {b}
          </span>
        ))}
      </div>

      <h3 className="mt-4 text-xl font-semibold leading-snug">{p.title}</h3>
      <p className="mt-2 text-base text-ink/90">{p.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-mist">{p.description}</p>

      <ul className="mt-4 space-y-2">
        {p.highlights.map((h) => (
          <li key={h} className="flex gap-2.5 text-sm text-ink/90">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyber" aria-hidden="true" />
            {h}
          </li>
        ))}
      </ul>

      <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tech stack">
        {p.stack.map((s) => (
          <li key={s} className="rounded-md border border-line px-2 py-0.5 font-mono text-xs text-mist">
            {s}
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-wrap gap-2.5 pt-6">
        <Action variant="glow" icon={Network} onClick={onOpen}>
          View architecture
        </Action>
        <Action
          variant="outline"
          icon={Github}
          href={p.repo || undefined}
          external
          disabled={!p.repo}
          title={p.repo ? undefined : "Repository link not added yet (see lib/data.ts)"}
        >
          GitHub Repo
        </Action>
        <Action
          variant="ghost"
          icon={ExternalLink}
          href={p.demo || undefined}
          external
          disabled={!p.demo}
          title={p.demo ? undefined : "Live demo link not added yet (see lib/data.ts)"}
        >
          Live Demo
        </Action>
      </div>
    </GlowCard>
  );
}

export function Projects() {
  const [openId, setOpenId] = useState<string | null>(null);
  const current = projects.find((p) => p.id === openId) ?? null;

  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        title="Projects"
        description="Two systems built end to end. Open the architecture view to see how the data moves through each one."
      />

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} onOpen={() => setOpenId(p.id)} />
        ))}
      </div>

      <Modal open={current !== null} onClose={() => setOpenId(null)} label={`${current?.title ?? "Project"} architecture`} className="max-w-4xl">
        {current && (
          <>
            <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
              <p className="truncate font-mono text-xs text-mist">~/projects/{current.id}/architecture</p>
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close architecture view"
                className="rounded-md p-1.5 text-mist transition-colors hover:bg-white/5 hover:text-ink"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-5 sm:p-7">
              <h3 className="text-xl font-semibold">{current.title}</h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{current.architecture.summary}</p>
              <div className="mt-6">
                <ArchitectureDiagram flows={current.architecture.flows} />
              </div>
              <p className="mt-6 text-xs text-mist">Cyan nodes mark the core step of each stage.</p>
            </div>
          </>
        )}
      </Modal>
    </section>
  );
}

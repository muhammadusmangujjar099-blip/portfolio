"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Boxes, Cpu, Database, Wrench, type LucideIcon } from "lucide-react";
import { skillModules, type Skill, type SkillModule } from "@/lib/data";
import { cn } from "@/lib/utils";
import { GlowCard } from "./ui/glow-card";
import { PanelBar } from "./ui/panel-bar";
import { SectionHeading } from "./ui/section-heading";

const ICONS: Record<string, LucideIcon> = { core: Cpu, ai: Boxes, data: Database, devops: Wrench };
const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "");

type Selection = { module: SkillModule; skill: Skill };

export function Skills() {
  const [sel, setSel] = useState<Selection>({ module: skillModules[0], skill: skillModules[0].skills[1] });

  return (
    <section id="skills" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading
        title="System core"
        description="Skills grouped by the job they do. Select any skill to see how I use it."
      />

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {skillModules.map((m) => {
          const Icon = ICONS[m.id] ?? Cpu;
          return (
            <GlowCard key={m.id} className="p-5">
              <div className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-cyber/30 bg-cyber/10 text-cyber">
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </span>
                <h3 className="text-lg font-semibold">{m.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-mist">{m.blurb}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {m.skills.map((s) => {
                  const selected = sel.skill.name === s.name && sel.module.id === m.id;
                  return (
                    <button
                      key={s.name}
                      aria-pressed={selected}
                      onClick={() => setSel({ module: m, skill: s })}
                      className={cn(
                        "rounded-md border px-3 py-1.5 font-mono text-xs transition-all duration-200",
                        selected
                          ? "border-cyber bg-cyber/15 text-cyber shadow-glow-sm"
                          : "border-line bg-night/50 text-ink hover:border-cyber/50 hover:text-cyber"
                      )}
                    >
                      {s.name}
                    </button>
                  );
                })}
              </div>
            </GlowCard>
          );
        })}
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-line bg-obsidian">
        <PanelBar path={`~/system-core/${sel.module.id}/${slug(sel.skill.name)}`} right="inspector" />
        <div className="min-h-[7.5rem] px-5 py-5" aria-live="polite">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${sel.module.id}-${sel.skill.name}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <p className="font-display text-xl font-semibold text-cyber">{sel.skill.name}</p>
              <p className="mt-2 max-w-2xl text-base leading-relaxed text-ink/90">
                {sel.skill.note}
                <span className="ml-1 inline-block h-4 w-2 translate-y-0.5 animate-blink bg-cyber" aria-hidden="true" />
              </p>
              <p className="mt-3 text-sm text-mist">Part of {sel.module.title.toLowerCase()}.</p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

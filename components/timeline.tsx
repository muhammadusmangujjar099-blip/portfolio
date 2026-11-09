import { Briefcase, GraduationCap } from "lucide-react";
import { timeline } from "@/lib/data";
import { SectionHeading } from "./ui/section-heading";

export function Timeline() {
  return (
    <section id="experience" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading title="Experience and education" description="Where I studied and where I have worked on real systems." />

      <ol className="relative ml-3 mt-10 max-w-2xl border-l border-line">
        {timeline.map((item, i) => {
          const Icon = item.kind === "education" ? GraduationCap : Briefcase;
          return (
            <li key={item.id} className="relative pb-10 pl-8 last:pb-0">
              <span
                aria-hidden="true"
                className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-cyber bg-night ${
                  i === 0 ? "shadow-glow" : ""
                }`}
              />
              <p className="font-mono text-sm text-cyber">{item.period}</p>
              <h3 className="mt-1 text-lg font-semibold leading-snug">{item.title}</h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-mist">
                <Icon className="h-4 w-4" aria-hidden="true" />
                {item.org}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink/90">{item.description}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

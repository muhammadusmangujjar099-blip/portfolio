import { projects, skillModules } from "./data";
import { sectionIds, site, type SectionId } from "./site";

export type LineKind = "out" | "accent" | "muted" | "error" | "cmd";
export type TermLine = { kind: LineKind; text: string; href?: string };
export type CommandResult = { lines: TermLine[]; clear?: boolean; navigate?: SectionId };

export const QUICK_COMMANDS = ["help", "cat skills.txt", "fetch projects", "neofetch"] as const;

const out = (text: string): TermLine => ({ kind: "out", text });
const accent = (text: string): TermLine => ({ kind: "accent", text });
const muted = (text: string): TermLine => ({ kind: "muted", text });

function neofetch(): TermLine[] {
  const row = (k: string, v: string) => out(`${k.padEnd(8)}${v}`);
  return [
    accent(`${site.handle}@core`),
    muted("-".repeat(34)),
    row("role", site.role),
    row("edu", "BSCS, GCUF (2026)"),
    row("stack", "FastAPI, PostgreSQL, Docker"),
    row("ai", "RAG (pgvector), Ollama, LLM tooling"),
    row("os", "Linux (Ubuntu / Mint)"),
    row("status", site.status),
  ];
}

export const BOOT_LINES: TermLine[] = [
  muted("[ ok ] mounting /home/usman/portfolio"),
  muted("[ ok ] loading modules: core, ai, data, devops"),
  ...neofetch(),
  muted("Type 'help', or tap a command below."),
];

function help(): TermLine[] {
  const row = (c: string, d: string) => out(`${c.padEnd(16)}${d}`);
  return [
    row("whoami", "short introduction"),
    row("neofetch", "system specs"),
    row("cat skills.txt", "list the skill modules"),
    row("fetch projects", "list featured projects"),
    row("ls", "list files"),
    row("contact", "ways to reach me"),
    row("resume", "download the resume"),
    row("open <section>", `jump to: ${sectionIds.join(", ")}`),
    row("clear", "clear the screen"),
  ];
}

export function runCommand(raw: string): CommandResult {
  const input = raw.trim().replace(/\s+/g, " ");
  const cmd = input.toLowerCase();
  if (!cmd) return { lines: [] };

  switch (cmd) {
    case "help":
    case "?":
      return { lines: help() };
    case "clear":
      return { lines: [], clear: true };
    case "whoami":
      return {
        lines: [
          out(`${site.name}, ${site.role}.`),
          out("I build FastAPI services, PostgreSQL data layers and RAG pipelines."),
        ],
      };
    case "neofetch":
      return { lines: neofetch() };
    case "ls":
      return { lines: [out("skills.txt   projects/   experience.md   contact.sh   resume.pdf")] };
    case "cat skills.txt":
    case "skills":
      return {
        lines: skillModules.flatMap((m) => [
          accent(`[${m.title}]`),
          out(`  ${m.skills.map((s) => s.name).join(", ")}`),
        ]),
        navigate: undefined,
      };
    case "fetch projects":
    case "projects":
      return {
        lines: [
          ...projects.flatMap((p) => [
            accent(`${p.title}`),
            out(`  ${p.stack.join(", ")}`),
            ...(p.repo ? [{ kind: "out" as const, text: `  ${p.repo}`, href: p.repo }] : []),
          ]),
          muted("Run 'open projects' to see the full case studies."),
        ],
      };
    case "contact":
      return {
        lines: [
          { kind: "out", text: `email   ${site.email}`, href: `mailto:${site.email}` },
          ...(site.links.github ? [{ kind: "out" as const, text: `github  ${site.links.github}`, href: site.links.github }] : []),
          ...(site.links.linkedin ? [{ kind: "out" as const, text: `linkedin  ${site.links.linkedin}`, href: site.links.linkedin }] : []),
        ],
      };
    case "resume":
      return { lines: [{ kind: "out", text: `Downloading ${site.resumeUrl} ...`, href: site.resumeUrl }] };
    case "sudo hire-me":
      return {
        lines: [
          accent("[sudo] permission granted."),
          out(`Send the offer to ${site.email} and I'll reply fast.`),
        ],
        navigate: "contact",
      };
  }

  if (cmd.startsWith("open ")) {
    const target = cmd.slice(5).trim();
    if ((sectionIds as string[]).includes(target)) {
      return { lines: [muted(`Opening ${target} ...`)], navigate: target as SectionId };
    }
    return { lines: [{ kind: "error", text: `open: no section named '${target}'. Try: ${sectionIds.join(", ")}` }] };
  }
  if (cmd.startsWith("cat ")) {
    return { lines: [{ kind: "error", text: `cat: ${input.slice(4)}: No such file. Try 'ls'.` }] };
  }
  return { lines: [{ kind: "error", text: `command not found: ${input}. Type 'help'.` }] };
}

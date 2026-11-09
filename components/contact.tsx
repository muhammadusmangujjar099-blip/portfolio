"use client";

import { FormEvent, useState } from "react";
import { Check, Copy, Github, Linkedin, Mail, MessageSquare, Send, type LucideIcon } from "lucide-react";
import { site } from "@/lib/site";
import { copyText } from "@/lib/utils";
import { Action } from "./ui/action";
import { GlowCard } from "./ui/glow-card";
import { SectionHeading } from "./ui/section-heading";

const FIELD =
  "mt-1.5 w-full rounded-lg border border-line bg-night/60 px-3 py-2.5 text-sm text-ink placeholder:text-mist/60 transition-colors hover:border-mist/40 focus:border-cyber/60 focus:outline-none focus:ring-1 focus:ring-cyber/40";

function SocialNode({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href: string }) {
  const body = (
    <>
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyber/30 bg-cyber/10 text-cyber">
        <Icon className="h-5 w-5" aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block text-sm font-medium">{label}</span>
        <span className="block truncate text-sm text-mist">{href ? value : "Not linked yet"}</span>
      </span>
    </>
  );
  if (!href) {
    return (
      <div aria-disabled="true" className="flex items-center gap-3 rounded-xl border border-dashed border-line p-4 opacity-60">
        {body}
      </div>
    );
  }
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      className="glow-card flex items-center gap-3 p-4"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {body}
    </a>
  );
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\n${name}\n${email}`);
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setSent(true);
  };

  const onCopy = async () => {
    if (await copyText(site.email)) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-24 sm:px-6">
      <SectionHeading title="Contact" description="Hiring for an AI or backend role, or have a system to build? Send a message or reach me directly." />

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
        <form onSubmit={onSubmit} className="rounded-xl border border-line bg-obsidian p-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium">
              Your name
              <input name="name" required autoComplete="name" placeholder="Ayesha Khan" className={FIELD} />
            </label>
            <label className="block text-sm font-medium">
              Your email
              <input name="email" type="email" required autoComplete="email" placeholder="ayesha@company.com" className={FIELD} />
            </label>
          </div>
          <label className="mt-4 block text-sm font-medium">
            Message
            <textarea name="message" required rows={5} placeholder="Tell me about the role or the project." className={FIELD} />
          </label>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Action submit variant="glow" icon={Send}>
              Send message
            </Action>
            <p role="status" aria-live="polite" className="text-sm text-mist">
              {sent
                ? `Your email app should open with the message ready. If it does not, write to ${site.email}.`
                : "Opens your email app with the message filled in."}
            </p>
          </div>
        </form>

        <div className="flex flex-col gap-3">
          <GlowCard className="p-5">
            <p className="text-sm text-mist">Email</p>
            <a href={`mailto:${site.email}`} className="mt-1 block break-all font-mono text-sm text-cyber hover:underline">
              {site.email}
            </a>
            <div className="mt-4 flex gap-2.5">
              <Action variant="outline" icon={Mail} href={`mailto:${site.email}`}>
                Write
              </Action>
              <Action variant="ghost" icon={copied ? Check : Copy} onClick={onCopy}>
                {copied ? "Copied" : "Copy address"}
              </Action>
            </div>
          </GlowCard>

          <SocialNode icon={Github} label="GitHub" value="muhammadusmangujjar099-blip" href={site.links.github} />
          <SocialNode icon={Linkedin} label="LinkedIn" value="View profile" href={site.links.linkedin} />
          <SocialNode icon={MessageSquare} label="Discord" value="Message me" href={site.links.discord} />
        </div>
      </div>
    </section>
  );
}

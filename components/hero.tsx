"use client";

import { motion } from "framer-motion";
import { Download, FolderGit2 } from "lucide-react";
import { site } from "@/lib/site";
import { scrollToSection } from "@/lib/utils";
import { Terminal } from "./terminal";
import { Action } from "./ui/action";

const HEADLINE = ["Engineering Scalable AI Systems", "& High-Performance", "Python Backends"];
const EASE = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  return (
    <section id="home" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-24 pt-32 sm:px-6 sm:pt-40">
      <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
        <div>
          {/* The one orchestrated page-load moment: headline lines rise out of a mask, then the terminal arrives. */}
          <h1 className="text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            <span className="sr-only">{HEADLINE.join(" ")}</span>
            <span aria-hidden="true">
              {HEADLINE.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-1">
                  <motion.span
                    className="block"
                    initial={{ y: "105%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease: EASE }}
                  >
                    {line}
                    {i === HEADLINE.length - 1 && (
                      <span className="ml-1 inline-block h-[0.8em] w-[0.38em] translate-y-[0.08em] animate-blink bg-cyber" />
                    )}
                  </motion.span>
                </span>
              ))}
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-6 max-w-lg font-mono text-sm leading-relaxed text-mist sm:text-base"
          >
            BSCS Graduate | FastAPI, PostgreSQL, RAG Pipelines &amp; Docker
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.75, duration: 0.5 }}
          >
            <div className="mt-8 flex flex-wrap gap-3">
              <Action variant="glow" icon={FolderGit2} onClick={() => scrollToSection("projects")}>
                Explore Architecture Projects
              </Action>
              <Action variant="outline" icon={Download} href={site.resumeUrl} download>
                Download ATS Resume
              </Action>
            </div>
            <p className="mt-5 text-sm text-mist">
              Run commands in the terminal, or press <span className="kbd">Ctrl</span> <span className="kbd">K</span>{" "}
              (<span className="kbd">⌘</span> <span className="kbd">K</span> on Mac) to jump anywhere.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
        >
          <Terminal onNavigate={scrollToSection} />
        </motion.div>
      </div>
    </section>
  );
}

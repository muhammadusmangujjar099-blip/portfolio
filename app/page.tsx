import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Timeline } from "@/components/timeline";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Skills />
      <Projects />
      <Timeline />
      <Contact />
    </>
  );
}

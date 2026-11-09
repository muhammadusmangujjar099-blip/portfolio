/**
 * Single source of truth for personal details.
 * Empty strings (linkedin, discord) render as "not linked yet": fill them in.
 */
export const site = {
  name: "Muhammad Usman",
  handle: "usman",
  role: "AI & Python Backend Engineer",
  title: "Muhammad Usman | AI & Python Backend Engineer",
  description:
    "AI and Python backend engineer building scalable FastAPI services, PostgreSQL data layers and RAG pipelines.",
  email: "muhammadusmangujjar099@gmail.com",
  status: "Available for AI/Backend Roles",
  resumeUrl: "/resume.pdf", // put your PDF at public/resume.pdf
  links: {
    github: "https://github.com/muhammadusmangujjar099-blip",
    linkedin: "", // TODO: https://www.linkedin.com/in/your-handle
    discord: "", // TODO: https://discord.com/users/your-id or an invite link
  } as { github: string; linkedin: string; discord: string },
};

export const sections = [
  { id: "home", label: "Home" },
  { id: "skills", label: "System core" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof sections)[number]["id"];
export const sectionIds: string[] = sections.map((s) => s.id);

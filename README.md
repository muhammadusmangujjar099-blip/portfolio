# Muhammad Usman: portfolio

A dark "developer control center" portfolio built with Next.js 14 (App Router, TypeScript), Tailwind CSS,
Framer Motion and Lucide icons.

- Live terminal in the hero (`help`, `cat skills.txt`, `fetch projects`, `neofetch`, `open <section>` ...)
- Command bar on `Ctrl/Cmd + K` with keyboard navigation
- Canvas neural-mesh background that reacts to the cursor (pauses in hidden tabs, static with reduced motion)
- Skills as interactive modules with an inspector panel
- Project cards with an architecture modal (animated data-flow diagram)
- Experience and education timeline
- Contact form (opens your email app with the message filled in) and social nodes

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Make it yours (two files)

| File | What to edit |
|---|---|
| `lib/site.ts` | name, email, status text, **LinkedIn and Discord links** (empty = shown as "Not linked yet") |
| `lib/data.ts` | skills, projects (**repo and live-demo URLs**, architecture flows), timeline dates and descriptions |

Also add your resume as `public/resume.pdf` so the "Download ATS Resume" button works.

Optional: set `NEXT_PUBLIC_SITE_URL=https://your-domain.com` for correct social preview URLs.

## Deploy on Vercel

Import the repo on vercel.com. If the project lives in a subfolder, set **Root Directory** to that folder.
No environment variables are required.

## Structure

```
app/            layout, page, globals.css, not-found
components/     hero, terminal, navbar, command-palette, skills, projects,
                architecture-diagram, timeline, contact, background (canvas), ui/
lib/            site.ts (profile), data.ts (content), terminal.ts (command engine), utils.ts
hooks/          use-scroll-spy.ts
```

## Notes

- Fonts: Chakra Petch (headings), IBM Plex Sans (body), IBM Plex Mono (terminal), loaded with `next/font`.
- Accessibility: skip link, visible focus rings, focus-trapped dialogs, `aria-live` terminal output,
  and `prefers-reduced-motion` support throughout.

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-sm text-mist sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>&copy; {new Date().getFullYear()} Muhammad Usman</p>
        <p className="font-mono text-xs">Built with Next.js, Tailwind CSS and Framer Motion</p>
      </div>
    </footer>
  );
}

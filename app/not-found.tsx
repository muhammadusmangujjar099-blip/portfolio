import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-start justify-center px-6">
      <p className="font-mono text-sm text-cyber">$ cd /this-page</p>
      <h1 className="mt-3 text-4xl font-semibold">404: no such directory</h1>
      <p className="mt-3 text-mist">That page does not exist. Head back to the main console.</p>
      <Link href="/" className="mt-6 rounded-lg bg-cyber px-4 py-2.5 text-sm font-semibold text-night shadow-glow hover:brightness-110">
        Back to home
      </Link>
    </div>
  );
}

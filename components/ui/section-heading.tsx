export function SectionHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="max-w-xl">
      <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
      <p className="mt-3 text-base leading-relaxed text-mist">{description}</p>
    </div>
  );
}

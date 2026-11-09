import { Fragment } from "react";
import type { Flow } from "@/lib/data";
import { cn } from "@/lib/utils";

/** A packet travels along each link, vertical on small screens and horizontal from md up. */
function Link() {
  return (
    <li aria-hidden="true" className="relative mx-auto h-6 w-px shrink-0 self-center bg-cyber/30 md:mx-0 md:h-px md:w-8">
      <span className="absolute left-1/2 h-1.5 w-1.5 -translate-x-1/2 animate-flow-y rounded-full bg-cyber shadow-glow-sm md:hidden" />
      <span className="absolute top-1/2 hidden h-1.5 w-1.5 -translate-y-1/2 animate-flow-x rounded-full bg-cyber shadow-glow-sm md:block" />
    </li>
  );
}

export function ArchitectureDiagram({ flows }: { flows: Flow[] }) {
  return (
    <div className="space-y-7">
      {flows.map((flow) => (
        <div key={flow.title}>
          <h3 className="mb-3 text-sm font-medium text-mist">{flow.title}</h3>
          <ol className="flex flex-col items-stretch md:flex-row md:items-center">
            {flow.nodes.map((node, i) => (
              <Fragment key={node.label}>
                <li
                  className={cn(
                    "rounded-lg border px-3 py-2.5 text-sm md:flex-1",
                    node.accent
                      ? "border-cyber/50 bg-cyber/10 text-cyber shadow-glow-sm"
                      : "border-line bg-night/60 text-ink"
                  )}
                >
                  <span className="block font-medium">{node.label}</span>
                  {node.detail && <span className="mt-0.5 block text-xs text-mist">{node.detail}</span>}
                </li>
                {i < flow.nodes.length - 1 && <Link />}
              </Fragment>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
}

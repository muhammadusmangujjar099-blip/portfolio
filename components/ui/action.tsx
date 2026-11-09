import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "glow" | "outline" | "ghost";

const styles: Record<Variant, string> = {
  glow: "bg-cyber font-semibold text-night shadow-glow hover:shadow-glow-lg hover:brightness-110",
  outline: "border border-cyber/45 text-cyber hover:border-cyber hover:bg-cyber/10 hover:shadow-glow-sm",
  ghost: "border border-line text-ink hover:border-cyber/40 hover:bg-white/5",
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  icon?: LucideIcon;
  href?: string;
  external?: boolean;
  download?: boolean;
  onClick?: () => void;
  submit?: boolean;
  disabled?: boolean;
  title?: string;
  className?: string;
};

/** One component for links and buttons so every action looks and behaves the same. */
export function Action({
  children, variant = "ghost", icon: Icon, href, external, download, onClick, submit, disabled, title, className,
}: Props) {
  const cls = cn(
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm transition-all duration-200 active:scale-[0.98]",
    styles[variant],
    disabled && "cursor-not-allowed opacity-45 hover:shadow-none active:scale-100",
    className
  );
  const content = (
    <>
      {Icon && <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />}
      {children}
    </>
  );

  if (disabled) {
    return (
      <span aria-disabled="true" title={title} className={cls}>
        {content}
      </span>
    );
  }
  if (href) {
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...(download ? { download: true } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={submit ? "submit" : "button"} onClick={onClick} className={cls}>
      {content}
    </button>
  );
}

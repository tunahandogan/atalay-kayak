import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "flag" | "dark" | "light" | "outline" | "outline-dark";

const variants: Record<Variant, string> = {
  flag: "bg-flag-ink text-white hover:bg-[#8f120b] active:bg-[#8f120b]",
  dark: "bg-night text-white hover:bg-night-2 active:bg-black",
  light: "bg-white text-night hover:bg-glacier-2 active:bg-glacier-2",
  outline: "border-2 border-night/30 text-night hover:border-night hover:bg-night/5",
  "outline-dark": "on-night border-2 border-white/40 text-white hover:border-white hover:bg-white/10",
};

type Props = {
  href: string;
  variant?: Variant;
  external?: boolean;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
};

export function ButtonLink({ href, variant = "flag", external, className = "", children, ariaLabel }: Props) {
  const cls = `tap inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.9375rem] font-bold transition-[transform,background-color,border-color] duration-200 active:scale-[0.97] ${variants[variant]} ${className}`;
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        aria-label={ariaLabel}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} aria-label={ariaLabel}>
      {children}
    </Link>
  );
}

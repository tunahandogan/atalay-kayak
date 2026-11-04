import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "flag" | "dark" | "light" | "shade";

const variants: Record<Variant, string> = {
  flag: "bg-flag text-paper hover:bg-flag-ink",
  dark: "bg-night text-paper hover:bg-night-2",
  light: "bg-paper text-night hover:bg-glacier-2",
  shade: "bg-glacier-2 text-night hover:bg-line",
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
  const cls = `inline-flex min-h-14 items-center justify-center gap-2.5 px-6 font-display text-[1.5rem] font-extrabold uppercase leading-none transition-[transform,background-color] duration-150 active:scale-[0.98] ${variants[variant]} ${className}`;
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

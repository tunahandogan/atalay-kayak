"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { business, nav } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky inset-x-0 top-0 z-40 h-[var(--header-h)] bg-glacier/95 text-night transition-shadow duration-300 ${
        scrolled ? "shadow-[0_1px_0_var(--color-line)]" : ""
      }`}
    >
      <div className="wrap flex h-full items-center justify-between gap-6">
        <Link href="/" aria-label={`${business.displayName}, ana sayfa`} className="tap inline-flex items-center">
          <Logo />
        </Link>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => {
              const current = pathname.startsWith(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className="tap relative inline-flex items-center px-3.5 text-[0.9375rem] font-semibold text-night/85 transition-colors hover:text-flag-ink aria-[current=page]:text-night aria-[current=page]:after:absolute aria-[current=page]:after:inset-x-3.5 aria-[current=page]:after:bottom-2 aria-[current=page]:after:h-[3px] aria-[current=page]:after:rounded-full aria-[current=page]:after:bg-flag"
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${business.phone.e164}`}
            className="tap hidden items-center rounded-full border-2 border-night/25 px-5 text-[0.9375rem] font-bold text-night transition-colors hover:border-night md:inline-flex"
          >
            Ara
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="tap hidden items-center gap-2 rounded-full bg-flag-ink px-5 text-[0.9375rem] font-bold text-white transition-[background-color,transform] hover:bg-[#8f120b] active:scale-[0.97] sm:inline-flex"
          >
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            WhatsApp
          </a>
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}

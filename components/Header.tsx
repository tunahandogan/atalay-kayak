"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { business, nav } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";
import { MobileMenu } from "@/components/MobileMenu";
import { DemoBadge } from "@/components/DemoBadge";

export function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky inset-x-0 top-0 z-40 h-[var(--header-h)] bg-glacier text-night">
      <div className="wrap flex h-full items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <Link href="/" aria-label={`${business.displayName}, ana sayfa`} className="tap inline-flex items-center">
            <Logo />
          </Link>
          <DemoBadge />
        </div>

        <nav aria-label="Ana menü" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname.startsWith(item.href) ? "page" : undefined}
                  className="tap inline-flex items-center px-3 font-semibold transition-colors duration-150 hover:text-flag-ink aria-[current=page]:text-flag-ink"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={`tel:${business.phone.e164}`}
            className="tap hidden items-center bg-glacier-2 px-5 font-semibold transition-colors duration-150 hover:bg-line md:inline-flex"
          >
            Ara
          </a>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="tap hidden items-center gap-2 bg-flag px-5 font-semibold text-paper transition-colors duration-150 hover:bg-flag-ink md:inline-flex"
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

"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { business, nav } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";

const delay = (i: number) => ({ "--i": i }) as CSSProperties;

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger
        className="tap -mr-2 inline-flex items-center justify-center text-night lg:hidden"
        aria-label="Menüyü aç"
      >
        <Menu aria-hidden="true" className="h-7 w-7" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content className="menu-panel on-night fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night text-white outline-none">
          <Dialog.Title className="sr-only">Menü</Dialog.Title>
          <Dialog.Description className="sr-only">
            {business.displayName} sayfaları ve iletişim bağlantıları
          </Dialog.Description>
          <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={close} aria-label={`${business.displayName} ana sayfa`}>
              <Logo tone="dark" />
            </Link>
            <Dialog.Close className="tap -mr-2 inline-flex items-center justify-center" aria-label="Menüyü kapat">
              <X aria-hidden="true" className="h-7 w-7" />
            </Dialog.Close>
          </div>

          <nav aria-label="Ana menü" className="wrap mt-6 flex-1">
            <ul>
              {nav.map((item, i) => (
                <li key={item.href} className="menu-item border-b border-white/10" style={delay(i)}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="display flex min-h-[64px] items-center py-3 text-[clamp(1.8rem,8vw,2.5rem)] active:text-mist"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="wrap menu-item grid gap-3 pb-[calc(28px+env(safe-area-inset-bottom,0px))] pt-8"
            style={delay(nav.length)}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex items-center justify-center gap-2 rounded-full bg-flag-ink px-6 py-4 font-bold text-white"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </a>
            <a
              href={`tel:${business.phone.e164}`}
              className="tap inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-6 py-4 font-bold"
            >
              <Phone aria-hidden="true" className="h-5 w-5" />
              {business.phone.display}
            </a>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

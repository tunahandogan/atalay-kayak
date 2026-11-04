"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Menu, MessageCircle, Phone, X } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import { useState } from "react";
import { business, levels, nav } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { Logo } from "@/components/Logo";
import { PisteSign } from "@/components/PisteSign";

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
        <Dialog.Content className="menu-panel on-night fixed inset-0 z-50 flex flex-col overflow-y-auto bg-night text-paper outline-none">
          <Dialog.Title className="sr-only">Menü</Dialog.Title>
          <Dialog.Description className="sr-only">
            {business.displayName} sayfaları ve iletişim bağlantıları
          </Dialog.Description>
          <div className="wrap flex h-[var(--header-h)] shrink-0 items-center justify-between">
            <Link href="/" onClick={close} aria-label={`${business.displayName} ana sayfa`} className="tap inline-flex items-center">
              <Logo tone="dark" />
            </Link>
            <Dialog.Close className="tap -mr-2 inline-flex items-center justify-center" aria-label="Menüyü kapat">
              <X aria-hidden="true" className="h-7 w-7" />
            </Dialog.Close>
          </div>

          <nav aria-label="Ana menü" className="wrap mt-6 flex-1">
            <ul className="grid gap-2">
              {nav.map((item, i) => (
                <li key={item.href} className="menu-item" style={delay(i)}>
                  <Link
                    href={item.href}
                    onClick={close}
                    className="display flex min-h-[72px] items-center gap-4 text-[clamp(2.5rem,12vw,3.5rem)] active:text-mist"
                  >
                    <PisteSign piste={levels[i].piste} n={i + 1} inverse={levels[i].piste === "black"} size="2.5rem" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="wrap menu-item grid gap-2 pb-[calc(28px+env(safe-area-inset-bottom,0px))] pt-8"
            style={delay(nav.length)}
          >
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-14 items-center justify-center gap-2 bg-flag px-6 font-semibold text-paper"
            >
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </a>
            <a
              href={`tel:${business.phone.e164}`}
              className="inline-flex min-h-14 items-center justify-center gap-2 bg-night-2 px-6 font-semibold"
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

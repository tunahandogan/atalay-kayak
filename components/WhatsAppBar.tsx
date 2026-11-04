"use client";

import { useEffect, useState } from "react";
import { Phone } from "lucide-react";
import { business } from "@/content/business";
import { waLink } from "@/lib/whatsapp";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.9.9-3-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

/** Skipas formu görünürken boş mesajlı çubuk geri çekilir: asıl eylem formun kendi düğmesidir. */
export function WhatsAppBar() {
  const href = waLink();
  const [overForm, setOverForm] = useState(false);

  useEffect(() => {
    const el = document.querySelector("[data-pass]");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setOverForm(e.isIntersecting), { rootMargin: "-20% 0px -20% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const hide = overForm ? "pointer-events-none translate-y-full opacity-0" : "";

  return (
    <>
      {/* Mobil: altta sabit çubuk */}
      <div
        className={`fixed inset-x-0 bottom-0 z-30 flex gap-1.5 bg-night px-2 pt-2 transition-[transform,opacity] duration-200 md:hidden ${hide}`}
        style={{ paddingBottom: "calc(0.5rem + env(safe-area-inset-bottom))" }}
        inert={overForm || undefined}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-h-[52px] flex-1 items-center justify-center gap-2 bg-flag px-4 font-semibold text-paper"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp&apos;tan fiyat al
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={`tel:${business.phone.e164}`}
          className="flex min-h-[52px] items-center justify-center gap-2 bg-night-2 px-5 font-semibold text-paper"
        >
          <Phone aria-hidden className="size-4" />
          Ara
          <span className="sr-only"> {business.phone.display}</span>
        </a>
      </div>
    </>
  );
}

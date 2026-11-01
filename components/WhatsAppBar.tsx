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

export function WhatsAppBar() {
  const href = waLink();
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const el = document.querySelector("[data-hero]");
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(([e]) => setHeroVisible(e.isIntersecting), { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      {/* Mobil: altta sabit çubuk */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 flex gap-2 border-t border-white/10 bg-night px-3 pt-3 md:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-flag px-4 text-sm font-bold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <WhatsAppIcon className="size-5" />
          WhatsApp&apos;tan fiyat al
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </a>
        <a
          href={`tel:${business.phone.e164}`}
          className="flex h-10 items-center justify-center gap-2 rounded-full border border-white/25 px-5 text-sm font-semibold text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          <Phone aria-hidden className="size-4" />
          Ara
          <span className="sr-only"> {business.phone.display}</span>
        </a>
      </div>

      {/* Masaüstü: sağ altta kapsül */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={heroVisible ? -1 : undefined}
        aria-hidden={heroVisible || undefined}
        className={`fixed bottom-6 right-6 z-30 hidden items-center gap-2 rounded-full bg-flag px-6 py-3.5 text-sm font-bold text-white shadow-lg shadow-night/30 transition-all hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night md:inline-flex ${heroVisible ? "pointer-events-none translate-y-4 opacity-0" : ""}`}
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp&apos;tan fiyat al
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
    </>
  );
}

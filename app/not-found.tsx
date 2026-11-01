import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/business";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <main id="icerik" className="bg-glacier text-night">
      <div className="mx-auto flex min-h-[70svh] max-w-3xl flex-col justify-center px-5 py-24">
        <p className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-flag-ink">404 · Pist dışı</p>
        <h1 className="mt-3 font-display text-5xl font-extrabold leading-[0.95] tracking-tight sm:text-7xl">
          Pistten çıktınız.
        </h1>
        <p className="mt-5 max-w-md text-lg text-muted">
          Aradığınız sayfa yok ya da taşınmış. Ana sayfadan devam edin ya da {business.name} ekibine
          WhatsApp&apos;tan yazın.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="rounded-sm bg-flag px-5 py-3 font-semibold text-white transition-colors hover:bg-flag-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night"
          >
            Ana sayfaya dön
          </Link>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-night/30 px-5 py-3 font-semibold transition-colors hover:border-flag hover:text-flag-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-night"
          >
            WhatsApp&apos;tan yaz
          </a>
        </div>
      </div>
    </main>
  );
}

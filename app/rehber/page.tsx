import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { business } from "@/content/business";
import { LevelGuide } from "@/components/LevelGuide";
import { SizeGuide } from "@/components/SizeGuide";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Beden ve seviye rehberi",
  description: `Kayak botu numara tablosu, kayak boyu kuralı ve pist renkleri. Genel bilgidir; ${business.displayName} mağazasında denenerek netleşir.`,
};

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";
const h2 = "font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl";

export default function RehberPage() {
  return (
    <main id="icerik" className="bg-glacier text-ink">
      <section className={`${wrap} pb-12 pt-12 md:pb-16 md:pt-20`}>
        <p className="text-sm font-bold uppercase tracking-widest text-flag-ink">Rehber</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Beden ve seviye rehberi
        </h1>
        <p className="mt-5 max-w-[58ch] text-lg text-muted">
          Seviyenizi ve bot numaranızı bilmek mesajınızı kısaltır. Emin değilseniz sorun değil; son karar mağazada
          denenerek verilir.
        </p>
      </section>

      <section aria-labelledby="seviye" className={`${wrap} pb-16 md:pb-20`}>
        <h2 id="seviye" className={`${h2} mb-6`}>Seviye ve pist renkleri</h2>
        <LevelGuide />
      </section>

      <section aria-labelledby="beden" className="bg-glacier-2 py-16 md:py-20">
        <div className={wrap}>
          <h2 id="beden" className={`${h2} mb-8`}>Bot numarası ve kayak boyu</h2>
          <SizeGuide />
        </div>
      </section>

      <section className={`${wrap} py-16 md:py-20`}>
        <div className="flex flex-col items-start gap-5 rounded-3xl bg-night p-8 text-white md:flex-row md:items-center md:justify-between md:p-12">
          <p className="max-w-[28ch] font-display text-2xl font-extrabold leading-tight sm:text-3xl">
            Numaranızı ya da seviyenizi yazın, gerisini birlikte netleştirelim.
          </p>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-12 items-center gap-2 rounded-full bg-flag px-7 font-bold text-white transition-colors hover:bg-flag-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <MessageCircle className="size-5" aria-hidden />
            WhatsApp&apos;tan yazın
            <span className="sr-only">(yeni sekmede açılır)</span>
          </a>
        </div>
      </section>
    </main>
  );
}

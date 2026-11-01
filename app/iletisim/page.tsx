import type { Metadata } from "next";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { business } from "@/content/business";
import { RentalBuilder } from "@/components/RentalBuilder";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursList, withPlaceholders } from "@/components/HoursList";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${business.displayName}: ${business.address.full}. Telefon ${business.phone.display}, WhatsApp, çalışma saatleri ve harita.`,
};

const linkCls =
  "inline-flex min-h-11 items-center gap-2 font-medium text-night underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink";
const h2Cls = "font-display text-lg font-bold uppercase tracking-wide text-night";

export default function IletisimPage() {
  return (
    <main id="icerik" className="bg-glacier">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
        <p className="text-sm font-semibold uppercase tracking-widest text-flag-ink">İletişim</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold leading-none tracking-tight text-night sm:text-5xl">
          Bize ulaşın
        </h1>
        <p className="mt-4 max-w-xl text-lg text-muted">
          {business.city}, {business.district}. En hızlı yol WhatsApp: ekipmanı ve günleri seçin, mesaj hazır gelsin.
        </p>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="flex flex-col gap-8">
            <section aria-labelledby="adres">
              <h2 id="adres" className={h2Cls}>
                Adres
              </h2>
              <div className="mt-2 flex gap-3">
                <MapPin aria-hidden className="mt-1 size-5 shrink-0 text-flag-ink" />
                <address className="not-italic text-night">
                  <span className="block">{business.address.full}</span>
                  <span className="mt-1 block text-sm text-muted">{withPlaceholders(business.address.detail)}</span>
                </address>
              </div>
            </section>

            <ul className="flex flex-col gap-1">
              <li>
                <a href={`tel:${business.phone.e164}`} className={linkCls}>
                  <Phone aria-hidden className="size-5 text-flag-ink" />
                  {business.phone.display}
                </a>
              </li>
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  <MessageCircle aria-hidden className="size-5 text-flag-ink" />
                  WhatsApp ile yazın
                  <span className="sr-only"> (yeni sekmede açılır)</span>
                </a>
              </li>
            </ul>

            <section aria-labelledby="saatler">
              <h2 id="saatler" className={h2Cls}>
                Çalışma saatleri
              </h2>
              <HoursList tone="light" />
              <p className="mt-2 text-sm text-muted">Sezon: {withPlaceholders(business.season)}</p>
            </section>

            <section aria-labelledby="konum">
              <h2 id="konum" className={`mb-3 ${h2Cls}`}>
                Konum
              </h2>
              <MapEmbed />
            </section>
          </div>

          <section aria-labelledby="teklif" className="lg:sticky lg:top-24 lg:self-start">
            <h2 id="teklif" className={`mb-3 ${h2Cls}`}>
              Fiyat al
            </h2>
            <RentalBuilder variant="page" />
          </section>
        </div>
      </div>
    </main>
  );
}

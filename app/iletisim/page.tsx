import type { Metadata } from "next";
import { MessageCircle, Phone } from "lucide-react";
import { business } from "@/content/business";
import { AskLink } from "@/components/AskLink";
import { RentalBuilder } from "@/components/RentalBuilder";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursList } from "@/components/HoursList";
import { PisteHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";
import { isOpen } from "@/lib/placeholders";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "İletişim",
  description: `${business.displayName}: ${business.address.full}. Telefon ${business.phone.display}, WhatsApp, çalışma saatleri ve harita.`,
};

export default function IletisimPage() {
  return (
    <main id="icerik" className="bg-glacier text-ink">
      <section className="section-y pt-10 lg:pt-16">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <PisteHeading as="h1" n={1} piste="green">
              Bize ulaşın
            </PisteHeading>
            <address className="display mt-8 text-[clamp(2.25rem,1.6rem+2.6vw,4.25rem)] not-italic">
              <span className="block">{business.address.street}</span>
              <span className="block">
                {business.address.postalCode} {business.address.locality} / {business.address.region}
              </span>
            </address>
            {isOpen(business.address.detail) && (
              <p className="mt-2">
                Sokak ve tarif için <AskLink question="Dükkanınıza nasıl gelebilirim, sokak ve tarifi yazabilir misiniz?" />
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-2">
              <ButtonLink href={waLink()} external>
                <MessageCircle aria-hidden className="size-5" />
                WhatsApp ile yazın
                <span className="sr-only"> (yeni sekmede açılır)</span>
              </ButtonLink>
              <ButtonLink href={`tel:${business.phone.e164}`} variant="shade">
                <Phone aria-hidden className="size-5" />
                {business.phone.display}
              </ButtonLink>
            </div>
            <h2 className="display mt-10 text-[clamp(2rem,1.6rem+1.6vw,3rem)]">Çalışma saatleri</h2>
            <div className="mt-3">
              <HoursList />
            </div>
            {isOpen(business.season) && (
              <p className="mt-3">
                Sezon tarihleri için <AskLink question="Bu sezon ne zaman açılıyorsunuz?" />
              </p>
            )}
          </div>
          <MapEmbed />
        </div>
      </section>

      <section aria-labelledby="teklif" className="section-y bg-glacier-2">
        <div className="wrap">
          <PisteHeading id="teklif" n={2} piste="blue" className="mb-4">
            Skipasınızı doldurun
          </PisteHeading>
          <RentalBuilder />
        </div>
      </section>
    </main>
  );
}

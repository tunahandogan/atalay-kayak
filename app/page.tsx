import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { business, faqs } from "@/content/business";
import { Hero } from "@/components/Hero";
import { RentalBuilder } from "@/components/RentalBuilder";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { Steps } from "@/components/Steps";
import { LevelGuide } from "@/components/LevelGuide";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursList } from "@/components/HoursList";
import { Section, PisteHeading } from "@/components/ui/Section";

const inspectFaq = faqs.find((f) => f.q.includes("teslim alırken"));
const checks = ["Kayak tabanı ve kenarlar", "Bağlamalar", "Botun topuğu kaldırmadan sıkı oturması"];

export default function Home() {
  return (
    <main id="icerik">
      <Hero />

      <section id="skipas" aria-labelledby="skipas-baslik" className="bg-glacier pb-[var(--section-y)] pt-14 lg:pt-20">
        <div className="wrap">
          <PisteHeading
            id="skipas-baslik"
            n={1}
            piste="green"
            lead="Seçtikçe kart dolar, gün sayısı yazılır. Bitince WhatsApp'tan gönderin; fiyat ve müsaitliği size yazalım."
            className="mb-4"
          >
            Skipasınızı doldurun
          </PisteHeading>
          <RentalBuilder />
        </div>
      </section>

      <section aria-labelledby="ekipman-baslik" className="bg-paper pt-[var(--section-y)]">
        <div className="wrap flex flex-wrap items-end justify-between gap-6 pb-10">
          <PisteHeading
            id="ekipman-baslik"
            n={2}
            piste="blue"
            lead="Ne lazımsa seçin; fiyat ve müsaitliği WhatsApp'ta yazalım."
          >
            Pistte ihtiyacınız olan her şey
          </PisteHeading>
        </div>
        <EquipmentGrid />
      </section>

      <Section tone="glacier-2" labelledBy="adimlar-baslik">
        <PisteHeading id="adimlar-baslik" n={3} piste="red" className="mb-12">
          Üç adımda pistte
        </PisteHeading>
        <Steps />
      </Section>

      <Section tone="night" labelledBy="kontrol-baslik">
        <PisteHeading id="kontrol-baslik" n={4} piste="black" inverse>
          Teslimde birlikte kontrol
        </PisteHeading>
        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <p className="max-w-[40ch] text-lead">{inspectFaq?.a}</p>
          <ul className="grid content-start gap-6">
            {checks.map((c) => (
              <li key={c} className="display flex items-start gap-4 text-[clamp(1.75rem,0.6rem+4vw,4.25rem)]">
                <Check aria-hidden="true" strokeWidth={3.5} className="mt-[0.06em] size-[0.8em] shrink-0 text-paper" />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <section aria-labelledby="seviye-baslik" className="bg-glacier pt-[var(--section-y)]">
        <div className="wrap pb-10">
          <PisteHeading
            id="seviye-baslik"
            n={5}
            piste="green"
            lead="Pist haritalarındaki renkler zorluğu gösterir: yeşil en rahat, siyah en dik ve zordur. Seviyenizi anlatmanın kolay yolu bu renklerdir."
          >
            Hangi pist size uygun?
          </PisteHeading>
        </div>
        <LevelGuide />
        <div className="wrap py-4">
          <Link
            href="/rehber"
            className="inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
          >
            Beden ve seviye rehberi <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>
      </section>

      <Section tone="sky" labelledBy="yorum-baslik">
        <PisteHeading id="yorum-baslik" n={6} piste="blue" inverse className="mb-10">
          Müşteriler ne yazmış
        </PisteHeading>
        <Reviews />
      </Section>

      <Section tone="glacier-2" labelledBy="sss-baslik">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <div>
            <PisteHeading id="sss-baslik" n={7} piste="red">
              Aklınıza takılanlar
            </PisteHeading>
            <Link
              href="/kiralama#sss"
              className="mt-4 inline-flex min-h-11 items-center gap-2 font-semibold underline underline-offset-4"
            >
              Tüm sorular <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <Faq limit={4} />
        </div>
      </Section>

      <Section labelledBy="konum-baslik">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <PisteHeading id="konum-baslik" n={8} piste="black">
              {business.district}&apos;de buluşalım
            </PisteHeading>
            <address className="display mt-8 text-[clamp(2.25rem,1.6rem+2.6vw,4.25rem)] not-italic">
              <span className="block">{business.address.street}</span>
              <span className="block">
                {business.address.postalCode} {business.address.locality} / {business.address.region}
              </span>
            </address>
            <p className="mt-3">Plus code: {business.geo.plusCode}</p>
            <div className="mt-8">
              <HoursList />
            </div>
          </div>
          <MapEmbed />
        </div>
      </Section>
    </main>
  );
}

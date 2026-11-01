import { ArrowRight, ArrowUpRight, Check, MapPin, MessageCircle } from "lucide-react";
import { business, faqs, steps } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { Hero } from "@/components/Hero";
import { StatCounter } from "@/components/StatCounter";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { Steps } from "@/components/Steps";
import { LevelGuide } from "@/components/LevelGuide";
import { Reviews } from "@/components/Reviews";
import { Faq } from "@/components/Faq";
import { MapEmbed } from "@/components/MapEmbed";
import { HoursList } from "@/components/HoursList";
import { Reveal } from "@/components/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ButtonLink } from "@/components/ui/Button";

const handover = steps[2];
const inspectFaq = faqs.find((f) => f.q.includes("teslim alırken"));
const checks = ["Kayak tabanı ve kenarlar", "Bağlamalar", "Botun topuğu kaldırmadan sıkı oturması"];

export default function Home() {
  return (
    <main id="icerik">
      <Hero />

      {/* Güven şeridi */}
      <Section tone="glacier-2" padded={false} className="py-10 md:py-12">
        <Reveal className="grid items-center gap-8 md:grid-cols-12">
          <div className="md:col-span-5">
            <StatCounter />
          </div>
          <ul className="grid gap-4 md:col-span-7 sm:grid-cols-2">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-flag-ink" />
              <span>
                <span className="block font-bold">
                  {business.district}, {business.city}
                </span>
                <span className="text-[0.9375rem] text-muted">{business.address.landmark}</span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-flag-ink" />
              <span>
                <span className="block font-bold">{handover.title}</span>
                <span className="text-[0.9375rem] text-muted">{handover.text}</span>
              </span>
            </li>
          </ul>
        </Reveal>
      </Section>

      {/* Ekipman */}
      <Section labelledBy="ekipman-baslik">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="ekipman-baslik"
            eyebrow="EKİPMAN"
            lead="Ne lazımsa seçin; fiyat ve müsaitliği WhatsApp'ta yazalım."
          >
            Pistte ihtiyacınız olan her şey
          </SectionHeading>
          <ButtonLink href="/kiralama" variant="dark">
            Tüm ekipman <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <EquipmentGrid />
        </Reveal>
      </Section>

      {/* Nasıl çalışır */}
      <Section tone="glacier-2" labelledBy="adimlar-baslik">
        <Reveal>
          <SectionHeading id="adimlar-baslik" eyebrow="NASIL ÇALIŞIR">
            Üç adımda pistte
          </SectionHeading>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <Steps />
        </Reveal>
      </Section>

      {/* Teslimde birlikte kontrol */}
      <Section tone="night" labelledBy="kontrol-baslik">
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SectionHeading id="kontrol-baslik" tone="dark" eyebrow="TESLİMDE" lead={inspectFaq?.a}>
              Teslimde birlikte kontrol
            </SectionHeading>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <ul className="grid gap-3">
              {checks.map((c) => (
                <li key={c} className="flex items-center gap-4 rounded-2xl bg-night-2 px-5 py-4 font-semibold">
                  <span aria-hidden="true" className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-piste-green">
                    <Check className="h-4 w-4 text-white" />
                  </span>
                  {c}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      {/* Seviye */}
      <Section labelledBy="seviye-baslik">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="seviye-baslik"
            eyebrow="SEVİYE"
            lead="Pist renkleri seviyeyi anlatır; boyut ve numara mağazada denenerek netleşir."
          >
            Hangi pist size uygun?
          </SectionHeading>
          <ButtonLink href="/rehber" variant="outline">
            Beden rehberi <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <LevelGuide compact />
        </Reveal>
      </Section>

      {/* Yorumlar */}
      <Section tone="glacier-2" labelledBy="yorum-baslik">
        <Reveal>
          <SectionHeading id="yorum-baslik" eyebrow="YORUMLAR">
            Müşteriler ne yazmış
          </SectionHeading>
        </Reveal>
        <Reveal className="mt-12" delay={0.1}>
          <Reviews />
        </Reveal>
      </Section>

      {/* SSS */}
      <Section labelledBy="sss-baslik">
        <Reveal>
          <SectionHeading id="sss-baslik" eyebrow="SIK SORULANLAR">
            Aklınıza takılanlar
          </SectionHeading>
        </Reveal>
        <Reveal className="mt-10 max-w-3xl" delay={0.1}>
          <Faq limit={4} />
        </Reveal>
      </Section>

      {/* Konum */}
      <Section tone="glacier-2" labelledBy="konum-baslik">
        <div className="grid items-stretch gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading id="konum-baslik" eyebrow="KONUM">
              {business.district}&apos;de buluşalım
            </SectionHeading>
            <p className="mt-5 text-lead text-muted">
              {business.address.landmark} / {business.city}
            </p>
            <div className="mt-8">
              <HoursList />
            </div>
            <ButtonLink href={business.maps.directionsUrl} variant="dark" external className="mt-8">
              Yol tarifi al <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </ButtonLink>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <MapEmbed className="h-[340px] w-full lg:h-full lg:min-h-[420px]" />
          </Reveal>
        </div>
      </Section>

      {/* Kapanış CTA */}
      <Section tone="night-2" labelledBy="cta-baslik">
        <Reveal className="max-w-4xl">
          <h2 id="cta-baslik" className="display text-[clamp(2.2rem,1rem+5.4vw,4.5rem)]">
            Tarihi yazın, müsaitliği söyleyelim
          </h2>
          <p className="mt-5 max-w-[50ch] text-lead text-mist">
            Mesaj hazır gelir; tek dokunuşla {business.name} ekibine ulaşır.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={waLink()} external className="px-8 py-4 text-base">
              <MessageCircle aria-hidden="true" className="h-5 w-5" />
              WhatsApp&apos;tan yazın
            </ButtonLink>
            <ButtonLink href={`tel:${business.phone.e164}`} variant="outline-dark" className="px-8 py-4 text-base">
              {business.phone.display}
            </ButtonLink>
          </div>
        </Reveal>
      </Section>
    </main>
  );
}

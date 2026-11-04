import type { Metadata } from "next";
import { business } from "@/content/business";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { RentalBuilder } from "@/components/RentalBuilder";
import { Faq } from "@/components/Faq";
import { PisteHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Kiralama",
  description: `${business.displayName}: kayak takımı, snowboard, kıyafet, kask ve gözlük kiralama. Ekipmanı ve günleri seçin, WhatsApp'tan fiyat alın.`,
};

const checks = [
  { title: "Bot ayağınızda denenir", text: "Numaranızı bilmeseniz de olur; bot mağazada ayağınızda denenerek seçilir." },
  { title: "Kayak ya da board birlikte bakılır", text: "Taban, kenarlar ve bağlamalar teslimde sizinle birlikte kontrol edilir." },
  { title: "Ayarlar yapılır, sonra çıkarsınız", text: "Bağlama ve boy seviyenize göre ayarlanır; sorularınızı o an sorabilirsiniz." },
];

export default function KiralamaPage() {
  return (
    <main id="icerik" className="bg-glacier text-ink">
      <section className="pb-[var(--section-y)] pt-10 lg:pt-16">
        <div className="wrap">
          <PisteHeading
            as="h1"
            n={1}
            piste="green"
            lead={`${business.city} ${business.district}'de kayak ve snowboard için gereken ekipman tek yerde. Kartı doldurup WhatsApp'tan gönderin; günlük fiyatı yazalım.`}
            className="mb-4"
          >
            Fiyatı WhatsApp&apos;tan alın
          </PisteHeading>
          <RentalBuilder />
        </div>
      </section>

      <section aria-labelledby="ekipman" className="bg-paper pt-[var(--section-y)]">
        <div className="wrap pb-10">
          <PisteHeading id="ekipman" n={2} piste="blue">
            Ekipman detayları
          </PisteHeading>
        </div>
        <EquipmentGrid />
      </section>

      <section aria-labelledby="kontrol" className="on-night section-y bg-night text-paper">
        <div className="wrap">
          <PisteHeading id="kontrol" n={3} piste="red" className="mb-10">
            Teslimde birlikte kontrol
          </PisteHeading>
          <ol className="grid gap-8 md:ml-[8%]">
            {checks.map((c) => (
              <li key={c.title}>
                <h3 className="display text-[clamp(2rem,1.5rem+2vw,3.5rem)]">{c.title}</h3>
                <p className="mt-2 max-w-[52ch] text-lead">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="sss" id="sss" className="section-y bg-glacier-2">
        <div className="wrap grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
          <PisteHeading id="sss-baslik" n={4} piste="black">
            Sık sorulanlar
          </PisteHeading>
          <Faq />
        </div>
      </section>
    </main>
  );
}

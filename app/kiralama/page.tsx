import type { Metadata } from "next";
import { business } from "@/content/business";
import { EquipmentGrid } from "@/components/EquipmentGrid";
import { RentalBuilder } from "@/components/RentalBuilder";
import { Faq } from "@/components/Faq";

export const metadata: Metadata = {
  title: "Kiralama",
  description: `${business.displayName}: kayak takımı, snowboard, kıyafet, kask ve gözlük kiralama. Ekipmanı ve günleri seçin, WhatsApp'tan fiyat alın.`,
};

const wrap = "mx-auto max-w-6xl px-4 sm:px-6";
const h2 = "font-display text-3xl font-extrabold leading-tight tracking-tight text-ink sm:text-4xl";

const checks = [
  { title: "Bot ayağınızda denenir", text: "Numaranızı bilmeseniz de olur; bot mağazada ayağınızda denenerek seçilir." },
  { title: "Kayak ya da board birlikte bakılır", text: "Taban, kenarlar ve bağlamalar teslimde sizinle birlikte kontrol edilir." },
  { title: "Ayarlar yapılır, sonra çıkarsınız", text: "Bağlama ve boy seviyenize göre ayarlanır; sorularınızı o an sorabilirsiniz." },
];

export default function KiralamaPage() {
  return (
    <main id="icerik" className="bg-glacier text-ink">
      <section className={`${wrap} pb-12 pt-12 md:pb-16 md:pt-20`}>
        <p className="text-sm font-bold uppercase tracking-widest text-flag-ink">Kiralama</p>
        <h1 className="mt-2 max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
          Ekipmanı seçin, fiyatı WhatsApp&apos;tan alın
        </h1>
        <p className="mt-5 max-w-[58ch] text-lg text-muted">
          {business.city} {business.district}&apos;de kayak ve snowboard için gereken ekipman tek yerde. Günlük fiyatlar
          için aşağıdaki seçimi yapıp mesajı gönderin.
        </p>
      </section>

      <section aria-labelledby="ekipman" className={`${wrap} pb-16 md:pb-24`}>
        <h2 id="ekipman" className={`${h2} mb-8`}>Ekipman detayları</h2>
        <EquipmentGrid />
      </section>

      <section aria-labelledby="kontrol" className="bg-glacier-2 py-16 md:py-24">
        <div className={wrap}>
          <h2 id="kontrol" className={h2}>Teslimde birlikte kontrol</h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {checks.map((c, i) => (
              <li key={c.title} className="rounded-2xl bg-white p-6">
                <span aria-hidden className="font-display text-4xl font-extrabold text-flag">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-display text-lg font-extrabold leading-tight">{c.title}</h3>
                <p className="mt-2 text-muted">{c.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="olustur" className={`${wrap} py-16 md:py-24`}>
        <h2 id="olustur" className={`${h2} mb-8`}>Mesajınızı hazırlayın</h2>
        <RentalBuilder variant="page" />
      </section>

      <section aria-labelledby="sss" className={`${wrap} pb-16 md:pb-24`}>
        <h2 id="sss" className={`${h2} mb-8`}>Sık sorulanlar</h2>
        <div className="max-w-3xl">
          <Faq />
        </div>
      </section>
    </main>
  );
}

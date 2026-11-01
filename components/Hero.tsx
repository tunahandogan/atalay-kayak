import { business, levels } from "@/content/business";
import { RentalBuilder } from "@/components/RentalBuilder";
import { HeroScene, HeroTitle } from "@/components/ui/HeroMotion";

const pisteBg = {
  green: "bg-piste-green",
  blue: "bg-piste-blue",
  red: "bg-piste-red",
  black: "bg-piste-black",
} as const;

export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-baslik" className="relative isolate overflow-hidden pb-14 pt-8 md:pb-24 md:pt-14">
      <HeroScene />
      <div className="wrap relative grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-6">
          <p className="mb-4 inline-flex items-center gap-2 text-[0.8125rem] font-bold tracking-[0.14em] text-flag-ink">
            <span aria-hidden="true" className="flex gap-1">
              {levels.map((l) => (
                <span key={l.id} className={`piste-dot ${pisteBg[l.piste]}`} style={{ width: 8, height: 8 }} />
              ))}
            </span>
            {business.district.toLocaleUpperCase("tr")} · {business.city.toLocaleUpperCase("tr")}
          </p>
          <HeroTitle
            id="hero-baslik"
            lines={[
              ["Ekipmanı", "seç,"],
              ["pistte", "buluşalım."],
            ]}
          />
          <p className="mt-5 max-w-[46ch] text-lead text-muted">
            Ekipmanı, gün sayısını ve seviyeni seç; hazır mesaj WhatsApp&apos;ta açılsın. Bot ayağında denenerek seçilir.
          </p>
        </div>
        <div className="lg:col-span-6">
          <RentalBuilder variant="hero" />
        </div>
      </div>
    </section>
  );
}

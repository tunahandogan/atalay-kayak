import { ArrowDown } from "lucide-react";
import { business, demo } from "@/content/business";
import { HeroMap } from "@/components/map/HeroMap";
import { MapLive } from "@/components/map/MapLive";
import { LevelLegend } from "@/components/LevelLegend";
import { PassCard } from "@/components/PassCard";

const CTA =
  "inline-flex min-h-14 items-center justify-center gap-2.5 bg-flag px-6 font-display text-[1.625rem] font-extrabold uppercase leading-none text-paper transition-[background-color,transform] duration-150 hover:bg-flag-ink active:scale-[0.98]";

function Note() {
  const g = business.google;
  return (
    <p className="mt-1.5 bg-paper px-2.5 py-2 text-small text-night max-lg:mt-2 max-lg:bg-transparent max-lg:px-0">
      Google&apos;da {g.rating.toLocaleString("tr-TR", { minimumFractionDigits: 1 })} puan, {g.reviewCount} yorum.{" "}
      {demo.mapNote}
    </p>
  );
}

export function Hero() {
  return (
    <section data-hero aria-labelledby="hero-baslik" className="on-night relative overflow-hidden bg-sky text-paper">
      <div className="wrap relative z-10 lg:flex lg:min-h-[max(720px,calc(100svh-var(--header-h)))] lg:flex-col lg:pointer-events-none">
        <div className="pt-7 lg:pointer-events-auto lg:pt-12">
          <h1 id="hero-baslik" className="display text-poster lg:text-[clamp(5rem,8.3vw,8.5rem)]">
            Ekipmanı seçin,
            <br />
            pistte buluşalım.
          </h1>
          <p className="mt-3 max-w-[34ch] text-lead lg:mt-5">
            {business.city} {business.district}&apos;de kayak ve snowboard kiralama. Pistinizi seçin, skipası doldurun.
          </p>
        </div>

        {/* Geniş ekran: lejant karın üstünde, sol altta */}
        <div className="mb-8 mt-auto hidden max-w-[360px] xl:max-w-[420px] bg-night p-1.5 lg:block lg:pointer-events-auto">
          <p className="px-1.5 pb-2.5 pt-1.5 font-display text-[1.5rem] font-bold uppercase leading-none text-paper">
            Lejant: seviyeniz hangi pist?
          </p>
          <div className="text-night">
            <LevelLegend />
          </div>
          <a href="#skipas" className={`${CTA} mt-1.5 w-full xl:hidden`}>
            Skipası doldurun <ArrowDown aria-hidden className="size-6" />
          </a>
          <Note />
        </div>
      </div>

      <MapLive className="relative -mt-6 h-[clamp(290px,84vw,600px)] lg:absolute lg:inset-0 lg:mt-0 lg:h-full">
        <HeroMap className="absolute inset-0 h-full w-full" />
      </MapLive>

      {/* Geniş ekranda skipas haritanın üstünde asılı durur; lejant seçimi anında buraya yazılır */}
      <div className="absolute right-[var(--gutter)] top-0 z-10 hidden w-[272px] xl:block">
        <div aria-hidden="true">
          <PassCard mini />
        </div>
        <a href="#skipas" className={`${CTA} mt-2 w-full`}>
          Skipası doldurun <ArrowDown aria-hidden className="size-6" />
        </a>
      </div>

      {/* Telefon ve tablet: lejant çizimin altında */}
      <div className="on-light relative bg-glacier pb-2 text-night lg:hidden">
        <div className="wrap">
          <p className="font-display text-[1.5rem] font-bold uppercase leading-none">Lejant: seviyeniz hangi pist?</p>
          <div className="mt-3">
            <LevelLegend />
          </div>
          <a href="#skipas" className={`${CTA} mt-1.5 w-full`}>
            Skipası doldurun <ArrowDown aria-hidden className="size-6" />
          </a>
          <Note />
        </div>
      </div>
    </section>
  );
}

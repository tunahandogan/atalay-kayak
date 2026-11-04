"use client";

import { useEffect, useRef } from "react";
import { business, equipment, levels } from "@/content/business";
import { PisteSign } from "@/components/PisteSign";
import { useRental } from "@/components/RentalContext";

const PISTE_NAMES = { green: "yeşil", blue: "mavi", red: "kırmızı", black: "siyah" } as const;

function shortDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short" }).format(new Date(y, m - 1, d));
}

/** İp ve klips: iki askı bir halkada birleşir, halka karttaki delikten geçer. */
function Lanyard({ tall }: { tall?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 120 120"
      preserveAspectRatio="none"
      className={`pointer-events-none relative z-10 mx-auto -mb-5 block w-[120px] ${tall ? "h-[124px]" : "h-[92px]"}`}
    >
      <path d="M14 0h18l36 92h-16Z" fill="var(--color-flag)" />
      <path d="M106 0H88L52 92h16Z" fill="var(--color-flag-ink)" />
      <rect x="51" y="84" width="18" height="12" fill="var(--color-night)" />
      <path
        d="M60 96v4M54 100h12a3 3 0 0 1 3 3v7a9 9 0 0 1-18 0v-7a3 3 0 0 1 3-3Z"
        fill="none"
        stroke="var(--color-metal)"
        strokeWidth="4"
      />
    </svg>
  );
}

/** Kartın kodu: süs değil, kartı kart yapan parça; sabit çizgiler, veri taşımaz. */
const CODE_PATH = (() => {
  const bars = [2, 3, 4, 2, 1, 5, 2, 3, 1, 2, 4, 3];
  let x = 0;
  let d = "";
  for (let i = 0; i < 28; i++) {
    const w = bars[i % bars.length];
    d += `M${x} 0h${w}v26h-${w}Z`;
    x += w + bars[(i + 5) % bars.length];
  }
  return { d, width: x };
})();

function Code() {
  return (
    <svg
      aria-hidden="true"
      viewBox={`0 0 ${CODE_PATH.width} 26`}
      preserveAspectRatio="none"
      className="mt-4 block h-[26px] w-full"
    >
      <path d={CODE_PATH.d} fill="var(--color-night)" />
    </svg>
  );
}

function Row({ label, value, className = "", big }: { label: string; value?: string; className?: string; big?: boolean }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <dt className="text-small text-muted">{label}</dt>
      <dd
        key={value ?? "bos"}
        className={`font-display font-bold leading-[1.05] ${big ? "text-[1.625rem]" : "text-[1.5rem]"} ${
          value ? "pass-print text-night" : "text-muted"
        }`}
      >
        {value ?? "Seçilmedi"}
      </dd>
    </div>
  );
}

/**
 * Askılı skipas: seçimler karta canlı yazılır. `mini` afişte asılı küçük hâlidir.
 * Kart lift bileti değildir; kiralama isteğinin özetidir (kartın altında yazar).
 */
export function PassCard({ mini = false, live = false }: { mini?: boolean; live?: boolean }) {
  const { items, people, from, to, level, shoe, days, piste } = useRental();
  const card = useRef<HTMLDivElement>(null);

  const stamp = [items.join(), people, from, to, level, shoe].join("|");
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    const el = card.current;
    if (!el || typeof el.animate !== "function") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Seçim yapılınca kart ipinde bir kez hafifçe sallanır
    el.animate(
      [{ transform: "rotate(0deg)" }, { transform: "rotate(1.4deg)" }, { transform: "rotate(-0.7deg)" }, { transform: "rotate(0deg)" }],
      { duration: 420, easing: "ease-out" },
    );
  }, [stamp]);

  const names = items.map((id) => equipment.find((e) => e.id === id)?.name ?? id);
  const selected = levels.find((l) => l.id === level);
  const dates = from && to ? (from === to ? shortDate(from) : `${shortDate(from)} – ${shortDate(to)}`) : from ? `${shortDate(from)} –` : to ? `– ${shortDate(to)}` : undefined;

  return (
    <div ref={card} data-pass-card className="origin-top">
      {/* Formda kart dükkan askı rayından sarkar */}
      {!mini && <div aria-hidden="true" className="mx-auto h-2 w-44 bg-night" />}
      <Lanyard tall={mini} />
      <div className={`relative bg-paper text-night ${mini ? "rounded-[14px]" : "rounded-[18px]"}`}>
        <div className={`bg-flag text-paper ${mini ? "rounded-t-[14px] px-4 pb-3 pt-7" : "rounded-t-[18px] px-5 pb-4 pt-9"}`}>
          {/* Askı deliği */}
          <span aria-hidden="true" className="absolute left-1/2 top-2.5 h-3 w-10 -translate-x-1/2 rounded-full bg-night" />
          <p className={`display ${mini ? "text-[1.875rem]" : "text-[2.5rem]"}`}>{business.displayName}</p>
          <p className="mt-1 text-small font-semibold">Skipas · {business.district}</p>
        </div>

        <div className={mini ? "px-4 py-3" : "px-5 py-5"}>
          <div className="flex items-end justify-between gap-3">
            <div>
              <p
                key={days ?? "bos"}
                className={`pass-print display tabular-nums ${days ? "text-flag-ink" : "text-line"} ${mini ? "text-[3.25rem]" : "text-[4.75rem]"}`}
              >
                {days ?? "0"}
              </p>
              <p className="mt-1 text-small font-semibold">{days ? "gün" : "İki tarihi seçin, gün yazılsın"}</p>
            </div>
            {piste && (
              <PisteSign
                key={piste}
                piste={piste}
                size={mini ? "2.75rem" : "4rem"}
                className="pass-print mb-1"
              />
            )}
          </div>

          <dl className={`grid grid-cols-2 gap-x-4 ${mini ? "mt-3 gap-y-2" : "mt-4 gap-y-3"}`}>
            {!mini && <Row label="Ekipman" value={names.length ? names.join(", ") : undefined} className="col-span-2" big />}
            {mini && <Row label="Ekipman" value={names.length ? `${names.length} parça` : undefined} />}
            {!mini && <Row label="Tarih" value={dates} className="col-span-2" />}
            <Row label="Kişi" value={String(people)} />
            {mini && <Row label="Tarih" value={dates} />}
            <Row label="Seviye" value={selected ? (mini ? selected.label : `${selected.label}, ${PISTE_NAMES[selected.piste]} pist`) : undefined} />
            {!mini && shoe && <Row label="Ayakkabı" value={shoe} />}
          </dl>
          {!mini && <Code />}
        </div>
      </div>
      {live && (
        <p className="sr-only" aria-live="polite">
          {days ? `${days} gün. ` : ""}
          {selected ? `${selected.label} seviyesi, ${PISTE_NAMES[selected.piste]} pist.` : ""}
        </p>
      )}
    </div>
  );
}

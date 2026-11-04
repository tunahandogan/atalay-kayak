"use client";

import { useId, useSyncExternalStore } from "react";
import { CalendarDays, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { business, equipment, levels } from "@/content/business";
import { waLink } from "@/lib/whatsapp";
import { MiniMap } from "@/components/map/MiniMap";
import { PassCard } from "@/components/PassCard";
import { PisteSign } from "@/components/PisteSign";
import { useRental } from "@/components/RentalContext";

const SHOE_SIZES = Array.from({ length: 19 }, (_, i) => String(30 + i));

function noopSubscribe() {
  return () => {};
}

function todayISO() {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm0 18.1c-1.5 0-2.9-.4-4.1-1.1l-.3-.2-3.1.9.9-3-.2-.3a8.1 8.1 0 1 1 6.8 3.7Zm4.5-6c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.6 6.6 0 0 1-3.3-2.9c-.2-.4.2-.4.7-1.3.1-.2 0-.3 0-.5l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.7 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3Z" />
    </svg>
  );
}

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("tr-TR", { day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
}

/**
 * Görünümü biz çizeriz; gerçek tarih alanı görünmez hâlde üstte durur ve telefonun kendi seçicisini açar.
 * Böylece iOS'un küçülmeyen yerel kutusu yerleşimi bozamaz, her tarayıcıda aynı görünür.
 */
function DateField({
  label,
  value,
  min,
  onChange,
}: {
  label: string;
  value: string;
  min?: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="relative flex h-16 min-w-0 cursor-pointer flex-col justify-center bg-paper px-3 has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-piste-blue">
      <span className="text-small leading-5 text-muted">{label}</span>
      <span className="flex min-w-0 items-center justify-between gap-1.5 text-base leading-6">
        <span className={`truncate ${value ? "font-semibold text-night" : "text-muted"}`}>
          {value ? formatDate(value) : "Tarih seç"}
        </span>
        <CalendarDays aria-hidden className="size-5 shrink-0 text-flag-ink" />
      </span>
      <input
        type="date"
        aria-label={label}
        value={value}
        min={min || undefined}
        onChange={(e) => onChange(e.target.value)}
        className="date-input"
      />
    </label>
  );
}

function SendButton({ href, className = "" }: { href: string; className?: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-send
      className={`min-h-16 items-center justify-center gap-3 bg-flag px-6 font-display text-[1.75rem] font-extrabold uppercase leading-none text-paper transition-[background-color,transform] duration-150 hover:bg-flag-ink active:scale-[0.98] ${className}`}
    >
      <WhatsAppIcon className="size-6 shrink-0" />
      WhatsApp&apos;tan gönder
      <span className="sr-only"> (yeni sekmede açılır)</span>
    </a>
  );
}

const legendCls = "mb-3 flex flex-wrap items-baseline gap-x-2 font-display text-[1.75rem] font-bold uppercase leading-none text-night";
const optionalCls = "font-sans text-small font-normal normal-case text-muted";

/** Kiralama formu: solda (telefonda üstte) askılı skipas canlı dolar, yanında seçimler. */
export function RentalBuilder() {
  const uid = useId();
  const { items, people, from, to, level, shoe, days, piste, message, toggle, setPeople, setFrom, setTo, setLevel, setShoe } =
    useRental();
  // Bugünün tarihi yalnızca istemcide okunur (cacheComponents: sunucuda sabit olmayan değer üretilmez)
  const min = useSyncExternalStore(noopSubscribe, todayISO, () => "");
  const href = waLink(message);

  return (
    <form
      data-pass
      onSubmit={(e) => e.preventDefault()}
      aria-label="Kiralama isteği"
      className="grid gap-x-[clamp(32px,6vw,96px)] lg:grid-cols-[minmax(320px,400px)_minmax(0,1fr)]"
    >
      <div className="min-w-0 lg:sticky lg:top-[calc(var(--header-h)+8px)] lg:self-start">
        <PassCard live />
        <SendButton href={href} className="mt-3 hidden w-full lg:flex" />
        <p className="mt-3 hidden text-small text-muted lg:block">
          Bu kart lift bileti değil, kiralama isteğinizin özetidir.
        </p>
      </div>

      <div className="min-w-0">
        {/* Telefonda kart ekrandan çıkınca özet burada kalır */}
        <div
          aria-hidden="true"
          className="sticky top-[var(--header-h)] z-20 -mx-[var(--gutter)] mt-6 flex min-h-12 items-center justify-between gap-3 bg-night px-[var(--gutter)] py-2 text-small font-semibold text-paper lg:hidden"
        >
          <span className="min-w-0 truncate">
            {items.length ? `${items.length} ekipman` : "Ekipman yok"} · {people} kişi ·{" "}
            {days ? `${days} gün` : "tarih yok"}
          </span>
          {piste && <PisteSign key={piste} piste={piste} size="1.75rem" inverse={piste === "black"} className="pass-print" />}
        </div>

        <div className="flex flex-col gap-9 pt-7 lg:pt-[100px]">
          <fieldset className="min-w-0">
            <legend className={legendCls}>
              Ekipman <span className={optionalCls}>(birden fazla seçilebilir)</span>
            </legend>
            <div className="grid grid-cols-2 gap-2">
              {equipment.map((e) => {
                const on = items.includes(e.id);
                return (
                  <button
                    key={e.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => toggle(e.id)}
                    className={`flex min-h-16 items-center justify-between gap-2 px-3 py-2 text-left text-base font-semibold leading-tight transition-colors duration-150 ${
                      on ? "bg-night text-paper" : "bg-paper text-night hover:bg-glacier-2"
                    }`}
                  >
                    {e.name}
                    {on && <Check aria-hidden className="size-5 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <div className="grid gap-9 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)] sm:gap-4">
            <fieldset className="min-w-0">
              <legend className={legendCls}>Kişi</legend>
              <div className="flex h-16 items-center justify-between bg-paper">
                <button
                  type="button"
                  aria-label="Kişi sayısını azalt"
                  disabled={people <= 1}
                  onClick={() => setPeople((p) => Math.max(1, p - 1))}
                  className="flex h-full w-14 items-center justify-center hover:bg-glacier-2 disabled:opacity-35"
                >
                  <Minus aria-hidden className="size-5" />
                </button>
                <output aria-live="polite" aria-label="Kişi sayısı" className="w-10 text-center font-display text-[1.75rem] font-bold">
                  {people}
                </output>
                <button
                  type="button"
                  aria-label="Kişi sayısını artır"
                  disabled={people >= 20}
                  onClick={() => setPeople((p) => Math.min(20, p + 1))}
                  className="flex h-full w-14 items-center justify-center hover:bg-glacier-2 disabled:opacity-35"
                >
                  <Plus aria-hidden className="size-5" />
                </button>
              </div>
            </fieldset>

            <fieldset className="min-w-0">
              <legend className={legendCls}>Tarihler</legend>
              <div className="grid grid-cols-2 gap-2">
                {/* iOS seçicisi `min`i uygulamaz; geçmiş tarih burada düzeltilir */}
                <DateField
                  label="Alış"
                  value={from}
                  min={min}
                  onChange={(v) => {
                    const next = v && min && v < min ? min : v;
                    setFrom(next);
                    if (to && next && to < next) setTo(next);
                  }}
                />
                <DateField
                  label="Dönüş"
                  value={to}
                  min={from || min}
                  onChange={(v) => {
                    const floor = from || min;
                    setTo(v && floor && v < floor ? floor : v);
                  }}
                />
              </div>
              <p aria-live="polite" className="mt-2 min-h-6 text-small text-muted">
                {days ? (
                  <>
                    Toplam <strong className="text-night">{days} gün</strong>
                  </>
                ) : (
                  "İki tarihi seçince gün sayısı karta yazılır."
                )}
              </p>
            </fieldset>
          </div>

          <fieldset className="min-w-0">
            <legend className={legendCls}>
              Seviye, yani pistiniz <span className={optionalCls}>(isteğe bağlı)</span>
            </legend>
            <div className="grid gap-2 md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
              <MiniMap />
              <div className="grid grid-cols-2 gap-2">
                {levels.map((l) => {
                  const on = level === l.id;
                  return (
                    <button
                      key={l.id}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setLevel(on ? undefined : l.id)}
                      className={`flex min-h-20 flex-col items-start justify-center gap-1 px-3 py-2 text-left transition-colors duration-150 ${
                        on ? "bg-night text-paper" : "bg-paper text-night hover:bg-glacier-2"
                      }`}
                    >
                      <span className="flex items-center gap-1.5 font-semibold leading-tight">
                        <PisteSign piste={l.piste} size="1.25rem" inverse={on && l.piste === "black"} />
                        {l.label}
                      </span>
                      <span className={`text-small leading-snug ${on ? "text-mist" : "text-muted"}`}>{l.hint}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </fieldset>

          <div>
            <label htmlFor={`${uid}-shoe`} className={legendCls}>
              Ayakkabı numarası <span className={optionalCls}>(isteğe bağlı)</span>
            </label>
            <select
              id={`${uid}-shoe`}
              value={shoe}
              onChange={(e) => setShoe(e.target.value)}
              className="h-14 w-full bg-paper px-3 text-base text-night"
            >
              <option value="">Bilmiyorum / sonra söylerim</option>
              {SHOE_SIZES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <p className="mt-2 text-small text-muted">Bot mağazada ayağınızda denenerek seçilir.</p>
          </div>

          <details className="group bg-glacier-2">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-4 font-semibold [&::-webkit-details-marker]:hidden">
              Gidecek mesajı görün
              <ChevronDown aria-hidden className="size-5 shrink-0 text-flag-ink transition-transform duration-150 group-open:rotate-180" />
            </summary>
            <p className="whitespace-pre-line px-4 pb-4">{message}</p>
          </details>

          <div>
            <SendButton href={href} className="flex w-full lg:hidden" />
            <p className="mt-3 text-small text-muted">
              Ad, telefon ya da e-posta istemiyoruz. Mesaj {business.phone.display} numarasına WhatsApp&apos;ta açılır.
              <span className="lg:hidden"> Bu kart lift bileti değil, kiralama isteğinizin özetidir.</span>
            </p>
          </div>
        </div>
      </div>
    </form>
  );
}

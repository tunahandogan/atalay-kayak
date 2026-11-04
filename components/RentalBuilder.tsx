"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CalendarDays, Check, ChevronDown, Minus, Plus } from "lucide-react";
import { business, equipment, levels } from "@/content/business";
import { rentalDays, rentalMessage, waLink } from "@/lib/whatsapp";

const SHOE_SIZES = Array.from({ length: 19 }, (_, i) => String(30 + i));

const DOT = {
  green: "bg-piste-green",
  blue: "bg-piste-blue",
  red: "bg-piste-red",
  black: "bg-piste-black",
} as const;

const RING = {
  green: "border-piste-green",
  blue: "border-piste-blue",
  red: "border-piste-red",
  black: "border-piste-black",
} as const;

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
    <label className="relative flex h-14 min-w-0 cursor-pointer flex-col justify-center rounded-xl border border-line bg-glacier px-3 has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-2 has-[input:focus-visible]:outline-flag-ink">
      <span className="text-xs leading-4 text-muted">{label}</span>
      <span className="flex min-w-0 items-center justify-between gap-1.5 text-sm leading-5">
        <span className={`truncate ${value ? "font-semibold text-night" : "text-muted"}`}>
          {value ? formatDate(value) : "Tarih seç"}
        </span>
        <CalendarDays aria-hidden className="size-4 shrink-0 text-flag" />
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

export function RentalBuilder({ variant = "page" }: { variant?: "hero" | "page" }) {
  const compact = variant === "hero";
  const reduce = useReducedMotion();
  const uid = useId();
  const [items, setItems] = useState<string[]>([]);
  const [people, setPeople] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [level, setLevel] = useState<string | undefined>();
  const [shoe, setShoe] = useState("");
  const [open, setOpen] = useState(!compact);
  // Bugünün tarihi yalnızca istemcide okunur (cacheComponents: sunucuda sabit olmayan değer üretilmez)
  const min = useSyncExternalStore(noopSubscribe, todayISO, () => "");

  const days = rentalDays(from, to);
  const message = useMemo(
    () => rentalMessage({ items, people, from, to, level, shoeSize: shoe || undefined }),
    [items, people, from, to, level, shoe],
  );

  const spring = reduce ? { duration: 0 } : { type: "spring" as const, stiffness: 500, damping: 40 };

  const pad = compact ? "p-4 sm:p-5" : "p-5 sm:p-8";
  const gap = compact ? "gap-4" : "gap-7";
  const legend = "mb-2 flex items-baseline gap-2 font-display text-sm font-bold uppercase tracking-wide text-night";
  const num = "inline-flex size-5 items-center justify-center rounded-full bg-flag text-xs font-bold text-white";
  const focus = "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink";
  // 16px: iOS, daha küçük yazılı alana dokununca sayfayı yakınlaştırır
  const field = `h-11 w-full rounded-xl border border-line bg-glacier px-3 text-base text-night ${focus}`;

  const toggle = (id: string) => setItems((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  const extra = (
    <div className="flex flex-col gap-5">
      <fieldset className="min-w-0">
        <legend className={legend}>
          <span className={num}>4</span> Seviye{" "}
          <span className="font-sans text-xs font-normal normal-case text-muted">(isteğe bağlı)</span>
        </legend>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {levels.map((l) => {
            const on = level === l.id;
            return (
              <button
                key={l.id}
                type="button"
                aria-pressed={on}
                onClick={() => setLevel(on ? undefined : l.id)}
                className={`relative flex min-h-16 flex-col items-start justify-center gap-0.5 rounded-xl border-2 px-3 py-2 text-left transition-colors ${focus} ${
                  on ? `${RING[l.piste]} bg-glacier-2` : "border-line bg-white hover:border-night/40"
                }`}
              >
                <span className="flex items-center gap-2 text-sm font-semibold text-night">
                  <motion.span
                    aria-hidden
                    animate={reduce ? undefined : { scale: on ? 1.25 : 1 }}
                    transition={spring}
                    className={`size-3.5 shrink-0 rounded-full ${DOT[l.piste]}`}
                  />
                  {l.label}
                </span>
                <span className="text-xs leading-snug text-muted">{l.hint}</span>
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor={`${uid}-shoe`} className={legend}>
          <span className={num}>5</span> Ayakkabı numarası{" "}
          <span className="font-sans text-xs font-normal normal-case text-muted">(isteğe bağlı)</span>
        </label>
        <select id={`${uid}-shoe`} value={shoe} onChange={(e) => setShoe(e.target.value)} className={field}>
          <option value="">Bilmiyorum / sonra söylerim</option>
          {SHOE_SIZES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="mt-1.5 text-xs text-muted">Bot mağazada ayağınızda denenerek seçilir.</p>
      </div>

      <div className="rounded-xl border border-line bg-glacier p-3.5">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-muted">Gidecek mesaj</p>
        <motion.p
          key={message}
          initial={reduce ? false : { opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.2 }}
          className="whitespace-pre-line text-sm leading-relaxed text-night/85"
        >
          {message}
        </motion.p>
      </div>
    </div>
  );

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      aria-label="Kiralama isteği"
      className={`flex flex-col ${gap} rounded-2xl border border-line bg-white text-night ${pad}`}
    >
      <fieldset className="min-w-0">
        <legend className={legend}>
          <span className={num}>1</span> Ekipman{" "}
          <span className="font-sans text-xs font-normal normal-case text-muted">(birden fazla seçilebilir)</span>
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
                className={`relative flex min-h-12 items-center justify-between gap-2 overflow-hidden rounded-xl border px-3 py-2 text-left text-sm font-medium transition-colors ${focus} ${
                  on ? "border-transparent text-white" : "border-line text-night hover:border-night/40"
                }`}
              >
                <AnimatePresence>
                  {on && (
                    <motion.span
                      aria-hidden
                      initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      transition={spring}
                      className="absolute inset-0 bg-night"
                    />
                  )}
                </AnimatePresence>
                <span className="relative leading-tight">{e.name}</span>
                {on && <Check aria-hidden className="relative size-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </fieldset>

      {/* Geniş kapta üç eşit sütun: kişi, alış, dönüş aynı genişlik ve yükseklikte; darda alt alta */}
      <div className="@container">
      <div className="grid gap-4 @lg:grid-cols-3 @lg:gap-3">
        <fieldset className="min-w-0">
          <legend className={legend}>
            <span className={num}>2</span> Kişi sayısı
          </legend>
          <div className="flex h-14 items-center justify-between rounded-xl border border-line bg-glacier">
            <button
              type="button"
              aria-label="Kişi sayısını azalt"
              disabled={people <= 1}
              onClick={() => setPeople((p) => Math.max(1, p - 1))}
              className={`flex h-full w-12 items-center justify-center rounded-xl disabled:opacity-35 ${focus}`}
            >
              <Minus aria-hidden className="size-4" />
            </button>
            <output aria-live="polite" aria-label="Kişi sayısı" className="w-10 text-center font-display text-lg font-bold">
              {people}
            </output>
            <button
              type="button"
              aria-label="Kişi sayısını artır"
              disabled={people >= 20}
              onClick={() => setPeople((p) => Math.min(20, p + 1))}
              className={`flex h-full w-12 items-center justify-center rounded-xl disabled:opacity-35 ${focus}`}
            >
              <Plus aria-hidden className="size-4" />
            </button>
          </div>
        </fieldset>

        <fieldset className="min-w-0 @lg:col-span-2">
          <legend className={legend}>
            <span className={num}>3</span> Tarihler
          </legend>
          <div className="grid grid-cols-2 gap-3">
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
          <p aria-live="polite" className="mt-2 min-h-5 text-sm text-muted">
            {days ? (
              <>
                Toplam <strong className="text-night">{days} gün</strong>
              </>
            ) : (
              "İki tarihi seçince gün sayısı burada görünür."
            )}
          </p>
        </fieldset>
      </div>
      </div>

      {compact && (
        <button
          type="button"
          aria-expanded={open}
          aria-controls={`${uid}-more`}
          onClick={() => setOpen((v) => !v)}
          className={`-mb-1 inline-flex items-center gap-1.5 self-start rounded-lg py-2 text-sm font-medium text-night underline-offset-4 hover:underline ${focus}`}
        >
          <ChevronDown aria-hidden className={`size-4 text-flag transition-transform ${open ? "rotate-180" : ""}`} />
          {open ? "Seviye, numara ve mesajı gizle" : "Seviye, numara ve mesajı gör"}
        </button>
      )}
      <div id={`${uid}-more`} hidden={!open}>
        {extra}
      </div>

      <a
        href={waLink(message)}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-flag px-6 text-base font-bold text-white transition-transform hover:-translate-y-0.5 hover:bg-flag-ink ${focus}`}
      >
        <WhatsAppIcon className="size-5" />
        WhatsApp&apos;tan fiyat al
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
      <p className="-mt-2 text-center text-xs text-muted">
        Ad, telefon ya da e-posta istemiyoruz. Mesaj {business.phone.display} numarasına WhatsApp&apos;ta açılır.
      </p>
    </form>
  );
}

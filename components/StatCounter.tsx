"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { business } from "@/content/business";

const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

function trDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${months[m - 1]} ${y}`;
}

function fmt(v: number, decimals: number) {
  return v.toLocaleString("tr-TR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function Stat({ value, decimals = 0, label }: { value: number; decimals?: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = useReducedMotion();
  const num = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (num.current) num.current.textContent = fmt(v, decimals);
      },
    });
    return () => c.stop();
  }, [inView, reduce, value, decimals]);

  return (
    <div ref={ref}>
      <p className="display text-[clamp(2.4rem,8vw,4rem)] tabular-nums leading-none">
        <span className="sr-only">{fmt(value, decimals)}</span>
        <span ref={num} aria-hidden="true">{fmt(value, decimals)}</span>
      </p>
      <p className="mt-2 text-[0.9375rem] font-semibold">{label}</p>
    </div>
  );
}

/** Google puanı ve yorum sayısı; veri business.google'dan. */
export function StatCounter() {
  const g = business.google;
  return (
    <div>
      <div className="flex gap-8 sm:gap-12">
        <Stat value={g.rating} decimals={1} label="Google puanı" />
        <Stat value={g.reviewCount} label="yorum" />
      </div>
      <p className="mt-4 text-[0.8125rem] text-muted">Kaynak: Google Haritalar, {trDate(g.checkedAt)}</p>
    </div>
  );
}

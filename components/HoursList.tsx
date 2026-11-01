import type { ReactNode } from "react";
import { business } from "@/content/business";

/** "[DOLDURULACAK: …]" yer tutucularını kısa "Sorulacak" rozetine çevirir (metin gizlenmez, kelime bölünmez). */
export function withPlaceholders(text: string, dark = false): ReactNode {
  const parts = text.split(/(\[DOLDURULACAK[^\]]*\])/);
  return parts.map((p, i) =>
    p.startsWith("[DOLDURULACAK") ? (
      <span
        key={i}
        title={p.slice(1, -1)}
        className={`mx-0.5 inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${
          dark ? "bg-white/10 text-white" : "bg-glacier-2 text-flag-ink"
        }`}
      >
        Sorulacak
      </span>
    ) : (
      p
    ),
  );
}

export function HoursList({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className={`divide-y ${dark ? "divide-white/15" : "divide-line"}`}>
      {business.hours.map((h) => (
        <div key={h.days} className="flex flex-col gap-0.5 py-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
          <dt className={`font-medium ${dark ? "text-white" : "text-night"}`}>{h.days}</dt>
          <dd className={dark ? "text-white/75" : "text-muted"}>{withPlaceholders(h.time, dark)}</dd>
        </div>
      ))}
    </dl>
  );
}

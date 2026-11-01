import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { levels } from "@/content/business";

const mark = {
  green: { bg: "bg-piste-green", name: "Yeşil", shape: "rounded-full" },
  blue: { bg: "bg-piste-blue", name: "Mavi", shape: "rounded-sm" },
  red: { bg: "bg-piste-red", name: "Kırmızı", shape: "rotate-45 scale-90 rounded-[3px]" },
  black: { bg: "bg-piste-black", name: "Siyah", shape: "rotate-45 scale-90 rounded-[3px]" },
} as const;

export function LevelGuide({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p className="max-w-[60ch] text-muted">
        Pist haritalarındaki renkler zorluk derecesini gösterir: yeşil en rahat, siyah en dik ve zordur. Seviyenizi
        anlatmanın kolay yolu bu renklerdir.
      </p>
      <ul className={`mt-6 grid gap-3 ${compact ? "sm:grid-cols-2 lg:grid-cols-4" : "sm:grid-cols-2"}`}>
        {levels.map((l) => {
          const m = mark[l.piste];
          return (
            <li key={l.id} className="flex items-start gap-4 rounded-xl border border-line bg-white p-4">
              <span aria-hidden className={`mt-1 inline-block size-6 shrink-0 ${m.bg} ${m.shape}`} />
              <div>
                <p className="font-display text-lg font-extrabold leading-tight text-ink">
                  {l.label}
                  <span className="ml-2 text-sm font-medium text-muted">{m.name} pist</span>
                </p>
                <p className="mt-1 text-sm text-muted">{l.hint}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {compact && (
        <Link
          href="/rehber"
          className="mt-6 inline-flex min-h-11 items-center gap-2 font-bold text-flag-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink"
        >
          Beden ve seviye rehberi
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      )}
    </div>
  );
}

import { ExternalLink } from "lucide-react";
import { business, reviews } from "@/content/business";

function trDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

const TILT = ["md:-rotate-1", "md:rotate-[1.2deg] md:mt-10"];

/** Google puanı büyük yazılır; alıntılar delikli bilet fişleri gibi durur. */
export function Reviews() {
  const g = business.google;
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
      <div>
        <p className="display text-[clamp(7rem,4rem+13vw,15rem)] leading-[0.85] tabular-nums">
          {g.rating.toLocaleString("tr-TR", { minimumFractionDigits: 1 })}
        </p>
        <p className="mt-3 text-lead font-semibold">Google&apos;da {g.reviewCount} yorum</p>
        <p className="mt-1 text-small">{trDate(g.checkedAt)} itibarıyla</p>
        <a
          href={business.maps.placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4"
        >
          Google&apos;da tüm yorumlar
          <ExternalLink className="size-4" aria-hidden />
          <span className="sr-only">(yeni sekmede açılır)</span>
        </a>
      </div>

      <div>
        <ul className="grid items-start gap-5 md:grid-cols-2">
          {reviews.map((r, i) => (
            <li key={r.initials} className={`relative bg-paper p-5 pt-10 text-ink md:p-7 md:pt-12 ${TILT[i % TILT.length]}`}>
              <span aria-hidden="true" className="absolute left-5 top-4 size-3.5 rounded-full bg-sky md:left-7" />
              <blockquote className="text-lead">&ldquo;{r.text}&rdquo;</blockquote>
              <p className="mt-4 font-semibold">
                {r.initials} · {r.when}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-6 max-w-[52ch] text-small">
          Alıntılar Google yorumlarından kısaltılarak alınmıştır; güncel yorumlar için Google sayfasına bakın.
        </p>
      </div>
    </div>
  );
}

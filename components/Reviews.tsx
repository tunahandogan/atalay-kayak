import { ExternalLink, Star } from "lucide-react";
import { business, reviews } from "@/content/business";

function trDate(iso: string) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

export function Reviews() {
  const g = business.google;
  return (
    <div>
      <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-display text-2xl font-extrabold tracking-tight text-ink">
        <Star className="size-6 fill-flag text-flag" aria-hidden />
        <span>
          Google&apos;da {g.rating.toLocaleString("tr-TR", { minimumFractionDigits: 1 })} · {g.reviewCount} yorum
        </span>
        <span className="text-sm font-medium tracking-normal text-muted">({trDate(g.checkedAt)} itibarıyla)</span>
      </p>

      <ul className="mt-6 grid gap-4 md:grid-cols-2">
        {reviews.map((r) => (
          <li key={r.initials} className="flex flex-col rounded-2xl border border-line bg-white p-6">
            <blockquote className="flex-1 text-ink">&ldquo;{r.text}&rdquo;</blockquote>
            <div className="mt-5 flex items-center gap-3">
              <span
                aria-hidden
                className="grid size-10 place-items-center rounded-full bg-night text-sm font-bold text-white"
              >
                {r.initials.charAt(0)}
              </span>
              <p className="text-sm">
                <span className="block font-medium text-ink">{r.initials}</span>
                <span className="text-muted">{r.when}</span>
              </p>
            </div>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-sm text-muted">
        Alıntılar Google yorumlarından kısaltılarak alınmıştır; güncel yorumlar için Google sayfasına bakın.
      </p>
      <a
        href={business.maps.placeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex min-h-11 items-center gap-1.5 font-bold text-flag-ink underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink"
      >
        Google&apos;da tüm yorumlar
        <ExternalLink className="size-4" aria-hidden />
        <span className="sr-only">(yeni sekmede açılır)</span>
      </a>
    </div>
  );
}

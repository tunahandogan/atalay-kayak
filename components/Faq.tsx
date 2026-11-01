import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/business";

const css = `
.faq-item { interpolate-size: allow-keywords; }
.faq-item::details-content { block-size: 0; overflow: hidden; transition: block-size .3s ease, content-visibility .3s allow-discrete; }
.faq-item[open]::details-content { block-size: auto; }
@media (prefers-reduced-motion: reduce) { .faq-item::details-content { transition: none; } }
`;

export function Faq({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <div className="divide-y divide-line rounded-2xl border border-line bg-white">
      <style>{css}</style>
      {items.map((f) => (
        <details key={f.q} className="faq-item group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-ink marker:hidden focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-flag-ink [&::-webkit-details-marker]:hidden">
            {f.q}
            <ChevronDown
              className="size-5 shrink-0 text-flag-ink transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
              aria-hidden
            />
          </summary>
          <p className="px-5 pb-4 text-muted">
            {f.a.startsWith("[DOLDURULACAK") ? (
              <>
                <span
                  aria-hidden
                  className="inline-block whitespace-nowrap rounded-full bg-glacier-2 px-2.5 py-0.5 text-xs font-bold text-ink"
                >
                  Sorulacak
                </span>
                <span className="sr-only">Bu bilgi işletmeden öğrenilecek.</span>
              </>
            ) : (
              f.a
            )}
          </p>
        </details>
      ))}
    </div>
  );
}

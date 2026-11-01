import { Photo } from "@/components/Photo";
import { equipmentLink } from "@/lib/whatsapp";
import type { Equipment } from "@/content/business";

export function EquipmentCard({ item, featured = false }: { item: Equipment; featured?: boolean }) {
  const hasPrice = item.dailyPrice !== null;
  return (
    <article
      className={`group flex w-full overflow-hidden rounded-2xl border border-line bg-white transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(11,27,51,0.35)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${
        featured ? "flex-col md:flex-row" : "flex-col"
      }`}
    >
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[4/3] md:aspect-auto md:min-h-[22rem] md:w-3/5" : "aspect-[4/3]"
        }`}
      >
        <Photo
          k={item.photoKey}
          sizes={featured ? "(min-width: 768px) 45vw, 100vw" : "(min-width: 768px) 30vw, 100vw"}
          className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
        />
        {item.highlight && (
          <span className="absolute left-3 top-3 rounded-full bg-flag px-3 py-1 text-xs font-bold text-white">
            {item.highlight}
          </span>
        )}
      </div>
      <div className={`flex flex-1 flex-col p-5 ${featured ? "md:p-8" : ""}`}>
        <h3
          className={`font-display font-extrabold leading-tight tracking-tight text-ink ${
            featured ? "text-2xl md:text-4xl" : "text-xl"
          }`}
        >
          {item.name}
        </h3>
        <dl className="mt-3 space-y-2 text-sm">
          <div>
            <dt className="font-bold text-ink">İçerik</dt>
            <dd className="text-muted">{item.includes}</dd>
          </div>
          <div>
            <dt className="font-bold text-ink">Kime uygun</dt>
            <dd className="text-muted">{item.forWho}</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <p className="text-sm font-bold text-ink">
            {hasPrice ? `Günlük ${item.dailyPrice}` : <span className="whitespace-nowrap">Fiyat: Sorulacak</span>}
          </p>
          <a
            href={equipmentLink(item.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-flag px-5 text-sm font-bold text-white transition-colors hover:bg-flag-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink"
          >
            Fiyat al
            <span className="sr-only">: {item.name} (WhatsApp, yeni sekmede açılır)</span>
          </a>
        </div>
      </div>
    </article>
  );
}

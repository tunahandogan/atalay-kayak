import { Photo } from "@/components/Photo";
import { photos } from "@/content/photos";
import { equipmentLink } from "@/lib/whatsapp";
import type { Equipment } from "@/content/business";

const FIELDS = ["bg-night text-paper on-night", "bg-glacier-2 text-ink", "bg-shade text-ink", "bg-sky text-paper on-night"];

export function EquipmentCard({ item, index }: { item: Equipment; index: number }) {
  const hasPrice = item.dailyPrice !== null;
  const credit = photos[item.photoKey]?.credit;
  return (
    <article className={`flex flex-col ${FIELDS[index % FIELDS.length]}`}>
      <Photo k={item.photoKey} sizes="(min-width: 768px) 50vw, 100vw" showCredit={false} className="aspect-[3/2] w-full" />
      <div className="flex flex-1 flex-col gap-4 p-[var(--gutter)] py-6 md:py-8">
        <h3 className="display text-[clamp(2.25rem,1.5rem+2.4vw,3.75rem)]">{item.name}</h3>
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-semibold">İçerik</dt>
            <dd>{item.includes}</dd>
          </div>
          <div>
            <dt className="font-semibold">Kime uygun</dt>
            <dd>{item.forWho}</dd>
          </div>
        </dl>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-x-4 pt-1">
          <a
            href={equipmentLink(item.id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-14 items-center justify-center bg-flag px-5 font-semibold text-paper transition-colors duration-150 hover:bg-flag-ink"
          >
            {hasPrice ? `Günlük ${item.dailyPrice}, WhatsApp'tan yazın` : "Fiyatı WhatsApp'tan sorun"}
            <span className="sr-only">: {item.name} (yeni sekmede açılır)</span>
          </a>
          {credit && (
            <a
              href={credit.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center text-small underline underline-offset-4"
            >
              Fotoğraf: {credit.author}, {credit.source}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}

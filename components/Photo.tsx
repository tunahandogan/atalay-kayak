import Image from "next/image";
import { photos } from "@/content/photos";
import type { PhotoKey } from "@/content/business";

type Props = {
  k: PhotoKey;
  className?: string;
  sizes?: string;
  /** Künyeyi (fotoğraf kredisi) göster; varsayılan açık */
  showCredit?: boolean;
};

export function Photo({ k, className = "", sizes = "100vw", showCredit = true }: Props) {
  // Dışarıdan absolute verilirse relative onu ezmesin
  const pos = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  const p = photos[k];
  // Fotoğraf yoksa düz kar tonu kalır
  if (!p) return <div className={`${pos} bg-shade ${className}`} />;
  return (
    <div className={`${pos} overflow-hidden bg-shade ${className}`}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        className="object-cover"
        style={p.focal ? { objectPosition: p.focal } : undefined}
      />
      {showCredit && (
        <a
          href={p.credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="on-night absolute bottom-0 right-0 flex min-h-11 items-end text-[0.8125rem] leading-tight text-paper hover:underline"
        >
          <span className="bg-night px-2 py-1">
            {p.credit.author} · {p.credit.source}
          </span>
        </a>
      )}
    </div>
  );
}

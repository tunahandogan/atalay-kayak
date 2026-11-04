import { Navigation } from "lucide-react";
import { business } from "@/content/business";

/** Harita iframe'i tembel yüklenir; telefonda parmağı yutmaz (.map-frame), yol tarifi hemen yanındadır. */
export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="relative min-h-0 flex-1 bg-glacier-2 max-lg:aspect-[4/3] lg:min-h-[420px]">
        <p className="absolute inset-0 grid place-items-center p-4 text-center">{business.address.full}</p>
        <iframe
          src={business.maps.embedUrl}
          title={business.maps.embedTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map-frame absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <a
        href={business.maps.directionsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex min-h-16 items-center justify-center gap-2.5 bg-night px-6 font-display text-[1.625rem] font-extrabold uppercase leading-none text-paper transition-colors duration-150 hover:bg-night-2"
      >
        <Navigation aria-hidden className="size-5" />
        Yol tarifi al
        <span className="sr-only"> (yeni sekmede açılır)</span>
      </a>
    </div>
  );
}

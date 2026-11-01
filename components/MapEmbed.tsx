import { MapPin, Navigation } from "lucide-react";
import { business } from "@/content/business";

export function MapEmbed({ className = "" }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-line bg-glacier-2 ${className}`}>
      <div className="relative aspect-[4/3] w-full bg-glacier-2 sm:aspect-[16/9]">
        <svg aria-hidden viewBox="0 0 400 225" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full text-night/10">
          <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round">
            <path d="M-10 150 C80 130 140 90 230 100 S350 60 420 40" />
            <path d="M60 240 C90 170 150 150 190 110 S210 20 240 -10" />
            <path d="M-10 60 L420 190" strokeWidth="3" />
          </g>
          <circle cx="200" cy="112" r="7" className="fill-flag" />
        </svg>
        <iframe
          src={business.maps.embedUrl}
          title={business.maps.embedTitle}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
      </div>
      <div className="flex flex-col gap-4 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex gap-3">
          <MapPin aria-hidden className="mt-0.5 size-5 shrink-0 text-flag-ink" />
          <address className="not-italic text-night">
            <span className="block">{business.address.full}</span>
            <span className="mt-1 block text-sm text-muted">{business.address.landmark}</span>
            <span className="mt-1 block text-sm text-muted">Plus code: {business.geo.plusCode}</span>
          </address>
        </div>
        <a
          href={business.maps.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-night px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-night-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-flag-ink"
        >
          <Navigation aria-hidden className="size-4" />
          Yol tarifi al
          <span className="sr-only"> (yeni sekmede açılır)</span>
        </a>
      </div>
    </div>
  );
}

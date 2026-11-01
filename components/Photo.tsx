import Image from "next/image";
import { photos } from "@/content/photos";
import type { PhotoKey } from "@/content/business";

type Props = {
  k: PhotoKey;
  className?: string;
  sizes?: string;
  priority?: boolean;
  /** Künyeyi (fotoğraf kredisi) göster; varsayılan açık */
  showCredit?: boolean;
};

const tones: Record<PhotoKey, string> = {
  hero: "from-[#dbe6f1] to-[#b9cde2]",
  ski: "from-[#e6edf4] to-[#c4d4e6]",
  snowboard: "from-[#e1eaf3] to-[#bdd0e4]",
  boots: "from-[#e6edf4] to-[#c9d7e8]",
  helmet: "from-[#e9eff6] to-[#cbd9ea]",
  apparel: "from-[#e4ecf4] to-[#c1d2e5]",
  slope: "from-[#dbe6f1] to-[#a9c0da]",
  shop: "from-[#e6edf4] to-[#c4d4e6]",
  lift: "from-[#dbe6f1] to-[#b3c8e0]",
};

/** Fotoğraf yoksa: pist zeminli degrade + ince dağ çizgisi ve bayrak yedeği. */
function Fallback() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 320 200"
      className="absolute inset-0 h-full w-full"
      fill="none"
      preserveAspectRatio="xMidYMax slice"
    >
      <path d="M0 200V150L70 92l44 52 54-78 62 84 36-36 54 62v54Z" fill="#fff" fillOpacity="0.55" />
      <path d="M0 200v-26l58-44 50 46 52-34 70 58 90-40v40Z" fill="#0b1b33" fillOpacity="0.1" />
      <path d="M232 40v54" stroke="#0b1b33" strokeOpacity="0.5" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M233.5 41 262 53l-28.5 12Z" fill="#e2231a" />
    </svg>
  );
}

export function Photo({ k, className = "", sizes = "100vw", priority, showCredit = true }: Props) {
  // Dışarıdan absolute verilirse relative onu ezmesin
  const pos = /(^|\s)absolute(\s|$)/.test(className) ? "" : "relative";
  const p = photos[k];
  if (!p) {
    return (
      <div className={`${pos} overflow-hidden bg-gradient-to-br ${tones[k]} ${className}`}>
        <Fallback />
      </div>
    );
  }
  return (
    <div className={`${pos} overflow-hidden bg-glacier-2 ${className}`}>
      <Image
        src={p.src}
        alt={p.alt}
        fill
        sizes={sizes}
        priority={priority}
        className="object-cover"
        style={p.focal ? { objectPosition: p.focal } : undefined}
      />
      {showCredit && (
        <a
          href={p.credit.url}
          target="_blank"
          rel="noopener noreferrer"
          className="on-night absolute bottom-1.5 right-2 rounded-sm bg-night/75 px-1.5 py-0.5 text-[11px] leading-tight text-white hover:underline"
        >
          {p.credit.author} · {p.credit.source}
        </a>
      )}
    </div>
  );
}

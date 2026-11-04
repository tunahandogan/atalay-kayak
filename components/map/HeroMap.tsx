import { far, lift, MAP_H, MAP_W, massif, rock, shade } from "@/components/map/art-core";
import { chairs, drift, hatch, pylon, shadeDeep, station, treeDark, treeLit } from "@/components/map/art-detail";
import { MapPistes } from "@/components/map/MapPistes";

/** Afiş çizimi: temsili dağ, pistler, telesiyej, çamlar. Filtre ya da karışım modu yok; düz boyalar. */
export function HeroMap({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${MAP_W} ${MAP_H}`}
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="Karlı bir dağ ve yeşil, mavi, kırmızı, siyah pist çizgileri. Temsili çizim, gerçek pist haritası değildir."
      className={className}
    >
      <path d={far} fill="var(--color-ridge)" />
      <path d={massif} fill="var(--color-glacier)" />
      <path d={shade} fill="var(--color-shade)" />
      <path d={shadeDeep} fill="var(--color-shade-deep)" />
      <path d={hatch} fill="none" stroke="var(--color-shade-deep)" strokeWidth={2} strokeLinecap="round" />
      <path d={drift} fill="none" stroke="var(--color-shade)" strokeWidth={2.5} strokeLinecap="round" />
      <path d={rock} fill="var(--color-rock)" />
      <path d={treeDark} fill="var(--color-pine)" />
      <path d={treeLit} fill="var(--color-pine-lit)" />
      <g className="p" data-p="lift">
        <path
          d={`M${lift.a[0]} ${lift.a[1]}L${lift.b[0]} ${lift.b[1]}`}
          stroke="var(--color-night)"
          strokeWidth={2}
          fill="none"
        />
        <path d={pylon} stroke="var(--color-night)" strokeWidth={3} fill="none" />
        <path d={chairs} stroke="var(--color-night)" strokeWidth={2.5} fill="none" />
      </g>
      <path d={station} fill="var(--color-night-2)" />
      <MapPistes />
    </svg>
  );
}

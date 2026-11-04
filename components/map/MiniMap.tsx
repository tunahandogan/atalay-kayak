import { far, massif, rock, shade } from "@/components/map/art-core";
import { MapPistes } from "@/components/map/MapPistes";
import { MapLive } from "@/components/map/MapLive";

/** Seviye seçiminin yanındaki küçük harita: telefonda büyük harita görünmezken de pist vurgulanır. */
export function MiniMap() {
  return (
    <MapLive className="bg-sky">
      <svg viewBox="240 40 1120 700" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="block aspect-[8/5] w-full">
        <path d={far} fill="var(--color-ridge)" />
        <path d={massif} fill="var(--color-glacier)" />
        <path d={shade} fill="var(--color-shade)" />
        <path d={rock} fill="var(--color-rock)" />
        <MapPistes line={13} glow={26} signR={26} />
      </svg>
    </MapLive>
  );
}

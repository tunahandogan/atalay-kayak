import { levels } from "@/content/business";
import { PisteSign } from "@/components/PisteSign";

const BAND = {
  green: { bg: "bg-piste-green", name: "Yeşil pist" },
  blue: { bg: "bg-piste-blue", name: "Mavi pist" },
  red: { bg: "bg-piste-red", name: "Kırmızı pist" },
  black: { bg: "bg-piste-black", name: "Siyah pist" },
} as const;

/** Dört tam genişlik renk bandı: pist renkleri seviyeyi kendisi anlatır. */
export function LevelGuide() {
  return (
    <ul className="on-night">
      {levels.map((l) => {
        const m = BAND[l.piste];
        return (
          <li key={l.id} className={`${m.bg} text-paper`}>
            <div className="wrap grid items-center gap-x-6 gap-y-1 py-5 md:grid-cols-[minmax(0,5fr)_minmax(0,3fr)_minmax(0,4fr)] md:py-7">
              <p className="display flex items-center gap-3 text-[clamp(2.75rem,1.8rem+4vw,5.5rem)] md:gap-5">
                <PisteSign piste={l.piste} inverse size="0.8em" />
                {l.label}
              </p>
              <p className="text-lead font-semibold">{m.name}</p>
              <p className="text-lead">{l.hint}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

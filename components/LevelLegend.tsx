"use client";

import { levels } from "@/content/business";
import { PisteSign } from "@/components/PisteSign";
import { useRental } from "@/components/RentalContext";

/** Harita lejantı aynı zamanda seviye seçimidir: dokununca pist vurgulanır ve skipasa yazılır. */
export function LevelLegend() {
  const { level, setLevel } = useRental();
  return (
    <div className="grid grid-cols-2 gap-1.5">
      {levels.map((l) => {
        const on = level === l.id;
        return (
          <button
            key={l.id}
            type="button"
            aria-pressed={on}
            onClick={() => setLevel(on ? undefined : l.id)}
            className={`flex min-h-[60px] items-center gap-2.5 px-2.5 py-2 text-left transition-colors duration-150 ${
              on ? "bg-night text-paper" : "bg-paper text-night hover:bg-glacier-2"
            }`}
          >
            <PisteSign piste={l.piste} size="1.875rem" inverse={on && l.piste === "black"} />
            <span className="min-w-0">
              <span className="block font-semibold leading-tight">{l.label}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

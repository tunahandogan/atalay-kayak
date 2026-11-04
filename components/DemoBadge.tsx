import { demo } from "@/content/business";

/** "Demo" etiketi başlıkta durur: hep görünür, hiçbir içeriğin üstüne binmez. */
export function DemoBadge() {
  return (
    <span title={demo.note} className="inline-flex shrink-0 items-center bg-night px-1.5 py-0.5 text-[0.8125rem] font-semibold text-paper">
      {demo.label}
      <span className="sr-only">: {demo.note}</span>
    </span>
  );
}

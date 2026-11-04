import { business } from "@/content/business";
import { AskLink } from "@/components/AskLink";
import { isOpen, knownPart } from "@/lib/placeholders";

/** Doğrulanmamış saat gösterilmez; bilinen kısım yazılır, gerisi WhatsApp'a yönlendirilir. */
export function HoursList({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <dl className="grid gap-3">
      {business.hours.map((h) => {
        const open = isOpen(h.time);
        const known = open ? knownPart(h.time) : h.time;
        return (
          <div key={h.days}>
            <dt className={`font-semibold ${dark ? "text-paper" : "text-night"}`}>{h.days}</dt>
            <dd className={dark ? "text-mist" : "text-ink"}>
              {known && (open ? `${known} açılış. ` : known)}
              {open && (
                <AskLink question={`${h.days} çalışma saatlerinizi öğrenebilir miyim?`}>
                  {known ? "Kapanışı WhatsApp'tan sorun" : "WhatsApp'tan sorun"}
                </AskLink>
              )}
            </dd>
          </div>
        );
      })}
    </dl>
  );
}

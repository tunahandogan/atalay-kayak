import { ChevronDown } from "lucide-react";
import { faqs } from "@/content/business";
import { AskLink } from "@/components/AskLink";
import { isOpen } from "@/lib/placeholders";

export function Faq({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? faqs.slice(0, limit) : faqs;
  return (
    <div className="grid gap-1.5">
      {items.map((f) => (
        <details key={f.q} className="faq-item group bg-paper">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-4 px-4 py-3 text-lead font-semibold md:px-6">
            {f.q}
            <ChevronDown
              className="size-6 shrink-0 text-flag-ink transition-transform duration-150 group-open:rotate-180"
              aria-hidden
            />
          </summary>
          <div className="max-w-[62ch] px-4 pb-5 md:px-6">
            {isOpen(f.a) ? (
              <p>
                Bu konuda en doğru bilgiyi ekipten alın: <AskLink question={f.q} />
              </p>
            ) : (
              <p>{f.a}</p>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}

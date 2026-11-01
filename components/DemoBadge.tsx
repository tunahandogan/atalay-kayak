import { demo } from "@/content/business";

/** Sabit "Demo" etiketi. Mobilde alttaki WhatsApp çubuğunun üstünde solda, masaüstünde sol altta. */
export function DemoBadge() {
  return (
    <div
      title={demo.note}
      className="pointer-events-none fixed left-3 z-40 bottom-[calc(4.75rem+env(safe-area-inset-bottom))] md:bottom-4 md:left-4"
    >
      <span className="inline-flex items-center gap-1.5 rounded-sm border border-night/20 bg-night/90 px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
        <span aria-hidden className="size-1.5 rounded-full bg-flag" />
        {demo.label}
        <span className="sr-only">: {demo.note}</span>
      </span>
    </div>
  );
}

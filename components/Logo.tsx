import { business } from "@/content/business";

/** Metin logosu ve küçük bayrak işareti. İşletmenin kendi logosu yok. */
export function Logo({ tone = "light", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  // tone: "light" = açık zemin (gece mavisi metin), "dark" = koyu zemin (beyaz metin)
  const color = tone === "dark" ? "text-paper" : "text-night";
  return (
    <span className={`inline-flex items-center gap-2 ${color} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 24 32" className="h-8 w-6 shrink-0">
        <path d="M3 2v28" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        <path d="M4 3l18 7-18 7Z" fill="var(--color-flag)" />
      </svg>
      <span className="display whitespace-nowrap text-[1.75rem]">{business.displayName}</span>
    </span>
  );
}

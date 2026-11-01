import { business } from "@/content/business";

/** Metin logosu + küçük dağ/bayrak işareti. İşletmenin kendi logosu yok. */
export function Logo({ tone = "light", className = "" }: { tone?: "dark" | "light"; className?: string }) {
  // tone: "light" = açık zemin (gece mavisi metin), "dark" = koyu zemin (beyaz metin)
  const color = tone === "dark" ? "text-white" : "text-night";
  const [first, ...rest] = business.displayName.split(" ");
  return (
    <span className={`inline-flex items-center gap-2.5 ${color} ${className}`}>
      <svg aria-hidden="true" viewBox="0 0 32 32" className="h-8 w-8 shrink-0">
        <rect width="32" height="32" rx="7" fill={tone === "dark" ? "#13284a" : "#0b1b33"} />
        <path d="M3 25 12 10l5 8 3-4 9 11Z" fill="#f5f8fb" />
        <path d="M21 5v10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M21 5.5 27 8l-6 2.5Z" fill="#e2231a" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="display text-[1.15rem] tracking-tight">{first}</span>
        <span className="mt-1 text-[10.5px] font-semibold tracking-[0.14em] opacity-80">
          {rest.join(" ").toLocaleUpperCase("tr")} · {business.district.toLocaleUpperCase("tr")}
        </span>
      </span>
    </span>
  );
}

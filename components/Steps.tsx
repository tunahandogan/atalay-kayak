import { steps } from "@/content/business";

function Gate({ tone }: { tone: "flag" | "blue" }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 48 64" className="h-16 w-12 shrink-0">
      <path d="M6 2v60" stroke="var(--color-night)" strokeWidth="4" strokeLinecap="round" />
      <path d="M8 4h36v26H8Z" fill={tone === "flag" ? "var(--color-flag)" : "var(--color-piste-blue)"} />
    </svg>
  );
}

const OFFSET = ["", "md:ml-[16%]", "md:ml-[32%]"];

/** Üç adım slalom kapıları gibi çapraz iner; sıra konumdan okunur. */
export function Steps() {
  return (
    <ol className="grid gap-8 md:gap-10">
      {steps.map((s, i) => (
        <li key={s.title} className={`flex items-start gap-4 md:gap-6 ${OFFSET[i]}`}>
          <Gate tone={i % 2 ? "blue" : "flag"} />
          <div className="min-w-0 max-w-[40rem]">
            <h3 className="display text-[clamp(2rem,1.5rem+2vw,3.5rem)]">{s.title}</h3>
            <p className="mt-2 max-w-[48ch] text-lead">{s.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

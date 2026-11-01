import type { ReactNode } from "react";

type Tone = "glacier" | "glacier-2" | "night" | "night-2" | "flag";

const tones: Record<Tone, string> = {
  glacier: "bg-glacier text-ink",
  "glacier-2": "bg-glacier-2 text-ink",
  night: "on-night bg-night text-white",
  "night-2": "on-night bg-night-2 text-white",
  flag: "bg-flag-ink text-white",
};

type Props = {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
  /** false: dikey boşluk yok (kendi boşluğunu yönetenler için) */
  padded?: boolean;
};

export function Section({ tone = "glacier", id, labelledBy, className = "", children, padded = true }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`${tones[tone]} ${padded ? "section-y" : ""} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

export function SectionHeading({
  id,
  children,
  lead,
  tone = "light",
  eyebrow,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  lead?: ReactNode;
  tone?: "light" | "dark";
  eyebrow?: ReactNode;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <div className={`max-w-3xl ${className}`}>
      {eyebrow && (
        <p className={`mb-3 text-[0.8125rem] font-bold tracking-[0.14em] ${dark ? "text-mist" : "text-flag-ink"}`}>
          {eyebrow}
        </p>
      )}
      <h2 id={id} className="display text-title">
        {children}
      </h2>
      {lead && <p className={`mt-5 max-w-[56ch] text-lead ${dark ? "text-mist" : "text-muted"}`}>{lead}</p>}
    </div>
  );
}

import type { ReactNode } from "react";
import { PisteSign } from "@/components/PisteSign";

type Tone = "glacier" | "glacier-2" | "night" | "sky" | "paper";
type Piste = "green" | "blue" | "red" | "black";

const tones: Record<Tone, string> = {
  glacier: "bg-glacier text-ink",
  "glacier-2": "bg-glacier-2 text-ink",
  paper: "bg-paper text-ink",
  night: "on-night bg-night text-paper",
  sky: "on-night bg-sky text-paper",
};

type Props = {
  tone?: Tone;
  id?: string;
  labelledBy?: string;
  className?: string;
  children: ReactNode;
};

export function Section({ tone = "glacier", id, labelledBy, className = "", children }: Props) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={`section-y ${tones[tone]} ${className}`}>
      <div className="wrap">{children}</div>
    </section>
  );
}

/** Bölüm başlığı pist tabelası gibidir: renkli işaret, pist numarası, ad. */
export function PisteHeading({
  id,
  n,
  piste,
  children,
  lead,
  inverse,
  as: Tag = "h2",
  className = "",
}: {
  id?: string;
  n: number;
  piste: Piste;
  children: ReactNode;
  lead?: ReactNode;
  inverse?: boolean;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-start gap-3 md:gap-5">
        <PisteSign piste={piste} n={n} inverse={inverse} size="clamp(2.5rem, 1.6rem + 3.4vw, 5rem)" className="mt-[0.1em]" />
        <Tag id={id} className="display min-w-0 text-title">
          {children}
        </Tag>
      </div>
      {lead && <p className="mt-5 max-w-[46ch] text-lead">{lead}</p>}
    </div>
  );
}

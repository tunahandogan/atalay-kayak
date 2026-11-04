import type { CSSProperties } from "react";

type Piste = "green" | "blue" | "red" | "black";

/** Pist tabelası: yeşil daire, mavi kare, kırmızı ve siyah baklava. */
export function PisteSign({
  piste,
  n,
  size,
  inverse,
  className = "",
}: {
  piste: Piste;
  n?: number;
  size?: string;
  inverse?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      data-piste={piste}
      data-inverse={inverse || undefined}
      className={`sign ${className}`}
      style={size ? ({ "--sign": size } as CSSProperties) : undefined}
    >
      {n !== undefined && <span>{n}</span>}
    </span>
  );
}

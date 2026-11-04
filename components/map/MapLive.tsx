"use client";

import type { MouseEvent, ReactNode } from "react";
import { useRental } from "@/components/RentalContext";

/**
 * Çizimi seçili seviyeye bağlar. Vurgu CSS'te `data-level` ile olur; çizim sunucuda kalır.
 * Pist çizgisine dokunmak lejant düğmesiyle aynı seçimi yapar; klavye ve ekran okuyucu için asıl yol lejanttır.
 */
export function MapLive({ children, className }: { children: ReactNode; className?: string }) {
  const { piste, level, setLevel } = useRental();
  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const pick = (e.target as Element).getAttribute("data-pick");
    if (pick) setLevel(level === pick ? undefined : pick);
  };
  return (
    <div data-level={piste} onClick={onClick} className={className}>
      {children}
    </div>
  );
}

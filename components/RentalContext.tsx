"use client";

import { createContext, use, useCallback, useMemo, useState, type ReactNode } from "react";
import { levels } from "@/content/business";
import { rentalDays, rentalMessage } from "@/lib/whatsapp";

export type Piste = (typeof levels)[number]["piste"];

type Rental = {
  items: string[];
  people: number;
  from: string;
  to: string;
  level: string | undefined;
  shoe: string;
  days: number | undefined;
  message: string;
  piste: Piste | undefined;
  toggle: (id: string) => void;
  setPeople: (update: (p: number) => number) => void;
  setFrom: (v: string) => void;
  setTo: (v: string) => void;
  setLevel: (v: string | undefined) => void;
  setShoe: (v: string) => void;
};

const Ctx = createContext<Rental | null>(null);

/** Harita lejantı ve skipas aynı seçimi paylaşır; sayfalar arası geçişte de korunur. */
export function RentalProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [people, setPeople] = useState(1);
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [level, setLevel] = useState<string | undefined>();
  const [shoe, setShoe] = useState("");

  const toggle = useCallback(
    (id: string) => setItems((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id])),
    [],
  );

  const value = useMemo<Rental>(
    () => ({
      items,
      people,
      from,
      to,
      level,
      shoe,
      days: rentalDays(from, to),
      message: rentalMessage({ items, people, from, to, level, shoeSize: shoe || undefined }),
      piste: levels.find((l) => l.id === level)?.piste,
      toggle,
      setPeople,
      setFrom,
      setTo,
      setLevel,
      setShoe,
    }),
    [items, people, from, to, level, shoe, toggle],
  );

  return <Ctx value={value}>{children}</Ctx>;
}

export function useRental() {
  const v = use(Ctx);
  if (!v) throw new Error("useRental, RentalProvider içinde kullanılmalı");
  return v;
}

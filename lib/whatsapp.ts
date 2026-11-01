import { business, equipment, levels } from "@/content/business";

export type Rental = {
  /** Ekipman id'leri (bilinmeyen değerler olduğu gibi yazılır) */
  items?: string[];
  people?: number;
  from?: string; // yyyy-mm-dd
  to?: string; // yyyy-mm-dd
  /** Seviye id'si ya da etiketi */
  level?: string;
  shoeSize?: string;
  note?: string;
};

const PISTE_NAMES = { green: "yeşil", blue: "mavi", red: "kırmızı", black: "siyah" } as const;

export function waLink(text?: string): string {
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text ?? business.whatsappMessage)}`;
}

/** yyyy-mm-dd -> gg.aa.yyyy (geçersizse undefined) */
export function formatDate(iso?: string): string | undefined {
  if (!iso) return undefined;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : undefined;
}

/** Kiralama günü sayısı (dönüş - alış, en az 1); tarihler eksik/geçersizse undefined */
export function rentalDays(from?: string, to?: string): number | undefined {
  if (!from || !to) return undefined;
  const a = Date.parse(`${from}T00:00:00Z`);
  const b = Date.parse(`${to}T00:00:00Z`);
  if (Number.isNaN(a) || Number.isNaN(b) || b < a) return undefined;
  return Math.max(1, Math.round((b - a) / 86_400_000));
}

function levelText(value?: string): string | undefined {
  if (!value) return undefined;
  const l = levels.find((x) => x.id === value || x.label === value);
  return l ? `${l.label} (${PISTE_NAMES[l.piste]} pist)` : value;
}

export function rentalMessage(r: Rental): string {
  const names = (r.items ?? []).map((id) => equipment.find((e) => e.id === id)?.name ?? id);
  const from = formatDate(r.from);
  const to = formatDate(r.to);
  const days = rentalDays(r.from, r.to);

  let date: string | undefined;
  if (from && to) date = from === to ? from : `${from} – ${to}`;
  else if (from) date = `${from} tarihinden itibaren`;
  else if (to) date = `${to} tarihine kadar`;
  if (date && days) date += ` (${days} gün)`;

  const details: string[] = [];
  if (names.length) details.push(`• Ekipman: ${names.join(", ")}`);
  if (r.people && r.people > 0) details.push(`• Kişi sayısı: ${r.people}`);
  if (date) details.push(`• Tarih: ${date}`);
  const level = levelText(r.level);
  if (level) details.push(`• Seviye: ${level}`);
  if (r.shoeSize) details.push(`• Ayakkabı numarası: ${r.shoeSize}`);
  if (r.note?.trim()) details.push(`• Not: ${r.note.trim()}`);

  const lines = ["Merhaba, web sitenizden yazıyorum. Kayak ekipmanı kiralamak istiyorum."];
  if (details.length) lines.push("", ...details);
  lines.push("", "Fiyat ve müsaitlik bilgisi alabilir miyim?");
  return lines.join("\n");
}

export function equipmentLink(id: string): string {
  return waLink(rentalMessage({ items: [id] }));
}

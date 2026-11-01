import { equipment } from "@/content/business";
import { EquipmentCard } from "@/components/EquipmentCard";
import { Reveal } from "@/components/Reveal";

export function EquipmentGrid({ limit }: { limit?: number }) {
  const items = typeof limit === "number" ? equipment.slice(0, limit) : equipment;
  const [first, ...rest] = items;
  if (!first) return null;
  return (
    <div className="grid gap-5 md:grid-cols-3">
      <Reveal className="md:col-span-3">
        <EquipmentCard item={first} featured />
      </Reveal>
      {rest.map((item, i) => (
        <Reveal key={item.id} delay={i * 0.08} className="flex">
          <EquipmentCard item={item} />
        </Reveal>
      ))}
    </div>
  );
}

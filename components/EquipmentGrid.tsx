import { equipment } from "@/content/business";
import { EquipmentCard } from "@/components/EquipmentCard";

/** Dört ekipman, ikişerli yarım ekran alanlar: fotoğraf ve düz renk kenar kenara, kart yok. */
export function EquipmentGrid() {
  return (
    <div className="grid md:grid-cols-2">
      {equipment.map((item, i) => (
        <EquipmentCard key={item.id} item={item} index={i} />
      ))}
    </div>
  );
}

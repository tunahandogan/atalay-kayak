import type { Metadata } from "next";
import { business } from "@/content/business";
import { LevelGuide } from "@/components/LevelGuide";
import { SizeGuide } from "@/components/SizeGuide";
import { PisteHeading } from "@/components/ui/Section";

export const metadata: Metadata = {
  title: "Beden ve seviye rehberi",
  description: `Kayak botu numara tablosu, kayak boyu kuralı ve pist renkleri. Genel bilgidir; ${business.displayName} mağazasında denenerek netleşir.`,
};

export default function RehberPage() {
  return (
    <main id="icerik" className="bg-glacier text-ink">
      <section className="pb-10 pt-10 lg:pt-16">
        <div className="wrap">
          <PisteHeading
            as="h1"
            n={1}
            piste="green"
            lead="Seviyenizi ve bot numaranızı bilmek mesajınızı kısaltır. Emin değilseniz sorun değil; son karar mağazada denenerek verilir."
          >
            Beden ve seviye rehberi
          </PisteHeading>
        </div>
      </section>

      <section aria-label="Seviye ve pist renkleri">
        <LevelGuide />
      </section>

      <section aria-labelledby="beden" className="section-y bg-glacier-2">
        <div className="wrap">
          <PisteHeading id="beden" n={2} piste="blue" className="mb-10">
            Bot numarası ve kayak boyu
          </PisteHeading>
          <SizeGuide />
        </div>
      </section>
    </main>
  );
}

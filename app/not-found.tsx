import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/content/business";
import { ButtonLink } from "@/components/ui/Button";
import { waLink } from "@/lib/whatsapp";

export const metadata: Metadata = { title: "Sayfa bulunamadı" };

export default function NotFound() {
  return (
    <main id="icerik" className="on-night bg-sky text-paper">
      <div className="wrap flex min-h-[70svh] flex-col justify-center py-20">
        <h1 className="display text-poster">Pistten çıktınız.</h1>
        <p className="mt-5 max-w-[46ch] text-lead">
          Aradığınız sayfa yok ya da taşınmış. Ana sayfadan devam edin ya da {business.name} ekibine WhatsApp&apos;tan
          yazın.
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <Link
            href="/"
            className="inline-flex min-h-14 items-center bg-paper px-6 font-display text-[1.5rem] font-extrabold uppercase leading-none text-night"
          >
            Ana sayfaya dön
          </Link>
          <ButtonLink href={waLink()} external>
            WhatsApp&apos;tan yazın
          </ButtonLink>
        </div>
      </div>
    </main>
  );
}

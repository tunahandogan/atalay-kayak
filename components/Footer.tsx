import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";
import { business, demo, nav } from "@/content/business";
import { HoursList } from "@/components/HoursList";
import { ButtonLink } from "@/components/ui/Button";
import { waLink } from "@/lib/whatsapp";

/** Kapanış: davet, bilgiler ve kesilmiş dev ad. */
export function Footer() {
  return (
    <footer className="on-night overflow-hidden bg-night pb-[calc(68px+env(safe-area-inset-bottom,0px))] text-paper md:pb-0">
      <div className="wrap pt-[var(--section-y)]">
        <p className="display text-[clamp(2.25rem,11.2vw,6rem)]">
          Tarihi yazın,
          <br />
          müsaitliği söyleyelim
        </p>
        <div className="mt-7 flex flex-wrap gap-2">
          <ButtonLink href={waLink()} external>
            <MessageCircle aria-hidden="true" className="h-5 w-5" />
            WhatsApp&apos;tan yazın
          </ButtonLink>
          <ButtonLink href={`tel:${business.phone.e164}`} variant="light">
            <Phone aria-hidden="true" className="h-5 w-5" />
            {business.phone.display}
          </ButtonLink>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-semibold">Adres</h2>
            <address className="mt-2 not-italic">
              {business.address.landmark}
              <br />
              {business.address.locality} / {business.address.region} {business.address.postalCode}
            </address>
            <a
              href={business.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold underline underline-offset-4"
            >
              Yol tarifi al <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
          </div>
          <div>
            <h2 className="mb-2 font-semibold">Çalışma saatleri</h2>
            <HoursList tone="dark" />
          </div>
          <div>
            <h2 className="font-semibold">Sayfalar</h2>
            <ul className="mt-1">
              <li>
                <Link href="/" className="inline-flex min-h-11 items-center hover:underline">
                  Ana sayfa
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="inline-flex min-h-11 items-center hover:underline">
                    {n.label}
                  </Link>
                </li>
              ))}
              {business.instagram && (
                <li>
                  <a
                    href={business.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-1 hover:underline"
                  >
                    Instagram {business.instagram.handle} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>

        <p className="mt-12 max-w-[70ch] text-small text-mist">
          {demo.note} {demo.mapNote} {demo.photoNote} &copy; {business.displayName}
        </p>
      </div>
      <p aria-hidden="true" className="display mt-8 -mb-[0.13em] whitespace-nowrap pl-[var(--gutter)] text-[37vw] leading-[0.8] text-night-2">
        {business.name}
      </p>
    </footer>
  );
}

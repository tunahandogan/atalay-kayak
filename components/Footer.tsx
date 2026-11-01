import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { business, demo, nav } from "@/content/business";
import { HoursList } from "@/components/HoursList";
import { Logo } from "@/components/Logo";

export function Footer() {
  return (
    <footer className="on-night bg-night text-white">
      <div className="wrap section-y pb-10">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo tone="dark" />
            <h2 className="mt-8 text-[0.9375rem] font-bold">Adres</h2>
            <address className="mt-3 flex items-start gap-2 text-lead not-italic text-white/90">
              <MapPin aria-hidden="true" className="mt-1.5 h-4 w-4 shrink-0 text-mist" />
              <span>
                {business.address.landmark}
                <br />
                <span className="text-mist">
                  {business.address.locality} / {business.address.region} {business.address.postalCode}
                </span>
              </span>
            </address>
            <a
              href={business.maps.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap mt-2 inline-flex items-center gap-1.5 font-semibold underline-offset-4 hover:underline"
            >
              Yol tarifi al <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </a>
            <p className="mt-6">
              <a
                href={`tel:${business.phone.e164}`}
                className="tap inline-flex items-center gap-2 text-lead font-bold hover:underline"
              >
                <Phone aria-hidden="true" className="h-5 w-5 text-mist" />
                {business.phone.display}
              </a>
            </p>
          </div>

          <div className="md:col-span-4">
            <h2 className="text-[0.9375rem] font-bold">Çalışma saatleri</h2>
            <div className="mt-3">
              <HoursList tone="dark" />
            </div>
          </div>

          <div className="md:col-span-3">
            <h2 className="text-[0.9375rem] font-bold">Sayfalar</h2>
            <ul className="mt-2">
              <li>
                <Link href="/" className="tap inline-flex items-center text-white/90 hover:underline">
                  Ana sayfa
                </Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="tap inline-flex items-center text-white/90 hover:underline">
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
                    className="tap inline-flex items-center gap-1 text-white/90 hover:underline"
                  >
                    Instagram {business.instagram.handle} <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      <div className="wrap border-t border-white/10 pb-8 pt-6 text-[0.8125rem] leading-relaxed text-mist">
        <p>{demo.note}</p>
        <p className="mt-2">&copy; {business.displayName}</p>
      </div>
    </footer>
  );
}

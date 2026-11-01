import { business, site } from "@/content/business";

const PLACEHOLDER = /\[DOLDURULACAK/;

export function JsonLd() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const hoursKnown = business.hours.every((h) => !PLACEHOLDER.test(h.time));

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "SportingGoodsStore",
    name: business.displayName,
    description: site.description,
    url: base,
    telephone: business.phone.e164,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: { "@type": "GeoCoordinates", latitude: business.geo.lat, longitude: business.geo.lng },
    hasMap: business.maps.placeUrl,
  };
  // Saatler yer tutucu içeriyorsa openingHours eklenmez (uydurma yok).
  if (hoursKnown) data.openingHours = business.hours.map((h) => `${h.days} ${h.time}`);

  const json = JSON.stringify(data).replace(/</g, "\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}

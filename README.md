# Atalay Kayak Evi — Palandöken / Erzurum kayak ve snowboard kiralama demosu

Erzurum Palandöken'deki kayak kiralama işletmesi için hazırlanmış konsept demo. Ziyaretçi ekipmanı, kişi sayısını, tarihi, seviyeyi ve bot numarasını seçer; hazır mesaj WhatsApp'ta açılır. Form veri toplamaz, hiçbir şey kaydedilmez.

Stack: Next.js 16 (App Router, `cacheComponents`), React 19, Tailwind v4, `lucide-react`. Tasarım kararları: `DESIGN.md`.

## Çalıştırma

```bash
npm install
npm run dev     # http://localhost:3000
npm run build && npm run start
npm run typecheck
```

## 15 dakikada başka bir işletmeye uyarlama

1. **`content/business.ts`** tek içerik kaynağıdır (ad, adres, geo, harita, telefon, WhatsApp, saatler, ekipman, seviyeler, adımlar, bot tablosu, yorumlar, SSS, nav, `site`, `demo`). Bileşenler, JSON-LD ve OG görseli bilgiyi yalnızca buradan okur. Doğrulanmamış bilgi için `[DOLDURULACAK: …]` yer tutucusu kullanın; ziyaretçi bunu görmez, "WhatsApp'tan sorun" yönlendirmesi görür (`lib/placeholders.ts`). Uydurma fiyat veya marka yazmayın.
2. **Görseller:** `public/images/stok/<anahtar>.jpg` dosyalarını değiştirin (anahtarlar: `hero`, `ski`, `snowboard`, `boots`, `helmet`, `apparel`, `slope`, `shop`, `lift`; her biri ≤ 350 KB, ~1600 px). `content/photos.ts` içinde alt metin, `focal` ve künyeyi güncelleyin. Bir anahtar `null` bırakılırsa bileşen düz renk gösterir.
3. **Tokenlar:** renk ve font tokenları `app/globals.css` `@theme` bloğundadır (`glacier`, `night`, `flag`, `sky`, `piste-*`). Fontlar `app/layout.tsx` içinde `next/font/google` ile yüklenir (`--font-display`: Sofia Sans Extra Condensed, `--font-sans`: Sofia Sans). Harita çizimi `node scripts/draw-map.mjs` ile üretilir.
4. `NEXT_PUBLIC_SITE_URL` değerini ayarlayın (metadataBase, JSON-LD ve OG için).

## Yayın adımları (Vercel)

1. Depoyu Vercel'e bağlayın (Framework: Next.js, varsayılan build komutu).
2. Ortam değişkeni: `NEXT_PUBLIC_SITE_URL=https://<alan-adi>`.
3. Yayın öncesi `npm run typecheck && npm run build` çalıştırın; telefon (~390px) ve masaüstünde (~1440px) gözle kontrol edin.

## Noindex notu

Site bilinçli olarak **arama motorlarına kapalıdır**: `metadata.robots` (noindex, nofollow), `X-Robots-Tag` başlığı (`next.config.ts`) ve `robots.txt` (`Disallow: /`) birlikte çalışır. İşletme onayından sonra üçü de kaldırılmalıdır. Köşedeki "Demo" etiketi (`components/DemoBadge.tsx`) de yayına alınmadan önce kaldırılmalıdır.

## Görsel künyeleri

Tüm fotoğraflar [Pexels Lisansı](https://www.pexels.com/license/) kapsamındadır (ücretsiz kullanım, atıf zorunlu değil; yine de belirtilmiştir). İşletmenin kendi fotoğrafları kullanılmamıştır. Görseller örnek niteliğindedir; işletmedeki ekipmanı temsil etmez.

| Anahtar | Fotoğrafçı | Kaynak |
|---|---|---|
| hero | AS Photography | https://www.pexels.com/photo/person-riding-ski-on-snow-field-937692/ |
| ski | Pixabay | https://www.pexels.com/photo/flatlay-of-skiing-equipment-257961/ |
| snowboard | Xue Guangjian | https://www.pexels.com/photo/person-snowboarding-on-field-1705667/ |
| boots | Nati | https://www.pexels.com/photo/close-up-of-a-person-in-ski-boots-15324801/ |
| helmet | Haziq Farooqi | https://www.pexels.com/photo/skier-with-gray-helmet-and-goggles-with-snow-on-hair-20419666/ |
| apparel | Ollie Craig | https://www.pexels.com/photo/photo-of-a-skier-wearing-a-blue-ski-jacket-and-yellow-trousers-on-a-ski-slope-19755888/ |
| slope | Visit Almaty | https://www.pexels.com/photo/man-doing-ice-skiing-on-snow-field-in-shallow-focus-photography-848618/ |
| shop | Патимат Магомедова | https://www.pexels.com/photo/ski-and-snowboard-equipment-store-interior-display-34771214/ |
| lift | Viceman S | https://www.pexels.com/photo/scenic-snowy-mountain-landscape-with-ski-lift-30816460/ |

# DESIGN — Atalay Kayak Evi ("Pist haritası")

Yön: aydınlık, buzul beyazı zemin; gece mavisi metin; tek vurgu pist bayrağı kırmızısı. Pist renkleri (yeşil/mavi/kırmızı/siyah) yalnızca seviye göstergesi ve küçük işaretlerde anlam taşır.

## Renk (tokenlar `app/globals.css`)
- Zemin: `glacier #f5f8fb`, ikincil `glacier-2 #e6edf4`. Çizgi `line #d3dde8`.
- Metin: `ink/night #0b1b33`, ikincil `muted #52627a`. Koyu bölüm `night`, `night-2 #13284a`; koyu üzerinde ikincil metin `mist #a9bbd3`.
- Vurgu: `flag #e2231a` (dolgu, büyük metin, işaret), `flag-ink #b5180f` (açık zeminde küçük metin; dolgulu butonlarda beyaz metinle).
- Pist: `piste-green #1f9d55`, `piste-blue #1d5fd1`, `piste-red`, `piste-black`.
- Odak halkası: mavi (`piste-blue`), koyu zeminde beyaz (`.on-night`). Kontrast hedefi AA.

## Tipografi
- Başlık: Bricolage Grotesque (`font-display`, `.display`: 800, -0.03em, satır 0.98). Gövde: Onest (`font-sans`). Değişkenler layout'ta `--font-display`, `--font-sans`.
- Ölçek: `text-title` (2–3.5rem), `text-lead` (1.06–1.25rem), gövde 1rem. Büyük harf yalnızca küçük etiketlerde (eyebrow, 0.14em).

## Boşluk ve yerleşim
- `wrap` max 1280px, yan boşluk `--gutter` 16–48px; bölüm dikey boşluğu `section-y` 64–104px. Dokunma alanı `tap` ≥ 44px. Köşe: butonlar tam yuvarlak, kartlar 16px.
- Ritim: glacier → glacier-2 → night bandı (Teslimde birlikte kontrol) → glacier → … → night-2 kapanış.

## Hareket
- Hero: katmanlı SVG dağ silüetleri kaydırmayla parallax, kendini çizen noktalı slalom izi ve kırmızı/mavi bayrak kapıları, hafif kar (canvas), başlıkta kelime girişi.
- Bölüm girişi `Reveal` (bir kez, 28px), sayaç `StatCounter`. Hepsi `prefers-reduced-motion`'da kapanır (canvas gizlenir, parallax ve çizim düz).

## Reddedilenler
- Koyu asfalt zemin ve turuncu vurgu: kış ve kayak işine uymuyor, aydınlık kar dili seçildi; ayrıca jenerik "premium koyu tema". Yerine aydınlık pist haritası.
- Mor degrade ve cam efekti (backdrop-blur kart yığınları): şablon görünümü.
- Yol/far/şerit efektleri (perspektif yol, far ışığı): kayak işine ait değil.
- Emoji ikon, jenerik eşit kart ızgarası.

# DESIGN — Atalay Kayak Evi ("Pist haritası ve skipas")

## Fikir

Sayfa bir kayak merkezinin afiş gibi çizilmiş pist haritasıdır; kiralama formu da o haritanın skipası. Harita lejantı aynı zamanda seviye seçimidir: "Orta"ya dokununca kırmızı pist öne çıkar, askılı kartın Seviye satırına yazılır. Ekipman, kişi ve tarih de karta canlı yazılır, iki tarih seçilince gün sayısı kocaman basılır. Kart dolunca "WhatsApp'tan gönder".

Yön: tasteskill "Dressed as something else" (`borrowed-category`), seed 1067667402, `--keep palette,type`. Ödünç alınan kategori: kayak merkezi basılı malzemesi (pist haritası, tabela, skipas). Skill'in hero ve bölüm taslakları bu projenin kesin kurallarıyla değiştirildi (bkz. Reddedilenler).

Tek canlı şey: seviye seçince pist vurgusu ve kartın dolması. Sürükleme, ovalama, çekme, kaydırıcı yok; yalnız dokunuş ve seçim.

## Renk

Tokenlar yalnız `app/globals.css` içindeki `@theme` bloğunda. Bileşenler ve SVG `var(--color-…)` ya da Tailwind yardımcılarını kullanır. Tek istisna `app/opengraph-image.tsx` (ImageResponse CSS değişkeni okumaz) ve `app/icon.svg`.

| Rol | Token | Değer |
|---|---|---|
| Zemin, kar | `glacier` | `#f3f7fa` |
| İkincil zemin | `glacier-2` | `#e2ebf2` |
| Kart, form alanı | `paper` | `#ffffff` |
| Metin, koyu alan | `night` / `ink`, `night-2` | `#0b1b33`, `#13284a` |
| İkincil not | `muted` | `#4a5a72` |
| Gök (afiş, yorumlar) | `sky` | `#17528f` |
| Tek vurgu, eylem, kart şeridi ve ipi | `flag`, `flag-ink` | `#d81f16`, `#b5180f` |
| Pistler | `piste-green`, `piste-blue`, `piste-red`, `piste-black` | `#15803f`, `#1d5fd1`, `#d81f16`, `#0b0f17` |
| Çizim boyaları | `ridge`, `shade`, `shade-deep`, `rock`, `pine`, `pine-lit`, `metal` | `globals.css` |

- Yeşil, eski değerinden koyulaştırıldı: tam genişlik bantta beyaz yazı AA geçsin.
- Yüzeyler çizgiyle değil düz renk basamağıyla ayrılır. Çizgi yalnız bot numarası tablosunda. Gölge, gradyan, glass yok.
- Pist renkleri yalnız seviye anlamı taşır (harita, tabela, seviye bantları). Eylem her zaman `flag`.

## Tipografi

- Tek aile iki genişlik: başlık **Sofia Sans Extra Condensed** (tabela hissi, 700/800, büyük harf), gövde **Sofia Sans**. `latin-ext` yüklü; İ, Ş, Ğ, Ü, Ö, Ç ekran görüntüsünde kontrol edildi.
- Büyük harfe `text-transform` ile geçilir, `lang="tr"` sayesinde i, İ olur. Satır aralığı 0.92-0.94: daha sıkıysa Ş'in çengeli alttaki İ'nin noktasına değiyor.
- Adımlar: `text-small` 15px, `text-body` 17px, `text-lead` 19-23px, `text-title` 44-96px, `text-poster` (hero). Kart ve liste başlıkları bu adımlar arasında `clamp` kullanır.
- Başlıklar her genişlikte en çok iki satır. Form alanları 16px (iOS yakınlaştırmasın).

## Yerleşim

- `wrap` en çok 1440px, kenar `--gutter` 16-48px, bölüm boşluğu `--section-y` 72-136px, dokunma hedefi en az 44px.
- Köşe: düğme ve alanlar köşeli (tabela). Yuvarlak köşe yalnız kartın kendisinde, çünkü gerçek bir plastik kart öyledir.
- Bölümler pist gibi numaralıdır: `PisteHeading` tabelası (yeşil daire, mavi kare, kırmızı ve siyah baklava) ve başlık. Numara süs değil, haritanın diliyle yol gösterir.
- Komşu bölümler farklı kompozisyondadır: hero afiş, form kart ve seçimler, ekipman kenar kenara dört alan, adımlar çapraz slalom kapıları, teslim koyu alanda büyük liste, seviye dört renk bandı, yorumlar delikli fişler, SSS düz satırlar, konum büyük adres ve harita, kapanış kesilmiş dev ad.

## Skipas ve telefon

- Masaüstü: kart solda `sticky`, seçimler sağda; "WhatsApp'tan gönder" kartın altında.
- Telefon: kart üstte, seçimler altta. Kart ekrandan çıkınca koyu özet şeridi (`2 ekipman · 2 kişi · 3 gün` ve pist tabelası) başlığın altına yapışır, seçim sırasında durum görünür kalır. Seviye seçiminin üstünde küçük harita vardır, büyük harita ekranda değilken de pist vurgulanır.
- Alttaki sabit WhatsApp çubuğu form görünürken geri çekilir: boş mesajlı düğme, dolu formun önüne geçmesin.
- Kartın altında yazar: kart lift bileti değil, kiralama isteğinin özetidir.
- Seçim durumu `RentalContext` içinde; lejant, harita, kart aynı durumu okur, sayfalar arası geçişte korunur.
- `DateField` yapısı ve tarih düzeltme mantığı önceki hâliyle korundu (görünmez yerel tarih alanı üstte durur).

## Hareket

Sürekli hareket ve kaydırmaya bağlı JS yok; `motion` kütüphanesi artık içe aktarılmıyor. Bölüm giriş animasyonu yok.

| Ne | Nasıl | `prefers-reduced-motion` |
|---|---|---|
| Pist vurgusu | 180ms opaklık, tabelada 220ms ölçek | Anında |
| Kart sallanması | Seçimde bir kez, 420ms `rotate` (WAAPI) | Çalışmaz |
| Karta yazılan değer | 240ms opaklık ve 6px kayma | Anında |
| Düğme | Arka plan tonu, basınca `scale(0.98)` | Yalnız ton |
| Mobil menü | Kısa `translate` ve opaklık | Anında |

## Görseller

- Harita `scripts/draw-map.mjs` ile sabit tohumdan üretilir, düz boyalı SVG'dir; filtre ve karışım modu yoktur. Çizim temsilidir: pistler ve numaralar uydurma değil, "gerçek değil" diye belirtilir (hero notu ve footer).
- Ekipman fotoğrafları mevcut Pexels görselleridir; künyesi her alanın içinde, footer'da "örnektir" notu var.

## Reddedilenler

- **Mor gradyan, ortalanmış hero, üçlü ikon kart, eyebrow + başlık, glass, her yerde `rounded-2xl`:** AI şablonu görünümü (brief kuralı).
- **Önceki tasarımdaki parallax dağlar, canvas kar, kendini çizen slalom izi, sayaç, her bölümde `Reveal`:** kaydırmaya bağlı ve sürekli hareket; 4x CPU'da telefonda takılma riski. Kaldırıldı.
- **Bricolage Grotesque + Onest:** önceki yöndü; tabela ve pist haritası dili için fazla yumuşak.
- **Aydınlık zeminli hero:** afiş etkisi vermiyor; düz koyu mavi gök ve beyaz dağ seçildi.
- **Koyu asfalt zemin ve turuncu vurgu, yol/far efektleri:** kayak işine ait değil (önceki oturumda da reddedildi).
- **Skill'in "Flush-left shout, seam photograph" hero'su ve kıyı fotoğraf seti:** brief ilk ekranda kodla çizilmiş dağ istiyor; deniz fotoğrafının yeri yok. Sol üstte büyük başlık mantığı korundu.
- **Skill'in `still-page` ve `no-footage` şartları (en az sekiz hareketli öğe, döngü video):** brief kısa hareket ve performans kuralı koyuyor. Bulgu bilerek kabul edildi.
- **Skill'in `covered-text` bulgusu:** sabit WhatsApp çubuğu ve yapışan özet şeridi kaydırırken metnin üstünden geçer; işin ana eylemi olduğu için kabul edildi.
- **Skill'in "numara yok" kuralı:** bölüm numaraları pist numarası olarak brief'in açık isteği.
- **Sürükleme, ovalama, çekme, kaydırıcı:** brief yasağı; dokunmada dikey kaydırmayla çatışır.
- **Haritada işletmeyi pistin dibinde göstermek:** adres Yunusemre Mahallesi; dükkanın pistte olduğu izlenimi yanlış olur. Pin yok, konum gerçek haritada.
- **Gerçek pist adı, gerçek Palandöken haritası:** elimizde doğrulanmış veri yok.
- **"Sorulacak" rozeti, `[DOLDURULACAK]` metni:** müşteriye iş listesi gösterir. Yerine soru hazır gelen "WhatsApp'tan sorun" bağlantısı.
- **"En çok sorulan" rozeti:** doğrulanmış değil ve hap rozet kalıbı.
- **Sabit "WhatsApp" kapsülü (masaüstü):** başlıkta zaten var, gölgeli yüzen düğme gerekmiyor.
- **Boş kartta "Fiyat" satırı, otel teslimi, marka, sezon tarihi, garanti, kuruluş yılı:** kaynakta yok, uydurulmaz.

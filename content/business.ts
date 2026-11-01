/**
 * Sitenin TEK içerik kaynağı. Başka bir işletmeye uyarlarken önce bu dosya değişir;
 * bileşenler işletme adı, adres, telefon, ekipman ve metinleri yalnızca buradan okur.
 *
 * Kural: işletmeden doğrulanmamış bilgi uydurulmaz. Bilinmeyen alanlarda "[DOLDURULACAK: …]"
 * yer tutucusu kullanılır. Kaynak (2026-11-01): Google Haritalar kaydı "Atalay Kayak Evi"
 * (Kayak Kiralama Hizmeti, 4,8 / 83 yorum, "Web sitesi ekleyin" boş).
 * Ekipman markası, fiyat, beden aralığı UYDURULMAZ.
 */

export type Source = "google" | "dogrulanacak" | "genel";

export const business = {
  name: "Atalay",
  displayName: "Atalay Kayak Evi",
  category: "Kayak ve snowboard kiralama",
  city: "Erzurum",
  district: "Palandöken",
  address: {
    full: "Yunusemre Mh., 25080 Palandöken / Erzurum",
    street: "Yunusemre Mahallesi",
    locality: "Palandöken",
    region: "Erzurum",
    postalCode: "25080",
    country: "TR",
    landmark: "Yunusemre Mahallesi, Palandöken",
    detail: "[DOLDURULACAK: sokak, numara ve tarif (ör. hangi caddenin üzerinde)]",
  },
  geo: { lat: 39.8837424, lng: 41.2732131, plusCode: "V7MF+F7 Palandöken, Erzurum" },
  maps: {
    placeUrl: "https://www.google.com/maps/place/Atalay+Kayak+Evi/@39.8837424,41.2732131,17z",
    directionsUrl: "https://www.google.com/maps/dir/?api=1&destination=Atalay+Kayak+Evi+Erzurum",
    embedUrl: "https://www.google.com/maps?q=39.8837424,41.2732131&z=16&output=embed",
    embedTitle: "Atalay Kayak Evi konumu, Yunusemre, Palandöken",
  },
  phone: { display: "0545 632 88 25", e164: "+905456328825", source: "google" as Source },
  /** Google'daki cep numarasının WhatsApp hattı olduğu varsayıldı; göstermeden önce doğrulanmalı */
  whatsapp: "905456328825",
  whatsappVerified: false,
  whatsappMessage: "Merhaba, web sitenizden yazıyorum. Kayak ekipmanı kiralamak için fiyat ve müsaitlik öğrenmek istiyorum.",
  instagram: null as { handle: string; url: string } | null,
  /** Google'da yalnızca "Açılış 08:00" görüldü; sezon dışı saatler bilinmiyor */
  hours: [
    { days: "Sezon içi her gün", time: "08:00 – [DOLDURULACAK: kapanış]" },
    { days: "Sezon dışı", time: "[DOLDURULACAK: açık mı, saatler]" },
  ],
  season: "[DOLDURULACAK: sezon açılış tarihi, ör. Aralık ortası]",
  google: { rating: 4.8, reviewCount: 83, checkedAt: "2026-11-01" },
  website: null as string | null,
  logo: null as string | null,
} as const;

/** Kiralanabilir ekipman. Kategoriler sektör geneli; içerik, marka ve fiyat işletmeden alınacak. */
export type PhotoKey = "hero" | "ski" | "snowboard" | "boots" | "helmet" | "apparel" | "slope" | "shop" | "lift";

export type Equipment = {
  id: string;
  name: string;
  includes: string;
  forWho: string;
  dailyPrice: string | null;
  highlight?: string;
  photoKey: PhotoKey;
  source: Source;
};

export const equipment: Equipment[] = [
  {
    id: "kayak-takimi",
    name: "Kayak takımı",
    includes: "Kayak, bağlama, bot ve baton",
    forWho: "İlk kez kayacaklardan ileri seviyeye",
    dailyPrice: null,
    highlight: "En çok sorulan",
    photoKey: "ski",
    source: "dogrulanacak",
  },
  {
    id: "snowboard-takimi",
    name: "Snowboard takımı",
    includes: "Snowboard, bağlama ve bot",
    forWho: "Regular ya da goofy duruşa göre ayarlanır",
    dailyPrice: null,
    photoKey: "snowboard",
    source: "dogrulanacak",
  },
  {
    id: "kiyafet",
    name: "Kayak kıyafeti",
    includes: "Mont ve pantolon",
    forWho: "Kar kıyafeti olmadan gelenler için",
    dailyPrice: null,
    photoKey: "apparel",
    source: "dogrulanacak",
  },
  {
    id: "kask-gozluk",
    name: "Kask ve gözlük",
    includes: "Kask, kayak gözlüğü",
    forWho: "Çocuklar ve ilk kez kayacaklar için özellikle önerilir",
    dailyPrice: null,
    photoKey: "helmet",
    source: "dogrulanacak",
  },
];

/** Pist renkleri (Avrupa/Türkiye pist işaretleme geleneği). Seviye seçiminde kullanılır. */
export const levels = [
  { id: "ilk", label: "İlk kez", piste: "green", hint: "Hiç kaymadım" },
  { id: "baslangic", label: "Başlangıç", piste: "blue", hint: "Kar sapanıyla dönebiliyorum" },
  { id: "orta", label: "Orta", piste: "red", hint: "Paralel dönüş yapıyorum" },
  { id: "ileri", label: "İleri", piste: "black", hint: "Her pistte rahatım" },
] as const;

export const steps = [
  { title: "Ekipmanı ve günleri seçin", text: "Kaç kişi, hangi ekipman, hangi tarihler; seviye ve bot numarası da eklenebilir." },
  { title: "WhatsApp'tan gönderin", text: "Seçimleriniz hazır bir mesaja dönüşür; tek dokunuşla bize ulaşır." },
  { title: "Gelin, deneyin, teslim alın", text: "Botu ayağınızda deneyip ekipmanı birlikte kontrol ederek teslim alırsınız." },
];

/**
 * Genel bot numarası tablosu (EU ↔ Mondopoint, yaklaşık). Sektör genel bilgisi; mağazada denenerek netleşir.
 */
export const bootSizes = [
  { eu: "36", mondo: "23" },
  { eu: "37", mondo: "23,5" },
  { eu: "38", mondo: "24" },
  { eu: "39", mondo: "25" },
  { eu: "40", mondo: "25,5" },
  { eu: "41", mondo: "26" },
  { eu: "42", mondo: "27" },
  { eu: "43", mondo: "27,5" },
  { eu: "44", mondo: "28,5" },
  { eu: "45", mondo: "29" },
  { eu: "46", mondo: "30" },
];

/** Genel kayak boyu kuralı (sektör genel bilgisi; seviye ve kiloya göre mağazada ayarlanır) */
export const skiLengthRule = [
  { level: "İlk kez / başlangıç", rule: "Boyunuzdan yaklaşık 15–20 cm kısa" },
  { level: "Orta", rule: "Boyunuzdan yaklaşık 5–10 cm kısa" },
  { level: "İleri", rule: "Boyunuza yakın ya da biraz uzun" },
];

/** Google yorumlarından kısa alıntılar (2026-11-01'de görüldü). Uydurma yok; adlar kısaltıldı. */
export const reviews = [
  {
    initials: "M. T.",
    text: "Her müşteriyle tek tek ilgileniyorlar. Başka şehirden gelen biri olarak çok memnun kaldım, tavsiye ederim.",
    when: "2026",
  },
  {
    initials: "B. Ö.",
    text: "Üründen çok memnun kaldım, kaliteli ve güzel. Atalay Kayak Evi'ne teşekkür ederim.",
    when: "Ekim 2026",
  },
];

export const faqs: { q: string; a: string; source: Source }[] = [
  {
    q: "Fiyatı nasıl öğrenirim?",
    a: "Ekipmanı, kişi sayısını ve günleri seçip WhatsApp'tan gönderin; müsaitliği ve günlük fiyatı size yazalım.",
    source: "dogrulanacak",
  },
  {
    q: "Bot numaramı bilmiyorum, sorun olur mu?",
    a: "Olmaz. Ayakkabı numaranızı yazmanız yeterli; bot mağazada ayağınızda denenerek seçilir.",
    source: "genel",
  },
  {
    q: "Ekipmanı teslim alırken neye bakmalıyım?",
    a: "Kayak tabanını, kenarları ve bağlamaları birlikte kontrol ederiz; botun topuğunuzu kaldırmadan sıkı oturduğundan emin olun.",
    source: "dogrulanacak",
  },
  {
    q: "Ekipmanda sorun çıkarsa ne oluyor?",
    a: "[DOLDURULACAK: değişim / iade nasıl yapılıyor, dağda destek var mı]",
    source: "dogrulanacak",
  },
  {
    q: "Otele teslim ya da çocuk ekipmanı var mı?",
    a: "[DOLDURULACAK: otel teslimi ve çocuk bedenleri]",
    source: "dogrulanacak",
  },
  {
    q: "Depozito ya da kimlik istiyor musunuz?",
    a: "[DOLDURULACAK: depozito / kimlik bırakma koşulu]",
    source: "dogrulanacak",
  },
];

export const demo = {
  label: "Demo",
  note: "Bu sayfa Atalay Kayak Evi için hazırlanmış bir tasarım önizlemesidir; henüz işletme tarafından onaylanmamıştır.",
};

export const nav = [
  { href: "/kiralama", label: "Kiralama" },
  { href: "/rehber", label: "Beden rehberi" },
  { href: "/iletisim", label: "İletişim" },
] as const;

export const site = {
  title: "Atalay Kayak Evi · Erzurum Palandöken kayak ve snowboard kiralama",
  description:
    "Erzurum Palandöken'de kayak takımı, snowboard, kıyafet, kask ve gözlük kiralama. Ekipmanı ve günleri seçin, WhatsApp'tan fiyat alın.",
};

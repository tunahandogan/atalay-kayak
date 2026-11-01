/**
 * Stok görseller. İşletmenin kendi fotoğrafları kullanılmaz; her görsel telifsiz kaynaktan
 * (Pexels / Unsplash) alınır ve `credit` ile künyelenir. Görsel yoksa değer `null` kalır,
 * bileşenler o durumda degrade/illüstrasyon yedeği gösterir.
 */
import type { StaticImageData } from "next/image";
import type { PhotoKey } from "./business";

import hero from "@/public/images/stok/hero.jpg";
import ski from "@/public/images/stok/ski.jpg";
import snowboard from "@/public/images/stok/snowboard.jpg";
import boots from "@/public/images/stok/boots.jpg";
import helmet from "@/public/images/stok/helmet.jpg";
import apparel from "@/public/images/stok/apparel.jpg";
import slope from "@/public/images/stok/slope.jpg";
import shop from "@/public/images/stok/shop.jpg";
import lift from "@/public/images/stok/lift.jpg";

export type Photo = {
  src: StaticImageData;
  alt: string;
  focal?: string;
  credit: { author: string; source: "Pexels" | "Unsplash"; url: string };
};

export const photos: Record<PhotoKey, Photo | null> = {
  hero: {
    src: hero,
    alt: "Mavi gökyüzü altında pistte dönen kayakçı ve üstünde kırmızı teleferik kabinleri",
    focal: "50% 60%",
    credit: { author: "AS Photography", source: "Pexels", url: "https://www.pexels.com/photo/person-riding-ski-on-snow-field-937692/" },
  },
  ski: {
    src: ski,
    alt: "Ahşap zeminde yan yana dizilmiş kayaklar, baton ve kayak botları",
    focal: "50% 50%",
    credit: { author: "Pixabay", source: "Pexels", url: "https://www.pexels.com/photo/flatlay-of-skiing-equipment-257961/" },
  },
  snowboard: {
    src: snowboard,
    alt: "Güneşli pistte snowboard üzerinde duran, uzaktaki dağlara bakan snowboardcu",
    focal: "40% 60%",
    credit: { author: "Xue Guangjian", source: "Pexels", url: "https://www.pexels.com/photo/person-snowboarding-on-field-1705667/" },
  },
  boots: {
    src: boots,
    alt: "Karın üzerinde duran bir kayakçının kayak botları, yakın çekim",
    focal: "50% 45%",
    credit: { author: "Nati", source: "Pexels", url: "https://www.pexels.com/photo/close-up-of-a-person-in-ski-boots-15324801/" },
  },
  helmet: {
    src: helmet,
    alt: "Kask ve aynalı kayak gözlüğü takan, saçlarına kar yağmış kayakçı",
    focal: "50% 40%",
    credit: { author: "Haziq Farooqi", source: "Pexels", url: "https://www.pexels.com/photo/skier-with-gray-helmet-and-goggles-with-snow-on-hair-20419666/" },
  },
  apparel: {
    src: apparel,
    alt: "Mavi mont ve sarı kayak pantolonuyla pistte kayan kayakçı",
    focal: "50% 50%",
    credit: { author: "Ollie Craig", source: "Pexels", url: "https://www.pexels.com/photo/photo-of-a-skier-wearing-a-blue-ski-jacket-and-yellow-trousers-on-a-ski-slope-19755888/" },
  },
  slope: {
    src: slope,
    alt: "Karı savurarak hızlı dönüş yapan, kırmızı kasklı genç kayakçı",
    focal: "60% 40%",
    credit: { author: "Visit Almaty", source: "Pexels", url: "https://www.pexels.com/photo/man-doing-ice-skiing-on-snow-field-in-shallow-focus-photography-848618/" },
  },
  shop: {
    src: shop,
    alt: "Kayak dükkanında raflarda snowboardlar, duvarda kasklar, önde kayak ve baton",
    focal: "50% 50%",
    credit: { author: "Патимат Магомедова", source: "Pexels", url: "https://www.pexels.com/photo/ski-and-snowboard-equipment-store-interior-display-34771214/" },
  },
  lift: {
    src: lift,
    alt: "Karlı dağ sırtında telesiyej hattı ve direği, arkada uzanan zirveler",
    focal: "60% 60%",
    credit: { author: "Viceman S", source: "Pexels", url: "https://www.pexels.com/photo/scenic-snowy-mountain-landscape-with-ski-lift-30816460/" },
  },
};

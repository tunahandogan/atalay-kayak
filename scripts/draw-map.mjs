/**
 * Temsili pist haritasını üretir: node scripts/draw-map.mjs
 * Sabit tohumla çalışır, hep aynı çizimi yazar. Çıktı: components/map/art-core.ts ve art-detail.ts.
 * Çizim Palandöken'in gerçek pist haritası DEĞİLDİR. Renkler bileşende tokenlardan gelir.
 */
import { writeFileSync } from "node:fs";

let seed = 19731;
const rnd = () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646;
const between = (a, b) => a + rnd() * (b - a);
const n = (v) => Math.round(v * 10) / 10;

/** Orta nokta kaydırma: düz kenarları el çizimi gibi kırar */
function rough(pts, iters = 2, amp = 12) {
  let out = pts;
  for (let k = 0; k < iters; k++) {
    const next = [out[0]];
    for (let i = 1; i < out.length; i++) {
      const [ax, ay] = out[i - 1];
      const [bx, by] = out[i];
      next.push([(ax + bx) / 2 + between(-amp, amp) * 0.6, (ay + by) / 2 + between(-amp, amp)], [bx, by]);
    }
    out = next;
    amp *= 0.55;
  }
  return out;
}
const poly = (pts) => `M${pts.map(([x, y]) => `${n(x)} ${n(y)}`).join("L")}Z`;

/** Catmull-Rom'dan kübik eğri: pist çizgileri */
function curve(p) {
  let d = `M${p[0][0]} ${p[0][1]}`;
  for (let i = 0; i < p.length - 1; i++) {
    const p0 = p[i - 1] ?? p[i];
    const p1 = p[i];
    const p2 = p[i + 1];
    const p3 = p[i + 2] ?? p2;
    d += `C${n(p1[0] + (p2[0] - p0[0]) / 6)} ${n(p1[1] + (p2[1] - p0[1]) / 6)} ${n(p2[0] - (p3[0] - p1[0]) / 6)} ${n(p2[1] - (p3[1] - p1[1]) / 6)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

const H = 820;
const W = 1440;

/* ---------- Sırtlar ---------- */
const farLine = rough(
  [[0, 470], [130, 420], [270, 450], [430, 372], [570, 420], [720, 318], [860, 300], [1010, 150], [1180, 118], [1290, 176], [1440, 150]],
  2,
  14,
);
const far = poly([...farLine, [W, H], [0, H]]);

const ridge = rough(
  [[0, 610], [170, 566], [330, 540], [480, 486], [630, 452], [770, 372], [890, 252], [965, 158], [1034, 62], [1092, 128], [1152, 112], [1218, 188], [1306, 246], [1440, 318]],
  2,
  11,
);
const massif = poly([...ridge, [W, H], [0, H]]);

/* ---------- Gölgeli yamaçlar (ışık soldan) ---------- */
const spurs = [
  { s: [[1034, 62], [1012, 190], [1056, 300], [1004, 430], [1048, 560]], w: 112 },
  { s: [[1152, 112], [1182, 270], [1150, 396], [1214, 560], [1190, 690]], w: 128 },
  { s: [[890, 252], [866, 360], [906, 468], [852, 590]], w: 78 },
  { s: [[1306, 246], [1330, 380], [1300, 500], [1356, 640]], w: 120 },
  { s: [[630, 452], [606, 548], [654, 640]], w: 66 },
  { s: [[330, 540], [348, 622], [306, 706]], w: 70 },
];
let shade = "";
let shadeDeep = "";
let hatch = "";
for (const { s, w } of spurs) {
  const line = rough(s, 2, 8);
  const back = line
    .map(([x, y], i) => {
      const t = i / (line.length - 1);
      return [x + Math.sin(Math.PI * Math.min(1, t * 1.15)) * w + between(-9, 9), y + 10 + between(-5, 5)];
    })
    .reverse();
  shade += poly([...line, ...back]);
  const upper = line.slice(0, Math.ceil(line.length * 0.55));
  const deep = upper
    .map(([x, y], i) => {
      const t = i / (upper.length - 1);
      return [x + Math.sin(Math.PI * t) * w * 0.42 + between(-5, 5), y + 6];
    })
    .reverse();
  shadeDeep += poly([...upper, ...deep]);
  // Fırça darbeleri: yamaç eğimi yönünde kısa çizgiler
  for (let i = 0; i < 46; i++) {
    const t = rnd();
    const at = line[Math.floor(t * (line.length - 1))];
    const x = at[0] + between(4, Math.max(5, Math.sin(Math.PI * Math.min(1, t * 1.15)) * w));
    const y = at[1] + between(-4, 12);
    const len = between(9, 24);
    hatch += `M${n(x)} ${n(y)}l${n(len * 0.42)} ${n(len)}`;
  }
}
// Aydınlık yamaçta seyrek kar izleri
let drift = "";
for (let i = 0; i < 70; i++) {
  const x = between(60, 1400);
  const y = between(560, 800);
  const len = between(24, 70);
  drift += `M${n(x)} ${n(y)}q${n(len / 2)} ${n(between(-7, 3))} ${n(len)} ${n(between(-2, 8))}`;
}

/* ---------- Kaya ---------- */
const rock = [
  [[1034, 62], [1056, 108], [1040, 138], [1028, 104]],
  [[1062, 118], [1088, 150], [1072, 182], [1058, 150]],
  [[1152, 112], [1172, 150], [1160, 196], [1146, 152]],
  [[965, 158], [980, 204], [962, 236], [956, 196]],
  [[1218, 188], [1240, 228], [1226, 262], [1212, 226]],
  [[890, 252], [906, 292], [888, 322], [880, 284]],
  [[770, 372], [786, 404], [772, 430], [762, 402]],
]
  .map((p) => poly(rough(p, 1, 4)))
  .join("");

/* ---------- Pistler ---------- */
const pistes = {
  green: [[806, 470], [712, 512], [618, 590], [690, 672], [604, 752], [672, 820]],
  blue: [[934, 292], [858, 408], [928, 516], [826, 616], [878, 716], [796, 820]],
  red: [[1026, 92], [992, 232], [1032, 354], [966, 470], [1024, 604], [946, 706], [982, 820]],
  black: [[1066, 138], [1096, 272], [1072, 398], [1104, 520], [1078, 650], [1128, 820]],
};
const pistePaths = Object.fromEntries(Object.entries(pistes).map(([k, v]) => [k, curve(v)]));
const signs = { green: [664, 548], blue: [892, 462], red: [1012, 296], black: [1084, 336] };

/* ---------- Telesiyej ---------- */
const lift = { a: [742, 776], b: [1012, 112] };
const pylons = [0.14, 0.32, 0.5, 0.68, 0.86].map((t) => [lift.a[0] + (lift.b[0] - lift.a[0]) * t, lift.a[1] + (lift.b[1] - lift.a[1]) * t]);
let pylon = "";
for (const [x, y] of pylons) pylon += `M${n(x)} ${n(y)}v30M${n(x - 9)} ${n(y)}h18`;
let chairs = "";
for (let t = 0.07; t < 0.96; t += 0.09) {
  const x = lift.a[0] + (lift.b[0] - lift.a[0]) * t;
  const y = lift.a[1] + (lift.b[1] - lift.a[1]) * t;
  chairs += `M${n(x)} ${n(y)}v10M${n(x - 5)} ${n(y + 10)}h10v5`;
}

/* ---------- Çamlar ---------- */
const nearPiste = (x, y) => {
  for (const key of Object.keys(pistes)) {
    const p = pistes[key];
    for (let i = 1; i < p.length; i++) {
      for (let t = 0; t <= 1; t += 0.12) {
        const px = p[i - 1][0] + (p[i][0] - p[i - 1][0]) * t;
        const py = p[i - 1][1] + (p[i][1] - p[i - 1][1]) * t;
        if ((px - x) ** 2 + (py - y) ** 2 < 900) return true;
      }
    }
  }
  return false;
};
const clusters = [
  [110, 720, 90, 34, 22], [250, 660, 80, 30, 18], [410, 742, 96, 36, 26], [520, 640, 62, 26, 14], [520, 790, 70, 20, 16],
  [752, 610, 46, 34, 14], [760, 716, 36, 34, 12], [966, 620, 26, 40, 9], [1190, 610, 40, 40, 14], [1260, 742, 110, 40, 30],
  [1370, 600, 66, 50, 20], [1050, 770, 34, 28, 10], [900, 780, 42, 22, 10], [570, 520, 40, 20, 8], [1320, 470, 40, 30, 10],
];
const trees = [];
for (const [cx, cy, sx, sy, count] of clusters) {
  for (let i = 0; i < count; i++) {
    const x = cx + between(-sx, sx);
    const y = cy + between(-sy, sy);
    if (!nearPiste(x, y) && y < 816) trees.push([x, y]);
  }
}
trees.sort((a, b) => a[1] - b[1]);
let treeDark = "";
let treeLit = "";
for (const [x, y] of trees) {
  const s = 0.72 + (y / H) * 0.62 + between(-0.08, 0.08);
  const h = 26 * s;
  const w = 8 * s;
  treeDark += `M${n(x)} ${n(y - h)}L${n(x + w * 0.62)} ${n(y - h * 0.58)}L${n(x + w * 0.38)} ${n(y - h * 0.58)}L${n(x + w)} ${n(y - 3)}L${n(x + 1.5)} ${n(y - 3)}V${n(y)}H${n(x - 1.5)}V${n(y - 3)}L${n(x - w)} ${n(y - 3)}L${n(x - w * 0.38)} ${n(y - h * 0.58)}L${n(x - w * 0.62)} ${n(y - h * 0.58)}Z`;
  treeLit += `M${n(x)} ${n(y - h)}L${n(x - w * 0.62)} ${n(y - h * 0.58)}L${n(x - w * 0.38)} ${n(y - h * 0.58)}L${n(x - w)} ${n(y - 3)}L${n(x)} ${n(y - 3)}Z`;
}

/* ---------- İstasyon ---------- */
const station = "M716 792l26-20 26 20v18h-52ZM790 800l16-13 16 13v12h-32ZM672 804l13-11 13 11v10h-26Z";

const header = "// scripts/draw-map.mjs üretir; elle değiştirmeyin.\n";
writeFileSync(
  new URL("../components/map/art-core.ts", import.meta.url),
  `${header}export const MAP_W = ${W};\nexport const MAP_H = ${H};\nexport const far = ${JSON.stringify(far)};\nexport const massif = ${JSON.stringify(massif)};\nexport const shade = ${JSON.stringify(shade)};\nexport const rock = ${JSON.stringify(rock)};\nexport const pistes = ${JSON.stringify(pistePaths)} as const;\nexport const signs = ${JSON.stringify(signs)} as const;\nexport const lift = ${JSON.stringify(lift)};\n`,
);
writeFileSync(
  new URL("../components/map/art-detail.ts", import.meta.url),
  `${header}export const shadeDeep = ${JSON.stringify(shadeDeep)};\nexport const hatch = ${JSON.stringify(hatch)};\nexport const drift = ${JSON.stringify(drift)};\nexport const pylon = ${JSON.stringify(pylon)};\nexport const chairs = ${JSON.stringify(chairs)};\nexport const treeDark = ${JSON.stringify(treeDark)};\nexport const treeLit = ${JSON.stringify(treeLit)};\nexport const station = ${JSON.stringify(station)};\n`,
);
console.log(`trees ${trees.length}`);

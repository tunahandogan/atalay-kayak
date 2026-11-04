import { ImageResponse } from "next/og";
import { business, demo } from "@/content/business";

export const alt = `${business.displayName} · Erzurum kayak ve snowboard kiralama`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const GLACIER = "#f5f8fb";
const NIGHT = "#0b1b33";
const FLAG = "#e2231a";

const TITLE = business.displayName.toLocaleUpperCase("tr");
const DEMO = demo.label.toLocaleUpperCase("tr");
const LINE1 = `Erzurum kayak kiralama · ${business.district}`;
const LINE2 = "Ekipmanı seçin, WhatsApp'tan fiyat alın";

/** Google Fonts CSS API'den yalnızca gereken glifleri içeren Sofia Sans Extra Condensed TTF'i çeker; ağ yoksa null. */
async function loadFont(text: string, weight: number): Promise<ArrayBuffer | null> {
  try {
    const glyphs = Array.from(new Set(text)).join("");
    const css = await fetch(
      `https://fonts.googleapis.com/css2?family=Sofia+Sans+Extra+Condensed:wght@${weight}&text=${encodeURIComponent(glyphs)}`,
    ).then((r) => (r.ok ? r.text() : ""));
    const url = /src: url\((.+?)\) format\('(?:truetype|opentype)'\)/.exec(css)?.[1];
    if (!url) return null;
    const res = await fetch(url);
    return res.ok ? await res.arrayBuffer() : null;
  } catch {
    return null;
  }
}

export default async function Image() {
  const [bold, medium] = await Promise.all([
    loadFont(`${TITLE}${DEMO}`, 800),
    loadFont(`${LINE1}${LINE2}`, 500),
  ]);
  const family = bold || medium ? "Sofia Sans Extra Condensed" : "sans-serif";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: GLACIER,
          color: NIGHT,
          padding: "64px 72px",
          fontFamily: family,
          position: "relative",
        }}
      >
        {/* Pist kapısı motifi: eğik kırmızı bayrak çizgileri */}
        <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 420, display: "flex" }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                right: 60 + i * 130,
                top: -80,
                width: 14,
                height: 820,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                transform: "rotate(18deg)",
                opacity: 1 - i * 0.3,
              }}
            >
              {[0, 1, 2, 3, 4, 5].map((j) => (
                <div key={j} style={{ width: 14, height: 90, background: FLAG, display: "flex" }} />
              ))}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            border: `2px solid ${NIGHT}`,
            padding: "6px 16px",
            fontSize: 26,
            letterSpacing: 3,
            fontWeight: 800,
          }}
        >
          {DEMO}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", width: 120, height: 10, background: FLAG, marginBottom: 32 }} />
          <div style={{ display: "flex", fontSize: 92, lineHeight: 1, fontWeight: 800, maxWidth: 820 }}>
            {TITLE}
          </div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 28, fontWeight: 500, color: NIGHT }}>{LINE1}</div>
          <div style={{ display: "flex", fontSize: 32, marginTop: 10, fontWeight: 500, color: FLAG }}>{LINE2}</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        ...(bold ? [{ name: "Sofia Sans Extra Condensed", data: bold, weight: 800 as const, style: "normal" as const }] : []),
        ...(medium ? [{ name: "Sofia Sans Extra Condensed", data: medium, weight: 500 as const, style: "normal" as const }] : []),
      ],
    },
  );
}

import { levels } from "@/content/business";
import { pistes, signs } from "@/components/map/art-core";

const COLOR = {
  green: "var(--color-piste-green)",
  blue: "var(--color-piste-blue)",
  red: "var(--color-piste-red)",
  black: "var(--color-piste-black)",
} as const;

function SignShape({ piste, x, y, r, n }: { piste: keyof typeof COLOR; x: number; y: number; r: number; n: number }) {
  const shape =
    piste === "green" ? (
      <circle cx={x} cy={y} r={r} fill={COLOR[piste]} />
    ) : piste === "blue" ? (
      <rect x={x - r * 0.9} y={y - r * 0.9} width={r * 1.8} height={r * 1.8} fill={COLOR[piste]} />
    ) : (
      <path d={`M${x} ${y - r * 1.16}L${x + r * 1.16} ${y}L${x} ${y + r * 1.16}L${x - r * 1.16} ${y}Z`} fill={COLOR[piste]} />
    );
  return (
    <g className="p-sign">
      <circle cx={x} cy={y} r={r * 1.42} fill="var(--color-paper)" />
      {shape}
      <text
        x={x}
        y={y + r * 0.46}
        textAnchor="middle"
        fontSize={r * 1.3}
        fontWeight={800}
        fill="var(--color-paper)"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {n}
      </text>
    </g>
  );
}

/** Dört pist çizgisi ve tabelaları; hem büyük haritada hem skipas yanındaki küçük haritada kullanılır. */
export function MapPistes({ line = 9, glow = 20, signR = 20 }: { line?: number; glow?: number; signR?: number }) {
  return (
    <>
      {levels.map((l, i) => (
        <g key={l.id} className="p" data-p={l.piste}>
          <path d={pistes[l.piste]} fill="none" stroke="var(--color-paper)" strokeWidth={line + 6} strokeLinecap="round" />
          <path
            className="p-glow"
            d={pistes[l.piste]}
            fill="none"
            stroke={COLOR[l.piste]}
            strokeWidth={glow}
            strokeLinecap="round"
          />
          <path d={pistes[l.piste]} fill="none" stroke={COLOR[l.piste]} strokeWidth={line} strokeLinecap="round" />
          <path
            className="p-hit"
            data-pick={l.id}
            d={pistes[l.piste]}
            fill="none"
            stroke="transparent"
            strokeWidth={46}
            strokeLinecap="round"
          />
          <SignShape piste={l.piste} x={signs[l.piste][0]} y={signs[l.piste][1]} r={signR} n={i + 1} />
        </g>
      ))}
    </>
  );
}

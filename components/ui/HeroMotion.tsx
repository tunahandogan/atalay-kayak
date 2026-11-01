"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef } from "react";

/** Başlık: her kelime kendi satır maskesinden yukarı çıkar. */
export function HeroTitle({ lines, id }: { lines: string[][]; id?: string }) {
  const reduce = useReducedMotion();
  let n = 0;
  return (
    <h1 id={id} className="display text-[clamp(2.4rem,10.5vw,5rem)] text-night">
      {lines.map((words, li) => (
        <span key={li} className="block">
          {words.map((w) => {
            const i = n++;
            return (
              <span key={w + i} className="mr-[0.24em] inline-block overflow-hidden pb-[0.1em] align-bottom last:mr-0">
                <motion.span
                  className="inline-block"
                  initial={reduce ? false : { y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </h1>
  );
}

/** Düşük yoğunluklu kar. Görünürken çizer, sekme/ekran dışında durur. */
export function Snow() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let w = 0;
    let h = 0;
    type Flake = { x: number; y: number; r: number; v: number; d: number; p: number };
    let flakes: Flake[] = [];
    let raf = 0;
    let visible = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = w < 640 ? 30 : 56;
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.9 + Math.random() * 2.1,
        v: 14 + Math.random() * 24,
        d: 6 + Math.random() * 14,
        p: Math.random() * Math.PI * 2,
      }));
    };

    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min((t - last) / 1000, 0.05);
      last = t;
      ctx.clearRect(0, 0, w, h);
      for (const f of flakes) {
        f.y += f.v * dt;
        f.p += dt * 0.8;
        const x = f.x + Math.sin(f.p) * f.d;
        if (f.y > h + 4) {
          f.y = -4;
          f.x = Math.random() * w;
        }
        // Açık zeminde görünmesi için hafif mavi kenarlı beyaz tane
        ctx.globalAlpha = 0.45 + f.r / 5;
        ctx.beginPath();
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.lineWidth = 0.8;
        ctx.strokeStyle = "rgba(29,95,209,0.35)";
        ctx.stroke();
      }
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) {
        last = performance.now();
        raf = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    resize();
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);
    const onVis = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("resize", resize);
    start();

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="snow-canvas pointer-events-none absolute inset-0 h-full w-full" />;
}

/* ---------- Dağ silüetleri (parallax) ---------- */

const ridges = [
  // uzak, orta, yakın
  { d: "M0 400V210l110-70 90 56 120-120 150 150 100-80 170 110 120-96 160 120 130-100 150 120 140-60v220Z", fill: "#d3e0ee", shift: 36 },
  { d: "M0 400V270l140-80 80 50 130-110 120 110 90-50 170 120 110-90 150 110 120-70 150 90 130-50v200Z", fill: "#b4c9df", shift: 78 },
  { d: "M0 400V320l160-70 120 60 140-90 130 100 150-60 140 80 120-50 150 70 170-40 160 50v130Z", fill: "#8fabc9", shift: 124 },
  { d: "M0 400V356c200-30 330-12 520-30s330 22 520 4 280-24 400-6v76Z", fill: "#f5f8fb", shift: 0 },
];

function Ridge({ d, fill, shift }: (typeof ridges)[number]) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 700], [0, reduce ? 0 : shift]);
  return (
    <motion.div className="absolute inset-x-0 bottom-0 h-full" style={{ y }}>
      <svg viewBox="0 0 1440 400" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-[42%] w-full lg:h-[54%]" aria-hidden="true">
        <path d={d} fill={fill} />
      </svg>
    </motion.div>
  );
}

/** Pist hattı noktalarından yumuşak yol üretir. */
function smooth(pts: [number, number][]) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [x, y] = pts[i];
    const my = (py + y) / 2;
    d += ` C${px} ${my} ${x} ${my} ${x} ${y}`;
  }
  return d;
}

const DRAW = 3.4;
const START = 0.5;

function Slalom({ w, h, pts, className }: { w: number; h: number; pts: [number, number][]; className: string }) {
  const reduce = useReducedMotion();
  const d = smooth(pts);
  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="xMidYMid slice" className={className} aria-hidden="true">
      <motion.path
        d={d}
        fill="none"
        stroke="#0b1b33"
        strokeOpacity={0.55}
        strokeWidth={3}
        strokeLinecap="round"
        strokeDasharray="1 9"
        initial={reduce ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: DRAW, delay: START, ease: [0.45, 0.05, 0.3, 1] }}
      />
      {pts.slice(1, -1).map(([x, y], i, arr) => {
        const side = i % 2 === 0 ? 1 : -1;
        const blue = i % 2 === 1;
        const at = START + ((i + 1) / (arr.length + 1)) * DRAW;
        return (
          <motion.g
            key={i}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: at, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}
          >
            <line x1={x + side * 26} y1={y} x2={x + side * 26} y2={y - 34} stroke="#0b1b33" strokeWidth={2.5} strokeLinecap="round" />
            <path d={`M${x + side * 26} ${y - 34} l${side * 20} 8 l${-side * 20} 8Z`} fill={blue ? "#1d5fd1" : "#e2231a"} />
          </motion.g>
        );
      })}
    </svg>
  );
}

const deskPts: [number, number][] = [
  [1230, 40], [1100, 190], [1260, 330], [1060, 470], [1220, 590], [900, 690], [1180, 760],
];
const mobPts: [number, number][] = [
  [310, 330], [120, 430], [300, 530], [90, 640], [290, 750], [140, 830],
];

export function HeroScene() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#e3edf7] via-glacier to-glacier" />
      {ridges.map((r) => (
        <Ridge key={r.fill} {...r} />
      ))}
      <Slalom w={1440} h={760} pts={deskPts} className="absolute inset-0 hidden h-full w-full lg:block" />
      <Slalom w={390} h={900} pts={mobPts} className="absolute inset-0 h-full w-full lg:hidden" />
      <Snow />
    </div>
  );
}

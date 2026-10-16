import { Easing, interpolate } from "remotion";

export const WORLD = { width: 5000, height: 5600 };
export const ORIGIN = { x: 1280, y: 1360 };
export const DURATION = 8.5;
export const C = {
  banana: "#FFD62C",
  cream: "#FFF5CF",
  peach: "#F4B294",
  green: "#126843",
  red: "#DA332B",
  ink: "#202A1D",
};
export const COPY = {
  hook: ["¿CONOCES LAS GOMITAS", "QUE", "PUEDES", "PELAR?"],
  discovery: ["ASÍ ES", "PEELERZ."],
  action: "PÉLALA.",
  pack: ["GUMMY", "BANANA"],
  closing: ["CONOCE", "PEELERZ"],
};
export const ease = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.45, 0, 0.2, 1),
} as const;

export type Key = {
  t: number;
  x: number;
  y: number;
  scale: number;
  rotation: number;
};
export const CAMERA: Key[] = [
  { t: 0, x: 1280, y: 1360, scale: 2.35, rotation: -4 },
  { t: 0.6, x: 1290, y: 1380, scale: 1.5, rotation: -2 },
  { t: 1.3, x: 1330, y: 1400, scale: 1.05, rotation: 0 },
  { t: 1.8, x: 1480, y: 1570, scale: 1.18, rotation: 2 },
  { t: 2.4, x: 1700, y: 1860, scale: 1.55, rotation: 4 },
  { t: 2.8, x: 1830, y: 2130, scale: 1.4, rotation: 3 },
  { t: 3.3, x: 1930, y: 2290, scale: 1.1, rotation: 0 },
  { t: 3.8, x: 2070, y: 2420, scale: 1.1, rotation: -2 },
  { t: 4.4, x: 2200, y: 2530, scale: 1.32, rotation: -3 },
  { t: 5, x: 2500, y: 2890, scale: 1.15, rotation: -1 },
  { t: 5.7, x: 2890, y: 3320, scale: 0.97, rotation: 1 },
  { t: 6.5, x: 3100, y: 3500, scale: 1.04, rotation: 2 },
  { t: 7.3, x: 3060, y: 3480, scale: 0.91, rotation: 0 },
  { t: 8.5, x: 3020, y: 3460, scale: 0.82, rotation: -2 },
];
export const GUMMY: Key[] = [
  { t: 0, x: 1260, y: 1320, scale: 1, rotation: -11 },
  { t: 1.3, x: 1540, y: 1450, scale: 1, rotation: -7 },
  { t: 2.4, x: 1800, y: 2050, scale: 1, rotation: 10 },
  { t: 2.8, x: 1980, y: 2300, scale: 1, rotation: 6 },
  { t: 3.3, x: 2100, y: 2480, scale: 1, rotation: -6 },
  { t: 3.8, x: 2240, y: 2570, scale: 1.04, rotation: -9 },
  { t: 4.4, x: 2370, y: 2710, scale: 1.08, rotation: -5 },
  { t: 5, x: 2780, y: 3200, scale: 0.95, rotation: 5 },
  { t: 5.7, x: 3200, y: 3770, scale: 0.84, rotation: 12 },
  { t: 6.5, x: 3420, y: 3860, scale: 0.78, rotation: 10 },
  { t: 8.5, x: 3430, y: 3850, scale: 0.78, rotation: 6 },
];

// Non-uniform cubic Hermite interpolation. Adjacent segments share derivatives:
// position, zoom, rotation and velocity never reset at a narrative boundary.
export const sampleTrack = (time: number, keys: Key[]): Omit<Key, "t"> => {
  const t = Math.max(keys[0].t, Math.min(time, keys[keys.length - 1].t));
  const index = Math.min(
    keys.length - 2,
    keys.findIndex((key, i) => i < keys.length - 1 && t <= keys[i + 1].t),
  );
  const a = keys[index],
    b = keys[index + 1];
  const before = keys[Math.max(0, index - 1)],
    after = keys[Math.min(keys.length - 1, index + 2)];
  const u = interpolate(t, [a.t, b.t], [0, 1]);
  const duration = b.t - a.t;
  const value = (property: "x" | "y" | "scale" | "rotation") => {
    const m0 = (b[property] - before[property]) / (b.t - before.t);
    const m1 = (after[property] - a[property]) / (after.t - a.t);
    return (
      (2 * u * u * u - 3 * u * u + 1) * a[property] +
      (u * u * u - 2 * u * u + u) * duration * m0 +
      (-2 * u * u * u + 3 * u * u) * b[property] +
      (u * u * u - u * u) * duration * m1
    );
  };
  return {
    x: value("x"),
    y: value("y"),
    scale: value("scale"),
    rotation: value("rotation"),
  };
};
// Integrating smoothstep changes camera tempo without moving any waypoints or
// introducing velocity discontinuities. Hero travel is 25% slower, adding .29s
// of breathing room; the final camera continues drifting instead of freezing.
const rampIntegral = (t: number, start: number, end: number) => {
  const duration = end - start;
  if (t <= start) return 0;
  if (t >= end) return t - start - duration / 2;
  const u = (t - start) / duration;
  return duration * (u ** 3 - 0.5 * u ** 4);
};
export const cameraTime = (t: number) =>
  t - 0.25 * (rampIntegral(t, 5.6, 5.8) - rampIntegral(t, 6.7, 7));
export const getCamera = (t: number) => sampleTrack(cameraTime(t), CAMERA);
export const planeZoom = (scale: number, depth: number) =>
  scale ** (depth === 0.25 ? 0.97 : depth === 1.3 ? 1.03 : 1);

// One lens crossing straddles the loop boundary. Its position advances 250px
// per frame on both sides of the seam, rather than growing and reversing.
export const loopPassTime = (t: number): number | null =>
  t <= 0.32 ? t : t >= 8 ? t - DURATION : null;
export const lensCover = (t: number) =>
  interpolate(
    t,
    [1.3, 1.9, 2.26, 2.31, 2.46, 2.64],
    [0, 0.04, 0.65, 1, 1, 0],
    ease,
  );

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { C, ease, WORLD } from "./timeline";

export const BackgroundWorld = () => (
  <div
    style={{
      position: "absolute",
      inset: -3000,
      width: WORLD.width + 6000,
      height: WORLD.height + 6000,
      background: `radial-gradient(ellipse at 47% 41%, ${C.cream} 0%, transparent 23%), radial-gradient(ellipse at 63% 65%, ${C.peach} 0%, transparent 38%), ${C.banana}`,
    }}
  ></div>
);

// One functional secondary motif: the peach surface follows the gummy, opens
// diagonally during the journey and settles as the packaging's backdrop.
export const PackBackdrop = () => {
  const t = useCurrentFrame() / useVideoConfig().fps;
  const build = interpolate(
    t,
    [4.32, 5.05, 5.82, 7.4],
    [0, 0.6, 1, 1.035],
    ease,
  );
  const x = interpolate(
    t,
    [4.32, 5.05, 5.82, 8.5],
    [2320, 2680, 2935, 2947],
    ease,
  );
  const y = interpolate(
    t,
    [4.32, 5.05, 5.82, 8.5],
    [2620, 2960, 3190, 3180],
    ease,
  );
  const rx = 720 * build,
    ry = 800 * build;
  const stretch = interpolate(t, [4.32, 5.2, 5.82], [0.65, 1.2, 1], ease);
  const d = `M${x - rx} ${y - ry * 0.12}C${x - rx * 1.08} ${y - ry * 0.8} ${x - rx * 0.2} ${y - ry * 1.1} ${x + rx * 0.38} ${y - ry * 0.94}S${x + rx * 1.2} ${y - ry * 0.2} ${x + rx * 0.96} ${y + ry * 0.42}S${x + rx * 0.05} ${y + ry * 1.12} ${x - rx * 0.5} ${y + ry * 0.84}S${x - rx * 1.02} ${y + ry * 0.25} ${x - rx} ${y - ry * 0.12}Z`;
  return (
    <svg
      viewBox="0 0 5000 5600"
      width={WORLD.width}
      height={WORLD.height}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <path
        d={d}
        fill={C.peach}
        opacity={0.65}
        transform={`translate(${x} ${y}) rotate(${interpolate(t, [4.32, 5.82], [-24, -8], ease)}) scale(${stretch} 1) translate(${-x} ${-y})`}
      />
    </svg>
  );
};

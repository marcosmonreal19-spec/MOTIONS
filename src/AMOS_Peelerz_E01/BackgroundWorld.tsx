import { C, WORLD } from "./timeline";

export const BackgroundWorld = () => (
  <div
    style={{
      position: "absolute",
      inset: -3000,
      width: WORLD.width + 6000,
      height: WORLD.height + 6000,
      background: `radial-gradient(ellipse at 47% 41%, ${C.cream} 0%, transparent 23%), radial-gradient(ellipse at 63% 65%, ${C.peach} 0%, transparent 38%), ${C.banana}`,
    }}
  >
    <svg
      viewBox="0 0 5000 5600"
      style={{
        position: "absolute",
        left: 3000,
        top: 3000,
        width: 5000,
        height: 5600,
      }}
    >
      <path
        d="M-800 2400C200 1600 1200 1700 1650 2600S2700 4200 5500 3500L5600 6500H-800Z"
        fill={C.peach}
        opacity={0.65}
      />
    </svg>
  </div>
);

import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const COPY = {
  opening: ["¿CONOCES LAS GOMITAS", "QUE", "PUEDES", "PELAR?"],
  peel: ["ASÍ ES", "PEELERZ."],
  hero: "PÉLALA.",
  pack: ["GUMMY", "BANANA"],
  closing: ["CONOCE", "PEELERZ"],
};
export const C = {
  banana: "#FFD62C",
  cream: "#FFF5CF",
  peach: "#F4B294",
  green: "#126843",
  red: "#DA332B",
  ink: "#202A1D",
  white: "#FFFCED",
};
// Original PNG geometry and alpha bounds. Only transparent padding is offset;
// every image retains its original aspect ratio, pixels and colors.
// Peeled bounds ignore alpha=1 outliers for centering; no PNG pixels are cropped.
const ASSETS = {
  whole: {
    file: "peelerz-gummy-whole.png",
    width: 229,
    height: 229,
    x: 71,
    y: 31,
    visibleWidth: 107,
    visibleHeight: 157,
  },
  peeled: {
    file: "peelerz-gummy-peeled.png",
    width: 463,
    height: 608,
    x: 75,
    y: 85,
    visibleWidth: 284,
    visibleHeight: 356,
  },
  pack: {
    file: "peelerz-pack-banana.png",
    width: 1479,
    height: 1856,
    x: 248,
    y: 146,
    visibleWidth: 1181,
    visibleHeight: 1610,
  },
} as const;

export const ease = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.22, 1, 0.36, 1),
} as const;

export const Product = ({
  asset,
  width,
  x = 540,
  y = 990,
  style,
}: {
  asset: keyof typeof ASSETS;
  width: number;
  x?: number;
  y?: number;
  style?: CSSProperties;
}) => {
  const data = ASSETS[asset];
  const ratio = width / data.visibleWidth;
  const height = data.visibleHeight * ratio;
  return (
    <div
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - height / 2,
        width,
        height,
        ...style,
      }}
    >
      <Img
        src={staticFile(`amos/peelerz banana/${data.file}`)}
        style={{
          position: "absolute",
          left: -data.x * ratio,
          top: -data.y * ratio,
          width: data.width * ratio,
          height: data.height * ratio,
          maxWidth: "none",
        }}
      />
    </div>
  );
};

export const Stage = ({
  children,
  tone = "banana",
}: {
  children: ReactNode;
  tone?: "banana" | "cream" | "peach";
}) => (
  <AbsoluteFill
    style={{
      overflow: "hidden",
      color: C.ink,
      background: C[tone],
      fontFamily: "Arial, Helvetica, sans-serif",
    }}
  >
    <AnimatedGradientBackground tone={tone} />
    {children}
  </AbsoluteFill>
);

export const AnimatedGradientBackground = ({
  tone,
}: {
  tone: "banana" | "cream" | "peach";
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at ${interpolate(frame, [0, 2 * fps], [12, 32], ease)}% 18%, ${C.cream} 0%, transparent 58%), radial-gradient(ellipse at 100% 85%, ${C.peach} 0%, transparent 65%), ${C[tone]}`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{ opacity: 0.045, mixBlendMode: "multiply" }}
      >
        <defs>
          <filter id={`grain-${tone}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="3"
              seed="12"
              stitchTiles="stitch"
            />
          </filter>
        </defs>
        <rect width="100%" height="100%" filter={`url(#grain-${tone})`} />
      </svg>
    </AbsoluteFill>
  );
};

export const GraphicBlob = ({
  x,
  y,
  size,
  color,
  rotate = 0,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  rotate?: number;
}) => {
  const frame = useCurrentFrame();
  return (
    <svg
      viewBox="0 0 600 600"
      style={{
        position: "absolute",
        width: size,
        height: size,
        left: x,
        top: y,
        rotate: `${rotate + frame * 0.035}deg`,
      }}
    >
      <path
        d="M72 92C170-60 389 0 506 111S650 376 483 492 142 650 60 469 0 240 72 92Z"
        fill={color}
      />
    </svg>
  );
};

export const PeelRibbon = ({
  color = C.banana,
  width = 96,
  style,
}: {
  color?: string;
  width?: number;
  style?: CSSProperties;
}) => (
  <svg
    viewBox="0 0 1080 1920"
    style={{
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      overflow: "visible",
      ...style,
    }}
    fill="none"
  >
    <path
      d="M-240 1580C130 1860 1150 1520 900 1000S-190 820 90 350 1200 40 1320 460"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
    />
    <path
      d="M-240 1580C130 1860 1150 1520 900 1000S-190 820 90 350 1200 40 1320 460"
      stroke={C.cream}
      strokeWidth={3}
      strokeOpacity={0.6}
    />
  </svg>
);

export const KineticWord = ({
  children,
  x,
  y,
  size,
  delay = 0,
  color = C.ink,
  rotate = 0,
  style,
}: {
  children: ReactNode;
  x: number;
  y: number;
  size: number;
  delay?: number;
  color?: string;
  rotate?: number;
  style?: CSSProperties;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - delay * fps,
    fps,
    config: { damping: 17, stiffness: 180, mass: 0.75 },
  });
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        padding: "10px 16px 18px 0",
        overflow: "hidden",
        rotate: `${rotate}deg`,
        ...style,
      }}
    >
      <div
        style={{
          fontSize: size,
          fontWeight: 900,
          lineHeight: 0.88,
          letterSpacing: `${interpolate(p, [0, 1], [0.025, -0.065])}em`,
          color,
          whiteSpace: "nowrap",
          transformOrigin: "0 100%",
          translate: `0 ${interpolate(p, [0, 1], [115, 0])}%`,
          scale: interpolate(p, [0, 1], [0.93, 1]),
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const ProductShadow = ({
  x,
  y,
  width,
  strength = 0.2,
  scale = 1,
}: {
  x: number;
  y: number;
  width: number;
  strength?: number;
  scale?: number;
}) => (
  <div
    style={{
      position: "absolute",
      left: x - width / 2,
      top: y,
      width,
      height: width * 0.13,
      borderRadius: "50%",
      background: C.ink,
      opacity: strength,
      filter: "blur(25px)",
      scale,
    }}
  />
);

export const MotionTrail = ({
  x = 160,
  y = 830,
  color = C.green,
}: {
  x?: number;
  y?: number;
  color?: string;
}) => (
  <svg
    viewBox="0 0 700 580"
    style={{ position: "absolute", left: x, top: y, width: 700, height: 580 }}
    fill="none"
  >
    {[0, 1, 2].map((i) => (
      <path
        key={i}
        d={`M${20 + i * 28} ${520 - i * 42}Q${-50 + i * 30} 170 ${570 + i * 30} ${20 + i * 35}`}
        stroke={color}
        strokeWidth={i === 0 ? 10 : 3}
        opacity={0.7 - i * 0.2}
        strokeLinecap="round"
      />
    ))}
  </svg>
);

export const RadialBurst = ({
  x = 700,
  y = 1050,
  color = C.cream,
}: {
  x?: number;
  y?: number;
  color?: string;
}) => {
  const frame = useCurrentFrame();
  return (
    <svg
      viewBox="0 0 1600 1600"
      style={{
        position: "absolute",
        left: x - 800,
        top: y - 800,
        width: 1600,
        height: 1600,
        rotate: `${frame * 0.045}deg`,
      }}
    >
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d="M800 800L740 -20H870Z"
          fill={color}
          opacity={0.55}
          transform={`rotate(${i * 22.5} 800 800)`}
        />
      ))}
    </svg>
  );
};

export const FloatingShape = ({
  x,
  y,
  size = 70,
  color = C.green,
  ring = false,
}: {
  x: number;
  y: number;
  size?: number;
  color?: string;
  ring?: boolean;
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: ring ? size : size * 0.38,
        borderRadius: 999,
        background: ring ? undefined : color,
        border: ring ? `7px solid ${color}` : undefined,
        rotate: `${-32 + frame * 0.1}deg`,
        translate: `0 ${Math.sin(frame / 24) * 9}px`,
      }}
    />
  );
};

export const EditorialMark = ({
  number,
  label,
}: {
  number: string;
  label: string;
}) => (
  <>
    <div
      style={{
        position: "absolute",
        left: 76,
        top: 110,
        fontSize: 24,
        fontWeight: 800,
        letterSpacing: "0.14em",
      }}
    >
      {number} / {label}
    </div>
    <div
      style={{
        position: "absolute",
        left: 76,
        right: 76,
        bottom: 105,
        borderTop: `2px solid ${C.green}`,
        paddingTop: 18,
        display: "flex",
        justifyContent: "space-between",
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: "0.12em",
        color: C.green,
      }}
    >
      <span>PEEL / PLAY / REPEAT</span>
      <span>AMOS</span>
    </div>
  </>
);

// A curved full-frame cover bridges each cut. At the cut the frame is covered;
// the next layout is revealed by the receding circle, never by a generic fade.
export const SceneTransition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cuts = [1.4, 3, 4.6, 6.6];
  const cut = cuts.find((s) => Math.abs(frame - s * fps) <= 6);
  const loop = interpolate(frame, [7.72 * fps, 8 * fps - 1], [0, 1], ease);
  const progress =
    cut === undefined
      ? loop
      : interpolate(Math.abs(frame - cut * fps), [0, 6], [1, 0], ease);
  if (progress <= 0) return null;
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        clipPath: `circle(${progress * 2400}px at -12% 80%)`,
        background: C.banana,
      }}
    >
      <PeelRibbon
        color={C.cream}
        width={130}
        style={{ translate: `${(1 - progress) * -200}px 0` }}
      />
    </AbsoluteFill>
  );
};

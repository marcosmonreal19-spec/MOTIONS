import type { CSSProperties, ReactNode } from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const COPY = {
  opening: ["¿CONOCES LAS GOMITAS", "QUE PUEDES PELAR?"],
  peel: "ASÍ ES PEELERZ.",
  hero: "PÉLALA.",
  pack: "GUMMY BANANA",
  closing: "CONOCE PEELERZ",
};

// Original PNG geometry and alpha bounds. Only transparent padding is offset;
// every image retains its original aspect ratio, pixels and colors.
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
    x: 7,
    y: 62,
    visibleWidth: 441,
    visibleHeight: 540,
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

export const Stage = ({ children }: { children: ReactNode }) => (
  <AbsoluteFill
    style={{
      backgroundColor: "#090a09",
      color: "#fff9e9",
      fontFamily: "Helvetica Neue, Arial, sans-serif",
      overflow: "hidden",
    }}
  >
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 51% 56%, rgba(234,182,53,0.085) 0%, rgba(234,182,53,0.025) 36%, transparent 66%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

export const Title = ({
  children,
  size = 82,
  top = 270,
  enter = true,
  exitAt,
}: {
  children: ReactNode;
  size?: number;
  top?: number;
  enter?: boolean;
  exitAt?: number;
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 88,
        right: 88,
        top,
        textAlign: "center",
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1.08,
        letterSpacing: "-0.045em",
        opacity:
          (enter ? interpolate(frame, [0, 0.32 * fps], [0, 1], ease) : 1) *
          (exitAt === undefined
            ? 1
            : interpolate(
                frame,
                [exitAt * fps, (exitAt + 0.2) * fps],
                [1, 0],
                ease,
              )),
        translate: enter
          ? `0 ${interpolate(frame, [0, 0.45 * fps], [24, 0], ease)}px`
          : undefined,
      }}
    >
      {children}
    </div>
  );
};

import type { CSSProperties } from "react";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { ease, GUMMY, sampleTrack } from "./timeline";

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

// Offsets account for transparent padding; the complete exact PNG is loaded.
// Width and height always use one uniform ratio. No crop, warp or color filter.
export const Product = ({
  asset,
  width,
  x,
  y,
  style,
}: {
  asset: keyof typeof ASSETS;
  width: number;
  x: number;
  y: number;
  style?: CSSProperties;
}) => {
  const data = ASSETS[asset];
  const ratio = width / data.visibleWidth;
  return (
    <div
      data-product={asset}
      style={{
        position: "absolute",
        left: x - width / 2,
        top: y - (data.visibleHeight * ratio) / 2,
        width,
        height: data.visibleHeight * ratio,
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
          filter: "drop-shadow(22px 40px 25px rgba(88,62,9,0.18))",
        }}
      />
    </div>
  );
};

export const ProductLayer = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const gummy = sampleTrack(time, GUMMY);
  const packRelief = interpolate(
    time,
    [4.95, 5.2, 5.8, 6.1],
    [0, 1, 1, 0],
    ease,
  );
  return (
    <>
      {/* The pack is permanently placed in the world, discovered by camera travel. */}
      <Product
        asset="pack"
        width={780}
        x={3200}
        y={3500}
        style={{ rotate: "-4deg" }}
      />
      <Product
        asset="whole"
        width={180}
        x={2650}
        y={3750}
        style={{ rotate: "16deg" }}
      />
      {/* State substitution occurs only behind a fully opaque foreground ribbon. */}
      <Product
        asset={time < 2.4 ? "whole" : "peeled"}
        width={(time < 2.4 ? 500 : 565) * gummy.scale * (1 - 0.13 * packRelief)}
        x={gummy.x + 24 * packRelief}
        y={gummy.y + 65 * packRelief}
        style={{ rotate: `${gummy.rotation}deg` }}
      />
    </>
  );
};

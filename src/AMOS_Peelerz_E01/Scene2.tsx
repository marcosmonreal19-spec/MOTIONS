import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COPY, ease, Product, Stage, Title } from "./shared";

export const Scene2 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const wipe = interpolate(frame, [0.15 * fps, 1.35 * fps], [100, 0], ease);
  return (
    <Stage>
      {/* Complementary screen-space masks reveal the exact PNGs without morphing. */}
      <AbsoluteFill style={{ clipPath: `inset(0 0 ${100 - wipe}% 0)` }}>
        <Product asset="whole" width={434.7} />
      </AbsoluteFill>
      <AbsoluteFill style={{ clipPath: `inset(${wipe}% 0 0 0)` }}>
        <Product
          asset="peeled"
          width={590}
          style={{ scale: interpolate(frame, [0, 1.7 * fps], [0.98, 1], ease) }}
        />
      </AbsoluteFill>
      <Title exitAt={1.45}>{COPY.peel}</Title>
    </Stage>
  );
};

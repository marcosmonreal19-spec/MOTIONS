import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COPY, ease, Product, Stage, Title } from "./shared";

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    config: { damping: 19, stiffness: 100, mass: 1 },
  });
  return (
    <Stage>
      <Product
        asset="pack"
        width={650}
        y={1020}
        style={{
          scale: interpolate(reveal, [0, 1], [0.92, 1]),
          translate: `0 ${interpolate(reveal, [0, 1], [75, 0])}px`,
          rotate: `${interpolate(reveal, [0, 1], [-1.5, 0])}deg`,
          opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], ease),
        }}
      />
      <Title size={88} exitAt={1.75}>
        {COPY.pack}
      </Title>
    </Stage>
  );
};

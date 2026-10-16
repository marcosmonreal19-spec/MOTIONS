import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COPY, ease, Product, Stage, Title } from "./shared";

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const entrance = spring({
    frame,
    fps,
    config: { damping: 24, stiffness: 90 },
  });
  return (
    <Stage>
      <Product
        asset="whole"
        width={420}
        style={{
          scale:
            interpolate(entrance, [0, 1], [0.9, 1]) *
            interpolate(frame, [0, 1.5 * fps], [1, 1.035], ease),
          opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], ease),
        }}
      />
      <Title size={69} exitAt={1.25}>
        {COPY.opening[0]}
        <br />
        {COPY.opening[1]}
      </Title>
    </Stage>
  );
};

import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { COPY, ease, Product, Stage, Title } from "./shared";

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage>
      <Product
        asset="peeled"
        width={590}
        style={{
          scale: interpolate(frame, [0, 1.8 * fps], [1, 1.04], ease),
          translate: `${interpolate(frame, [0, 1.8 * fps], [0, 16], ease)}px ${interpolate(frame, [0, 1.8 * fps], [0, -18], ease)}px`,
          rotate: `${interpolate(frame, [0, 1.8 * fps], [0, -1.4], ease)}deg`,
          opacity: interpolate(frame, [1.58 * fps, 1.8 * fps], [1, 0], ease),
        }}
      />
      <Title size={124} exitAt={1.5}>
        {COPY.hero}
      </Title>
    </Stage>
  );
};

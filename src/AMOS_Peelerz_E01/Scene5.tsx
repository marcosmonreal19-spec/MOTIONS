import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COPY, ease, Product, Stage, Title } from "./shared";

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settle = spring({
    frame,
    fps,
    config: { damping: 26, stiffness: 110 },
  });
  return (
    <Stage>
      <Product
        asset="pack"
        width={650}
        y={1020}
        style={{
          translate: `${interpolate(settle, [0, 1], [0, -80])}px 0`,
          scale: interpolate(settle, [0, 1], [1, 0.94]),
        }}
      />
      <Product
        asset="peeled"
        width={310}
        x={815}
        y={1395}
        style={{
          opacity: interpolate(frame, [0, 0.28 * fps], [0, 1], ease),
          translate: `0 ${interpolate(settle, [0, 1], [35, 0])}px`,
          rotate: `${interpolate(settle, [0, 1], [2, -3])}deg`,
        }}
      />
      <Title size={88}>{COPY.closing}</Title>
    </Stage>
  );
};

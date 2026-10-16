import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  COPY,
  ease,
  EditorialMark,
  FloatingShape,
  GraphicBlob,
  KineticWord,
  PeelRibbon,
  Product,
  ProductShadow,
  Stage,
} from "./shared";

export const Scene5 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const settle = spring({
    frame,
    fps,
    config: { damping: 20, stiffness: 140 },
  });
  return (
    <Stage>
      <GraphicBlob x={-410} y={630} size={1450} color={C.peach} rotate={30} />
      <GraphicBlob x={680} y={-500} size={1100} color={C.cream} />
      <PeelRibbon
        width={90}
        style={{
          rotate: "-12deg",
          translate: `${interpolate(frame, [0, 1.4 * fps], [50, -20], ease)}px 0`,
        }}
      />
      <EditorialMark number="05" label="PEEL / PLAY / REPEAT" />
      <KineticWord x={80} y={240} size={75}>
        {COPY.closing[0]}
      </KineticWord>
      <KineticWord x={65} y={340} size={175} color={C.green} delay={0.06}>
        {COPY.closing[1]}
      </KineticWord>
      <ProductShadow x={485} y={1650} width={690} />
      <Product
        asset="pack"
        width={675}
        x={450}
        y={1110}
        style={{
          rotate: `${interpolate(settle, [0, 1], [-3, -7])}deg`,
          scale: interpolate(settle, [0, 1], [1.1, 1]),
        }}
      />
      <Product
        asset="whole"
        width={160}
        x={880}
        y={800}
        style={{
          rotate: "16deg",
          translate: `0 ${interpolate(settle, [0, 1], [120, 0])}px`,
          scale: interpolate(settle, [0, 1], [0.7, 1]),
        }}
      />
      <ProductShadow x={815} y={1640} width={300} strength={0.14} />
      <Product
        asset="peeled"
        width={450}
        x={800}
        y={1350}
        style={{
          rotate: "10deg",
          translate: `${interpolate(settle, [0, 1], [250, 0])}px 0`,
        }}
      />
      <FloatingShape x={890} y={570} size={100} ring />
      <FloatingShape x={960} y={1020} size={65} color={C.red} />
    </Stage>
  );
};

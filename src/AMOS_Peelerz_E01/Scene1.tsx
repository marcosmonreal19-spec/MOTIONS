import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  COPY,
  ease,
  EditorialMark,
  FloatingShape,
  GraphicBlob,
  KineticWord,
  MotionTrail,
  PeelRibbon,
  Product,
  ProductShadow,
  Stage,
} from "./shared";

export const Scene1 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Stage>
      <GraphicBlob x={-590} y={660} size={1180} color={C.peach} rotate={-20} />
      <GraphicBlob x={650} y={-580} size={1200} color={C.banana} />
      <GraphicBlob x={680} y={1390} size={650} color={C.cream} />
      <PeelRibbon
        width={88}
        style={{
          translate: `${interpolate(frame, [0, 1.4 * fps], [-40, 15], ease)}px 0`,
        }}
      />
      <EditorialMark number="01" label="UNWRAP THE UNEXPECTED" />
      <KineticWord x={78} y={250} size={43} delay={-0.18}>
        {COPY.opening[0]}
      </KineticWord>
      <KineticWord x={78} y={338} size={79} delay={0.04}>
        {COPY.opening[1]}
      </KineticWord>
      <KineticWord x={70} y={435} size={180} delay={0.08}>
        {COPY.opening[2]}
      </KineticWord>
      <KineticWord x={70} y={615} size={180} delay={0.12} color={C.green}>
        {COPY.opening[3]}
      </KineticWord>
      <MotionTrail x={100} y={920} />
      <ProductShadow
        x={690}
        y={1630}
        width={410}
        scale={interpolate(frame, [0, 0.6 * fps], [0.5, 1], ease)}
      />
      <Product
        asset="whole"
        width={450}
        x={670}
        y={1230}
        style={{
          scale: interpolate(
            frame,
            [0, 0.42 * fps, 0.8 * fps, 1.4 * fps],
            [0.45, 1.15, 1, 1.02],
            ease,
          ),
          rotate: `${interpolate(frame, [0, 0.7 * fps], [-19, -8], ease)}deg`,
          translate: `0 ${interpolate(frame, [0, 0.7 * fps], [180, 0], ease)}px`,
        }}
      />
      <FloatingShape x={130} y={1420} size={105} ring />
      <FloatingShape x={910} y={860} size={60} color={C.red} />
    </Stage>
  );
};

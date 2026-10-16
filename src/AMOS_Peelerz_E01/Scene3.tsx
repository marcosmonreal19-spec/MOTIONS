import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  C,
  COPY,
  ease,
  EditorialMark,
  FloatingShape,
  KineticWord,
  PeelRibbon,
  Product,
  ProductShadow,
  RadialBurst,
  Stage,
} from "./shared";

export const Scene3 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const camera = interpolate(frame, [0, 1.6 * fps], [0, 1], ease);
  return (
    <Stage>
      <div style={{ translate: `${camera * -10}px ${camera * 6}px` }}>
        <RadialBurst x={760} y={1100} />
      </div>
      <PeelRibbon
        color={C.peach}
        width={115}
        style={{ rotate: "-25deg", scale: 1.15 }}
      />
      <EditorialMark number="03" label="GO ON. PEEL IT." />
      <KineticWord
        x={55}
        y={385}
        size={240}
        rotate={-5}
        style={{ translate: `${camera * -18}px 0` }}
      >
        {COPY.hero}
      </KineticWord>
      <ProductShadow x={655} y={1660} width={720} strength={0.16} />
      {/* Monochrome alpha silhouette only. It cannot be mistaken for a second photo. */}
      <Product
        asset="peeled"
        width={820}
        x={655}
        y={1115}
        style={{ filter: "brightness(0)", opacity: 0.1, rotate: "-8deg" }}
      />
      <Product
        asset="peeled"
        width={820}
        x={600}
        y={1060}
        style={{
          translate: `${camera * 22}px ${camera * -28}px`,
          rotate: `${-8 + camera * 3}deg`,
          scale: 1 + camera * 0.035,
        }}
      />
      <KineticWord
        x={55}
        y={385}
        size={240}
        rotate={-5}
        style={{
          clipPath: "inset(68% 0 0 0)",
          translate: `${camera * -18}px 0`,
        }}
      >
        {COPY.hero}
      </KineticWord>
      <KineticWord x={80} y={1530} size={85} color={C.green} delay={0.12}>
        PEEL. PLAY.
      </KineticWord>
      <FloatingShape x={115} y={1050} size={130} ring />
      <FloatingShape x={910} y={330} size={66} color={C.red} />
    </Stage>
  );
};

import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
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
  Stage,
} from "./shared";

export const Scene4 = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const reveal = spring({
    frame,
    fps,
    config: { damping: 16, stiffness: 100, mass: 0.8 },
  });
  return (
    <Stage tone="cream">
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 480,
          width: 1120,
          height: 1120,
          borderRadius: "50%",
          background: C.peach,
          translate: `${interpolate(frame, [0, 2 * fps], [30, -15], ease)}px 0`,
        }}
      />
      <PeelRibbon width={65} style={{ rotate: "32deg", scale: 1.2 }} />
      <EditorialMark number="04" label="YOUR NEW BANANA FIX" />
      <KineticWord x={80} y={240} size={76}>
        {COPY.pack[0]}
      </KineticWord>
      <KineticWord x={65} y={335} size={184} color={C.green} delay={0.07}>
        {COPY.pack[1]}
      </KineticWord>
      <div
        style={{
          position: "absolute",
          left: 45,
          top: 710,
          writingMode: "vertical-rl",
          rotate: "180deg",
          fontSize: 25,
          fontWeight: 700,
          letterSpacing: "0.2em",
          color: C.green,
        }}
      >
        PEELABLE GUMMY / BANANA
      </div>
      <ProductShadow
        x={610}
        y={1620}
        width={650}
        scale={interpolate(reveal, [0, 1], [0.55, 1])}
        strength={interpolate(reveal, [0, 1], [0.05, 0.22])}
      />
      <Product
        asset="pack"
        width={745}
        x={600}
        y={1090}
        style={{
          translate: `0 ${interpolate(reveal, [0, 1], [1000, 0])}px`,
          scale: interpolate(reveal, [0, 1], [0.76, 1]),
          rotate: `${interpolate(reveal, [0, 1], [-7, -3])}deg`,
        }}
      />
      <FloatingShape x={900} y={615} size={95} />
      <FloatingShape x={130} y={1450} size={88} ring />
      <FloatingShape x={915} y={1595} size={55} color={C.red} />
    </Stage>
  );
};
